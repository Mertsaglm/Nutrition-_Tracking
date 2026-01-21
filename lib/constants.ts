// Uygulama sabitleri
export const APP_CONFIG = {
  name: 'Beslenme Takip Sistemi',
  description: 'AI destekli kişisel beslenme takip uygulaması',
  version: '1.0.0',
  author: 'Nutrition Tracker Team'
} as const

// API konfigürasyonu
export const API_CONFIG = {
  gemini: {
    model: 'gemini-2.5-flash',
    maxRetries: 3,
    timeout: 30000, // 30 saniye
    rateLimit: {
      requestsPerMinute: 60,
      requestsPerHour: 1000
    }
  }
} as const

// UI sabitleri
export const UI_CONFIG = {
  animations: {
    duration: {
      fast: 200,
      normal: 300,
      slow: 500
    },
    easing: 'ease-out'
  },
  breakpoints: {
    mobile: 640,
    tablet: 768,
    desktop: 1024,
    wide: 1280
  },
  storage: {
    maxLogEntries: 20,
    cacheExpiry: 24 * 60 * 60 * 1000 // 24 saat
  }
} as const

// Beslenme sabitleri
export const NUTRITION_CONFIG = {
  defaultTargets: {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0
  },
  macroRatios: {
    protein: { min: 0.15, max: 0.35 }, // %15-35
    carbs: { min: 0.45, max: 0.65 },   // %45-65
    fat: { min: 0.20, max: 0.35 }      // %20-35
  },
  units: {
    weight: ['g', 'kg', 'oz', 'lb'],
    volume: ['ml', 'l', 'cup', 'tbsp', 'tsp'],
    count: ['adet', 'dilim', 'porsiyon', 'bardak', 'kaşık']
  },
  mealTypes: {
    'Kahvaltı': { name: 'Kahvaltı', time: '08:00', targetRatio: 0.30 },
    'Kuşluk': { name: 'Kuşluk', time: '10:30', targetRatio: 0.15 },
    'Öğle': { name: 'Öğle', time: '13:00', targetRatio: 0.30 },
    'İkindi': { name: 'İkindi', time: '16:00', targetRatio: 0.10 },
    'Akşam': { name: 'Akşam', time: '19:00', targetRatio: 0.15 },
    'Gece': { name: 'Gece', time: '21:30', targetRatio: 0.10 }
  }
} as const

// Validasyon kuralları
export const VALIDATION_RULES = {
  meal: {
    description: {
      minLength: 5,
      maxLength: 500
    },
    calories: {
      min: 0,
      max: 5000
    }
  },
  nutrition: {
    protein: { min: 0, max: 500 },
    carbs: { min: 0, max: 1000 },
    fat: { min: 0, max: 300 },
    calories: { min: 0, max: 5000 }
  }
} as const

// Hata mesajları
export const ERROR_MESSAGES = {
  api: {
    invalidKey: 'API anahtarı geçersiz',
    rateLimit: 'Çok fazla istek gönderildi',
    quotaExceeded: 'Günlük kullanım limiti aşıldı',
    networkError: 'İnternet bağlantısı sorunu',
    timeout: 'İstek zaman aşımına uğradı'
  },
  validation: {
    required: 'Bu alan zorunludur',
    minLength: 'Çok kısa',
    maxLength: 'Çok uzun',
    invalidFormat: 'Geçersiz format',
    outOfRange: 'Değer aralık dışında'
  },
  storage: {
    saveFailed: 'Kaydetme başarısız',
    loadFailed: 'Yükleme başarısız',
    quotaExceeded: 'Depolama alanı dolu'
  }
} as const

// Başarı mesajları
export const SUCCESS_MESSAGES = {
  meal: {
    added: 'Öğün başarıyla eklendi',
    updated: 'Öğün güncellendi',
    deleted: 'Öğün silindi'
  },
  data: {
    saved: 'Veriler kaydedildi',
    exported: 'Veriler dışa aktarıldı',
    imported: 'Veriler içe aktarıldı'
  }
} as const

// Tema renkleri (Tailwind ile uyumlu)
export const THEME_COLORS = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e'
  },
  accent: {
    50: '#fef7ee',
    100: '#fdedd3',
    200: '#fbd7a5',
    300: '#f8bb6d',
    400: '#f59332',
    500: '#f3750a',
    600: '#e45a00',
    700: '#bd4302',
    800: '#973508',
    900: '#7c2d0a'
  },
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d'
  }
} as const

// Yerelleştirme
export const LOCALE_CONFIG = {
  default: 'tr-TR',
  supported: ['tr-TR', 'en-US'],
  dateFormat: 'dd MMMM yyyy, EEEE',
  timeFormat: 'HH:mm',
  numberFormat: {
    decimal: ',',
    thousands: '.'
  }
} as const