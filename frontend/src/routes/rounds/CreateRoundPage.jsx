import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import roundsClient from '../../api/roundsClient'
import tournamentsClient from '../../api/tournamentsClient'

export default function CreateRoundPage() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [pointsMultiplier, setPointsMultiplier] = useState(1)
  const [tournamentId, setTournamentId] = useState('')

  const [tournaments, setTournaments] = useState([])

  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    tournamentsClient.all()
      .then((res) => {
        setTournaments(res.data.data)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    setIsSaving(true)

    roundsClient.store(
      name,
      status,
      pointsMultiplier,
      tournamentId
    )
    .then(() => {
      navigate('/rounds')
    })
    .finally(() => {
      setIsSaving(false)
    })
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Nouveau round</h1>

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
                <option value="">Choisir un tournoi</option>

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
              {isSaving ? 'Enregistrement...' : 'Créer'}
            </button>

          </div>
        </div>
      </form>
    </div>
  )
}
