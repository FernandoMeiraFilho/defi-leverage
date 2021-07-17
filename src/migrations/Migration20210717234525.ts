import { Migration } from '@mikro-orm/migrations';

export class Migration20210717234525 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "token" ("token_id" serial primary key, "token_address" varchar(255) not null, "token_erc_code" varchar(255) not null, "token_code_on_protocol" varchar(255) not null, "decimals" int4 not null);');

    this.addSql('create table "protocol" ("protocol_id" serial primary key, "name" varchar(255) not null, "last_updated_block" bigint not null default 0);');

    this.addSql('create table "user" ("user_id" serial primary key, "user_address" varchar(255) not null);');

    this.addSql('create table "vault" ("vault_id" serial primary key, "user_id_user_id" int4 not null, "protocol_id_protocol_id" int4 not null, "collateral_token_id_token_id" int4 not null, "debt_token_id_token_id" int4 not null, "vault_address" varchar(255) not null, "updated_at" timestamptz(0) not null, "date_created" timestamptz(0) not null, "debt_amount" int4 not null, "collateral_amount" int4 not null, "liquidation_price" int4 not null);');

    this.addSql('alter table "vault" add constraint "vault_user_id_user_id_foreign" foreign key ("user_id_user_id") references "user" ("user_id") on update cascade;');
    this.addSql('alter table "vault" add constraint "vault_protocol_id_protocol_id_foreign" foreign key ("protocol_id_protocol_id") references "protocol" ("protocol_id") on update cascade;');
    this.addSql('alter table "vault" add constraint "vault_collateral_token_id_token_id_foreign" foreign key ("collateral_token_id_token_id") references "token" ("token_id") on update cascade;');
    this.addSql('alter table "vault" add constraint "vault_debt_token_id_token_id_foreign" foreign key ("debt_token_id_token_id") references "token" ("token_id") on update cascade;');
  }

}
