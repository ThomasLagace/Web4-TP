import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import playersClient from '../../api/playersClient'

export default function CreatePlayerPage() {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [affiliation, setAffiliation] = useState('')
  const [points, setPoints] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    setError('')
    setIsSaving(true)

    playersClient.store(username, affiliation, points)
      .then(() => {
        navigate('/players')
      })
      .catch((err) => {
        setError('Une erreur est survenue lors de la création du joueur.')
        console.error(err)
      })
      .finally(() => {
        setIsSaving(false)
      })
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Nouveau joueur</h1>

      {error ? (
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

              <button type="submit" className="btn btn-primary" disabled={isSaving}>
                {isSaving ? 'Enregistrement...' : 'Créer'}
              </button>

            </div>
          </div>
        </form>
      )}
    </div>
  )
}
