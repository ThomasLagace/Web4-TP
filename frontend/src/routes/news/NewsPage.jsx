import { useEffect, useState } from 'react'
import NewsCard from '../components/NewsCard'
import newsClient from '../api/newsClient'

export default function NewsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [newsList, setNewsList] = useState([])

  useEffect(() => {
    newsClient.all().then((res) => {
      setNewsList(res.data["data"])
      setIsLoading(false)
    })
  }, [])

  return (
    <div className="container py-4">
      <h1 className="mb-4">Actualités</h1>
      {isLoading ? (
        <p className="text-muted">Chargement...</p>
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
