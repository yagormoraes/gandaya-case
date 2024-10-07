import { Request, Response } from 'express';
import userService from '../services/userService';

export const getUserBalance = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    try {
        const user = await userService.getUserBalance(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const addUserBalance = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    const { amount } = req.body;

    try {
        if (amount <= 0) {
            res.status(400).json({ error: 'Amount must be greater than 0' });
            return
        }
        const updatedUser = await userService.modifyUserBalance(userId, amount);
        res.json({ message: 'Balance updated successfully', user: updatedUser });
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
};


export const getPurchaseHistory = async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    try {
        const history = await userService.getPurchaseHistory(userId);
        if (history.length > 0) {
            res.json({ userId, history });
        } else {
            res.status(404).json({ error: 'No purchase history found for user' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
