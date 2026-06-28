import express from 'express'
import palettesRouter from './palettes.js'

const router = express.Router()

router.use('/palettes', palettesRouter)

router.all('/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint does not exist' })
})

export default router
