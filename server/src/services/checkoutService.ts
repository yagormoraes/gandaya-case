import checkoutRepository from '../repositories/checkoutRepository';
import userService from './userService';
import menuService from './menuService';
import { CheckoutItemInput } from '../types';


const getUserCheckouts = async (userId: number) => {
    return await checkoutRepository.getUserCheckouts(userId)
}

const processCheckout = async (userId: number, items: CheckoutItemInput[]) => {
    const existingCheckout = await checkoutRepository.findCheckoutByStatus(userId, 'in_progress');
    if (existingCheckout) {
        throw new Error('O usuário já possui um checkout em andamento.');
    }

    const user = await userService.getUserBalance(userId);
    if (!user) throw new Error('User not found');

    let total = 0;
    for (const item of items) {
        const menuItem = await menuService.getMenuItemById(item.menuItemId);
        if (!menuItem) throw new Error(`Menu item with id ${item.menuItemId} not found`);
        total += Number(menuItem.price) * item.quantity;

        if (menuItem.availableQuantity < item.quantity) {
            throw new Error(`Not enough quantity for item ${menuItem.item}`);
        }
    }

    if (Number(user.balance) < total) {
        await checkoutRepository.updateCheckoutStatus(userId, 'insufficient_funds');
        throw new Error('Insufficient funds');
    }

    const checkout = await checkoutRepository.createCheckout(userId, items, total);

    await userService.modifyUserBalance(userId, -total);
    await menuService.updateMenuItemsStock(items, 'decrement');
    await checkoutRepository.updateCheckoutStatus(checkout.id, 'completed');
    await checkoutRepository.recordPurchaseHistory(userId, items);

    return { message: 'Purchase completed successfully', checkout };
};



const abandonCheckout = async (userId: number, items: CheckoutItemInput[]) => {
    const user = await userService.getUserBalance(userId);
    if (!user) throw new Error('User not found');

    let total = 0;
    for (const item of items) {
        const menuItem = await menuService.getMenuItemById(item.menuItemId);
        if (!menuItem) throw new Error(`Menu item with id ${item.menuItemId} not found`);
        total += Number(menuItem.price) * item.quantity;

        if (menuItem.availableQuantity < item.quantity) {
            throw new Error(`Not enough quantity for item ${menuItem.item}`);
        }
    }

    if (Number(user.balance) < total) {
        await checkoutRepository.updateCheckoutStatus(userId, 'insufficient_funds');
        throw new Error('Insufficient funds');
    }
    const checkout = await checkoutRepository.createCheckout(userId, items, total);
    await checkoutRepository.updateCheckoutStatus(checkout.id, 'abandoned');
    
    return { message: 'Carrinho abandonado', checkoutId: checkout.id };
};




export default { processCheckout, abandonCheckout, getUserCheckouts };
