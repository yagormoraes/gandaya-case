import { useEffect, useState } from "react";
import { useWallet } from "../hooks/useWallet";
import Header from "../components/Header";
import WalletBalance from "../components/WalletBalance";
import PurchaseHistoryComponent from "../components/PurchaseHistory";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import InputBox from "../components/InputBox";
import PageWrapper from "../components/PageWrapper";

export default function Wallet() {
    const navigate = useNavigate();
    const userId = 1;
    const { balance, purchaseHistory, addUserBalance, isLoading } = useWallet(userId);
    const [isBalanceVisible, setIsBalanceVisible] = useState(false);
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

    const handleClose = () => {
        setIsModalOpen(true);
    };

    const handleAddBalance = async () => {
        const numericValue = parseFloat(amountToAdd.replace(/[R$\s.]/g, '').replace(',', '.'));
        if (isNaN(numericValue)) return;

        await addUserBalance(numericValue);
        setIsModalOpen(false);
    };

    useEffect(() => {
        document.title = "Gandaya - Carteira";
    }, []);

    return (
        <PageWrapper>
            <div className="bg-primary w-full h-screen flex flex-col justify-between relative">
                <Header title={"Carteira"} />
                <div className="flex-grow overflow-hidden">
                    <WalletBalance
                        balance={balance}
                        isBalanceVisible={isBalanceVisible}
                        isLoading={isLoading}
                        toggleBalanceVisibility={() => toggleBalanceVisibility()}
                    />

                    <PurchaseHistoryComponent purchaseHistory={purchaseHistory} />
                </div>

                <div className="fixed bottom-0 left-0 w-full bg-primary-dark z-50 p-4 shadow-md flex items-center justify-around">
                    <Button onClick={() => navigate("/menu")}>Comprar produtos</Button>
                    <Button onClick={() => setIsModalOpen(true)}>Recarregar saldo</Button>
                </div>

                {isModalOpen && (
                    <Modal onClose={handleClose}>
                        <h2 className="text-lg font-bold mb-4 text-primary-dark">Adicionar Saldo</h2>
                        <InputBox
                            title="Digite o valor"
                            type="text"
                            placeholder="R$ 0,00"
                            value={amountToAdd}
                            onChange={handleAmountChange}
                        />

                        <div className="flex justify-around space-x-3">
                            <Button onClick={() => setIsModalOpen(false)} className="bg-gray-300">Cancelar</Button>
                            <Button onClick={() => handleAddBalance()}>Adicionar</Button>
                        </div>
                    </Modal>
                )}
            </div>
        </PageWrapper>

    );
}
