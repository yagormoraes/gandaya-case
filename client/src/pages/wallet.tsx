import { useState } from "react";
import { useWallet } from "../hooks/useWallet";
import Header from "../components/Header";
import WalletBalance from "../components/WalletBalance";
import PurchaseHistoryComponent from "../components/PurchaseHistory";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function Wallet() {
    const navigate = useNavigate();
    const userId = 1;
    const { balance, purchaseHistory, addUserBalance, isLoading } = useWallet(userId);
    const [isBalanceVisible, setIsBalanceVisible] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [amountToAdd, setAmountToAdd] = useState('');

    const toggleBalanceVisibility = () => setIsBalanceVisible(!isBalanceVisible);

    const formatCurrency = (value: string) => {
        let cleanValue = value.replace(/\D/g, "");
        let formattedValue = (Number(cleanValue) / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
        return formattedValue;
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmountToAdd(formatCurrency(e.target.value));
    };


    const handleAddBalance = async () => {
        const numericValue = parseFloat(amountToAdd.replace(/[R$\s.]/g, '').replace(',', '.'));
        if (isNaN(numericValue)) return;

        await addUserBalance(numericValue);
        setIsModalOpen(false);
    };

    return (
        <div className="bg-primary w-auto h-screen flex flex-col justify-between">
            <div>
                <Header title={"Carteira"}/>
                <WalletBalance
                    balance={balance}
                    isBalanceVisible={isBalanceVisible}
                    isLoading={isLoading}
                    toggleBalanceVisibility={() => toggleBalanceVisibility()}
                />
                <PurchaseHistoryComponent purchaseHistory={purchaseHistory} />

            </div>

            <div className="mb-5 flex items-center justify-around mx-3">
                <Button onClick={() => navigate("/menu")}>Comprar produtos</Button>
                <Button onClick={() => setIsModalOpen(true)}>Recarregar saldo</Button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-5 rounded-md w-80">
                        <h2 className="text-lg font-bold mb-4">Adicionar Saldo</h2>
                        <input
                            type="text"
                            className="border border-gray-300 p-2 w-full mb-4"
                            placeholder="Digite o valor"
                            value={amountToAdd}
                            onChange={handleAmountChange}
                        />
                        <div className="flex justify-end space-x-3">
                            <Button onClick={() => setIsModalOpen(false)} className="bg-gray-300">Cancelar</Button>
                            <Button onClick={() => handleAddBalance()}>Adicionar</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
