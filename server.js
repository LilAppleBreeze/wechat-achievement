const express = require('express')
const QRCode = require('qrcode')
const cors = require('cors')
const path = require('path')

const app = express()
const PORT = 3000

// 中间件
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

// 模拟数据库 - 成果数据
const achievements = new Map()

// 初始化一些示例数据
achievements.set('demo001', {
  id: 'demo001',
  title: '全球机器人开发选品选型服务中心',
  company: '深圳市鑫信腾科技股份有限公司',
  description: '基于视觉感知与灵巧作业的智能机器人解决方案',
  content: `
    <h2>关于我们</h2>
    <p>深圳市鑫信腾科技股份有限公司是国家级高新技术企业、国家级专精特新"小巨人"企业。</p>
    <p>公司深耕智能制造领域多年，专注于基于视觉感知与灵巧作业的智能机器人研发。</p>
    
    <h2>核心产品</h2>
    <ul>
      <li>智能检测机器人</li>
      <li>自动化装配系统</li>
      <li>视觉检测系统</li>
    </ul>
    
    <h2>荣誉资质</h2>
    <ul>
      <li>国家级高新技术企业</li>
      <li>国家级专精特新"小巨人"</li>
      <li>深圳市科技创新奖</li>
    </ul>
  `,
  coverImage: '/images/cover.jpg',
  address: '深圳市南山区粤海街道高新区社区',
  phone: '400-888-8888',
  wechat: 'xintengtkeji',
  location: {
    lat: 22.5428,
    lng: 114.0543
  },
  createdAt: new Date().toISOString(),
  views: 0
})

// 生成二维码页面
app.get('/generate/:id', async (req, res) => {
  const { id } = req.params
  const achievement = achievements.get(id)
  
  if (!achievement) {
    return res.status(404).send('成果不存在')
  }
  
  // 生成访问 URL
  const baseUrl = `${req.protocol}://${req.get('host')}`
  const viewUrl = `${baseUrl}/view/${id}`
  
  // 生成二维码
  const qrImage = await QRCode.toDataURL(viewUrl, {
    width: 400,
    margin: 2,
    color: {
      dark: '#000000',
      light: '#ffffff'
    }
  })
  
  res.send(`
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>生成二维码 - ${achievement.title}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .container {
          background: #fff;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          text-align: center;
          max-width: 500px;
          width: 100%;
        }
        h1 {
          color: #333;
          margin-bottom: 10px;
          font-size: 24px;
        }
        .subtitle {
          color: #666;
          margin-bottom: 30px;
          font-size: 14px;
        }
        .qr-container {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 12px;
          display: inline-block;
          margin-bottom: 20px;
        }
        .qr-container img {
          width: 300px;
          height: 300px;
        }
        .tip {
          color: #667eea;
          font-size: 16px;
          font-weight: 500;
          margin-top: 15px;
        }
        .tip-icon {
          font-size: 20px;
          margin-right: 8px;
        }
        .actions {
          margin-top: 30px;
          display: flex;
          gap: 15px;
          justify-content: center;
        }
        .btn {
          padding: 12px 30px;
          border-radius: 8px;
          border: none;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s;
          text-decoration: none;
          display: inline-block;
        }
        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }
        .btn-secondary {
          background: #f0f0f0;
          color: #333;
        }
        .btn-secondary:hover {
          background: #e0e0e0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>${achievement.title}</h1>
        <p class="subtitle">${achievement.company}</p>
        
        <div class="qr-container">
          <img src="${qrImage}" alt="二维码" />
        </div>
        
        <p class="tip">
          <span class="tip-icon">📱</span>
          微信扫一扫 查看成果详情
        </p>
        
        <div class="actions">
          <a href="/view/${id}" class="btn btn-secondary" target="_blank">预览页面</a>
          <button onclick="window.print()" class="btn btn-secondary">打印二维码</button>
        </div>
      </div>
    </body>
    </html>
  `)
})

// 成果展示页面
app.get('/view/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'view.html'))
})

// API: 获取成果数据
app.get('/api/achievement/:id', (req, res) => {
  const achievement = achievements.get(req.params.id)
  
  if (!achievement) {
    return res.status(404).json({ error: '成果不存在' })
  }
  
  // 增加浏览量
  achievement.views = (achievement.views || 0) + 1
  achievements.set(req.params.id, achievement)
  
  res.json(achievement)
})

// API: 生成二维码
app.post('/api/qrcode', async (req, res) => {
  const { title, company, description } = req.body
  
  // 生成 ID
  const id = 'ach_' + Math.random().toString(36).substr(2, 9)
  
  // 保存成果
  achievements.set(id, {
    id,
    title: title || '成果展示',
    company: company || '公司名称',
    description: description || '成果描述',
    content: '<h2>详细内容</h2><p>这里是成果的详细介绍内容...</p>',
    coverImage: '/images/cover.jpg',
    address: '公司地址',
    phone: '400-xxx-xxxx',
    wechat: 'wechat_id',
    location: { lat: 22.5428, lng: 114.0543 },
    createdAt: new Date().toISOString(),
    views: 0
  })
  
  // 生成二维码
  const baseUrl = `${req.protocol}://${req.get('host')}`
  const viewUrl = `${baseUrl}/view/${id}`
  
  const qrImage = await QRCode.toDataURL(viewUrl, {
    width: 400,
    margin: 2
  })
  
  res.json({
    id,
    qrImage,
    viewUrl,
    generateUrl: `${baseUrl}/generate/${id}`
  })
})

// 启动服务器
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║                                                        ║
║   🚀 微信扫码展示系统已启动                            ║
║                                                        ║
║   本地访问：http://localhost:${PORT}                    ║
║   生成二维码：http://localhost:${PORT}/generate/demo001 ║
║   查看页面：http://localhost:${PORT}/view/demo001       ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
  `)
})
