import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { DailyProgress, MealEntry, NutritionData } from './types'
import { NUTRITION_CONFIG } from './constants'

interface NutritionStore {
  dailyProgress: DailyProgress | null
  isLoading: boolean
  
  // Actions
  initializeDay: (date: string) => void
  setDailyTargets: (targets: NutritionData) => void
  addMealEntry: (entry: MealEntry) => void
  updateMealEntry: (id: string, entry: Partial<MealEntry>) => void
  deleteMealEntry: (id: string) => void
  calculateDailyTotals: () => void
}

const defaultTargets: NutritionData = NUTRITION_CONFIG.defaultTargets

export const useNutritionStore = create<NutritionStore>()(
  persist(
    (set, get) => ({
      dailyProgress: null,
      isLoading: false,

      initializeDay: (date: string) => {
        const existing = get().dailyProgress
        if (existing && existing.date === date) return

        set({
          dailyProgress: {
            date,
            consumed: { calories: 0, protein: 0, carbs: 0, fat: 0 },
            target: defaultTargets,
            meals: [],
          }
        })
      },

      setDailyTargets: (targets: NutritionData) => {
        const state = get()
        if (!state.dailyProgress) return

        set({
          dailyProgress: {
            ...state.dailyProgress,
            target: targets,
          }
        })
      },

      addMealEntry: (entry: MealEntry) => {
        const state = get()
        if (!state.dailyProgress) return

        const updatedMeals = [...state.dailyProgress.meals, entry]
        const consumed = calculateTotalNutrition(updatedMeals)

        set({
          dailyProgress: {
            ...state.dailyProgress,
            meals: updatedMeals,
            consumed,
          }
        })
      },

      updateMealEntry: (id: string, updates: Partial<MealEntry>) => {
        const state = get()
        if (!state.dailyProgress) return

        const updatedMeals = state.dailyProgress.meals.map(meal =>
          meal.id === id ? { ...meal, ...updates } : meal
        )
        const consumed = calculateTotalNutrition(updatedMeals)

        set({
          dailyProgress: {
            ...state.dailyProgress,
            meals: updatedMeals,
            consumed,
          }
        })
      },

      deleteMealEntry: (id: string) => {
        const state = get()
        if (!state.dailyProgress) return

        const updatedMeals = state.dailyProgress.meals.filter(meal => meal.id !== id)
        const consumed = calculateTotalNutrition(updatedMeals)

        set({
          dailyProgress: {
            ...state.dailyProgress,
            meals: updatedMeals,
            consumed,
          }
        })
      },

      calculateDailyTotals: () => {
        const state = get()
        if (!state.dailyProgress) return

        const consumed = calculateTotalNutrition(state.dailyProgress.meals)
        set({
          dailyProgress: {
            ...state.dailyProgress,
            consumed,
          }
        })
      },
    }),
    {
      name: 'nutrition-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ dailyProgress: state.dailyProgress }),
    }
  )
)

function calculateTotalNutrition(meals: MealEntry[]): NutritionData {
  return meals.reduce(
    (total, meal) => ({
      calories: total.calories + meal.totalNutrition.calories,
      protein: total.protein + meal.totalNutrition.protein,
      carbs: total.carbs + meal.totalNutrition.carbs,
      fat: total.fat + meal.totalNutrition.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  )
}