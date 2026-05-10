import { useNavigate } from 'react-router-dom'

export default function NewsCard({ newsId, date, title, content }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/news/${newsId}`)
  }

  return (
    <div onClick={handleClick} className="card hover-card cursor-pointer user-select-none">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle text-muted">{date}</h6>
      </div>
    </div>
  )
}
