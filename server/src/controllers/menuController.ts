import { Request, Response } from 'express';
import menuService from '../services/menuService';

export const getMenuItems = async (req: Request, res: Response) => {
    try {
        const menuItems = await menuService.getMenuItems();
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
