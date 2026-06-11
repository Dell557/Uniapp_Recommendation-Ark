export interface User {
  id: string
  phone: string
  nickname: string
  avatar?: string
  courseCount: number
  favoriteCount: number
  couponCount: number
}

export interface Course {
  id: string
  title: string
  teacher: string
  price: number
  originalPrice?: number
  count: number
  cover: string
  badge?: string
  duration?: string
  chapterCount?: number
}

export interface School {
  id: string
  name: string
  logo: string
  location: string
  type: string
  tag?: string
  ranking: string
  favorited: boolean
  description?: string
  majors?: string[]
  scoreLine?: number
}

export interface Coupon {
  id: string
  title: string
  desc: string
  amount: number
  minAmount: number
  expireDate: string
  status: 'available' | 'used' | 'expired'
}

export interface Assessment {
  id: string
  title: string
  desc: string
  icon: string
  bgColor: string
  duration: string
  questions: number
}

export interface Banner {
  id: string
  image: string
  link?: string
}

export interface APIResponse<T = any> {
  code: number
  message: string
  data: T
  success: boolean
}
