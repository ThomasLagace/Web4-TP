import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ranksClient from '../../api/ranksClient'

export default function RankPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [rank, setRank] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ranksClient.show(id).then((res) => {
      setRank(res.data["data"])
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

  if (!rank) {
    return (
      <div className="container py-4">
        <p className="text-muted">Rang non trouvé.</p>
      </div>
    )
  }

  return (
    <div className="container py-4">
      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate('/ranks')}
      >
        &larr; Retour aux rangs
      </button>

      <h1 className="mb-4">{rank.name}</h1>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">Informations</h5>
              <ul className="list-unstyled mb-0">
                <li className="mb-2">
                  <span className="text-muted">Elo minimum :</span>{' '}
                  <strong>{rank.minPoints}</strong>
                </li>
                <li className="mb-2">
                  <span className="text-muted">Elo maximum :</span>{' '}
                  <strong>{rank.maxPoints}</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
