import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [userPreferences, setUserPreferences] = useState({
    theme: 'light',
    username: '',
  });
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = (juice) => {
    setCart(prevCart => {
      const newCart = [...prevCart, { ...juice, id: Date.now().toString() }];
      return newCart;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const updatePreferences = (preferences) => {
    setUserPreferences(prev => ({ ...prev, ...preferences }));
  };

  const setUsername = (username) => {
    setUserPreferences(prev => ({ ...prev, username }));
  };

  const setLoading = (loading) => {
    setIsLoading(loading);
  };

  return (
    <AppContext.Provider value={{
      userPreferences,
      updatePreferences,
      cart,
      addToCart,
      clearCart,
      setUsername,
      isLoading,
      setLoading,
      cartCount: cart.length
    }}>
      {children}
    </AppContext.Provider>
  );
};