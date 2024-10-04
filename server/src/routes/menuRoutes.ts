import { Router } from "express";
import { getMenuController } from "../controllers/menuController";

const router = Router();

router.get("/menu", getMenuController);

export default router;
