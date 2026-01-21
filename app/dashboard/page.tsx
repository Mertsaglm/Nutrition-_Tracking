'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { useNutritionStore } from '@/lib/nutrition-store'
import { authService } from '@/lib/auth'
import { databaseService } from '@/lib/database-service'
import DashboardHeader from '@/components/DashboardHeader'
import NutritionOverview from '@/components/NutritionOverview'
import MealLogger from '@/components/MealLogger'
import MealHistory from '@/components/MealHistory'
import DebugPanel from '@/components/DebugPanel'

export default function DashboardPage() {
  const router = useRouter()
  const { dailyProgress, initializeDay, setDailyTargets } = useNutritionStore()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const today = new Date()
  const todayString = format(today, 'yyyy-MM-dd')

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Checking auth...')
        const currentUser = await authService.getCurrentUser()
        console.log('Current user:', currentUser)
        
        if (!currentUser) {
          console.log('No user, redirecting to login')
          router.push('/auth/login')
          return
        }
        
        const profile = await authService.getUserProfile(currentUser.id)
        console.log('User profile:', profile)
        setUser(profile)
        
        // Eğer profil tamamlanmamışsa onboarding'e yönlendir
        if (!profile.age || !profile.height_cm || !profile.current_weight_kg) {
          console.log('Profile incomplete, redirecting to onboarding')
          router.push('/onboarding')
          return
        }

        // Aktif beslenme planını al
        const nutritionPlan = await databaseService.getActiveNutritionPlan(currentUser.id)
        console.log('Nutrition plan:', nutritionPlan)
        
        if (nutritionPlan) {
          // Store'daki hedefleri güncelle
          setDailyTargets({
            calories: nutritionPlan.daily_calories,
            protein: nutritionPlan.protein_g,
            carbs: nutritionPlan.carbs_g,
            fat: nutritionPlan.fat_g
          })
          
          // Günü initialize et (hedefler set edildikten sonra)
          initializeDay(todayString)
        }
        
        console.log('Auth check complete, user authenticated')
        setLoading(false)
      } catch (error) {
        console.error('Auth error:', error)
        router.push('/auth/login')
      }
    }

    checkAuth()
  }, [router, setDailyTargets, initializeDay, todayString])

  useEffect(() => {
    if (!loading) {
      initializeDay(todayString)
    }
  }, [todayString, initializeDay, loading])

  const handleSignOut = async () => {
    try {
      await authService.signOut()
      router.push('/')
      router.refresh()
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  if (loading || !dailyProgress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-green-200 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Merhaba, {user?.name || 'Kullanıcı'}! 👋
            </h1>
            <p className="text-gray-600">Bugünkü ilerlemeniz</p>
          </div>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            Çıkış Yap
          </button>
        </div>

        {/* Dashboard Header */}
        <DashboardHeader
          date={today}
          totalCalories={dailyProgress.consumed.calories}
          targetCalories={dailyProgress.target.calories}
        />

        {/* Nutrition Overview */}
        <NutritionOverview
          consumed={dailyProgress.consumed}
          target={dailyProgress.target}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol Taraf - Meal Logger */}
          <div className="lg:col-span-1">
            <MealLogger userMealCount={user?.meal_count || 3} />
          </div>

          {/* Sağ Taraf - Meal History */}
          <div className="lg:col-span-2">
            <MealHistory />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-500 text-sm">
          <p>Beslenme Takip Sistemi • AI destekli besin analizi</p>
        </div>
      </div>

      {/* Debug Panel */}
      {process.env.NODE_ENV === 'development' && <DebugPanel />}
    </div>
  )
}
