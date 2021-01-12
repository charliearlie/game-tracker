import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import mikroConfig from "./mikro-orm.config";
import {__prod__} from "./constants";
import { DeveloperResolver } from "./resolvers/developer";

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  
  // orm.getMigrator().up()
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [DeveloperResolver],
      validate: false
    }),
    context: () => ({
      em: orm.em
    })
  })

  apolloServer.applyMiddleware( { app })

  app.get("/", (_, res) => {
    res.send("Hello world")
  })

  app.listen(7777, () => {
    console.log("Server listening on port localhost:7777")
  })
};

main();
