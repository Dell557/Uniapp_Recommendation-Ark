<template>
  <view class="course-detail-container">
    <scroll-view scroll-y class="detail-scroll">
      <view class="course-cover-wrapper">
        <image :src="course.cover" mode="aspectFill" class="course-cover" />
        <view class="cover-overlay"></view>
        <view class="cover-info">
          <text class="course-title">{{ course.title }}</text>
          <view class="course-meta">
            <text class="teacher-name">{{ course.teacher }}</text>
            <text class="course-count">{{ course.count }}人学习</text>
          </view>
        </view>
      </view>
      
      <view class="course-price-section">
        <view class="price-wrapper">
          <text class="price-symbol">¥</text>
          <text class="price-amount">{{ course.price }}</text>
          <text class="price-original" v-if="course.originalPrice">¥{{ course.originalPrice }}</text>
        </view>
        <button class="buy-btn">立即购买</button>
        <button class="try-btn">免费试看</button>
      </view>
      
      <view class="section">
        <view class="section-header">
          <text class="section-title">课程介绍</text>
        </view>
        <view class="course-desc">
          <text>{{ course.description }}</text>
        </view>
      </view>
      
      <view class="section">
        <view class="section-header">
          <text class="section-title">课程目录</text>
          <text class="chapter-count">共{{ chapters.length }}章</text>
        </view>
        <view class="chapter-list">
          <view class="chapter-item" v-for="(chapter, index) in chapters" :key="index">
            <view class="chapter-header" @click="toggleChapter(index)">
              <text class="chapter-icon">{{ expandedChapters.includes(index) ? '▼' : '▶' }}</text>
              <text class="chapter-name">{{ chapter.name }}</text>
              <text class="chapter-duration">{{ chapter.duration }}</text>
            </view>
            <view class="lesson-list" v-if="expandedChapters.includes(index)">
              <view class="lesson-item" v-for="(lesson, idx) in chapter.lessons" :key="idx">
                <text class="lesson-name">{{ lesson.name }}</text>
                <text class="lesson-duration">{{ lesson.duration }}</text>
              </view>
            </view>
          </view>
        </view>
      </view>
      
      <view class="section">
        <view class="section-header">
          <text class="section-title">讲师介绍</text>
        </view>
        <view class="teacher-info">
          <view class="teacher-avatar">
            <text>👨‍🏫</text>
          </view>
          <view class="teacher-detail">
            <text class="teacher-name">{{ course.teacher }}</text>
            <text class="teacher-title">高级讲师</text>
            <text class="teacher-desc">{{ teacherDesc }}</text>
          </view>
        </view>
      </view>
    </scroll-view>
    
    <view class="bottom-bar">
      <view class="bottom-left">
        <view class="bottom-item" @click="handleFavorite">
          <text>{{ favorited ? '❤️' : '🤍' }}</text>
          <text>收藏</text>
        </view>
        <view class="bottom-item" @click="handleShare">
          <text>📤</text>
          <text>分享</text>
        </view>
        <view class="bottom-item" @click="handleMessage">
          <text>💬</text>
          <text>客服</text>
        </view>
      </view>
      <view class="bottom-right">
        <button class="buy-now-btn">立即购买</button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

interface Chapter {
  name: string
  duration: string
  lessons: { name: string; duration: string }[]
}

const course = reactive({
  id: '1',
  title: '高考数学冲刺班',
  teacher: '张老师',
  price: 299,
  originalPrice: 599,
  count: 1280,
  cover: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=math%20education%20classroom%20chalkboard%20with%20formulas&image_size=landscape_16_9',
  description: '本课程专为高三学生设计，涵盖高考数学全部考点。通过系统的知识点讲解、典型例题分析、真题演练，帮助学生快速提升数学成绩。课程包含函数、数列、解析几何、概率统计等重点模块。'
})

const teacherDesc = '10年高中数学教学经验，曾任重点中学数学教研组长，多次参与高考命题研究，帮助数千名学生考入理想大学。'

const chapters = ref<Chapter[]>([
  { 
    name: '第一章 函数与导数', 
    duration: '3小时20分',
    lessons: [
      { name: '1.1 函数的概念与性质', duration: '45分钟' },
      { name: '1.2 导数的定义与运算', duration: '50分钟' },
      { name: '1.3 导数的应用', duration: '65分钟' },
      { name: '1.4 章节练习', duration: '40分钟' }
    ]
  },
  { 
    name: '第二章 数列', 
    duration: '2小时40分',
    lessons: [
      { name: '2.1 等差数列', duration: '40分钟' },
      { name: '2.2 等比数列', duration: '45分钟' },
      { name: '2.3 数列求和', duration: '55分钟' }
    ]
  },
  { 
    name: '第三章 解析几何', 
    duration: '4小时',
    lessons: [
      { name: '3.1 直线与圆', duration: '55分钟' },
      { name: '3.2 椭圆', duration: '60分钟' },
      { name: '3.3 双曲线', duration: '55分钟' },
      { name: '3.4 抛物线', duration: '60分钟' },
      { name: '3.5 综合应用', duration: '30分钟' }
    ]
  }
])

const expandedChapters = ref<number[]>([0])
const favorited = ref(false)

