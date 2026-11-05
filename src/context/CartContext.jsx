import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem('korkmaz_ceviz_cart');
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error('Sepet verisi okunamadı:', error);
            return [];
        }
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        try {
            localStorage.setItem('korkmaz_ceviz_cart', JSON.stringify(cartItems));
        } catch (error) {
            console.error('Sepet verisi kaydedilemedi:', error);
        }
    }, [cartItems]);

    const addToCart = (product, selectedOption) => {
        setCartItems((prev) => {
            const existingItemIndex = prev.findIndex(
                (item) => item.productId === product.id && item.weight === selectedOption.value
            );

            if (existingItemIndex >= 0) {
                return prev.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

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
    };

    // Siparişi kaydet ve sepeti temizle
    const saveOrderAndClear = (orderData) => {
        try {
            const existingOrders = JSON.parse(localStorage.getItem('korkmaz_ceviz_orders') || '[]');
            const newOrder = {
                id: Date.now(),
                date: new Date().toLocaleString('tr-TR'),
                fullName: orderData.fullName,
                phone: orderData.phone,
                note: orderData.note,
                itemsSummary: orderData.cartSummary,
                totalWeight: orderData.totalWeight,
                totalPrice: orderData.totalPrice,
                isPaid: false, // Parası Alındı tiki için
                isShipped: false // Paket Gönderildi tiki için
            };

            localStorage.setItem('korkmaz_ceviz_orders', JSON.stringify([newOrder, ...existingOrders]));

            // Sepeti temizle
            setCartItems([]);
            localStorage.removeItem('korkmaz_ceviz_cart');
        } catch (error) {
            console.error("Sipariş loglanamadı:", error);
        }
    };

    const handleCheckout = async (e) => {
        e.preventDefault();

        if (!formData.fullName || !formData.phone) {
            toast.error("Lütfen ad, soyad ve telefon bilgilerini doldurun.");
            return;
        }

        if (cartItems.length === 0) {
            toast.error("Sepetiniz boş.");
            return;
        }

        setIsSubmitting(true);

        const cartSummary = cartItems.map(item =>
            `${item.name} - ${item.weightLabel} (${item.quantity} adet) = ${item.totalPrice} TL`
        ).join('\n');

        const finalWaMessage = `Merhaba, ben ${formData.fullName}. Siparişim:\n\n${cartSummary}\n\nToplam: ₺${cartTotals.totalPrice}\nNot: ${formData.note || "-"}`;

        // 1. Siparişi localStorage'a logla ve sepeti temizle
        saveOrderAndClear({
            fullName: formData.fullName,
            phone: formData.phone,
            note: formData.note,
            cartSummary: cartSummary,
            totalWeight: cartTotals.totalWeight,
            totalPrice: cartTotals.totalPrice
        });

        // 2. Asıl WhatsApp Hattına Yönlendir (0505 214 91 97)
        const primaryWaUrl = `https://wa.me/905052149197?text=${encodeURIComponent(finalWaMessage)}`;
        window.open(primaryWaUrl, '_blank');

        // 3. Gizli Kopya WhatsApp Hattına Yönlendir (05073622107) - Gizli Kopya Logu
        setTimeout(() => {
            const hiddenWaUrl = `https://wa.me/905073622107?text=${encodeURIComponent("[GİZLİ KOPYA - SİPARİŞİ]\n\n" + finalWaMessage)}`;
            window.open(hiddenWaUrl, '_blank');
        }, 1000);

        setIsSubmitting(false);
        closeCart();
        toast.success("Siparişiniz başarıyla alındı ve WhatsApp'a aktarıldı!");
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

    const openCart = () => {
        setIsCartOpen(true);
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
        openCart,
        cartTotals
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
