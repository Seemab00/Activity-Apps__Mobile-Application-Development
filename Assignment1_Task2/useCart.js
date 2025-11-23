import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Custom Hook for cart management
export const useCart = () => {
  const [cart, setCart] = useState([]);

  // Load cart from AsyncStorage when component mounts
  useEffect(() => {
    loadCart();
  }, []);

  // Save cart to AsyncStorage whenever cart changes
  useEffect(() => {
    saveCart();
  }, [cart]);

  const loadCart = async () => {
    try {
      const savedCart = await AsyncStorage.getItem('userCart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.log('Error loading cart:', error);
    }
  };

  const saveCart = async () => {
    try {
      await AsyncStorage.setItem('userCart', JSON.stringify(cart));
    } catch (error) {
      console.log('Error saving cart:', error);
    }
  };

  const addToCart = (item) => {
    setCart(prevCart => [...prevCart, { ...item, id: Date.now().toString() }]);
  };

  const clearCart = async () => {
    setCart([]);
    try {
      await AsyncStorage.removeItem('userCart');
    } catch (error) {
      console.log('Error clearing cart:', error);
    }
  };

  return {
    cart,
    addToCart,
    clearCart,
    cartCount: cart.length
  };
};