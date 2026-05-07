import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import tournamentsClient from '../../api/tournamentsClient'

export default function EditTournamentPage() {
  const { id } = useParams()

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [prize, setPrize] = useState('')

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    tournamentsClient.show(id)
      .then((res) => {
        const tournament = res.data.data

        setName(tournament.name)
        setStartDate(tournament.start_date)
        setEndDate(tournament.end_date)
        setPrize(tournament.prize)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()

    setIsSaving(true)

    tournamentsClient.update(
      id,
      name,
      startDate,
      endDate,
      prize
    )
    .then(() => {
      navigate(`/tournaments/${id}`)
    })
    .finally(() => {
      setIsSaving(false)
    })
  }

  if (isLoading) {
    return (
      <div className="container py-4">
        <p className="text-muted">Chargement...</p>
      </div>
    )
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Modifier le tournoi</h1>

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
              <label className="form-label">Date de début</label>

              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Date de fin</label>

              <input
                type="date"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Prix</label>

              <input
                type="number"
                step="0.01"
                className="form-control"
                value={prize}
                onChange={(e) => setPrize(e.target.value)}
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
    </div>
  )
}
