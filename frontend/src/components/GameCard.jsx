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
    <div onClick={handleClick} className="card hover-card cursor-pointer user-select-none">
      <div className="card-body">
        <h5 className="card-title">{whitePlayerName} contre {blackPlayerName}</h5>
        <div className="d-flex align-items-center gap-2">
          <span className="badge rounded-pill text-bg-secondary">{status}</span>
          <h6 className="card-subtitle text-muted mb-0">{startTime}</h6>
        </div>
      </div>
    </div>
  )
}
