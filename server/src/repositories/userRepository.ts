import { PrismaClient } from '@prisma/client';
import { User, PurchaseHistory } from '../types'; 

const prisma = new PrismaClient();

const getUserById = (userId: number): Promise<User | null> => {
    return prisma.user.findUnique({ where: { id: userId } });
};

const getPurchaseHistory = (userId: number): Promise<PurchaseHistory> => {
    return prisma.purshaceHistory.findMany({ where: { userId } });
};

const updateUserBalance = (userId: number, newBalance: number): Promise<User> => {
    return prisma.user.update({
        where: { id: userId },
        data: { balance: newBalance }
    });
};

export default { getUserById, getPurchaseHistory, updateUserBalance };

