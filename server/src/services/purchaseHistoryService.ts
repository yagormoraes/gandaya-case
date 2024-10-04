import { getPurchaseHistoryFromDB } from "../repositories/purchaseHistoryRepository";

export const getPurchaseHistory = (userId: string) => {
    return getPurchaseHistoryFromDB(userId);
};
