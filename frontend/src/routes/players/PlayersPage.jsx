import { useEffect, useState } from 'react'
import PlayerCard from '../../components/PlayerCard'
import playersClient from '../../api/playersClient'

export default function PlayersPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [playersList, setPlayersList] = useState([])

  useEffect(() => {
    playersClient.all().then((res) => {
      setPlayersList(res.data["data"])
    }).finally(() => {
      setIsLoading(false)
    })
  }, [])

  return (
    <div className="container py-4">
      <h1 className="mb-4">Joueurs</h1>
      {isLoading ? (
        <p className="text-muted">Chargement...</p>
      ) : playersList.length === 0 ? (
        <p className="text-muted">Aucun joueur trouvé.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
          {playersList.map((player) => (
            <div className="col" key={player.id}>
              <PlayerCard
                playerId={player.id}
                username={player.username}
                affiliation={player.affiliation}
                points={player.points}
                rank={player.rank}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
