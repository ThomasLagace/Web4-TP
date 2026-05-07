import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import roundsClient from '../../api/roundsClient'
import GameCard from '../../components/GameCard'

export default function RoundPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [round, setRound] = useState()
  const [games, setGames] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([
      roundsClient.show(id),
      roundsClient.gamesOf(id),
    ])
      .then(([roundRes, gamesRes]) => {
        setRound(roundRes.data["data"])
        setGames(gamesRes.data["data"])
      })
      .catch((err) => {
        setError('Une erreur est survenue lors du chargement.')
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id])

  return (
    <div className="container py-4">
      {isLoading ? (
        <p className="text-muted">Chargement...</p>
      ) : error ? (
        <div className="alert alert-danger" role="alert">{error}</div>
      ) : !round ? (
        <p className="text-muted">Ronde non trouvée.</p>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate('/rounds')}
            >
              &larr; Retour aux rondes
            </button>
            <button
              className="btn btn-primary"
              onClick={() => navigate(`/rounds/${id}/edit`)}
            >
              Modifier
            </button>
          </div>

          <h1 className="mb-4">{round.name}</h1>

          <div className="row g-4 mb-5">
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Informations</h5>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">
                      <span className="text-muted">Statut :</span>{' '}
                      <span className="badge bg-secondary">{round.status}</span>
                    </li>
                    <li className="mb-2">
                      <span className="text-muted">Multiplicateur de elo :</span>{' '}
                      <strong>x{round.pointsMultiplier}</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <h2 className="mb-3">Parties</h2>
          {games.length === 0 ? (
            <p className="text-muted">Aucune partie dans cette ronde.</p>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
              {games.map((game) => (
                <div className="col" key={game.gameId}>
                  <GameCard
                    gameId={game.gameId}
                    status={game.status}
                    startTime={game.startTime}
                    whitePlayerName={game.whitePlayerName}
                    blackPlayerName={game.blackPlayerName}
                  />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
