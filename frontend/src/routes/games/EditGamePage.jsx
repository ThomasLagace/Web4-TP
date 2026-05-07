import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import gamesClient from '../../api/gamesClient'
import roundsClient from '../../api/roundsClient'
import playersClient from '../../api/playersClient'

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
    .finally(() => {
      setIsLoading(false)
    })
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()

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
      <h1 className="mb-4">Modifier la partie</h1>

      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-body">

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

              <input
                type="text"
                className="form-control"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
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
