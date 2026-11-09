import React from 'react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { toggleCart, cartTotals } = useCart();

    return (
        <nav className="fixed top-0 w-full z-40 bg-[#fbfbe2]/80 dark:bg-[#1b1d0e]/80 backdrop-blur-xl bg-gradient-to-b from-[#dbdcc3]/20 to-transparent">
            <div className="flex justify-between items-center w-full px-6 py-4 max-w-screen-2xl mx-auto">
                <a href="#" className="flex items-center gap-3.5 group">
                    {/* Logonun sadece ağaç kısmını kadrajlayıp büyük ve net gösteren kapsayıcı */}
                    <div className="w-12 h-12 md:w-14 md:h-14 overflow-hidden flex items-start justify-center rounded-xl bg-surface-container-lowest/60 p-1 shadow-xs border border-outline-variant/20">
                        <img
                            src="/logo.png"
                            alt="Korkmaz Ceviz Çiftliği Logo"
                            className="w-full h-[142%] max-w-none object-cover object-top transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-headline text-xl md:text-2xl font-bold text-primary dark:text-[#fbfbe2] leading-none tracking-tight">
                            Korkmaz
                        </span>
                        <span className="font-body text-xs md:text-sm font-bold text-secondary uppercase tracking-widest mt-0.5">
                            Ceviz Çiftliği
                        </span>
                    </div>
                </a>
                <div className="hidden md:flex space-x-8 font-headline tracking-tight text-lg">
                    <a className="text-primary dark:text-[#fbfbe2] opacity-80 hover:opacity-100 hover:text-secondary dark:hover:text-[#c9eea9] transition-all duration-300" href="#harvest-calendar">Hasat Takvimi</a>
                    <a className="text-primary dark:text-[#fbfbe2] opacity-80 hover:opacity-100 hover:text-secondary dark:hover:text-[#c9eea9] transition-all duration-300" href="#products">Ürünlerimiz</a>
                    <a className="text-primary dark:text-[#fbfbe2] opacity-80 hover:opacity-100 hover:text-secondary dark:hover:text-[#c9eea9] transition-all duration-300" href="#storage-guide">Saklama Rehberi</a>
                </div>
                <div className="flex items-center">
                    <button
                        onClick={toggleCart}
                        className="relative text-primary dark:text-[#fbfbe2] hover:text-secondary dark:hover:text-[#c9eea9] transition-all duration-300 scale-95 active:scale-90"
                    >
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>shopping_bag</span>
                        {cartTotals.totalItems > 0 && (
                            <span className="absolute -top-1 -right-2 bg-error text-on-error text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                {cartTotals.totalItems}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
