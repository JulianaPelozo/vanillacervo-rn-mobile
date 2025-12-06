import "reflect-metadata";
import { DataSource } from "typeorm";
import { Book } from "./entities/Book";
import { CD } from "./entities/CD";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "acervo",
  synchronize: true,
  logging: false,
  entities: [Book, CD],
});
