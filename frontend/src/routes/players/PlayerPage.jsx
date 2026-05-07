import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import playersClient from '../../api/playersClient'

export default function PlayerPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [player, setPlayer] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    playersClient.show(id)
      .then((res) => {
        setPlayer(res.data["data"])
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
      ) : !player ? (
        <p className="text-muted">Joueur non trouvé.</p>
      ) : (
        <>
          <button
            className="btn btn-outline-secondary mb-4"
            onClick={() => navigate('/players')}
          >
            &larr; Retour aux joueurs
          </button>

              <h1 className="mb-1">{player.username}</h1>
          <p className="text-muted mb-4">{player.affiliation}</p>

          <div className="row g-4">
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Statistiques</h5>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">
                      <span className="text-muted">Elo :</span>{' '}
                      <strong>{player.points}</strong>
                    </li>
                    <li className="mb-2">
                      <span className="text-muted">Rang :</span>{' '}
                      <span className="badge bg-secondary">{player.rank?.name}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
