import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

const CartModal = () => {
    const { isCartOpen, closeCart, cartItems, cartTotals, removeFromCart, saveOrderAndClear } = useCart();

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        address: '',
        locationUrl: '',
        note: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLocating, setIsLocating] = useState(false);

    if (!isCartOpen) return null;

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Tek tıkla GPS üzerinden Google Maps Linki oluşturma (Hibrit Çözüm)
    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            toast.error("Tarayıcınız konum özelliğini desteklemiyor.");
            return;
        }

        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
                setFormData(prev => ({
                    ...prev,
                    locationUrl: mapsUrl
                }));
                setIsLocating(false);
                toast.success("Google Maps konumunuz başarıyla eklendi!");
            },
            (error) => {
                console.error("Konum hatası:", error);
                setIsLocating(false);
                toast.error("Konum alınamadı. Lütfen açık adresinizi yazın.");
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    };

    const handleCheckout = async (e) => {
        e.preventDefault();

        if (!formData.fullName.trim() || !formData.phone.trim()) {
            toast.error("Lütfen ad, soyad ve telefon bilgilerini doldurun.");
            return;
        }

        if (!formData.address.trim() && !formData.locationUrl) {
            toast.error("Lütfen açık adresinizi yazın veya konumunuzu ekleyin.");
            return;
        }

        if (cartItems.length === 0) {
            toast.error("Sepetiniz boş.");
            return;
        }

        setIsSubmitting(true);

        try {
            const cartSummary = cartItems.map(item =>
                `${item.name} - ${item.weightLabel} (${item.quantity} adet) = ${item.totalPrice * item.quantity} TL`
            ).join('\n');

            // 1. Siparişi localStorage'a logla ve sepeti temizle
            if (saveOrderAndClear) {
                saveOrderAndClear({
                    fullName: formData.fullName,
                    phone: formData.phone,
                    address: formData.address,
                    locationUrl: formData.locationUrl,
                    note: formData.note,
                    items: cartItems,
                    cartSummary: cartSummary,
                    totalWeight: cartTotals.totalWeight,
                    totalPrice: cartTotals.totalPrice
                });
            }

            // 2. WhatsApp Mesajını Hazırla ve Yönlendir (0505 214 91 97)
            const locationText = formData.locationUrl ? `\n📍 Harita Konumu: ${formData.locationUrl}` : '';
            const addressText = formData.address ? `\n🏠 Açık Adres: ${formData.address}` : '';

            const finalWaMessage = `Merhaba, ben ${formData.fullName}. Siparişim:\n\n${cartSummary}\n\nToplam Ağırlık: ${cartTotals.totalWeight} kg\nToplam Tutar: ₺${cartTotals.totalPrice}${addressText}${locationText}\n📝 Not: ${formData.note || "-"}`;

            const url = `https://wa.me/905052149197?text=${encodeURIComponent(finalWaMessage)}`;
            window.open(url, '_blank');

            setFormData({ fullName: '', phone: '', address: '', locationUrl: '', note: '' });
            closeCart();
            toast.success("Siparişiniz alındı! WhatsApp'a yönlendiriliyorsunuz.");
        } catch (err) {
            console.error("Sipariş hatası:", err);
            toast.error("Bir hata oluştu.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="fixed inset-0 bg-on-background/40 backdrop-blur-sm z-40 transition-opacity" onClick={closeCart}></div>

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12 pointer-events-none">
                <div className="w-full max-w-5xl bg-surface rounded-xl shadow-2xl flex flex-col md:flex-row overflow-hidden relative pointer-events-auto max-h-full">

                    {/* Sol Kısım: Sepet Özeti */}
                    <div className="w-full md:w-5/12 bg-surface-container-low border-r border-outline-variant/20 p-8 flex flex-col h-full overflow-hidden">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="font-headline text-3xl text-primary">Sepetim</h2>
                            <span className="material-symbols-outlined text-outline">shopping_bag</span>
                        </div>

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
                                                <button onClick={() => removeFromCart(item.id)} className="text-on-surface-variant hover:text-error ml-2 cursor-pointer">
                                                    <span className="material-symbols-outlined text-sm">close</span>
                                                </button>
                                            </div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="bg-secondary-container text-on-secondary-container text-xs px-2 py-1 rounded-full">{item.weightLabel}</span>
                                            </div>
                                            <div className="flex items-center justify-between mt-2">
                                                <span className="text-sm text-on-surface-variant">{item.quantity} Adet</span>
                                                <span className="font-semibold text-secondary">{item.totalPrice * item.quantity} TL</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

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

                    {/* Sağ Kısım: Form ve Hibrit Konum Alanı */}
                    <div className="w-full md:w-7/12 bg-surface-container-lowest p-8 md:p-12 flex flex-col justify-center relative overflow-y-auto">
                        <button onClick={closeCart} className="absolute top-6 right-6 text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
                            <span className="material-symbols-outlined text-3xl">close</span>
                        </button>

                        <div className="max-w-md mx-auto w-full">
                            <h2 className="font-headline text-4xl text-on-surface mb-2">Siparişi Tamamla</h2>
                            <p className="text-on-surface-variant mb-6 font-body text-sm">Bilgilerinizi girin, siparişinizi WhatsApp üzerinden hızlıca onaylayalım.</p>

                            <form className="space-y-4" onSubmit={handleCheckout}>
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-on-surface mb-1 font-body">Ad Soyad</label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-2.5 text-on-surface text-sm focus:border-secondary outline-none"
                                        placeholder="Örn: Ahmet Yılmaz"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-on-surface mb-1 font-body">Telefon Numarası</label>
                                    <div className="flex relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">+90</span>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg pl-12 pr-4 py-2.5 text-on-surface text-sm focus:border-secondary outline-none"
                                            placeholder="5XX XXX XX XX"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Hibrit Konum & Adres Alanı */}
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <label htmlFor="address" className="block text-sm font-medium text-on-surface font-body">
                                            Açık Adres / Konum Bilgisi
                                        </label>
                                        <button
                                            type="button"
                                            onClick={handleGetLocation}
                                            disabled={isLocating}
                                            className="text-xs font-semibold text-secondary hover:text-primary flex items-center gap-1 bg-secondary-container/40 px-2 py-1 rounded-full transition-colors cursor-pointer"
                                        >
                                            <span className="material-symbols-outlined text-[14px]">my_location</span>
                                            {isLocating ? "Konum Alınıyor..." : formData.locationUrl ? "Konum Eklendi ✓" : "GPS Konumumu Ekle"}
                                        </button>
                                    </div>

                                    {formData.locationUrl && (
                                        <div className="mb-2 p-2 bg-secondary-container/20 border border-secondary/30 rounded-lg flex items-center justify-between text-xs">
                                            <a href={formData.locationUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline truncate flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px] text-secondary">location_on</span>
                                                Google Maps Konumu Eklendi (Kontrol Et)
                                            </a>
                                            <button type="button" onClick={() => setFormData(prev => ({ ...prev, locationUrl: '' }))} className="text-error hover:underline ml-2 shrink-0 cursor-pointer">Kaldır</button>
                                        </div>
                                    )}

                                    <textarea
                                        id="address"
                                        name="address"
                                        rows="2"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-2 text-on-surface text-sm focus:border-secondary outline-none resize-none"
                                        placeholder="Mahalle, sokak, bina no, daire veya tarif girin..."
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="note" className="block text-sm font-medium text-on-surface mb-1 font-body">Sipariş Notu (İsteğe bağlı)</label>
                                    <input
                                        type="text"
                                        id="note"
                                        name="note"
                                        value={formData.note}
                                        onChange={handleInputChange}
                                        className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg px-4 py-2 text-on-surface text-sm focus:border-secondary outline-none"
                                        placeholder="Örn: Hafta sonu teslim edilsin."
                                    />
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting || cartItems.length === 0}
                                        className="w-full bg-primary hover:bg-primary-container text-on-primary rounded-xl py-3.5 px-6 flex items-center justify-center gap-3 transition-all shadow-sm disabled:opacity-50 cursor-pointer"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">chat</span>
                                        <span className="font-body font-semibold text-base">
                                            {isSubmitting ? "Gönderiliyor..." : "WhatsApp ile Siparişi Tamamla"}
                                        </span>
                                    </button>
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