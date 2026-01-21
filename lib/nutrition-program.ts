export interface NutritionProgramMeal {
  time: string
  name: string
  calories: number
  items: Array<{
    food: string
    amount: string
    calories: number
    protein: number
    carbs: number
    fat: number
  }>
  totals: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
}

export interface NutritionProgram {
  title: string
  description: string
  dailyTargets: {
    calories: number
    protein: number
    carbs: number
    fat: number
  }
  meals: NutritionProgramMeal[]
  rules: string[]
  expectations: string[]
  extraCalories?: string[]
}

class NutritionProgramService {
  private program: NutritionProgram | null = null
  private lastModified: string = ''

  private async fetchProgramFromFile(): Promise<string> {
    try {
      const response = await fetch('/api/nutrition-program')
      const data = await response.json()
      
      if (data.success) {
        this.lastModified = data.lastModified
        return data.content
      } else {
        throw new Error('API hatası')
      }
    } catch (error) {
      console.warn('Dosya API\'den okunamadı, static içerik kullanılıyor:', error)
      return this.getStaticContent()
    }
  }

  private getStaticContent(): string {
    return `═══════════════════════════════════════════════════════════════
           3 HAFTALIK BESLENME PROGRAMI
           (Mezomorf - 184cm/78kg - Hızlı Metabolizma)
═══════════════════════════════════════════════════════════════

GÜNLÜK HEDEF: ~3,400-3,500 kcal | 200g Protein | 130g Yağ | 360g Karb

───────────────────────────────────────────────────────────────
08:30 - KAHVALTI (~1,087 kcal)
───────────────────────────────────────────────────────────────
• 3 tam yumurta (180g) = 284 kcal | 22g protein | 20g yağ | 2g karb
• 100g yulaf (çiğ) = 402 kcal | 14g protein | 7g yağ | 66g karb
• 150ml tam yağlı süt = 92 kcal | 5g protein | 5g yağ | 7g karb
• 1 küçük muz (120g) = 108 kcal | 1g protein | 0g yağ | 25g karb
• 1 tatlı kaşığı bal (10g) = 32 kcal | 0g protein | 0g yağ | 8g karb
• 1 dilim ekmek (30g) = 74 kcal | 2g protein | 0g yağ | 16g karb

───────────────────────────────────────────────────────────────
11:30 - ARA ÖĞÜN / SHAKE (~1,050 kcal)
───────────────────────────────────────────────────────────────
• 1 muz (120g) = 108 kcal | 1g protein | 0g yağ | 25g karb
• 1 yemek kaşığı fıstık ezmesi (20g) = 116 kcal | 5g protein | 10g yağ | 4g karb
• 300ml tam yağlı süt = 183 kcal | 10g protein | 10g yağ | 14g karb
• 50g yulaf = 201 kcal | 7g protein | 4g yağ | 33g karb
• 1 tatlı kaşığı zeytinyağı (10g) = 88 kcal | 0g protein | 10g yağ | 0g karb

───────────────────────────────────────────────────────────────
13:30 - ÖĞLE (~620 kcal)
───────────────────────────────────────────────────────────────
• 200g tavuk göğsü = 208 kcal | 46g protein | 2g yağ | 0g karb
• 150g pişmiş pirinç (50g çiğ) = 182 kcal | 3g protein | 0g yağ | 40g karb
• Zeytinyağlı salata (1 yemek kaşığı yağ + sebze) = 110 kcal | 2g protein | 10g yağ | 8g karb

───────────────────────────────────────────────────────────────
16:30 - ANTRENMAN ÖNCESİ (~420 kcal)
───────────────────────────────────────────────────────────────
• 2 dilim tam buğday ekmeği (60g) = 148 kcal | 4g protein | 1g yağ | 32g karb
• 1.5 yemek kaşığı fıstık ezmesi (30g) = 175 kcal | 8g protein | 15g yağ | 6g karb

───────────────────────────────────────────────────────────────
18:30 - ANTRENMAN SONRASI (~650 kcal)
───────────────────────────────────────────────────────────────
• 180g tavuk göğsü = 187 kcal | 41g protein | 2g yağ | 0g karb
• 150g pişmiş makarna (50g çiğ) = 195 kcal | 4g protein | 3g yağ | 38g karb
• 1 tatlı kaşığı zeytinyağı (10g) = 88 kcal | 0g protein | 10g yağ | 0g karb

───────────────────────────────────────────────────────────────
21:30 - AKŞAM (~375 kcal)
───────────────────────────────────────────────────────────────
• 150g lor peyniri = 108 kcal | 19g protein | 2g yağ | 4g karb
• 30g kuruyemiş (badem/ceviz karışık) = 185 kcal | 5g protein | 17g yağ | 5g karb
• 1 elma (150g) = 87 kcal | 0g protein | 1g yağ | 22g karb

═══════════════════════════════════════════════════════════════
                    KRİTİK KURALLAR
═══════════════════════════════════════════════════════════════

✓ Günde 4 litre su
✓ 8 saat uyku
✓ Öğün ATLAMA - hızlı metabolizma için her öğün şart
✓ Zeytinyağı eklemelerini asla atlama (sağlıklı yağ için)
✓ Antrenman sonrası makarnayı tercih et (hızlı karbonhidrat)

═══════════════════════════════════════════════════════════════
                    3 HAFTA SONUNDA BEKLENTİ
═══════════════════════════════════════════════════════════════

• Gerçekçi hedef: 1-1.5 kg kas kazanımı
• Kas dolgunluğu ve form keskinleşmesi
• Enerji seviyesinde artış

═══════════════════════════════════════════════════════════════
                    EKSTRA KALORİ GEREKİRSE
═══════════════════════════════════════════════════════════════

→ Shake'e +1 yemek kaşığı fıstık ezmesi ekle (+116 kcal)
→ Öğle/akşam pirince +25g çiğ ekle (+91 kcal)
→ Gece ekstra 1 bardak süt + 1 muz (+200 kcal)`
  }

