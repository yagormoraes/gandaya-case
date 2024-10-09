import { PurchaseHistory } from "../hooks/useWallet";
import { formatDate } from "../utils/dateFormat";


interface PurchaseHistoryProps {
    purchaseHistory: PurchaseHistory[];
}

export default function PurchaseHistoryComponent({ purchaseHistory }: PurchaseHistoryProps) {
    return (
        <div className="mt-5 mx-3 flex flex-col items-start">
            <div className="text-primary-light text-sm pb-1 font-semibold">Histórico de pedidos</div>
            <div className="overflow-y-auto h-[38rem] w-full mt-2">
                {purchaseHistory.length > 0 ? (
                    purchaseHistory.map((order, index) => {
                        const { formattedDate, formattedTime } = formatDate(order.saleDate);
                        return (
                            <div className="flex items-center mb-3" key={index}>
                                <div className="h-14 w-14 text-white border-primary-lightest border-2 rounded-lg flex items-center justify-center">
                                    <div className="text-xl font-paytone">{order.quantity}</div>
                                </div>
                                <div className="pl-2">
                                    <div className="text-white font-bold">{order.item}</div>
                                    <div className="text-primary-lightest text-xs">
                                        <b>{formattedDate}</b> às {formattedTime}
                                    </div>
                                    <div className="text-secondary font-bold text-xs">R$ {Number(order.price * order.quantity).toFixed(2).replace('.', ',')}</div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-white">Nenhum pedido encontrado</div>
                )}
            </div>
        </div>
    );
}