const toggleChapter = (index: number) => {
  const idx = expandedChapters.value.indexOf(index)
  if (idx > -1) {
    expandedChapters.value.splice(idx, 1)
  } else {
    expandedChapters.value.push(index)
  }
}

const handleFavorite = () => {
  favorited.value = !favorited.value
  uni.showToast({ title: favorited.value ? '已收藏' : '已取消收藏', icon: 'none' })
}

const handleShare = () => {
  uni.showToast({ title: '分享功能开发中', icon: 'none' })
}

const handleMessage = () => {
  uni.showToast({ title: '客服功能开发中', icon: 'none' })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.course-detail-container {
  min-height: 100vh;
  background: $bg-color;
}

.detail-scroll {
  height: 100vh;
  padding-bottom: calc(120rpx + #{$safe-bottom});
}

.course-cover-wrapper {
  position: relative;
  height: 420rpx;
  
  .course-cover {
    width: 100%;
    height: 100%;
  }
  
  .cover-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(transparent 30%, rgba(0, 0, 0, 0.7));
  }
  
  .cover-info {
    position: absolute;
    bottom: $spacing-base;
    left: $spacing-base;
    right: $spacing-base;
    
    .course-title {
      display: block;
      font-size: $font-size-xl;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: $spacing-sm;
    }
    
    .course-meta {
      display: flex;
      gap: $spacing-lg;
      
      .teacher-name, .course-count {
        font-size: $font-size-sm;
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
}

.course-price-section {
  display: flex;
  align-items: center;
  background: $bg-white;
  padding: $spacing-base;
  margin-bottom: $spacing-base;
  
  .price-wrapper {
    flex: 1;
    display: flex;
    align-items: baseline;
    
    .price-symbol {
      font-size: $font-size-lg;
      font-weight: 600;
      color: #ef4444;
    }
    
    .price-amount {
      font-size: 56rpx;
      font-weight: 700;
      color: #ef4444;
    }
    
    .price-original {
      font-size: $font-size-base;
      color: $text-light;
      text-decoration: line-through;
      margin-left: $spacing-sm;
    }
  }
  
  .buy-btn {
    background: #ef4444;
    color: #ffffff;
    font-size: $font-size-base;
    padding: $spacing-sm $spacing-lg;
    border-radius: $radius-base;
    border: none;
    margin-right: $spacing-sm;
  }
  
  .try-btn {
    background: $primary-light;
    color: $primary-color;
    font-size: $font-size-base;
    padding: $spacing-sm $spacing-lg;
    border-radius: $radius-base;
    border: none;
  }
}

.section {
  background: $bg-white;
  margin-bottom: $spacing-base;
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
    
    .chapter-count {
      font-size: $font-size-sm;
      color: $text-light;
    }
  }
}

.course-desc {
  font-size: $font-size-base;
  color: $text-secondary;
  line-height: 1.8;
}

.chapter-list {
  .chapter-item {
    .chapter-header {
      display: flex;
      align-items: center;
      padding: $spacing-sm 0;
      
      .chapter-icon {
        font-size: $font-size-sm;
        color: $text-light;
        margin-right: $spacing-sm;
      }
      
      .chapter-name {
        flex: 1;
        font-size: $font-size-base;
        color: $text-color;
      }
      
      .chapter-duration {
        font-size: $font-size-sm;
        color: $text-light;
      }
    }
    
    .lesson-list {
      margin-left: $spacing-lg;
      border-left: 1rpx solid $border-color;
      padding-left: $spacing-base;
      
      .lesson-item {
        display: flex;
        justify-content: space-between;
        padding: $spacing-xs 0;
        
        .lesson-name {
          font-size: $font-size-sm;
          color: $text-secondary;
        }
        
        .lesson-duration {
          font-size: $font-size-xs;
          color: $text-light;
        }
      }
    }
  }
}

.teacher-info {
  display: flex;
  
  .teacher-avatar {
    width: 100rpx;
    height: 100rpx;
    background: $primary-light;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48rpx;
    margin-right: $spacing-base;
  }
  
  .teacher-detail {
    flex: 1;
    
    .teacher-name {
      display: block;
      font-size: $font-size-base;
      font-weight: 600;
      color: $text-color;
      margin-bottom: $spacing-xs;
    }
    
    .teacher-title {
      display: block;
      font-size: $font-size-sm;
      color: $primary-color;
      margin-bottom: $spacing-xs;
    }
    
    .teacher-desc {
      font-size: $font-size-sm;
      color: $text-secondary;
      line-height: 1.6;
    }
  }
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  background: $bg-white;
  padding: $spacing-sm $spacing-base;
  padding-bottom: calc(#{$spacing-sm} + #{$safe-bottom});
  box-shadow: 0 -2rpx 16rpx rgba(0, 0, 0, 0.08);
  
  .bottom-left {
    flex: 1;
    display: flex;
    
    .bottom-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: $font-size-xs;
      color: $text-secondary;
      
      text:first-child {
        font-size: 36rpx;
        margin-bottom: 4rpx;
      }
    }
  }
  
  .bottom-right {
    .buy-now-btn {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      color: #ffffff;
      font-size: $font-size-base;
      font-weight: 600;
      padding: $spacing-base $spacing-xl;
      border-radius: $radius-lg;
      border: none;
    }
  }
}
</style>
