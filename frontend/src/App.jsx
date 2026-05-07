import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GamePage from './routes/games/GamePage'
import GamesPage from './routes/games/GamesPage'
import HomePage from './routes/HomePage'
import Navbar from './components/Navbar'
import NewsItemPage from './routes/news/NewsItemPage'
import NewsPage from './routes/news/NewsPage'
import PlayerPage from './routes/players/PlayerPage'
import PlayersPage from './routes/players/PlayersPage'
import RankPage from './routes/ranks/RankPage'
import RanksPage from './routes/ranks/RanksPage'
import RoundPage from './routes/rounds/RoundPage'
import RoundsPage from './routes/rounds/RoundsPage'
import TournamentPage from './routes/tournaments/TournamentPage'
import TournamentsPage from './routes/tournaments/TournamentsPage'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />

        <Route path='/games' element={<GamesPage />} />
        <Route path='/games/:id' element={<GamePage />} />

        <Route path='/news' element={<NewsPage />} />
        <Route path='/news/:id' element={<NewsItemPage />} />

        <Route path='/players' element={<PlayersPage />} />
        <Route path='/players/:id' element={<PlayerPage />} />

        <Route path='/ranks' element={<RanksPage />} />
        <Route path='/ranks/:id' element={<RankPage />} />

        <Route path='/rounds' element={<RoundsPage />} />
        <Route path='/rounds/:id' element={<RoundPage />} />

        <Route path='/tournaments' element={<TournamentsPage />} />
        <Route path='/tournaments/:id' element={<TournamentPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
