import { Request, Response } from "express";
import { getBalance } from "../services/balanceService";

export const getBalanceController = (req: Request, res: Response) => {
    const balance = getBalance(req.params.id);
    res.send(balance);
};
