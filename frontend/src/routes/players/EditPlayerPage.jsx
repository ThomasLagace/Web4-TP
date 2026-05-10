import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import playersClient from '../../api/playersClient'
import useServerValidation from '../../hooks/useServerValidation'

export default function EditPlayerPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [affiliation, setAffiliation] = useState('')
  const [points, setPoints] = useState(0)

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const { errors, handleServerErrors, clearErrors } = useServerValidation()

  useEffect(() => {
    Promise.all([
      playersClient.show(id),
    ])
      .then(([playerRes]) => {
        const player = playerRes.data.data

        setUsername(player.username)
        setAffiliation(player.affiliation)
        setPoints(player.points)
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
    clearErrors()

    playersClient.update(id, username, affiliation, points)
      .then(() => {
        navigate(`/players/${id}`)
      })
      .catch((err) => {
        if (err?.response?.status === 422) {
          handleServerErrors(err)
        } else {
          console.error(err)
        }
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
                {errors.username && <div className="text-danger mb-2">{errors.username[0]}</div>}
                <input
                  name="username"
                  id="username"
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Affiliation</label>
                {errors.affiliation && <div className="text-danger mb-2">{errors.affiliation[0]}</div>}
                <input
                  name="affiliation"
                  id="affiliation"
                  type="text"
                  className="form-control"
                  value={affiliation}
                  onChange={(e) => setAffiliation(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Points</label>
                {errors.points && <div className="text-danger mb-2">{errors.points[0]}</div>}
                <input
                  name="points"
                  key={0}
                  id="points"
                  type="number"
                  className="form-control"
                  value={points}
                  onChange={(e) => setPoints(parseInt(e.target.value || 0, 10))}
                />
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
