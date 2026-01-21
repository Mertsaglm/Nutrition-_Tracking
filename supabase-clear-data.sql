-- ============================================
-- SUPABASE VERİLERİ TEMİZLE
-- ============================================
-- Sadece kayıtları siler, tablolar ve yapı korunur
-- Trigger'lar ve fonksiyonlar etkilenmez
-- ============================================

-- 1. Önce bağımlı tabloları temizle (foreign key sırası önemli)
DELETE FROM public.weight_logs;
DELETE FROM public.daily_progress;
DELETE FROM public.meal_logs;
DELETE FROM public.nutrition_plans;
DELETE FROM public.user_profiles;

-- 2. Auth kullanıcılarını da silmek istersen (opsiyonel)
-- DELETE FROM auth.users;

-- ============================================
-- TEMİZLEME TAMAMLANDI! ✅
-- ============================================
-- Silinen veriler:
-- ✅ Tüm kilo kayıtları
-- ✅ Tüm günlük ilerleme kayıtları
-- ✅ Tüm öğün kayıtları
-- ✅ Tüm beslenme planları
-- ✅ Tüm kullanıcı profilleri
--
-- Korunan yapılar:
-- ✅ Tablolar
-- ✅ Trigger'lar
-- ✅ Fonksiyonlar
-- ✅ RLS politikaları
-- ✅ Index'ler
-- ============================================
