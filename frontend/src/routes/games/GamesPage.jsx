import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GameCard from '../../components/GameCard'
import gamesClient from '../../api/gamesClient'

export default function GamesPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [gamesList, setGamesList] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    gamesClient.all()
      .then((res) => {
        setGamesList(res.data["data"])
      })
      .catch((err) => {
        setError('Une erreur est survenue lors du chargement.')
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Parties</h1>
        <button
          className="btn btn-success"
          onClick={() => navigate('/games/create')}
        >
          + Nouvelle partie
        </button>
      </div>
      {isLoading ? (
        <p className="text-muted">Chargement...</p>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : gamesList.length === 0 ? (
        <p className="text-muted">Aucune partie trouvée.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
          {gamesList.map((game) => (
            <div className="col" key={game.gameId}>
              <GameCard
                gameId={game.id}
                status={game.status}
                startTime={game.start_time}
                whitePlayerName={game.white_player?.username ?? "À determiner"}
                blackPlayerName={game.black_player?.username ?? "À determiner"}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
