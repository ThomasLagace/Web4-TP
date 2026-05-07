import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NewsCard from '../../components/NewsCard'
import newsClient from '../../api/newsClient'

export default function NewsPage() {
    const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [newsList, setNewsList] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    newsClient.all()
      .then((res) => {
        setNewsList(res.data["data"])
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
        <h1>Actualités</h1>
        <button
          className="btn btn-success"
          onClick={() => navigate('/news/create')}
        >
          + Nouvelle actualité
        </button>
      </div>
      {isLoading ? (
        <p className="text-muted">Chargement...</p>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : newsList.length === 0 ? (
        <p className="text-muted">Aucune actualité trouvée.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
          {newsList.map((news) => (
            <div className="col" key={news.id}>
              <NewsCard
                newsId={news.id}
                date={news.date}
                title={news.title}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
