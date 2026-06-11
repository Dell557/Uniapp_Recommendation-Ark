<template>
  <view class="assessment-container">
    <view class="assessment-header">
      <view class="header-bg"></view>
      <view class="header-content">
        <text class="header-title">智能测评</text>
        <text class="header-subtitle">了解你的学习水平，制定专属学习计划</text>
      </view>
    </view>
    
    <view class="assessment-list">
      <view class="assessment-card" v-for="(item, index) in assessments" :key="index" @click="startAssessment(item)">
        <view class="card-icon" :style="{ background: item.bgColor }">
          <text>{{ item.icon }}</text>
        </view>
        <view class="card-content">
          <text class="card-title">{{ item.title }}</text>
          <text class="card-desc">{{ item.desc }}</text>
          <view class="card-meta">
            <text class="meta-item">⏱️ {{ item.duration }}</text>
            <text class="meta-item">📝 {{ item.questions }}题</text>
            <text class="meta-item" v-if="item.taken">✅ 已完成</text>
          </view>
        </view>
        <view class="card-arrow">
          <text>→</text>
        </view>
      </view>
    </view>
    
    <view class="history-section">
      <view class="section-header">
        <text class="section-title">测评历史</text>
      </view>
      <view class="history-list" v-if="history.length > 0">
        <view class="history-item" v-for="(item, index) in history" :key="index" @click="viewResult(item)">
          <text class="history-name">{{ item.name }}</text>
          <text class="history-date">{{ item.date }}</text>
          <view class="history-score">
            <text class="score-value">{{ item.score }}</text>
            <text class="score-label">分</text>
          </view>
        </view>
      </view>
      <view class="empty-history" v-else>
        <text class="empty-icon">📊</text>
        <text class="empty-text">暂无测评记录</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Assessment {
  id: string
  title: string
  desc: string
  icon: string
  bgColor: string
  duration: string
  questions: number
  taken?: boolean
}

interface HistoryItem {
  id: string
  name: string
  date: string
  score: number
}

const assessments = ref<Assessment[]>([
  { id: '1', title: '高考数学模拟测试', desc: '全面评估数学知识掌握程度', icon: '📐', bgColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', duration: '60分钟', questions: 25, taken: true },
  { id: '2', title: '英语能力诊断', desc: '听说读写全方位测评', icon: '🔤', bgColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', duration: '45分钟', questions: 40 },
  { id: '3', title: '物理知识检测', desc: '力学、电学、光学综合测试', icon: '⚡', bgColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', duration: '50分钟', questions: 20 },
  { id: '4', title: '职业倾向测试', desc: '了解你的专业兴趣方向', icon: '🎯', bgColor: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', duration: '30分钟', questions: 50 }
])

const history = ref<HistoryItem[]>([
  { id: '1', name: '高考数学模拟测试', date: '2024-01-15', score: 85 },
  { id: '2', name: '英语能力诊断', date: '2024-01-14', score: 78 }
])

const startAssessment = (item: Assessment) => {
  uni.showToast({ title: `开始${item.title}`, icon: 'none' })
}

const viewResult = (item: HistoryItem) => {
  uni.navigateTo({ url: `/subpackages/assessment/result/index?id=${item.id}` })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.assessment-container {
  min-height: 100vh;
  background: $bg-color;
}

.assessment-header {
  position: relative;
  padding: $spacing-xl;
  padding-top: calc(80rpx + env(safe-area-inset-top));
  
  .header-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 320rpx;
    background: linear-gradient(135deg, $primary-color 0%, $primary-dark 100%);
    border-radius: 0 0 $radius-xl $radius-xl;
  }
  
  .header-content {
    position: relative;
    z-index: 1;
    
    .header-title {
      display: block;
      font-size: $font-size-xxl;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: $spacing-xs;
    }
    
    .header-subtitle {
      font-size: $font-size-sm;
      color: rgba(255, 255, 255, 0.8);
    }
  }
}

.assessment-list {
  padding: $spacing-base;
  margin-top: -40rpx;
}

.assessment-card {
  display: flex;
  align-items: center;
  background: $bg-white;
  border-radius: $radius-lg;
  padding: $spacing-base;
  margin-bottom: $spacing-base;
  box-shadow: $shadow-sm;
  
  .card-icon {
    width: 100rpx;
    height: 100rpx;
    border-radius: $radius-lg;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 44rpx;
    flex-shrink: 0;
  }
  
  .card-content {
    flex: 1;
    margin-left: $spacing-base;
    
    .card-title {
      display: block;
      font-size: $font-size-lg;
      font-weight: 600;
      color: $text-color;
      margin-bottom: $spacing-xs;
    }
    
    .card-desc {
      display: block;
      font-size: $font-size-sm;
      color: $text-secondary;
      margin-bottom: $spacing-xs;
    }
    
    .card-meta {
      display: flex;
      gap: $spacing-base;
      
      .meta-item {
        font-size: $font-size-xs;
        color: $text-light;
      }
    }
  }
  
  .card-arrow {
    font-size: $font-size-lg;
    color: $text-light;
    padding: $spacing-sm;
  }
}

.history-section {
  margin: $spacing-base;
  background: $bg-white;
  border-radius: $radius-lg;
  padding: $spacing-base;
  box-shadow: $shadow-sm;
  
  .section-header {
    margin-bottom: $spacing-base;
    
    .section-title {
      font-size: $font-size-lg;
      font-weight: 600;
      color: $text-color;
    }
  }
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
  
  .history-item {
    display: flex;
    align-items: center;
    padding: $spacing-sm;
    background: $bg-color;
    border-radius: $radius-base;
    
    .history-name {
      flex: 1;
      font-size: $font-size-base;
      color: $text-color;
    }
    
    .history-date {
      font-size: $font-size-sm;
      color: $text-light;
      margin-right: $spacing-base;
    }
    
    .history-score {
      display: flex;
      align-items: baseline;
      
      .score-value {
        font-size: $font-size-xl;
        font-weight: 700;
        color: $primary-color;
      }
      
      .score-label {
        font-size: $font-size-sm;
        color: $text-secondary;
        margin-left: 4rpx;
      }
    }
  }
}

.empty-history {
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
