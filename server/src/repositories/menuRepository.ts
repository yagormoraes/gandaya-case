import { PrismaClient } from '@prisma/client';
import { StockUpdateItem, StockOperation, MenuItem } from '../types'; // Importar os tipos necessários

const prisma = new PrismaClient();

const getMenuItems = (): Promise<MenuItem[]> => {
    return prisma.menu.findMany();
};

const getMenuItemById = (menuItemId: number): Promise<MenuItem | null> => {
    return prisma.menu.findUnique({ where: { id: menuItemId } });
};

const updateMenuItemsStock = (items: StockUpdateItem[], operation: StockOperation): Promise<MenuItem[]> => {
    return Promise.all(
        items.map(item => {
            return prisma.menu.update({
                where: { id: item.menuItemId },
                data: {
                    availableQuantity: operation === 'decrement'
                        ? { decrement: item.quantity }
                        : { increment: item.quantity }
                }
            });
        })
    );
};

export default { getMenuItems, getMenuItemById, updateMenuItemsStock };
