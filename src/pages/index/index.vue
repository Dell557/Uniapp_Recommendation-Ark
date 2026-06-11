<template>
  <view class="container">
    <view class="banner">
      <swiper autoplay circular indicator-dots indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#ffffff">
        <swiper-item v-for="(item, index) in banners" :key="index">
          <image :src="item.image" mode="aspectFill" class="banner-image" />
        </swiper-item>
      </swiper>
    </view>
    
    <view class="quick-entry">
      <view class="entry-title">快速入口</view>
      <view class="entry-grid">
        <view class="entry-item" v-for="(item, index) in quickEntries" :key="index" @click="handleEntryClick(item)">
          <view class="entry-icon" :style="{ background: item.bgColor }">
            <text class="icon-text">{{ item.icon }}</text>
          </view>
          <text class="entry-name">{{ item.name }}</text>
        </view>
      </view>
    </view>
    
    <view class="section">
      <view class="section-header">
        <text class="section-title">热门课程</text>
        <text class="section-more" @click="goToVideoCourse">更多</text>
      </view>
      <view class="course-list">
        <view class="course-item" v-for="(course, index) in hotCourses" :key="index">
          <image :src="course.cover" mode="aspectFill" class="course-cover" />
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
    </view>
    
    <view class="section">
      <view class="section-header">
        <text class="section-title">推荐院校</text>
        <text class="section-more" @click="goToSchoolLibrary">更多</text>
      </view>
      <scroll-view scroll-x class="school-scroll">
        <view class="school-list">
          <view class="school-item" v-for="(school, index) in recommendSchools" :key="index">
            <image :src="school.logo" mode="aspectFill" class="school-logo" />
            <text class="school-name">{{ school.name }}</text>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const banners = ref([
  { image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=education%20banner%20with%20graduation%20cap%20and%20books%20blue%20theme&image_size=landscape_16_9' },
  { image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=online%20learning%20platform%20modern%20design%20green%20theme&image_size=landscape_16_9' },
  { image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=college%20admission%20preparation%20study%20desk%20with%20books&image_size=landscape_16_9' }
])

const quickEntries = ref([
  { name: '视频课程', icon: '📚', bgColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', path: '/subpackages/video-course/list/index' },
  { name: '院校库', icon: '🏫', bgColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', path: '/subpackages/school-library/list/index' },
  { name: '智能测评', icon: '📊', bgColor: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', path: '/subpackages/assessment/index/index' },
  { name: '优惠券', icon: '🎁', bgColor: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', path: '/subpackages/marketing/coupon/index' }
])

const hotCourses = ref([
  { title: '高考数学冲刺班', teacher: '张老师', price: 299, count: 1280, cover: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=math%20education%20classroom%20chalkboard%20with%20formulas&image_size=landscape_4_3' },
  { title: '英语听力专项突破', teacher: '李老师', price: 199, count: 890, cover: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=english%20learning%20books%20headphones%20study%20desk&image_size=landscape_4_3' },
  { title: '物理实验精讲', teacher: '王老师', price: 249, count: 650, cover: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=physics%20laboratory%20experiment%20equipment%20science&image_size=landscape_4_3' }
])

const recommendSchools = ref([
  { name: '清华大学', logo: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=university%20campus%20gate%20traditional%20chinese%20architecture&image_size=square' },
  { name: '北京大学', logo: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=beijing%20university%20campus%20modern%20building&image_size=square' },
  { name: '复旦大学', logo: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=fudan%20university%20campus%20lake%20and%20buildings&image_size=square' },
  { name: '上海交大', logo: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=shanghai%20jiaotong%20university%20campus%20modern&image_size=square' },
  { name: '浙江大学', logo: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=zhejiang%20university%20campus%20nature%20scenery&image_size=square' }
])

const handleEntryClick = (item: { path: string }) => {
  uni.navigateTo({ url: item.path })
}

const goToVideoCourse = () => {
  uni.navigateTo({ url: '/subpackages/video-course/list/index' })
}

const goToSchoolLibrary = () => {
  uni.navigateTo({ url: '/subpackages/school-library/list/index' })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.container {
  min-height: 100vh;
  background: $bg-color;
  padding-bottom: calc(120rpx + #{$safe-bottom});
}

.banner {
  width: 100%;
  height: 320rpx;
  
  .banner-image {
    width: 100%;
    height: 100%;
  }
}

.quick-entry {
  background: $bg-white;
  margin: $spacing-base;
  border-radius: $radius-lg;
  padding: $spacing-base;
  box-shadow: $shadow-sm;
  
  .entry-title {
    font-size: $font-size-lg;
    font-weight: 600;
    color: $text-color;
    margin-bottom: $spacing-base;
  }
  
  .entry-grid {
    display: flex;
    flex-wrap: wrap;
  }
  
  .entry-item {
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: $spacing-sm 0;
    
    .entry-icon {
      width: 100rpx;
      height: 100rpx;
      border-radius: $radius-lg;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: $spacing-xs;
      
      .icon-text {
        font-size: 40rpx;
      }
    }
    
    .entry-name {
      font-size: $font-size-sm;
      color: $text-color;
    }
  }
}

.section {
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
      color: $primary-color;
    }
  }
}

.course-list {
  display: flex;
  flex-direction: column;
  gap: $spacing-base;
}

.course-item {
  display: flex;
  gap: $spacing-base;
  
  .course-cover {
    width: 200rpx;
    height: 150rpx;
    border-radius: $radius-base;
    flex-shrink: 0;
  }
  
  .course-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    .course-title {
      font-size: $font-size-base;
      font-weight: 500;
      color: $text-color;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    
    .course-teacher {
      font-size: $font-size-sm;
      color: $text-secondary;
    }
    
    .course-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .course-price {
        font-size: $font-size-base;
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

.school-scroll {
  white-space: nowrap;
}

.school-list {
  display: inline-flex;
  gap: $spacing-base;
}

.school-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .school-logo {
    width: 120rpx;
    height: 120rpx;
    border-radius: $radius-base;
    margin-bottom: $spacing-xs;
  }
  
  .school-name {
    font-size: $font-size-sm;
    color: $text-color;
    white-space: nowrap;
  }
}
</style>
