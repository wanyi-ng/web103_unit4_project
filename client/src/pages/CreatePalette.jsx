import React, { useState } from 'react'
import '../App.css'
import PalettesAPI from '../services/palettesAPI'

const CreatePalette = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const [palette, setPalette] = useState({
        name: "",
        theme: "",
        mood: "",
        description: "",
        favorite: false,
        tags: [],
        colors: [
            { hex: "#FF6B35", is_locked: false },
            { hex: "#F7C59F", is_locked: false },
            { hex: "#EF476F", is_locked: false },
            { hex: "#FFD166", is_locked: false },
            { hex: "#073B4C", is_locked: false },
        ],
    })

    const updateColor = (index, hex) => {
        setPalette((prev) => ({
            ...prev,
            colors: prev.colors.map((color, i) =>
                i === index
                    ? { ...color, hex }
                    : color
            ),
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            
            const formData = { ...palette }
            console.log("FORMDATA: ", formData)

            await PalettesAPI.createPalette(formData)

            window.location = '/palettes'
        } catch (error) {
            console.error(error)
            setError(true)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className='create-palette'>
            <h2 className='heading'>Create Palette</h2>

            <form onSubmit={handleSubmit} className='form-create-palette'>
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
                    placeholder="summer, sunset, warm"
                    onChange={(e) =>
                        setPalette((prev) => ({
                        ...prev,
                        tags: e.target.value
                            .split(", ")
                            .map(tag => tag.trim())
                        }))
                    }
                />

                <label>
                    <input
                        type="checkbox"
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
                            key={index}
                            className="color-row"
                            style={{
                                width: `calc(100% / ${palette.colors.length})`,
                                height: "auto",
                                aspectRatio: 1 / 1,
                            }}
                        >
                            <input
                                type="color"
                                value={color.hex}
                                onChange={(e) => updateColor(index, e.target.value)}
                                style={{
                                    height: "100%",
                                }}
                            />

                            <span>{color.hex}</span>
                        </div>
                    ))}
                </section>

                <button type='submit'>Submit</button>
            </form>
        </main>
    )
}

export default CreatePalette


// const toggleLock = (index) => {
//     setColors((prev) =>
//         prev.map((color, i) =>
//             i === index ? { ...color, is_locked: !color.is_locked } : color
//         )
//     )
// }

// const randomHex = () => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0").toUpperCase()}`

// const randomizeColors = () => {
//     setColors((prev) =>
//         prev.map((color) =>
//         color.is_locked
//             ? color
//             : {
//                 ...color,
//                 hex: randomHex(),
//             }
//         )
//     )
// }

{/* <button
    type="button"
    onClick={() => toggleLock(index)}
>
    {color.is_locked ? "🔒" : "🔓"}
</button> */}


// const updateColor = (index, hex) => {
//     setColors((prev) =>
//         prev.map((color, i) =>
//             i === index ? { ...color, hex } : color
//         )
//     )
// }
