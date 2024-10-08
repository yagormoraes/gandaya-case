import { useState, useEffect } from "react";
import axios from "axios";

export interface PurchaseHistory {
    item: string;
    saleDate: string;
    price: number;
}

export const useWallet = (userId: number) => {
    const [balance, setBalance] = useState<number>(0);
    const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistory[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUserBalance = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:3001/balance/${userId}`);
            setBalance(response.data.balance);
        } catch (error) {
            setError('Erro ao buscar saldo');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchPurchaseHistory = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:3001/purshaceHistory/${userId}`);
            setPurchaseHistory(response.data.history);
        } catch (error) {
            setError('Erro ao buscar histórico de pedidos');
        } finally {
            setIsLoading(false);
        }
    };

    const addUserBalance = async (amountToAdd: number) => {
        setIsLoading(true);
        try {
            const response = await axios.patch(`http://localhost:3001/balance/add/${userId}`, {
                amount: amountToAdd
            });
            setBalance(response.data.user.balance);
        } catch (error) {
            setError('Erro ao adicionar saldo');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserBalance();
        fetchPurchaseHistory();
    }, [userId]);

    return { balance, purchaseHistory, addUserBalance, isLoading, error };
};
