import { Router } from "express";
import { BookController } from "../controllers/bookController";

const router = Router();
const controller = new BookController();

router.get("/", controller.list);
router.get("/:id", controller.find);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
