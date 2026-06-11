<template>
  <view class="group-buy-container">
    <view class="banner-section">
      <image :src="bannerImage" mode="aspectFill" class="banner-image" />
      <view class="banner-overlay">
        <text class="banner-title">限时拼团活动</text>
        <view class="countdown">
          <text class="countdown-label">距离结束</text>
          <view class="countdown-time">
            <view class="time-item">
              <text class="time-value">{{ hours }}</text>
              <text class="time-unit">时</text>
            </view>
            <text class="time-separator">:</text>
            <view class="time-item">
              <text class="time-value">{{ minutes }}</text>
              <text class="time-unit">分</text>
            </view>
            <text class="time-separator">:</text>
            <view class="time-item">
              <text class="time-value">{{ seconds }}</text>
              <text class="time-unit">秒</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    
    <view class="group-list">
      <view class="group-card" v-for="(group, index) in groups" :key="index">
        <view class="card-left">
          <image :src="group.cover" mode="aspectFill" class="group-cover" />
          <view class="group-tag" v-if="group.tag">{{ group.tag }}</view>
        </view>
        <view class="card-right">
          <text class="group-title">{{ group.title }}</text>
          <text class="group-desc">{{ group.desc }}</text>
          <view class="group-price">
            <text class="price-current">¥{{ group.price }}</text>
            <text class="price-original">¥{{ group.originalPrice }}</text>
          </view>
          <view class="group-progress">
            <view class="progress-bar">
              <view class="progress-fill" :style="{ width: group.progress + '%' }"></view>
            </view>
            <text class="progress-text">{{ group.current }}/{{ group.total }}人已拼</text>
          </view>
          <view class="group-actions">
            <button class="join-btn" :class="{ active: group.canJoin }" @click="joinGroup(group)">
              {{ group.canJoin ? '去拼团' : '已满员' }}
            </button>
            <button class="invite-btn" @click="inviteFriend(group)">邀请好友</button>
          </view>
        </view>
      </view>
    </view>
    
    <view class="my-group-section">
      <view class="section-header">
        <text class="section-title">我的拼团</text>
        <text class="section-more">查看全部 →</text>
      </view>
      <view class="my-group-list" v-if="myGroups.length > 0">
        <view class="my-group-item" v-for="(item, index) in myGroups" :key="index">
          <image :src="item.cover" mode="aspectFill" class="my-group-cover" />
          <view class="my-group-info">
            <text class="my-group-title">{{ item.title }}</text>
            <text class="my-group-status" :class="item.status">{{ item.statusText }}</text>
          </view>
          <button class="my-group-btn" v-if="item.status === 'pending'">邀请好友</button>
          <button class="my-group-btn success" v-else-if="item.status === 'success'">去学习</button>
        </view>
      </view>
      <view class="empty-my-group" v-else>
        <text class="empty-icon">🎁</text>
        <text class="empty-text">暂无拼团记录</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Group {
  id: string
  title: string
  desc: string
  cover: string
  price: number
  originalPrice: number
  current: number
  total: number
  progress: number
  tag?: string
  canJoin: boolean
}

interface MyGroup {
  id: string
  title: string
  cover: string
  status: 'pending' | 'success' | 'failed'
  statusText: string
}

const bannerImage = 'https://neeko-copilot.bytedance.net/api/text2image?prompt=group%20buy%20sale%20promotion%20colorful%20banner&image_size=landscape_16_9'

const hours = ref(12)
const minutes = ref(30)
const seconds = ref(45)

let timer: number | null = null

