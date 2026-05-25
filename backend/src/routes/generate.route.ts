import { Router, Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { aiService } from '../services/ai.service'
import { prisma } from '../db/prisma'
import { env } from '../config/env'

const router = Router()

const generateSchema = z.object({
  module: z.string().min(1),
  prompt: z.string().min(10, 'Prompt is too short'),
})

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { module, prompt } = generateSchema.parse(req.body)

    const content = await aiService.generate(prompt)

    const document = await prisma.generatedDocument.create({
      data: { module, prompt, content, model: env.ACTIVE_MODEL },
    })

    res.json({ success: true, content, documentId: document.id })
  } catch (error) {
    next(error)
  }
})

export { router as generateRouter }
