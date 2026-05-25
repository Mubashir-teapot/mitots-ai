import { Router, Request, Response } from 'express'
import crypto from 'crypto'

export const authRouter = Router()

authRouter.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body as { username?: string; password?: string }

  if (!username?.trim() || !password?.trim()) {
    return res.status(400).json({ message: 'Username and password are required' })
  }

  const adminUser = process.env.ADMIN_USERNAME || 'admin'
  const adminPass = process.env.ADMIN_PASSWORD || 'mitots2024'
  const secret    = process.env.TOKEN_SECRET    || 'mitots-internal-secret'

  if (username.trim() !== adminUser || password.trim() !== adminPass) {
    console.log(`[auth] Failed login attempt for user: "${username.trim()}"`)
    return res.status(401).json({ message: 'Invalid username or password' })
  }

  // Deterministic HMAC token — same credentials always produce the same token.
  // Change TOKEN_SECRET in .env to invalidate all existing sessions.
  const token = crypto
    .createHmac('sha256', secret)
    .update(`${adminUser}:${adminPass}`)
    .digest('hex')

  console.log(`[auth] Successful login for user: "${adminUser}"`)

  return res.json({
    token,
    username: adminUser,
  })
})
