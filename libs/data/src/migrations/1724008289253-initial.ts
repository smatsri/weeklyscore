import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1724008289253 implements MigrationInterface {
    name = 'Initial1724008289253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "player" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_65edadc946a7faf4b638d5e8885" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "buyin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" numeric NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "playerId" uuid, "playSessionId" uuid, CONSTRAINT "PK_10f49b8f680cc3d502359f0b70f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "playing_group" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1a64e4ec3b2928b575295348762" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "play_session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "playingGroupId" uuid, CONSTRAINT "PK_c17e1b66cc5a84a8611eb66a5e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "buyin" ADD CONSTRAINT "FK_deded14bf446f959c053c382df1" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "buyin" ADD CONSTRAINT "FK_8460863e0bda14309bea8717f6d" FOREIGN KEY ("playSessionId") REFERENCES "play_session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "play_session" ADD CONSTRAINT "FK_3e83517ab13ec701b2b51b70977" FOREIGN KEY ("playingGroupId") REFERENCES "playing_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "play_session" DROP CONSTRAINT "FK_3e83517ab13ec701b2b51b70977"`);
        await queryRunner.query(`ALTER TABLE "buyin" DROP CONSTRAINT "FK_8460863e0bda14309bea8717f6d"`);
        await queryRunner.query(`ALTER TABLE "buyin" DROP CONSTRAINT "FK_deded14bf446f959c053c382df1"`);
        await queryRunner.query(`DROP TABLE "play_session"`);
        await queryRunner.query(`DROP TABLE "playing_group"`);
        await queryRunner.query(`DROP TABLE "buyin"`);
        await queryRunner.query(`DROP TABLE "player"`);
    }

}
