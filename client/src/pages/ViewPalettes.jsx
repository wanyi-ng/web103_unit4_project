import React, { useEffect, useState } from 'react'
import '../App.css'
import PalettesAPI from '../services/palettesAPI'

const ViewPalettes = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    
    const [palettes, setPalettes] = useState([])

    const [sortBy, setSortBy] = useState("favorites")

    useEffect(() => {
        (async () => {
        try {
            setLoading(true)
            const palettesData = await PalettesAPI.getAllPalettes()
            console.log("PALETTESDATA: ", palettesData)
            setPalettes(palettesData)
        }
        catch (error) {
            console.error(error)
            setError(true)
        } finally {
            setLoading(false)
        }
        }) ()
    }, [])

    if (loading) {
        return <h2 className='loading'>Loading...</h2>
    }

    if (error) {
        return <h2 className='error'>There was an error fetching the data.</h2>
    }

    if (palettes.length === 0) {
        return (
            <div className="palettes-empty-state">
                <h2>No palettes yet...</h2>
                <a href="/new">Create a palette</a>
            </div>
        )
    }

    const sortPalettes = [...palettes]

    switch (sortBy) {
        case "favorites":
            sortPalettes.sort((a, b) => {
                if (a.favorite === b.favorite) return 0
                return a.favorite ? -1 : 1
            })
            break

        case "name-asc":
            sortPalettes.sort((a, b) =>
                a.name.localeCompare(b.name)
            )
            break

        case "name-desc":
            sortPalettes.sort((a, b) =>
                b.name.localeCompare(a.name)
            )
            break

        default:
            break
    }

    return (
        <main className='palettes-page'>
            <div className='palettes-filters'>
                <label>Sort by: </label>
                <select
                    name="filter-palettes"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="favorites">Favorites</option>
                    <option value="name-asc">Name a-z</option>
                    <option value="name-desc">Name z-a</option>
                </select>
            </div>
            <div className='palettes-container'>
                {sortPalettes.map((palette) => (
                    <div key={palette.id} className="palette">
                        <div className="palette-colors">
                            {palette.colors.map((color) => (
                                <div
                                    key={color.id}
                                    className="color"
                                    style={{
                                    backgroundColor: color.hex,
                                    width: "60px",
                                    height: "60px",
                                    }}
                                    title={color.hex}
                                >
                                    {/* {color.is_locked && "🔒"} */}
                                </div>
                            ))}
                        </div>

                        <a href={`/palettes/${palette.id}`}>{palette.name}</a>

                        {palette.favorite && <p className="palette-favorited">⭐</p>}
                        {/* <p>Theme: {palette.theme}</p> */}
                        {/* <p>Mood: {palette.mood}</p> */}
                        {/* <p>{palette.description}</p> */}

                    </div>
                ))}
            </div>
        </main>
    )
}

export default ViewPalettes