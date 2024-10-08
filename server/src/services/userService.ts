import userRepository from '../repositories/userRepository';
import { User, PurchaseHistory } from '../types'; 


const getUserBalance = (userId: number): Promise<User | null> => {
    return userRepository.getUserById(userId);
};

const getPurchaseHistory = (userId: number): Promise<PurchaseHistory> => {
    return userRepository.getPurchaseHistory(userId);
};

const modifyUserBalance = async (userId: number, amount: number): Promise<User> => {
    const user = await userRepository.getUserById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    const updatedBalance = Number(user.balance) + amount;
    if (updatedBalance < 0) {
        throw new Error('Insufficient balance');
    }

    return userRepository.updateUserBalance(userId, updatedBalance);
};

export default { getUserBalance, getPurchaseHistory, modifyUserBalance };
