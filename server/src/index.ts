import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import express from "express";
const redis = require("redis");
const session = require("express-session");
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import connectRedis from "connect-redis";

import mikroConfig from "./mikro-orm.config";
import { __prod__ } from "./constants";
import { DeveloperResolver } from "./resolvers/developer";
import { UserResolver } from "./resolvers/user";
import { MyContext } from "./types";

const main = async () => {
  try {
    const orm = await MikroORM.init(mikroConfig);

    orm.getMigrator().up();
    const app = express();

    const RedisStore = connectRedis(session);
    const redisClient = redis.createClient();

    app.use(
      session({
        name: "qid",
        store: new RedisStore({
          client: redisClient,
          disableTouch: true,
        }),
        cookie: {
          maxAge: 1000 * 60 * 60 * 24 * 365,
          httpOnly: true,
          sameSite: "lax",
          secure: __prod__,
        },
        saveUninitialize: false,
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
      }),
    });

    apolloServer.applyMiddleware({ app });

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
