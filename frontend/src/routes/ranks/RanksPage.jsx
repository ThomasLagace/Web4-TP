import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RankCard from '../../components/RankCard'
import ranksClient from '../../api/ranksClient'

export default function RanksPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [ranksList, setRanksList] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    ranksClient.all()
      .then((res) => {
        setRanksList(res.data["data"])
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
        <h1>Rangs</h1>
        <button
          className="btn btn-success"
          onClick={() => navigate('/ranks/create')}
        >
          + Nouveau rang
        </button>
      </div>
      {isLoading ? (
        <p className="text-muted">Chargement...</p>
      ) : error ? (
        <div className="alert alert-danger" role="alert">{error}</div>
      ) : ranksList.length === 0 ? (
        <p className="text-muted">Aucun rang trouvé.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
          {ranksList.map((rank) => (
            <div className="col" key={rank.id}>
              <RankCard
                rankId={rank.id}
                name={rank.name}
                minPoints={rank.minPoints}
                maxPoints={rank.maxPoints}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
