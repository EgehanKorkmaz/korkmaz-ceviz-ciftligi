import React from 'react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { toggleCart, cartTotals } = useCart();

    return (
        <nav className="fixed top-0 w-full z-40 bg-[#fbfbe2]/80 dark:bg-[#1b1d0e]/80 backdrop-blur-xl bg-gradient-to-b from-[#dbdcc3]/20 to-transparent">
            <div className="flex justify-between items-center w-full px-6 py-4 max-w-screen-2xl mx-auto">
                <div className="text-xl font-bold font-headline text-primary dark:text-[#fbfbe2] uppercase tracking-widest">
                    Korkmaz Ceviz Çiftliği
                </div>
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
