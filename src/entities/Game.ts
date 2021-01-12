import { Entity, PrimaryKey, Property, ManyToOne, ManyToMany, Collection } from "@mikro-orm/core";
import { Publisher } from "./Publisher";
import { Developer } from "./Developer"
import { Trophy } from "./Trophy";

@Entity()
export class Game {

  @PrimaryKey()
  id!: number;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property()
  title!: string;

  @ManyToOne(() => Publisher) // or you can specify the entity as class reference or string name
  publisher?: Publisher;

  @ManyToMany(() => Developer) // owning side can be simple as this!
  developers = new Collection<Developer>(this);

  @ManyToOne(() => Trophy)
  trophies = new Collection<Trophy>(this);
}