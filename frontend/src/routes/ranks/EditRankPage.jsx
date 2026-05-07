import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ranksClient from '../../api/ranksClient'

export default function EditRankPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [minPoints, setMinPoints] = useState(0)
  const [maxPoints, setMaxPoints] = useState(0)

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    ranksClient.show(id)
      .then((res) => {
        const rank = res.data.data

        setName(rank.name)
        setMinPoints(rank.min_points)
        setMaxPoints(rank.max_points)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()

    setIsSaving(true)

    ranksClient.update(id, minPoints, maxPoints, name)
      .then(() => {
        navigate(`/ranks/${id}`)
      })
      .finally(() => {
        setIsSaving(false)
      })
  }

  if (isLoading) {
    return <div className="container py-4">Chargement...</div>
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Modifier le rang</h1>

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
              {isSaving ? 'Enregistrement...' : 'Sauvegarder'}
            </button>

          </div>
        </div>
      </form>
    </div>
  )
}
