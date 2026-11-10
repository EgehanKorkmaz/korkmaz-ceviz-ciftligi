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
        <section id="products" className="w-full bg-surface-container-low py-14 px-6 mt-6 rounded-t-[3rem]">
            <div className="max-w-screen-2xl mx-auto">
                <div className="text-center mb-10">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold text-on-surface mb-4" style={{ letterSpacing: "-0.02em" }}>Ürünlerimiz</h2>
                    <p className="font-body text-on-surface-variant max-w-2xl mx-auto">
                        Toprağın bereketini sofranıza taşıyan, farklı ihtiyaçlara yönelik özenle seçilmiş ceviz çeşitlerimiz.
                    </p>
                </div>

                {/* Desktop View */}
                <div className="hidden md:flex md:flex-wrap md:justify-center gap-8">
                    {products.map(product => (
                        <div
                            key={`desk-${product.id}`}
                            className="w-full md:w-[calc(33.333%-1.35rem)] max-w-[440px] flex"
                        >
                            <ProductCard product={product} />
                        </div>
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
                            <SwiperSlide key={`mob-${product.id}`} className="!h-auto flex">
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
