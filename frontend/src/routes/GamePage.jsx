import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import gamesClient from '../api/gamesClient'

export default function GamePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [game, setGame] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    gamesClient.show(id).then((res) => {
      setGame(res.data["data"])
    }).finally(() => {
      setIsLoading(false)
    })
  }, [id])

  if (isLoading) {
    return (
      <div className="container py-4">
        <p className="text-muted">Chargement...</p>
      </div>
    )
  }

  if (!game) {
    return (
      <div className="container py-4">
        <p className="text-muted">Partie non trouvée.</p>
      </div>
    )
  }

  return (
    <div className="container py-4">
      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate("/games")}
      >
        &larr; Retour aux parties
      </button>

      <h1 className="mb-4">
        {game.whitePlayerName} contre {game.blackPlayerName}
      </h1>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Informations</h5>
              <ul className="list-unstyled mb-0">
                <li className="mb-2">
                  <span className="text-muted">Statut :</span>{" "}
                  <span className="badge bg-secondary">{game.status}</span>
                </li>
                <li className="mb-2">
                  <span className="text-muted">Début :</span> {game.startTime}
                </li>
                {game.roundId && (
                  <li className="mb-2">
                    <span className="text-muted">Ronde :</span> #{game.roundId}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Joueurs</h5>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="text-center flex-fill">
                  <div className="fw-bold">{game.whitePlayerName}</div>
                  <small className="text-muted">Blancs</small>
                  {game.whitePlayerOdds != null && (
                    <div className="mt-1">
                      <span className="badge bg-light text-dark border">
                        {game.whitePlayerOdds}%
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-muted px-3 fs-5">vs</div>
                <div className="text-center flex-fill">
                  <div className="fw-bold">{game.blackPlayerName}</div>
                  <small className="text-muted">Noirs</small>
                  {game.whitePlayerOdds != null && (
                    <div className="mt-1">
                      <span className="badge bg-dark text-light">
                        {100 - game.whitePlayerOdds}%
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {game.winnerPlayerName && (
                <div className="alert alert-success mb-0 text-center">
                  Vainqueur : <strong>{game.winnerPlayerName}</strong>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
