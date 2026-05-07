import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TournamentCard from '../../components/TournamentCard'
import tournamentsClient from '../../api/tournamentsClient'

export default function TournamentsPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [tournamentsList, setTournamentsList] = useState([])

  useEffect(() => {
    tournamentsClient.all()
      .then((res) => {
        setTournamentsList(res.data["data"])
      })
      .catch((err) => {
        setError('Une erreur est survenue lors du chargement.')
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Tournois</h1>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/tournaments/create')}
        >
          + Nouveau tournoi
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">{error}</div>
      )}

      {isLoading ? (
        <p className="text-muted">Chargement...</p>
      ) : tournamentsList.length === 0 ? (
        <p className="text-muted">Aucun tournoi trouvé.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
          {tournamentsList.map((tournament) => (
            <div className="col" key={tournament.id}>
              <TournamentCard
                tournamentId={tournament.id}
                name={tournament.name}
                status={tournament.status}
                startDate={tournament.startDate}
                endDate={tournament.endDate}
                prize={tournament.prize}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
