# 📦 Finance Now - 更新日志

## v1.1.0 (2026-02-24)

### ✨ 新增功能

1. **真实 API 集成**
   - ✅ 添加 Tavily API 调用（财经新闻搜索）
   - ✅ 添加 AkShare API 集成（中国市场数据）
   - ✅ 添加 OpenBB API 集成（全球市场数据）
   - ✅ Mock 数据和真实 API 可切换

2. **部署配置**
   - ✅ Vercel 一键部署配置
   - ✅ Docker 容器化支持
   - ✅ Docker Compose 完整栈部署
   - ✅ Nginx 生产配置

3. **文档完善**
   - ✅ 详细的部署指南（DEPLOYMENT.md）
   - ✅ 环境变量示例（.env.example）
   - ✅ Docker 部署说明

### 🔧 技术改进

1. **API 架构**
   ```
   src/services/
   ├── api.ts        # Mock 数据（开发）
   ├── realApi.ts    # 真实 API（生产）
   └── index.ts      # 智能切换
   ```

2. **环境变量支持**
   - `VITE_USE_REAL_API`: 是否使用真实 API
   - `VITE_TAVILY_API_KEY`: Tavily API 密钥
   - `VITE_AKSHARE_API_URL`: AkShare 服务地址
   - `VITE_OPENBB_API_URL`: OpenBB 服务地址

3. **部署方案**
   - Vercel (推荐)
   - Netlify
   - Docker
   - 腾讯云服务器

### 📝 使用说明

#### 开发模式（Mock 数据）

```bash
npm install
npm run dev
```

#### 生产模式（真实 API）

```bash
# 1. 配置环境变量
cp .env.example .env

# 2. 编辑 .env
VITE_USE_REAL_API=true
VITE_TAVILY_API_KEY=your_key
VITE_AKSHARE_API_URL=http://localhost:8000
VITE_OPENBB_API_URL=http://localhost:8001

# 3. 启动后端服务
cd ../dexter-finance/python-service && ./start.sh &
cd ../dexter-finance/openbb-service && ./start.sh &

# 4. 启动前端
npm run dev
```

#### Docker 部署

```bash
# 完整栈部署（前端 + 后端）
docker-compose up -d

# 仅前端
docker build -t finance-now .
docker run -p 80:80 finance-now
```

### 🚀 快速部署到 Vercel

1. Fork 仓库到你的 GitHub
2. 访问 https://vercel.com/new
3. 导入仓库
4. 配置环境变量
5. 点击部署

### 🔗 相关链接

- **GitHub**: https://github.com/zhujun-123/finance-now
- **API 后端**: https://github.com/zhujun-123/dexter-finance
- **演示站点**: Coming soon...

### 📊 项目统计

- **新增文件**: 8 个
- **新增代码**: ~600 行
- **支持部署方式**: 4 种
- **环境变量**: 4 个
