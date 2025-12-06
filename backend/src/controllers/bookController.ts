import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Book } from "../entities/Book";

export class BookController {
  private repo = AppDataSource.getRepository(Book);

  list = async (_req: Request, res: Response) => {
    const books = await this.repo.find();
    return res.json(books);
  };

  find = async (req: Request, res: Response) => {
    const book = await this.repo.findOneBy({ id: Number(req.params.id) });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    return res.json(book);
  };

  create = async (req: Request, res: Response) => {
    const book = this.repo.create(req.body);
    await this.repo.save(book);
    return res.json(book);
  };

  update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const book = await this.repo.findOneBy({ id });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    this.repo.merge(book, req.body);
    const result = await this.repo.save(book);
    return res.json(result);
  };

  delete = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const book = await this.repo.findOneBy({ id });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    await this.repo.delete(id);
    return res.json({ message: "Deleted successfully" });
  };
}