onMounted(() => {
  timer = setInterval(() => {
    if (seconds.value > 0) {
      seconds.value--
    } else if (minutes.value > 0) {
      minutes.value--
      seconds.value = 59
    } else if (hours.value > 0) {
      hours.value--
      minutes.value = 59
      seconds.value = 59
    }
  }, 1000) as unknown as number
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const groups = ref<Group[]>([
  { 
    id: '1', 
    title: '高考数学冲刺班', 
    desc: '三人成团享8折优惠', 
    cover: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=math%20education%20classroom&image_size=portrait_4_3', 
    price: 239, 
    originalPrice: 299, 
    current: 2, 
    total: 3, 
    progress: 67,
    tag: '热门',
    canJoin: true
  },
  { 
    id: '2', 
    title: '英语听力专项突破', 
    desc: '两人成团享9折优惠', 
    cover: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=english%20learning%20headphones&image_size=portrait_4_3', 
    price: 179, 
    originalPrice: 199, 
    current: 1, 
    total: 2, 
    progress: 50,
    canJoin: true
  },
  { 
    id: '3', 
    title: '物理实验精讲', 
    desc: '三人成团享7.5折', 
    cover: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=physics%20laboratory%20equipment&image_size=portrait_4_3', 
    price: 187, 
    originalPrice: 249, 
    current: 3, 
    total: 3, 
    progress: 100,
    tag: '已满',
    canJoin: false
  }
])

const myGroups = ref<MyGroup[]>([
  { id: '1', title: '高考数学冲刺班', cover: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=math%20education%20classroom&image_size=portrait_4_3', status: 'pending', statusText: '等待好友加入' },
  { id: '2', title: '英语听力专项突破', cover: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=english%20learning%20headphones&image_size=portrait_4_3', status: 'success', statusText: '拼团成功' }
])

const joinGroup = (group: Group) => {
  if (!group.canJoin) {
    uni.showToast({ title: '该团已满员', icon: 'none' })
    return
  }
  uni.showToast({ title: `加入${group.title}拼团`, icon: 'none' })
}

const inviteFriend = (group: Group) => {
  uni.showToast({ title: '邀请好友功能开发中', icon: 'none' })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.group-buy-container {
  min-height: 100vh;
  background: $bg-color;
  padding-bottom: calc(20rpx + #{$safe-bottom});
}

.banner-section {
  position: relative;
  height: 320rpx;
  
  .banner-image {
    width: 100%;
    height: 100%;
  }
  
  .banner-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    .banner-title {
      font-size: $font-size-xl;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: $spacing-base;
    }
    
    .countdown {
      text-align: center;
      
      .countdown-label {
        display: block;
        font-size: $font-size-sm;
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: $spacing-sm;
      }
      
      .countdown-time {
        display: flex;
        align-items: center;
        
        .time-item {
          background: rgba(255, 255, 255, 0.2);
          border-radius: $radius-sm;
          padding: $spacing-xs $spacing-base;
          display: flex;
          flex-direction: column;
          align-items: center;
          
          .time-value {
            font-size: $font-size-xl;
            font-weight: 700;
            color: #ffffff;
          }
          
          .time-unit {
            font-size: $font-size-xs;
            color: rgba(255, 255, 255, 0.8);
          }
        }
        
        .time-separator {
          font-size: $font-size-xl;
          font-weight: 700;
          color: #ffffff;
          margin: 0 $spacing-xs;
        }
      }
    }
  }
}

.group-list {
  padding: $spacing-base;
  display: flex;
  flex-direction: column;
  gap: $spacing-base;
}

.group-card {
  display: flex;
  background: $bg-white;
  border-radius: $radius-lg;
  overflow: hidden;
  box-shadow: $shadow-sm;
  
  .card-left {
    position: relative;
    width: 280rpx;
    
    .group-cover {
      width: 100%;
      height: 200rpx;
    }
    
    .group-tag {
      position: absolute;
      top: $spacing-sm;
      left: $spacing-sm;
      background: #ef4444;
      color: #ffffff;
      font-size: $font-size-xs;
      padding: 4rpx 12rpx;
      border-radius: 4rpx;
    }
  }
  
  .card-right {
    flex: 1;
    padding: $spacing-sm;
    display: flex;
    flex-direction: column;
    
    .group-title {
      font-size: $font-size-base;
      font-weight: 600;
      color: $text-color;
      margin-bottom: $spacing-xs;
    }
    
    .group-desc {
      font-size: $font-size-sm;
      color: $text-secondary;
      margin-bottom: $spacing-xs;
    }
    
    .group-price {
      display: flex;
      align-items: baseline;
      margin-bottom: $spacing-xs;
      
      .price-current {
        font-size: $font-size-xl;
        font-weight: 700;
        color: #ef4444;
      }
      
      .price-original {
        font-size: $font-size-sm;
        color: $text-light;
        text-decoration: line-through;
        margin-left: $spacing-xs;
      }
    }
    
    .group-progress {
      margin-bottom: $spacing-sm;
      
      .progress-bar {
        height: 8rpx;
        background: $bg-color;
        border-radius: 4rpx;
        overflow: hidden;
        margin-bottom: $spacing-xs;
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #ef4444 0%, #f97316 100%);
          border-radius: 4rpx;
        }
      }
      
      .progress-text {
        font-size: $font-size-xs;
        color: $text-light;
      }
    }
    
    .group-actions {
      display: flex;
      gap: $spacing-sm;
      
      .join-btn {
        flex: 1;
        height: 64rpx;
        font-size: $font-size-sm;
        border-radius: $radius-sm;
        border: none;
        
        &.active {
          background: linear-gradient(135deg, #ef4444 0%, #f97316 100%);
          color: #ffffff;
        }
        
        &:not(.active) {
          background: $bg-color;
          color: $text-light;
        }
      }
      
      .invite-btn {
        flex: 1;
        height: 64rpx;
        font-size: $font-size-sm;
        background: $primary-light;
        color: $primary-color;
        border-radius: $radius-sm;
        border: none;
      }
    }
  }
}

.my-group-section {
  margin: $spacing-base;
  background: $bg-white;
  border-radius: $radius-lg;
  padding: $spacing-base;
  
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
}

.my-group-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
  
  .my-group-item {
    display: flex;
    align-items: center;
    padding: $spacing-sm;
    background: $bg-color;
    border-radius: $radius-base;
    
    .my-group-cover {
      width: 100rpx;
      height: 70rpx;
      border-radius: $radius-sm;
      margin-right: $spacing-sm;
    }
    
    .my-group-info {
      flex: 1;
      
      .my-group-title {
        display: block;
        font-size: $font-size-base;
        color: $text-color;
        margin-bottom: $spacing-xs;
      }
      
      .my-group-status {
        font-size: $font-size-sm;
        
        &.pending {
          color: #f59e0b;
        }
        
        &.success {
          color: $primary-color;
        }
        
        &.failed {
          color: $text-light;
        }
      }
    }
    
    .my-group-btn {
      background: $primary-light;
      color: $primary-color;
      font-size: $font-size-sm;
      padding: $spacing-xs $spacing-base;
      border-radius: $radius-sm;
      border: none;
      
      &.success {
        background: $primary-color;
        color: #ffffff;
      }
    }
  }
}

.empty-my-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $spacing-xl;
  
  .empty-icon {
    font-size: 64rpx;
    margin-bottom: $spacing-base;
  }
  
  .empty-text {
    font-size: $font-size-base;
    color: $text-light;
  }
}
</style>
