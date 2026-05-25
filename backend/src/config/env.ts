import dotenv from 'dotenv'
dotenv.config()

function required(key: string): string {
  const val = process.env[key]
  if (!val) throw new Error(`Missing required env var: ${key}`)
  return val
}

function optional(key: string, fallback: string): string {
  return process.env[key] ?? fallback
}

export const env = {
  PORT: optional('PORT', '3000'),
  NODE_ENV: optional('NODE_ENV', 'development'),

  ACTIVE_MODEL: optional('ACTIVE_MODEL', 'gemini') as 'gemini' | 'claude',

  GEMINI_API_KEY: optional('GEMINI_API_KEY', ''),
  GEMINI_MODEL: optional('GEMINI_MODEL', 'gemini-2.5-flash'),

  CLAUDE_API_KEY: optional('CLAUDE_API_KEY', ''),
  CLAUDE_MODEL: optional('CLAUDE_MODEL', 'claude-sonnet-4-6'),

  MAX_TOKENS: parseInt(optional('MAX_TOKENS', '2200')),

  DATABASE_URL: required('DATABASE_URL'),
}
