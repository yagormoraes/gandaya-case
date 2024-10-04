import { Router } from "express";
import { getBalanceController } from "../controllers/balanceController";

const router = Router();

router.get("/:id/balance", getBalanceController);

export default router;
