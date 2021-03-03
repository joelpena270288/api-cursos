import {MigrationInterface, QueryRunner} from "typeorm";

export class ultimahoy1614786786289 implements MigrationInterface {
    name = 'ultimahoy1614786786289'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cursos" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "nota" integer NOT NULL, "precio" integer NOT NULL, "descripcion" character varying NOT NULL, "fecha_inicio_incripcion" TIMESTAMP NOT NULL, "fecha_fin_incripcion" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', CONSTRAINT "PK_391c5a635ef6b4bd0a46cb75653" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "modulos" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "descripcion" character varying NOT NULL, "nota" integer NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "curso_Id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ba8d97b7acc232a928b1d686c5f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clases" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "descripcion" character varying NOT NULL, "nota" integer NOT NULL, "fecha_inicio" TIMESTAMP NOT NULL, "modulo_Id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c903e73c1efeb60c60fe9193b0b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "videos" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "enlace" character varying NOT NULL, "nivel" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "actividad_Id" integer NOT NULL, CONSTRAINT "PK_e4c86c0cf95aff16e9fb8220f6b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "documentos" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "enlace" character varying NOT NULL, "nivel" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "actividad_Id" integer NOT NULL, CONSTRAINT "PK_30b7ee230a352e7582842d1dc02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contenidos" ("id" SERIAL NOT NULL, "cuerpo" character varying NOT NULL, "nivel" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "actividad_Id" integer NOT NULL, CONSTRAINT "PK_844c4638a4d6b9ffd33b2b03da1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "actividades" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, "nota" integer NOT NULL, "precio" integer NOT NULL, "descripcion" character varying NOT NULL, "fecha_inicio_incripcion" TIMESTAMP NOT NULL, "fecha_fin_incripcion" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "clase_Id" integer NOT NULL, CONSTRAINT "PK_03490866fef1c23456f0e289d9c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "preguntas_html" ("id" SERIAL NOT NULL, "punto" integer NOT NULL, "pregunta" character varying NOT NULL, "respuesta" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "evaluacion_Id" integer NOT NULL, CONSTRAINT "PK_6e923676d832c29b5be78d7160c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "evaluaciones" ("id" SERIAL NOT NULL, "punto" integer NOT NULL, "descripcion" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "actividad_Id" integer NOT NULL, CONSTRAINT "PK_3b157bcce651495e675cdf96a14" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "actividades_entraclases" ("id" SERIAL NOT NULL, "punto" integer NOT NULL, "orientacion" character varying NOT NULL, "documentos" character varying NOT NULL, "fecha_orientacion" TIMESTAMP NOT NULL, "fecha_entrega" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "evaluacion_Id" integer NOT NULL, "evalucacion_Id" integer, CONSTRAINT "PK_105bbc8272cf13805dda812b882" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, "descripcion" text NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_details" ("id" SERIAL NOT NULL, "name" character varying(50), "lastname" character varying, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_fb08394d3f499b9e441cab9ca51" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "notas" ("id" SERIAL NOT NULL, "nota" integer NOT NULL, "user_Id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "actividad_id" integer, CONSTRAINT "REL_e90ca7c2affdcd54f84341f30c" UNIQUE ("actividad_id"), CONSTRAINT "PK_1f3d47f136b291534c128bb4516" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying(25) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "detail_id" integer NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "REL_9fc134ca20766e165ad650ee74" UNIQUE ("detail_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "estado_cursos" ("id" SERIAL NOT NULL, "ultima_clase" integer NOT NULL, "ultima_seccion" integer NOT NULL, "user_Id" integer NOT NULL, "status" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "curso_id" integer, CONSTRAINT "REL_d6516c96ed38ea2ef6373045cb" UNIQUE ("curso_id"), CONSTRAINT "PK_c48445b55f008d806903a884a88" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_roles" ("usersId" integer NOT NULL, "rolesId" integer NOT NULL, CONSTRAINT "PK_38ffcfb865fc628fa337d9a0d4f" PRIMARY KEY ("usersId", "rolesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_99b019339f52c63ae615358738" ON "user_roles" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_13380e7efec83468d73fc37938" ON "user_roles" ("rolesId") `);
        await queryRunner.query(`ALTER TABLE "modulos" ADD CONSTRAINT "FK_1fffe4b0f427cec73c271849c50" FOREIGN KEY ("curso_Id") REFERENCES "cursos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clases" ADD CONSTRAINT "FK_73f3b4a63a5d88186caff8262e5" FOREIGN KEY ("modulo_Id") REFERENCES "modulos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "videos" ADD CONSTRAINT "FK_51f088732eec3bdf287108c82d7" FOREIGN KEY ("actividad_Id") REFERENCES "actividades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "documentos" ADD CONSTRAINT "FK_f1d64ac6242cde6b3bdeadbaa52" FOREIGN KEY ("actividad_Id") REFERENCES "actividades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contenidos" ADD CONSTRAINT "FK_c93327b6bbb94acd4f4a4840fda" FOREIGN KEY ("actividad_Id") REFERENCES "actividades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "actividades" ADD CONSTRAINT "FK_f059c47acd01cd5c37f9b105949" FOREIGN KEY ("clase_Id") REFERENCES "clases"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "preguntas_html" ADD CONSTRAINT "FK_33585fb413cdf12111e829b12ac" FOREIGN KEY ("evaluacion_Id") REFERENCES "evaluaciones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "evaluaciones" ADD CONSTRAINT "FK_956a059909d510125edb9b1756f" FOREIGN KEY ("actividad_Id") REFERENCES "actividades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "actividades_entraclases" ADD CONSTRAINT "FK_af9624faf45184cb58fe6892344" FOREIGN KEY ("evalucacion_Id") REFERENCES "evaluaciones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notas" ADD CONSTRAINT "FK_f22f913d0c6e3415f6541aaa386" FOREIGN KEY ("user_Id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notas" ADD CONSTRAINT "FK_e90ca7c2affdcd54f84341f30ce" FOREIGN KEY ("actividad_id") REFERENCES "actividades"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_9fc134ca20766e165ad650ee740" FOREIGN KEY ("detail_id") REFERENCES "user_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "estado_cursos" ADD CONSTRAINT "FK_04dc9233b6cf0bb53470e267519" FOREIGN KEY ("user_Id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "estado_cursos" ADD CONSTRAINT "FK_d6516c96ed38ea2ef6373045cb3" FOREIGN KEY ("curso_id") REFERENCES "cursos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_99b019339f52c63ae6153587380" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_13380e7efec83468d73fc37938e" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_13380e7efec83468d73fc37938e"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_99b019339f52c63ae6153587380"`);
        await queryRunner.query(`ALTER TABLE "estado_cursos" DROP CONSTRAINT "FK_d6516c96ed38ea2ef6373045cb3"`);
        await queryRunner.query(`ALTER TABLE "estado_cursos" DROP CONSTRAINT "FK_04dc9233b6cf0bb53470e267519"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_9fc134ca20766e165ad650ee740"`);
        await queryRunner.query(`ALTER TABLE "notas" DROP CONSTRAINT "FK_e90ca7c2affdcd54f84341f30ce"`);
        await queryRunner.query(`ALTER TABLE "notas" DROP CONSTRAINT "FK_f22f913d0c6e3415f6541aaa386"`);
        await queryRunner.query(`ALTER TABLE "actividades_entraclases" DROP CONSTRAINT "FK_af9624faf45184cb58fe6892344"`);
        await queryRunner.query(`ALTER TABLE "evaluaciones" DROP CONSTRAINT "FK_956a059909d510125edb9b1756f"`);
        await queryRunner.query(`ALTER TABLE "preguntas_html" DROP CONSTRAINT "FK_33585fb413cdf12111e829b12ac"`);
        await queryRunner.query(`ALTER TABLE "actividades" DROP CONSTRAINT "FK_f059c47acd01cd5c37f9b105949"`);
        await queryRunner.query(`ALTER TABLE "contenidos" DROP CONSTRAINT "FK_c93327b6bbb94acd4f4a4840fda"`);
        await queryRunner.query(`ALTER TABLE "documentos" DROP CONSTRAINT "FK_f1d64ac6242cde6b3bdeadbaa52"`);
        await queryRunner.query(`ALTER TABLE "videos" DROP CONSTRAINT "FK_51f088732eec3bdf287108c82d7"`);
        await queryRunner.query(`ALTER TABLE "clases" DROP CONSTRAINT "FK_73f3b4a63a5d88186caff8262e5"`);
        await queryRunner.query(`ALTER TABLE "modulos" DROP CONSTRAINT "FK_1fffe4b0f427cec73c271849c50"`);
        await queryRunner.query(`DROP INDEX "IDX_13380e7efec83468d73fc37938"`);
        await queryRunner.query(`DROP INDEX "IDX_99b019339f52c63ae615358738"`);
        await queryRunner.query(`DROP TABLE "user_roles"`);
        await queryRunner.query(`DROP TABLE "estado_cursos"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "notas"`);
        await queryRunner.query(`DROP TABLE "user_details"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "actividades_entraclases"`);
        await queryRunner.query(`DROP TABLE "evaluaciones"`);
        await queryRunner.query(`DROP TABLE "preguntas_html"`);
        await queryRunner.query(`DROP TABLE "actividades"`);
        await queryRunner.query(`DROP TABLE "contenidos"`);
        await queryRunner.query(`DROP TABLE "documentos"`);
        await queryRunner.query(`DROP TABLE "videos"`);
        await queryRunner.query(`DROP TABLE "clases"`);
        await queryRunner.query(`DROP TABLE "modulos"`);
        await queryRunner.query(`DROP TABLE "cursos"`);
    }

}
