import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import gamesClient from '../../api/gamesClient'
import roundsClient from '../../api/roundsClient'
import playersClient from '../../api/playersClient'
import useServerValidation from '../../hooks/useServerValidation'

export default function EditGamePage() {
  const { id } = useParams()

  const navigate = useNavigate()

  const [startTime, setStartTime] = useState('')
  const [rounds, setRounds] = useState([])
  const [players, setPlayers] = useState([])

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const { errors, handleServerErrors, clearErrors } = useServerValidation()

  useEffect(() => {
    Promise.all([
      gamesClient.show(id),
      roundsClient.all(),
      playersClient.all(),
    ])
      .then(([gameRes, roundsRes, playersRes]) => {
        const game = gameRes.data.data

        setStartTime(game.start_time)

        setRounds(roundsRes.data.data)
        setPlayers(playersRes.data.data)
      })
      .catch((err) => {
        setError('Une erreur est survenue lors du chargement.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault()

    setError('')
    clearErrors()
    setIsSaving(true)

    gamesClient.update(
      id,
      startTime,
    )
      .then(() => {
        navigate(`/games/${id}`)
      })
      .catch((err) => {
        if (err?.response?.status === 422) {
          handleServerErrors(err)
        } else {
          setError('Une erreur est survenue lors de la mise à jour de la partie.')
        }
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
              {errors.start_time && <div className="text-danger mb-2">{errors.start_time[0]}</div>}
              <input
                name="start_time"
                id="start_time"
                type="datetime-local"
                className="form-control"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
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
