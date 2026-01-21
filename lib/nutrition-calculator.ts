/**
 * Dinamik Beslenme Hesaplama Servisi
 * Kullanıcının fiziksel özellikleri ve hedeflerine göre kalori ve makro besin hesaplar
 */

export interface UserPhysicalData {
  age: number
  gender: 'male' | 'female' | 'other'
  height_cm: number
  current_weight_kg: number
  target_weight_kg: number
  activity_level: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
  goal: 'lose_weight' | 'gain_weight' | 'build_muscle' | 'maintain'
  target_weeks?: number // Hedefe ulaşmak için kaç hafta
}

export interface NutritionTargets {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber?: number
  water_liters?: number
}

export interface MealPlan {
  meal_count: number
  meals: Array<{
    name: string
    time: string
    calories: number
    protein: number
    carbs: number
    fat: number
  }>
}

class NutritionCalculator {
  /**
   * BMR (Basal Metabolic Rate) hesaplama - Mifflin-St Jeor formülü
   * En güncel ve doğru formül
   */
  calculateBMR(data: UserPhysicalData): number {
    const { gender, weight_kg, height_cm, age } = {
      gender: data.gender,
      weight_kg: data.current_weight_kg,
      height_cm: data.height_cm,
      age: data.age
    }

    if (gender === 'male') {
      return 10 * weight_kg + 6.25 * height_cm - 5 * age + 5
    } else if (gender === 'female') {
      return 10 * weight_kg + 6.25 * height_cm - 5 * age - 161
    } else {
      // Diğer için ortalama
      return 10 * weight_kg + 6.25 * height_cm - 5 * age - 78
    }
  }

  /**
   * TDEE (Total Daily Energy Expenditure) hesaplama
   * BMR * Aktivite çarpanı
   */
  calculateTDEE(data: UserPhysicalData): number {
    const bmr = this.calculateBMR(data)
    const activityMultipliers = {
      sedentary: 1.2,      // Hareketsiz (masa başı iş)
      light: 1.375,        // Hafif aktif (haftada 1-3 gün)
      moderate: 1.55,      // Orta (haftada 3-5 gün)
      active: 1.725,       // Aktif (haftada 6-7 gün)
      very_active: 1.9     // Çok aktif (günde 2 kez veya fiziksel iş)
    }

    return Math.round(bmr * activityMultipliers[data.activity_level])
  }

  /**
   * Hedef kalori hesaplama
   * TDEE'ye göre hedef bazlı ayarlama
   */
  calculateTargetCalories(data: UserPhysicalData): number {
    const tdee = this.calculateTDEE(data)
    const weightDiff = data.target_weight_kg - data.current_weight_kg
    const targetWeeks = data.target_weeks || 12 // Varsayılan 12 hafta

    // Sağlıklı kilo değişim hızı (kg/hafta)
    const healthyRates = {
      lose_weight: -0.5,      // Haftada 0.5 kg vermek
      gain_weight: 0.5,       // Haftada 0.5 kg almak
      build_muscle: 0.3,      // Haftada 0.3 kg kas yapmak
      maintain: 0             // Korumak
    }

    let targetRate = healthyRates[data.goal]

    // Kullanıcının hedefi ile uyumlu mu kontrol et
    if (data.goal === 'lose_weight' && weightDiff > 0) {
      // Kilo vermek istiyor ama hedef kilo daha yüksek
      targetRate = healthyRates.gain_weight
    } else if (data.goal === 'gain_weight' && weightDiff < 0) {
      // Kilo almak istiyor ama hedef kilo daha düşük
      targetRate = healthyRates.lose_weight
    }

    // 1 kg yağ = yaklaşık 7700 kalori
    // Günlük kalori farkı = (hedef kg * 7700) / (hedef gün sayısı)
    const dailyCalorieDiff = (targetRate * 7700) / 7

    let targetCalories = tdee + dailyCalorieDiff

    // Güvenlik sınırları
    const minCalories = data.gender === 'male' ? 1500 : 1200
    const maxCalories = tdee * 1.3 // TDEE'nin %30 fazlası

    targetCalories = Math.max(minCalories, Math.min(maxCalories, targetCalories))

    return Math.round(targetCalories)
  }

