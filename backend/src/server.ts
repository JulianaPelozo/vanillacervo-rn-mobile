import express from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import bookRoutes from "./routes/BooksRouter";
import cdRoutes from "./routes/CDRouter";

const HOST = process.env.HOST || "0.0.0.0";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/books", bookRoutes);
app.use("/cds", cdRoutes);

AppDataSource.initialize().then(() => {
  console.log("Banco conectado!");

  app.listen(3000, () => {
    console.log("Servidor rodando em http://${HOST}:3000");
  });
});
