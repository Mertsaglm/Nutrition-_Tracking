# 🚀 GitHub'a Yükleme Rehberi

## ✅ Tamamlanan Adımlar

1. ✅ Git repository oluşturuldu
2. ✅ Tüm dosyalar commit edildi
3. ✅ README.md hazırlandı
4. ✅ .env.example oluşturuldu (güvenlik için)

## 📋 Şimdi Yapılacaklar

### 1. GitHub'da Yeni Repository Oluştur

1. **GitHub'a git:** https://github.com/Mertsaglam
2. **"New repository" butonuna tıkla** (sağ üstte yeşil buton)
3. **Repository bilgilerini gir:**
   - **Repository name:** `nutrition-tracker` (veya istediğin isim)
   - **Description:** `AI-powered nutrition tracking system with dynamic calorie calculation`
   - **Public** seç (herkes görebilsin)
   - ❌ **"Initialize this repository with a README" seçme** (zaten var)
   - ❌ **".gitignore" ekleme** (zaten var)
   - ❌ **"License" ekleme** (şimdilik)
4. **"Create repository" butonuna tıkla**

### 2. Terminal'de Komutları Çalıştır

GitHub'da repository oluşturduktan sonra, aşağıdaki komutları **sırayla** çalıştır:

#### Adım 1: Remote ekle
```bash
git remote add origin https://github.com/Mertsaglam/nutrition-tracker.git
```

#### Adım 2: Branch ismini kontrol et
```bash
git branch -M main
```

#### Adım 3: GitHub'a push et
```bash
git push -u origin main
```

**Not:** İlk push'ta GitHub kullanıcı adı ve şifre/token isteyebilir.

### 3. GitHub Token Oluşturma (Gerekirse)

Eğer şifre isterse, Personal Access Token kullanman gerekir:

1. GitHub → **Settings** (sağ üst profil)
2. **Developer settings** (en altta)
3. **Personal access tokens** → **Tokens (classic)**
4. **Generate new token** → **Generate new token (classic)**
5. **Note:** "Nutrition Tracker Upload"
6. **Expiration:** 90 days (veya istediğin süre)
7. **Scopes:** Sadece **"repo"** seç (tüm repo yetkisi)
8. **Generate token** butonuna tıkla
9. **Token'ı kopyala** (bir daha göremezsin!)
10. Terminal'de şifre yerine bu token'ı yapıştır

### 4. Doğrulama

Push işlemi tamamlandıktan sonra:

1. **GitHub'da repository'yi aç:** https://github.com/Mertsaglam/nutrition-tracker
2. **Dosyaların yüklendiğini kontrol et**
3. **README.md'nin güzel göründüğünü kontrol et**

## 🎯 Tek Komut ile Yükleme

Eğer repository'yi zaten oluşturduysanız, şu komutları çalıştır:

```bash
# Remote ekle (repository adını değiştir)
git remote add origin https://github.com/Mertsaglam/nutrition-tracker.git

# Branch ismini ayarla
git branch -M main

# GitHub'a yükle
git push -u origin main
```

## 🔄 Gelecekte Değişiklik Yapmak İçin

Proje üzerinde çalışıp değişiklik yaptıktan sonra:

```bash
# Değişiklikleri ekle
git add .

# Commit yap (açıklayıcı mesaj yaz)
git commit -m "feat: Yeni özellik eklendi"

# GitHub'a gönder
git push
```

## 📝 Commit Mesaj Formatı

İyi commit mesajları için:

- `feat:` - Yeni özellik
- `fix:` - Hata düzeltme
- `docs:` - Dokümantasyon
- `style:` - Kod formatı
- `refactor:` - Kod iyileştirme
- `test:` - Test ekleme
- `chore:` - Genel işler

**Örnekler:**
```bash
git commit -m "feat: Add meal history filtering"
git commit -m "fix: Fix dashboard loading issue"
git commit -m "docs: Update README with new features"
```

## ⚠️ Önemli Notlar

### Güvenlik
- ✅ `.env.local` dosyası **yüklenmedi** (.gitignore'da)
- ✅ API anahtarları **güvende**
- ✅ `.env.example` dosyası **yüklendi** (örnek olarak)

### Dosya Boyutu
- Eğer `node_modules` yüklenmeye çalışırsa → `.gitignore` kontrol et
- Eğer `.next` klasörü yüklenirse → `.gitignore` kontrol et

### Branch Stratejisi
- `main` - Ana branch (production)
- `develop` - Geliştirme branch (opsiyonel)
- `feature/xyz` - Özellik branch'leri (opsiyonel)

## 🎉 Tamamlandı!

Repository başarıyla yüklendikten sonra:

1. ✅ README.md güzel görünüyor
2. ✅ Kod GitHub'da
3. ✅ Başkaları klonlayabilir
4. ✅ Vercel'e deploy edebilirsin

## 🚀 Vercel'e Deploy (Opsiyonel)

GitHub'a yükledikten sonra Vercel'e deploy etmek için:

1. **Vercel'e git:** https://vercel.com
2. **GitHub ile giriş yap**
3. **"New Project" butonuna tıkla**
4. **Repository'yi seç:** nutrition-tracker
5. **Environment Variables ekle:**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `GEMINI_API_KEY`
6. **Deploy butonuna tıkla**
7. **2-3 dakika bekle**
8. **Canlı link'i al!** 🎉

## 📞 Sorun mu Var?

### "Permission denied" hatası
```bash
# SSH key ekle veya HTTPS kullan
git remote set-url origin https://github.com/Mertsaglam/nutrition-tracker.git
```

### "Repository not found" hatası
- Repository adını kontrol et
- GitHub'da repository'nin oluşturulduğundan emin ol

### "Authentication failed" hatası
- Personal Access Token kullan
- Token'ın "repo" yetkisi olduğundan emin ol

---

**Hazırsın!** 🚀 Komutları çalıştır ve projen GitHub'da olsun!
