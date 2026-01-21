# 🥗 Beslenme Takip Sistemi

AI destekli, kişiselleştirilmiş beslenme takip uygulaması. Kullanıcıların fiziksel özelliklerine ve hedeflerine göre bilimsel formüllerle hesaplanmış beslenme planları sunar.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Supabase](https://img.shields.io/badge/Supabase-Database-green)
![Gemini AI](https://img.shields.io/badge/Gemini-AI-orange)

## ✨ Özellikler

### 🎯 Kişiselleştirilmiş Beslenme Planı
- **Bilimsel Formüller:** Mifflin-St Jeor formülü ile BMR hesaplama
- **Dinamik Kalori:** Hedefe göre otomatik kalori hesaplama
- **Makro Optimizasyonu:** Protein, karbonhidrat, yağ dağılımı
- **Öğün Planlaması:** Hedefe göre optimal öğün sayısı ve zamanları

### 🤖 AI Destekli Analiz
- **Google Gemini API:** Doğal dilde yemek açıklaması
- **Otomatik Besin Analizi:** 500+ Türk yiyeceği veritabanı
- **Akıllı Öneriler:** Hedefe göre beslenme önerileri
- **Güven Skoru:** Analiz kalitesi gösterimi

### 📊 Kapsamlı Takip
- **Günlük İlerleme:** Kalori ve makro besin takibi
- **Öğün Geçmişi:** Detaylı öğün kayıtları
- **Kilo Takibi:** Haftalık kilo değişimi
- **İstatistikler:** Haftalık ve aylık raporlar

### 🔐 Güvenli ve Ölçeklenebilir
- **Supabase Auth:** Güvenli kullanıcı yönetimi
- **Row Level Security:** Veri izolasyonu
- **PostgreSQL:** Güçlü veritabanı
- **Responsive Design:** Mobil, tablet, desktop uyumlu

## 🚀 Hızlı Başlangıç

### Gereksinimler
- Node.js 18+ 
- npm veya yarn
- Supabase hesabı
- Google Gemini API anahtarı

### Kurulum

1. **Projeyi klonlayın**
```bash
git clone https://github.com/Mertsaglam/nutrition-tracker.git
cd nutrition-tracker
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Ortam değişkenlerini ayarlayın**
```bash
cp .env.example .env.local
```

`.env.local` dosyasını düzenleyin:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Google Gemini AI
GEMINI_API_KEY=your-gemini-api-key
```

4. **Supabase veritabanını kurun**
- Supabase Dashboard → SQL Editor
- `supabase-schema.sql` dosyasını çalıştırın
- Detaylı kurulum için: [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)

5. **Uygulamayı başlatın**
```bash
npm run dev
```

Tarayıcınızda açın: [http://localhost:3000](http://localhost:3000)

## 📖 Dokümantasyon

- **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** - Veritabanı kurulum rehberi
- **[GUNCELLEMELER.md](./GUNCELLEMELER.md)** - Proje güncellemeleri ve özellikler
- **[OGUN_SISTEMI_ACIKLAMA.md](./OGUN_SISTEMI_ACIKLAMA.md)** - Öğün sistemi detayları

## 🏗️ Teknoloji Stack

### Frontend
- **Next.js 14** - React framework (App Router)
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Modern styling
- **Zustand** - State management
- **Lucide React** - İkonlar

### Backend & Database
- **Supabase** - Backend as a Service
- **PostgreSQL** - İlişkisel veritabanı
- **Row Level Security** - Veri güvenliği

### AI & API
- **Google Gemini API** - Doğal dil işleme
- **Next.js API Routes** - Backend endpoints

## 📁 Proje Yapısı

```
├── app/                      # Next.js App Router
│   ├── api/                 # API endpoints
│   ├── auth/                # Kimlik doğrulama sayfaları
│   ├── dashboard/           # Ana dashboard
│   ├── onboarding/          # Kullanıcı onboarding
│   └── page.tsx             # Ana sayfa
├── components/              # React bileşenleri
│   ├── DashboardHeader.tsx
│   ├── MealLogger.tsx
│   ├── MealHistory.tsx
│   └── NutritionOverview.tsx
├── lib/                     # Utility fonksiyonları
│   ├── auth.ts             # Kimlik doğrulama
│   ├── database-service.ts # Veritabanı işlemleri
│   ├── gemini-service.ts   # AI servisi
│   ├── nutrition-calculator.ts # Kalori hesaplama
│   ├── nutrition-store.ts  # State management
│   └── types.ts            # TypeScript tipleri
├── supabase-schema.sql     # Veritabanı şeması
└── comprehensive-nutrition-database.json # Besin veritabanı
```

## 🔬 Bilimsel Temeller

### BMR Hesaplama (Mifflin-St Jeor)
```
Erkek: BMR = 10 × kilo + 6.25 × boy - 5 × yaş + 5
Kadın: BMR = 10 × kilo + 6.25 × boy - 5 × yaş - 161
```

### TDEE (Günlük Enerji İhtiyacı)
```
TDEE = BMR × Aktivite Çarpanı
- Sedanter: 1.2
- Hafif Aktif: 1.375
- Orta: 1.55
- Aktif: 1.725
- Çok Aktif: 1.9
```

### Hedef Kalori
```
Sağlıklı kilo değişimi: ±0.5 kg/hafta
1 kg yağ = 7700 kalori
Günlük fark = (hedef kg × 7700) / (hedef gün)
```

## 🎯 Kullanım Akışı

1. **Kayıt Ol** - Email ile hesap oluştur
2. **Onboarding** - Fiziksel özellikler ve hedefler
3. **Plan Hesaplama** - Bilimsel formüllerle kişisel plan
4. **Öğün Ekleme** - Doğal dilde yemek açıklaması
5. **AI Analiz** - Otomatik besin değeri hesaplama
6. **İlerleme Takibi** - Günlük ve haftalık raporlar

## 🌟 Öne Çıkan Özellikler

### Dinamik Kalori Hesaplama
Her kullanıcı için özel hesaplama:
- Bazal metabolizma (BMR)
- Günlük enerji ihtiyacı (TDEE)
- Hedef kalori (sağlıklı kilo değişim hızı)
- Makro besin dağılımı (hedefe göre optimize)

### Akıllı Öğün Planlaması
Hedefe göre optimal öğün sayısı:
- **Kilo Verme:** 3 öğün (Kahvaltı, Öğle, Akşam)
- **Kilo Alma:** 5 öğün (sık öğün, metabolizma aktif)
- **Kas Yapma:** 5 öğün (protein sentezi için düzenli)
- **Koruma:** 4 öğün (dengeli)

### Türk Mutfağı Desteği
- 500+ Türk yiyeceği
- Gram başına besin değerleri
- 20+ kategori
- Yerel ölçü birimleri (bardak, kaşık, vb.)

## 🔒 Güvenlik

- **Row Level Security (RLS)** - Her kullanıcı sadece kendi verilerini görür
- **Environment Variables** - API anahtarları güvenli
- **Supabase Auth** - Güvenli kimlik doğrulama
- **SQL Injection** - Parametreli sorgular

## 📱 Responsive Design

- **Mobile First** - Mobil öncelikli tasarım
- **Glassmorphism** - Modern UI
- **Touch Friendly** - Dokunmatik uyumlu
- **PWA Ready** - Progressive Web App hazır

## 🚧 Geliştirme

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Lint
```bash
npm run lint
```

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

**Mert Sağlam**
- GitHub: [@Mertsaglam](https://github.com/Mertsaglam)

## 🙏 Teşekkürler

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Google Gemini](https://ai.google.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

## 📞 Destek

Sorularınız için:
- Issue açın: [GitHub Issues](https://github.com/Mertsaglam/nutrition-tracker/issues)
- Dokümantasyonu okuyun: [Docs](./SUPABASE_SETUP.md)

---

⭐ Projeyi beğendiyseniz yıldız vermeyi unutmayın!
