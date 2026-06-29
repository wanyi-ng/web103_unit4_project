import pool from '../config/database.js'

const createPalette = async (req, res) => {
  try {
    const { name, theme, mood, favorite, description, tags, colors } = req.body

    const { rows } = await pool.query(
      `INSERT INTO palettes (name, theme, mood, favorite, description, tags)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *
      ;`,
      [name, theme, mood, favorite, description, tags]
    )

    const palette = rows[0]

    for (let i = 0; i < colors.length; i++) {
      await pool.query(
        `INSERT INTO palette_colors (palette_id, hex, position, is_locked)
          VALUES ($1, $2, $3, $4)
        ;`,
        [palette.id, colors[i].hex, i + 1, colors[i].is_locked]
      )
    }

    res.status(201).json({ ...palette, colors })
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const getPalettes = async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT
        p.*,
        COALESCE(
          (
            SELECT json_agg(pc ORDER BY pc.position)
            FROM palette_colors pc
            WHERE pc.palette_id = p.id
          ),
          '[]'
        ) AS colors
        FROM palettes p
        ORDER BY p.id ASC
      ;`
    )
    res.status(200).json(rows)
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const getPaletteById = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const { rows } = await pool.query(
      `SELECT
          p.*,
          COALESCE(
              (
                SELECT json_agg(pc ORDER BY pc.position)
                FROM palette_colors pc
                WHERE pc.palette_id = p.id
              ),
              '[]'
          ) AS colors
        FROM palettes p
        WHERE p.id = $1
      ;`,
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
    const { name, theme, mood, favorite, description, tags, colors } = req.body
    const { rows } = await pool.query(
      `UPDATE palettes
        SET name = $1, theme = $2, mood = $3, favorite = $4, description = $5, tags = $6, updated_at = CURRENT_TIMESTAMP
        WHERE id = $7
        RETURNING *
      ;`,
      [name, theme, mood, favorite, description, tags, id]  
    )

    await pool.query(`DELETE FROM palette_colors WHERE palette_id = $1`, [id])

    for (let i = 0; i < colors.length; i++) {
      const color = colors[i]
      const position = i + 1
      await pool.query(
        `INSERT INTO palette_colors (palette_id, hex, position, is_locked)
        VALUES ($1, $2, $3, $4)`,
        [id, color.hex, position, color.is_locked]
      )
    }

    res.status(200).json(rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const deletePalette = async (req, res) => {  
  try {
    const id = parseInt(req.params.id)
    const { rows } = await pool.query(
      `DELETE FROM palettes
        WHERE id = $1
        RETURNING *
      ;`,
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