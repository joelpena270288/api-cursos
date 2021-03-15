import {MigrationInterface, QueryRunner} from "typeorm";

export class curso1615764091548 implements MigrationInterface {
    name = 'curso1615764091548'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cursos" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "nota" integer NOT NULL, "precio" integer NOT NULL, "descripcion" character varying NOT NULL, "fecha_inicio_incripcion" TIMESTAMP NOT NULL, "fecha_fin_incripcion" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', CONSTRAINT "PK_391c5a635ef6b4bd0a46cb75653" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "modulos" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "descripcion" character varying NOT NULL, "nota" integer NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "cursoId" integer, CONSTRAINT "PK_ba8d97b7acc232a928b1d686c5f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clases" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "descripcion" character varying NOT NULL, "nota" integer NOT NULL, "fecha_inicio" TIMESTAMP NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "moduloId" integer, CONSTRAINT "PK_c903e73c1efeb60c60fe9193b0b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "videos" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "link" character varying NOT NULL, "nivel" integer NOT NULL, "actividadId" integer, CONSTRAINT "PK_e4c86c0cf95aff16e9fb8220f6b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "documentos" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "link" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "actividadId" integer, CONSTRAINT "PK_30b7ee230a352e7582842d1dc02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contenidos" ("id" SERIAL NOT NULL, "cuerpo" character varying NOT NULL, "nivel" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "actividadId" integer, CONSTRAINT "PK_844c4638a4d6b9ffd33b2b03da1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "preguntas_html" ("id" SERIAL NOT NULL, "punto" integer NOT NULL, "pregunta" character varying NOT NULL, "respuesta" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "actividadId" integer, CONSTRAINT "PK_6e923676d832c29b5be78d7160c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "actividades" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "nota" integer NOT NULL, "descripcion" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "claseId" integer, CONSTRAINT "PK_03490866fef1c23456f0e289d9c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "actividades_extraclases" ("id" SERIAL NOT NULL, "punto" integer NOT NULL, "orientacion" character varying NOT NULL, "documentos" character varying NOT NULL, "fecha_entrega" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "actividadId" integer, CONSTRAINT "PK_3fffb33b12f9d0bd2104841e6a3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, "descripcion" text NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_details" ("id" SERIAL NOT NULL, "name" character varying(50), "lastname" character varying, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_fb08394d3f499b9e441cab9ca51" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notas" ("id" SERIAL NOT NULL, "nota" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "actividadesId" integer, CONSTRAINT "REL_fb585387dd5177ef8f74e5ac15" UNIQUE ("actividadesId"), CONSTRAINT "PK_1f3d47f136b291534c128bb4516" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying(25) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "detail_id" integer NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "REL_9fc134ca20766e165ad650ee74" UNIQUE ("detail_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "estado_cursos" ("id" SERIAL NOT NULL, "ultima_clase" integer NOT NULL, "ultima_seccion" integer NOT NULL, "status" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "cursoId" integer, CONSTRAINT "REL_89613c5b8e808bf8d26fc20afb" UNIQUE ("cursoId"), CONSTRAINT "PK_c48445b55f008d806903a884a88" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_roles" ("usersId" integer NOT NULL, "rolesId" integer NOT NULL, CONSTRAINT "PK_38ffcfb865fc628fa337d9a0d4f" PRIMARY KEY ("usersId", "rolesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_99b019339f52c63ae615358738" ON "user_roles" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_13380e7efec83468d73fc37938" ON "user_roles" ("rolesId") `);
        await queryRunner.query(`ALTER TABLE "modulos" ADD CONSTRAINT "FK_a373365e6bc2320fd6860aa7422" FOREIGN KEY ("cursoId") REFERENCES "cursos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clases" ADD CONSTRAINT "FK_315a6a6f3e3c286cc183bcfe6d7" FOREIGN KEY ("moduloId") REFERENCES "modulos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "videos" ADD CONSTRAINT "FK_aca6ccaa1a791c34c5a7721742c" FOREIGN KEY ("actividadId") REFERENCES "actividades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "documentos" ADD CONSTRAINT "FK_5ef6f88dbafc368304e04404841" FOREIGN KEY ("actividadId") REFERENCES "actividades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contenidos" ADD CONSTRAINT "FK_25019604cf329b6bddef76aef88" FOREIGN KEY ("actividadId") REFERENCES "actividades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "preguntas_html" ADD CONSTRAINT "FK_dafa7e3cf165b5d451243b0c7f2" FOREIGN KEY ("actividadId") REFERENCES "actividades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "actividades" ADD CONSTRAINT "FK_8e13268ef7a34558122acc07bab" FOREIGN KEY ("claseId") REFERENCES "clases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "actividades_extraclases" ADD CONSTRAINT "FK_adbd0e59c26f13124ab416ea4c1" FOREIGN KEY ("actividadId") REFERENCES "actividades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notas" ADD CONSTRAINT "FK_4037433a40a6d913c18a9ea6948" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notas" ADD CONSTRAINT "FK_fb585387dd5177ef8f74e5ac15e" FOREIGN KEY ("actividadesId") REFERENCES "actividades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_9fc134ca20766e165ad650ee740" FOREIGN KEY ("detail_id") REFERENCES "user_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "estado_cursos" ADD CONSTRAINT "FK_5bc105e0bf2774861adac5030f3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "estado_cursos" ADD CONSTRAINT "FK_89613c5b8e808bf8d26fc20afbc" FOREIGN KEY ("cursoId") REFERENCES "cursos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_99b019339f52c63ae6153587380" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_13380e7efec83468d73fc37938e" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE TABLE "query-result-cache" ("id" SERIAL NOT NULL, "identifier" character varying, "time" bigint NOT NULL, "duration" integer NOT NULL, "query" text NOT NULL, "result" text NOT NULL, CONSTRAINT "PK_6a98f758d8bfd010e7e10ffd3d3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "query-result-cache"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_13380e7efec83468d73fc37938e"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_99b019339f52c63ae6153587380"`);
        await queryRunner.query(`ALTER TABLE "estado_cursos" DROP CONSTRAINT "FK_89613c5b8e808bf8d26fc20afbc"`);
        await queryRunner.query(`ALTER TABLE "estado_cursos" DROP CONSTRAINT "FK_5bc105e0bf2774861adac5030f3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_9fc134ca20766e165ad650ee740"`);
        await queryRunner.query(`ALTER TABLE "notas" DROP CONSTRAINT "FK_fb585387dd5177ef8f74e5ac15e"`);
        await queryRunner.query(`ALTER TABLE "notas" DROP CONSTRAINT "FK_4037433a40a6d913c18a9ea6948"`);
        await queryRunner.query(`ALTER TABLE "actividades_extraclases" DROP CONSTRAINT "FK_adbd0e59c26f13124ab416ea4c1"`);
        await queryRunner.query(`ALTER TABLE "actividades" DROP CONSTRAINT "FK_8e13268ef7a34558122acc07bab"`);
        await queryRunner.query(`ALTER TABLE "preguntas_html" DROP CONSTRAINT "FK_dafa7e3cf165b5d451243b0c7f2"`);
        await queryRunner.query(`ALTER TABLE "contenidos" DROP CONSTRAINT "FK_25019604cf329b6bddef76aef88"`);
        await queryRunner.query(`ALTER TABLE "documentos" DROP CONSTRAINT "FK_5ef6f88dbafc368304e04404841"`);
        await queryRunner.query(`ALTER TABLE "videos" DROP CONSTRAINT "FK_aca6ccaa1a791c34c5a7721742c"`);
        await queryRunner.query(`ALTER TABLE "clases" DROP CONSTRAINT "FK_315a6a6f3e3c286cc183bcfe6d7"`);
        await queryRunner.query(`ALTER TABLE "modulos" DROP CONSTRAINT "FK_a373365e6bc2320fd6860aa7422"`);
        await queryRunner.query(`DROP INDEX "IDX_13380e7efec83468d73fc37938"`);
        await queryRunner.query(`DROP INDEX "IDX_99b019339f52c63ae615358738"`);
        await queryRunner.query(`DROP TABLE "user_roles"`);
        await queryRunner.query(`DROP TABLE "estado_cursos"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "notas"`);
        await queryRunner.query(`DROP TABLE "user_details"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "actividades_extraclases"`);
        await queryRunner.query(`DROP TABLE "actividades"`);
        await queryRunner.query(`DROP TABLE "preguntas_html"`);
        await queryRunner.query(`DROP TABLE "contenidos"`);
        await queryRunner.query(`DROP TABLE "documentos"`);
        await queryRunner.query(`DROP TABLE "videos"`);
        await queryRunner.query(`DROP TABLE "clases"`);
        await queryRunner.query(`DROP TABLE "modulos"`);
        await queryRunner.query(`DROP TABLE "cursos"`);
    }

}
