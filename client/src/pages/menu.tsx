import { useState, useEffect } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { useMenuItems, MenuItem } from "../hooks/useMenuItems";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";

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
            addToCart(itemWithQuantity, quantityToAdd);
        }
        setIsModalOpen(false);
        setQuantityToAdd(1);
    };

    const handleIncreaseQuantity = (item: MenuItem) => {
        const cartItem = cart[item.id];
        const newQuantity = (cartItem ? cartItem.quantity : 0) + 1;
        const itemWithQuantity = { ...item, quantity: newQuantity };
        addToCart(itemWithQuantity, newQuantity);
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

    // Navega para a página de checkout, passando o carrinho como state
    const handleCheckout = () => {
        navigate("/checkout", { state: { cart, total } });
    };

    return (
        <>
            <Header title="Cardápio" showBackArrow />
            <div className="px-4 ">
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
                    <div className="grid grid-cols-3 gap-x-6 justify-items-center ">
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
                        <input
                            type="number"
                            value={quantityToAdd}
                            onChange={(e) => setQuantityToAdd(Number(e.target.value))}
                            min={1}
                            className="border p-2 w-full mt-2"
                        />
                        <div className="flex justify-end space-x-3 mt-4">
                            <Button onClick={handleCancel} className="bg-gray-300">
                                Cancelar
                            </Button>
                            <Button onClick={handleAddToCart}>Adicionar ao Carrinho</Button>
                        </div>
                    </div>
                </Modal>
            )}

            <div className="fixed bottom-0 w-full bg-primary-dark p-4 shadow-md">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-sm text-white">Valor total:</h3>
                        <p className="font-bold text-white text-3xl">
                            R$ {total.toFixed(2).replace(".", ",")}
                        </p>
                    </div>

                    <Button onClick={handleCheckout}>Confirmar</Button>
                </div>
            </div>
        </>
    );
}
