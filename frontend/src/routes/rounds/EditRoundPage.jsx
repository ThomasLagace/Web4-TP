import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import roundsClient from '../../api/roundsClient'
import tournamentsClient from '../../api/tournamentsClient'

export default function EditRoundPage() {
  const { id } = useParams()

  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [pointsMultiplier, setPointsMultiplier] = useState(1)
  const [tournamentId, setTournamentId] = useState('')

  const [tournaments, setTournaments] = useState([])

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([
      roundsClient.show(id),
      tournamentsClient.all(),
    ])
      .then(([roundRes, tournamentsRes]) => {
        const round = roundRes.data.data

        setName(round.name)
        setPointsMultiplier(round.points_multiplier)
        setTournamentId(round.tournament_id)

        setTournaments(tournamentsRes.data.data)
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
    setIsSaving(true)

    roundsClient.update(
      id,
      name,
      parseFloat(pointsMultiplier || 1),
      tournamentId
    )
      .then(() => {
        navigate(`/rounds/${id}`)
      })
      .catch((err) => {
        setError('Une erreur est survenue lors de la mise à jour du round.')
        console.error(err)
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

                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Multiplicateur de points</label>

                <input
                  type="number"
                  className="form-control"
                  min={1}
                  max={5}
                  value={pointsMultiplier}
                  onChange={(e) => setPointsMultiplier(parseInt(e.target.value || 1))}
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
      )}
    </div>
  )
}
