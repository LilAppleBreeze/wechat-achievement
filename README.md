#  微信扫码展示系统

完整的微信扫码查看成果展示系统，类似深圳市鑫信腾科技股份有限公司的成果展示页面。

##  快速开始

### 1. 安装依赖

```bash
cd wechat-achievement
npm install
```

### 2. 启动服务器

```bash
npm start
```

### 3. 访问页面

- **生成二维码**: http://localhost:3000/generate/demo001
- **查看页面**: http://localhost:3000/view/demo001
- **API 接口**: http://localhost:3000/api/achievement/demo001

---

## 📱 功能特性

### ✅ 核心功能

- [x] 微信扫码打开 H5 页面
- [x] 全屏模式提示弹窗
- [x] 企业/成果信息展示
- [x] 底部固定操作栏（分享/电话/导航）
- [x] 响应式设计（适配所有手机屏幕）
- [x] 一键复制微信号
- [x] 地图导航集成
- [x] 分享引导

### 🎨 界面特点

- 渐变蓝色背景（类似示例）
- 毛玻璃效果顶部导航
- 圆角卡片式设计
- 流畅动画过渡
- 加载状态提示

---

## 📂 文件结构

```
wechat-achievement/
├── server.js              # 后端服务器
├── package.json           # 项目配置
├── public/
│   └── view.html          # 前端展示页面
└── README.md             # 说明文档
```

---

## 🔧 自定义配置

### 修改成果数据

编辑 `server.js` 中的 `achievements` Map:

```javascript
achievements.set('demo001', {
  id: 'demo001',
  title: '你的成果标题',
  company: '公司名称',
  description: '成果描述',
  content: '<h2>详细内容</h2>...',
  address: '公司地址',
  phone: '联系电话',
  wechat: '微信号',
  location: {
    lat: 22.5428,  // 纬度
    lng: 114.0543  // 经度
  }
})
```

### 修改颜色主题

编辑 `view.html` 中的 CSS:

```css
body {
  /* 修改背景渐变 */
  background: linear-gradient(180deg, #1a3a8f 0%, #0d1b3e 100%);
}

.honor-tag {
  /* 修改标签渐变 */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.btn-confirm {
  /* 修改按钮渐变 */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

---

## 📤 生成二维码

### 方法 1: 访问生成页面

```
http://localhost:3000/generate/demo001
```

页面会显示二维码，可以：
- 📱 手机截图后微信扫码
- 🖨️ 点击"打印二维码"打印出来
- 👁️ 点击"预览页面"查看效果

### 方法 2: 使用 API

```bash
curl -X POST http://localhost:3000/api/qrcode \
  -H "Content-Type: application/json" \
  -d '{
    "title": "我的成果",
    "company": "我的公司",
    "description": "成果描述"
  }'
```

返回：
```json
{
  "id": "ach_xxxxx",
  "qrImage": "data:image/png;base64,...",
  "viewUrl": "http://localhost:3000/view/ach_xxxxx",
  "generateUrl": "http://localhost:3000/generate/ach_xxxxx"
}
```

---

## 🌐 部署到生产环境

### 1. 购买域名和服务器

- 域名：例如 `yourcompany.com`
- 服务器：腾讯云/阿里云（最低配置即可）

### 2. 配置 HTTPS（必须）

微信小程序要求 HTTPS，可以使用：
- 免费：Let's Encrypt
- 付费：阿里云 SSL 证书

### 3. 上传代码

```bash
# 使用 SCP 或 FTP 上传
scp -r wechat-achievement/ user@your-server:/var/www/
```

### 4. 启动服务

```bash
# 安装 PM2（推荐）
npm install -g pm2

# 启动
pm2 start server.js --name wechat-achievement

# 开机自启
pm2 startup
pm2 save
```

### 5. 配置 Nginx（可选）

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 📊 数据统计

### 查看浏览量

```javascript
// 在 server.js 中添加统计接口
app.get('/api/stats/:id', (req, res) => {
  const achievement = achievements.get(req.params.id)
  res.json({
    views: achievement.views,
    lastViewed: achievement.lastViewed
  })
})
```

---

## 🔐 安全考虑

### 1. 防止刷量

```javascript
const rateLimit = require('express-rate-limit')

const viewLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 小时
  max: 100 // 最多 100 次
})

app.use('/view/:id', viewLimiter)
```

### 2. 数据验证

```javascript
app.post('/api/qrcode', (req, res) => {
  const { title, company } = req.body
  
  // 验证输入
  if (!title || title.length > 100) {
    return res.status(400).json({ error: '标题不合法' })
  }
  
  // ...
})
```

---

## 🧪 测试清单

- [ ] 微信扫码能打开页面
- [ ] 全屏提示正常显示
- [ ] 点击"确定"进入全屏
- [ ] 分享功能正常
- [ ] 电话拨打正常
- [ ] 导航跳转正常
- [ ] 复制微信号正常
- [ ] 页面加载流畅
- [ ] 所有动画正常

---

## 📝 常见问题

### Q: 微信扫码后提示"已停止访问该网页"？

A: 域名可能被微信屏蔽，需要：
1. 使用已备案域名
2. 内容合规
3. 申请微信 JS-SDK 域名白名单

### Q: 全屏功能不生效？

A: 某些手机浏览器限制全屏，可以：
1. 检测是否支持全屏
2. 使用 CSS 模拟全屏（隐藏状态栏）

### Q: 如何在微信公众号内使用？

A: 需要配置微信 JS-SDK:
1. 获取公众号 AppID
2. 配置 JS 安全域名
3. 调用 wx.config 初始化

---

## 📞 技术支持

如有问题，请检查：
1. 服务器是否正常运行
2. 端口 3000 是否开放
3. 防火墙设置
4. 域名是否备案

---

**完成时间**: 2026-04-21  
**版本**: 1.0.0  
**作者**: AI Assistant
