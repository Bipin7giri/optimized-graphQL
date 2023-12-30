import * as dotenv from "dotenv";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User.entity";
import { Education } from "../entities/Education.entity";
dotenv.config();
export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  entities: [User, Education],
  logging: true,
  migrations: [],
  subscribers: [],
});
