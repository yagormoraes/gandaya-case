interface NotificationProps {
    message: string;
    onClose: () => void;
    type: 'success' | 'error';
    balance?: number | null;
}

export default function Notification({ message, onClose, type, balance }: NotificationProps) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-80 shadow-lg flex flex-col items-center space-y-4">
                <div>
                    <img 
                        src={type === 'success' ? '/assets/check.svg' : '/assets/deny.svg'} 
                        alt={type === 'success' ? 'Sucesso' : 'Erro'}
                        className="w-10 h-10"
                    />
                </div>
                <h3 className="text-lg font-bold text-center">
                    {type === 'success' ? 'Compra realizada' : 'Saldo insuficiente'}
                </h3>
                <p className="text-sm text-center text-gray-500">
                    {type === 'success' 
                        ? `O seu saldo é de R$ ${balance?.toFixed(2).replace(".", ",")}` 
                        : message}
                </p>
                <button
                    onClick={onClose}
                    className="bg-lime-500 hover:bg-lime-600 text-white w-full py-2 rounded-full font-bold"
                >
                    Continuar
                </button>
            </div>
        </div>
    );
}
