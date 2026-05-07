import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import gamesClient from '../../api/gamesClient'
import roundsClient from '../../api/roundsClient'
import playersClient from '../../api/playersClient'

const STATUSES = ['pending', 'started', 'finished']

export default function EditGamePage() {
  const { id } = useParams()

  const navigate = useNavigate()

  const [startTime, setStartTime] = useState('')
  const [status, setStatus] = useState('')
  const [roundId, setRoundId] = useState('')
  const [whitePlayerId, setWhitePlayerId] = useState('')
  const [blackPlayerId, setBlackPlayerId] = useState('')
  const [winnerPlayerId, setWinnerPlayerId] = useState('')

  const [rounds, setRounds] = useState([])
  const [players, setPlayers] = useState([])

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([
      gamesClient.show(id),
      roundsClient.all(),
      playersClient.all(),
    ])
      .then(([gameRes, roundsRes, playersRes]) => {
        const game = gameRes.data.data

        setStartTime(game.start_time)
        setStatus(game.status)
        setRoundId(game.round_id)
        setWhitePlayerId(game.white_player_id)
        setBlackPlayerId(game.black_player_id)
        setWinnerPlayerId(game.winner_player_id || '')

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
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()

    setError('')
    setIsSaving(true)

    gamesClient.update(
      id,
      startTime,
      status,
      roundId,
      whitePlayerId,
      blackPlayerId,
      winnerPlayerId
    )
      .then(() => {
        navigate(`/games/${id}`)
      })
      .catch((err) => {
        setError('Une erreur est survenue lors de la mise à jour de la partie.')
        console.error(err)
      })
      .finally(() => {
        setIsSaving(false)
      })
  }

  if (isLoading) {
    return (
      <div className="container py-4">
        {error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : (
          <p className="text-muted">Chargement...</p>
        )}
      </div>
    )
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Modifier la partie</h1>

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
              <label className="form-label">Round</label>

              <select
                className="form-select"
                value={roundId}
                onChange={(e) => setRoundId(e.target.value)}
              >
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
                {players.map((player) => (
                  <option key={player.id} value={player.id}>
                    {player.username}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Gagnant</label>

              <select
                className="form-select"
                value={winnerPlayerId}
                onChange={(e) => setWinnerPlayerId(e.target.value)}
              >
                <option value="">Aucun gagnant</option>

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
              {isSaving ? 'Enregistrement...' : 'Sauvegarder'}
            </button>

          </div>
        </div>
      </form>
    </div>
  )
}
