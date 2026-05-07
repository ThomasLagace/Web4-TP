import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RoundCard from '../../components/RoundCard'
import roundsClient from '../../api/roundsClient'

export default function RoundsPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [roundsList, setRoundsList] = useState([])

  useEffect(() => {
    roundsClient.all()
      .then((res) => {
        setRoundsList(res.data["data"])
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
        <h1>Rondes</h1>
        <button
          className="btn btn-success"
          onClick={() => navigate('/rounds/create')}
        >
          + Nouvelle ronde
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">{error}</div>
      )}

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
