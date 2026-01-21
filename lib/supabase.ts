import { createClient } from '@supabase/supabase-js'

// Supabase client
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Client component için
export const createSupabaseClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// Database types
export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          email: string
          name: string | null
          age: number | null
          gender: 'male' | 'female' | 'other' | null
          height_cm: number | null
          current_weight_kg: number | null
          target_weight_kg: number | null
          activity_level: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active' | null
          goal: 'lose_weight' | 'gain_weight' | 'build_muscle' | 'maintain' | null
          dietary_preferences: string[] | null
          allergies: string[] | null
          meal_count: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['user_profiles']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['user_profiles']['Insert']>
      }
      nutrition_plans: {
        Row: {
          id: string
          user_id: string
          daily_calories: number
          protein_g: number
          carbs_g: number
          fat_g: number
          fiber_g: number | null
          is_active: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['nutrition_plans']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['nutrition_plans']['Insert']>
      }
      meal_logs: {
        Row: {
          id: string
          user_id: string
          date: string
          meal_type: string
          food_items: any
          total_calories: number
          total_protein_g: number | null
          total_carbs_g: number | null
          total_fat_g: number | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['meal_logs']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['meal_logs']['Insert']>
      }
      weight_logs: {
        Row: {
          id: string
          user_id: string
          date: string
          weight_kg: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['weight_logs']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['weight_logs']['Insert']>
      }
      daily_progress: {
        Row: {
          id: string
          user_id: string
          date: string
          calories_consumed: number
          protein_consumed_g: number
          carbs_consumed_g: number
          fat_consumed_g: number
          goal_met: boolean
          streak_days: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['daily_progress']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['daily_progress']['Insert']>
      }
    }
  }
}
