import { MigrationInterface, QueryRunner } from 'typeorm'

export class StoreEvmLog1641997527150 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "substrate_event" ADD COLUMN IF NOT EXISTS "evm_log_data"  CHARACTER VARYING GENERATED ALWAYS AS (case when name = 'evm.Log' then params->0->'value'->>'data' end) STORED;`
        )

        await queryRunner.query(
            `ALTER TABLE "substrate_event" ADD COLUMN IF NOT EXISTS "evm_log_address"  CHARACTER VARYING GENERATED ALWAYS AS (case when name = 'evm.Log' then params->0->'value'->>'address' end) STORED;`
        )

        await queryRunner.query(
            `ALTER TABLE "substrate_event" ADD COLUMN IF NOT EXISTS "evm_log_topics"  jsonb GENERATED ALWAYS AS (case when name = 'evm.Log' then params->0->'value'->'topics' end) STORED;`
        )

        await queryRunner.query(
            `CREATE INDEX "IDX_76752a4b70be1fb9d5a84c04c0" ON "substrate_event" USING gin ("evm_log_topics")`
        )

        await queryRunner.query(
            `CREATE INDEX "IDX_a102586d0485a85bdb4d0fb309" ON "substrate_event" ("evm_log_address") `
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "substrate_event" DROP COLUMN IF EXISTS "evm_log_topics"`
        )

        await queryRunner.query(
            `ALTER TABLE "substrate_event" DROP COLUMN IF EXISTS "evm_log_address"`
        )

        await queryRunner.query(
            `ALTER TABLE "substrate_event" DROP COLUMN IF EXISTS "evm_log_data"`
        )

        await queryRunner.query(`DROP INDEX "IDX_76752a4b70be1fb9d5a84c04c0"`)
        await queryRunner.query(`DROP INDEX "IDX_a102586d0485a85bdb4d0fb309"`)
    }
}