  /**
   * Makro besin dağılımı hesaplama
   * Hedefe göre optimize edilmiş protein, karb, yağ oranları
   */
  calculateMacros(data: UserPhysicalData, targetCalories: number): NutritionTargets {
    let proteinRatio = 0.25  // %25
    let carbsRatio = 0.45    // %45
    let fatRatio = 0.30      // %30

    // Hedefe göre makro ayarlaması
    switch (data.goal) {
      case 'lose_weight':
        // Yüksek protein, düşük karb
        proteinRatio = 0.35
        carbsRatio = 0.35
        fatRatio = 0.30
        break

      case 'gain_weight':
        // Dengeli, yüksek karb
        proteinRatio = 0.25
        carbsRatio = 0.50
        fatRatio = 0.25
        break

      case 'build_muscle':
        // Çok yüksek protein, orta karb
        proteinRatio = 0.30
        carbsRatio = 0.45
        fatRatio = 0.25
        break

      case 'maintain':
        // Dengeli
        proteinRatio = 0.25
        carbsRatio = 0.45
        fatRatio = 0.30
        break
    }

    // Gram hesaplama
    // Protein: 1g = 4 kcal
    // Karb: 1g = 4 kcal
    // Yağ: 1g = 9 kcal
    const protein = Math.round((targetCalories * proteinRatio) / 4)
    const carbs = Math.round((targetCalories * carbsRatio) / 4)
    const fat = Math.round((targetCalories * fatRatio) / 9)

    // Minimum protein: vücut ağırlığı başına 1.6-2.2g (kas yapımı için)
    const minProtein = data.goal === 'build_muscle' 
      ? data.current_weight_kg * 2.0
      : data.current_weight_kg * 1.6

    const finalProtein = Math.max(protein, Math.round(minProtein))

    // Su ihtiyacı: vücut ağırlığı başına 35-40ml
    const waterLiters = Math.round((data.current_weight_kg * 35) / 1000 * 10) / 10

    return {
      calories: targetCalories,
      protein: finalProtein,
      carbs,
      fat,
      fiber: Math.round(targetCalories / 1000 * 14), // 1000 kcal başına 14g
      water_liters: waterLiters
    }
  }

  /**
   * Öğün sayısına göre öğün planı oluşturma
   */
  createMealPlan(
    mealCount: number,
    targets: NutritionTargets,
    goal: UserPhysicalData['goal']
  ): MealPlan {
    const meals: MealPlan['meals'] = []

    // Tüm olası öğünler
    const allMeals = [
      { name: 'Kahvaltı', time: '08:00', priority: 1 },
      { name: 'Kuşluk', time: '10:30', priority: 4 },
      { name: 'Öğle', time: '13:00', priority: 2 },
      { name: 'İkindi', time: '16:00', priority: 5 },
      { name: 'Akşam', time: '19:00', priority: 3 },
      { name: 'Gece', time: '21:30', priority: 6 }
    ]

    // Öğün sayısına göre hangi öğünleri seçeceğiz
    let selectedMealIndices: number[] = []
    let mealDistribution: number[] = []

    if (mealCount === 3) {
      // Kahvaltı, Öğle, Akşam (ana öğünler)
      selectedMealIndices = [0, 2, 4]
      mealDistribution = goal === 'lose_weight' 
        ? [0.35, 0.40, 0.25]  // Akşam hafif
        : [0.30, 0.40, 0.30]  // Dengeli
    } else if (mealCount === 4) {
      // Kahvaltı, Öğle, İkindi, Akşam
      selectedMealIndices = [0, 2, 3, 4]
      mealDistribution = goal === 'lose_weight'
        ? [0.30, 0.35, 0.15, 0.20]  // Akşam hafif
        : [0.25, 0.35, 0.15, 0.25]  // Dengeli
    } else if (mealCount === 5) {
      // Kahvaltı, Kuşluk, Öğle, İkindi, Akşam
      selectedMealIndices = [0, 1, 2, 3, 4]
      mealDistribution = goal === 'build_muscle'
        ? [0.25, 0.15, 0.25, 0.15, 0.20]  // Sık öğün
        : [0.25, 0.10, 0.30, 0.15, 0.20]
    } else if (mealCount === 6) {
      // Tüm öğünler
      selectedMealIndices = [0, 1, 2, 3, 4, 5]
      mealDistribution = [0.20, 0.15, 0.25, 0.10, 0.20, 0.10]
    } else {
      // Varsayılan: 3 öğün
      selectedMealIndices = [0, 2, 4]
      mealDistribution = [0.30, 0.40, 0.30]
    }

    // Seçilen öğünleri oluştur
    for (let i = 0; i < selectedMealIndices.length; i++) {
      const mealIndex = selectedMealIndices[i]
      const ratio = mealDistribution[i]
      meals.push({
        name: allMeals[mealIndex].name,
        time: allMeals[mealIndex].time,
        calories: Math.round(targets.calories * ratio),
        protein: Math.round(targets.protein * ratio),
        carbs: Math.round(targets.carbs * ratio),
        fat: Math.round(targets.fat * ratio)
      })
    }

    return { meal_count: mealCount, meals }
  }

