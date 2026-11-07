import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { getTagConfig } from '../data/products';
import toast from 'react-hot-toast';

import img1kg from '../images/ceviz1kg.png';
import img3kg from '../images/ceviz3kg.png';
import img5kg from '../images/ceviz5kg.png';

const SackIcon = ({ size, weight, imageSrc, onClick, disabled }) => (
    <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && onClick(weight)}
        className={`flex flex-col items-center justify-center transition-all duration-300 ${disabled
            ? 'opacity-40 grayscale cursor-not-allowed'
            : 'cursor-pointer group active:scale-90 hover:scale-105'
            }`}
        title={disabled ? 'Bu ürün şu an stokta yok' : `${weight} kg Ekle`}
    >
        <div
            className="relative flex items-center justify-center bg-surface-container-lowest rounded-full p-2.5 shadow-sm border border-outline-variant/20 group-hover:border-primary/50 group-hover:bg-primary-container transition-all duration-300"
            style={{ width: size + 16, height: size + 16 }}
        >
            <img src={imageSrc} alt={`${weight}kg Ceviz`} className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 drop-shadow-sm" />
            <div className="absolute -bottom-2 bg-secondary text-on-primary text-xs font-bold px-2.5 py-0.5 rounded-full border-2 border-surface-container-lowest shadow-sm z-10 whitespace-nowrap">
                +{weight} kg
            </div>
        </div>
    </button>
);

const ProductCard = ({ product }) => {
    const { addToCart, openCart } = useCart();
    const [tempWeight, setTempWeight] = useState(0);

    // Etiket yapılandırmasını ve stok durumunu otomatik al
    const tagInfo = getTagConfig(product.tag);
    const isAvailable = tagInfo ? tagInfo.inStock : true;

    const handleAddWeight = (weight) => {
        if (!isAvailable) return;
        setTempWeight(prev => prev + weight);
    };

    const handleSubtractWeight = () => {
        setTempWeight(prev => Math.max(0, prev - 1));
    };

    const handleAddToCart = () => {
        if (tempWeight === 0 || !isAvailable) return;

        addToCart(product, { value: tempWeight, label: `${tempWeight} kg` });

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
            { duration: 4000, icon: null }
        );

        setTempWeight(0);
    };

    return (
        <div className={`bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0_10px_35px_rgb(27,29,14,0.05)] border border-outline-variant/20 flex flex-col ${!isAvailable ? 'opacity-85' : ''}`}>
            <div className="relative h-56 overflow-hidden group">
                <img
                    src={product.image}
                    alt={product.imageAlt || product.name}
                    className={`w-full h-full object-cover transition-transform duration-700 ${isAvailable ? 'group-hover:scale-105' : 'grayscale-[35%]'}`}
                />
                {tagInfo && tagInfo.label && (
                    <div className={`absolute top-3.5 left-3.5 font-body text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm backdrop-blur-xs ${tagInfo.colorClass}`}>
                        <span className="material-symbols-outlined text-[15px]">{tagInfo.icon}</span>
                        {tagInfo.label}
                    </div>
                )}
            </div>

            <div className="p-6 flex-grow flex flex-col">
                <h3 className="font-headline text-2xl font-bold text-on-surface mb-2 tracking-tight">
                    {product.name}
                </h3>
                <p className="font-body text-sm md:text-[15px] text-on-surface-variant mb-5 flex-grow leading-relaxed">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mb-4 pb-3.5 border-b border-outline-variant/20">
                    <span className="font-headline font-extrabold text-2xl md:text-3xl text-secondary tracking-tight">
                        ₺ {product.price} <span className="text-sm font-medium text-on-surface-variant">/{product.unit || 'kg'}</span>
                    </span>
                    <span className={`font-body text-sm text-primary font-bold bg-secondary-container/50 px-3 py-1.5 rounded-lg transition-all duration-300 ${tempWeight > 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                        Toplam: ₺{product.price * tempWeight}
                    </span>
                </div>

                {/* Miktar Seçimi - Çuval İkonları */}
                <div className="mb-4 bg-surface-container-low/50 p-4 rounded-xl border border-outline-variant/10">
                    <label className="block font-body text-xs md:text-sm font-semibold text-on-surface/80 mb-3.5 text-center tracking-wide">
                        {isAvailable ? 'Miktar Eklemek İçin Çuvallara Tıklayın' : 'Bu Ürün Şu An Temin Edilememektedir'}
                    </label>
                    <div className="flex items-center justify-center gap-5 sm:gap-7 mb-3 pt-1">
                        <SackIcon size={80} weight={5} imageSrc={img5kg} onClick={handleAddWeight} disabled={!isAvailable} />
                        <SackIcon size={80} weight={3} imageSrc={img3kg} onClick={handleAddWeight} disabled={!isAvailable} />
                        <SackIcon size={80} weight={1} imageSrc={img1kg} onClick={handleAddWeight} disabled={!isAvailable} />
                    </div>

                    <div className="text-center font-body min-h-[32px] flex items-center justify-center">
                        {tempWeight > 0 && isAvailable ? (
                            <div className="flex items-center justify-center gap-2 animate-fadeIn">
                                <span className="text-xs font-medium text-on-surface-variant">Seçilen: </span>
                                <span className="text-xl font-black text-primary tracking-tight">{tempWeight} kg</span>
                                <button
                                    type="button"
                                    onClick={handleSubtractWeight}
                                    className="text-xs bg-error/10 text-error hover:bg-error hover:text-on-error w-7 h-7 rounded-full flex items-center justify-center font-bold transition-all shadow-xs ml-1 active:scale-95 cursor-pointer"
                                    title="1kg Çıkar"
                                >
                                    -1
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setTempWeight(0)}
                                    className="text-xs bg-surface-variant/60 text-on-surface-variant hover:bg-error hover:text-on-error w-7 h-7 rounded-full flex items-center justify-center transition-all shadow-xs active:scale-95 cursor-pointer"
                                    title="Seçimi Temizle"
                                >
                                    <span className="material-symbols-outlined text-[16px]">close</span>
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>

                {/* Sepete Ekle Butonu */}
                <div className="h-[44px]">
                    <button
                        type="button"
                        onClick={handleAddToCart}
                        disabled={tempWeight === 0 || !isAvailable}
                        className={`w-full h-full font-body text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${!isAvailable
                            ? 'bg-surface-container-low text-outline border border-outline-variant/20 cursor-not-allowed opacity-60'
                            : tempWeight > 0
                                ? 'bg-primary text-on-primary hover:bg-primary-container shadow-sm cursor-pointer active:scale-[0.99]'
                                : 'bg-surface-container-low text-outline border border-outline-variant/20 cursor-not-allowed opacity-75'
                            }`}
                    >
                        <span className="material-symbols-outlined text-[18px]">
                            {!isAvailable ? 'event_busy' : 'shopping_cart'}
                        </span>
                        {!isAvailable
                            ? tagInfo?.label || 'Stokta Yok'
                            : tempWeight > 0
                                ? `Sepete Ekle (${tempWeight} kg)`
                                : 'Önce Miktar Seçin'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;