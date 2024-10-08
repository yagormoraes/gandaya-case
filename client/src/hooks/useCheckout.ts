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

    const completeCheckout = async (cart: { [key: number]: CartItem }): Promise<boolean> => {
        try {
            const items = Object.values(cart).map(cartItem => ({
                menuItemId: cartItem.id,
                quantity: cartItem.quantity
            }));

            const body = {
                userId,
                items
            };

            const response = await axios.post("http://localhost:3001/checkout", body);
            if (response.data.message === "Purchase completed successfully") {
                return true;
            }
            return false;
        } catch (error) {
            console.error("Erro ao completar o checkout:", error);
            return false;
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
