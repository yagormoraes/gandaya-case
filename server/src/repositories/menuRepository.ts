import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getMenuItems = () => {
    return prisma.menu.findMany();
};

const getMenuItemById = (menuItemId: number) => {
    return prisma.menu.findUnique({ where: { id: menuItemId } });
};

const updateMenuItemsStock = (items: any[], operation?: 'increment' | 'decrement') => {
    return Promise.all(items.map(item => {
        return prisma.menu.update({
            where: { id: item.menuItemId },
            data: {
                availableQuantity: operation === 'decrement' 
                    ? { decrement: item.quantity }
                    : { increment: item.quantity }
            }
        });
    }));
};



export default { getMenuItems, getMenuItemById, updateMenuItemsStock };
