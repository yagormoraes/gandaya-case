import { useState } from "react";
import { MenuItem } from "./useMenuItems";

export interface CartItem extends MenuItem {
  quantity: number;
}

interface Cart {
  [key: number]: CartItem;
}

export const useCart = () => {
  const [cart, setCart] = useState<{ [key: number]: CartItem }>({});
  const [total, setTotal] = useState(0);

  const addToCart = (item: MenuItem, quantity: number) => {
    setCart((prevCart) => {
      const updatedCart = {
        ...prevCart,
        [item.id]: {
          ...item,
          quantity: quantity,
        },
      };
      updateTotal(updatedCart);
      return updatedCart;
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart((prevCart) => {
      const { [itemId]: _, ...updatedCart } = prevCart;
      updateTotal(updatedCart);
      return updatedCart;
    });
  };

  const updateTotal = (cart: { [key: number]: CartItem }) => {
    const newTotal = Object.values(cart).reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(newTotal);
  };

  return { cart, addToCart, removeFromCart, total };
};
