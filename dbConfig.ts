import { Onboarding } from "src/entities/onboarding.entity";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

export const pgConfig: PostgresConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'be_exercise',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],

    synchronize: true,
}