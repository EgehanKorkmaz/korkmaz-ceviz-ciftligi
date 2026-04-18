import React from 'react';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import HarvestCalendar from './components/HarvestCalendar';
import Footer from './components/Footer';
import CartModal from './components/CartModal';

function App() {
  return (
    <CartProvider>
      <div className="bg-surface text-on-surface font-body antialiased kraft-texture min-h-screen flex flex-col relative">
        <Toaster position="top-right" toastOptions={{
          className: 'font-body text-sm font-semibold',
          style: {
            background: '#FAF9F6', // surface container lowest
            color: '#2d3322', // on-surface
            border: '1px solid rgba(86, 98, 75, 0.2)', // outline variant
            boxShadow: '0 10px 40px rgba(27,29,14,0.08)',
          }
        }} />
        <Navbar />
        <main className="flex-grow pt-24">
          <Hero />
          <ProductGrid />
          <HarvestCalendar />
        </main>
        <Footer />
        <CartModal />
      </div>
    </CartProvider>
  );
}

export default App;
