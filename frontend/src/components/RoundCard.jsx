import { useNavigate } from 'react-router-dom'

export default function RoundCard({ roundId, name, status, pointsMultiplier }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/rounds/${roundId}`)
  }

  return (
    <div onClick={handleClick} className="card hover-card cursor-pointer user-select-none">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <h6 className="card-subtitle text-muted mb-2">{status}</h6>
        <span className="badge bg-secondary">x{pointsMultiplier} elo</span>
      </div>
    </div>
  )
}
