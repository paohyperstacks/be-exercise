import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config();

const configService = new ConfigService();

const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: parseInt(configService.get<string>('DB_PORT'), 5432),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASS'),
  database: configService.get<string>('DB_DATABASE'),
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrationsTableName: '_migration',
  migrations: ['./src/migrations/*.ts'],
  logging: true,
});

export default AppDataSource;
