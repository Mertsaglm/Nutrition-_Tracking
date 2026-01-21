import { supabase } from './supabase'

export interface SignUpData {
  email: string
  password: string
  name: string
}

export interface SignInData {
  email: string
  password: string
}

export const authService = {
  // Kayıt ol
  async signUp({ email, password, name }: SignUpData) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    })

    if (error) throw error

    // Trigger otomatik profil oluşturacak, ama yine de kontrol edelim
    if (data.user) {
      // Biraz bekle (trigger çalışsın)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Profil var mı kontrol et
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', data.user.id)
        .single()

      // Yoksa manuel oluştur
      if (profileError || !profile) {
        const { error: insertError } = await supabase
          .from('user_profiles')
          .insert({
            id: data.user.id,
            email: data.user.email!,
            name,
            meal_count: 3,
          })

        if (insertError) {
          console.error('Profile creation error:', insertError)
          // Hata olsa bile devam et, onboarding'de düzeltiriz
        }
      }
    }

    return data
  },

  // Giriş yap
  async signIn({ email, password }: SignInData) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    return data
  },

  // Çıkış yap
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  // Mevcut kullanıcıyı al
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },

  // Kullanıcı profilini al
  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error
    return data
  },

  // Kullanıcı profilini güncelle
  async updateUserProfile(userId: string, updates: any) {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return data
  },
}
