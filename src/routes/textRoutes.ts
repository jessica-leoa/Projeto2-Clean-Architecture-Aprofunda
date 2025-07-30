import { Router } from "express";
import { TextController } from "../controllers/TextController";

const router = Router();
const controller = new TextController();

router.post("/", controller.create);
router.get("/", controller.list);
router.delete('/:id', controller.delete)
router.patch('/:id',controller.patch)

export const textRoutes = router;
