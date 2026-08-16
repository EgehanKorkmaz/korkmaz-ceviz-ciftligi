# Korkmaz Ceviz Çiftliği (Korkmaz Walnut Farm)

[English](#english) | [Türkçe](#türkçe)

---

<a name="english"></a>
## 🇬🇧 English

Welcome to the **Korkmaz Walnut Farm** repository! This is a modern, responsive web application built with React, Vite, and Tailwind CSS.

### Features
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.
- **Modern Animations**: Smooth transitions and animations using Framer Motion.
- **Image Sliders**: Interactive media carousels powered by Swiper.
- **Contact Form Integration**: Seamless email sending directly from the client using EmailJS.
- **Toast Notifications**: Elegant user alerts and feedback using React Hot Toast.

### Technical Highlights
- **Framework**: React 19 via Vite for lightning-fast development and build times.
- **Styling**: Tailwind CSS for utility-first styling and rapid UI development.
- **Animations**: Framer Motion for complex, declarative animations.
- **Icons**: React Icons for a comprehensive library of SVG icons.
- **Code Quality**: ESLint configuration included for robust code linting.

### Environment Variables
To run this project properly, you need to configure the following environment variables. Create a `.env` file in the root directory and add your EmailJS configuration:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### Getting Started

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd korkmaz-ceviz-ciftligi
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to the local server address (usually `http://localhost:5173`).

4. **Build for production**:
   ```bash
   npm run build
   ```

---

<a name="türkçe"></a>
## 🇹🇷 Türkçe

**Korkmaz Ceviz Çiftliği** projesine hoş geldiniz! Bu proje, React, Vite ve Tailwind CSS kullanılarak geliştirilmiş modern ve duyarlı bir web uygulamasıdır.

### Özellikler (Features)
- **Duyarlı (Responsive) Tasarım**: Masaüstü, tablet ve mobil cihazlar için tam uyumluluk.
- **Modern Animasyonlar**: Framer Motion ile akıcı geçişler ve etkileşimler.
- **Görsel Kaydırıcılar (Sliders)**: Swiper ile güçlendirilmiş etkileşimli medya galerileri.
- **İletişim Formu Entegrasyonu**: EmailJS kullanılarak doğrudan istemci (client) üzerinden e-posta gönderimi.
- **Bildirimler (Toast)**: React Hot Toast ile şık kullanıcı uyarıları ve geri bildirimleri.

### Teknik Öne Çıkanlar (Technical Highlights)
- **Altyapı**: Çok hızlı geliştirme ve derleme (build) süreleri için Vite destekli React 19.
- **Stil (Styling)**: Hızlı kullanıcı arayüzü geliştirme için Tailwind CSS.
- **Animasyonlar**: Karmaşık animasyonlar için Framer Motion.
- **İkonlar**: Kapsamlı SVG ikon kütüphanesi için React Icons.
- **Kod Kalitesi**: Daha güvenilir kod yazımı için ESLint konfigürasyonu.

### Çevresel Değişkenler (Environment Variables)
Projeyi düzgün bir şekilde çalıştırmak için aşağıdaki çevresel değişkenleri ayarlamanız gerekmektedir. Kök dizinde bir `.env` dosyası oluşturun ve EmailJS yapılandırmanızı ekleyin:

```env
VITE_EMAILJS_SERVICE_ID=sizin_servis_id_degeriniz
VITE_EMAILJS_TEMPLATE_ID=sizin_sablon_id_degeriniz
VITE_EMAILJS_PUBLIC_KEY=sizin_acik_anahtar_degeriniz
```

### Başlarken (Getting Started)

1. **Projeyi bilgisayarınıza indirin** (henüz indirmediyseniz):
   ```bash
   git clone <repository-url>
   cd korkmaz-ceviz-ciftligi
   ```

2. **Bağımlılıkları (Dependencies) yükleyin**:
   ```bash
   npm install
   ```

3. **Geliştirme sunucusunu başlatın**:
   ```bash
   npm run dev
   ```
   Tarayıcınızı açın ve yerel sunucu adresine (genellikle `http://localhost:5173`) gidin.

4. **Canlı (Production) ortamı için derleyin**:
   ```bash
   npm run build
   ```
