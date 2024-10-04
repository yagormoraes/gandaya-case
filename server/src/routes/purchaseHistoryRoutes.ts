import { Router } from "express";
import { getPurchaseHistoryController } from "../controllers/purchaseHistoryController";

const router = Router();

router.get("/:id/purchaseHistory", getPurchaseHistoryController);

export default router;
