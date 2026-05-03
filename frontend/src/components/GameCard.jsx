import './GameCard.css'
import { useEffect } from 'react'
import playersClient from '../api/playersClient'
import { useNavigate } from 'react-router-dom'

export default function GameCard({
  gameId,
  status,
  startTime,
  whitePlayerName,
  blackPlayerName,
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/games/${gameId}`)
  }

  return (
    <div onClick={handleClick} className="card game-card cursor-pointer user-select-none">
      <div className="card-body">
        <h5 className="card-title">{whitePlayerName} contre {blackPlayerName}</h5>
        <h6 className="card-subtitle text-muted">{status} : {startTime}</h6>
      </div>
    </div>
  )
}
