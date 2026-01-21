export interface NutritionData {
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
}

export interface Food {
  name: string;
  nutrition: NutritionData;
}

export interface MealEntry {
  id: string;
  mealType: string;
  description: string;
  foods: Array<{
    name: string;
    amount: number;
    unit: string;
    nutrition: NutritionData;
  }>;
  totalNutrition: NutritionData;
  timestamp: Date;
  aiAnalysis?: string;
  suggestions?: string;
}

export interface DailyProgress {
  date: string;
  consumed: NutritionData;
  target: NutritionData;
  meals: MealEntry[];
}

export interface MealSchedule {
  name: string;
  time: string;
  target_calories: number;
}

export interface GeminiAnalysisResult {
  foods: Array<{
    name: string;
    amount: number;
    unit: string;
    nutrition: NutritionData;
  }>;
  totalNutrition: NutritionData;
  analysis: string;
  suggestions: string;
  confidence: number;
}