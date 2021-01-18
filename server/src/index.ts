import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import express from "express";
import Redis from "ioredis";
const session = require("express-session");
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import connectRedis from "connect-redis";
import cors from "cors";

import mikroConfig from "./mikro-orm.config";
import { __prod__ } from "./constants";
import { DeveloperResolver } from "./resolvers/developer";
import { UserResolver } from "./resolvers/user";
import { MyContext } from "./types";
import { sendEmail } from "./util/send-email";

const main = async () => {
  try {
    const orm = await MikroORM.init(mikroConfig);

    orm.getMigrator().up();
    const app = express();

    const RedisStore = connectRedis(session);
    const redis = new Redis();
    app.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true,
      })
    );

    app.use(
      session({
        name: "qid",
        store: new RedisStore({
          client: redis,
          disableTouch: true,
        }),
        cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 365,
          httpOnly: true,
          sameSite: "lax",
          secure: __prod__,
        },
        saveUninitialized: false,
        secret: "bananas",
        resave: false,
      })
    );

    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [DeveloperResolver, UserResolver],
        validate: false,
      }),
      context: ({ req, res }): MyContext => ({
        em: orm.em,
        req,
        res,
        redis,
      }),
    });

    apolloServer.applyMiddleware({ app, cors: false });

    app.get("/", (_, res) => {
      res.send("Hello world");
    });

    app.listen(7777, () => {
      console.log("Server listening on port localhost:7777");
    });
  } catch (error) {
    console.error(error);
  }
};

main();
