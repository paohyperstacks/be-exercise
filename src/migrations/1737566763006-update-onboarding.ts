import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class UpdateOnboarding1737566763006 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "onboarding",
            new TableColumn({
                name: "hashedRefreshToken",
                type: "varchar",
                isNullable: true
            }),
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("onboarding", "hashedRefreshToken")
    }

}
