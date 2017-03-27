import { Connection, EntityManager, MigrationInterface, QueryRunner, TableSchema, ColumnSchema } from "typeorm";

export class CreateProductTable1490619105298 implements MigrationInterface {

    public async up(queryRunner: QueryRunner, connection: Connection, entityManager?: EntityManager): Promise<any> {
        await queryRunner.createTable(new TableSchema("product", [
            new ColumnSchema({ name: "id", type: "integer", isPrimary: true, isGenerated: true, isNullable: false }),
            new ColumnSchema({ name: "name", type: "character varying(255)" }),
        ]));
    }

    public async down(queryRunner: QueryRunner, connection: Connection, entityManager?: EntityManager): Promise<any> {
        await queryRunner.clearDatabase();
    }

}
