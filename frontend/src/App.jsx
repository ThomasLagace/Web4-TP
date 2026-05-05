import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import HomePage from './routes/HomePage'
import Carousel from './components/GamesCarousel'
import GameCard from './components/GameCard'
import GamesCarousel from './components/GamesCarousel'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