  private async parseNutritionProgram(): Promise<NutritionProgram> {
    try {
      const content = await this.fetchProgramFromFile()
      
      // Basit parsing - gerçek implementasyonda daha sofistike olabilir
      const lines = content.split('\n').filter(line => line.trim())
      
      // Başlık ve açıklama
      const title = lines.find(line => line.includes('HAFTALIK BESLENME'))?.trim() || '3 Haftalık Beslenme Programı'
      const description = lines.find(line => line.includes('Mezomorf'))?.replace(/[()]/g, '').trim() || 'Mezomorf vücut tipi için beslenme programı'
      
      // Günlük hedefler
      const targetLine = lines.find(line => line.includes('GÜNLÜK HEDEF'))
      const dailyTargets = this.parseTargets(targetLine || '')
      
      // Öğünleri parse et
      const meals = this.parseMeals(content)
      
      // Kurallar
      const rules = this.parseRules(content)
      
      // Beklentiler
      const expectations = this.parseExpectations(content)
      
      // Ekstra kalori önerileri
      const extraCalories = this.parseExtraCalories(content)

      return {
        title,
        description,
        dailyTargets,
        meals,
        rules,
        expectations,
        extraCalories
      }
    } catch (error) {
      console.error('Beslenme programı parse edilemedi:', error)
      return this.getDefaultProgram()
    }
  }

  private parseTargets(targetLine: string) {
    const defaults = { calories: 3400, protein: 200, carbs: 360, fat: 130 }
    
    if (!targetLine) return defaults
    
    const caloriesMatch = targetLine.match(/(\d+,?\d*)\s*kcal/)
    const proteinMatch = targetLine.match(/(\d+)g?\s*Protein/)
    const carbsMatch = targetLine.match(/(\d+)g?\s*Karb/)
    const fatMatch = targetLine.match(/(\d+)g?\s*Yağ/)
    
    return {
      calories: caloriesMatch ? parseInt(caloriesMatch[1].replace(',', '')) : defaults.calories,
      protein: proteinMatch ? parseInt(proteinMatch[1]) : defaults.protein,
      carbs: carbsMatch ? parseInt(carbsMatch[1]) : defaults.carbs,
      fat: fatMatch ? parseInt(fatMatch[1]) : defaults.fat
    }
  }

  private parseMeals(content: string): NutritionProgramMeal[] {
    const meals: NutritionProgramMeal[] = []
    const mealSections = content.split('───────────────────────────────────────────────────────────────')
    
    for (const section of mealSections) {
      if (section.includes('~') && section.includes('kcal')) {
        const meal = this.parseMealSection(section)
        if (meal) meals.push(meal)
      }
    }
    
    return meals
  }

