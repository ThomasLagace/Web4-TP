import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import roundsClient from '../../api/roundsClient'
import useServerValidation from '../../hooks/useServerValidation'

export default function EditRoundPage() {
  const { id } = useParams()

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [pointsMultiplier, setPointsMultiplier] = useState(1)

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const { errors, handleServerErrors, clearErrors } = useServerValidation()

  useEffect(() => {
    Promise.all([
      roundsClient.show(id),
    ])
      .then(([roundRes]) => {
        const round = roundRes.data.data

        setName(round.name)
        setPointsMultiplier(round.points_multiplier)
      })
      .catch((err) => {
        setError('Une erreur est survenue lors du chargement.')
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

    roundsClient.update(
      id,
      name,
      parseInt(pointsMultiplier || 1),
    )
      .then(() => {
        navigate(`/rounds/${id}`)
      })
      .catch((err) => {
        if (err?.response?.status === 422) {
          handleServerErrors(err)
        } else {
          setError('Une erreur est survenue lors de la mise à jour du round.')
        }
      })
      .finally(() => {
        setIsSaving(false)
      })
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Modifier la ronde</h1>

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
                <label className="form-label">Multiplicateur de points</label>

                {errors.points_multiplier && <div className="text-danger mb-2">{errors.points_multiplier[0]}</div>}
                <input
                  name="points_multiplier"
                  id="points_multiplier"
                  type="number"
                  className="form-control"
                  min={1}
                  max={5}
                  value={pointsMultiplier}
                  onChange={(e) => setPointsMultiplier(parseInt(e.target.value || 1))}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSaving}
              >
                {isSaving ? 'Enregistrement...' : 'Sauvegarder'}
              </button>

            </div>
          </div>
        </form>
      )}
    </div>
  )
}
