import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PlayerCard from '../../components/PlayerCard'
import playersClient from '../../api/playersClient'

export default function PlayersPage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [playersList, setPlayersList] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    playersClient.all()
      .then((res) => {
        setPlayersList(res.data["data"])
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
        <h1>Joueurs</h1>
        <button className="btn btn-success" onClick={() => navigate('/players/create')}>
          + Nouveau joueur
        </button>
      </div>
      {isLoading ? (
        <p className="text-muted">Chargement...</p>
      ) : error ? (
        <div className="alert alert-danger" role="alert">{error}</div>
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
