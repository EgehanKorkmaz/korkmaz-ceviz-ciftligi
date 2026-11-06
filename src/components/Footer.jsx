import React from 'react';
import DecryptedText from './DecryptedText';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full pt-10 pb-6 border-t border-outline-variant/20 bg-surface-dim dark:bg-[#1b1d0e]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 px-6 max-w-7xl mx-auto items-center">

                {/* Marka ve İletişim (Sol - 5 Sütun) */}
                <div className="md:col-span-5 flex flex-col space-y-2">
                    <span className="font-headline italic text-xl font-bold text-primary dark:text-[#fbfbe2]">
                        Korkmaz Ceviz Çiftliği
                    </span>
                    <p className="font-body text-xs text-primary/75 dark:text-[#fbfbe2]/75">
                        Susurluk, Balıkesir — Doğadan Sofranıza.
                    </p>
                    <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-primary/80 dark:text-[#fbfbe2]/80">
                        <a className="hover:text-primary underline underline-offset-4 transition-colors" href="https://www.instagram.com/korkmaz_hasan_korkmaz/" target="_blank" rel="noopener noreferrer">
                            Instagram
                        </a>
                        <span>•</span>
                        <a className="hover:text-primary underline underline-offset-4 transition-colors" href="https://www.google.com/maps/place/KORKMAZ+CEV%C4%B0Z+%C3%87%C4%B0FTL%C4%B0%C4%9E%C4%B0/@39.9040452,28.2198842,14.46z/data=!4m6!3m5!1s0x14b66b332a737317:0x78ff3fe85d87887!8m2!3d39.904093!4d28.2254017!16s%2Fg%2F11f5v08r0_?hl=tr" target="_blank" rel="noopener noreferrer">
                            Yol Tarifi Al
                        </a>
                        <span>•</span>
                        <a className="hover:text-primary underline underline-offset-4 transition-colors" href="mailto:info@korkmazceviz.com">
                            info@korkmazceviz.com
                        </a>
                    </div>
                    <p className="font-body text-[11px] text-primary/60 dark:text-[#fbfbe2]/60 pt-1">
                        © {currentYear} Korkmaz Ceviz Çiftliği. Tüm hakları saklıdır.
                    </p>
                </div>

                {/* Kompakt Harita (Sağ - 7 Sütun) */}
                <div className="md:col-span-7">
                    <div className="h-36 w-full bg-surface-container-low rounded-xl overflow-hidden relative border border-outline-variant/30 shadow-xs">
                        <iframe
                            src="https://maps.google.com/maps?q=KORKMAZ+CEV%C4%B0Z+%C3%87%C4%B0FTL%C4%B0%C4%9E%C4%B0&hl=tr&z=14&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Korkmaz Ceviz Çiftliği Konumu"
                            className="absolute inset-0 grayscale-[15%] hover:grayscale-0 transition-all duration-500"
                        ></iframe>
                    </div>
                </div>

            </div>

            {/* Designer Tag */}
            <div className="w-full mt-6 pt-4 border-t border-outline-variant/10 flex justify-center">
                <a
                    href="https://egehankorkmaz.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 opacity-85 text-xs font-semibold tracking-wide hover:opacity-100 transition-opacity"
                    style={{ color: '#8b5cf6' }}
                >
                    <span className="material-symbols-outlined text-sm">laptop_mac</span>
                    <DecryptedText
                        text="Egehan Korkmaz tarafından tasarlanmıştır"
                        animateOn="hover"
                        speed={60}
                        maxIterations={15}
                    />
                </a>
            </div>
        </footer>
    );
};

export default Footer;