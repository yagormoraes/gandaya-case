import { useState, useEffect } from "react";
import { motion } from "framer-motion"

interface PurchaseHistory {
    item: string;
    saleDate: string;
    price: number;
}

const eyeIcon = "/assets/eyeIcon.png"
const eyeSlashIcon = "/assets/eyeIconSlash.png"

export default function Wallet() {
    const [balance, setBalance] = useState<number>(0);
    const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistory[]>([]);
    const [isBalanceVisible, setIsBalanceVisible] = useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Estado para abrir/fechar modal
    const [amountToAdd, setAmountToAdd] = useState<number>(0); // Valor do saldo a ser adicionado
    const [isLoading, setIsLoading] = useState<boolean>(false); // Estado de loading
    const userId = 1;

    const fetchUserBalance = async () => {
        try {
            const response = await fetch(`http://localhost:3001/balance/${userId}`);
            const data = await response.json();
            setBalance(data.balance);
        } catch (error) {
            console.error("Erro ao buscar saldo:", error);
        }
    };

    const fetchPurchaseHistory = async () => {
        try {
            const response = await fetch(`http://localhost:3001/purshaceHistory/${userId}`);
            const data = await response.json();
            setPurchaseHistory(data.history);
        } catch (error) {
            console.error("Erro ao buscar histórico de pedidos:", error);
        }
    };

    useEffect(() => {
        fetchUserBalance();
        fetchPurchaseHistory();
    }, []);

    const toggleBalanceVisibility = () => {
        setIsBalanceVisible(!isBalanceVisible);
    };

    const handleAddBalance = async () => {
        setIsLoading(true); 
        try {
            const response = await fetch(`http://localhost:3001/balance/add/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount: amountToAdd }),
            });
    
            if (!response.ok) {
                throw new Error('Erro ao adicionar saldo');
            }
    
            const data = await response.json();
            setBalance(data.user.balance);
            setIsModalOpen(false); 
        } catch (error) {
            console.error("Erro ao adicionar saldo:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-primary w-auto h-screen flex flex-col justify-between">
            <div>
                <div className="flex items-center h-28 justify-end text-white font-inter text-2xl pr-6 font-bold">
                    Carteira
                </div>

                <div className="flex items-center justify-between mx-3">
                    <div>
                        <div className="text-primary-light text-sm pb-1 font-bold">Saldo disponível</div>
                        <div className="text-3xl text-white font-bold">
                            {isLoading ? "Carregando..." : (isBalanceVisible ? `R$ ${balance.toFixed(2).replace('.', ',')}` : '••••')}
                        </div>
                    </div>
                    <div>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleBalanceVisibility}
                            className="text-white"
                        >
                            <motion.img
                                src={isBalanceVisible ? eyeIcon : eyeSlashIcon}
                                alt="Toggle Saldo"
                                className="w-7 h-7"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            />
                        </motion.button>
                    </div>
                </div>

                <div className="mt-5 flex flex-col items-start mx-3">
                    <div className="text-primary-light text-sm pb-1 font-semibold">Histórico de pedidos</div>
                    {purchaseHistory.length > 0 ? (
                        purchaseHistory.map((order, index) => (
                            <div className="flex items-center mb-3" key={index}>
                                <div className="h-14 w-14 text-white border-primary-lightest border-2 rounded-lg flex items-center justify-center">
                                    <div className="text-xl font-paytone">{index + 1}</div>
                                </div>
                                <div className="pl-2">
                                    <div className="text-white font-bold">{order.item}</div>
                                    <div className="text-primary-lightest text-xs">
                                        <b>{new Date(order.saleDate).toLocaleDateString()}</b> às{" "}
                                        {new Date(order.saleDate).toLocaleTimeString()}
                                    </div>
                                    <div className="text-secondary font-bold text-xs">R$ {Number(order.price).toFixed(2).replace('.', ',')}</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-white">Nenhum pedido encontrado</div>
                    )}
                </div>
            </div>

            <div className="mb-5 flex items-center justify-around mx-3">
                <button
                    className="font-matter text-sm bg-secondary h-12 px-5 rounded-full font-bold"
                    onClick={() => alert("botao para comprar produtos")}
                >
                    Comprar produtos
                </button>
                <button
                    className="font-matter text-sm bg-secondary h-12 px-5 rounded-full font-bold"
                    onClick={() => setIsModalOpen(true)} 
                >
                    Recarregar saldo
                </button>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-5 rounded-md w-80">
                        <h2 className="text-lg font-bold mb-4">Adicionar Saldo</h2>
                        <input
                            type="number"
                            className="border border-gray-300 p-2 w-full mb-4"
                            placeholder="Digite o valor"
                            value={amountToAdd}
                            onChange={(e) => setAmountToAdd(Number(e.target.value))}
                        />
                        <div className="flex justify-end space-x-3">
                            <button
                                className="bg-gray-300 px-4 py-2 rounded-md"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                onClick={() => handleAddBalance()}
                            >
                                Adicionar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

