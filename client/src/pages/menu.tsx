import { useState, useEffect } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { useMenuItems, MenuItem } from "../hooks/useMenuItems";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import InputBox from "../components/InputBox";
import TotalFooter from "../components/TotalFooter";
import PageWrapper from "../components/PageWrapper";

export default function Menu() {
    const { menuItems, loading, error } = useMenuItems();
    const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
    const [quantityToAdd, setQuantityToAdd] = useState<number>(1);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const { cart, addToCart, removeFromCart, total } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        if (searchTerm === "") {
            setFilteredItems(menuItems);
        } else {
            setFilteredItems(
                menuItems.filter(item =>
                    item.item.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [menuItems, searchTerm]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSelectItem = (item: MenuItem) => {
        setSelectedItem(item);
        setIsModalOpen(true);
    };

    const handleAddToCart = () => {
        if (selectedItem) {
            const itemWithQuantity = {
                ...selectedItem,
                quantity: quantityToAdd,
            };

            if (itemWithQuantity.quantity <= selectedItem.availableQuantity) {
                addToCart(itemWithQuantity, quantityToAdd);
            }
        }
        setIsModalOpen(false);
        setQuantityToAdd(1);
    };

    const handleIncreaseQuantity = (item: MenuItem) => {
        const cartItem = cart[item.id];
        const newQuantity = (cartItem ? cartItem.quantity : 0) + 1;

        if (newQuantity <= item.availableQuantity) {
            const itemWithQuantity = { ...item, quantity: newQuantity };
            addToCart(itemWithQuantity, newQuantity);
        }
    };

    const handleDecreaseQuantity = (item: MenuItem) => {
        const cartItem = cart[item.id];
        if (cartItem.quantity > 1) {
            const newQuantity = cartItem.quantity - 1;
            const itemWithQuantity = { ...item, quantity: newQuantity };
            addToCart(itemWithQuantity, newQuantity);
        } else {
            removeFromCart(item.id);
        }
    };

    const handleCancel = () => {
        setSelectedItem(null);
        setQuantityToAdd(1);
        setIsModalOpen(false);
    };

    const handleCheckout = () => {
        navigate("/checkout", { state: { cart, total } });
    };

    useEffect(() => {
        document.title = "Gandaya - Menu";
    }, []);

    return (
        <>
            <PageWrapper>
                <Header title="Cardápio" showBackArrow />
                <div className="flex flex-col h-screen">
                    <div className="flex-grow overflow-y-auto px-4">
                        <SearchBar
                            searchTerm={searchTerm}
                            onSearchChange={handleSearch}
                            placeholder="Buscar produto"
                        />

                        {loading ? (
                            <div>Carregando...</div>
                        ) : error ? (
                            <div>{error}</div>
                        ) : (
                            <div className="grid grid-cols-3 gap-x-6 justify-items-center mt-4">
                                {filteredItems.map(item => (
                                    <Card
                                        key={item.id}
                                        item={item}
                                        cartItem={cart[item.id]}
                                        onSelectItem={handleSelectItem}
                                        onIncreaseQuantity={handleIncreaseQuantity}
                                        onDecreaseQuantity={handleDecreaseQuantity}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <TotalFooter
                        total={total}
                        buttonText="Confirmar"
                        onButtonClick={handleCheckout}
                        isButtonDisabled={Object.keys(cart).length === 0} 
                    />
                </div>

                {isModalOpen && selectedItem && (
                    <Modal onClose={handleCancel}>
                        <div>
                            <img
                                src={`/assets/${selectedItem.image}`}
                                alt={selectedItem.item}
                                className="w-48 h-48 object-cover rounded-md bg-white mx-auto"
                            />
                            <h2 className="text-xl text-white font-bold mt-4">{selectedItem.item}</h2>
                            <p className="text-sm text-secondary font-bold">
                                R$ {Number(selectedItem.price).toFixed(2).replace(".", ",")}
                            </p>
                            <p className="text-sm text-secondary font-bold">
                                Estoque disponível: {selectedItem.availableQuantity}
                            </p>

                            <InputBox
                                title="Quantidade"
                                type="number"
                                placeholder="Digite a quantidade"
                                value={quantityToAdd.toString()}
                                onChange={(e) => setQuantityToAdd(Math.min(Number(e.target.value), selectedItem.availableQuantity))}
                            />

                            <div className="flex justify-around space-x-3 mt-4">
                                <Button onClick={handleCancel} className="bg-gray-300">
                                    Cancelar
                                </Button>
                                <Button onClick={handleAddToCart}>Adicionar</Button>
                            </div>
                        </div>
                    </Modal>
                )}
            </PageWrapper>
        </>
    );
}
