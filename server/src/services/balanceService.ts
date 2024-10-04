import { getBalanceFromDB } from "../repositories/balanceRepository";

export const getBalance = (userId: string) => {
    return getBalanceFromDB(userId);
};
