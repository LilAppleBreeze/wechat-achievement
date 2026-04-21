# 🌐 部署到公网 - 完整指南

让你的微信扫码页面在**任何地方都能访问**（不需要局域网）

---

## 🚀 方案 A: Vercel 部署（5 分钟，推荐）

### ✅ 优点
- 完全免费
- 自动 HTTPS
- 全球 CDN 加速
- 国内访问速度快
- 永久有效

### 步骤 1: 准备 GitHub 账号

1. 访问 https://github.com
2. 注册账号（如果还没有）

### 步骤 2: 上传代码到 GitHub

打开 PowerShell，执行：

```powershell
cd C:\Users\admin\.openclaw\workspace\wechat-achievement

# 初始化 Git
git init

# 创建 .gitignore
echo "node_modules/" > .gitignore

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"
```

### 步骤 3: 创建 GitHub 仓库

1. 访问 https://github.com/new
2. 仓库名：`wechat-achievement`
3. 选择 **Public**（公开）
4. 点击 **Create repository**

### 步骤 4: 推送到 GitHub

```powershell
# 关联远程仓库（替换 YOUR_USERNAME 为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/wechat-achievement.git

# 推送
git branch -M main
git push -u origin main
```

### 步骤 5: 部署到 Vercel

1. **访问 Vercel**: https://vercel.com
2. **用 GitHub 登录**
3. **点击 "New Project"**
4. **选择 `wechat-achievement` 仓库**
5. **点击 "Deploy"**（无需修改任何配置）

### 步骤 6: 获得公网 URL

部署完成后（约 1 分钟），你会看到：

```
✅ Your deployment is ready!

https://wechat-achievement-xxx.vercel.app
```

### 步骤 7: 生成二维码

访问你的公网 URL：
```
https://wechat-achievement-xxx.vercel.app
```

**这就是你的公网地址！任何人访问这个链接都能看到页面。**

要生成二维码：
1. 用手机访问这个 URL
2. 截图保存
3. 或者用二维码生成器生成二维码

---

## 📱 方案 B: Netlify 部署（同样简单）

### 步骤 1: 访问 Netlify

https://www.netlify.com

### 步骤 2: 用 GitHub 登录

### 步骤 3: 选择仓库

选择 `wechat-achievement`

### 步骤 4: 配置

```
Site name: wechat-achievement
Branch: main
Build command: (留空)
Publish directory: public
```

### 步骤 5: 点击 "Deploy site"

### 获得 URL：
```
https://wechat-achievement.netlify.app
```

---

## ☁️ 方案 C: Cloudflare Pages（推荐）

### 步骤 1: 访问 Cloudflare

https://pages.cloudflare.com

### 步骤 2: 用 GitHub 登录

### 步骤 3: 连接仓库

选择 `wechat-achievement`

### 步骤 4: 配置

```
Production branch: main
Build command: (留空)
Build output directory: public
```

### 步骤 5: 点击 "Deploy"

### 获得 URL：
```
https://wechat-achievement.pages.dev
```

---

## 🔗 方案 D: 内网穿透（临时测试）

如果只是临时测试，可以用内网穿透：

### 使用 ngrok

```powershell
# 安装 ngrok
npm install -g ngrok

# 启动本地服务器
cd C:\Users\admin\.openclaw\workspace\wechat-achievement
npm start

# 在另一个窗口启动 ngrok
ngrok http 3000
```

会生成类似这样的 URL：
```
https://abc123.ngrok.io
```

**缺点**：
- 每次重启 URL 都会变
- 速度较慢
- 不适合长期使用

---

## 🎯 推荐：Vercel 完整流程

### 完整命令（复制粘贴执行）

```powershell
# 1. 进入项目目录
cd C:\Users\admin\.openclaw\workspace\wechat-achievement

# 2. 初始化 Git
git init

# 3. 创建 .gitignore
echo "node_modules/" > .gitignore

# 4. 添加所有文件
git add .

# 5. 提交
git commit -m "Initial commit"

# 6. 修改远程仓库 URL（替换为你的 GitHub 用户名）
git remote add origin https://github.com/YOUR_USERNAME/wechat-achievement.git

# 7. 推送
git branch -M main
git push -u origin main
```

### 然后：

1. 访问 https://vercel.com/new
2. 用 GitHub 登录
3. 导入 `wechat-achievement` 仓库
4. 点击 Deploy
5. 完成！

---

## 📤 生成二维码

部署完成后，你有两个选择：

### 方法 1: 直接访问

```
https://your-site.vercel.app
```

用手机访问，然后截图。

### 方法 2: 使用二维码生成器

访问任意二维码生成网站：
- https://www.qr-code-generator.com
- https://cli.im

输入你的 Vercel URL，生成二维码图片。

---

## 🌍 自定义域名（可选）

如果你想用自定义域名（如 `achievement.yourcompany.com`）：

### Vercel 配置

1. 进入 Vercel Dashboard
2. 选择你的项目
3. Settings → Domains
4. 添加你的域名
5. 按提示配置 DNS

### DNS 配置

在你的域名服务商处添加：

```
类型：CNAME
主机：achievement
值：cname.vercel.com
```

---

## ✅ 验证清单

部署完成后，检查：

- [ ] 手机能访问公网 URL
- [ ] 不连接 WiFi 也能访问（用 4G/5G）
- [ ] 页面加载正常
- [ ] 所有按钮能点击
- [ ] 全屏提示正常显示
- [ ] 分享功能正常

---

## 📊 访问统计

Vercel 提供免费的访问统计：

1. 进入 Vercel Dashboard
2. 选择项目
3. Analytics 标签

可以看到：
- 访问量
- 来源地区
- 设备类型

---

## 🔐 HTTPS 证书

Vercel/Netlify/Cloudflare 都**自动提供 HTTPS**，无需额外配置。

你的 URL 会是：
```
https://your-site.vercel.app  ✅ 安全
```

---

## 💡 常见问题

### Q: 部署后访问很慢？

A: 
- Vercel 在国内有 CDN，应该很快
- 如果慢，试试 Cloudflare Pages
- 或者购买国内服务器

### Q: 微信提示"已停止访问"？

A:
- 域名可能被微信屏蔽
- 使用已备案域名
- 内容确保合规

### Q: 如何更新内容？

A:
```powershell
# 修改代码后
git add .
git commit -m "Update content"
git push

# Vercel 会自动重新部署（约 1 分钟）
```

### Q: 可以完全免费吗？

A: 
- ✅ Vercel: 免费额度足够个人使用
- ✅ Netlify: 免费 100GB/月流量
- ✅ Cloudflare: 完全免费

---

## 📞 需要帮助？

如果遇到问题：
1. 检查 GitHub 仓库是否公开
2. 检查 Vercel 部署日志
3. 尝试重新部署

---

**完成时间**: 2026-04-21  
**推荐方案**: Vercel  
**预计时间**: 5-10 分钟
