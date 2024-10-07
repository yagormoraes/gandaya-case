import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/:id/balance", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (user) {
            res.json({ id: user.id, balance: user.balance });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/:id/purshaceHistory", async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    try {
        const history = await prisma.purshaceHistory.findMany({
            where: { userId: userId }
        });

        if (history.length > 0) {
            res.json({ userId, history });
        } else {
            res.status(404).json({ error: "No purchase history found for user" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/menu", async (req: Request, res: Response) => {
    try {
        const menuItems = await prisma.menu.findMany();
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

const handleCheckout = async (req: Request, res: Response) => {
    const { userId, items } = req.body;
    
    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        let total = 0;
        for (const item of items) {
            const menuItem = await prisma.menu.findUnique({ where: { id: item.menuItemId } });
            if (!menuItem) {
                res.status(404).json({ error: `Menu item with id ${item.menuItemId} not found` });
                return;
            }
            total += menuItem.price.toNumber() * item.quantity;

            if (menuItem.availableQuantity < item.quantity) {
                res.status(400).json({ error: `Not enough quantity for item ${menuItem.item}` });
                return;
            }
        }

        const checkout = await prisma.checkout.create({
            data: {
                userId: userId,
                status: 'in_progress',
                total,
                items: {
                    create: items.map((item: any) => ({
                        menuItemId: item.menuItemId,
                        quantity: item.quantity,
                    }))
                }
            },
            include: { items: true }
        });

        if (user.balance.toNumber() < total) {
            await prisma.checkout.update({
                where: { id: checkout.id },
                data: { status: 'insufficient_funds' }
            });
            res.status(400).json({ error: "Insufficient funds", checkout });
            return;
        }

        await prisma.user.update({
            where: { id: userId },
            data: { balance: user.balance.toNumber() - total }
        });

        for (const item of items) {
            await prisma.menu.update({
                where: { id: item.menuItemId },
                data: {
                    availableQuantity: { decrement: item.quantity }
                }
            });
        }

        await prisma.checkout.update({
            where: { id: checkout.id },
            data: { status: 'completed' }
        });

        for (const item of items) {
            const menuItem = await prisma.menu.findUnique({ where: { id: item.menuItemId } });
            if (!menuItem) {
                throw new Error(`Menu item with id ${item.menuItemId} not found`);
            }

            await prisma.purshaceHistory.create({
                data: {
                    userId: userId,
                    item: menuItem.item,
                    price: menuItem.price.toNumber(),
                    quantity: item.quantity
                }
            });
        }

        res.json({ message: "Purchase completed successfully", checkout });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

app.post("/checkout", handleCheckout);

export default app;
