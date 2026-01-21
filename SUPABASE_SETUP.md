# 🗄️ Supabase Veritabanı Kurulum Rehberi

Bu rehber, Beslenme Takip Sistemi için Supabase veritabanını sıfırdan kurmanızı sağlar.

## 📋 Ön Gereksinimler

- Supabase hesabı ([supabase.com](https://supabase.com))
- Proje oluşturulmuş olmalı
- `.env.local` dosyasında Supabase bilgileri olmalı

## 🚀 Kurulum Adımları

### 1. Supabase Dashboard'a Giriş

1. [supabase.com](https://supabase.com) adresine gidin
2. Projenizi seçin
3. Sol menüden **SQL Editor**'ı açın

### 2. SQL Şemasını Çalıştırma

1. `supabase-schema.sql` dosyasını açın
2. **TÜM içeriği kopyalayın** (Ctrl+A, Ctrl+C)
3. Supabase SQL Editor'a yapıştırın
4. Sağ üstteki **"Run"** butonuna tıklayın
5. İşlemin tamamlanmasını bekleyin (yaklaşık 5-10 saniye)

### 3. Kurulumu Doğrulama

SQL Editor'da aşağıdaki sorguyu çalıştırarak tabloları kontrol edin:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

Şu tabloları görmelisiniz:
- ✅ `user_profiles`
- ✅ `nutrition_plans`
- ✅ `meal_logs`
- ✅ `daily_progress`
- ✅ `weight_logs`

### 4. RLS Politikalarını Kontrol

```sql
SELECT tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public';
```

Her tablo için politikalar görmelisiniz.

### 5. Trigger'ları Kontrol

```sql
SELECT trigger_name, event_object_table 
FROM information_schema.triggers 
WHERE trigger_schema = 'public';
```

Şu trigger'ları görmelisiniz:
- ✅ `on_auth_user_created` (auth.users)
- ✅ `on_meal_log_insert` (meal_logs)
- ✅ `on_meal_log_delete` (meal_logs)
- ✅ `update_*_updated_at` (çeşitli tablolar)

## 📊 Veritabanı Yapısı

### Tablo İlişkileri

```
auth.users (Supabase Auth)
    ↓
user_profiles (1:1)
    ↓
    ├── nutrition_plans (1:N)
    ├── meal_logs (1:N)
    ├── daily_progress (1:N)
    └── weight_logs (1:N)
```

### Önemli Özellikler

#### 🔐 Row Level Security (RLS)
- Her kullanıcı sadece kendi verilerini görebilir
- Otomatik güvenlik kontrolü
- SQL injection koruması

#### ⚡ Otomatik Trigger'lar
- **Yeni kullanıcı** → Otomatik profil oluşturma
- **Öğün ekleme** → Daily progress güncelleme
- **Öğün silme** → Daily progress düzeltme
- **Güncelleme** → `updated_at` otomatik güncelleme

#### 📈 Yardımcı Fonksiyonlar
- `get_user_daily_stats()` - Günlük istatistikler
- `get_user_weekly_summary()` - Haftalık özet

## 🔧 .env.local Ayarları

`.env.local` dosyanızda şunlar olmalı:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Google Gemini (AI)
GEMINI_API_KEY=your-gemini-api-key
```

### Supabase Bilgilerini Bulma

1. Supabase Dashboard > **Settings** > **API**
2. **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
3. **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🧪 Test Etme

### 1. Kayıt Olma Testi

```bash
npm run dev
```

1. `http://localhost:3000/auth/signup` adresine gidin
2. Yeni bir hesap oluşturun
3. Supabase Dashboard > **Authentication** > **Users** bölümünde kullanıcıyı görün
4. **Table Editor** > **user_profiles** tablosunda profili görün

### 2. Öğün Ekleme Testi

1. Dashboard'a gidin
2. Yeni öğün ekleyin
3. **Table Editor** > **meal_logs** tablosunda kaydı görün
4. **Table Editor** > **daily_progress** tablosunda güncellenmiş değerleri görün

## 🐛 Sorun Giderme

### Hata: "relation does not exist"

**Çözüm:** SQL şemasını tekrar çalıştırın. Önce mevcut tabloları temizler.

### Hata: "permission denied for table"

**Çözüm:** RLS politikaları eksik. SQL şemasının RLS bölümünü tekrar çalıştırın.

### Hata: "duplicate key value violates unique constraint"

**Çözüm:** Aynı kullanıcı/tarih için birden fazla kayıt oluşturulamaz. Bu normaldir.

### Trigger Çalışmıyor

**Kontrol:**
```sql
SELECT * FROM pg_trigger WHERE tgname LIKE '%meal%';
```

**Çözüm:** Trigger'ları tekrar oluşturun (SQL şemasının trigger bölümü).

## 📚 Kullanım Örnekleri

### Günlük İstatistikleri Getirme

```sql
SELECT * FROM get_user_daily_stats(
    'user-uuid-here',
    '2024-01-17'
);
```

### Haftalık Özet

```sql
SELECT * FROM get_user_weekly_summary(
    'user-uuid-here',
    '2024-01-10'
);
```

### Kullanıcının Tüm Öğünleri

```sql
SELECT * FROM meal_logs
WHERE user_id = 'user-uuid-here'
ORDER BY date DESC, created_at DESC
LIMIT 50;
```

## 🔄 Veritabanını Sıfırlama

**DİKKAT:** Bu işlem TÜM verileri siler!

```sql
-- Tüm tabloları sil
DROP TABLE IF EXISTS public.weight_logs CASCADE;
DROP TABLE IF EXISTS public.daily_progress CASCADE;
DROP TABLE IF EXISTS public.meal_logs CASCADE;
DROP TABLE IF EXISTS public.nutrition_plans CASCADE;
DROP TABLE IF EXISTS public.user_profiles CASCADE;

-- Trigger'ları sil
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS create_user_profile();
-- ... diğer trigger'lar
```

Sonra `supabase-schema.sql` dosyasını tekrar çalıştırın.

## 📞 Destek

Sorun yaşıyorsanız:
1. Supabase Dashboard > **Logs** bölümünü kontrol edin
2. Browser Console'da hata mesajlarını kontrol edin
3. SQL Editor'da manuel sorgu çalıştırarak test edin

## ✅ Kurulum Tamamlandı!

Artık veritabanınız hazır. Uygulamanızı çalıştırabilirsiniz:

```bash
npm run dev
```

Başarılar! 🎉
