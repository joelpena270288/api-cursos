import {MigrationInterface, QueryRunner} from "typeorm";

export class ultimahoy1614910900252 implements MigrationInterface {
    name = 'ultimahoy1614910900252'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "actividades" DROP COLUMN "precio"`);
        await queryRunner.query(`ALTER TABLE "actividades" DROP COLUMN "fecha_inicio_incripcion"`);
        await queryRunner.query(`ALTER TABLE "actividades" DROP COLUMN "fecha_fin_incripcion"`);
        await queryRunner.query(`ALTER TABLE "actividades" ADD "status" character varying(8) NOT NULL DEFAULT 'ACTIVE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "actividades" DROP COLUMN "status"`);
        await queryRunner.query(`ALTER TABLE "actividades" ADD "fecha_fin_incripcion" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "actividades" ADD "fecha_inicio_incripcion" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "actividades" ADD "precio" integer NOT NULL`);
    }

}
