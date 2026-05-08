import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EditGamePage from './routes/games/EditGamePage'
import GamePage from './routes/games/GamePage'
import GamesPage from './routes/games/GamesPage'
import HomePage from './routes/HomePage'
import Navbar from './components/Navbar'
import CreateNewsPage from './routes/news/CreateNewsPage'
import EditNewsPage from './routes/news/EditNewsPage'
import NewsItemPage from './routes/news/NewsItemPage'
import NewsPage from './routes/news/NewsPage'
import CreatePlayerPage from './routes/players/CreatePlayerPage'
import EditPlayerPage from './routes/players/EditPlayerPage'
import PlayerPage from './routes/players/PlayerPage'
import PlayersPage from './routes/players/PlayersPage'
import CreateRankPage from './routes/ranks/CreateRankPage'
import EditRankPage from './routes/ranks/EditRankPage'
import RankPage from './routes/ranks/RankPage'
import RanksPage from './routes/ranks/RanksPage'
import CreateRoundPage from './routes/rounds/CreateRoundPage'
import EditRoundPage from './routes/rounds/EditRoundPage'
import RoundPage from './routes/rounds/RoundPage'
import RoundsPage from './routes/rounds/RoundsPage'
import CreateTournamentPage from './routes/tournaments/CreateTournamentPage'
import EditTournamentPage from './routes/tournaments/EditTournamentPage'
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
        <Route path='/games/:id/edit' element={<EditGamePage />} />

        <Route path='/news' element={<NewsPage />} />
        <Route path='/news/create' element={<CreateNewsPage />} />
        <Route path='/news/:id' element={<NewsItemPage />} />
        <Route path='/news/:id/edit' element={<EditNewsPage />} />

        <Route path='/players' element={<PlayersPage />} />
        <Route path='/players/create' element={<CreatePlayerPage />} />
        <Route path='/players/:id' element={<PlayerPage />} />
        <Route path='/players/:id/edit' element={<EditPlayerPage />} />

        <Route path='/ranks' element={<RanksPage />} />
        <Route path='/ranks/create' element={<CreateRankPage />} />
        <Route path='/ranks/:id' element={<RankPage />} />
        <Route path='/ranks/:id/edit' element={<EditRankPage />} />

        <Route path='/rounds' element={<RoundsPage />} />
        <Route path='/rounds/create' element={<CreateRoundPage />} />
        <Route path='/rounds/:id' element={<RoundPage />} />
        <Route path='/rounds/:id/edit' element={<EditRoundPage />} />

        <Route path='/tournaments' element={<TournamentsPage />} />
        <Route path='/tournaments/create' element={<CreateTournamentPage />} />
        <Route path='/tournaments/:id' element={<TournamentPage />} />
        <Route path='/tournaments/:id/edit' element={<EditTournamentPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
