import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { authRouter } from './routes/auth.route'
import { generateRouter } from './routes/generate.route'
import { documentsRouter } from './routes/documents.route'
import { modulesRouter } from './routes/modules.route'
import { errorHandler } from './middleware/errorHandler'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173',
      /^http:\/\/localhost:\d+$/,
    ],
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: false,
  })
)
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/generate', generateRouter)
app.use('/api/documents', documentsRouter)
app.use('/api/modules', modulesRouter)

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    activeModel: process.env.ACTIVE_MODEL ?? 'gemini',
    geminiModel: process.env.GEMINI_MODEL ?? 'gemini-2.5-flash',
    claudeModel: process.env.CLAUDE_MODEL ?? 'claude-sonnet-4-6',
  })
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`✦ Mitots AI backend running on http://localhost:${PORT}`)
  console.log(`  Active model: ${process.env.ACTIVE_MODEL ?? 'gemini'}`)
})