  /**
   * Önerilen öğün sayısı hesaplama
   * Hedefe göre optimal öğün sayısı
   */
  recommendMealCount(data: UserPhysicalData): number {
    switch (data.goal) {
      case 'lose_weight':
        return 3 // Ana öğünler: Kahvaltı, Öğle, Akşam (daha az sıklıkta, daha doyurucu)
      
      case 'gain_weight':
        return 5 // Sık öğün: Kahvaltı, Kuşluk, Öğle, İkindi, Akşam (metabolizmayı aktif tutar)
      
      case 'build_muscle':
        return 5 // Sık öğün: Protein sentezi için düzenli besin alımı
      
      case 'maintain':
        return 4 // Dengeli: Kahvaltı, Öğle, İkindi, Akşam
      
      default:
        return 3
    }
  }

  /**
   * Hedef süre önerisi (hafta)
   * Sağlıklı ve gerçekçi süre hesaplama
   */
  recommendTargetWeeks(data: UserPhysicalData): number {
    const weightDiff = Math.abs(data.target_weight_kg - data.current_weight_kg)
    
    // Sağlıklı kilo değişim hızı: haftada 0.5 kg
    const healthyWeeklyChange = 0.5
    const weeks = Math.ceil(weightDiff / healthyWeeklyChange)
    
    // Minimum 4 hafta, maksimum 52 hafta (1 yıl)
    return Math.max(4, Math.min(52, weeks))
  }

  /**
   * Tam beslenme planı oluşturma
   * Tüm hesaplamaları bir arada yapan ana fonksiyon
   */
  createFullNutritionPlan(data: UserPhysicalData, mealCount?: number) {
    // Hedef kalori hesapla
    const targetCalories = this.calculateTargetCalories(data)
    
    // Makro besinleri hesapla
    const targets = this.calculateMacros(data, targetCalories)
    
    // Öğün sayısı belirle
    const finalMealCount = mealCount || this.recommendMealCount(data)
    
    // Öğün planı oluştur
    const mealPlan = this.createMealPlan(finalMealCount, targets, data.goal)
    
    // Önerilen süre
    const recommendedWeeks = this.recommendTargetWeeks(data)
    
    return {
      targets,
      mealPlan,
      bmr: this.calculateBMR(data),
      tdee: this.calculateTDEE(data),
      recommendedWeeks,
      weeklyWeightChange: (data.target_weight_kg - data.current_weight_kg) / recommendedWeeks
    }
  }
}

export const nutritionCalculator = new NutritionCalculator()
