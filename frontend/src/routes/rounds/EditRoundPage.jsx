import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import roundsClient from '../../api/roundsClient'
import tournamentsClient from '../../api/tournamentsClient'

export default function EditRoundPage() {
  const { id } = useParams()

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [pointsMultiplier, setPointsMultiplier] = useState(1)
  const [tournamentId, setTournamentId] = useState('')

  const [tournaments, setTournaments] = useState([])

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    Promise.all([
      roundsClient.show(id),
      tournamentsClient.all(),
    ])
    .then(([roundRes, tournamentsRes]) => {
      const round = roundRes.data.data

      setName(round.name)
      setStatus(round.status)
      setPointsMultiplier(round.points_multiplier)
      setTournamentId(round.tournament_id)

      setTournaments(tournamentsRes.data.data)
    })
    .finally(() => {
      setIsLoading(false)
    })
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()

    setIsSaving(true)

    roundsClient.update(
      id,
      name,
      status,
      pointsMultiplier,
      tournamentId
    )
    .then(() => {
      navigate(`/rounds/${id}`)
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
      <h1 className="mb-4">Modifier le round</h1>

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
              <label className="form-label">Statut</label>

              <input
                type="text"
                className="form-control"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Multiplicateur de points</label>

              <input
                type="number"
                step="0.1"
                className="form-control"
                value={pointsMultiplier}
                onChange={(e) => setPointsMultiplier(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Tournoi</label>

              <select
                className="form-select"
                value={tournamentId}
                onChange={(e) => setTournamentId(e.target.value)}
              >
                {tournaments.map((tournament) => (
                  <option
                    key={tournament.id}
                    value={tournament.id}
                  >
                    {tournament.name}
                  </option>
                ))}
              </select>
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
