import { DataSource } from 'typeorm';
import { Lesson } from './models/lesson';
import { Course } from './models/course';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  //For Development Environment
  // ssl: false,
  // extra: {
  //   ssl: {
  //     rejectUnauthorized: true,
  //   },
  // },
  entities: [Course, Lesson],
  // synchronize flag configure database and crates tables
  synchronize: true,
  logging: true,
});
