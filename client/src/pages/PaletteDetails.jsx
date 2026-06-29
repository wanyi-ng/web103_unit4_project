import React, { useEffect, useState } from 'react'
import '../App.css'
import PalettesAPI from '../services/palettesAPI'
import { useParams } from 'react-router-dom'

const PaletteDetails = () => {
    const { id } = useParams()
    
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    
    const [palette, setPalette] = useState({})

    useEffect(() => {
        (async () => {
        try {
            setLoading(true)
            const paletteData = await PalettesAPI.getPaletteById(id)
            console.log("PALETTEDATA: ", paletteData)
            setPalette(paletteData)
        }
        catch (error) {
            console.error(error)
            setError(true)
        } finally {
            setLoading(false)
        }
        }) ()
    }, [id])

    if (loading) {
        return <h2 className='loading'>Loading...</h2>
    }

    if (error) {
        return <h2 className='error'>There was an error fetching the data.</h2>
    }

    return (
        <main>
            <div className="palette-details">

                <a href={`/edit/${palette.id}`}>Edit</a>

                <h1>{palette.name}</h1>

                <p><strong>Theme:</strong> {palette.theme}</p>
                <p><strong>Mood:</strong> {palette.mood}</p>
                <p>
                    <strong>Favorite:</strong>{" "}
                    {palette.favorite ? "⭐ Yes" : "No"}
                </p>

                <p><strong>Description:</strong></p>
                <p>{palette.description}</p>

                <p><strong>Tags:</strong></p>
                <div className="tags">
                    {palette.tags?.map((tag) => (
                        <span key={tag} className="tag">
                            {tag}
                        </span>
                    ))}
                </div>

                <h2>Colors</h2>

                <div className="colors">
                    {palette.colors?.map((color) => (
                        <div
                            key={color.id}
                            className="color-card"
                        >
                            <div
                                className="color-preview"
                                style={{
                                    backgroundColor: color.hex,
                                    width: "100px",
                                    height: "100px",
                                    borderRadius: "8px",
                                }}
                            />

                            <p>{color.hex}</p>
                            {/* <p>Position: {color.position}</p> */}
                            {/* <p>
                                {color.is_locked ? "🔒 Locked" : "🔓 Unlocked"}
                            </p> */}
                        </div>
                    ))}
                </div>

            </div>
        </main>
    )
}

export default PaletteDetails

// {palettes.map((palette) => (
//     <div key={palette.id} className="palette">
//         <div className="palette-colors">
//             {palette.colors.map((color) => (
//                 <div
//                     key={color.id}
//                     className="color"
//                     style={{
//                     backgroundColor: color.hex,
//                     width: "60px",
//                     height: "60px",
//                     }}
//                     title={color.hex}
//                 >
//                     {/* {color.is_locked && "🔒"} */}
//                 </div>
//             ))}
//         </div>

//         <a href={`/palettes/${palette.id}`}>{palette.name}</a>
//         {/* <p>Theme: {palette.theme}</p> */}
//         {/* <p>Mood: {palette.mood}</p> */}
//         {/* <p>{palette.description}</p> */}

//     </div>
// ))}