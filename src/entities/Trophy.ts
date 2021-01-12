import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Trophy {

  @PrimaryKey()
  id!: number;

  @Property()
  title!: string;

  @Property({type: "text"})
  description: string;

  @Property()
  level: string;

}