import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../App.css'
import PalettesAPI from '../services/palettesAPI'

const EditPalette = () => {
    const { id } = useParams()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const [palette, setPalette] = useState({
        name: "",
        theme: "",
        mood: "",
        description: "",
        tags: [],
        favorite: false,
        colors: [],
    })

    const [action, setAction] = useState("")

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)

                const paletteData = await PalettesAPI.getPaletteById(id)

                setPalette({
                    ...paletteData,
                })
            } catch (err) {
                console.error(err)
                setError(true)
            } finally {
                setLoading(false)
            }
        })()
    }, [id])

    const updateColor = (index, hex) => {
        setPalette((prev) => ({
            ...prev,
            colors: prev.colors.map((color, i) =>
                i === index
                    ? {...color, hex}
                    : color
            ),
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const formData = { ...palette }
            console.log("FORMDATA: ", formData)

            console.log(e.nativeEvent.submitter.name)

            if (action === 'update') {
                await PalettesAPI.updatePalette(id, palette)
                window.location = `/palettes/${id}`
            }
            if (action === 'delete') {
                await PalettesAPI.deletePalette(id)
                window.location = "/palettes"
            }

        } catch (err) {
            console.error(err)
        }
    }

    if (loading) return <h2>Loading...</h2>

    if (error) return <h2>Something went wrong.</h2>
    
    return (
        <main className='edit-palette'>
            <h2 className='heading'>Edit Palette</h2>
            <form onSubmit={handleSubmit} className='form-edit-palette'>

                <label>Name</label>
                <input
                    value={palette.name}
                    onChange={(e) =>
                        setPalette((prev) => ({
                            ...prev,
                            name: e.target.value,
                        }))
                    }
                />

                <label>Theme</label>
                <input
                    value={palette.theme}
                    onChange={(e) =>
                        setPalette((prev) => ({
                            ...prev,
                            theme: e.target.value,
                        }))
                    }
                />

                <label>Mood</label>
                <input
                    value={palette.mood}
                    onChange={(e) =>
                        setPalette((prev) => ({
                            ...prev,
                            mood: e.target.value,
                        }))
                    }
                />

                <label>Description</label>
                <textarea
                    value={palette.description}
                    onChange={(e) =>
                        setPalette((prev) => ({
                            ...prev,
                            description: e.target.value,
                        }))
                    }
                />

                <label>Tags</label>
                <input
                    value={palette.tags.join(", ")}
                    onChange={(e) =>
                        setPalette((prev) => ({
                            ...prev,
                            tags: e.target.value
                                .split(",")
                                .map(tag => tag.trim())
                        }))
                    }
                />

                <label>
                    <input
                        type='checkbox'
                        checked={palette.favorite}
                        onChange={(e) =>
                            setPalette((prev) => ({
                                ...prev,
                                favorite: e.target.checked,
                            }))
                        }
                    />
                    Favorite
                </label>

                <section className='colors-section'>
                    {palette.colors.map((color, index) => (
                        <div
                            key={color.id}
                            className='color-row'
                            style={{
                                width: `calc(100% / ${palette.colors.length})`,
                            }}
                        >
                            <input
                                type='color'
                                value={color.hex}
                                onChange={(e) => updateColor(index, e.target.value)}
                            />

                            <span>{color.hex}</span>
                        </div>
                    ))}
                </section>

                <div className='submit-buttons'>
                    <button type='submit' onClick={() => setAction("update")}>Update</button>
                    <button type="submit" onClick={() => setAction("delete")}>Delete</button>
                </div>
            </form>
        </main>
    )
}

export default EditPalette