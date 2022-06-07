import { MigrationInterface, QueryRunner } from 'typeorm';

export class BaseMigrations1654627136453 implements MigrationInterface {
  name = 'BaseMigrations1654627136453';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`tbl_users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`oauthId\` varchar(255) NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`username\` varchar(255) NULL, \`email\` varchar(255) NULL, \`role\` enum ('super_admin', 'user', 'admin') NOT NULL DEFAULT 'user', \`provider\` varchar(255) NOT NULL DEFAULT 'local', \`password\` varchar(255) NULL, \`refreshToken\` varchar(255) NULL, UNIQUE INDEX \`IDX_e2b6903d536917f1171501299f\` (\`oauthId\`), UNIQUE INDEX \`IDX_22e9c745c648bad6b39c5d5b58\` (\`username\`), UNIQUE INDEX \`IDX_d74ab662f9d3964f78b3416d5d\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_d74ab662f9d3964f78b3416d5d\` ON \`tbl_users\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_22e9c745c648bad6b39c5d5b58\` ON \`tbl_users\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e2b6903d536917f1171501299f\` ON \`tbl_users\``,
    );
    await queryRunner.query(`DROP TABLE \`tbl_users\``);
  }
}
