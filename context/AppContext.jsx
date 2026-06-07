"use client";

import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { productsDummyData, agentsData, getAgentById } from "@/assets/realEstateData";

const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const router = useRouter();

  const currency = process.env.NEXT_PUBLIC_CURRENCY || "₦";

  const [products] = useState(productsDummyData);
  const [agents] = useState(agentsData);
  const [cartItems, setCartItems] = useState({});

  // Format a property price, e.g. 925000 -> "$925,000"
  const formatPrice = (amount) =>
    `${currency}${Number(amount || 0).toLocaleString()}`;

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const updateCartQuantity = (itemId, quantity) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (quantity <= 0) {
        delete updated[itemId];
      } else {
        updated[itemId] = quantity;
      }
      return updated;
    });
  };

  const getCartCount = () =>
    Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

  const getCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [id, qty]) => {
      const product = products.find((p) => p._id === id);
      return product ? total + product.offerPrice * qty : total;
    }, 0);
  };

  const value = {
    router,
    currency,
    formatPrice,
    products,
    agents,
    getAgentById,
    cartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext must be used within AppContextProvider");
  }
  return ctx;
};

export default AppContext;
