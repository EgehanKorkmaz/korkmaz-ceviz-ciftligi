import React, { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (product, selectedOption) => {
        setCartItems((prev) => {
            const existingItemIndex = prev.findIndex(
                (item) => item.productId === product.id && item.weight === selectedOption.value
            );

            if (existingItemIndex >= 0) {
                // If the same product and weight already exists in cart, increase quantity
                const updatedItems = [...prev];
                updatedItems[existingItemIndex].quantity += 1;
                return updatedItems;
            }

            // Otherwise, add a new item
            const newItem = {
                id: `${product.id}-${selectedOption.value}`,
                productId: product.id,
                name: product.name,
                image: product.image,
                imageAlt: product.imageAlt,
                weightLabel: selectedOption.label,
                weight: selectedOption.value,
                pricePerKg: product.price,
                totalPrice: product.price * selectedOption.value,
                quantity: 1
            };
            return [...prev, newItem];
        });
        
        // Open cart modal automatically when an item is added (disabled in favor of Toast)
        // setIsCartOpen(true);
    };

    const removeFromCart = (cartItemId) => {
        setCartItems((prev) => prev.filter(item => item.id !== cartItemId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const toggleCart = () => {
        setIsCartOpen(prev => !prev);
    };

    const closeCart = () => {
        setIsCartOpen(false);
    };

    const cartTotals = useMemo(() => {
        const totalWeight = cartItems.reduce((sum, item) => sum + (item.weight * item.quantity), 0);
        const totalPrice = cartItems.reduce((sum, item) => sum + (item.totalPrice * item.quantity), 0);
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        return { totalWeight, totalPrice, totalItems };
    }, [cartItems]);

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        isCartOpen,
        toggleCart,
        closeCart,
        cartTotals
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
