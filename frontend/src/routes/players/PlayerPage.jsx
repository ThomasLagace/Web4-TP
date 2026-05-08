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

  const handleDelete = () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce joueur ?")) return

    setIsLoading(true)
    setError('')
    playersClient.delete(id)
      .then(() => {
        navigate('/players')
      })
      .catch((err) => {
        setError('Une erreur est survenue lors de la suppression.')
        setIsLoading(false)
      })
  }

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

          <div className="mb-4 d-flex gap-2">
            <button
              className="btn btn-warning"
              onClick={() => navigate(`/players/${id}/edit`)}
            >
              Modifier
            </button>
          </div>

          <div className="mb-4 d-flex gap-2">
            <button
              className="btn btn-danger"
              onClick={handleDelete}
              disabled={isLoading}
            >
              Supprimer
            </button>
          </div>

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
                      <span className="badge bg-secondary">{player.rank?.name || 'non classé'}</span>
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
