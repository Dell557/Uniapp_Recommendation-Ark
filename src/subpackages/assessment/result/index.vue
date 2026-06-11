<template>
  <view class="result-container">
    <view class="result-header">
      <view class="header-bg"></view>
      <view class="result-card">
        <text class="result-title">测评完成</text>
        <view class="score-circle">
          <text class="score-value">{{ score }}</text>
          <text class="score-label">分</text>
        </view>
        <text class="score-desc">{{ scoreLevel }}</text>
        <view class="score-bar">
          <view class="bar-fill" :style="{ width: score + '%' }"></view>
        </view>
        <view class="score-info">
          <text>用时 {{ duration }}</text>
          <text>正确率 {{ correctRate }}%</text>
        </view>
      </view>
    </view>
    
    <view class="section">
      <view class="section-header">
        <text class="section-title">能力分析</text>
      </view>
      <view class="ability-list">
        <view class="ability-item" v-for="(item, index) in abilities" :key="index">
          <view class="ability-header">
            <text class="ability-name">{{ item.name }}</text>
            <text class="ability-score">{{ item.score }}</text>
          </view>
          <view class="ability-bar">
            <view class="ability-fill" :style="{ width: item.score + '%', background: item.color }"></view>
          </view>
          <text class="ability-desc">{{ item.desc }}</text>
        </view>
      </view>
    </view>
    
    <view class="section">
      <view class="section-header">
        <text class="section-title">知识点掌握</text>
      </view>
      <view class="knowledge-list">
        <view class="knowledge-item" v-for="(item, index) in knowledgePoints" :key="index">
          <view class="knowledge-header">
            <text class="knowledge-name">{{ item.name }}</text>
            <view class="knowledge-tag" :class="item.level">{{ item.level }}</view>
          </view>
          <view class="knowledge-bar">
            <view class="knowledge-fill" :style="{ width: item.score + '%', background: getTagColor(item.level) }"></view>
          </view>
        </view>
      </view>
    </view>
    
    <view class="section">
      <view class="section-header">
        <text class="section-title">学习建议</text>
      </view>
      <view class="suggestion-list">
        <view class="suggestion-item" v-for="(item, index) in suggestions" :key="index">
          <text class="suggestion-icon">{{ item.icon }}</text>
          <text class="suggestion-text">{{ item.text }}</text>
        </view>
      </view>
    </view>
    
    <view class="action-section">
      <button class="action-btn primary" @click="viewReport">查看详细报告</button>
      <button class="action-btn secondary" @click="retryAssessment">再测一次</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const score = ref(85)
const duration = ref('45分钟')
const correctRate = ref(85)

const scoreLevel = computed(() => {
  if (score.value >= 90) return '优秀'
  if (score.value >= 75) return '良好'
  if (score.value >= 60) return '及格'
  return '需加强'
})

const abilities = ref([
  { name: '基础知识', score: 90, color: '#10b981', desc: '基础知识点掌握扎实' },
  { name: '综合应用', score: 80, color: '#3b82f6', desc: '综合运用能力良好' },
  { name: '逻辑推理', score: 85, color: '#8b5cf6', desc: '逻辑思维能力较强' },
  { name: '计算能力', score: 75, color: '#f59e0b', desc: '计算准确率有待提高' }
])

const knowledgePoints = ref([
  { name: '函数与导数', score: 90, level: '掌握' },
  { name: '数列', score: 85, level: '掌握' },
  { name: '解析几何', score: 75, level: '熟悉' },
  { name: '概率统计', score: 80, level: '熟悉' },
  { name: '立体几何', score: 65, level: '了解' }
])

const suggestions = ref([
  { icon: '📚', text: '加强立体几何的学习，建议多做空间想象练习' },
  { icon: '💡', text: '解析几何部分需要加强解题技巧训练' },
  { icon: '🎯', text: '建议每天做30分钟数学练习题保持手感' },
  { icon: '📊', text: '定期复习错题，巩固薄弱知识点' }
])

const getTagColor = (level: string) => {
  switch (level) {
    case '掌握': return '#10b981'
    case '熟悉': return '#3b82f6'
    case '了解': return '#f59e0b'
    default: return '#9ca3af'
  }
}

const viewReport = () => {
  uni.showToast({ title: '查看详细报告', icon: 'none' })
}

