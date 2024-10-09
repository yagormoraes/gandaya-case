import axios from 'axios';
import { CartItem } from './useCart';

export const useCheckout = () => {
    const userId = 1;

    const initiateCheckout = async (cart: { [key: number]: CartItem }) => {
        try {
            const items = Object.values(cart).map(cartItem => ({
                menuItemId: cartItem.id,
                quantity: cartItem.quantity
            }));

            const body = {
                userId,
                items
            };

            await axios.post("http://localhost:3001/checkout", {
                ...body,
                status: "in_progress"
            });
        } catch (error) {
            console.error("Erro ao iniciar o checkout:", error);
        }
    };

    const completeCheckout = async (cart: { [key: number]: CartItem }): Promise<{ success: boolean; balance?: number }> => {
        try {
            const items = Object.values(cart).map(cartItem => ({
                menuItemId: cartItem.id,
                quantity: cartItem.quantity
            }));
        
            const body = { userId, items };
    

            const response = await axios.post("http://localhost:3001/checkout", body);
            const walletResponse = await axios.get(`http://localhost:3001/balance/${userId}`);
    
            const userBalance = walletResponse.data.balance;
            const total = Object.values(cart).reduce((sum, cartItem) => {
                return sum + cartItem.price * cartItem.quantity;
            }, 0);
    

            if (userBalance < total) {
                return { success: false }; 
            }
    
            if (response.data.message === "Purchase completed successfully") {
                return { success: true, balance: userBalance - total };
            }
    
            return { success: false };
        } catch (error) {
            console.error("Erro ao completar o checkout:", error);
            return { success: false };
        }
    };
    
    

    const failCheckout = async (cart: { [key: number]: CartItem }) => {
        try {
            const items = Object.values(cart).map(cartItem => ({
                menuItemId: cartItem.id,
                quantity: cartItem.quantity
            }));

            const body = {
                userId,
                items
            };

            await axios.post("http://localhost:3001/checkout", {
                ...body,
                status: "insufficient_funds"
            });
        } catch (error) {
            console.error("Erro ao marcar o checkout como falho:", error);
        }
    };

    const abandonCheckout = async (cart: { [key: number]: CartItem }) => {
        try {
            const items = Object.values(cart).map(cartItem => ({
                menuItemId: cartItem.id,
                quantity: cartItem.quantity
            }));

            const body = {
                userId: 1, 
                items
            };

            await axios.post("http://localhost:3001/checkout/abandon", body);
        } catch (error) {
            console.error("Erro ao marcar o checkout como abandonado:", error);
        }
    };

    return { initiateCheckout, completeCheckout, failCheckout, abandonCheckout };
};
