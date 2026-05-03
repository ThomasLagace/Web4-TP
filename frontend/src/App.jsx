import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './routes/Home'
import Carousel from './components/GamesCarousel'
import GameCard from './components/GameCard'
import GamesCarousel from './components/GamesCarousel'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<GamesCarousel />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
