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

        console.log(user) 

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
        console.log(menuItems)
        res.json(menuItems);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" });
    }
});




export default app;
