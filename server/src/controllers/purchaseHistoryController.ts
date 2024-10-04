import { Request, Response } from "express";
import { getPurchaseHistory } from "../services/purchaseHistoryService";

export const getPurchaseHistoryController = (req: Request, res: Response) => {
    const history = getPurchaseHistory(req.params.id);
    res.send(history);
};
