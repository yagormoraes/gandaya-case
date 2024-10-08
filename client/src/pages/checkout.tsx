import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import { CartItem, useCart } from "../hooks/useCart";
import { useCheckout } from "../hooks/useCheckout";
import Notification from "../components/Notification";

export default function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [successNotification, setSuccessNotification] = useState(false)
    const [errorNotification, setErrorNotification] = useState(false)
    const [balance, setBalance] = useState<number | null>(null);
    const { completeCheckout, abandonCheckout } = useCheckout();
    const { addToCart, removeFromCart } = useCart();
    const { cart, total }: { cart: { [key: number]: CartItem }, total: number } = location.state || { cart: {}, total: 0 };

    const handleConfirmPurchase = async () => {
        if (isProcessing) return;

        setIsProcessing(true);

        try {
            const result = await completeCheckout(cart); 
            if (result.success) {
                setBalance(result.balance || 0) 
                console.log("result", result.balance)
                setSuccessNotification(true);
            } else {
                setErrorNotification(true);
            }
        } catch (error) {
            console.error("Erro ao confirmar compra:", error);
            setErrorNotification(true);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleIncreaseQuantity = (cartItem: CartItem) => {
        const newQuantity = cartItem.quantity + 1;

        if (newQuantity <= cartItem.availableQuantity) {
            const itemWithQuantity = { ...cartItem, quantity: newQuantity };
            addToCart(itemWithQuantity, newQuantity);
        } else {
            alert(`Só há ${cartItem.availableQuantity} unidades disponíveis.`);
        }
    };

    const handleDecreaseQuantity = (cartItem: CartItem) => {
        if (cartItem.quantity > 1) {
            const newQuantity = cartItem.quantity - 1;
            const itemWithQuantity = { ...cartItem, quantity: newQuantity };
            addToCart(itemWithQuantity, newQuantity);
        } else {
            removeFromCart(cartItem.id);
        }
    };

    const handleGoBackToMenu = async () => {
        await abandonCheckout(cart);
        navigate("/menu");
    };

    return (
        <>
            <Header title="Checkout" showBackArrow onClick={() => handleGoBackToMenu()} />

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
                                    <button
                                        onClick={() => handleDecreaseQuantity(cartItem)}
                                        className="flex flex-col items-center justify-center bg-secondary text-black px-1 py-1 rounded-l-lg h-full"
                                    >
                                        −
                                    </button>
                                    <span className="text-black text-xs font-bold mx-2">{cartItem.quantity}</span>
                                    <button
                                        onClick={() => handleIncreaseQuantity(cartItem)}
                                        className="flex flex-col items-center justify-center bg-secondary text-black px-1 py-1 rounded-r-lg h-full"
                                    >
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

                    <Button onClick={handleConfirmPurchase} disabled={isProcessing} className="bg-secondary text-black px-5 py-2 rounded-full">
                        Confirmar
                    </Button>
                </div>
            </div>
            {successNotification && (
                <Notification
                    message="Compra realizada com sucesso!"
                    type="success"
                    onClose={() => {
                        setSuccessNotification(false)
                        navigate("/")
                    }}
                    balance={balance}
                />
            )}
            {errorNotification && (
                <Notification
                    message="Erro ao processar a compra."
                    type="error"
                    onClose={() => {
                        navigate("/")
                        setErrorNotification(false)
                    }}
                />
            )}

        </>
    );
}
