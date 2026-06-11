const STORAGE_KEYS = {
  USER_INFO: 'zk_user_info',
  TOKEN: 'zk_token',
  SETTINGS: 'zk_settings'
}

const setStorage = <T>(key: string, value: T): void => {
  try {
    const data = typeof value === 'string' ? value : JSON.stringify(value)
    uni.setStorageSync(key, data)
  } catch (error) {
    console.error('Storage set error:', error)
  }
}

const getStorage = <T = any>(key: string): T | null => {
  try {
    const data = uni.getStorageSync(key)
    if (!data) return null
    try {
      return JSON.parse(data)
    } catch {
      return data as T
    }
  } catch (error) {
    console.error('Storage get error:', error)
    return null
  }
}

const removeStorage = (key: string): void => {
  try {
    uni.removeStorageSync(key)
  } catch (error) {
    console.error('Storage remove error:', error)
  }
}

const clearStorage = (): void => {
  try {
    uni.clearStorageSync()
  } catch (error) {
    console.error('Storage clear error:', error)
  }
}

export {
  STORAGE_KEYS,
  setStorage,
  getStorage,
  removeStorage,
  clearStorage
}
