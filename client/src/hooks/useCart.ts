import { useState } from "react";
import { MenuItem } from "./useMenuItems";

export interface CartItem extends MenuItem {
  quantity: number;
}

interface Cart {
  [key: number]: CartItem;
}

export const useCart = () => {
  const [cart, setCart] = useState<Cart>({});
  const [total, setTotal] = useState<number>(0);

  const addToCart = (item: CartItem, quantity: number) => {
    setCart((prev: Cart) => {
      const newCart = { ...prev, [item.id]: { ...item, quantity } };
      updateTotal(newCart);
      return newCart;
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart((prev: Cart) => {
      const { [itemId]: _, ...newCart } = prev;
      updateTotal(newCart);
      return newCart;
    });
  };

  const updateTotal = (cart: Cart) => {
    const newTotal = Object.values(cart).reduce(
      (acc: number, item: CartItem) => acc + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  };

  return { cart, addToCart, removeFromCart, total };
};
