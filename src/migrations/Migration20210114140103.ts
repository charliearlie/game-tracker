import { Migration } from '@mikro-orm/migrations';

export class Migration20210114140103 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "username" text not null, "password" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "email" text not null);');
    this.addSql('alter table "user" add constraint "user_username_unique" unique ("username");');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');

    this.addSql('create table "publisher" ("id" serial primary key, "title" varchar(255) not null);');

    this.addSql('create table "developer" ("id" serial primary key, "title" varchar(255) not null);');

    this.addSql('create table "game" ("id" serial primary key, "created_at" jsonb not null, "updated_at" jsonb not null, "title" varchar(255) not null, "publisher_id" int4 not null);');

    this.addSql('create table "trophy" ("id" serial primary key, "game_id" int4 not null, "title" varchar(255) not null, "description" text not null, "level" varchar(255) not null);');

    this.addSql('create table "game_developers" ("game_id" int4 not null, "developer_id" int4 not null);');
    this.addSql('alter table "game_developers" add constraint "game_developers_pkey" primary key ("game_id", "developer_id");');

    this.addSql('alter table "game" add constraint "game_publisher_id_foreign" foreign key ("publisher_id") references "publisher" ("id") on update cascade;');

    this.addSql('alter table "trophy" add constraint "trophy_game_id_foreign" foreign key ("game_id") references "game" ("id") on update cascade;');

    this.addSql('alter table "game_developers" add constraint "game_developers_game_id_foreign" foreign key ("game_id") references "game" ("id") on update cascade on delete cascade;');
    this.addSql('alter table "game_developers" add constraint "game_developers_developer_id_foreign" foreign key ("developer_id") references "developer" ("id") on update cascade on delete cascade;');
  }

}
