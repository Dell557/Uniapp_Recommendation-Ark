<template>
  <view class="login-container">
    <view class="login-header">
      <view class="logo-wrapper">
        <view class="logo">
          <text class="logo-icon">🎓</text>
        </view>
        <text class="logo-title">中科英才教育</text>
        <text class="logo-subtitle">专注高考/考研教育</text>
      </view>
    </view>
    
    <view class="login-form">
      <view class="form-item">
        <view class="input-wrapper">
          <text class="input-icon">📱</text>
          <input 
            v-model="form.phone" 
            type="number" 
            placeholder="请输入手机号" 
            class="input"
            maxlength="11"
          />
        </view>
      </view>
      
      <view class="form-item">
        <view class="input-wrapper">
          <text class="input-icon">🔑</text>
          <input 
            v-model="form.password" 
            :type="showPassword ? 'text' : 'password'" 
            placeholder="请输入密码" 
            class="input"
          />
          <text class="toggle-icon" @click="showPassword = !showPassword">{{ showPassword ? '🙈' : '👁️' }}</text>
        </view>
      </view>
      
      <view class="form-item">
        <view class="input-wrapper">
          <text class="input-icon">📩</text>
          <input 
            v-model="form.code" 
            type="number" 
            placeholder="请输入验证码" 
            class="input"
            maxlength="6"
          />
          <text class="code-btn" @click="sendCode" :class="{ disabled: countdown > 0 }">
            {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
          </text>
        </view>
      </view>
      
      <view class="form-row">
        <view class="checkbox-wrapper" @click="form.remember = !form.remember">
          <view class="checkbox" :class="{ checked: form.remember }">
            <text v-if="form.remember" class="check-icon">✓</text>
          </view>
          <text class="checkbox-text">记住密码</text>
        </view>
        <text class="forgot-link">忘记密码？</text>
      </view>
      
      <button class="login-btn" @click="handleLogin">登 录</button>
      
      <view class="register-row">
        <text class="register-text">还没有账号？</text>
        <text class="register-link" @click="goToRegister">立即注册</text>
      </view>
    </view>
    
    <view class="other-login">
      <view class="divider">
        <view class="divider-line"></view>
        <text class="divider-text">其他登录方式</text>
        <view class="divider-line"></view>
      </view>
      <view class="social-login">
        <view class="social-item" @click="wechatLogin">
          <text class="social-icon">💬</text>
          <text class="social-name">微信登录</text>
        </view>
        <view class="social-item" @click="qqLogin">
          <text class="social-icon">🐧</text>
          <text class="social-name">QQ登录</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { userStore } from '@/store/user'

const form = reactive({
  phone: '',
  password: '',
  code: '',
  remember: false
})

const showPassword = ref(false)
const countdown = ref(0)

const sendCode = () => {
  if (countdown.value > 0) return
  if (!form.phone) {
    uni.showToast({ title: '请输入手机号', icon: 'none' })
    return
  }
  
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
  
  uni.showToast({ title: '验证码已发送', icon: 'success' })
}

const handleLogin = async () => {
  if (!form.phone) {
    uni.showToast({ title: '请输入手机号', icon: 'none' })
    return
  }
  if (!form.password) {
    uni.showToast({ title: '请输入密码', icon: 'none' })
    return
  }
  
  const store = userStore()
  await store.login({
    phone: form.phone,
    password: form.password
  })
  
  if (store.user) {
    uni.showToast({ title: '登录成功', icon: 'success' })
    setTimeout(() => {
      uni.switchTab({ url: '/pages/index/index' })
    }, 1500)
  }
}

const goToRegister = () => {
  uni.showToast({ title: '注册功能开发中', icon: 'none' })
}

const wechatLogin = () => {
  uni.showToast({ title: '微信登录开发中', icon: 'none' })
}

const qqLogin = () => {
  uni.showToast({ title: 'QQ登录开发中', icon: 'none' })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.login-container {
  min-height: 100vh;
  background: linear-gradient(135deg, $primary-color 0%, $primary-dark 100%);
  padding: $spacing-xl;
  padding-top: calc(100rpx + env(safe-area-inset-top));
}

.login-header {
  text-align: center;
  margin-bottom: $spacing-xl;
  
  .logo-wrapper {
    .logo {
      width: 160rpx;
      height: 160rpx;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto $spacing-base;
      box-shadow: $shadow-lg;
      
      .logo-icon {
        font-size: 72rpx;
      }
    }
    
    .logo-title {
      display: block;
      font-size: $font-size-xxl;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: $spacing-xs;
    }
    
    .logo-subtitle {
      font-size: $font-size-sm;
      color: rgba(255, 255, 255, 0.8);
    }
  }
}

.login-form {
  background: $bg-white;
  border-radius: $radius-xl;
  padding: $spacing-xl;
  box-shadow: $shadow-lg;
  
  .form-item {
    margin-bottom: $spacing-base;
  }
  
  .input-wrapper {
    display: flex;
    align-items: center;
    background: $bg-color;
    border-radius: $radius-base;
    padding: 0 $spacing-base;
    height: 88rpx;
    
    .input-icon {
      font-size: 32rpx;
      margin-right: $spacing-sm;
    }
    
    .input {
      flex: 1;
      height: 100%;
      font-size: $font-size-base;
      background: transparent;
    }
    
    .toggle-icon {
      font-size: 28rpx;
      padding: $spacing-xs;
    }
    
    .code-btn {
      font-size: $font-size-sm;
      color: $primary-color;
      padding: $spacing-xs $spacing-base;
      border-left: 1rpx solid $border-color;
      
      &.disabled {
        color: $text-light;
      }
    }
  }
  
  .form-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-lg;
    
    .checkbox-wrapper {
      display: flex;
      align-items: center;
    }
    
    .checkbox {
      width: 36rpx;
      height: 36rpx;
      border: 2rpx solid $border-color;
      border-radius: 6rpx;
      margin-right: $spacing-sm;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &.checked {
        background: $primary-color;
        border-color: $primary-color;
        
        .check-icon {
          color: #ffffff;
          font-size: 24rpx;
        }
      }
    }
    
    .checkbox-text {
      font-size: $font-size-sm;
      color: $text-secondary;
    }
    
    .forgot-link {
      font-size: $font-size-sm;
      color: $primary-color;
    }
  }
  
  .login-btn {
    width: 100%;
    height: 88rpx;
    background: linear-gradient(135deg, $primary-color 0%, $primary-dark 100%);
    color: #ffffff;
    font-size: $font-size-lg;
    font-weight: 600;
    border-radius: $radius-base;
    border: none;
    margin-bottom: $spacing-base;
    
    &:active {
      opacity: 0.8;
    }
  }
  
  .register-row {
    text-align: center;
    
    .register-text {
      font-size: $font-size-sm;
      color: $text-secondary;
    }
    
    .register-link {
      font-size: $font-size-sm;
      color: $primary-color;
      margin-left: $spacing-xs;
    }
  }
}

.other-login {
  margin-top: $spacing-xl;
  
  .divider {
    display: flex;
    align-items: center;
    margin-bottom: $spacing-lg;
    
    .divider-line {
      flex: 1;
      height: 1rpx;
      background: rgba(255, 255, 255, 0.3);
    }
    
    .divider-text {
      padding: 0 $spacing-base;
      font-size: $font-size-sm;
      color: rgba(255, 255, 255, 0.8);
    }
  }
  
  .social-login {
    display: flex;
    justify-content: center;
    gap: $spacing-xl;
    
    .social-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      
      .social-icon {
        font-size: 56rpx;
        margin-bottom: $spacing-xs;
      }
      
      .social-name {
        font-size: $font-size-sm;
        color: rgba(255, 255, 255, 0.9);
      }
    }
  }
}
</style>
