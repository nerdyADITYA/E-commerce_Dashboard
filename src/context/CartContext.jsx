/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../services/storage';
import { useAuth } from './AuthContext';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cart, setCart] = useState(() => {
        return user ? storage.get(`cart_${user.email}`, []) : [];
    });
    const [prevUserEmail, setPrevUserEmail] = useState(user?.email);

    if (user?.email !== prevUserEmail) {
        setPrevUserEmail(user?.email);
        setCart(user ? storage.get(`cart_${user.email}`, []) : []);
    }

    useEffect(() => {
        if (user) {
            storage.set(`cart_${user.email}`, cart);
        }
    }, [cart, user]);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev; // Prevent duplicates, as per requirements
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const updateQuantity = (productId, amount) => {
        setCart(prev => prev.map(item => {
            if (item.id === productId) {
                const newQuantity = item.quantity + amount;
                return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
            }
            return item;
        }));
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, cartTotal, cartItemCount }}>
            {children}
        </CartContext.Provider>
    );
};