  private parseMealSection(section: string): NutritionProgramMeal | null {
    const lines = section.split('\n').filter(line => line.trim())
    
    // Öğün başlığını bul
    const headerLine = lines.find(line => line.includes('~') && line.includes('kcal'))
    if (!headerLine) return null
    
    const timeMatch = headerLine.match(/(\d{2}:\d{2})/)
    const nameMatch = headerLine.match(/- ([A-ZÇĞIİÖŞÜ\s]+) \(/)
    const caloriesMatch = headerLine.match(/~(\d+,?\d*)\s*kcal/)
    
    const time = timeMatch ? timeMatch[1] : '00:00'
    const name = nameMatch ? nameMatch[1].trim() : 'Öğün'
    const calories = caloriesMatch ? parseInt(caloriesMatch[1].replace(',', '')) : 0
    
    // Öğün öğelerini parse et
    const items = this.parseMealItems(section)
    
    // Toplamları hesapla
    const totals = items.reduce((sum, item) => ({
      calories: sum.calories + item.calories,
      protein: sum.protein + item.protein,
      carbs: sum.carbs + item.carbs,
      fat: sum.fat + item.fat
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 })
    
    return { time, name, calories, items, totals }
  }

  private parseMealItems(section: string) {
    const items = []
    const lines = section.split('\n')
    
    for (const line of lines) {
      if (line.includes('=') && line.includes('kcal')) {
        const item = this.parseMealItem(line)
        if (item) items.push(item)
      }
    }
    
    return items
  }

  private parseMealItem(line: string) {
    // Örnek: "• 3 tam yumurta (180g) = 284 kcal | 22g protein | 20g yağ | 2g karb"
    const parts = line.split('=')
    if (parts.length < 2) return null
    
    const foodPart = parts[0].replace('•', '').trim()
    const nutritionPart = parts[1]
    
    const caloriesMatch = nutritionPart.match(/(\d+)\s*kcal/)
    const proteinMatch = nutritionPart.match(/(\d+)g?\s*protein/)
    const carbsMatch = nutritionPart.match(/(\d+)g?\s*karb/)
    const fatMatch = nutritionPart.match(/(\d+)g?\s*yağ/)
    
    return {
      food: foodPart,
      amount: this.extractAmount(foodPart),
      calories: caloriesMatch ? parseInt(caloriesMatch[1]) : 0,
      protein: proteinMatch ? parseInt(proteinMatch[1]) : 0,
      carbs: carbsMatch ? parseInt(carbsMatch[1]) : 0,
      fat: fatMatch ? parseInt(fatMatch[1]) : 0
    }
  }

  private extractAmount(foodText: string): string {
    const amountMatch = foodText.match(/(\d+g?|\d+\s*ml|\d+\s*adet|\d+\s*dilim|\d+\s*kaşık|\d+\s*bardak)/)
    return amountMatch ? amountMatch[1] : '1 porsiyon'
  }

  private parseRules(content: string): string[] {
    const rulesSection = content.split('KRİTİK KURALLAR')[1]?.split('═══════════════════════════════════════════════════════════════')[0]
    
    if (!rulesSection) return []
    
    return rulesSection
      .split('\n')
      .filter(line => line.includes('✓'))
      .map(line => line.replace('✓', '').trim())
      .filter(rule => rule.length > 0)
  }

  private parseExpectations(content: string): string[] {
    const expectationsSection = content.split('3 HAFTA SONUNDA BEKLENTİ')[1]?.split('═══════════════════════════════════════════════════════════════')[0]
    
    if (!expectationsSection) return []
    
    return expectationsSection
      .split('\n')
      .filter(line => line.includes('•'))
      .map(line => line.replace('•', '').trim())
      .filter(expectation => expectation.length > 0)
  }

  private parseExtraCalories(content: string): string[] {
    const extraSection = content.split('EKSTRA KALORİ GEREKİRSE')[1]?.split('═══════════════════════════════════════════════════════════════')[0]
    
    if (!extraSection) return []
    
    return extraSection
      .split('\n')
      .filter(line => line.includes('→'))
      .map(line => line.replace('→', '').trim())
      .filter(extra => extra.length > 0)
  }

  private getDefaultProgram(): NutritionProgram {
    return {
      title: '3 Haftalık Beslenme Programı',
      description: 'Mezomorf vücut tipi için beslenme programı',
      dailyTargets: {
        calories: 3400,
        protein: 200,
        carbs: 360,
        fat: 130
      },
      meals: [],
      rules: [
        'Günde 4 litre su',
        '8 saat uyku',
        'Öğün atlama',
        'Zeytinyağı eklemelerini asla atlama'
      ],
      expectations: [
        'Gerçekçi hedef: 1-1.5 kg kas kazanımı',
        'Kas dolgunluğu ve form keskinleşmesi',
        'Enerji seviyesinde artış'
      ]
    }
  }

  public async getNutritionProgram(): Promise<NutritionProgram> {
    if (!this.program) {
      this.program = await this.parseNutritionProgram()
    }
    return this.program
  }

  public async getMealSchedule() {
    const program = await this.getNutritionProgram()
    return program.meals.map(meal => ({
      name: meal.name,
      time: meal.time,
      target_calories: meal.calories
    }))
  }

  public async getDailyTargets() {
    const program = await this.getNutritionProgram()
    return program.dailyTargets
  }
}

export const nutritionProgramService = new NutritionProgramService()