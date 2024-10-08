import { useState, useEffect } from "react";

export interface CartItem {
  availableQuantity: number;
  id: number;
  item: string;
  price: number;
  image: string;
  quantity: number;
}


export const useCart = () => {
  const [cart, setCart] = useState<{ [key: number]: CartItem }>({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart)); 
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateTotal();
  }, [cart]);

  const addToCart = (item: CartItem, quantity: number) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[item.id]) {
        newCart[item.id].quantity = quantity;
      } else {
        newCart[item.id] = { ...item, quantity };
      }
      return newCart;
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart((prevCart) => {
      const { [itemId]: _, ...newCart } = prevCart;
      return newCart;
    });
  };

  const updateTotal = () => {
    const newTotal = Object.values(cart).reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  };

  return { cart, addToCart, removeFromCart, total };
};
