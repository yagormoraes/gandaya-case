import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getUserById = (userId: number) => {
    return prisma.user.findUnique({ where: { id: userId } });
};

const getPurchaseHistory = (userId: number) => {
    return prisma.purshaceHistory.findMany({ where: { userId: userId } });
};

const updateUserBalance = (userId: number, newBalance: number) => {
    return prisma.user.update({
        where: { id: userId },
        data: { balance: newBalance }
    });
};


export default { getUserById, getPurchaseHistory, updateUserBalance };
