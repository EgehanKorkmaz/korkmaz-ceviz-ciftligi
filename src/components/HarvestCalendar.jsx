import React, { useMemo } from 'react';

const HARVEST_STEPS = [
    {
        id: 'care',
        title: 'Bakım',
        period: 'İlkbahar - Yaz',
        desc: 'Ağaçların doğal gelişimi ve organik beslenmesi izlenir.',
        icon: 'potted_plant',
        months: [2, 3, 4, 5, 6, 7] // Mart - Ağustos
    },
    {
        id: 'fresh-harvest',
        title: 'Yaş Hasat',
        period: 'Eylül',
        desc: 'Taze süt ceviz tüketimi için ilk silkme ve hasat.',
        icon: 'nature',
        months: [8] // Eylül
    },
    {
        id: 'drying',
        title: 'Kurutma',
        period: 'Ekim',
        desc: 'Geleneksel doğal sergilerde nem dengeli kurutma.',
        icon: 'wb_sunny',
        months: [9] // Ekim
    },
    {
        id: 'storage',
        title: 'Satış & Saklama',
        period: 'Kasım - Kış',
        desc: 'İdeal nem ve ısıda depolama, kuru ceviz gönderimi.',
        icon: 'inventory_2',
        months: [10, 11, 0, 1] // Kasım, Aralık, Ocak, Şubat
    }
];

const HarvestCalendar = () => {
    const currentMonth = new Date().getMonth(); // 0-11

    // Şu anki aya göre hangi adımda olduğumuzu otomatik bul
    const activeStepIndex = useMemo(() => {
        const idx = HARVEST_STEPS.findIndex(step => step.months.includes(currentMonth));
        return idx !== -1 ? idx : 0;
    }, [currentMonth]);

    const currentMonthName = new Intl.DateTimeFormat('tr-TR', { month: 'long' }).format(new Date());

    return (
        <section id="harvest-calendar" className="w-full py-14 px-6 max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Otomatik Hasat Takvimi */}
                <div className="lg:col-span-8 bg-surface-container-lowest rounded-2xl p-6 md:p-10 shadow-[0_15px_50px_rgb(27,29,14,0.05)] border border-outline-variant/20 relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 right-0 w-56 h-56 bg-surface-dim rounded-bl-[100%] opacity-20 -z-10"></div>

                    <div className="flex flex-wrap items-center justify-between gap-2 mb-8">
                        <div>
                            <h2 className="font-headline text-2xl md:text-3xl font-bold text-on-surface">Canlı Hasat Takvimi</h2>
                            <p className="text-xs text-on-surface-variant mt-1">Takvim bulunduğumuz aya göre otomatik güncellenir.</p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-secondary-container/50 text-on-secondary-container px-3 py-1.5 rounded-full border border-secondary/20">
                            <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                            Şu An: {currentMonthName} ({HARVEST_STEPS[activeStepIndex].title} Dönemi)
                        </span>
                    </div>

                    <div className="relative my-auto py-4">
                        {/* Arka Plan Çizgisi (Masaüstü) */}
                        <div className="absolute top-10 left-0 w-full h-1 bg-outline-variant/20 hidden md:block rounded-full overflow-hidden">
                            {/* Aktif Adıma Kadar Dolan Yeşil Çizgi */}
                            <div
                                className="h-full bg-secondary transition-all duration-700 ease-out"
                                style={{ width: `${((activeStepIndex + 0.5) / HARVEST_STEPS.length) * 100}%` }}
                            ></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {HARVEST_STEPS.map((step, index) => {
                                const isActive = index === activeStepIndex;
                                const isPassed = index < activeStepIndex;

                                return (
                                    <div
                                        key={step.id}
                                        className={`relative flex md:flex-col items-center md:text-center gap-4 md:gap-0 p-3 md:p-0 rounded-xl transition-all duration-300 ${isActive ? 'bg-secondary-container/20 md:bg-transparent border border-secondary/30 md:border-0' : ''
                                            }`}
                                    >
                                        {/* İkon Dairesi */}
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center z-10 md:mb-4 shrink-0 transition-all duration-500 ${isActive
                                            ? 'bg-secondary text-on-primary shadow-lg ring-4 ring-secondary/20 scale-110'
                                            : isPassed
                                                ? 'bg-surface border-2 border-secondary text-secondary'
                                                : 'bg-surface border-2 border-outline-variant/40 text-on-surface-variant opacity-70'
                                            }`}>
                                            <span className="material-symbols-outlined text-[22px]">
                                                {isPassed ? 'check' : step.icon}
                                            </span>
                                        </div>

                                        {/* Metin Alanı */}
                                        <div>
                                            <div className="flex items-center md:justify-center gap-1.5 mb-0.5">
                                                <h4 className={`font-headline font-bold text-base ${isActive ? 'text-primary' : 'text-on-surface'}`}>
                                                    {step.title}
                                                </h4>
                                                {isActive && (
                                                    <span className="text-[10px] font-bold uppercase tracking-wider bg-secondary text-on-primary px-1.5 py-0.5 rounded md:hidden">
                                                        Aktif
                                                    </span>
                                                )}
                                            </div>
                                            <p className={`font-body text-xs font-semibold mb-1 ${isActive || isPassed ? 'text-secondary' : 'text-on-surface-variant'
                                                }`}>
                                                {step.period}
                                            </p>
                                            <p className="font-body text-xs text-on-surface-variant leading-relaxed">
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Saklama Koşulları (Daha kompakt) */}
                <div id="storage-guide" className="lg:col-span-4 bg-primary text-on-primary rounded-2xl p-6 md:p-8 shadow-[0_20px_40px_rgb(67,42,30,0.12)] flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-primary-container rounded-full blur-3xl opacity-50 -z-10 translate-x-1/2 -translate-y-1/2"></div>
                    <div>
                        <h2 className="font-headline text-2xl md:text-3xl font-bold mb-2">Saklama Koşulları</h2>
                        <p className="font-body text-xs text-on-primary-container mb-6 leading-relaxed">
                            Cevizlerinizin tazeliğini ve besin değerini uzun süre korumak için önerilerimiz:
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-on-primary/10 rounded-lg shrink-0">
                                    <span className="material-symbols-outlined text-[20px]">thermostat</span>
                                </div>
                                <div>
                                    <h4 className="font-body font-bold text-sm mb-0.5">Serin ve Kuru Ortam</h4>
                                    <p className="font-body text-xs text-on-primary-container/90">Oda sıcaklığının altında, nemden ve kokudan uzak alanlar.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-on-primary/10 rounded-lg shrink-0">
                                    <span className="material-symbols-outlined text-[20px]">light_mode</span>
                                </div>
                                <div>
                                    <h4 className="font-body font-bold text-sm mb-0.5">Güneşten Koruyun</h4>
                                    <p className="font-body text-xs text-on-primary-container/90">Doğrudan güneş ışığına ve ısı kaynaklarına maruz bırakmayın.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-on-primary/10 rounded-lg shrink-0">
                                    <span className="material-symbols-outlined text-[20px]">kitchen</span>
                                </div>
                                <div>
                                    <h4 className="font-body font-bold text-sm mb-0.5">Hava Alan Kaplar</h4>
                                    <p className="font-body text-xs text-on-primary-container/90">Naylon poşet yerine bez kesede, filede veya sepette muhafaza edin.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default HarvestCalendar;