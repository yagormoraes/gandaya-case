import { PurchaseHistory } from "../hooks/useWallet";

interface PurchaseHistoryProps {
    purchaseHistory: PurchaseHistory[];
}

export default function PurchaseHistoryComponent({ purchaseHistory }: PurchaseHistoryProps) {
    return (
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
    );
}
