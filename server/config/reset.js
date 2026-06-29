import pool from './database.js'
import palettes from '../data/palettes.js'
import paletteColors from '../data/paletteColors.js'

const createPalettesTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS palettes CASCADE;

    CREATE TABLE palettes (
      id SERIAL PRIMARY KEY,

      name VARCHAR(255) NOT NULL,
      theme VARCHAR(100),
      mood VARCHAR(100),

      favorite BOOLEAN DEFAULT FALSE,
      description TEXT,

      tags TEXT[] DEFAULT '{}',

      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
  `

  try {
    const res = await pool.query(createTableQuery)
    console.log("🎉 'palettes' table created successfully")
  } catch (err) {
    console.error("⚠️ error creating 'palettes' table", err)
  }
}

const createPaletteColorsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS palette_colors;

    CREATE TABLE palette_colors (
      id SERIAL PRIMARY KEY,

      palette_id INTEGER NOT NULL REFERENCES palettes(id) ON DELETE CASCADE,

      hex VARCHAR(7) NOT NULL,

      position INTEGER NOT NULL,

      is_locked BOOLEAN DEFAULT FALSE
    );
  `

  try {
    const res = await pool.query(createTableQuery)
    console.log("🎉 'palette_colors' table created successfully")
  } catch (err) {
    console.error("⚠️ error creating 'palette_colors' table", err)
  }
}

const seedTable = async () => {
  await createPalettesTable()
  await createPaletteColorsTable()

  for (const palette of palettes) {
    await pool.query(
      `INSERT INTO palettes (name, theme, mood, favorite, description, tags) VALUES ($1, $2, $3, $4, $5, $6)`,
      [palette.name, palette.theme, palette.mood, palette.favorite, palette.description, palette.tags]
    )
    console.log(`✅ palette ${palette.name} seeded successfully`)
  }
  
  for (const color of paletteColors) {
    await pool.query(
      `INSERT INTO palette_colors (palette_id, hex, position, is_locked) VALUES ($1, $2, $3, $4)`,
      [color.palette_id, color.hex, color.position, color.is_locked]
    )
    console.log(`☑️ color ${color.hex} seeded successfully`)
  }
}

seedTable()