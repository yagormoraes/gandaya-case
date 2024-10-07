import { PrismaClient, Checkout_status } from '@prisma/client';


const prisma = new PrismaClient();

const createCheckout = (userId: number, items: any[], total: number) => {
    return prisma.checkout.create({
        data: {
            userId: userId,
            status: 'in_progress',
            total,
            items: {
                create: items.map((item) => ({
                    menuItemId: item.menuItemId,
                    quantity: item.quantity,
                }))
            }
        },
        include: { items: true }
    });
};

const updateCheckoutStatus = (checkoutId: number, status: Checkout_status) => {
    return prisma.checkout.update({
        where: { id: checkoutId },
        data: { status: status }
    });
};
const recordPurchaseHistory = async (userId: number, items: any[]) => {
    const detailedItems = await Promise.all(
        items.map(async (item) => {
            const menuItem = await prisma.menu.findUnique({
                where: { id: item.menuItemId }
            });

            if (!menuItem) {
                throw new Error(`Menu item with id ${item.menuItemId} not found`);
            }

            return {
                userId,
                item: menuItem.item, 
                price: Number(menuItem.price),
                quantity: item.quantity,
            };
        })
    );
    return prisma.purshaceHistory.createMany({
        data: detailedItems,
    });
};


export default { createCheckout, updateCheckoutStatus, recordPurchaseHistory };
