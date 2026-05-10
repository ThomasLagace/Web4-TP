import { useNavigate } from 'react-router-dom'

export default function RankCard({ rankId, name, minPoints, maxPoints }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/ranks/${rankId}`)
  }

  return (
    <div onClick={handleClick} className="card hover-card cursor-pointer user-select-none">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <h6 className="card-subtitle text-muted">
          {minPoints} – {maxPoints} elo
        </h6>
      </div>
    </div>
  )
}
