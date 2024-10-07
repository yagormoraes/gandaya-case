import { Request, Response } from 'express';
import checkoutService from '../services/checkoutService';

export const handleCheckout = async (req: Request, res: Response) => {
    try {
        const { userId, items } = req.body;
        const result = await checkoutService.processCheckout(userId, items);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
