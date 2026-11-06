import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { products as initialProducts } from '../data/products';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    // 1. Dinamik Ürün Listesi (Yönetici Panelinden düzenlenebilir)
    const [products, setProducts] = useState(() => {
        try {
            const savedProducts = localStorage.getItem('korkmaz_ceviz_products');
            return savedProducts ? JSON.parse(savedProducts) : initialProducts;
        } catch (error) {
            return initialProducts;
        }
    });

    // 2. Sipariş Logları (İsim - Soyisim - KG - TL - Tikler)
    const [orders, setOrders] = useState(() => {
        try {
            const savedOrders = localStorage.getItem('korkmaz_ceviz_orders');
            return savedOrders ? JSON.parse(savedOrders) : [];
        } catch (error) {
            return [];
        }
    });

    // Senin Google Apps Script Web App URL'n doğrudan varsayılan olarak tanımlandı:
    const DEFAULT_SHEET_URL = "https://script.google.com/macros/s/AKfycbz4Dc2D13BjzsNKd_Bxja8oBQ1J1Hb6RY97bP9yOseh7q4X416KdChAy_rX4WrsIsaV/exec";

    const [sheetWebhookUrl, setSheetWebhookUrl] = useState(() => {
        return localStorage.getItem('korkmaz_ceviz_sheet_url') || import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL || DEFAULT_SHEET_URL;
    });

    const [isAdminOpen, setIsAdminOpen] = useState(false);

    // Gizli URL (#yonetim) ve Klavye Kısayolu (Ctrl + Shift + Y) dinleyicisi
    useEffect(() => {
        const checkHash = () => {
            if (window.location.hash === '#yonetim' || window.location.pathname === '/yonetim') {
                setIsAdminOpen(true);
            }
        };

        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.shiftKey && (e.key === 'Y' || e.key === 'y')) {
                e.preventDefault();
                setIsAdminOpen(prev => !prev);
            }
        };

        checkHash();
        window.addEventListener('hashchange', checkHash);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('hashchange', checkHash);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

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

    // Ürünler değiştiğinde kaydet
    useEffect(() => {
        try {
            localStorage.setItem('korkmaz_ceviz_products', JSON.stringify(products));
        } catch (error) {
            console.error('Ürünler kaydedilemedi:', error);
        }
    }, [products]);

    // Siparişler değiştiğinde kaydet
    useEffect(() => {
        try {
            localStorage.setItem('korkmaz_ceviz_orders', JSON.stringify(orders));
        } catch (error) {
            console.error('Siparişler kaydedilemedi:', error);
        }
    }, [orders]);

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

    // Google Sheets'ten başlangıçta verileri çek (GET)
    const fetchFromGoogleSheets = async (urlToUse = sheetWebhookUrl) => {
        if (!urlToUse) return;
        try {
            const response = await fetch(urlToUse);
            const data = await response.json();
            if (data.status === 'success') {
                if (Array.isArray(data.orders)) {
                    setOrders(data.orders);
                }
                if (Array.isArray(data.products) && data.products.length > 0) {
                    setProducts(data.products);
                }
            }
        } catch (err) {
            console.error("Google Sheets veri çekme hatası:", err);
        }
    };

    // Sayfa ilk yüklendiğinde veya sheetWebhookUrl değiştiğinde tabloyu oku
    useEffect(() => {
        if (sheetWebhookUrl) {
            fetchFromGoogleSheets(sheetWebhookUrl);
        }
    }, [sheetWebhookUrl]);

    // Google Sheets üzerinden şifre doğrulama (Sunucu tarafı Brute-Force korumalı)
    const verifyAdminPin = async (pinInput) => {
        const targetUrl = sheetWebhookUrl || DEFAULT_SHEET_URL;
        try {
            const response = await fetch(targetUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify({ action: 'VERIFY_PIN', adminPin: pinInput })
            });
            const result = await response.json();
            if (result.authorized) {
                sessionStorage.setItem('korkmaz_admin_token', pinInput);
            }
            return result;
        } catch (err) {
            console.error("Doğrulama hatası:", err);
            return { authorized: false, message: 'Sunucuya bağlanılamadı.' };
        }
    };

    // Google Sheets'e veri gönderme (Yönetici işlemleri için adminPin otomatik eklenir)
    const syncToGoogleSheets = async (action, payload) => {
        const targetUrl = sheetWebhookUrl || DEFAULT_SHEET_URL;
        if (!targetUrl) return;

        const adminPin = sessionStorage.getItem('korkmaz_admin_token') || '';

        try {
            await fetch(targetUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify({ action, adminPin, ...payload })
            });
        } catch (err) {
            console.error("Google Sheets senkronizasyon hatası:", err);
        }
    };

    // Siparişi kaydet ve sepeti temizle
    const saveOrderAndClear = (orderData) => {
        const newOrder = {
            id: Date.now(),
            date: new Date().toLocaleString('tr-TR'),
            fullName: orderData.fullName,
            phone: orderData.phone,
            address: orderData.address || '-',
            locationUrl: orderData.locationUrl || '',
            note: orderData.note || '-',
            itemsSummary: orderData.cartSummary,
            totalWeight: orderData.totalWeight,
            totalPrice: orderData.totalPrice,
            isPaid: false,    // Parası Alındı
            isShipped: false  // Paket Gönderildi
        };

        setOrders(prev => [newOrder, ...prev]);
        setCartItems([]);
        localStorage.removeItem('korkmaz_ceviz_cart');

        // Google E-Tablolar'a otomatik gönder
        syncToGoogleSheets('NEW_ORDER', { order: newOrder });
    };

    // Sipariş Durumu Güncelleme (Parası Alındı / Paket Gönderildi tikleri)
    const toggleOrderStatus = (orderId, field) => {
        setOrders(prev => prev.map(order => {
            if (order.id === orderId) {
                const updated = { ...order, [field]: !order[field] };
                syncToGoogleSheets('UPDATE_ORDER_STATUS', { id: orderId, isPaid: updated.isPaid, isShipped: updated.isShipped });
                return updated;
            }
            return order;
        }));
    };

    const deleteOrder = (orderId) => {
        setOrders(prev => prev.filter(order => order.id !== orderId));
        syncToGoogleSheets('DELETE_ORDER', { id: orderId });
    };

    // Ürün Ekleme / Güncelleme / Silme
    const saveProduct = (productData) => {
        setProducts(prev => {
            const exists = prev.some(p => p.id === productData.id);
            const updatedProducts = exists
                ? prev.map(p => p.id === productData.id ? productData : p)
                : [...prev, productData];

            syncToGoogleSheets('SYNC_PRODUCTS', { products: updatedProducts });
            return updatedProducts;
        });
    };

    const deleteProduct = (productId) => {
        setProducts(prev => {
            const updatedProducts = prev.filter(p => p.id !== productId);
            syncToGoogleSheets('SYNC_PRODUCTS', { products: updatedProducts });
            return updatedProducts;
        });
    };

    const resetProductsToDefault = () => {
        setProducts(initialProducts);
        localStorage.removeItem('korkmaz_ceviz_products');
        syncToGoogleSheets('SYNC_PRODUCTS', { products: initialProducts });
    };

    const saveSheetUrl = (url) => {
        setSheetWebhookUrl(url);
        localStorage.setItem('korkmaz_ceviz_sheet_url', url);
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
        saveOrderAndClear,
        isCartOpen,
        toggleCart,
        closeCart,
        openCart,
        cartTotals,
        // Yönetici Paneli & Ürün State'leri:
        products,
        saveProduct,
        deleteProduct,
        resetProductsToDefault,
        orders,
        toggleOrderStatus,
        deleteOrder,
        isAdminOpen,
        openAdmin: () => setIsAdminOpen(true),
        closeAdmin: () => {
            setIsAdminOpen(false);
            if (window.location.hash === '#yonetim') {
                window.history.replaceState(null, '', window.location.pathname);
            }
        },
        sheetWebhookUrl,
        saveSheetUrl,
        verifyAdminPin
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};