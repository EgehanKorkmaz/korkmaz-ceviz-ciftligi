import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const TAG_COLORS = [
    { label: 'Yeşil (Hasat / Taze)', value: 'bg-secondary-container text-on-secondary-container' },
    { label: 'Kırmızı (Tükenmek Üzere)', value: 'bg-error-container text-on-error-container' },
    { label: 'Krem / Özel (Özel Hasat)', value: 'bg-surface-variant text-on-surface-variant border border-outline-variant/30' }
];

const AdminPanel = () => {
    const {
        isAdminOpen, closeAdmin,
        products, saveProduct, deleteProduct, resetProductsToDefault,
        orders, toggleOrderStatus, deleteOrder,
        sheetWebhookUrl, saveSheetUrl
    } = useCart();

    const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'products' | 'sheets'
    const [editingProduct, setEditingProduct] = useState(null);
    const [tempSheetUrl, setTempSheetUrl] = useState(sheetWebhookUrl || '');

    // Şifre koruması state'leri (Varsayılan şifre: 1999 veya .env üzerinden VITE_ADMIN_PIN)
    const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN || '163162';
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return sessionStorage.getItem('korkmaz_admin_auth') === 'true';
    });
    const [pinInput, setPinInput] = useState('');

    if (!isAdminOpen) return null;

    const handlePinSubmit = (e) => {
        e.preventDefault();
        if (pinInput === ADMIN_PIN) {
            setIsAuthenticated(true);
            sessionStorage.setItem('korkmaz_admin_auth', 'true');
            setPinInput('');
            toast.success('Yönetici girişi başarılı!');
        } else {
            toast.error('Hatalı yönetici şifresi!');
            setPinInput('');
        }
    };

    // Eğer şifre henüz girilmediyse sadece Şifre Ekranını göster:
    if (!isAuthenticated) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-on-background/60 backdrop-blur-sm p-4">
                <div className="w-full max-w-sm bg-surface rounded-2xl shadow-2xl border border-outline-variant/30 p-8 text-center relative">
                    <button
                        onClick={closeAdmin}
                        className="absolute top-4 right-4 text-on-surface-variant hover:text-error cursor-pointer"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="material-symbols-outlined text-2xl">lock</span>
                    </div>
                    <h2 className="font-headline text-2xl font-bold text-on-surface mb-1">Yönetici Girişi</h2>
                    <p className="text-xs text-on-surface-variant mb-6">Panele erişmek için yönetici şifrenizi girin.</p>

                    <form onSubmit={handlePinSubmit} className="space-y-4">
                        <input
                            type="password"
                            value={pinInput}
                            onChange={(e) => setPinInput(e.target.value)}
                            placeholder="Şifre..."
                            autoFocus
                            className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-outline-variant/30 text-center text-lg tracking-widest focus:border-secondary outline-none"
                        />
                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl bg-primary text-on-primary font-semibold text-sm hover:opacity-95 transition-opacity cursor-pointer"
                        >
                            Giriş Yap
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    if (!isAdminOpen) return null;

    // Bilgisayardan seçilen resmi otomatik küçültüp (Canvas) Base64'e çevirme
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 800;
                const scaleSize = MAX_WIDTH / img.width;
                canvas.width = img.width > MAX_WIDTH ? MAX_WIDTH : img.width;
                canvas.height = img.width > MAX_WIDTH ? img.height * scaleSize : img.height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const compressedDataUrl = canvas.toDataURL('image/webp', 0.82);

                setEditingProduct(prev => ({ ...prev, image: compressedDataUrl }));
                toast.success('Resim optimize edilerek yüklendi!');
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    };

    const handleProductSubmit = (e) => {
        e.preventDefault();
        if (!editingProduct.name || !editingProduct.price) {
            toast.error('Lütfen ürün adı ve fiyatını girin.');
            return;
        }

        const formattedProduct = {
            ...editingProduct,
            id: editingProduct.id || editingProduct.name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
            price: Number(editingProduct.price),
            unit: editingProduct.unit || 'kg',
        };

        saveProduct(formattedProduct);
        setEditingProduct(null);
        toast.success('Ürün başarıyla kaydedildi!');
    };

    const startNewProduct = () => {
        setEditingProduct({
            id: '',
            name: '',
            description: '',
            price: 200,
            unit: 'kg',
            image: 'https://images.unsplash.com/photo-1563412885-139e4045ec56?auto=format&fit=crop&w=800&q=80',
            imageAlt: 'Korkmaz Ceviz Çiftliği Doğal Ceviz',
            tag: {
                label: 'Yeni Hasat',
                icon: 'eco',
                colorClass: TAG_COLORS[0].value
            }
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-on-background/60 backdrop-blur-sm p-4 md:p-8">
            <div className="w-full max-w-6xl bg-surface rounded-2xl shadow-2xl border border-outline-variant/30 flex flex-col max-h-[90vh] overflow-hidden">

                {/* Üst Başlık ve Sekmeler */}
                <div className="bg-surface-container-low border-b border-outline-variant/20 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary text-3xl">admin_panel_settings</span>
                        <div>
                            <h2 className="font-headline text-2xl font-bold text-primary">Yönetici Paneli</h2>
                            <p className="text-xs text-on-surface-variant">Sipariş Takibi & Ürün Yönetimi</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 bg-surface p-1 rounded-xl border border-outline-variant/20">
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${activeTab === 'orders' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-primary'
                                }`}
                        >
                            <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                            Siparişler ({orders.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('products')}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${activeTab === 'products' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-primary'
                                }`}
                        >
                            <span className="material-symbols-outlined text-[18px]">inventory_2</span>
                            Ceviz Çeşitleri ({products.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('sheets')}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${activeTab === 'sheets' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:text-primary'
                                }`}
                        >
                            <span className="material-symbols-outlined text-[18px]">table_chart</span>
                            Google E-Tablo
                        </button>
                    </div>

                    <button onClick={closeAdmin} className="text-on-surface-variant hover:text-error transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-3xl">close</span>
                    </button>
                </div>

                {/* İçerik Alanı */}
                <div className="flex-1 overflow-y-auto p-6 bg-surface-container-lowest">

                    {/* SEKME 1: SİPARİŞLER VE LOGLAR */}
                    {activeTab === 'orders' && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-headline text-xl font-bold text-on-surface">Gelen Sipariş Logları</h3>
                                <span className="text-xs text-on-surface-variant">
                                    Format: İsim Soyisim - Toplam KG - Toplam TL
                                </span>
                            </div>

                            {orders.length === 0 ? (
                                <div className="text-center py-12 bg-surface-container-low/40 rounded-xl border border-outline-variant/20">
                                    <span className="material-symbols-outlined text-4xl text-outline mb-2">inbox</span>
                                    <p className="text-on-surface-variant text-sm">Henüz kayıtlı sipariş bulunmuyor.</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {orders.map(order => (
                                        <div
                                            key={order.id}
                                            className={`p-4 rounded-xl border transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${order.isPaid && order.isShipped
                                                ? 'bg-secondary-container/15 border-secondary/40'
                                                : 'bg-surface border-outline-variant/25'
                                                }`}
                                        >
                                            <div className="space-y-1 flex-1">
                                                {/* İstediğin İsim - Soyisim - KG - TL ana log satırı */}
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <span className="font-headline font-bold text-lg text-primary">
                                                        {order.fullName} — {order.totalWeight} kg — ₺{order.totalPrice}
                                                    </span>
                                                    <span className="text-xs text-outline bg-surface-container-low px-2 py-0.5 rounded-md">
                                                        {order.date}
                                                    </span>
                                                </div>

                                                <p className="text-xs text-on-surface-variant whitespace-pre-line font-medium">
                                                    📦 {order.itemsSummary}
                                                </p>

                                                <div className="flex flex-wrap items-center gap-4 text-xs text-on-surface-variant pt-1">
                                                    <span>📞 +90 {order.phone}</span>
                                                    {order.address && order.address !== '-' && (
                                                        <span>🏠 {order.address}</span>
                                                    )}
                                                    {order.locationUrl && (
                                                        <a
                                                            href={order.locationUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-secondary font-semibold underline flex items-center gap-0.5"
                                                        >
                                                            <span className="material-symbols-outlined text-[14px]">location_on</span>
                                                            Google Maps Konumu
                                                        </a>
                                                    )}
                                                    {order.note && order.note !== '-' && (
                                                        <span>📝 Not: {order.note}</span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* 2 Adet Tik: Parası Alındı & Paket Gönderildi */}
                                            <div className="flex flex-wrap items-center gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-outline-variant/20">
                                                <label className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-semibold cursor-pointer select-none transition-all ${order.isPaid
                                                    ? 'bg-secondary text-on-primary border-secondary'
                                                    : 'bg-surface-container-low text-on-surface border-outline-variant/30 hover:border-secondary'
                                                    }`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={!!order.isPaid}
                                                        onChange={() => toggleOrderStatus(order.id, 'isPaid')}
                                                        className="w-4 h-4 accent-primary cursor-pointer"
                                                    />
                                                    <span>Parası Alındı</span>
                                                </label>

                                                <label className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-semibold cursor-pointer select-none transition-all ${order.isShipped
                                                    ? 'bg-primary text-on-primary border-primary'
                                                    : 'bg-surface-container-low text-on-surface border-outline-variant/30 hover:border-primary'
                                                    }`}>
                                                    <input
                                                        type="checkbox"
                                                        checked={!!order.isShipped}
                                                        onChange={() => toggleOrderStatus(order.id, 'isShipped')}
                                                        className="w-4 h-4 accent-primary cursor-pointer"
                                                    />
                                                    <span>Paket Gönderildi</span>
                                                </label>

                                                <button
                                                    onClick={() => deleteOrder(order.id)}
                                                    className="p-2 text-on-surface-variant hover:text-error transition-colors cursor-pointer"
                                                    title="Siparişi Sil"
                                                >
                                                    <span className="material-symbols-outlined text-[20px]">delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* SEKME 2: CEVİZ ÇEŞİTLERİ DÜZENLEME & EKLEME */}
                    {activeTab === 'products' && (
                        <div>
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                                <div>
                                    <h3 className="font-headline text-xl font-bold text-on-surface">Ürün ve Resim Yönetimi</h3>
                                    <p className="text-xs text-on-surface-variant">Mevcut ceviz çeşitlerini düzenleyebilir, yeni fotoğraf yükleyebilir veya yeni çeşit ekleyebilirsiniz.</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => {
                                            if (window.confirm('Tüm ürünleri ilk varsayılan haline sıfırlamak istediğinize emin misiniz?')) {
                                                resetProductsToDefault();
                                                toast.success('Ürünler varsayılan haline döndürüldü.');
                                            }
                                        }}
                                        className="px-3 py-2 rounded-lg border border-outline-variant/40 text-xs font-semibold text-on-surface-variant hover:text-primary cursor-pointer"
                                    >
                                        Varsayılana Sıfırla
                                    </button>
                                    <button
                                        onClick={startNewProduct}
                                        className="px-4 py-2 rounded-xl bg-secondary text-on-primary text-sm font-semibold flex items-center gap-1.5 shadow-sm hover:opacity-95 cursor-pointer"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">add</span>
                                        Yeni Ceviz Çeşidi Ekle
                                    </button>
                                </div>
                            </div>

                            {/* Ürün Düzenleme / Ekleme Formu */}
                            {editingProduct && (
                                <form onSubmit={handleProductSubmit} className="mb-8 p-6 bg-surface-container-low rounded-2xl border border-secondary/40 space-y-4">
                                    <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                                        <h4 className="font-headline text-lg font-bold text-primary">
                                            {editingProduct.id ? `Düzenle: ${editingProduct.name}` : 'Yeni Ceviz Çeşidi Ekle'}
                                        </h4>
                                        <button type="button" onClick={() => setEditingProduct(null)} className="text-xs text-error font-semibold hover:underline cursor-pointer">
                                            İptal
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-semibold mb-1">Ürün Adı</label>
                                            <input
                                                type="text"
                                                value={editingProduct.name}
                                                onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                                className="w-full px-3 py-2 rounded-lg bg-surface border border-outline-variant/30 text-sm"
                                                placeholder="Örn: İnce Kabuklu Chandler Cevizi"
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className="block text-xs font-semibold mb-1">Fiyat (TL / kg)</label>
                                                <input
                                                    type="number"
                                                    value={editingProduct.price}
                                                    onChange={e => setEditingProduct({ ...editingProduct, price: e.target.value })}
                                                    className="w-full px-3 py-2 rounded-lg bg-surface border border-outline-variant/30 text-sm"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-semibold mb-1">Etiket Yazısı</label>
                                                <input
                                                    type="text"
                                                    value={editingProduct.tag?.label || ''}
                                                    onChange={e => setEditingProduct({
                                                        ...editingProduct,
                                                        tag: { ...(editingProduct.tag || {}), label: e.target.value, icon: editingProduct.tag?.icon || 'star' }
                                                    })}
                                                    className="w-full px-3 py-2 rounded-lg bg-surface border border-outline-variant/30 text-sm"
                                                    placeholder="Örn: Hasat Döneminde"
                                                />
                                            </div>
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-semibold mb-1">Açıklama</label>
                                            <textarea
                                                rows="2"
                                                value={editingProduct.description}
                                                onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
                                                className="w-full px-3 py-2 rounded-lg bg-surface border border-outline-variant/30 text-sm resize-none"
                                                required
                                            ></textarea>
                                        </div>

                                        {/* Resim Yükleme ve URL Alanı */}
                                        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-surface p-4 rounded-xl border border-outline-variant/20">
                                            <div className="flex items-center gap-3">
                                                <img src={editingProduct.image} alt="Önizleme" className="w-20 h-20 object-cover rounded-lg border border-outline-variant/30 shrink-0" />
                                                <div className="text-xs">
                                                    <p className="font-semibold text-on-surface mb-1">Ürün Görseli</p>
                                                    <label className="inline-block bg-primary text-on-primary px-3 py-1.5 rounded-lg cursor-pointer hover:opacity-90 font-semibold">
                                                        Bilgisayardan Seç
                                                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="md:col-span-2">
                                                <label className="block text-xs font-semibold mb-1">Veya Doğrudan Resim URL'si Yapıştırın</label>
                                                <input
                                                    type="text"
                                                    value={editingProduct.image}
                                                    onChange={e => setEditingProduct({ ...editingProduct, image: e.target.value })}
                                                    className="w-full px-3 py-2 rounded-lg bg-surface-container-low border border-outline-variant/30 text-xs"
                                                    placeholder="https://..."
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold mb-1">Etiket Rengi</label>
                                            <select
                                                value={editingProduct.tag?.colorClass || TAG_COLORS[0].value}
                                                onChange={e => setEditingProduct({
                                                    ...editingProduct,
                                                    tag: { ...(editingProduct.tag || {}), colorClass: e.target.value }
                                                })}
                                                className="w-full px-3 py-2 rounded-lg bg-surface border border-outline-variant/30 text-sm"
                                            >
                                                {TAG_COLORS.map((c, i) => (
                                                    <option key={i} value={c.value}>{c.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-3 pt-2">
                                        <button
                                            type="submit"
                                            className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-semibold text-sm shadow-sm hover:opacity-95 cursor-pointer"
                                        >
                                            Değişiklikleri Kaydet
                                        </button>
                                    </div>
                                </form>
                            )}

                            {/* Mevcut Ürünler Listesi */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {products.map(product => (
                                    <div key={product.id} className="bg-surface rounded-xl border border-outline-variant/25 overflow-hidden flex flex-col justify-between shadow-sm">
                                        <div>
                                            <div className="h-44 relative">
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                {product.tag?.label && (
                                                    <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${product.tag.colorClass}`}>
                                                        {product.tag.label}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="p-4">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h4 className="font-headline font-bold text-lg text-on-surface">{product.name}</h4>
                                                    <span className="font-bold text-secondary">₺{product.price}/kg</span>
                                                </div>
                                                <p className="text-xs text-on-surface-variant line-clamp-2">{product.description}</p>
                                            </div>
                                        </div>

                                        <div className="p-4 pt-0 flex items-center gap-2">
                                            <button
                                                onClick={() => setEditingProduct(product)}
                                                className="flex-1 py-2 rounded-lg bg-surface-container-low hover:bg-primary hover:text-on-primary text-on-surface text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                                            >
                                                <span className="material-symbols-outlined text-[16px]">edit</span>
                                                Düzenle / Resim Değiştir
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (window.confirm(`${product.name} ürününü silmek istediğinize emin misiniz?`)) {
                                                        deleteProduct(product.id);
                                                        toast.success('Ürün silindi.');
                                                    }
                                                }}
                                                className="p-2 rounded-lg bg-error/10 text-error hover:bg-error hover:text-on-error transition-colors cursor-pointer"
                                                title="Ürünü Sil"
                                            >
                                                <span className="material-symbols-outlined text-[16px]">delete</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* SEKME 3: GOOGLE E-TABLOLAR (SHEETS) ENTEGRASYONU */}
                    {activeTab === 'sheets' && (
                        <div className="max-w-2xl space-y-4">
                            <h3 className="font-headline text-xl font-bold text-on-surface">Google E-Tablolar (Sheets) Bağlantısı</h3>
                            <p className="text-sm text-on-surface-variant leading-relaxed">
                                Siparişlerin ve "Parası Alındı / Paket Gönderildi" durumlarının otomatik olarak kendi Google E-Tablonuza yazılması için Google Apps Script Web App URL'nizi aşağıya yapıştırın.
                            </p>
                            <div className="flex gap-2">
                                <input
                                    type="url"
                                    value={tempSheetUrl}
                                    onChange={e => setTempSheetUrl(e.target.value)}
                                    placeholder="https://script.google.com/macros/s/.../exec"
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-surface border border-outline-variant/30 text-sm"
                                />
                                <button
                                    onClick={() => {
                                        saveSheetUrl(tempSheetUrl.trim());
                                        toast.success('Google E-Tablo bağlantısı kaydedildi!');
                                    }}
                                    className="px-6 py-2.5 rounded-xl bg-primary text-on-primary text-sm font-semibold cursor-pointer"
                                >
                                    Kaydet
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default AdminPanel;