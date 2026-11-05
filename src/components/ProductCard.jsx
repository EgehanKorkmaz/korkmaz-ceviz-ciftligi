import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

import img1kg from '../images/ceviz1kg.png';
import img3kg from '../images/ceviz3kg.png';
import img5kg from '../images/ceviz5kg.png';

// Custom Sack Icon Component
const SackIcon = ({ size, weight, label, imageSrc, onClick }) => (
    <div
        onClick={() => onClick(weight)}
        className="flex flex-col items-center justify-center cursor-pointer group transition-transform active:scale-90 hover:scale-105"
        title={`${label} Ekle (${weight}kg)`}
    >
        <div className="relative flex items-center justify-center bg-surface-container-lowest rounded-full p-2 mb-2 shadow-sm border border-outline-variant/20 group-hover:border-primary/50 group-hover:bg-primary-container transition-all" style={{ width: size + 20, height: size + 20 }}>
            <img src={imageSrc} alt={`${weight}kg Ceviz`} className="w-full h-full object-contain transition-transform group-hover:scale-110 drop-shadow-sm" />
            <div className="absolute -bottom-2 bg-secondary text-on-primary text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-surface-container-lowest shadow-sm z-10">
                +{weight}
            </div>
        </div>
        <span className="text-xs font-semibold text-on-surface-variant group-hover:text-primary transition-colors">{label}</span>
    </div>
);

const ProductCard = ({ product }) => {
    // 1. useCart'tan openCart fonksiyonunu da çekiyoruz:
    const { addToCart, openCart } = useCart();
    const [tempWeight, setTempWeight] = useState(0);

    const handleAddWeight = (weight) => {
        setTempWeight(prev => prev + weight);
    };

    const handleSubtractWeight = () => {
        setTempWeight(prev => Math.max(0, prev - 1));
    };

    const handleAddToCart = () => {
        if (tempWeight === 0) return;

        addToCart(product, { value: tempWeight, label: `${tempWeight} kg` });

        // 2. Bildirime tıklanınca sepeti aç ve bildirimi kapat:
        toast.success(
            (t) => (
                <div
                    onClick={() => {
                        toast.dismiss(t.id);
                        openCart();
                    }}
                    className="flex items-center gap-3 cursor-pointer group"
                    title="Sepeti görüntülemek için tıklayın"
                >
                    <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                    <div className="flex flex-col">
                        <span><b>{tempWeight}kg</b> {product.name} sepetinize eklendi!</span>
                        <span className="text-xs text-secondary underline group-hover:text-primary transition-colors mt-0.5">
                            Sepete Git &rarr;
                        </span>
                    </div>
                </div>
            ),
            {
                duration: 4000,
                icon: null,
            }
        );

        setTempWeight(0);
    };

    return (
        <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_10px_40px_rgb(27,29,14,0.04)] border border-outline-variant/20 flex flex-col">
            <div className="relative h-64">
                <img
                    src={product.image}
                    alt={product.imageAlt}
                    className="w-full h-full object-cover"
                />
                {product.tag && (
                    <div className={`absolute top-4 left-4 font-body text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm ${product.tag.colorClass}`}>
                        <span className="material-symbols-outlined text-[14px]">{product.tag.icon}</span>
                        {product.tag.label}
                    </div>
                )}
            </div>
            <div className="p-6 flex-grow flex flex-col">
                <h3 className="font-headline text-2xl font-bold text-on-surface mb-2">{product.name}</h3>
                <p className="font-body text-sm text-on-surface-variant mb-6 flex-grow">{product.description}</p>
                <div className="flex items-center justify-between mb-4">
                    <span className="font-body font-bold text-xl text-secondary">
                        ₺{product.price} <span className="text-sm font-normal text-on-surface-variant">/{product.unit}</span>
                    </span>
                    <span className={`font-body text-sm text-on-surface font-semibold text-right transition-opacity duration-300 ${tempWeight > 0 ? 'opacity-100' : 'opacity-0'}`}>
                        Toplam: ₺{product.price * tempWeight}
                    </span>
                </div>

                {/* Miktar Seçimi - Çuval İkonları */}
                <div className="mb-6 bg-surface-container-low/50 p-4 rounded-xl border border-outline-variant/10">
                    <label className="block font-body text-xs text-on-surface-variant mb-4 text-center">Miktar Eklemek İçin Çuvallara Tıklayın</label>
                    <div className="flex items-end justify-center gap-6 mb-4">
                        <SackIcon size={56} weight={5} label="Büyük" imageSrc={img5kg} onClick={handleAddWeight} />
                        <SackIcon size={56} weight={3} label="Orta" imageSrc={img3kg} onClick={handleAddWeight} />
                        <SackIcon size={56} weight={1} label="Küçük" imageSrc={img1kg} onClick={handleAddWeight} />
                    </div>

                    <div className="text-center font-body min-h-[36px] flex items-center justify-center">
                        {tempWeight > 0 ? (
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-base font-medium text-on-surface-variant">Seçilen: </span>
                                <span className="text-2xl font-black text-primary tracking-tight">{tempWeight}kg</span>
                                <button
                                    onClick={handleSubtractWeight}
                                    className="text-sm bg-error/10 text-error hover:bg-error hover:text-on-error w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all shadow-sm ml-2 active:scale-95"
                                    title="1kg Çıkar"
                                >
                                    -1
                                </button>
                                <button
                                    onClick={() => setTempWeight(0)}
                                    className="text-sm bg-surface-variant/50 text-on-surface-variant hover:bg-error hover:text-on-error w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ml-1 active:scale-95"
                                    title="Seçimi Temizle"
                                >
                                    <span className="material-symbols-outlined text-[18px]">close</span>
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>

                <div className="h-[48px] mt-2">
                    <button
                        onClick={handleAddToCart}
                        disabled={tempWeight === 0}
                        className={`w-full h-full font-body font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${tempWeight > 0
                                ? 'bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container shadow-sm cursor-pointer'
                                : 'bg-surface-container-low text-outline border border-outline-variant/20 cursor-not-allowed opacity-70'
                            }`}
                    >
                        <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                        {tempWeight > 0 ? `Sepete Ekle (${tempWeight} kg)` : 'Önce Miktar Seçin'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
