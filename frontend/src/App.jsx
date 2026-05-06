import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import HomePage from './routes/HomePage'
import Carousel from './components/GamesCarousel'
import GameCard from './components/GameCard'
import GamesCarousel from './components/GamesCarousel'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GamesPage from './routes/GamesPage'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<GamesPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
