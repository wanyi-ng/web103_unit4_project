import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import ViewPalettes from './pages/ViewPalettes'
import EditPalette from './pages/EditPalette'
import CreatePalette from './pages/CreatePalette'
import PaletteDetails from './pages/PaletteDetails'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <CreatePalette />,
    },
    {
      path: '/palettes',
      element: <ViewPalettes />,
    },
    {
      path: '/palettes/:id',
      element: <PaletteDetails title='BOLT BUCKET | View' />
    },
    {
      path: '/edit/:id',
      element: <EditPalette title='BOLT BUCKET | Edit' />
    },
  ])

  return (
    <div className='app'>

      <Navigation />

      { element }

    </div>
  )
}

export default App