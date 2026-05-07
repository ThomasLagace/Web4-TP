import { useNavigate } from 'react-router-dom'

export default function TournamentCard({ tournamentId, name, status, startDate, endDate, prize }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/tournaments/${tournamentId}`)
  }

  return (
    <div onClick={handleClick} className="card hover-card cursor-pointer user-select-none">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <h6 className="card-subtitle text-muted mb-2">{startDate} – {endDate}</h6>
        <div className="d-flex justify-content-between align-items-center mt-2">
          <span className="badge bg-secondary">{status}</span>
          <span className="text-muted small">{prize} $</span>
        </div>
      </div>
    </div>
  )
}
