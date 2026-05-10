import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Pagination from '../../components/Pagination'

import tournamentsClient from '../../api/tournamentsClient'
import playersClient from '../../api/playersClient'
import useServerValidation from '../../hooks/useServerValidation'
import useClientValidation from '../../hooks/useClientValidation'

const MAX_PLAYERS = 16

export default function CreateTournamentPage() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [prize, setPrize] = useState('')
  const [playerIds, setPlayerIds] = useState([])
  const [players, setPlayers] = useState([])
  const [allPlayersList, setAllPlayersList] = useState([])
  const [isPlayerPickerOpen, setIsPlayerPickerOpen] = useState(false)
  const [playersPage, setPlayersPage] = useState(1)
  const [playersPaginationMeta, setPlayersPaginationMeta] = useState({ perPage: 0, total: 0 })

  const [isSaving, setIsSaving] = useState(false)
  const [isLoadingPlayers, setIsLoadingPlayers] = useState(true)
  const [error, setError] = useState('')
  const { errors, setErrors, handleServerErrors, clearErrors } = useServerValidation()
  const { validate } = useClientValidation()

  useEffect(() => {
    setIsLoadingPlayers(true)
    playersClient.all({ page: playersPage })
      .then((res) => {
        const fetchedPlayers = res.data.data ?? []
        setPlayers(fetchedPlayers)
        setPlayersPaginationMeta({
          perPage: res.data.meta?.per_page ?? 0,
          total: res.data.meta?.total ?? 0,
        })
        setAllPlayersList((prev) => {
          const existingIds = new Set(prev.map((p) => p.id))
          return [...prev, ...fetchedPlayers.filter((p) => !existingIds.has(p.id))]
        })
      })
      .catch((err) => {
        setError('Une erreur est survenue lors du chargement des joueurs.')
      })
      .finally(() => {
        setIsLoadingPlayers(false)
      })
  }, [playersPage])

  const handleSubmit = (e) => {
    e.preventDefault()

    setError('')
    clearErrors()
    const clientErrors = validate({
      name: { required: true, minLength: 3 },
      start_date: { required: true },
      prize: { numeric: true, min: 0 },
      playerIds: { required: true },
    }, { name, start_date: startDate, prize, playerIds })

    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors)
      const first = Object.keys(clientErrors)[0]
      const el = document.querySelector(`[name="${first}"]`) || document.getElementById(first)
      if (el && el.focus) el.focus()
      setIsSaving(false)
      return
    }
    setIsSaving(true)

    tournamentsClient.store(
      name,
      startDate,
      parseInt(prize || 0),
      playerIds
    )
      .then(() => {
        navigate('/tournaments')
      })
      .catch((err) => {
        if (err?.response?.status === 422) {
          handleServerErrors(err)
        } else {
          setError('Une erreur est survenue lors de la création du tournoi.')
        }
      })
      .finally(() => {
        setIsSaving(false)
      })
  }

  const selectedPlayers = allPlayersList.filter((player) => playerIds.includes(player.id))
  const availablePlayers = players.filter((player) => !playerIds.includes(player.id))

  const handleAddPlayer = (playerId) => {
    if (!playerIds.includes(playerId) && playerIds.length < MAX_PLAYERS) {
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

                {errors.name && <div className="text-danger mb-2">{errors.name[0]}</div>}
                <input
                  name="name"
                  id="name"
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="mb-3">
              <label className="form-label">Date de début</label>

                {errors.start_date && <div className="text-danger mb-2">{errors.start_date[0]}</div>}
                <input
                  name="start_date"
                  id="start_date"
                  type="date"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
            </div>

            <div className="mb-3">
              <label className="form-label">Prix</label>

                {errors.prize && <div className="text-danger mb-2">{errors.prize[0]}</div>}
                <input
                  name="prize"
                  id="prize"
                  type="number"
                  step="0.01"
                  className="form-control"
                  value={prize}
                  onChange={(e) => setPrize(parseFloat(e.target.value || 0))}
                />
            </div>

            <div className="mb-3">
              <label className="form-label">Joueurs</label>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => setIsPlayerPickerOpen((open) => !open)}
                    disabled={isLoadingPlayers || playerIds.length >= MAX_PLAYERS}
                  >
                    + Ajouter un joueur
                  </button>
                </div>
                <small className="text-muted">
                  {playerIds.length}/{MAX_PLAYERS} joueurs sélectionnés
                </small>
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
                    ) : (
                      <>
                        {availablePlayers.length === 0 ? (
                          <p className="text-muted mb-3">Tous les joueurs disponibles sur cette page ont déjà été ajoutés.</p>
                        ) : (
                          <div className="list-group mb-3">
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
                                  disabled={playerIds.length >= MAX_PLAYERS}
                                >
                                  Ajouter
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        {playersPaginationMeta.perPage > 0 && playersPaginationMeta.total > playersPaginationMeta.perPage ? (
                          <div className="mt-3">
                            <Pagination
                              currentPage={playersPage}
                              totalPages={Math.ceil(playersPaginationMeta.total / playersPaginationMeta.perPage)}
                              onPageChange={(p) => setPlayersPage(p)}
                              isDisabled={isLoadingPlayers}
                            />
                          </div>
                        ) : null}
                      </>
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
