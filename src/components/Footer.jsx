import React from 'react';
import DecryptedText from './DecryptedText';

const Footer = () => {
    return (
        <footer className="w-full py-16 border-t border-outline-variant/20 bg-surface-dim dark:bg-[#1b1d0e]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-8 max-w-7xl mx-auto items-start">

                {/* Brand Info */}
                <div className="flex flex-col space-y-4">
                    <span className="font-headline italic text-lg text-primary dark:text-[#fbfbe2]">Korkmaz Ceviz Çiftliği</span>
                    <p className="font-body text-sm tracking-wide text-primary/70 dark:text-[#fbfbe2]/70 mt-2">
                        © 2024 Korkmaz Ceviz Çiftliği. Doğadan Sofranıza.
                    </p>
                    <div className="mt-6 aspect-video bg-surface-container-low rounded-lg overflow-hidden relative border border-outline-variant/30">
                        <iframe
                            src="https://maps.google.com/maps?q=KORKMAZ+CEVİZ+ÇİFTLİĞİ&hl=tr&z=14&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Korkmaz Ceviz Çiftliği Konumu"
                            className="absolute inset-0 grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                        ></iframe>
                    </div>
                </div>

                {/* Links */}
                <div className="flex flex-col space-y-4">
                    <h4 className="font-body text-sm tracking-wide uppercase text-primary dark:text-[#fbfbe2] font-bold mb-2">Bağlantılar</h4>
                    <a className="font-body text-sm tracking-wide uppercase text-primary/70 dark:text-[#fbfbe2]/70 hover:text-primary dark:hover:text-white transition-colors underline-offset-4 hover:underline" href="https://www.instagram.com/korkmaz_hasan_korkmaz/" target="_blank" rel="noopener noreferrer">Instagram</a>
                    <a className="font-body text-sm tracking-wide uppercase text-primary/70 dark:text-[#fbfbe2]/70 hover:text-primary dark:hover:text-white transition-colors underline-offset-4 hover:underline" href="https://www.google.com/maps/place/KORKMAZ+CEV%C4%B0Z+%C3%87%C4%B0FTL%C4%B0%C4%9E%C4%B0/@39.9040452,28.2198842,14.46z/data=!4m6!3m5!1s0x14b66b332a737317:0x78ff3fe85d87887!8m2!3d39.904093!4d28.2254017!16s%2Fg%2F11f5v08r0_?hl=tr" target="_blank" rel="noopener noreferrer">Konum</a>
                </div>

                {/* Contact */}
                <div className="flex flex-col space-y-4">
                    <h4 className="font-body text-sm tracking-wide uppercase text-primary dark:text-[#fbfbe2] font-bold mb-2">İletişim</h4>
                    <p className="font-body text-sm text-primary/70 dark:text-[#fbfbe2]/70">
                        Susurluk, Balıkesir<br />
                        Türkiye
                    </p>
                    <a className="font-body text-sm text-primary/70 dark:text-[#fbfbe2]/70 hover:text-primary dark:hover:text-white transition-colors underline-offset-4 hover:underline" href="mailto:info@korkmazceviz.com">info@korkmazceviz.com</a>
                </div>

            </div>

            {/* Designer Tag */}
            <div className="w-full mt-16 border-t border-outline-variant/10 flex justify-center">
                <a
                    href="https://egehankorkmaz.me/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-6 opacity-90 text-sm font-semibold tracking-wide hover:opacity-100 transition-opacity"
                    style={{ color: '#8b5cf6', textShadow: '0 0 1px rgba(255,255,255,0.5)' }}
                >
                    <span className="material-symbols-outlined text-base">laptop_mac</span>
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
