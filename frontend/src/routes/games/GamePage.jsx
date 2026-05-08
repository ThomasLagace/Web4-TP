import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import gamesClient from '../../api/gamesClient'

export default function GamePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [game, setGame] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const handleFinish = () => {
    if (!confirm("Confirmer la fin de la partie ?")) return

    setIsLoading(true)
    setError('')
    gamesClient.finish(id)
      .then(() => {
        window.location.reload()
      })
      .catch((err) => {
        setError('Une erreur est survenue lors de la finalisation.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    gamesClient.show(id)
      .then((res) => {
        setGame(res.data["data"])
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
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : !game ? (
        <p className="text-muted">Partie non trouvée.</p>
      ) : (
        <>
          <button
            className="btn btn-outline-secondary mb-4"
            onClick={() => navigate("/games")}
          >
            &larr; Retour aux parties
          </button>

          <div className="mb-4 d-flex gap-2">
            <button
              className="btn btn-warning"
              onClick={() => navigate(`/games/${id}/edit`)}
            >
              Modifier
            </button>
            <button
              className="btn btn-success"
              onClick={handleFinish}
              disabled={isLoading}
            >
              Terminer la partie
            </button>
          </div>

          <h1 className="mb-4">
            {game.white_player?.username ?? "À determiner"} contre {game.black_player?.username ?? "À determiner"}
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
                      <span className="text-muted">Début :</span> {game.start_time}
                    </li>
                    <li className="mb-2">
                      <span className="text-muted">Ronde :</span> #{game.round_id}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {game.white_player === null || game.black_player === null ? null : (
              <div className="col-md-6">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Joueurs</h5>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="text-center flex-fill">
                        <div className="fw-bold">{game.white_player.username}</div>
                        <small className="text-muted">Blancs</small>
                        <div className="mt-1">
                          <span className="badge bg-light text-dark border">
                            {game.white_player_odds}%
                          </span>
                        </div>
                      </div>
                      <div className="text-muted px-3 fs-5">vs</div>
                      <div className="text-center flex-fill">
                        <div className="fw-bold">{game.black_player.username}</div>
                        <small className="text-muted">Noirs</small>
                        <div className="mt-1">
                          <span className="badge bg-dark text-light">
                            {100 - game.white_player_odds}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="alert alert-success mb-0 text-center">
                      Vainqueur : <strong>{game.winner_player?.username ?? "À determiner"}</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
