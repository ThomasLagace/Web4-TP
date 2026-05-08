import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ranksClient from '../../api/ranksClient'

export default function RankPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [rank, setRank] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    ranksClient.show(id)
      .then((res) => {
        setRank(res.data["data"])
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
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce rang ?")) return

    setIsLoading(true)
    setError('')
    ranksClient.delete(id)
      .then(() => {
        navigate('/ranks')
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
      ) : !rank ? (
        <p className="text-muted">Rang non trouvé.</p>
      ) : (
        <>
          <button
            className="btn btn-outline-secondary mb-4"
            onClick={() => navigate('/ranks')}
          >
            &larr; Retour aux rangs
          </button>

          <h1 className="mb-4">{rank.name}</h1>

          <div className="mb-4 d-flex gap-2">
            <button
              className="btn btn-warning"
              onClick={() => navigate(`/ranks/${id}/edit`)}
            >
              Modifier
            </button>

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
                  <h5 className="card-title">Informations</h5>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">
                      <span className="text-muted">Elo minimum :</span>{' '}
                      <strong>{rank.min_points}</strong>
                    </li>
                    <li className="mb-2">
                      <span className="text-muted">Elo maximum :</span>{' '}
                      <strong>{rank.max_points || 'infinie'}</strong>
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
