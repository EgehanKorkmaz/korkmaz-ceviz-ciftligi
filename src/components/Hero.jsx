import React from 'react';

const Hero = () => {
    return (
        <section className="relative w-full max-w-screen-2xl mx-auto px-6 py-6 md:py-12 min-h-[calc(100svh-5rem)] flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            <div className="w-full md:w-5/12 z-10 md:pr-8">
                <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl font-bold text-on-surface leading-tight tracking-tighter mb-4 md:mb-6" style={{ letterSpacing: "-0.02em" }}>
                    Doğrudan Bahçeden,<br />
                    <span className="text-secondary italic">Taze Hasat</span>
                </h1>
                <p className="font-body text-base md:text-lg text-on-surface-variant leading-relaxed mb-6 md:mb-10 max-w-md">
                    Kuşaklardır süregelen bir miras. Toprağın ritmine saygı duyarak, en doğal haliyle özenle yetiştirdiğimiz cevizlerimiz, aile bahçemizden sizin sofranıza uzanan bir lezzet yolculuğu sunuyor.
                </p>
                <a href="#products" className="inline-block bg-primary text-on-primary font-body font-semibold px-7 py-3.5 md:px-8 md:py-4 rounded-xl hover:bg-primary-container transition-colors shadow-[0_8px_30px_rgb(67,42,30,0.12)] hover:-translate-y-0.5 transform duration-300">
                    Ürünleri İncele
                </a>
            </div>
            <div className="w-full md:w-7/12 relative pb-4 md:pb-0">
                <div className="aspect-[16/10] sm:aspect-[4/3] max-h-[38svh] md:max-h-none w-full rounded-xl overflow-hidden shadow-[0_20px_60px_rgb(27,29,14,0.08)]">
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzKo6Ye8PpBHc-tHu8J4C5EAFXNes5UawcZVQukuHbM-NxurQwWX31gQ1OS-0naQjs4NJnXVwiEwoSiymNvsd9txhrknsWxuI57RExucmDdjJfvuUL7epvtFdHYfjJghxhVRLKLplgiZs-coZ8U-Eon5iKfXi3sndwZQf8xFcBCDNnr1PBu8DxkCKLQvQZSd-ldvVgkS1bhCaiRja_lrO3a6JxXaxKTn8V6Ii3uEfViU5HB-yJ3R3iLYijVbVg-oRcEUkqZgvFtg8"
                        alt="Walnut Orchard"
                        className="w-full h-full object-cover"
                    />
                </div>
                {/* Floating Harvest Tag */}
                <div className="absolute -bottom-2 left-3 md:-bottom-6 md:-left-6 bg-surface-container-lowest p-3 md:p-4 rounded-xl shadow-[0_10px_40px_rgb(27,29,14,0.06)] border border-outline-variant/20 flex items-center gap-2.5 md:gap-3">
                    <span className="material-symbols-outlined text-secondary text-xl md:text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
                    <div>
                        <p className="font-headline font-bold text-on-surface text-xs md:text-sm">Yeni Mahsul / Taze Hasat</p>
                        <p className="font-body text-[11px] md:text-xs text-on-surface-variant">Sınırlı Stok</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;