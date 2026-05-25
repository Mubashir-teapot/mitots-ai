import { Router, Request, Response, NextFunction } from 'express'
import { prisma } from '../db/prisma'

const router = Router()

// GET /api/documents — list all, newest first
router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const documents = await prisma.generatedDocument.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, module: true, model: true, createdAt: true, content: true },
    })
    res.json(documents)
  } catch (error) {
    next(error)
  }
})

// GET /api/documents/:id
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const document = await prisma.generatedDocument.findUnique({
      where: { id: req.params.id },
    })
    if (!document) return res.status(404).json({ success: false, error: 'Document not found' })
    res.json(document)
  } catch (error) {
    next(error)
  }
})

// DELETE /api/documents/:id
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await prisma.generatedDocument.delete({ where: { id: req.params.id } })
    res.json({ success: true })
  } catch (error) {
    next(error)
  }
})

export { router as documentsRouter }
