import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedIndexs1724009013366 implements MigrationInterface {
    name = 'AddedIndexs1724009013366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "idx_buyin_player_id" ON "buyin" ("playerId") `);
        await queryRunner.query(`CREATE INDEX "idx_buyin_play_session_id" ON "buyin" ("playSessionId") `);
        await queryRunner.query(`CREATE INDEX "idx_play_session_playing_group_id" ON "play_session" ("playingGroupId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."idx_play_session_playing_group_id"`);
        await queryRunner.query(`DROP INDEX "public"."idx_buyin_play_session_id"`);
        await queryRunner.query(`DROP INDEX "public"."idx_buyin_player_id"`);
    }

}
