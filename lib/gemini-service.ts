import { GoogleGenerativeAI } from '@google/generative-ai'
import { GeminiAnalysisResult } from './types'
import { ErrorHandler } from './error-handler'
import nutritionData from '../comprehensive-nutrition-database.json'

class GeminiService {
  private genAI: GoogleGenerativeAI | null = null
  private model: any = null

  constructor() {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY
    console.log('Gemini API Key kontrol:', apiKey ? `Mevcut (${apiKey.substring(0, 10)}...)` : 'YOK!')
    
    if (apiKey) {
      try {
        this.genAI = new GoogleGenerativeAI(apiKey)
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' }) // Daha stabil model
        console.log('Gemini model başarıyla oluşturuldu')
      } catch (error) {
        console.error('Gemini model oluşturma hatası:', error)
      }
    }
  }

  // Test fonksiyonu
  async testConnection(): Promise<boolean> {
    if (!this.model) {
      console.error('Model mevcut değil')
      return false
    }

    try {
      console.log('Gemini bağlantı testi başlatılıyor...')
      const result = await this.model.generateContent('Merhaba, test mesajı')
      const response = await result.response
      const text = response.text()
      console.log('Test başarılı, yanıt:', text.substring(0, 100))
      return true
    } catch (error) {
      console.error('Bağlantı testi başarısız:', error)
      return false
    }
  }

  async analyzeMealDescription(
    description: string,
    mealType: string,
    targetCalories: number
  ): Promise<GeminiAnalysisResult> {
    if (!this.model) {
      console.error('Gemini model bulunamadı. API Key:', process.env.NEXT_PUBLIC_GEMINI_API_KEY ? 'Mevcut' : 'Yok')
      throw new Error('Gemini API anahtarı bulunamadı. Lütfen NEXT_PUBLIC_GEMINI_API_KEY ortam değişkenini ayarlayın.')
    }

    const prompt = this.createAnalysisPrompt(description, mealType, targetCalories)
    console.log('Gemini\'ye gönderilen prompt uzunluğu:', prompt.length)
    
    try {
      console.log('Gemini API çağrısı başlatılıyor...')
      const result = await this.model.generateContent(prompt)
      console.log('Gemini API yanıtı alındı')
      
      const response = await result.response
      const text = response.text()
      console.log('Gemini yanıt metni uzunluğu:', text.length)
      console.log('Gemini yanıtı:', text.substring(0, 500) + '...')
      
      return this.parseGeminiResponse(text)
    } catch (error) {
      const appError = ErrorHandler.handleApiError(error)
      ErrorHandler.logError(appError)
      throw new Error(ErrorHandler.showUserFriendlyMessage(appError))
    }
  }

  private createAnalysisPrompt(description: string, mealType: string, targetCalories: number): string {
    // Dinamik besin veritabanından en sık kullanılan besinler
    const commonFoods = nutritionData.foods || {}
    
    return `Sen bir beslenme uzmanısın. Kullanıcının yemek açıklamasını analiz et.

BESIN VERİTABANI (100g başına):
${JSON.stringify(commonFoods, null, 2)}

KULLANICI:
Öğün: ${mealType}
Hedef: ${targetCalories} kcal
Açıklama: "${description}"

GÖREV: Yiyecekleri tespit et, miktarları hesapla, toplam besin değerlerini bul.

ÇIKTI (sadece JSON):
{
  "foods": [{"name": "yiyecek", "amount": 100, "unit": "g", "nutrition": {"calories": 0, "protein": 0, "carbs": 0, "fat": 0}}],
  "totalNutrition": {"calories": 0, "protein": 0, "carbs": 0, "fat": 0},
  "analysis": "Kısa analiz",
  "suggestions": "Kısa öneri",
  "confidence": 80
}`
  }

  private parseGeminiResponse(text: string): GeminiAnalysisResult {
    try {
      // JSON'u temizle ve parse et
      const cleanText = text.replace(/```json\n?|\n?```/g, '').trim()
      const parsed = JSON.parse(cleanText)
      
      // Veri doğrulama
      if (!parsed.foods || !parsed.totalNutrition) {
        throw new Error('Geçersiz yanıt formatı')
      }

      return {
        foods: parsed.foods || [],
        totalNutrition: parsed.totalNutrition || { calories: 0, protein: 0, carbs: 0, fat: 0 },
        analysis: parsed.analysis || 'Analiz yapılamadı',
        suggestions: parsed.suggestions || 'Öneri bulunamadı',
        confidence: parsed.confidence || 50
      }
    } catch (error) {
      console.error('Gemini yanıtı parse edilemedi:', error)
      
      // Fallback: Basit analiz
      return this.createFallbackAnalysis()
    }
  }

  private createFallbackAnalysis(): GeminiAnalysisResult {
    return {
      foods: [],
      totalNutrition: { calories: 0, protein: 0, carbs: 0, fat: 0 },
      analysis: 'Otomatik analiz yapılamadı. Lütfen yiyecekleri manuel olarak girin.',
      suggestions: 'Daha detaylı açıklama yaparak tekrar deneyin.',
      confidence: 0
    }
  }
}

export const geminiService = new GeminiService()