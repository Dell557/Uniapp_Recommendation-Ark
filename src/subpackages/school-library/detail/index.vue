<template>
  <view class="school-detail-container">
    <scroll-view scroll-y class="detail-scroll">
      <view class="school-header">
        <image :src="school.cover" mode="aspectFill" class="school-cover" />
        <view class="school-info">
          <image :src="school.logo" mode="aspectFill" class="school-logo" />
          <text class="school-name">{{ school.name }}</text>
          <text class="school-tag">{{ school.tag }}</text>
        </view>
      </view>
      
      <view class="stats-row">
        <view class="stat-item">
          <text class="stat-value">{{ school.ranking }}</text>
          <text class="stat-label">全国排名</text>
        </view>
        <view class="stat-divider"></view>
        <view class="stat-item">
          <text class="stat-value">{{ school.founded }}</text>
          <text class="stat-label">创办时间</text>
        </view>
        <view class="stat-divider"></view>
        <view class="stat-item">
          <text class="stat-value">{{ school.students }}</text>
          <text class="stat-label">在校学生</text>
        </view>
      </view>
      
      <view class="section">
        <view class="section-header">
          <text class="section-title">学校简介</text>
        </view>
        <view class="school-desc">
          <text>{{ school.description }}</text>
        </view>
      </view>
      
      <view class="section">
        <view class="section-header">
          <text class="section-title">优势专业</text>
        </view>
        <view class="major-list">
          <view class="major-item" v-for="(major, index) in school.majors" :key="index">
            <text>{{ major }}</text>
          </view>
        </view>
      </view>
      
      <view class="section">
        <view class="section-header">
          <text class="section-title">历年分数线</text>
        </view>
        <view class="score-table">
          <view class="score-row header">
            <text class="score-col">年份</text>
            <text class="score-col">文科</text>
            <text class="score-col">理科</text>
          </view>
          <view class="score-row" v-for="(score, index) in school.scores" :key="index">
            <text class="score-col">{{ score.year }}</text>
            <text class="score-col">{{ score.arts }}</text>
            <text class="score-col">{{ score.science }}</text>
          </view>
        </view>
      </view>
      
      <view class="section">
        <view class="section-header">
          <text class="section-title">学校风光</text>
        </view>
        <scroll-view scroll-x class="gallery-scroll">
          <view class="gallery-list">
            <image 
              v-for="(img, index) in school.gallery" 
              :key="index" 
              :src="img" 
              mode="aspectFill" 
              class="gallery-item"
            />
          </view>
        </scroll-view>
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
      </view>
      <view class="bottom-right">
        <button class="consult-btn">咨询老师</button>
        <button class="apply-btn">预约报名</button>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const school = reactive({
  id: '1',
  name: '清华大学',
  tag: '985 / 211 / 双一流',
  logo: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=tsinghua%20university%20emblem%20logo&image_size=square',
  cover: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=tsinghua%20university%20campus%20gate%20traditional&image_size=landscape_16_9',
  ranking: '第1名',
  founded: '1911年',
  students: '5万+',
  location: '北京市',
  description: '清华大学是中国著名高等学府，坐落于北京西北郊风景秀丽的清华园，是中国高层次人才培养和科学技术研究的重要基地。学校始终与国家和民族的命运紧密相连，为国家培养了大批优秀人才。',
  majors: ['计算机科学', '电气工程', '土木工程', '经济管理', '建筑学', '数学', '物理', '化学'],
  scores: [
    { year: '2023', arts: '685', science: '690' },
    { year: '2022', arts: '680', science: '688' },
    { year: '2021', arts: '675', science: '685' }
  ],
  gallery: [
    'https://neeko-copilot.bytedance.net/api/text2image?prompt=university%20campus%20lake%20scenery&image_size=portrait_4_3',
    'https://neeko-copilot.bytedance.net/api/text2image?prompt=university%20library%20modern%20architecture&image_size=portrait_4_3',
    'https://neeko-copilot.bytedance.net/api/text2image?prompt=university%20sports%20stadium&image_size=portrait_4_3',
    'https://neeko-copilot.bytedance.net/api/text2image?prompt=university%20classroom%20lecture&image_size=portrait_4_3'
  ]
})

const favorited = ref(false)

const handleFavorite = () => {
  favorited.value = !favorited.value
  uni.showToast({ title: favorited.value ? '已收藏' : '已取消收藏', icon: 'none' })
}

const handleShare = () => {
  uni.showToast({ title: '分享功能开发中', icon: 'none' })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.school-detail-container {
  min-height: 100vh;
  background: $bg-color;
}

.detail-scroll {
  height: 100vh;
  padding-bottom: calc(120rpx + #{$safe-bottom});
}

.school-header {
  position: relative;
  
  .school-cover {
    width: 100%;
    height: 320rpx;
  }
  
  .school-info {
    position: relative;
    background: $bg-white;
    margin: 0 $spacing-base;
    margin-top: -60rpx;
    border-radius: $radius-lg;
    padding: $spacing-base;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: $shadow-base;
    
    .school-logo {
      width: 120rpx;
      height: 120rpx;
      border-radius: $radius-base;
      margin-bottom: $spacing-sm;
    }
    
    .school-name {
      font-size: $font-size-xl;
      font-weight: 700;
      color: $text-color;
      margin-bottom: $spacing-xs;
    }
    
    .school-tag {
      font-size: $font-size-sm;
      color: $primary-color;
      background: $primary-light;
      padding: 4rpx 16rpx;
      border-radius: $radius-sm;
    }
  }
}

.stats-row {
  display: flex;
  background: $bg-white;
  margin: $spacing-base;
  border-radius: $radius-lg;
  padding: $spacing-base;
  
  .stat-item {
    flex: 1;
    text-align: center;
    
    .stat-value {
      display: block;
      font-size: $font-size-xl;
      font-weight: 700;
      color: $primary-color;
      margin-bottom: $spacing-xs;
    }
    
    .stat-label {
      font-size: $font-size-sm;
      color: $text-secondary;
    }
  }
  
  .stat-divider {
    width: 1rpx;
    background: $border-color;
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

.school-desc {
  font-size: $font-size-base;
  color: $text-secondary;
  line-height: 1.8;
}

.major-list {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-sm;
  
  .major-item {
    background: $bg-color;
    padding: $spacing-xs $spacing-base;
    border-radius: $radius-lg;
    font-size: $font-size-sm;
    color: $text-color;
  }
}

.score-table {
  .score-row {
    display: flex;
    padding: $spacing-sm 0;
    
    &.header {
      font-weight: 600;
      color: $text-secondary;
      border-bottom: 1rpx solid $border-color;
    }
    
    .score-col {
      flex: 1;
      text-align: center;
      font-size: $font-size-sm;
      color: $text-color;
    }
  }
}

.gallery-scroll {
  white-space: nowrap;
}

.gallery-list {
  display: inline-flex;
  gap: $spacing-sm;
  
  .gallery-item {
    width: 200rpx;
    height: 150rpx;
    border-radius: $radius-base;
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
    display: flex;
    gap: $spacing-sm;
    
    .consult-btn {
      background: $primary-light;
      color: $primary-color;
      font-size: $font-size-base;
      padding: $spacing-sm $spacing-lg;
      border-radius: $radius-base;
      border: none;
    }
    
    .apply-btn {
      background: $primary-color;
      color: #ffffff;
      font-size: $font-size-base;
      padding: $spacing-sm $spacing-lg;
      border-radius: $radius-base;
      border: none;
    }
  }
}
</style>
