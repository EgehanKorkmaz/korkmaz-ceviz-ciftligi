import React from 'react';

const Hero = () => {
    return (
        <section className="relative w-full max-w-screen-2xl mx-auto px-6 py-12 md:py-24 flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-5/12 z-10 md:pr-12">
                <h1 className="font-headline text-5xl md:text-7xl font-bold text-on-surface leading-tight tracking-tighter mb-6" style={{ letterSpacing: "-0.02em" }}>
                    Doğrudan Bahçeden,<br />
                    <span className="text-secondary italic">Taze Hasat</span>
                </h1>
                <p className="font-body text-lg text-on-surface-variant leading-relaxed mb-10 max-w-md">
                    Kuşaklardır süregelen bir miras. Toprağın ritmine saygı duyarak, en doğal haliyle özenle yetiştirdiğimiz cevizlerimiz, aile bahçemizden sizin sofranıza uzanan bir lezzet yolculuğu sunuyor.
                </p>
                <a href="#products" className="inline-block bg-primary text-on-primary font-body font-semibold px-8 py-4 rounded-xl hover:bg-primary-container transition-colors shadow-[0_8px_30px_rgb(67,42,30,0.12)] hover:-translate-y-0.5 transform duration-300">
                    Ürünleri İncele
                </a>
            </div>
            <div className="w-full md:w-7/12 relative">
                <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-[0_20px_60px_rgb(27,29,14,0.08)]">
                    <img 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzKo6Ye8PpBHc-tHu8J4C5EAFXNes5UawcZVQukuHbM-NxurQwWX31gQ1OS-0naQjs4NJnXVwiEwoSiymNvsd9txhrknsWxuI57RExucmDdjJfvuUL7epvtFdHYfjJghxhVRLKLplgiZs-coZ8U-Eon5iKfXi3sndwZQf8xFcBCDNnr1PBu8DxkCKLQvQZSd-ldvVgkS1bhCaiRja_lrO3a6JxXaxKTn8V6Ii3uEfViU5HB-yJ3R3iLYijVbVg-oRcEUkqZgvFtg8" 
                        alt="Walnut Orchard" 
                        className="w-full h-full object-cover" 
                    />
                </div>
                {/* Floating Harvest Tag */}
                <div className="absolute -bottom-6 -left-6 bg-surface-container-lowest p-4 rounded-xl shadow-[0_10px_40px_rgb(27,29,14,0.06)] border border-outline-variant/20 flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
                    <div>
                        <p className="font-headline font-bold text-on-surface text-sm">2024 Hasadı</p>
                        <p className="font-body text-xs text-on-surface-variant">Sınırlı Stok</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
