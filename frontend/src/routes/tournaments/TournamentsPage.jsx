import { useEffect, useState } from 'react'
import TournamentCard from '../../components/TournamentCard'
import tournamentsClient from '../../api/tournamentsClient'

export default function TournamentsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [tournamentsList, setTournamentsList] = useState([])

  useEffect(() => {
    tournamentsClient.all().then((res) => {
      setTournamentsList(res.data["data"])
    }).finally(() => {
      setIsLoading(false)
    })
  }, [])

  return (
    <div className="container py-4">
      <h1 className="mb-4">Tournois</h1>
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
