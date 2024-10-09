import { useState, useEffect } from "react";
import axios from "axios";

export interface PurchaseHistory {
    item: string;
    saleDate: string;
    price: number;
    quantity: number;
}

export const useWallet = (userId: number) => {
    const [balance, setBalance] = useState<number>(0);
    const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistory[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchUserBalance = async (): Promise<number> => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:3001/balance/${userId}`);
            const fetchedBalance = response.data.balance;
            setBalance(fetchedBalance);
            return fetchedBalance; 
        } catch (error) {
            setError('Erro ao buscar saldo');
            return 0;
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

    return { balance, fetchUserBalance ,purchaseHistory, addUserBalance, isLoading, error };
};
