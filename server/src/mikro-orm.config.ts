import { MikroORM } from "@mikro-orm/core";
import path from "path";
import dotenv from "dotenv";

import { __prod__ } from "./constants";
import { Developer } from "./entities/Developer";
import { Game } from "./entities/Game";
import { Publisher } from "./entities/Publisher";
import { Trophy } from "./entities/Trophy";
import { User } from "./entities/User";

dotenv.config({ path: "variables.env "})

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Game, Trophy, Developer, Publisher, User],
  dbName: process.env.DATABASE_NAME,
  type: "postgresql",
  debug: !__prod__,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD
  
} as Parameters<typeof MikroORM.init>[0];
