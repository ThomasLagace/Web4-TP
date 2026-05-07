import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import newsClient from '../api/newsClient'

export default function NewsItemPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [news, setNews] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    newsClient.show(id).then((res) => {
      setNews(res.data["data"])
    }).finally(() => {
      setIsLoading(false)
    })
  }, [id])

  if (isLoading) {
    return (
      <div className="container py-4">
        <p className="text-muted">Chargement...</p>
      </div>
    )
  }

  if (!news) {
    return (
      <div className="container py-4">
        <p className="text-muted">Actualité non trouvée.</p>
      </div>
    )
  }

  return (
    <div className="container py-4">
      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate('/news')}
      >
        &larr; Retour aux actualités
      </button>

      <h1 className="mb-2">{news.title}</h1>
      <p className="text-muted mb-4">{news.date}</p>

      <div className="card">
        <div className="card-body">
          <p className="mb-0" style={{ whiteSpace: 'pre-line' }}>{news.content}</p>
        </div>
      </div>
    </div>
  )
}
