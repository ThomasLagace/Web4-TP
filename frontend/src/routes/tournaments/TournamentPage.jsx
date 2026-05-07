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

  useEffect(() => {
    Promise.all([
      tournamentsClient.show(id),
      tournamentsClient.roundsOf(id),
    ]).then(([tournamentRes, roundsRes]) => {
      setTournament(tournamentRes.data["data"])
      setRounds(roundsRes.data["data"])
    }).finally(() => {
      setIsLoading(false)
    })
  }, [id])

  if (isLoading) {
    return (
      <div className="container py-4">
        <p className="text-muted">Chargement...</p>
      </div>
    )
  }

  if (!tournament) {
    return (
      <div className="container py-4">
        <p className="text-muted">Tournoi non trouvé.</p>
      </div>
    )
  }

  return (
    <div className="container py-4">
      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate('/tournaments')}
      >
        &larr; Retour aux tournois
      </button>

      <h1 className="mb-4">{tournament.name}</h1>

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
                  <span className="text-muted">Début :</span> {tournament.startDate}
                </li>
                <li className="mb-2">
                  <span className="text-muted">Fin :</span> {tournament.endDate}
                </li>
                <li className="mb-2">
                  <span className="text-muted">Prix :</span>{' '}
                  <strong>{tournament.prize} $</strong>
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
                pointsMultiplier={round.pointsMultiplier}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
