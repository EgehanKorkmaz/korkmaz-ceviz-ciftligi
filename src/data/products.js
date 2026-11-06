export const PRODUCT_TAG_PRESETS = [
  {
    label: "Satışta",
    icon: "verified",
    colorClass: "bg-secondary text-on-primary",
    inStock: true
  },
  {
    label: "Hasat Döneminde",
    icon: "eco",
    colorClass: "bg-secondary-container text-on-secondary-container",
    inStock: true
  },
  {
    label: "Özel Hasat",
    icon: "star",
    colorClass: "bg-surface-variant text-on-surface-variant border border-outline-variant/40",
    inStock: true
  },
  {
    label: "Tükenmek Üzere",
    icon: "hourglass_bottom",
    colorClass: "bg-error-container text-on-error-container animate-pulse",
    inStock: true
  },
  {
    label: "Tükendi",
    icon: "block",
    colorClass: "bg-on-surface/80 text-surface",
    inStock: false
  },
  {
    label: "Seneye Hasadı Bekleniyor",
    icon: "event_upcoming",
    colorClass: "bg-surface-container-low text-on-surface-variant border border-outline-variant/40",
    inStock: false
  }
];

// Etiket adına göre doğru ikon, renk ve stok durumunu otomatik bulan yardımcı fonksiyon
export const getTagConfig = (tagOrLabel) => {
  const label = typeof tagOrLabel === 'string' ? tagOrLabel : tagOrLabel?.label;
  if (!label) return null;
  const found = PRODUCT_TAG_PRESETS.find(
    (preset) => preset.label.toLowerCase() === label.trim().toLowerCase()
  );
  return found || {
    label,
    icon: tagOrLabel?.icon || "eco",
    colorClass: tagOrLabel?.colorClass || "bg-secondary-container text-on-secondary-container",
    inStock: true
  };
};

export const products = [
  {
    id: "susurluk-yas-ceviz",
    name: "Susurluk Yaş Ceviz",
    description: "Mevsimin ilk tazeliği. Yeşil kabuğundan yeni ayrılmış, süt beyazı iç dokusuyla benzersiz bir lezzet deneyimi.",
    price: 180,
    unit: "kg",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeEAAhgwGYkbjyKENLFzDBLxcn8OiMa5KR4WSwR8SYLceD1pQUBHZPUx3xq6sVzc8KL5JuGYAQ0bVGB3B3HsbfRivI3WOsGSJ473nMJ93umzGkZzFyg0QOwMYQycD_j69q094yq5hWSeJVoTLx41MpRve_ik6yTD58PkSxXIzFzvDuq_H09LlPkhqWaB3Sitl03klgV6kZ0UjhuXit3dIdwGydwyMh384F_YKGrMM_5rKhGcPCJBEkUy-70YAlp6n4AmWlMZZ0sNk",
    imageAlt: "Close up of fresh green young walnuts still in their protective husks resting on a rustic wooden table",
    tag: {
      label: "Hasat Döneminde",
      icon: "nest_clock_farsight_digital",
      colorClass: "bg-secondary-container text-on-secondary-container"
    },
    options: [
      { label: "1 kg", value: 1 },
      { label: "5 kg", value: 5 },
      { label: "10 kg", value: 10 }
    ]
  },
  {
    id: "susurluk-kuru-ceviz",
    name: "Susurluk Kuru Ceviz",
    description: "Doğal yöntemlerle kurutulmuş, ince kabuklu ve yüksek yağ oranına sahip klasik lezzetimiz.",
    price: 220,
    unit: "kg",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAWJqkyRAFpb5n7YSPSeNWXRnLOIRmsBWe2LkTcbA9BuO_XR5D_bNb4H33Fs7Bbx5-hLgf3ilNrIqdrCLaXUhh6TpzUuX7GbWdFLx-Xqq15XYY-C-ZMOyZp2lv7Zwi4nFcYS7Zugn-eWa-w5g5VLDHts4NM3oplBwye3ST05mVeeRa3hfVyl4b2ZaFY6S4-gzGzrMQk_x784jo6YtTueF8WZryt_tGde62lkJHfGlMiTA62MbvyO91aNKcVoe4ZfS6lzM-qGRtXP4",
    imageAlt: "Pile of dried whole walnuts with light brown textured shells in a woven basket under natural light",
    tag: {
      label: "Tükenmek Üzere",
      icon: "hourglass_empty",
      colorClass: "bg-error-container text-on-error-container"
    },
    options: [
      { label: "5 kg", value: 5 },
      { label: "10 kg", value: 10 },
      { label: "25 kg", value: 25 }
    ]
  },
  {
    id: "banaz-cevizi",
    name: "Banaz Cevizi",
    description: "Belirli bir rakımda yetişen, iri boyutu ve kendine has aromasıyla sınırlı miktarda sunulan özel tür.",
    price: 260,
    unit: "kg",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9FmhK3fkQjU6YVH0_b6eVLIYiurrZ4fog5j3hrMvPaMAtA8_DG7gap5xAHOrdOqv1uWCxekgBlHIZsX_8CHqTb7aZY5dz463eG_8pWJUUEjsKjNpRLpFbZ-vauIHP0RwnA7dn_PREtiChnBZcLNqEP_IW4bMwbOKypiga2ziOCJ6uiSRDI3FsyxrWcT3CWqkoWyPj1cB032Hgn-cnaLJdxUtcpnIG-x1ghtiRDFzBRNXvfBmvMAAs1Ygw2kIlY8SVLRgRM6JRKyc",
    imageAlt: "Premium cracked walnuts showing perfect butterfly halves on dark slate stone surface side lighting",
    tag: {
      label: "Özel Hasat",
      icon: "star",
      colorClass: "bg-surface-variant text-on-surface-variant border border-outline-variant/30"
    },
    options: [
      { label: "1 kg", value: 1 },
      { label: "3 kg", value: 3 }
    ]
  }
];
