import { Router } from "express";
import { CDController } from "../controllers/cdController";

const router = Router();
const controller = new CDController();

router.get("/", controller.list);
router.get("/:id", controller.find);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
