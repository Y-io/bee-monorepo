import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as process from 'process';

export const databaseConfig = (): TypeOrmModuleOptions => ({
  type: 'postgres',
  // url: process.env.DATABASE_URL,
  database: process.env.POSTGRES_DATABASE,
  port: parseInt(process.env.POSTGRES_PORT, 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  synchronize: true,
  autoLoadEntities: true,
});
