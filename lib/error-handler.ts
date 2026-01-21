export interface AppError {
  message: string
  code?: string
  details?: any
  timestamp: Date
}

export class ErrorHandler {
  static createError(message: string, code?: string, details?: any): AppError {
    return {
      message,
      code,
      details,
      timestamp: new Date()
    }
  }

  static handleApiError(error: any): AppError {
    if (error instanceof Error) {
      // Gemini API specific errors
      if (error.message.includes('API_KEY')) {
        return this.createError(
          'API anahtarı geçersiz. Lütfen ayarlarınızı kontrol edin.',
          'INVALID_API_KEY',
          error.message
        )
      }
      
      if (error.message.includes('429')) {
        return this.createError(
          'API çağrı limiti aşıldı. Lütfen birkaç saniye bekleyip tekrar deneyin.',
          'RATE_LIMIT',
          error.message
        )
      }
      
      if (error.message.includes('quota')) {
        return this.createError(
          'API kotanız dolmuş. Lütfen Google AI Studio\'dan kotanızı kontrol edin.',
          'QUOTA_EXCEEDED',
          error.message
        )
      }
      
      return this.createError(error.message, 'API_ERROR', error.stack)
    }
    
    return this.createError('Bilinmeyen bir hata oluştu', 'UNKNOWN_ERROR', error)
  }

  static handleStorageError(error: any): AppError {
    return this.createError(
      'Veri kaydedilirken bir hata oluştu. Lütfen tarayıcı ayarlarınızı kontrol edin.',
      'STORAGE_ERROR',
      error
    )
  }

  static handleValidationError(field: string, message: string): AppError {
    return this.createError(
      `${field}: ${message}`,
      'VALIDATION_ERROR',
      { field, message }
    )
  }

  static logError(error: AppError) {
    if (process.env.NODE_ENV === 'development') {
      console.error('App Error:', error)
    }
    
    // Production'da error tracking service'e gönder
    // Örnek: Sentry, LogRocket, vb.
  }

  static showUserFriendlyMessage(error: AppError): string {
    switch (error.code) {
      case 'INVALID_API_KEY':
        return 'API bağlantısı kurulamadı. Lütfen ayarlarınızı kontrol edin.'
      case 'RATE_LIMIT':
        return 'Çok fazla istek gönderildi. Lütfen bekleyip tekrar deneyin.'
      case 'QUOTA_EXCEEDED':
        return 'Günlük kullanım limitiniz doldu. Yarın tekrar deneyin.'
      case 'STORAGE_ERROR':
        return 'Veriler kaydedilemedi. Tarayıcı ayarlarınızı kontrol edin.'
      case 'VALIDATION_ERROR':
        return error.message
      default:
        return 'Bir hata oluştu. Lütfen tekrar deneyin.'
    }
  }
}

// Toast notification hook'u için
export interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
}

export class NotificationService {
  private static listeners: ((toast: ToastMessage) => void)[] = []

  static subscribe(listener: (toast: ToastMessage) => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  static notify(type: ToastMessage['type'], message: string, duration = 5000) {
    const toast: ToastMessage = {
      id: Date.now().toString(),
      type,
      message,
      duration
    }
    
    this.listeners.forEach(listener => listener(toast))
  }

  static success(message: string) {
    this.notify('success', message)
  }

  static error(message: string) {
    this.notify('error', message)
  }

  static warning(message: string) {
    this.notify('warning', message)
  }

  static info(message: string) {
    this.notify('info', message)
  }
}