import { Request, Response } from 'express';
import { CheckoutItemInput } from '../types';
import checkoutService from '../services/checkoutService';
import checkoutRepository from '../repositories/checkoutRepository';

export const getUserCheckouts = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params;

    try {
        const checkouts = await checkoutService.getUserCheckouts(parseInt(userId));

        if (!checkouts || checkouts.length === 0) {
            res.status(404).json({ message: 'No checkouts found for this user' });
        }

        res.json(checkouts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const handleCheckout = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, items }: { userId: number; items: CheckoutItemInput[] } = req.body;
        
        const existingCheckout = await checkoutRepository.findCheckoutByStatus(userId, 'in_progress');
        if (existingCheckout) {
            res.status(400).json({ message: 'O usuário já possui um checkout em andamento.' });
        }

        const result = await checkoutService.processCheckout(userId, items);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const handleAbandonCheckout = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, items } = req.body;
        const result = await checkoutService.abandonCheckout(userId, items);
        res.json(result);
    } catch (error) {
        console.error('Erro ao abandonar o checkout:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


