import userRepository from '../repositories/userRepository';

const getUserBalance = (userId: number) => {
    return userRepository.getUserById(userId);
};

const getPurchaseHistory = (userId: number) => {
    return userRepository.getPurchaseHistory(userId);
};


const modifyUserBalance = async (userId: number, amount: number) => {
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
