import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import { CartItem } from "../hooks/useCart";  // Certifique-se de importar o tipo CartItem corretamente
import { useCheckout } from "../hooks/useCheckout";

export default function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();
    const [checkoutStatus, setCheckoutStatus] = useState<string>("in_progress");

    const { initiateCheckout, completeCheckout, failCheckout, abandonCheckout } = useCheckout();

    // Recuperando o carrinho e o total do state passado via navegação
    const { cart, total }: { cart: { [key: number]: CartItem }, total: number } = location.state || { cart: {}, total: 0 };

    useEffect(() => {
        initiateCheckout();
    }, [initiateCheckout]);


    const handleConfirmPurchase = async () => {
        try {
            const userHasSufficientFunds = true;
            if (userHasSufficientFunds) {
                await completeCheckout();
                alert("Compra realizada com sucesso!");
            } else {
                await failCheckout();
                alert("Saldo insuficiente!");
            }
        } catch (error) {
            console.error("Erro ao confirmar compra", error);
        }
    };

    return (
        <>
            <Header title="Checkout" showBackArrow />

            <div className="px-4 py-6">
                {Object.keys(cart).length > 0 ? (
                    Object.values(cart).map((cartItem: CartItem) => (
                        <div key={cartItem.id} className="flex justify-between items-center py-4 bg-primary-dark rounded-lg mb-4 p-4 shadow-md">
                            <div className="flex items-center">
                                <img
                                    src={`/assets/${cartItem.image}`}
                                    alt={cartItem.item}
                                    className="w-28 h-28 rounded-md mr-4"
                                />
                                <div>
                                    <h4 className="text-sm text-white font-bold">{cartItem.item}</h4>
                                    <p className="text-xs text-secondary font-bold">R$ {Number(cartItem.price).toFixed(2).replace(".", ",")}</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="bg-white border-secondary border-2 flex items-center rounded-lg justify-between h-8 w-20">
                                    <button className="flex flex-col items-center justify-center bg-secondary text-black px-1 py-1 rounded-l-lg h-full">
                                        −
                                    </button>
                                    <span className="text-black text-xs font-bold mx-2">{cartItem.quantity}</span>
                                    <button className="flex flex-col items-center justify-center bg-secondary text-black px-1 py-1 rounded-r-lg h-full">
                                        +
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-white">Nenhum item no carrinho</p>
                )}
            </div>

            <div className="fixed bottom-0 w-full bg-primary-dark p-4 shadow-md">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-sm text-white">Valor total:</h3>
                        <p className="font-bold text-3xl text-white">
                            R$ {total.toFixed(2).replace(".", ",")}
                        </p>
                    </div>

                    <Button onClick={handleConfirmPurchase} className="bg-secondary text-black px-5 py-2 rounded-full">
                        Confirmar
                    </Button>
                </div>
            </div>
        </>
    );
}
