import { Router, Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { prisma } from '../db/prisma'

const router = Router()

const moduleSchema = z.object({
  key: z.string().min(1),
  icon: z.string().min(1),
  title: z.string().min(1),
  hint: z.string().default('Custom module'),
})

// GET /api/modules
router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const modules = await prisma.customModule.findMany({
      orderBy: { createdAt: 'asc' },
    })
    res.json(modules)
  } catch (error) {
    next(error)
  }
})

// POST /api/modules
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = moduleSchema.parse(req.body)
    const module = await prisma.customModule.create({ data })
    res.status(201).json(module)
  } catch (error) {
    next(error)
  }
})

// DELETE /api/modules/:id
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.customModule.delete({ where: { id: req.params.id } })
    res.json({ success: true })
  } catch (error) {
    next(error)
  }
})

export { router as modulesRouter }
