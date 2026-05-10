import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ranksClient from '../../api/ranksClient'
import useServerValidation from '../../hooks/useServerValidation'

export default function EditRankPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [minPoints, setMinPoints] = useState(0)
  const [maxPoints, setMaxPoints] = useState(0)

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const { errors, handleServerErrors, clearErrors } = useServerValidation()

  useEffect(() => {
    ranksClient.show(id)
      .then((res) => {
        const rank = res.data.data

        setName(rank.name)
        setMinPoints(rank.min_points)
        setMaxPoints(rank.max_points)
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
    setError('')
    clearErrors()
    setIsSaving(true)

    ranksClient.update(id, parseInt(minPoints || 0, 10), parseInt(maxPoints || 0, 10), name)
      .then(() => {
        navigate(`/ranks/${id}`)
      })
      .catch((err) => {
        if (err?.response?.status === 422) {
          handleServerErrors(err)
        } else {
          setError('Une erreur est survenue lors de la mise à jour du rang.')
          console.error(err)
        }
      })
      .finally(() => {
        setIsSaving(false)
      })
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Modifier le rang</h1>

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
                <label className="form-label">Nom</label>
                {errors.name && <div className="text-danger mb-2">{errors.name[0]}</div>}
                <input
                  name="name"
                  id="name"
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Elo minimum</label>
                {errors.min_points && <div className="text-danger mb-2">{errors.min_points[0]}</div>}
                <input
                  name="min_points"
                  id="min_points"
                  type="number"
                  min={0}
                  max={maxPoints}
                  className="form-control"
                  value={minPoints}
                  onChange={(e) => setMinPoints(parseInt(e.target.value || 0, 10))}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Elo maximum</label>
                {errors.max_points && <div className="text-danger mb-2">{errors.max_points[0]}</div>}
                <input
                  name="max_points"
                  id="max_points"
                  type="number"
                  min={minPoints}
                  className="form-control"
                  value={maxPoints}
                  onChange={(e) => setMaxPoints(parseInt(e.target.value || 0, 10))}
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
