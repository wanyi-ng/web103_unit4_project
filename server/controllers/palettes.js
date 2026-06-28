import pool from '../config/database.js'

const createPalette = async (req, res) => {
  try {
    const { name, theme, mood, favorite, description, tags, created_at, updated_at } = req.body

    const { rows } = await pool.query(
      `INSERT INTO gifts (name, theme, mood, favorite, description, tags, created_at, updated_at)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *`,
      [name, theme, mood, favorite, description, tags, created_at, updated_at]
    )

    res.status(201).json(rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const getPalettes = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM palettes ORDER BY id ASC`
    )
    res.status(200).json(rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const getPaletteById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const { rows } = await pool.query(
      `SELECT palettes.* FROM palettes WHERE id = $1`,
      [id]
    )
    res.status(200).json(rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const updatePalette = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const { name, theme, mood, favorite, description, tags, created_at, updated_at } = req.body
    const { rows } = await pool.query(
      `UPDATE palettes SET name = $1, theme = $2, mood = $3, favorite = $4, description = $5, tags = $6, created_at = $7, updated_at = $8, WHERE id = $9`,
      [name, theme, mood, favorite, description, tags, created_at, updated_at, id]  
    )
    res.status(200).json(rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const deletePalette = async (req, res) => {  
  try {
    const id = parseInt(req.params.id)
    const { rows } = await pool.query(
      `DELETE FROM palettes WHERE id = $1`,
      [id]
    )
    res.status(200).json(rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

export default {
  createPalette,
  getPalettes,
  getPaletteById,
  updatePalette,
  deletePalette,
}