import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import gamesClient from '../../api/gamesClient'
import roundsClient from '../../api/roundsClient'
import playersClient from '../../api/playersClient'

export default function CreateGamePage() {
  const navigate = useNavigate()

  const [startTime, setStartTime] = useState('')
  const [roundId, setRoundId] = useState('')
  const [whitePlayerId, setWhitePlayerId] = useState('')
  const [blackPlayerId, setBlackPlayerId] = useState('')

  const [rounds, setRounds] = useState([])
  const [players, setPlayers] = useState([])

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([
      roundsClient.all(),
      playersClient.all(),
    ])
      .then(([roundsRes, playersRes]) => {
        setRounds(roundsRes.data.data)
        setPlayers(playersRes.data.data)
      })
      .catch((err) => {
        setError('Une erreur est survenue lors du chargement.')
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

    gamesClient.store(
      startTime,
      roundId,
      whitePlayerId,
      blackPlayerId
    )
      .then(() => {
        navigate('/games')
      })
      .catch((err) => {
        setError('Une erreur est survenue lors de la création de la partie.')
        console.error(err)
      })
      .finally(() => {
        setIsSaving(false)
      })
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Nouvelle partie</h1>

      {isLoading ? (
        <p className="text-muted">Chargement...</p>
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
                <label className="form-label">Date et heure</label>

                <input
                  type="datetime-local"
                  className="form-control"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Round</label>

                <select
                  className="form-select"
                  value={roundId}
                  onChange={(e) => setRoundId(e.target.value)}
                >
                  <option value="">Choisir un round</option>

                  {rounds.map((round) => (
                    <option key={round.id} value={round.id}>
                      {round.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Joueur blanc</label>

                <select
                  className="form-select"
                  value={whitePlayerId}
                  onChange={(e) => setWhitePlayerId(e.target.value)}
                >
                  <option value="">Choisir un joueur</option>

                  {players.map((player) => (
                    <option key={player.id} value={player.id}>
                      {player.username}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Joueur noir</label>

                <select
                  className="form-select"
                  value={blackPlayerId}
                  onChange={(e) => setBlackPlayerId(e.target.value)}
                >
                  <option value="">Choisir un joueur</option>

                  {players.map((player) => (
                    <option key={player.id} value={player.id}>
                      {player.username}
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
