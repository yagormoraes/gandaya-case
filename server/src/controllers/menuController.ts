import { Request, Response } from "express";
import { getMenu } from "../services/menuService";

export const getMenuController = (req: Request, res: Response) => {
    const menu = getMenu();
    res.send(menu);
};
