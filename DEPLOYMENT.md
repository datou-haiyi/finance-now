# 🚀 Finance Now - 部署指南

## 📦 部署选项

### 选项 1: Vercel（推荐）

#### 1.1 通过 GitHub 自动部署

1. 访问 [Vercel](https://vercel.com)
2. 点击 "New Project"
3. 导入 GitHub 仓库: `zhujun-123/finance-now`
4. 配置环境变量：
   ```
   VITE_TAVILY_API_KEY=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
   VITE_AKSHARE_API_URL=https://your-akshare-api.com
   VITE_OPENBB_API_URL=https://your-openbb-api.com
   ```
5. 点击 "Deploy"

#### 1.2 通过 CLI 部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
cd finance-now
vercel --prod
```

部署后会得到一个 URL，例如: `https://finance-now.vercel.app`

---

### 选项 2: Netlify

#### 2.1 通过 GitHub 自动部署

1. 访问 [Netlify](https://netlify.com)
2. 点击 "New site from Git"
3. 选择 GitHub 仓库: `zhujun-123/finance-now`
4. 构建设置：
   - Build command: `npm run build`
   - Publish directory: `dist`
5. 环境变量（同 Vercel）
6. 点击 "Deploy site"

#### 2.2 通过 CLI 部署

```bash
# 安装 Netlify CLI
npm i -g netlify-cli

# 登录
netlify login

# 部署
cd finance-now
npm run build
netlify deploy --prod --dir=dist
```

---

### 选项 3: Docker 部署

#### 3.1 创建 Dockerfile

```dockerfile
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### 3.2 创建 nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### 3.3 构建和运行

```bash
# 构建镜像
docker build -t finance-now .

# 运行容器
docker run -d -p 80:80 \
  -e VITE_TAVILY_API_KEY=your_key \
  -e VITE_AKSHARE_API_URL=http://your-server:8000 \
  -e VITE_OPENBB_API_URL=http://your-server:8001 \
  finance-now
```

---

### 选项 4: 腾讯云服务器部署

#### 4.1 部署后端服务（AkShare + OpenBB）

```bash
# SSH 到服务器
ssh root@43.162.121.13

# 部署 AkShare 服务
cd /root/dexter-finance/python-service
./start.sh &

# 部署 OpenBB 服务
cd /root/dexter-finance/openbb-service
./start.sh &

# 使用 systemd 管理服务（可选）
sudo systemctl start akshare-service
sudo systemctl start openbb-service
```

#### 4.2 部署前端

```bash
# 在服务器上
cd /root/finance-now
npm install
npm run build

# 使用 Nginx 部署
sudo apt install nginx
sudo cp -r dist/* /var/www/finance-now/

# Nginx 配置
sudo nano /etc/nginx/sites-available/finance-now
```

Nginx 配置内容：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/finance-now;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # API 代理
    location /api/akshare/ {
        proxy_pass http://localhost:8000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api/openbb/ {
        proxy_pass http://localhost:8001/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

启用站点：

```bash
sudo ln -s /etc/nginx/sites-available/finance-now /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## 🔧 API 服务部署

### AkShare 服务

```bash
# 创建 systemd 服务
sudo nano /etc/systemd/system/akshare-service.service
```

内容：

```ini
[Unit]
Description=AkShare API Service
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/root/dexter-finance/python-service
ExecStart=/root/dexter-finance/python-service/venv/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000
Restart=always

[Install]
WantedBy=multi-user.target
```

启动服务：

```bash
sudo systemctl daemon-reload
sudo systemctl enable akshare-service
sudo systemctl start akshare-service
sudo systemctl status akshare-service
```

### OpenBB 服务

同样创建 systemd 服务，端口改为 8001。

---

## 🌐 域名和 SSL

### 使用 Cloudflare（推荐）

1. 在 Cloudflare 添加域名
2. 设置 DNS 记录指向服务器 IP
3. 开启 SSL/TLS（自动）
4. 开启 CDN 加速

### 使用 Let's Encrypt

```bash
# 安装 Certbot
sudo apt install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d your-domain.com

# 自动续期
sudo certbot renew --dry-run
```

---

## 📊 监控和日志

### PM2 进程管理（Node.js）

```bash
# 安装 PM2
npm install -g pm2

# 启动应用
pm2 start npm --name finance-now -- run preview

# 查看日志
pm2 logs finance-now

# 重启
pm2 restart finance-now

# 开机自启
pm2 startup
pm2 save
```

### Nginx 日志

```bash
# 访问日志
tail -f /var/log/nginx/access.log

# 错误日志
tail -f /var/log/nginx/error.log
```

---

## 🔒 安全建议

1. **API Key 安全**
   - 不要将 API Key 提交到 Git
   - 使用环境变量管理
   - 定期轮换密钥

2. **HTTPS**
   - 生产环境必须使用 HTTPS
   - 配置 HSTS 头

3. **CORS 配置**
   - 限制允许的域名
   - 不要使用 `*` 通配符

4. **防火墙**
   ```bash
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw allow 22/tcp
   sudo ufw enable
   ```

---

## ✅ 部署检查清单

- [ ] 环境变量配置完成
- [ ] API 服务正常运行（8000, 8001）
- [ ] 前端构建成功
- [ ] Nginx 配置正确
- [ ] SSL 证书有效
- [ ] 域名解析正确
- [ ] 防火墙规则配置
- [ ] 日志监控设置
- [ ] 备份策略就绪

---

## 🐛 故障排查

### 前端无法连接 API

检查：
1. API 服务是否运行：`curl http://localhost:8000/health`
2. CORS 配置是否正确
3. 环境变量是否正确

### 构建失败

```bash
# 清理缓存
rm -rf node_modules dist
npm install
npm run build
```

### Nginx 502 错误

检查后端服务是否运行：
```bash
sudo systemctl status akshare-service
sudo systemctl status openbb-service
```

---

**部署完成后访问**: `https://your-domain.com`
