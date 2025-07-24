import { Router } from "express";
import { TextController } from "../controllers/TextController";

const router = Router();
const controller = new TextController();

router.post("/", controller.create);
router.get("/", controller.list);

export const textRoutes = router;
