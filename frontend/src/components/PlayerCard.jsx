import { useNavigate } from 'react-router-dom'

export default function PlayerCard({ playerId, username, affiliation, points, rank }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/players/${playerId}`)
  }

  return (
    <div onClick={handleClick} className="card hover-card cursor-pointer user-select-none">
      <div className="card-body">
        <h5 className="card-title">{username}</h5>
        <h6 className="card-subtitle text-muted mb-2">{affiliation}</h6>
        <div className="d-flex justify-content-between align-items-center mt-2">
          <span className="badge bg-secondary">{rank?.name || 'non classé'}</span>
          <span className="text-muted small">{points} elo</span>
        </div>
      </div>
    </div>
  )
}
