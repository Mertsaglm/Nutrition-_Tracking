-- ============================================
-- SUPABASE DATABASE SIFIRLAMA
-- ============================================
-- DİKKAT: Bu kod TÜM VERİLERİ SİLER!
-- Sadece geliştirme/test ortamında kullanın
-- ============================================

-- 1. Önce tüm trigger'ları sil
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_meal_log_insert ON public.meal_logs;
DROP TRIGGER IF EXISTS on_meal_log_delete ON public.meal_logs;
DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON public.user_profiles;
DROP TRIGGER IF EXISTS update_nutrition_plans_updated_at ON public.nutrition_plans;
DROP TRIGGER IF EXISTS update_meal_logs_updated_at ON public.meal_logs;
DROP TRIGGER IF EXISTS update_daily_progress_updated_at ON public.daily_progress;

-- 2. Fonksiyonları sil
DROP FUNCTION IF EXISTS create_user_profile() CASCADE;
DROP FUNCTION IF EXISTS update_daily_progress_on_meal() CASCADE;
DROP FUNCTION IF EXISTS update_daily_progress_on_meal_delete() CASCADE;
DROP FUNCTION IF EXISTS update_updated_at_column() CASCADE;
DROP FUNCTION IF EXISTS get_user_daily_stats(UUID, DATE) CASCADE;
DROP FUNCTION IF EXISTS get_user_weekly_summary(UUID, DATE) CASCADE;

-- 3. Tabloları sil (CASCADE ile ilişkili her şey silinir)
DROP TABLE IF EXISTS public.weight_logs CASCADE;
DROP TABLE IF EXISTS public.daily_progress CASCADE;
DROP TABLE IF EXISTS public.meal_logs CASCADE;
DROP TABLE IF EXISTS public.nutrition_plans CASCADE;
DROP TABLE IF EXISTS public.user_profiles CASCADE;

-- 4. RLS politikalarını temizle (tablolar silindiği için otomatik silinir ama yine de)
-- Bu adım opsiyonel, tablolar zaten silindi

-- ============================================
-- SIFIRLAMA TAMAMLANDI! ✅
-- ============================================
-- Şimdi ne yapmalısın:
-- 1. supabase-schema.sql dosyasını çalıştır
-- 2. Tabloları yeniden oluştur
-- 3. Test kullanıcısı oluştur
-- ============================================
