import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int } from "type-graphql";
import { Game } from "./Game";

@Entity()
export class Trophy {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => Int)
  @ManyToOne(() => Game)
  game!: Game;

  @Field(() => String)
  @Property()
  title!: string;

  @Field(() => String)
  @Property({ type: "text" })
  description: string;

  @Field(() => String)
  @Property()
  level: string;
}
