<template>
  <view class="coupon-container">
    <view class="tabs">
      <view class="tab" :class="{ active: activeTab === 'available' }" @click="activeTab = 'available'">
        <text>可使用</text>
        <text class="tab-badge" v-if="availableCoupons.length > 0">{{ availableCoupons.length }}</text>
      </view>
      <view class="tab" :class="{ active: activeTab === 'used' }" @click="activeTab = 'used'">
        <text>已使用</text>
      </view>
      <view class="tab" :class="{ active: activeTab === 'expired' }" @click="activeTab = 'expired'">
        <text>已过期</text>
      </view>
    </view>
    
    <scroll-view scroll-y class="coupon-scroll">
      <view class="coupon-list" v-if="activeTab === 'available'">
        <view class="coupon-card" v-for="(coupon, index) in availableCoupons" :key="index">
          <view class="coupon-left">
            <text class="coupon-amount">¥{{ coupon.amount }}</text>
            <text class="coupon-condition">满{{ coupon.minAmount }}可用</text>
          </view>
          <view class="coupon-right">
            <text class="coupon-title">{{ coupon.title }}</text>
            <text class="coupon-desc">{{ coupon.desc }}</text>
            <text class="coupon-expire">有效期至 {{ coupon.expireDate }}</text>
            <button class="coupon-btn" @click="useCoupon(coupon)">立即使用</button>
          </view>
        </view>
      </view>
      
      <view class="coupon-list" v-else-if="activeTab === 'used'">
        <view class="coupon-card used" v-for="(coupon, index) in usedCoupons" :key="index">
          <view class="coupon-left">
            <text class="coupon-amount">¥{{ coupon.amount }}</text>
            <text class="coupon-condition">满{{ coupon.minAmount }}可用</text>
          </view>
          <view class="coupon-right">
            <text class="coupon-title">{{ coupon.title }}</text>
            <text class="coupon-desc">{{ coupon.desc }}</text>
            <text class="coupon-used">已使用</text>
          </view>
        </view>
      </view>
      
      <view class="coupon-list" v-else>
        <view class="coupon-card expired" v-for="(coupon, index) in expiredCoupons" :key="index">
          <view class="coupon-left">
            <text class="coupon-amount">¥{{ coupon.amount }}</text>
            <text class="coupon-condition">满{{ coupon.minAmount }}可用</text>
          </view>
          <view class="coupon-right">
            <text class="coupon-title">{{ coupon.title }}</text>
            <text class="coupon-desc">{{ coupon.desc }}</text>
            <text class="coupon-expired">已过期</text>
          </view>
        </view>
      </view>
      
      <view class="empty-state" v-if="currentCoupons.length === 0">
        <text class="empty-icon">🎫</text>
        <text class="empty-text">暂无优惠券</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Coupon {
  id: string
  title: string
  desc: string
  amount: number
  minAmount: number
  expireDate: string
}

const activeTab = ref('available')

const availableCoupons = ref<Coupon[]>([
  { id: '1', title: '新用户专享', desc: '全场课程通用', amount: 50, minAmount: 200, expireDate: '2024-12-31' },
  { id: '2', title: '学习节特惠', desc: '视频课程专用', amount: 30, minAmount: 100, expireDate: '2024-06-30' },
  { id: '3', title: '院校库会员', desc: '院校库VIP专享', amount: 20, minAmount: 50, expireDate: '2024-09-30' }
])

const usedCoupons = ref<Coupon[]>([
  { id: '4', title: '开学季礼包', desc: '全场通用', amount: 100, minAmount: 500, expireDate: '2024-03-31' }
])

const expiredCoupons = ref<Coupon[]>([
  { id: '5', title: '春节特惠', desc: '限时优惠', amount: 80, minAmount: 300, expireDate: '2024-02-29' }
])

const currentCoupons = computed(() => {
  switch (activeTab.value) {
    case 'available': return availableCoupons.value
    case 'used': return usedCoupons.value
    case 'expired': return expiredCoupons.value
    default: return []
  }
})

const useCoupon = (coupon: Coupon) => {
  uni.showToast({ title: `使用${coupon.title}`, icon: 'none' })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.coupon-container {
  min-height: 100vh;
  background: $bg-color;
}

.tabs {
  display: flex;
  background: $bg-white;
  padding: $spacing-sm;
  border-bottom: 1rpx solid $divider-color;
  
  .tab {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: $spacing-base;
    font-size: $font-size-base;
    color: $text-secondary;
    position: relative;
    
    &.active {
      color: $primary-color;
      font-weight: 600;
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 48rpx;
        height: 4rpx;
        background: $primary-color;
        border-radius: 2rpx;
      }
    }
    
    .tab-badge {
      background: #ef4444;
      color: #ffffff;
      font-size: 20rpx;
      padding: 2rpx 12rpx;
      border-radius: 20rpx;
      margin-left: $spacing-xs;
    }
  }
}

.coupon-scroll {
  height: calc(100vh - 120rpx);
  padding: $spacing-base;
}

.coupon-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-base;
}

.coupon-card {
  display: flex;
  background: $bg-white;
  border-radius: $radius-lg;
  overflow: hidden;
  box-shadow: $shadow-sm;
  
  &.used, &.expired {
    opacity: 0.6;
  }
  
  .coupon-left {
    width: 200rpx;
    background: linear-gradient(135deg, $primary-color 0%, $primary-dark 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: $spacing-base;
    
    .coupon-amount {
      font-size: $font-size-xxl;
      font-weight: 700;
      color: #ffffff;
    }
    
    .coupon-condition {
      font-size: $font-size-xs;
      color: rgba(255, 255, 255, 0.8);
      margin-top: $spacing-xs;
    }
  }
  
  .coupon-right {
    flex: 1;
    padding: $spacing-base;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    .coupon-title {
      font-size: $font-size-base;
      font-weight: 600;
      color: $text-color;
    }
    
    .coupon-desc {
      font-size: $font-size-sm;
      color: $text-secondary;
    }
    
    .coupon-expire {
      font-size: $font-size-xs;
      color: $text-light;
    }
    
    .coupon-used, .coupon-expired {
      font-size: $font-size-xs;
      color: $text-light;
    }
    
    .coupon-btn {
      align-self: flex-end;
      background: $primary-light;
      color: $primary-color;
      font-size: $font-size-sm;
      padding: $spacing-xs $spacing-base;
      border-radius: $radius-base;
      border: none;
      
      &:active {
        opacity: 0.8;
      }
    }
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $spacing-xl;
  
  .empty-icon {
    font-size: 80rpx;
    margin-bottom: $spacing-base;
  }
  
  .empty-text {
    font-size: $font-size-base;
    color: $text-light;
  }
}
</style>
