import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import tournamentsClient from '../../api/tournamentsClient'
import playersClient from '../../api/playersClient'

export default function CreateTournamentPage() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [prize, setPrize] = useState('')
  const [playerIds, setPlayerIds] = useState([])
  const [players, setPlayers] = useState([])
  const [isPlayerPickerOpen, setIsPlayerPickerOpen] = useState(false)

  const [isSaving, setIsSaving] = useState(false)
  const [isLoadingPlayers, setIsLoadingPlayers] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    playersClient.all()
      .then((res) => {
        setPlayers(res.data.data ?? [])
      })
      .catch((err) => {
        setError('Une erreur est survenue lors du chargement des joueurs.')
        console.error(err)
      })
      .finally(() => {
        setIsLoadingPlayers(false)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    setError('')
    setIsSaving(true)

    tournamentsClient.store(
      name,
      startDate,
      endDate,
      parseFloat(prize || 0),
      playerIds
    )
      .then(() => {
        navigate('/tournaments')
      })
      .catch((err) => {
        setError('Une erreur est survenue lors de la création du tournoi.')
        console.error(err)
      })
      .finally(() => {
        setIsSaving(false)
      })
  }

  const selectedPlayers = players.filter((player) => playerIds.includes(player.id))
  const availablePlayers = players.filter((player) => !playerIds.includes(player.id))

  const handleAddPlayer = (playerId) => {
    if (!playerIds.includes(playerId)) {
      setPlayerIds([...playerIds, playerId])
    }
    setIsPlayerPickerOpen(false)
  }

  const handleRemovePlayer = (playerId) => {
    setPlayerIds(playerIds.filter((id) => id !== playerId))
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Nouveau tournoi</h1>

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
                onChange={(e) => setPrize(parseFloat(e.target.value || 0))}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Joueurs</label>
              <div className="d-flex flex-wrap gap-2 mb-2">
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => setIsPlayerPickerOpen((open) => !open)}
                  disabled={isLoadingPlayers}
                >
                  + Ajouter un joueur
                </button>
              </div>

              {isPlayerPickerOpen ? (
                <div className="card mb-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <strong>Joueurs disponibles</strong>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => setIsPlayerPickerOpen(false)}
                      >
                        Fermer
                      </button>
                    </div>

                    {isLoadingPlayers ? (
                      <p className="text-muted mb-0">Chargement des joueurs...</p>
                    ) : availablePlayers.length === 0 ? (
                      <p className="text-muted mb-0">Tous les joueurs ont déjà été ajoutés.</p>
                    ) : (
                      <div className="list-group">
                        {availablePlayers.map((player) => (
                          <div
                            key={player.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                          >
                            <span>{player.username}</span>
                            <button
                              type="button"
                              className="btn btn-sm btn-success"
                              onClick={() => handleAddPlayer(player.id)}
                            >
                              Ajouter
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : null}

              <div className="d-flex flex-wrap gap-2">
                {selectedPlayers.length === 0 ? (
                  <span className="text-muted">Aucun joueur sélectionné.</span>
                ) : (
                  selectedPlayers.map((player) => (
                    <span key={player.id} className="badge rounded-pill text-bg-secondary d-inline-flex align-items-center gap-2 px-3 py-2">
                      {player.username}
                      <button
                        type="button"
                        className="btn btn-sm btn-light rounded-pill py-0 px-2"
                        onClick={() => handleRemovePlayer(player.id)}
                      >
                        ×
                      </button>
                    </span>
                  ))
                )}
              </div>
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
