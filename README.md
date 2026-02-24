# Finance Now - 金融资讯聚合平台

> NewsNow 风格的实时金融资讯聚合器

![Finance Now](https://img.shields.io/badge/React-18.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan)

## ✨ 特性

- 🎨 **极简设计** - 仿 NewsNow.co.uk 的三栏布局，功能优先
- ⚡ **实时数据** - 聚合 Tavily、AkShare、OpenBB 三大数据源
- 🌓 **深色模式** - 完整的明暗主题切换
- 📱 **响应式** - 完美适配桌面和移动设备
- 🔍 **智能搜索** - 实时过滤和关键词高亮
- 📊 **数据统计** - 侧边栏实时统计和趋势分析

## 🚀 快速开始

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
npm run build
npm run preview
```

## 📁 项目结构

```
finance-now/
├── src/
│   ├── components/          # React 组件
│   │   ├── Header.tsx       # 顶部导航栏
│   │   ├── CategoryNav.tsx  # 分类导航
│   │   ├── NewsList.tsx     # 资讯列表
│   │   ├── NewsCard.tsx     # 单条资讯卡片
│   │   └── Sidebar.tsx      # 侧边栏统计
│   ├── hooks/               # 自定义 Hooks
│   │   ├── useTheme.ts      # 主题切换
│   │   └── useNews.ts       # 资讯数据
│   ├── services/            # API 服务
│   │   └── api.ts           # 数据获取
│   ├── types/               # TypeScript 类型
│   │   └── index.ts
│   ├── App.tsx              # 主应用
│   ├── main.tsx             # 入口文件
│   └── index.css            # 全局样式
├── public/
│   └── favicon.svg
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🎯 核心功能

### 数据源集成

```typescript
// src/services/api.ts 中集成真实 API

// Tavily API
const tavilyNews = await fetch('https://api.tavily.com/search', {
  headers: { 'X-API-Key': process.env.TAVILY_API_KEY }
});

// AkShare 服务
const akshareNews = await fetch('http://localhost:8000/news/cn-stocks');

// OpenBB 服务
const openbbNews = await fetch('http://localhost:8001/news/us-stocks');
```

### 分类系统

- 📰 全部 - 所有资讯聚合
- 🇺🇸 美股 - 美国股市资讯
- 🇨🇳 A股 - 中国 A股资讯
- ₿ 加密 - 加密货币资讯
- 🌐 宏观 - 宏观经济数据

### 设计特点

- **排版** - IBM Plex Mono + Archivo 字体组合
- **配色** - 极简黑白灰 + 红色强调色
- **布局** - 三栏响应式布局
- **动画** - Framer Motion 流畅过渡
- **交互** - 点击展开详情，hover 状态反馈

## 🔌 API 集成指南

### 1. Tavily 搜索 API

```typescript
const TAVILY_API_KEY = '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';

const searchFinanceNews = async (query: string) => {
  const response = await fetch('https://api.tavily.com/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      api_key: TAVILY_API_KEY,
      query: `${query} finance news`,
      search_depth: 'advanced',
      max_results: 20,
    }),
  });
  return response.json();
};
```

### 2. AkShare 服务

```typescript
// 确保 AkShare 服务运行在 localhost:8000
const fetchCNStocks = async () => {
  const response = await fetch('http://localhost:8000/stock/daily/600519');
  return response.json();
};
```

### 3. OpenBB 服务

```typescript
// 确保 OpenBB 服务运行在 localhost:8001
const fetchUSStocks = async () => {
  const response = await fetch('http://localhost:8001/equity/quote/AAPL');
  return response.json();
};
```

## 🎨 主题定制

修改 `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      'finance-accent': '#dc2626',  // 主色调
      'finance-green': '#16a34a',   // 涨
      'finance-red': '#dc2626',     // 跌
    }
  }
}
```

## 📱 响应式断点

- **mobile**: < 768px
- **tablet**: 768px - 1024px
- **desktop**: > 1024px

## 🔧 环境变量

创建 `.env` 文件：

```bash
VITE_TAVILY_API_KEY=your_tavily_key
VITE_AKSHARE_API_URL=http://localhost:8000
VITE_OPENBB_API_URL=http://localhost:8001
```

## 📈 性能优化

- ✅ Vite 快速构建
- ✅ React 18 Concurrent Mode
- ✅ 代码分割和懒加载
- ✅ CSS 按需加载
- ✅ 图片懒加载

## 🚢 部署

### Vercel

```bash
npm run build
# 连接 Vercel 项目
vercel --prod
```

### Netlify

```bash
npm run build
# dist/ 文件夹上传到 Netlify
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🙏 致谢

- [NewsNow.co.uk](https://www.newsnow.co.uk) - 设计灵感
- [Tavily](https://tavily.com) - 搜索 API
- [AkShare](https://github.com/akfamily/akshare) - 中国金融数据
- [OpenBB](https://openbb.co) - 全球金融数据

---

**Live Demo**: Coming soon...
**GitHub**: [zhujun-123/dexter-finance](https://github.com/zhujun-123/dexter-finance)
