import { Request, Response } from 'express';
import { CheckoutItemInput } from '../types';
import checkoutService from '../services/checkoutService';

export const handleCheckout = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, items }: { userId: number; items: CheckoutItemInput[] } = req.body;
        const result = await checkoutService.processCheckout(userId, items);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
