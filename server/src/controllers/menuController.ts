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

export const updateProductQuantity = async (req: Request, res: Response): Promise<void> => {
    const { menuItemId, quantityToAdd } = req.body;

    try {
        if (quantityToAdd < 0) {
            res.status(400).json({ error: 'Quantity must be a positive number' });
        }
        await menuService.updateMenuItemsStock([{ menuItemId, quantity: quantityToAdd }], 'increment');
        res.json({ message: 'Product quantity updated successfully' });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(errorMessage);
        res.status(500).json({ error: errorMessage });
    }
};

