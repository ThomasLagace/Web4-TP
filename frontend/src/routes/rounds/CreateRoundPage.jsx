import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import roundsClient from '../../api/roundsClient'
import tournamentsClient from '../../api/tournamentsClient'

const STATUSES = ['pending', 'started', 'finished']

export default function CreateRoundPage() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [pointsMultiplier, setPointsMultiplier] = useState(1)
  const [tournamentId, setTournamentId] = useState('')

  const [tournaments, setTournaments] = useState([])

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    tournamentsClient.all()
      .then((res) => {
        setTournaments(res.data.data)
      })
      .catch((err) => {
        setError('Une erreur est survenue lors du chargement des tournois.')
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    setError('')
    setIsSaving(true)

    roundsClient.store(
      name,
      status,
      parseFloat(pointsMultiplier || 1),
      tournamentId
    )
      .then(() => {
        navigate('/rounds')
      })
      .catch((err) => {
        setError('Une erreur est survenue lors de la création du round.')
        console.error(err)
      })
      .finally(() => {
        setIsSaving(false)
      })
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Nouvelle ronde</h1>

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
                <label className="form-label">Statut</label>

                <select
                  className="form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Multiplicateur de points</label>

                <input
                  type="number"
                  step="0.1"
                  className="form-control"
                  value={pointsMultiplier}
                  onChange={(e) => setPointsMultiplier(parseFloat(e.target.value || 1))}
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
      )}
    </div>
  )
}
