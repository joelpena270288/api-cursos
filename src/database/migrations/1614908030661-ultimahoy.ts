import {MigrationInterface, QueryRunner} from "typeorm";

export class ultimahoy1614908030661 implements MigrationInterface {
    name = 'ultimahoy1614908030661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clases" ADD "status" character varying(8) NOT NULL DEFAULT 'ACTIVE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clases" DROP COLUMN "status"`);
    }

}
