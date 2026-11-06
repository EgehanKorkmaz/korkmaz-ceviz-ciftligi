import React from 'react';
import ProductCard from './ProductCard';
import { useCart } from '../context/CartContext';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const ProductGrid = () => {
    const { products } = useCart();

    return (
        <section id="products" className="w-full bg-surface-container-low py-20 px-6 mt-12 rounded-t-[3rem]">
            <div className="max-w-screen-2xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold text-on-surface mb-4" style={{ letterSpacing: "-0.02em" }}>Ürünlerimiz</h2>
                    <p className="font-body text-on-surface-variant max-w-2xl mx-auto">
                        Toprağın bereketini sofranıza taşıyan, farklı ihtiyaçlara yönelik özenle seçilmiş ceviz çeşitlerimiz.
                    </p>
                </div>

                <div className="hidden md:grid md:grid-cols-3 gap-8">
                    {/* Desktop View */}
                    {products.map(product => (
                        <ProductCard key={`desk-${product.id}`} product={product} />
                    ))}
                </div>

                <div className="block md:hidden pb-12">
                    {/* Mobile View with Swiper */}
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={20}
                        slidesPerView={1.1}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        className="!pb-12"
                    >
                        {products.map(product => (
                            <SwiperSlide key={`mob-${product.id}`}>
                                <ProductCard product={product} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
