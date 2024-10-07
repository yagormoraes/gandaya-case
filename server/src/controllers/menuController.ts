import { Request, Response } from 'express';
import { StockUpdateItem, StockOperation } from '../types';
import menuService from '../services/menuService';

export const getMenuItems = async (req: Request, res: Response): Promise<void> => {
    try {
        const menuItems = await menuService.getMenuItems();
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateProductQuantity = async (req: Request, res: Response): Promise<void> => {
    const { menuItemId, quantityToAdd }: { menuItemId: number; quantityToAdd: number } = req.body;

    try {
        if (quantityToAdd < 0) {
            res.status(400).json({ error: 'Quantity must be a positive number' });
        }

        const stockUpdateItem: StockUpdateItem = { menuItemId, quantity: quantityToAdd };
        const operation: StockOperation = 'increment';

        await menuService.updateMenuItemsStock([stockUpdateItem], operation);
        res.json({ message: 'Product quantity updated successfully' });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(errorMessage);
        res.status(500).json({ error: errorMessage });
    }
};
