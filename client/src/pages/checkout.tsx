import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { CartItem, useCart } from "../hooks/useCart";
import { useCheckout } from "../hooks/useCheckout";
import Notification from "../components/Notification";
import QuantityButton from "../components/QuantityButton";
import { useWallet } from "../hooks/useWallet";
import TotalFooter from "../components/TotalFooter";
import { fixEncoding } from "../utils/fixEncoding";
import PageWrapper from "../components/PageWrapper";

export default function Checkout() {
    const location = useLocation();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [successNotification, setSuccessNotification] = useState(false);
    const [errorNotification, setErrorNotification] = useState(false);
    const [balance, setBalance] = useState<number | null>(null);
    const [total, setTotal] = useState<number>(0);
    const { completeCheckout, abandonCheckout } = useCheckout();
    const { addToCart, removeFromCart } = useCart();
    const { cart: initialCart }: { cart: { [key: number]: CartItem } } = location.state || { cart: {} };

    const { fetchUserBalance } = useWallet(1);

    const [localCart, setLocalCart] = useState<{ [key: number]: CartItem }>(initialCart);

    useEffect(() => {
        const newTotal = Object.values(localCart).reduce((sum, cartItem) => {
            return sum + cartItem.price * cartItem.quantity;
        }, 0);
        setTotal(newTotal);
    }, [localCart]);

    const handleConfirmPurchase = async () => {
        if (isProcessing) return;
        setIsProcessing(true);

        try {
            const result = await completeCheckout(localCart);
            if (result.success) {
                const updatedBalance = await fetchUserBalance();
                setBalance(updatedBalance);
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
            const updatedItem = { ...cartItem, quantity: newQuantity };
            setLocalCart((prevCart) => ({
                ...prevCart,
                [cartItem.id]: updatedItem,
            }));
            addToCart(updatedItem, newQuantity);
        }
    };

    const handleDecreaseQuantity = (cartItem: CartItem) => {
        if (cartItem.quantity > 1) {
            const newQuantity = cartItem.quantity - 1;
            const updatedItem = { ...cartItem, quantity: newQuantity };
            setLocalCart((prevCart) => ({
                ...prevCart,
                [cartItem.id]: updatedItem,
            }));
            addToCart(updatedItem, newQuantity);
        } else {
            removeFromCart(cartItem.id);
            setLocalCart((prevCart) => {
                const { [cartItem.id]: removedItem, ...rest } = prevCart;
                return rest;
            });
        }
    };

    const handleGoBackToMenu = async () => {
        await abandonCheckout(localCart);
        navigate("/menu");
    };

    return (
        <>
            <PageWrapper>
                <div className={successNotification || errorNotification ? "blur-background" : ""}>
                    <Header title="Checkout" showBackArrow onClick={() => handleGoBackToMenu()} />
                    <div className="px-4 py-6">
                        {Object.keys(localCart).length > 0 ? (
                            Object.values(localCart).map((cartItem: CartItem) => (
                                <div key={cartItem.id} className="flex justify-between items-center py-4 bg-primary-dark rounded-lg mb-4 p-4 shadow-md">
                                    <div className="flex items-center">
                                        <img
                                            src={`/assets/${cartItem.image}`}
                                            alt={cartItem.item}
                                            className="w-28 h-28 rounded-md mr-4 border-2 border-secondary"
                                        />
                                        <div>
                                            <h4 className="text-sm text-white font-bold">{fixEncoding(cartItem.item)}</h4>
                                            <p className="text-xs text-secondary font-bold">R$ {Number(cartItem.price).toFixed(2).replace(".", ",")}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center">
                                        <QuantityButton
                                            quantity={cartItem.quantity}
                                            availableQuantity={cartItem.availableQuantity}
                                            onIncrease={() => handleIncreaseQuantity(cartItem)}
                                            onDecrease={() => handleDecreaseQuantity(cartItem)}
                                            height="h-10"
                                            width="w-28"
                                            fontSize="text-[1.2em]"
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-white">Nenhum item no carrinho</p>
                        )}
                    </div>

                    {!successNotification && (
                        <TotalFooter
                            total={total}
                            buttonText="Confirmar"
                            onButtonClick={handleConfirmPurchase}
                            isProcessing={isProcessing}
                        />
                    )}
                </div>

                {successNotification && (
                    <Notification
                        message="Compra realizada"
                        type="success"
                        onClose={() => {
                            setSuccessNotification(false);
                            navigate("/");
                        }}
                        balance={balance}
                    />
                )}
                {errorNotification && (
                    <Notification
                        message="Saldo insuficiente"
                        type="error"
                        onClose={() => {
                            navigate("/");
                            setErrorNotification(false);
                        }}
                    />
                )}
            </PageWrapper>

        </>
    );
}
