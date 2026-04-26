import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createSession1772238190880 implements MigrationInterface {
  name = "createSession1772238190880";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "session",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "token",
            type: "varchar",
            isUnique: true,
            isNullable: false,
          },
          {
            name: "user_reference",
            type: "uuid",
          },
          {
            name: "expires_at",
            type: "timestamp",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FLUserRef",
            referencedTableName: "user",
            referencedColumnNames: ["id"],
            columnNames: ["user_reference"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("session");
  }
}
