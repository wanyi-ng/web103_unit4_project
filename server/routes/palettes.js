import express from 'express'
import PalettesController from '../controllers/palettes.js'

const router = express.Router()

router.post('/', PalettesController.createPalette)
router.get('/', PalettesController.getPalettes)
router.get('/:id', PalettesController.getPaletteById)
router.patch('/:id', PalettesController.updatePalette)
router.delete('/:id', PalettesController.deletePalette)

export default router