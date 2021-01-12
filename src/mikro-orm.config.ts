import {MikroORM } from "@mikro-orm/core"
import path from "path";

import { __prod__ } from "./constants";
import { Developer } from "./entities/Developer";
import { Game } from "./entities/Game";
import { Publisher } from "./entities/Publisher";
import { Trophy } from "./entities/Trophy";

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Game, Trophy, Developer, Publisher],
  dbName:"trophies",
  type: "postgresql",
  debug: !__prod__
} as Parameters<typeof MikroORM.init>[0];

