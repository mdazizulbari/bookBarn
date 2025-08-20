import React, { createContext, useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProviders";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Get the user from AuthContext inside the component, not outside
  const { email } = useContext(AuthContext);

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (book) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.title === book.title);
      if (existingItem) {
        return prevItems.map((item) =>
          item.title === book.title
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...book, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (title) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.title !== title)
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, email }}
    >
      {children}
    </CartContext.Provider>
  );
};
