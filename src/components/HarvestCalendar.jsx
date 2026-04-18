import React from 'react';

const HarvestCalendar = () => {
    return (
        <section id="harvest-calendar" className="w-full py-24 px-6 max-w-screen-2xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Harvest Calendar */}
                <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-8 md:p-12 shadow-[0_15px_50px_rgb(27,29,14,0.05)] border border-outline-variant/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-surface-dim rounded-bl-[100%] opacity-20 -z-10"></div>
                    <h2 className="font-headline text-3xl font-bold text-on-surface mb-8">Hasat Takvimi</h2>
                    
                    <div className="relative mt-12">
                        {/* Timeline Line */}
                        <div className="absolute top-6 left-0 w-full h-0.5 bg-outline-variant/30 hidden md:block"></div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            {/* Step 1 */}
                            <div className="relative flex flex-col items-start md:items-center text-left md:text-center group">
                                <div className="w-12 h-12 bg-surface border-2 border-secondary rounded-full flex items-center justify-center z-10 mb-4 transition-transform group-hover:scale-110">
                                    <span className="material-symbols-outlined text-secondary">potted_plant</span>
                                </div>
                                <h4 className="font-headline font-bold text-lg text-on-surface mb-1">Bakım</h4>
                                <p className="font-body text-sm text-secondary mb-2">İlkbahar - Yaz</p>
                                <p className="font-body text-xs text-on-surface-variant">Ağaçların doğal gelişimi izlenir.</p>
                            </div>
                            
                            {/* Step 2 */}
                            <div className="relative flex flex-col items-start md:items-center text-left md:text-center group">
                                <div className="w-12 h-12 bg-secondary text-on-primary rounded-full flex items-center justify-center z-10 mb-4 shadow-md transition-transform group-hover:scale-110">
                                    <span className="material-symbols-outlined">nature</span>
                                </div>
                                <h4 className="font-headline font-bold text-lg text-on-surface mb-1">Yaş Hasat</h4>
                                <p className="font-body text-sm text-secondary mb-2">Eylül Başı</p>
                                <p className="font-body text-xs text-on-surface-variant">Taze tüketim için ilk sarsımlar.</p>
                            </div>

                            {/* Step 3 */}
                            <div className="relative flex flex-col items-start md:items-center text-left md:text-center group">
                                <div className="w-12 h-12 bg-surface border-2 border-outline-variant rounded-full flex items-center justify-center z-10 mb-4 transition-transform group-hover:scale-110">
                                    <span className="material-symbols-outlined text-on-surface-variant">dry</span>
                                </div>
                                <h4 className="font-headline font-bold text-lg text-on-surface mb-1">Kurutma</h4>
                                <p className="font-body text-sm text-on-surface-variant mb-2">Ekim</p>
                                <p className="font-body text-xs text-on-surface-variant">Geleneksel sergilerde kurutma.</p>
                            </div>

                            {/* Step 4 */}
                            <div className="relative flex flex-col items-start md:items-center text-left md:text-center group">
                                <div className="w-12 h-12 bg-surface border-2 border-outline-variant rounded-full flex items-center justify-center z-10 mb-4 transition-transform group-hover:scale-110">
                                    <span className="material-symbols-outlined text-on-surface-variant">inventory_2</span>
                                </div>
                                <h4 className="font-headline font-bold text-lg text-on-surface mb-1">Saklama</h4>
                                <p className="font-body text-sm text-on-surface-variant mb-2">Kasım - Kış</p>
                                <p className="font-body text-xs text-on-surface-variant">İdeal koşullarda depolama.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Storage Guide */}
                <div id="storage-guide" className="lg:col-span-4 bg-primary text-on-primary rounded-xl p-8 md:p-10 shadow-[0_20px_40px_rgb(67,42,30,0.15)] flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-primary-container rounded-full blur-3xl opacity-50 -z-10 translate-x-1/2 -translate-y-1/2"></div>
                    <div>
                        <h2 className="font-headline text-3xl font-bold mb-6">Saklama Koşulları</h2>
                        <p className="font-body text-sm text-on-primary-container mb-8 leading-relaxed">
                            Cevizlerinizin tazeliğini ve lezzetini uzun süre korumak için önerilerimiz.
                        </p>
                        
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-on-primary/10 rounded-lg">
                                    <span className="material-symbols-outlined">thermostat</span>
                                </div>
                                <div>
                                    <h4 className="font-body font-bold text-base mb-1">Serin ve Kuru</h4>
                                    <p className="font-body text-xs text-on-primary-container">Oda sıcaklığında, nemden uzak alanlar.</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-on-primary/10 rounded-lg">
                                    <span className="material-symbols-outlined">light_mode</span>
                                </div>
                                <div>
                                    <h4 className="font-body font-bold text-base mb-1">Güneşten Koruyun</h4>
                                    <p className="font-body text-xs text-on-primary-container">Doğrudan güneş ışığına maruz bırakmayın.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-on-primary/10 rounded-lg">
                                    <span className="material-symbols-outlined">kitchen</span>
                                </div>
                                <div>
                                    <h4 className="font-body font-bold text-base mb-1">Uzun Süreli Saklama</h4>
                                    <p className="font-body text-xs text-on-primary-container">Cevizler gönderilen poşet yerine, hava alan bir kapta veya sepette saklanmalıdır.</p>
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
