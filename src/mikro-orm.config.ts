import {MikroORM } from "@mikro-orm/core"
import path from "path";

import { __prod__ } from "./constants";
import { Developer } from "./entities/Developer";
import { Game } from "./entities/Game";
import { Publisher } from "./entities/Publisher";
import { Trophy } from "./entities/Trophy";
import { User } from "./entities/User";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Game, Trophy, Developer, Publisher, User],
  dbName:"ps-trophies",
  type: "postgresql",
  debug: !__prod__
} as Parameters<typeof MikroORM.init>[0];

