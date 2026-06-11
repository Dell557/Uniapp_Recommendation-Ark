<template>
  <view class="school-list-container">
    <view class="search-bar">
      <view class="search-input-wrapper">
        <text class="search-icon">🔍</text>
        <input 
          v-model="searchKey" 
          placeholder="搜索院校" 
          class="search-input"
          @confirm="handleSearch"
        />
      </view>
    </view>
    
    <view class="filter-area">
      <view class="filter-row">
        <text class="filter-label">省份：</text>
        <scroll-view scroll-x class="filter-scroll">
          <view 
            class="filter-chip" 
            :class="{ active: selectedProvince === '' }"
            @click="selectedProvince = ''"
          >全部</view>
          <view 
            class="filter-chip" 
            :class="{ active: selectedProvince === item }"
            v-for="item in provinces"
            :key="item"
            @click="selectedProvince = item"
          >{{ item }}</view>
        </scroll-view>
      </view>
      <view class="filter-row">
        <text class="filter-label">类型：</text>
        <scroll-view scroll-x class="filter-scroll">
          <view 
            class="filter-chip" 
            :class="{ active: selectedType === '' }"
            @click="selectedType = ''"
          >全部</view>
          <view 
            class="filter-chip" 
            :class="{ active: selectedType === item }"
            v-for="item in schoolTypes"
            :key="item"
            @click="selectedType = item"
          >{{ item }}</view>
        </scroll-view>
      </view>
    </view>
    
    <scroll-view scroll-y class="school-scroll" @scrolltolower="loadMore">
      <view class="school-list">
        <view class="school-item" v-for="(school, index) in schools" :key="index" @click="goToDetail(school)">
          <image :src="school.logo" mode="aspectFill" class="school-logo" />
          <view class="school-info">
            <view class="school-header">
              <text class="school-name">{{ school.name }}</text>
              <text class="school-tag" v-if="school.tag">{{ school.tag }}</text>
            </view>
            <text class="school-location">{{ school.location }} · {{ school.type }}</text>
            <view class="school-ranking">
              <text class="ranking-label">排名：</text>
              <text class="ranking-value">{{ school.ranking }}</text>
            </view>
          </view>
          <view class="school-favorite" @click.stop="toggleFavorite(school)">
            <text>{{ school.favorited ? '❤️' : '🤍' }}</text>
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

interface School {
  id: string
  name: string
  logo: string
  location: string
  type: string
  tag?: string
  ranking: string
  favorited: boolean
}

const searchKey = ref('')
const selectedProvince = ref('')
const selectedType = ref('')
const loading = ref(false)
const hasMore = ref(true)

const provinces = ['北京', '上海', '广东', '江苏', '浙江', '湖北', '湖南', '四川', '陕西']
const schoolTypes = ['985', '211', '双一流', '普通本科']

const schools = ref<School[]>([
  { id: '1', name: '清华大学', logo: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=university%20campus%20traditional%20chinese%20architecture&image_size=square', location: '北京', type: '综合', tag: '985', ranking: '全国第1', favorited: true },
  { id: '2', name: '北京大学', logo: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=beijing%20university%20modern%20campus&image_size=square', location: '北京', type: '综合', tag: '985', ranking: '全国第2', favorited: false },
  { id: '3', name: '复旦大学', logo: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=fudan%20university%20campus%20lake&image_size=square', location: '上海', type: '综合', tag: '985', ranking: '全国第3', favorited: false },
  { id: '4', name: '上海交通大学', logo: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=shanghai%20jiaotong%20university%20modern&image_size=square', location: '上海', type: '理工', tag: '985', ranking: '全国第4', favorited: false },
  { id: '5', name: '浙江大学', logo: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=zhejiang%20university%20nature%20campus&image_size=square', location: '浙江', type: '综合', tag: '985', ranking: '全国第5', favorited: true },
  { id: '6', name: '武汉大学', logo: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=wuhan%20university%20cherry%20blossom&image_size=square', location: '湖北', type: '综合', tag: '985', ranking: '全国第9', favorited: false }
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

const goToDetail = (school: School) => {
  uni.navigateTo({ url: `/subpackages/school-library/detail/index?id=${school.id}` })
}

const toggleFavorite = (school: School) => {
  school.favorited = !school.favorited
  uni.showToast({ 
    title: school.favorited ? '已收藏' : '已取消收藏', 
    icon: 'none' 
  })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.school-list-container {
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

.filter-area {
  background: $bg-white;
  padding: $spacing-base;
  border-bottom: 1rpx solid $divider-color;
  
  .filter-row {
    display: flex;
    align-items: center;
    margin-bottom: $spacing-sm;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    .filter-label {
      font-size: $font-size-base;
      color: $text-secondary;
      width: 100rpx;
      flex-shrink: 0;
    }
    
    .filter-scroll {
      flex: 1;
      white-space: nowrap;
    }
    
    .filter-chip {
      display: inline-block;
      padding: $spacing-xs $spacing-base;
      font-size: $font-size-sm;
      color: $text-secondary;
      background: $bg-color;
      border-radius: $radius-lg;
      margin-right: $spacing-sm;
      
      &.active {
        background: $primary-light;
        color: $primary-color;
      }
    }
  }
}

.school-scroll {
  height: calc(100vh - 280rpx);
  padding: $spacing-base;
}

.school-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-base;
}

.school-item {
  display: flex;
  align-items: center;
  background: $bg-white;
  border-radius: $radius-lg;
  padding: $spacing-base;
  box-shadow: $shadow-sm;
  
  .school-logo {
    width: 120rpx;
    height: 120rpx;
    border-radius: $radius-base;
    flex-shrink: 0;
  }
  
  .school-info {
    flex: 1;
    margin-left: $spacing-base;
    
    .school-header {
      display: flex;
      align-items: center;
      margin-bottom: $spacing-xs;
      
      .school-name {
        font-size: $font-size-lg;
        font-weight: 600;
        color: $text-color;
      }
      
      .school-tag {
        font-size: $font-size-xs;
        color: $primary-color;
        background: $primary-light;
        padding: 4rpx 12rpx;
        border-radius: 4rpx;
        margin-left: $spacing-sm;
      }
    }
    
    .school-location {
      font-size: $font-size-sm;
      color: $text-secondary;
      margin-bottom: $spacing-xs;
    }
    
    .school-ranking {
      display: flex;
      align-items: center;
      
      .ranking-label {
        font-size: $font-size-sm;
        color: $text-light;
      }
      
      .ranking-value {
        font-size: $font-size-sm;
        color: #ef4444;
        font-weight: 500;
      }
    }
  }
  
  .school-favorite {
    font-size: 40rpx;
    padding: $spacing-sm;
  }
}

.load-more, .no-more {
  text-align: center;
  padding: $spacing-base;
  color: $text-light;
  font-size: $font-size-sm;
}
</style>
