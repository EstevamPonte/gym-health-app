import { Request, Response } from "express";
import { getConnection } from "typeorm/index";

class DropSchemaController {
  async handle(request: Request, response: Response) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    try {
      await queryRunner.connect();

      await queryRunner.query(
        `DROP SCHEMA public CASCADE; CREATE SCHEMA public;`,
      );

      await queryRunner.query(`GRANT ALL ON SCHEMA public TO public;`);

      await connection.runMigrations();
      return response.json({ message: "Migrations executed successfully" });
    } catch (error) {
      console.error("Error running migrations:", error);
      return response.status(500).json({ message: "Error running migrations" });
    } finally {
      await queryRunner.release();
    }
  }
}

export { DropSchemaController };
