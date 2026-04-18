import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import emailjs from '@emailjs/browser';

const CartModal = () => {
    const { isCartOpen, closeCart, cartItems, cartTotals, removeFromCart } = useCart();
    
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        note: ''
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isCartOpen) return null;

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        
        if (!formData.fullName || !formData.phone) {
            alert("Lütfen ad, soyad ve telefon alanı bilgilerini doldurun.");
            return;
        }
        
        if (cartItems.length === 0) {
            alert("Sepetiniz boş.");
            return;
        }

        setIsSubmitting(true);

        // 1. Prepare Whatsapp and Email Message Arrays
        const cartSummary = cartItems.map(item => 
            `${item.name} - ${item.weightLabel} (${item.quantity} adet) = ${item.totalPrice} TL`
        ).join('\n');

        // EmailJS Parameters
        const templateParams = {
            user_name: formData.fullName,
            user_phone: formData.phone,
            message: formData.note,
            cart_summary: cartSummary,
            total_price: cartTotals.totalPrice
        };

        try {
            // EmailJS GÖNDERİMİ
            // GERÇEK ORTAMDA AŞAĞIDAKİ KEY'LERİ DEĞİŞTİRİN
            /* 
              const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
              const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
              const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";
            */
            
            // Eğer apiKey varsa EmailJS kullanılır, yoksa atlanır; test edebilmeniz için catch içine alıyoruz.
            await emailjs.send(
                'YOUR_SERVICE_ID', 
                'YOUR_TEMPLATE_ID', 
                templateParams, 
                'YOUR_PUBLIC_KEY'
            );
            console.log("Email başarıyla gönderildi!");
        } catch (error) {
            console.error("EmailJS gönderim hatası (Anahtarlar boş olabilir): ", error);
        }

        // 2. WhatsApp Yönlendirmesi
        const finalWaMessage = `Merhaba, ben ${formData.fullName}. Siparişim:\n\n${cartSummary}\n\nToplam: ₺${cartTotals.totalPrice}\nNot: ${formData.note || "-"}`;
        const url = `https://wa.me/905052149197?text=${encodeURIComponent(finalWaMessage)}`;
        
        window.open(url, '_blank');
        
        setIsSubmitting(false);
        // İsteğe bağlı: Sipariş sonrası sepeti temizleyebiliriz
        // clearCart();
        // closeCart();
    };

    return (
        <>
            {/* Dark Overlay */}
            <div 
                className="fixed inset-0 bg-on-background/40 backdrop-blur-sm z-40 transition-opacity"
                onClick={closeCart}
            ></div>
            
            {/* Main Modal Container */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 pointer-events-none">
                <div className="w-full max-w-5xl bg-surface rounded-xl shadow-2xl flex flex-col md:flex-row overflow-hidden relative pointer-events-auto max-h-full">
                    
                    {/* Left Side: Cart Sidebar */}
                    <div className="w-full md:w-5/12 bg-surface-container-low border-r border-outline-variant/20 p-8 flex flex-col h-full overflow-hidden">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="font-headline text-3xl text-primary">Sepetim</h2>
                            <span className="material-symbols-outlined text-outline" style={{ fontVariationSettings: "'FILL' 0" }}>shopping_bag</span>
                        </div>
                        
                        {/* Cart Items List */}
                        <div className="flex-1 overflow-y-auto space-y-6 mb-8 pr-2">
                            {cartItems.length === 0 ? (
                                <p className="text-on-surface-variant text-sm">Sepetinizde ürün bulunmamaktadır.</p>
                            ) : (
                                cartItems.map(item => (
                                    <div key={item.id} className="flex items-start gap-4">
                                        <div className="w-20 h-20 bg-surface rounded-lg overflow-hidden shrink-0">
                                            <img src={item.image} alt={item.imageAlt} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-headline text-lg text-on-surface mb-1 flex-1">{item.name}</h3>
                                                <button onClick={() => removeFromCart(item.id)} className="text-on-surface-variant hover:text-error ml-2">
                                                    <span className="material-symbols-outlined text-sm">close</span>
                                                </button>
                                            </div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="bg-secondary-container text-on-secondary-container text-xs px-2 py-1 rounded-full">{item.weightLabel}</span>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <span className="text-sm text-on-surface-variant">{item.quantity} Adet</span>
                                                <span className="font-semibold text-secondary">{item.totalPrice} TL</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        
                        {/* Cart Summary */}
                        <div className="pt-6 border-t border-outline-variant/30">
                            <div className="flex justify-between text-on-surface-variant mb-2">
                                <span>Toplam Ağırlık</span>
                                <span>{cartTotals.totalWeight} kg</span>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <span className="font-headline text-xl">Toplam Tutar</span>
                                <span className="font-headline text-2xl text-primary">{cartTotals.totalPrice} TL</span>
                            </div>
                            <p className="text-xs text-outline mt-2 text-right">Kargo ücreti dahil değildir.</p>
                        </div>
                    </div>
                    
                    {/* Right Side: Checkout Form */}
                    <div className="w-full md:w-7/12 bg-surface-container-lowest p-8 md:p-12 flex flex-col justify-center relative overflow-y-auto">
                        <button 
                            onClick={closeCart}
                            className="absolute top-6 right-6 text-on-surface-variant hover:text-primary transition-colors"
                        >
                            <span className="material-symbols-outlined text-3xl">close</span>
                        </button>
                        
                        <div className="max-w-md mx-auto w-full">
                            <h2 className="font-headline text-4xl text-on-surface mb-2">Siparişi Tamamla</h2>
                            <p className="text-on-surface-variant mb-8 font-body">Bilgilerinizi girin, siparişinizi WhatsApp üzerinden hızlıca onaylayalım.</p>
                            
                            <form className="space-y-6" onSubmit={handleCheckout}>
                                {/* Full Name Input */}
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-on-surface mb-2 font-body">Ad Soyad</label>
                                    <input 
                                        type="text" 
                                        id="fullName" 
                                        name="fullName" 
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-3 text-on-surface focus:bg-surface-container-lowest focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all font-body" 
                                        placeholder="Örn: Ahmet Yılmaz" 
                                        required
                                    />
                                </div>
                                {/* Phone Number Input */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-on-surface mb-2 font-body">Telefon Numarası</label>
                                    <div className="flex relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-body">+90</span>
                                        <input 
                                            type="tel" 
                                            id="phone" 
                                            name="phone" 
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg pl-12 pr-4 py-3 text-on-surface focus:bg-surface-container-lowest focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all font-body" 
                                            placeholder="5XX XXX XX XX" 
                                            required
                                        />
                                    </div>
                                </div>
                                {/* Delivery Note */}
                                <div>
                                    <label htmlFor="note" className="block text-sm font-medium text-on-surface mb-2 font-body">Sipariş Notu (İsteğe bağlı)</label>
                                    <textarea 
                                        id="note" 
                                        name="note" 
                                        rows="2"
                                        value={formData.note}
                                        onChange={handleInputChange}
                                        className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-3 text-on-surface focus:bg-surface-container-lowest focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all font-body resize-none" 
                                        placeholder="Örn: Hafta sonu teslim edilsin."
                                    ></textarea>
                                </div>
                                {/* Action Button */}
                                <div className="pt-4">
                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting || cartItems.length === 0}
                                        className="w-full bg-primary hover:bg-primary-container text-on-primary rounded-xl py-4 px-6 flex items-center justify-center gap-3 transition-all duration-300 transform hover:-translate-y-[2px] shadow-sm disabled:opacity-50 disabled:hover:-translate-y-0 disabled:cursor-not-allowed"
                                    >
                                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
                                        <span className="font-body font-semibold text-lg tracking-wide">
                                            {isSubmitting ? "Gönderiliyor..." : "WhatsApp ile Sipariş Ver"}
                                        </span>
                                    </button>
                                    <p className="text-xs text-center text-outline mt-4 font-body">Siparişiniz WhatsApp destek hattımıza (0505 214 91 97) iletilecektir.</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartModal;
