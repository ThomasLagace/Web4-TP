import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ranksClient from '../../api/ranksClient'

export default function CreateRankPage() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [minPoints, setMinPoints] = useState(0)
  const [maxPoints, setMaxPoints] = useState(0)

  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    setIsSaving(true)

    ranksClient.store(minPoints, maxPoints, name)
      .then(() => {
        navigate('/ranks')
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
                onChange={(e) => setMinPoints(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Elo maximum</label>
              <input
                type="number"
                className="form-control"
                value={maxPoints}
                onChange={(e) => setMaxPoints(e.target.value)}
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
