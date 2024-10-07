import { Request, Response, NextFunction } from 'express';
import userService from '../services/userService';
import { User, PurchaseHistory, PurchaseHistoryResponse, ErrorResponse } from '../types/index'

export const getUserBalance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId: number = parseInt(req.params.id, 10);
    try {
        const user: User | null = await userService.getUserBalance(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        next(error);
    }
};



export const addUserBalance = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId: number = parseInt(req.params.id, 10);
    const { amount }: { amount: number } = req.body;

    try {
        if (amount <= 0) {
            res.status(400).json({ error: 'Amount must be greater than 0' });
        }
        const updatedUser: User | null = await userService.modifyUserBalance(userId, amount);
        res.json({ message: 'Balance updated successfully', user: updatedUser });
    } catch (error) {
        next(error);
    }
};




export const getPurchaseHistory = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    const userId: number = parseInt(req.params.id, 10);
    try {
        const history = await userService.getPurchaseHistory(userId);
        if (history.length > 0) {
            const response: PurchaseHistoryResponse = { userId, history };
            res.json(response);
        } else {
            const errorResponse: ErrorResponse = { error: 'No purchase history found for user' };
            res.status(404).json(errorResponse);
        }
    } catch (error) {
        next(error);
    }
};


