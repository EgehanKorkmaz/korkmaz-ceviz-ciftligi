import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { toggleCart, cartTotals } = useCart();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <nav className="fixed top-0 w-full z-40 bg-[#fbfbe2]/90 dark:bg-[#1b1d0e]/90 backdrop-blur-xl border-b border-outline-variant/15">
            <div className="flex justify-between items-center w-full px-5 md:px-6 py-3 md:py-4 max-w-screen-2xl mx-auto">
                <a href="#" onClick={closeMobileMenu} className="flex items-center group py-0.5">
                    <img
                        src="/logo_yatay.png"
                        alt="Korkmaz Ceviz Çiftliği"
                        className="h-11 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                </a>

                {/* Masaüstü Menü Linkleri */}
                <div className="hidden md:flex space-x-8 font-headline tracking-tight text-lg">
                    <a className="text-primary dark:text-[#fbfbe2] opacity-80 hover:opacity-100 hover:text-secondary transition-all duration-300" href="#harvest-calendar">Hasat Takvimi</a>
                    <a className="text-primary dark:text-[#fbfbe2] opacity-80 hover:opacity-100 hover:text-secondary transition-all duration-300" href="#products">Ürünlerimiz</a>
                    <a className="text-primary dark:text-[#fbfbe2] opacity-80 hover:opacity-100 hover:text-secondary transition-all duration-300" href="#storage-guide">Saklama Rehberi</a>
                </div>

                {/* Sağ İkonlar: Sepet + Mobil Hamburger Butonu */}
                <div className="flex items-center gap-3 md:gap-4">
                    <button
                        onClick={toggleCart}
                        className="relative p-2 text-primary dark:text-[#fbfbe2] hover:text-secondary transition-all duration-300 active:scale-90 cursor-pointer"
                        aria-label="Sepeti Aç"
                    >
                        <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 0" }}>shopping_bag</span>
                        {cartTotals.totalItems > 0 && (
                            <span className="absolute top-0.5 right-0.5 bg-error text-on-error text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                {cartTotals.totalItems}
                            </span>
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen(prev => !prev)}
                        className="md:hidden p-2 text-primary dark:text-[#fbfbe2] hover:text-secondary transition-colors cursor-pointer"
                        aria-label="Menüyü Aç/Kapat"
                    >
                        <span className="material-symbols-outlined text-[28px]">
                            {isMobileMenuOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>
            </div>

            {/* Mobil Açılır Menü (Hamburger İçeriği) */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-[#fbfbe2] dark:bg-[#1b1d0e] border-b border-outline-variant/25 px-6 py-5 space-y-4 font-headline text-lg shadow-lg">
                    <a
                        href="#products"
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 text-primary dark:text-[#fbfbe2] py-2 border-b border-outline-variant/15"
                    >
                        <span className="material-symbols-outlined text-secondary text-[20px]">inventory_2</span>
                        Ürünlerimiz
                    </a>
                    <a
                        href="#harvest-calendar"
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 text-primary dark:text-[#fbfbe2] py-2 border-b border-outline-variant/15"
                    >
                        <span className="material-symbols-outlined text-secondary text-[20px]">calendar_month</span>
                        Hasat Takvimi
                    </a>
                    <a
                        href="#storage-guide"
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 text-primary dark:text-[#fbfbe2] py-2"
                    >
                        <span className="material-symbols-outlined text-secondary text-[20px]">kitchen</span>
                        Saklama Rehberi
                    </a>
                </div>
            )}
        </nav>
    );
};

export default Navbar;