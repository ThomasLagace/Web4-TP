import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ranksClient from '../../api/ranksClient'

export default function CreateRankPage() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [minPoints, setMinPoints] = useState(0)
  const [maxPoints, setMaxPoints] = useState(0)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    setError('')
    setIsSaving(true)

    ranksClient.store(parseInt(minPoints || 0, 10), parseInt(maxPoints || 0, 10), name)
      .then(() => {
        navigate('/ranks')
      })
      .catch((err) => {
        setError('Une erreur est survenue lors de la création du rang.')
        console.error(err)
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
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Elo minimum</label>
              <input
                type="number"
                className="form-control"
                value={minPoints}
                onChange={(e) => setMinPoints(parseInt(e.target.value || 0, 10))}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Elo maximum</label>
              <input
                type="number"
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
