<template>
  <view class="course-list-container">
    <view class="search-bar">
      <view class="search-input-wrapper">
        <text class="search-icon">🔍</text>
        <input 
          v-model="searchKey" 
          placeholder="搜索课程" 
          class="search-input"
          @confirm="handleSearch"
        />
      </view>
    </view>
    
    <view class="filter-tabs">
      <view 
        class="filter-tab" 
        :class="{ active: activeFilter === 'all' }"
        @click="activeFilter = 'all'"
      >全部</view>
      <view 
        class="filter-tab" 
        :class="{ active: activeFilter === 'math' }"
        @click="activeFilter = 'math'"
      >数学</view>
      <view 
        class="filter-tab" 
        :class="{ active: activeFilter === 'english' }"
        @click="activeFilter = 'english'"
      >英语</view>
      <view 
        class="filter-tab" 
        :class="{ active: activeFilter === 'physics' }"
        @click="activeFilter = 'physics'"
      >物理</view>
    </view>
    
    <scroll-view scroll-y class="course-scroll" @scrolltolower="loadMore">
      <view class="course-grid">
        <view class="course-card" v-for="(course, index) in courses" :key="index" @click="goToDetail(course)">
          <image :src="course.cover" mode="aspectFill" class="course-cover" />
          <view class="course-badge" v-if="course.badge">{{ course.badge }}</view>
          <view class="course-info">
            <text class="course-title">{{ course.title }}</text>
            <text class="course-teacher">{{ course.teacher }}</text>
            <view class="course-footer">
              <text class="course-price">¥{{ course.price }}</text>
              <text class="course-count">{{ course.count }}人学习</text>
            </view>
          </view>
        </view>
      </view>
      <view class="load-more" v-if="loading">
        <text>加载中...</text>
      </view>
      <view class="no-more" v-else-if="!hasMore">
        <text>— 已经到底了 —</text>
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Course {
  id: string
  title: string
  teacher: string
  price: number
  count: number
  cover: string
  badge?: string
}

const searchKey = ref('')
const activeFilter = ref('all')
const loading = ref(false)
const hasMore = ref(true)

const courses = ref<Course[]>([
  { id: '1', title: '高考数学冲刺班', teacher: '张老师', price: 299, count: 1280, cover: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=math%20education%20classroom%20chalkboard&image_size=portrait_4_3', badge: '热门' },
  { id: '2', title: '英语听力专项突破', teacher: '李老师', price: 199, count: 890, cover: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=english%20learning%20books%20headphones&image_size=portrait_4_3' },
  { id: '3', title: '物理实验精讲', teacher: '王老师', price: 249, count: 650, cover: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=physics%20laboratory%20equipment&image_size=portrait_4_3', badge: '新课' },
  { id: '4', title: '化学方程式速记', teacher: '赵老师', price: 179, count: 520, cover: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=chemistry%20laboratory%20beakers&image_size=portrait_4_3' },
  { id: '5', title: '语文阅读理解', teacher: '刘老师', price: 229, count: 780, cover: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=chinese%20literature%20books%20reading&image_size=portrait_4_3' },
  { id: '6', title: '生物遗传学基础', teacher: '孙老师', price: 189, count: 450, cover: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=biology%20science%20dna%20molecules&image_size=portrait_4_3' }
])

const handleSearch = () => {
  uni.showToast({ title: '搜索功能开发中', icon: 'none' })
}

const loadMore = () => {
  if (loading.value || !hasMore.value) return
  loading.value = true
  setTimeout(() => {
    loading.value = false
    hasMore.value = false
  }, 1000)
}

const goToDetail = (course: Course) => {
  uni.navigateTo({ url: `/subpackages/video-course/detail/index?id=${course.id}` })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.course-list-container {
  min-height: 100vh;
  background: $bg-color;
}

.search-bar {
  background: $bg-white;
  padding: $spacing-base;
  
  .search-input-wrapper {
    display: flex;
    align-items: center;
    background: $bg-color;
    border-radius: $radius-lg;
    padding: 0 $spacing-base;
    height: 80rpx;
    
    .search-icon {
      font-size: 28rpx;
      margin-right: $spacing-sm;
    }
    
    .search-input {
      flex: 1;
      height: 100%;
      font-size: $font-size-base;
      background: transparent;
    }
  }
}

.filter-tabs {
  display: flex;
  background: $bg-white;
  padding: $spacing-sm $spacing-base;
  border-bottom: 1rpx solid $divider-color;
  
  .filter-tab {
    padding: $spacing-sm $spacing-base;
    font-size: $font-size-base;
    color: $text-secondary;
    border-radius: $radius-base;
    margin-right: $spacing-sm;
    
    &.active {
      background: $primary-light;
      color: $primary-color;
      font-weight: 500;
    }
  }
}

.course-scroll {
  height: calc(100vh - 260rpx);
  padding: $spacing-base;
}

.course-grid {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-base;
}

.course-card {
  width: calc(50% - 24rpx);
  background: $bg-white;
  border-radius: $radius-lg;
  overflow: hidden;
  box-shadow: $shadow-sm;
  
  .course-cover {
    width: 100%;
    height: 280rpx;
    position: relative;
  }
  
  .course-badge {
    position: absolute;
    top: $spacing-sm;
    left: $spacing-sm;
    background: #ef4444;
    color: #ffffff;
    font-size: $font-size-xs;
    padding: 4rpx 12rpx;
    border-radius: 4rpx;
  }
  
  .course-info {
    padding: $spacing-sm;
    
    .course-title {
      display: block;
      font-size: $font-size-base;
      font-weight: 500;
      color: $text-color;
      margin-bottom: $spacing-xs;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .course-teacher {
      display: block;
      font-size: $font-size-sm;
      color: $text-secondary;
      margin-bottom: $spacing-xs;
    }
    
    .course-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .course-price {
        font-size: $font-size-lg;
        font-weight: 600;
        color: #ef4444;
      }
      
      .course-count {
        font-size: $font-size-xs;
        color: $text-light;
      }
    }
  }
}

.load-more, .no-more {
  text-align: center;
  padding: $spacing-base;
  color: $text-light;
  font-size: $font-size-sm;
}
</style>
