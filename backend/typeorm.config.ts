import { DataSource } from 'typeorm';
const dotenv = require('dotenv');
import { join } from 'path';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [join(__dirname, 'libs/data/src/entities/*.entity{.ts,.js}')],
  migrations: [join(__dirname, 'libs/data/src/migrations/*.ts')],
  synchronize: false,
  logging: true,
});
