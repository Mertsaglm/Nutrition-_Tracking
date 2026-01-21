# 🥗 Nutrition Tracker

AI destekli, kişiselleştirilmiş beslenme takip uygulaması. Bilimsel formüllerle hesaplanan günlük kalori ve makro besin hedefleri ile sağlıklı yaşam yolculuğunuza başlayın.

## ✨ Özellikler

### 🤖 AI Destekli Besin Analizi
- **Google Gemini AI** ile doğal dilde yemek açıklaması
- Otomatik besin değeri hesaplama
- 500+ Türk yiyeceği içeren kapsamlı veritabanı
- Akıllı yiyecek tanıma ve kategorilendirme

### 📊 Kişiselleştirilmiş Beslenme Planı
- **Bilimsel formüllerle** hesaplanan günlük kalori hedefi
- Mifflin-St Jeor formülü ile BMR hesaplama
- Aktivite seviyesine göre TDEE hesaplama
- Hedefe özel makro besin dağılımı (protein, karbonhidrat, yağ)
- **Örnek günlük beslenme programı** - Diyet tercihleri ve alerjilere uygun

### 🎯 Akıllı Hedef Belirleme
- Kilo verme, kilo alma, kas yapma veya koruma
- Gerçekçi süre önerileri (0.5 kg/hafta)
- Öğün sayısı optimizasyonu (3-6 öğün)
- Diyet tercihleri ve alerji yönetimi

### 📱 Modern Kullanıcı Arayüzü
- Glassmorphism tasarım
- Responsive tasarım (mobil/tablet/desktop)
- Gerçek zamanlı ilerleme takibi
- Öğün geçmişi ve detaylı analiz

## 🚀 Teknolojiler

- **Frontend:** Next.js 14, React 18, TypeScript
- **Styling:** Tailwind CSS, Lucide Icons
- **State Management:** Zustand
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **AI:** Google Gemini API
- **Date Handling:** date-fns

## 📦 Kurulum

### 1. Projeyi Klonlayın

```bash
git clone https://github.com/kullanici-adi/nutrition-tracker.git
cd nutrition-tracker
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. Environment Değişkenlerini Ayarlayın

`.env.example` dosyasını `.env.local` olarak kopyalayın:

```bash
cp .env.example .env.local
```

Ardından `.env.local` dosyasını düzenleyin:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Google Gemini AI
GEMINI_API_KEY=your-gemini-api-key
```

### 4. Supabase Veritabanını Kurun

1. [Supabase Dashboard](https://supabase.com/dashboard)'a gidin
2. SQL Editor'ı açın
3. `supabase-schema.sql` dosyasının içeriğini yapıştırın
4. "Run" butonuna tıklayın

### 5. Uygulamayı Başlatın

```bash
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacak.

## 🔑 API Anahtarları Nasıl Alınır?

### Supabase
1. [supabase.com](https://supabase.com) adresine gidin
2. Yeni proje oluşturun
3. Settings > API bölümünden URL ve anon key'i kopyalayın

### Google Gemini
1. [Google AI Studio](https://makersuite.google.com/app/apikey) adresine gidin
2. "Create API Key" butonuna tıklayın
3. API anahtarınızı kopyalayın

## 📖 Kullanım

### 1. Kayıt Olun
- Ana sayfadan "Ücretsiz Başla" butonuna tıklayın
- Email ve şifre ile kayıt olun
- Email doğrulama linkine tıklayın

### 2. Onboarding'i Tamamlayın
- **Adım 1:** Fiziksel özelliklerinizi girin (yaş, boy, kilo)
- **Adım 2:** Hedefinizi ve sürenizi belirleyin
- **Adım 3:** Diyet tercihlerinizi seçin (vejetaryen, vegan, alerjiler vb.)
- **Adım 4:** Hesaplanan planınızı inceleyin
- **Adım 5:** AI ile oluşturulan örnek günlük programı görün ve onaylayın

### 3. Öğün Ekleyin
- Dashboard'da öğün türünü seçin
- Yediğiniz yemeği doğal dilde yazın
  - Örnek: "2 yumurta, 1 dilim ekmek, 1 bardak süt"
- AI otomatik olarak besin değerlerini hesaplar
- Kaydet butonuna tıklayın

### 4. İlerlemenizi Takip Edin
- Günlük kalori ve makro hedeflerinizi görün
- Öğün geçmişinizi inceleyin
- Hedeflerinize ne kadar yaklaştığınızı takip edin

## 🧮 Bilimsel Formüller

### BMR (Bazal Metabolizma Hızı)
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

### Makro Dağılımı
**Kilo Verme:**
- Protein: %35 (yüksek)
- Karbonhidrat: %35 (orta)
- Yağ: %30 (orta)

**Kilo Alma:**
- Protein: %20 (orta)
- Karbonhidrat: %50 (yüksek)
- Yağ: %30 (orta)

**Kas Yapma:**
- Protein: %30 (çok yüksek, min 2g/kg)
- Karbonhidrat: %40 (yüksek)
- Yağ: %30 (orta)

**Koruma:**
- Protein: %25 (orta)
- Karbonhidrat: %45 (orta)
- Yağ: %30 (orta)

## 📁 Proje Yapısı

```
nutrition-tracker/
├── app/                      # Next.js App Router
│   ├── api/                 # API endpoints
│   ├── auth/                # Authentication pages
│   ├── dashboard/           # Dashboard page
│   ├── onboarding/          # Onboarding flow
│   └── page.tsx             # Landing page
├── components/              # React components
│   ├── DashboardHeader.tsx
│   ├── MealLogger.tsx
│   ├── MealHistory.tsx
│   └── NutritionOverview.tsx
├── lib/                     # Utility functions
│   ├── auth.ts             # Authentication helpers
│   ├── database-service.ts # Database operations
│   ├── gemini-service.ts   # AI service
│   ├── nutrition-calculator.ts # Calculation engine
│   ├── supabase.ts         # Supabase client
│   └── types.ts            # TypeScript types
├── comprehensive-nutrition-database.json # Besin veritabanı
├── supabase-schema.sql     # Database schema
└── supabase-reset.sql      # Database reset script
```

## 🗄️ Veritabanı Şeması

### Tablolar
- **user_profiles:** Kullanıcı profil bilgileri
- **nutrition_plans:** Beslenme planları
- **meal_logs:** Öğün kayıtları
- **daily_progress:** Günlük ilerleme
- **weight_logs:** Kilo takibi

### Özellikler
- Row Level Security (RLS) ile güvenlik
- Otomatik trigger'lar ile veri senkronizasyonu
- Yardımcı fonksiyonlar ile kolay sorgulama

## 🔒 Güvenlik

- Supabase Auth ile güvenli kimlik doğrulama
- Row Level Security (RLS) ile veri izolasyonu
- Environment variables ile API key koruması
- Client-side validation ile veri doğrulama

## 🚀 Deployment

### Vercel (Önerilen)

1. [Vercel](https://vercel.com) hesabı oluşturun
2. GitHub repository'nizi bağlayın
3. Environment variables'ı ekleyin
4. Deploy butonuna tıklayın

### Diğer Platformlar
- Netlify
- Railway
- Render
- Docker

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

Mert Sağlam

## 🙏 Teşekkürler

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [Google Gemini](https://ai.google.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)

---

⭐ Projeyi beğendiyseniz yıldız vermeyi unutmayın!
