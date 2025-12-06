import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { CD } from "../entities/CD";

export class CDController {
  private repo = AppDataSource.getRepository(CD);

  list = async (_req: Request, res: Response) => {
    const cds = await this.repo.find();
    return res.json(cds);
  };

  find = async (req: Request, res: Response) => {
    const cd = await this.repo.findOneBy({ id: Number(req.params.id) });

    if (!cd) {
      return res.status(404).json({ error: "CD not found" });
    }

    return res.json(cd);
  };

  create = async (req: Request, res: Response) => {
    const cd = this.repo.create(req.body);
    await this.repo.save(cd);
    return res.json(cd);
  };

  update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const cd = await this.repo.findOneBy({ id });

    if (!cd) {
      return res.status(404).json({ error: "CD not found" });
    }

    this.repo.merge(cd, req.body);
    const result = await this.repo.save(cd);
    return res.json(result);
  };

  delete = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const cd = await this.repo.findOneBy({ id });

    if (!cd) {
      return res.status(404).json({ error: "CD not found" });
    }

    await this.repo.delete(id);
    return res.json({ message: "Deleted successfully" });
  };
}
