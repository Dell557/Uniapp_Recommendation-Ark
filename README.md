# 中科英才教育 - 多端应用

> 武汉中科英才教育科技有限公司官方教育类多端应用

## 📱 项目简介

本项目是基于 **UniApp** 框架开发的教育类多端应用，支持 H5 和微信小程序双端运行，为用户提供在线课程学习、院校信息查询、智能测评等功能。

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue | 3.4.21 | 前端框架 |
| TypeScript | 5.4.5 | 类型安全 |
| UniApp | 3.0.0-alpha | 跨端框架 |
| Pinia | 2.1.7 | 状态管理 |
| uView Plus | 3.2.0 | UI 组件库 |
| Vite | 5.2.8 | 构建工具 |

## ✨ 功能模块

### 🏠 主页面
- **首页** - 课程推荐、Banner轮播、快捷入口
- **登录** - 手机号登录、密码登录
- **我的** - 用户中心、学习进度、收藏管理

### 📚 视频课程
- 课程列表展示
- 课程详情页
- 视频播放

### 🏛️ 院校库
- 院校列表
- 院校详情
- 院校收藏

### 🧠 智能测评
- 测评答题
- 测评结果分析

### 🎁 营销活动
- 拼团活动
- 优惠券领取

## 📁 项目结构

```
src/
├── pages/                    # 主包页面
│   ├── index/                # 首页
│   ├── login/                # 登录页
│   └── mine/                 # 我的页面
├── subpackages/              # 分包（按需加载）
│   ├── video-course/         # 视频课程模块
│   ├── school-library/       # 院校库模块
│   ├── assessment/           # 智能测评模块
│   └── marketing/            # 营销活动模块
├── store/                    # Pinia 状态管理
├── utils/                    # 工具函数
│   ├── request.ts            # 网络请求封装
│   └── storage.ts            # 本地存储工具
├── styles/                   # 全局样式
├── types/                    # TypeScript 类型定义
├── App.vue                   # 根组件
├── main.ts                   # 入口文件
├── manifest.json             # 应用配置
└── pages.json                # 页面路由配置
```

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
# H5 开发
npm run dev:h5

# 微信小程序开发
npm run dev:mp-weixin
```

### 生产构建

```bash
# H5 构建
npm run build:h5

# 微信小程序构建
npm run build:mp-weixin
```

## 📦 构建产物

- **H5**: `dist/build/h5/`
- **微信小程序**: `dist/build/mp-weixin/`

## 🔧 配置说明

### 环境变量

在 `src/utils/request.ts` 中配置 API 地址：

```typescript
const baseURL = process.env.NODE_ENV === 'production' 
  ? 'https://api.example.com' 
  : 'https://api.example.com'
```

### 页面路由

页面路由配置在 `src/pages.json` 中，支持：
- 主包页面配置
- 分包页面配置（按需加载）
- TabBar 配置

## 📄 License

MIT License

## 📧 联系方式

武汉中科英才教育科技有限公司
