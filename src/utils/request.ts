import type { UniApp } from '@dcloudio/types'

interface RequestOptions {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: Record<string, any>
  header?: Record<string, string>
  timeout?: number
}

interface RequestResult<T = any> {
  code: number
  message: string
  data: T
  success: boolean
}

const baseURL = process.env.NODE_ENV === 'production' 
  ? 'https://api.example.com' 
  : 'https://api.example.com'

const request = <T = any>(options: RequestOptions): Promise<RequestResult<T>> => {
  return new Promise((resolve, reject) => {
    const defaultHeader: Record<string, string> = {
      'Content-Type': 'application/json'
    }

    uni.request({
      url: baseURL + options.url,
      method: options.method || 'GET',
      data: options.data,
      header: { ...defaultHeader, ...options.header },
      timeout: options.timeout || 30000,
      success: (res: UniApp.RequestSuccessCallbackResult) => {
        const result = res.data as RequestResult<T>
        
        if (result.code === 200) {
          resolve(result)
        } else {
          reject(new Error(result.message || '请求失败'))
        }
      },
      fail: (err) => {
        reject(new Error(err.errMsg || '网络请求失败'))
      }
    })
  })
}

const get = <T = any>(url: string, params?: Record<string, any>): Promise<RequestResult<T>> => {
  return request<T>({
    url,
    method: 'GET',
    data: params
  })
}

const post = <T = any>(url: string, data?: Record<string, any>): Promise<RequestResult<T>> => {
  return request<T>({
    url,
    method: 'POST',
    data
  })
}

const put = <T = any>(url: string, data?: Record<string, any>): Promise<RequestResult<T>> => {
  return request<T>({
    url,
    method: 'PUT',
    data
  })
}

const del = <T = any>(url: string, data?: Record<string, any>): Promise<RequestResult<T>> => {
  return request<T>({
    url,
    method: 'DELETE',
    data
  })
}

export { request, get, post, put, del }
