import { useEffect, useState } from 'react'
import GameCard from '../../components/GameCard'
import gamesClient from '../../api/gamesClient'

export default function GamesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [gamesList, setGamesList] = useState([])

  useEffect(() => {
    gamesClient.all().then((res) => {
      setGamesList(res.data["data"])
    }).finally(() => {
      setIsLoading(false)
    })
  }, [])

  return (
    <div className="container py-4">
      <h1 className="mb-4">Parties</h1>
      {isLoading ? (
        <p className="text-muted">Chargement...</p>
      ) : gamesList.length === 0 ? (
        <p className="text-muted">Aucune partie trouvée.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
          {gamesList.map((game) => (
            <div className="col" key={game.gameId}>
              <GameCard
                gameId={game.gameId}
                status={game.status}
                startTime={game.startTime}
                whitePlayerName={game.whitePlayerName}
                blackPlayerName={game.blackPlayerName}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
