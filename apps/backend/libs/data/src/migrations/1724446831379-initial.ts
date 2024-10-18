import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1724446831379 implements MigrationInterface {
    name = 'Initial1724446831379'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "weeklyscore"."player" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_65edadc946a7faf4b638d5e8885" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "weeklyscore"."buyin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" numeric NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "player_id" uuid, "play_session_id" uuid, CONSTRAINT "PK_10f49b8f680cc3d502359f0b70f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_buyin_player_id" ON "weeklyscore"."buyin" ("player_id") `);
        await queryRunner.query(`CREATE INDEX "idx_buyin_play_session_id" ON "weeklyscore"."buyin" ("play_session_id") `);
        await queryRunner.query(`CREATE TABLE "weeklyscore"."playing_group" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1a64e4ec3b2928b575295348762" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "weeklyscore"."play_session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "playing_group_id" uuid, CONSTRAINT "PK_c17e1b66cc5a84a8611eb66a5e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "idx_play_session_playing_group_id" ON "weeklyscore"."play_session" ("playing_group_id") `);
        await queryRunner.query(`ALTER TABLE "weeklyscore"."buyin" ADD CONSTRAINT "FK_7369a4ea940f84f9c94aa658874" FOREIGN KEY ("player_id") REFERENCES "weeklyscore"."player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "weeklyscore"."buyin" ADD CONSTRAINT "FK_159743d68ec26d277546e365c71" FOREIGN KEY ("play_session_id") REFERENCES "weeklyscore"."play_session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "weeklyscore"."play_session" ADD CONSTRAINT "FK_d1e99d92b21b71115f936413487" FOREIGN KEY ("playing_group_id") REFERENCES "weeklyscore"."playing_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "weeklyscore"."play_session" DROP CONSTRAINT "FK_d1e99d92b21b71115f936413487"`);
        await queryRunner.query(`ALTER TABLE "weeklyscore"."buyin" DROP CONSTRAINT "FK_159743d68ec26d277546e365c71"`);
        await queryRunner.query(`ALTER TABLE "weeklyscore"."buyin" DROP CONSTRAINT "FK_7369a4ea940f84f9c94aa658874"`);
        await queryRunner.query(`DROP INDEX "weeklyscore"."idx_play_session_playing_group_id"`);
        await queryRunner.query(`DROP TABLE "weeklyscore"."play_session"`);
        await queryRunner.query(`DROP TABLE "weeklyscore"."playing_group"`);
        await queryRunner.query(`DROP INDEX "weeklyscore"."idx_buyin_play_session_id"`);
        await queryRunner.query(`DROP INDEX "weeklyscore"."idx_buyin_player_id"`);
        await queryRunner.query(`DROP TABLE "weeklyscore"."buyin"`);
        await queryRunner.query(`DROP TABLE "weeklyscore"."player"`);
    }

}
