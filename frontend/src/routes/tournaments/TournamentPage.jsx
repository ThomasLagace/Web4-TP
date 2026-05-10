import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import tournamentsClient from '../../api/tournamentsClient'
import RoundCard from '../../components/RoundCard'

export default function TournamentPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tournament, setTournament] = useState()
  const [rounds, setRounds] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([
      tournamentsClient.show(id),
      tournamentsClient.roundsOf(id),
    ])
      .then(([tournamentRes, roundsRes]) => {
        setTournament(tournamentRes.data["data"])
        setRounds(roundsRes.data["data"])
      })
      .catch((err) => {
        setError('Une erreur est survenue lors du chargement.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id])

  const handleDelete = () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce tournoi ?")) return

    setIsLoading(true)
    setError('')
    tournamentsClient.delete(id)
      .then(() => {
        navigate('/tournaments')
      })
      .catch((err) => {
        setError('Une erreur est survenue lors de la suppression.')
        setIsLoading(false)
      })
  }

  return (
    <div className="container py-4">
      {isLoading ? (
        <p className="text-muted">Chargement...</p>
      ) : error ? (
        <div className="alert alert-danger" role="alert">{error}</div>
      ) : !tournament ? (
        <p className="text-muted">Tournoi non trouvé.</p>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate('/tournaments')}
            >
              &larr; Retour aux tournois
            </button>
          </div>

          <h1 className="mb-4">{tournament.name}</h1>

          <div className="mb-4 d-flex gap-2">
            {tournament.status !== 'started' ? null : (
              <button
                className="btn btn-warning"
                onClick={() => navigate(`/tournaments/${id}/edit`)}
              >
                Modifier
              </button>
            )}
            <button
              className="btn btn-danger"
              onClick={handleDelete}
              disabled={isLoading}
            >
              Supprimer
            </button>
          </div>

          <div className="row g-4 mb-5">
            <div className="col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">Informations</h5>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">
                      <span className="text-muted">Statut :</span>{' '}
                      <span className="badge bg-secondary">{tournament.status}</span>
                    </li>
                    <li className="mb-2">
                      <span className="text-muted">Début :</span> {tournament.start_date}
                    </li>
                    <li className="mb-2">
                      <span className="text-muted">Prix :</span>{' '}
                      <strong>{tournament.prize} elo</strong>
                    </li>
                    {tournament.winner && (
                      <li className="mb-2">
                        <span className="text-muted">Vainqueur :</span>{' '}
                        <strong>{tournament.winner.username}</strong>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <h2 className="mb-3">Rondes</h2>
          {rounds.length === 0 ? (
            <p className="text-muted">Aucune ronde dans ce tournoi.</p>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
              {rounds.map((round) => (
                <div className="col" key={round.id}>
                  <RoundCard
                    roundId={round.id}
                    name={round.name}
                    status={round.status}
                    pointsMultiplier={round.points_multiplier}
                  />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
