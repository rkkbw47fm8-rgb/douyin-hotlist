import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import hotlistRoutes from './routes/hotlist.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/hotlist', hotlistRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`🚀 热榜分析 API 启动: http://localhost:${PORT}`)
})