const retryAssessment = () => {
  uni.showToast({ title: '重新测评', icon: 'none' })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.result-container {
  min-height: 100vh;
  background: $bg-color;
  padding-bottom: 200rpx;
}

.result-header {
  position: relative;
  padding: $spacing-xl;
  padding-top: calc(60rpx + env(safe-area-inset-top));
  
  .header-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 400rpx;
    background: linear-gradient(135deg, $primary-color 0%, $primary-dark 100%);
    border-radius: 0 0 $radius-xl $radius-xl;
  }
  
  .result-card {
    position: relative;
    z-index: 1;
    background: $bg-white;
    border-radius: $radius-xl;
    padding: $spacing-xl;
    text-align: center;
    box-shadow: $shadow-lg;
    
    .result-title {
      display: block;
      font-size: $font-size-lg;
      font-weight: 600;
      color: $text-color;
      margin-bottom: $spacing-lg;
    }
    
    .score-circle {
      width: 200rpx;
      height: 200rpx;
      border-radius: 50%;
      background: linear-gradient(135deg, $primary-light 0%, rgba($primary-color, 0.1) 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0 auto $spacing-base;
      
      .score-value {
        font-size: 72rpx;
        font-weight: 700;
        color: $primary-color;
      }
      
      .score-label {
        font-size: $font-size-base;
        color: $text-secondary;
      }
    }
    
    .score-desc {
      display: block;
      font-size: $font-size-xl;
      font-weight: 600;
      color: $primary-color;
      margin-bottom: $spacing-base;
    }
    
    .score-bar {
      height: 12rpx;
      background: $bg-color;
      border-radius: 6rpx;
      overflow: hidden;
      margin-bottom: $spacing-base;
      
      .bar-fill {
        height: 100%;
        background: linear-gradient(90deg, $primary-color 0%, $primary-dark 100%);
        border-radius: 6rpx;
      }
    }
    
    .score-info {
      display: flex;
      justify-content: center;
      gap: $spacing-xl;
      
      text {
        font-size: $font-size-sm;
        color: $text-secondary;
      }
    }
  }
}

.section {
  background: $bg-white;
  margin: $spacing-base;
  border-radius: $radius-lg;
  padding: $spacing-base;
  
  .section-header {
    margin-bottom: $spacing-base;
    
    .section-title {
      font-size: $font-size-lg;
      font-weight: 600;
      color: $text-color;
    }
  }
}

.ability-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-base;
  
  .ability-item {
    .ability-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: $spacing-xs;
      
      .ability-name {
        font-size: $font-size-base;
        color: $text-color;
      }
      
      .ability-score {
        font-size: $font-size-base;
        font-weight: 600;
        color: $text-color;
      }
    }
    
    .ability-bar {
      height: 12rpx;
      background: $bg-color;
      border-radius: 6rpx;
      overflow: hidden;
      margin-bottom: $spacing-xs;
      
      .ability-fill {
        height: 100%;
        border-radius: 6rpx;
      }
    }
    
    .ability-desc {
      font-size: $font-size-sm;
      color: $text-secondary;
    }
  }
}

.knowledge-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-base;
  
  .knowledge-item {
    .knowledge-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: $spacing-xs;
      
      .knowledge-name {
        font-size: $font-size-base;
        color: $text-color;
      }
      
      .knowledge-tag {
        font-size: $font-size-xs;
        padding: 4rpx 12rpx;
        border-radius: $radius-sm;
        
        &.掌握 {
          background: rgba($primary-color, 0.1);
          color: $primary-color;
        }
        
        &.熟悉 {
          background: rgba(#3b82f6, 0.1);
          color: #3b82f6;
        }
        
        &.了解 {
          background: rgba(#f59e0b, 0.1);
          color: #f59e0b;
        }
      }
    }
    
    .knowledge-bar {
      height: 8rpx;
      background: $bg-color;
      border-radius: 4rpx;
      overflow: hidden;
      
      .knowledge-fill {
        height: 100%;
        border-radius: 4rpx;
      }
    }
  }
}

.suggestion-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-sm;
  
  .suggestion-item {
    display: flex;
    align-items: flex-start;
    
    .suggestion-icon {
      font-size: 32rpx;
      margin-right: $spacing-sm;
    }
    
    .suggestion-text {
      font-size: $font-size-base;
      color: $text-secondary;
      line-height: 1.6;
    }
  }
}

.action-section {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  gap: $spacing-base;
  padding: $spacing-base;
  padding-bottom: calc(#{$spacing-base} + #{$safe-bottom});
  background: $bg-white;
  box-shadow: 0 -2rpx 16rpx rgba(0, 0, 0, 0.08);
  
  .action-btn {
    flex: 1;
    height: 88rpx;
    font-size: $font-size-base;
    font-weight: 600;
    border-radius: $radius-base;
    
    &.primary {
      background: $primary-color;
      color: #ffffff;
      border: none;
    }
    
    &.secondary {
      background: $bg-color;
      color: $text-color;
      border: none;
    }
  }
}
</style>
