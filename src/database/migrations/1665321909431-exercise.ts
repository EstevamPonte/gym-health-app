import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class exercise1665321909431 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'exercise',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar'
                    },
                    {
                        name: 'repetition',
                        type: 'varchar'
                    },
                    {
                        name: 'weight',
                        type: 'float'
                    },
                    {
                        name: 'rest',
                        type: 'varchar'
                    },
                    {
                        name: 'comments',
                        type: 'varchar'
                    },
                    {
                        name: 'file_reference',
                        type: 'uuid',
                        isNullable: true
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ],
                foreignKeys: [
                    {
                        name: 'FLFileRef',
                        referencedTableName: 'file',
                        referencedColumnNames: ['id'],
                        columnNames: ['file_reference'],
                        onDelete: 'SET NULL',
                        onUpdate: 'SET NULL'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("exercise")
    }

}
