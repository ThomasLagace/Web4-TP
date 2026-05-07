import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import HomePage from './routes/HomePage'
import Carousel from './components/GamesCarousel'
import GameCard from './components/GameCard'
import GamesCarousel from './components/GamesCarousel'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import GamesPage from './routes/GamesPage'
import NewsCard from './components/NewsCard'
import NewsPage from './routes/NewsPage'
import GamePage from './routes/GamePage'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<NewsPage />} />
        <Route path='/games/:id' element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
