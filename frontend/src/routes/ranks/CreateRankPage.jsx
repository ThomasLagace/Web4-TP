import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ranksClient from '../../api/ranksClient'
import useServerValidation from '../../hooks/useServerValidation'

export default function CreateRankPage() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [minPoints, setMinPoints] = useState(0)
  const [maxPoints, setMaxPoints] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const { errors, handleServerErrors, clearErrors } = useServerValidation()

  const handleSubmit = (e) => {
    e.preventDefault()

    setError('')
    clearErrors()
    setIsSaving(true)

    ranksClient.store(parseInt(minPoints || 0, 10), parseInt(maxPoints || 0, 10), name)
      .then(() => {
        navigate('/ranks')
      })
      .catch((err) => {
        if (err?.response?.status === 422) {
          handleServerErrors(err)
        } else {
          setError('Une erreur est survenue lors de la création du rang.')
          console.error(err)
        }
      })
      .finally(() => {
        setIsSaving(false)
      })
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Nouveau rang</h1>

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
              {isSaving ? 'Enregistrement...' : 'Créer'}
            </button>

          </div>
        </div>
      </form>
    </div>
  )
}
