import React from 'react'
import '../App.css'
import '../css/Navigation.css'

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li>
                    <h2 className='nav-logo'>PalettePal</h2>
                    {/* <a href='/' role='link' className='nav-logo'>
                        PalettePal
                    </a> */}
                </li>

                <span>
                    <li>
                        <a href='/' role='button'>
                            + Create
                        </a>
                    </li>
                    <li>
                        <a href='/palettes' role='button'>
                            View Palettes
                        </a>
                    </li>
                </span>
            </ul>
            
        </nav>
    )
}

export default Navigation