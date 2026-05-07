import { useEffect, useState } from 'react'
import RoundCard from '../../components/RoundCard'
import roundsClient from '../../api/roundsClient'

export default function RoundsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [roundsList, setRoundsList] = useState([])

  useEffect(() => {
    roundsClient.all().then((res) => {
      setRoundsList(res.data["data"])
    }).finally(() => {
      setIsLoading(false)
    })
  }, [])

  return (
    <div className="container py-4">
      <h1 className="mb-4">Rondes</h1>
      {isLoading ? (
        <p className="text-muted">Chargement...</p>
      ) : roundsList.length === 0 ? (
        <p className="text-muted">Aucune ronde trouvée.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
          {roundsList.map((round) => (
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
