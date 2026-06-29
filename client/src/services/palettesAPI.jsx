const PalettesAPI = {
  async createPalette(formData) {
    const result = await fetch('/api/palettes', {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    if (!result.ok) throw new Error("Failed to create palette. Try again.")

    return result.json()
  },
  async getAllPalettes() {
    const res = await fetch('/api/palettes')
    if (!res.ok) throw new Error('Failed to fetch palettes')
    return res.json()
  },
  async getPaletteById(id) {
    const res = await fetch(`/api/palettes/${id}`)
    if (!res.ok) throw new Error(`Failed to fetch palette-${id}`)
      return res.json()
  },
  async updatePalette(id, palette) {
    const result = await fetch(`/api/palettes/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(palette),
    })

    if (!result.ok) {
      throw new Error(`Failed to update palette-${id}`)
    }

    return result.json()
  },
  async deletePalette(id) {
    const res = await fetch(`/api/palettes/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error(`Failed to delete palette-${id}`)
    return res.json()
  },
}

export default PalettesAPI