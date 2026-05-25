import { GoogleGenerativeAI } from '@google/generative-ai'
import Anthropic from '@anthropic-ai/sdk'
import { env } from '../config/env'
import { SYSTEM_PROMPT } from '../constants/company_context'

const geminiClient = new GoogleGenerativeAI(env.GEMINI_API_KEY)
const anthropicClient = new Anthropic({ apiKey: env.CLAUDE_API_KEY })

async function callGemini(userPrompt: string): Promise<string> {
  if (!env.GEMINI_API_KEY) throw new Error('GEMINI_API_KEY is not set in .env')

  const model = geminiClient.getGenerativeModel({
    model: env.GEMINI_MODEL,
    generationConfig: {
      maxOutputTokens: env.MAX_TOKENS,
      temperature: 0.7,
    },
  })

  const fullPrompt = `${SYSTEM_PROMPT}\n\n${userPrompt}`
  const result = await model.generateContent(fullPrompt)
  return result.response.text()
}

async function callClaude(userPrompt: string): Promise<string> {
  if (!env.CLAUDE_API_KEY) throw new Error('CLAUDE_API_KEY is not set in .env')

  const message = await anthropicClient.messages.create({
    model: env.CLAUDE_MODEL,
    max_tokens: env.MAX_TOKENS,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userPrompt }],
  })

  return message.content
    .filter((b): b is Anthropic.TextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('\n')
}

export const aiService = {
  generate: (userPrompt: string): Promise<string> => {
    if (env.ACTIVE_MODEL === 'claude') return callClaude(userPrompt)
    return callGemini(userPrompt)
  },
}
