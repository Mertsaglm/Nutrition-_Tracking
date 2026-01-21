# ✨ Yeni Özellik: Örnek Günlük Beslenme Programı

## 📋 Özet

Onboarding Step 5'e kullanıcının hedeflerine, diyet tercihlerine ve alerjilerine göre AI tarafından oluşturulan örnek 1 günlük beslenme programı eklendi.

## 🎯 Amaç

Kullanıcıya program oluşturulduktan sonra somut bir örnek göstererek:
- Motivasyonu artırmak
- Neyi beklemesi gerektiğini göstermek
- Diyet tercihlerinin ve alerjilerin dikkate alındığını kanıtlamak

## 🔧 Teknik Detaylar

### Yeni Dosyalar
- `app/api/sample-meal-plan/route.ts` - Örnek program API endpoint'i

### Güncellenen Dosyalar
- `lib/gemini-service.ts` - `generateSampleDayMealPlan()` fonksiyonu eklendi
- `app/onboarding/page.tsx` - Step 5'e örnek program bölümü eklendi
- `README.md` - Yeni özellik dokümante edildi

### API Endpoint

**POST** `/api/sample-meal-plan`

**Request Body:**
```json
{
  "dailyCalories": 2000,
  "protein": 150,
  "carbs": 200,
  "fat": 67,
  "mealCount": 4,
  "dietaryPreferences": ["Vejetaryen"],
  "allergies": ["Fıstık", "Süt"],
  "goal": "lose_weight"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "meals": [
      {
        "name": "Kahvaltı",
        "time": "08:00",
        "foods": [...],
        "totals": { "calories": 500, "protein": 30, "carbs": 50, "fat": 15 }
      }
    ],
    "dailyTotals": { "calories": 2000, "protein": 150, "carbs": 200, "fat": 67 },
    "note": "Motivasyon notu"
  }
}
```

## 🎨 UI/UX

### Görsel Özellikler
- Mor-pembe gradient arka plan (ilham verici)
- "İlham Verici Örnek" etiketi
- Kart bazlı öğün gösterimi
- Her öğün için:
  - Öğün adı ve saati
  - Toplam kalori ve makrolar
  - Yiyecek listesi ve miktarları
- Motivasyon notu
- "Bu sadece bir örnektir" uyarısı

### Kullanıcı Akışı
1. Kullanıcı Step 4'ten Step 5'e geçer
2. Otomatik olarak örnek program oluşturma başlar
3. Loading animasyonu gösterilir
4. Örnek program kartlar halinde gösterilir
5. Kullanıcı "Tamamla ve Başla" ile dashboard'a gider

## ✅ Önemli Noktalar

### Diyet Tercihleri
- Vejetaryen: Et yok
- Vegan: Hayvansal ürün yok
- Glutensiz: Gluten içeren ürünler yok
- Laktozsuz: Süt ürünleri yok
- Ketojenik: Düşük karbonhidrat
- Akdeniz Diyeti: Zeytinyağı, balık, sebze ağırlıklı

### Alerjiler
- Virgülle ayrılmış liste
- Gemini prompt'una "ASLA KULLANMA" uyarısı ile eklenir
- Örnek: "Fıstık, süt ürünleri, deniz ürünleri"

### Güvenlik
- API endpoint'i POST metodu ile çalışır
- Validasyon yapılır
- Hata durumunda kullanıcı bilgilendirilir
- Örnek program oluşturulamazsa dashboard'a geçiş yapılabilir

## 🧪 Test Senaryoları

### Test 1: Normal Kullanıcı
- Diyet tercihi: Yok
- Alerji: Yok
- Beklenen: Genel Türk mutfağı örnekleri

### Test 2: Vejetaryen
- Diyet tercihi: Vejetaryen
- Alerji: Yok
- Beklenen: Et içermeyen öğünler

### Test 3: Vegan + Fıstık Alerjisi
- Diyet tercihi: Vegan
- Alerji: Fıstık
- Beklenen: Hayvansal ürün ve fıstık içermeyen öğünler

### Test 4: Kilo Verme
- Hedef: Kilo verme
- Beklenen: Düşük kalorili, yüksek proteinli öğünler

### Test 5: Kas Yapma
- Hedef: Kas yapma
- Beklenen: Yüksek proteinli, dengeli öğünler

## 🚀 Gelecek İyileştirmeler

- [ ] Örnek programı PDF olarak indirme
- [ ] Birden fazla gün için örnek program
- [ ] Kullanıcının beğendiği örneği favorilere ekleme
- [ ] Örnek programı doğrudan dashboard'a aktarma
- [ ] Alternatif öğün önerileri
- [ ] Tarif detayları ve hazırlama talimatları

## 📝 Notlar

- Gemini API kullanımı için `NEXT_PUBLIC_GEMINI_API_KEY` gerekli
- Örnek program oluşturma yaklaşık 3-5 saniye sürer
- Hata durumunda kullanıcı dashboard'a geçebilir
- Örnek program sadece ilham vericidir, zorunlu değildir
