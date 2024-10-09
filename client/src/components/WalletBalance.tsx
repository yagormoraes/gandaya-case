import { motion } from 'framer-motion';

interface WalletBalanceProps {
    balance: number;
    isBalanceVisible: boolean;
    isLoading: boolean;
    toggleBalanceVisibility: () => void;
}

const eyeIcon = "/assets/eyeIcon.png";
const eyeSlashIcon = "/assets/eyeIconSlash.png";

export default function WalletBalance({ balance, isBalanceVisible, isLoading, toggleBalanceVisibility }: WalletBalanceProps) {
    return (
        <div className="flex items-center justify-between mx-3 font-fira">
            <div>
                <div className="text-primary-light text-sm pb-1 font-bold">Saldo disponível</div>
                <div className="text-3xl text-white font-bold">
                    {isLoading ? "Carregando..." : (isBalanceVisible ? `R$ ${balance.toFixed(2).replace('.', ',')}` : 'R$ ••••')}
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
    );
}
