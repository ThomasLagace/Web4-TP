import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import newsClient from '../../api/newsClient'

export default function NewsItemPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [news, setNews] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    newsClient.show(id)
      .then((res) => {
        setNews(res.data["data"])
      })
      .catch((err) => {
        setError('Une erreur est survenue lors du chargement.')
        console.error(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [id])

  return (
    <div className="container py-4">
      {isLoading ? (
        <p className="text-muted">Chargement...</p>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : !news ? (
        <p className="text-muted">Actualité non trouvée.</p>
      ) : (
        <>
          <button
            className="btn btn-outline-secondary mb-4"
            onClick={() => navigate('/news')}
          >
            &larr; Retour aux actualités
          </button>

          <div className="mb-4 d-flex gap-2">
            <button
              className="btn btn-warning"
              onClick={() => navigate(`/news/${id}/edit`)}
            >
              Modifier
            </button>
          </div>

          <h1 className="mb-2">{news.title}</h1>
          <p className="text-muted mb-4">{news.date}</p>

          <div className="card">
            <div className="card-body">
              <p className="mb-0" style={{ whiteSpace: 'pre-line' }}>{news.content}</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
