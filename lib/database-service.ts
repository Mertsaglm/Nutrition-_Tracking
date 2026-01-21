import { supabase } from './supabase'
import { MealEntry, NutritionData } from './types'

export const databaseService = {
  // ============================================
  // MEAL LOGS
  // ============================================
  
  async saveMealLog(userId: string, mealEntry: MealEntry) {
    const { data, error } = await supabase
      .from('meal_logs')
      .insert({
        user_id: userId,
        date: new Date(mealEntry.timestamp).toISOString().split('T')[0],
        meal_type: mealEntry.mealType,
        description: mealEntry.description,
        food_items: mealEntry.foods,
        total_calories: mealEntry.totalNutrition.calories,
        total_protein_g: mealEntry.totalNutrition.protein,
        total_carbs_g: mealEntry.totalNutrition.carbs,
        total_fat_g: mealEntry.totalNutrition.fat,
        ai_analysis: mealEntry.aiAnalysis,
        ai_suggestions: mealEntry.suggestions,
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getMealLogs(userId: string, date: string) {
    const { data, error } = await supabase
      .from('meal_logs')
      .select('*')
      .eq('user_id', userId)
      .eq('date', date)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  async deleteMealLog(mealLogId: string) {
    const { error } = await supabase
      .from('meal_logs')
      .delete()
      .eq('id', mealLogId)

    if (error) throw error
  },

  // ============================================
  // DAILY PROGRESS
  // ============================================
  
  async getDailyProgress(userId: string, date: string) {
    const { data, error } = await supabase
      .from('daily_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('date', date)
      .single()

    if (error && error.code !== 'PGRST116') throw error // PGRST116 = no rows
    return data
  },

  async getWeeklySummary(userId: string, startDate: string) {
    const { data, error } = await supabase
      .rpc('get_user_weekly_summary', {
        p_user_id: userId,
        p_start_date: startDate,
      })

    if (error) throw error
    return data?.[0] || null
  },

  // ============================================
  // NUTRITION PLANS
  // ============================================
  
  async getActiveNutritionPlan(userId: string) {
    const { data, error } = await supabase
      .from('nutrition_plans')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async createNutritionPlan(
    userId: string,
    targets: NutritionData,
    planName?: string
  ) {
    // Önce mevcut aktif planları pasif yap
    await supabase
      .from('nutrition_plans')
      .update({ is_active: false })
      .eq('user_id', userId)
      .eq('is_active', true)

    // Yeni plan oluştur
    const { data, error } = await supabase
      .from('nutrition_plans')
      .insert({
        user_id: userId,
        daily_calories: targets.calories,
        protein_g: targets.protein,
        carbs_g: targets.carbs,
        fat_g: targets.fat,
        is_active: true,
        plan_name: planName,
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  // ============================================
  // WEIGHT LOGS
  // ============================================
  
  async saveWeightLog(userId: string, date: string, weightKg: number, notes?: string) {
    const { data, error } = await supabase
      .from('weight_logs')
      .insert({
        user_id: userId,
        date,
        weight_kg: weightKg,
        notes,
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getWeightLogs(userId: string, limit: number = 30) {
    const { data, error } = await supabase
      .from('weight_logs')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data
  },

  async updateCurrentWeight(userId: string, weightKg: number) {
    const { error } = await supabase
      .from('user_profiles')
      .update({ current_weight_kg: weightKg })
      .eq('id', userId)

    if (error) throw error
  },
}
