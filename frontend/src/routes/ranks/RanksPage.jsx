import { useEffect, useState } from 'react'
import RankCard from '../../components/RankCard'
import ranksClient from '../../api/ranksClient'

export default function RanksPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [ranksList, setRanksList] = useState([])

  useEffect(() => {
    ranksClient.all().then((res) => {
      setRanksList(res.data["data"])
    }).finally(() => {
      setIsLoading(false)
    })
  }, [])

  return (
    <div className="container py-4">
      <h1 className="mb-4">Rangs</h1>
      {isLoading ? (
        <p className="text-muted">Chargement...</p>
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
