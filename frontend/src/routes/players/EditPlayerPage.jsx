import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import playersClient from '../../api/playersClient'
import ranksClient from '../../api/ranksClient'

export default function EditPlayerPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [affiliation, setAffiliation] = useState('')
  const [points, setPoints] = useState(0)
  const [rankId, setRankId] = useState('')

  const [ranks, setRanks] = useState([])

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([
      playersClient.show(id),
      ranksClient.all()
    ])
      .then(([playerRes, ranksRes]) => {
        const player = playerRes.data.data

        setUsername(player.username)
        setAffiliation(player.affiliation)
        setPoints(player.points)
        setRankId(player.rank_id)

        setRanks(ranksRes.data.data)
      })
      .catch((err) => {
        setError('Une erreur est survenue lors du chargement.')
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()

    setIsSaving(true)

    playersClient.update(id, username, affiliation, points, rankId)
      .then(() => {
        navigate(`/players/${id}`)
      })
      .finally(() => {
        setIsSaving(false)
      })
  }


  return (
    <div className="container py-4">
      <h1 className="mb-4">Modifier le joueur</h1>

      {isLoading ? (
        <p className="text-muted">Chargement...</p>
      ) : error ? (
        <div className="alert alert-danger" role="alert">{error}</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-body">

              {error && (
                <div className="alert alert-danger mb-3" role="alert">
                  {error}
                </div>
              )}

              <div className="mb-3">
                <label className="form-label">Nom d'utilisateur</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Affiliation</label>
                <input
                  type="text"
                  className="form-control"
                  value={affiliation}
                  onChange={(e) => setAffiliation(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Points</label>
                <input
                  type="number"
                  className="form-control"
                  value={points}
                  onChange={(e) => setPoints(parseInt(e.target.value || 0, 10))}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Rang</label>
                <select
                  className="form-select"
                  value={rankId}
                  onChange={(e) => setRankId(e.target.value)}
                >
                  {ranks.map((rank) => (
                    <option key={rank.id} value={rank.id}>
                      {rank.name}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn btn-primary" disabled={isSaving}>
                {isSaving ? 'Enregistrement...' : 'Sauvegarder'}
              </button>

            </div>
          </div>
        </form>
      )}
    </div>
  )
}
