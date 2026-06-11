import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface UserInfo {
  id: string
  phone: string
  nickname: string
  avatar?: string
  courseCount: number
  favoriteCount: number
  couponCount: number
}

export const userStore = defineStore('user', () => {
  const user = ref<UserInfo | null>(null)
  const token = ref('')

  const login = async (params: { phone: string; password: string }) => {
    try {
      token.value = 'mock-token-' + Date.now()
      user.value = {
        id: '1',
        phone: params.phone,
        nickname: '用户' + params.phone.slice(-4),
        courseCount: 3,
        favoriteCount: 5,
        couponCount: 3
      }
      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  const logout = async () => {
    user.value = null
    token.value = ''
    return true
  }

  const setUserInfo = (info: Partial<UserInfo>) => {
    if (user.value) {
      user.value = { ...user.value, ...info }
    }
  }

  return {
    user,
    token,
    login,
    logout,
    setUserInfo
  }
}, {
  persist: true
})
