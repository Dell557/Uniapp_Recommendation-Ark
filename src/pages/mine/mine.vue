<template>
  <view class="mine-container">
    <view class="user-header">
      <view class="user-info">
        <view class="avatar" @click="goToProfile">
          <text class="avatar-icon">👤</text>
        </view>
        <view class="user-detail">
          <text class="user-name">{{ user?.nickname || '点击登录' }}</text>
          <text class="user-id">{{ user?.phone || '未登录' }}</text>
        </view>
        <view class="edit-btn" @click="goToProfile">
          <text class="edit-icon">→</text>
        </view>
      </view>
      
      <view class="user-stats">
        <view class="stat-item">
          <text class="stat-value">{{ user?.courseCount || 0 }}</text>
          <text class="stat-label">学习课程</text>
        </view>
        <view class="stat-divider"></view>
        <view class="stat-item">
          <text class="stat-value">{{ user?.favoriteCount || 0 }}</text>
          <text class="stat-label">收藏院校</text>
        </view>
        <view class="stat-divider"></view>
        <view class="stat-item">
          <text class="stat-value">{{ user?.couponCount || 0 }}</text>
          <text class="stat-label">优惠券</text>
        </view>
      </view>
    </view>
    
    <view class="order-section">
      <view class="section-header">
        <text class="section-title">我的订单</text>
        <text class="section-more">全部订单 →</text>
      </view>
      <view class="order-list">
        <view class="order-item" v-for="(item, index) in orderItems" :key="index" @click="handleOrderClick(item)">
          <text class="order-icon">{{ item.icon }}</text>
          <text class="order-name">{{ item.name }}</text>
        </view>
      </view>
    </view>
    
    <view class="menu-section">
      <view class="menu-item" v-for="(item, index) in menuItems" :key="index" @click="handleMenuClick(item)">
        <text class="menu-icon">{{ item.icon }}</text>
        <text class="menu-text">{{ item.name }}</text>
        <text class="menu-arrow">→</text>
        <text v-if="item.badge" class="menu-badge">{{ item.badge }}</text>
      </view>
    </view>
    
    <view class="menu-section">
      <view class="menu-item" @click="goToSettings">
        <text class="menu-icon">⚙️</text>
        <text class="menu-text">设置</text>
        <text class="menu-arrow">→</text>
      </view>
      <view class="menu-item" @click="handleLogout" v-if="user">
        <text class="menu-icon">🚪</text>
        <text class="menu-text">退出登录</text>
        <text class="menu-arrow">→</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { userStore } from '@/store/user'

const store = userStore()
const user = computed(() => store.user)

const orderItems = [
  { name: '待付款', icon: '💳' },
  { name: '待学习', icon: '📚' },
  { name: '已完成', icon: '✅' },
  { name: '退款/售后', icon: '🔄' }
]

const menuItems = [
  { name: '我的收藏', icon: '❤️', badge: '5' },
  { name: '学习记录', icon: '📝' },
  { name: '测评报告', icon: '📊' },
  { name: '优惠券', icon: '🎁', badge: '3' },
  { name: '我的钱包', icon: '👛' },
  { name: '帮助中心', icon: '❓' },
  { name: '意见反馈', icon: '💬' }
]

const handleOrderClick = (item: { name: string }) => {
  uni.showToast({ title: `${item.name}功能开发中`, icon: 'none' })
}

const handleMenuClick = (item: { name: string }) => {
  uni.showToast({ title: `${item.name}功能开发中`, icon: 'none' })
}

const goToProfile = () => {
  if (!user.value) {
    uni.navigateTo({ url: '/pages/login/login' })
  } else {
    uni.showToast({ title: '个人资料功能开发中', icon: 'none' })
  }
}

const goToSettings = () => {
  uni.showToast({ title: '设置功能开发中', icon: 'none' })
}

const handleLogout = async () => {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: async (res) => {
      if (res.confirm) {
        await store.logout()
        uni.showToast({ title: '退出成功', icon: 'success' })
      }
    }
  })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.mine-container {
  min-height: 100vh;
  background: $bg-color;
  padding-bottom: calc(120rpx + #{$safe-bottom});
}

.user-header {
  background: linear-gradient(135deg, $primary-color 0%, $primary-dark 100%);
  padding: $spacing-xl;
  padding-top: calc(100rpx + env(safe-area-inset-top));
  
  .user-info {
    display: flex;
    align-items: center;
    margin-bottom: $spacing-xl;
    
    .avatar {
      width: 120rpx;
      height: 120rpx;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: $spacing-base;
      
      .avatar-icon {
        font-size: 56rpx;
      }
    }
    
    .user-detail {
      flex: 1;
      
      .user-name {
        display: block;
        font-size: $font-size-lg;
        font-weight: 600;
        color: #ffffff;
        margin-bottom: $spacing-xs;
      }
      
      .user-id {
        font-size: $font-size-sm;
        color: rgba(255, 255, 255, 0.8);
      }
    }
    
    .edit-btn {
      width: 64rpx;
      height: 64rpx;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .edit-icon {
        color: #ffffff;
        font-size: $font-size-lg;
      }
    }
  }
  
  .user-stats {
    display: flex;
    background: rgba(255, 255, 255, 0.15);
    border-radius: $radius-lg;
    padding: $spacing-base;
    
    .stat-item {
      flex: 1;
      text-align: center;
      
      .stat-value {
        display: block;
        font-size: $font-size-xl;
        font-weight: 700;
        color: #ffffff;
        margin-bottom: $spacing-xs;
      }
      
      .stat-label {
        font-size: $font-size-sm;
        color: rgba(255, 255, 255, 0.8);
      }
    }
    
    .stat-divider {
      width: 1rpx;
      background: rgba(255, 255, 255, 0.3);
    }
  }
}

.order-section {
  background: $bg-white;
  margin: $spacing-base;
  border-radius: $radius-lg;
  padding: $spacing-base;
  box-shadow: $shadow-sm;
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-base;
    
    .section-title {
      font-size: $font-size-lg;
      font-weight: 600;
      color: $text-color;
    }
    
    .section-more {
      font-size: $font-size-sm;
      color: $text-light;
    }
  }
  
  .order-list {
    display: flex;
    justify-content: space-around;
    
    .order-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      
      .order-icon {
        font-size: 48rpx;
        margin-bottom: $spacing-xs;
      }
      
      .order-name {
        font-size: $font-size-sm;
        color: $text-secondary;
      }
    }
  }
}

.menu-section {
  background: $bg-white;
  margin: $spacing-base;
  border-radius: $radius-lg;
  box-shadow: $shadow-sm;
  overflow: hidden;
  
  .menu-item {
    display: flex;
    align-items: center;
    padding: $spacing-base;
    border-bottom: 1rpx solid $divider-color;
    
    &:last-child {
      border-bottom: none;
    }
    
    .menu-icon {
      font-size: 40rpx;
      margin-right: $spacing-base;
    }
    
    .menu-text {
      flex: 1;
      font-size: $font-size-base;
      color: $text-color;
    }
    
    .menu-arrow {
      font-size: $font-size-base;
      color: $text-light;
      margin-right: $spacing-xs;
    }
    
    .menu-badge {
      background: #ef4444;
      color: #ffffff;
      font-size: $font-size-xs;
      padding: 4rpx 12rpx;
      border-radius: 20rpx;
      min-width: 36rpx;
      text-align: center;
    }
  }
}
</style>
