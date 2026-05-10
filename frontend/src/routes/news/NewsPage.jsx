import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import NewsCard from '../../components/NewsCard'
import Pagination from '../../components/Pagination'
import newsClient from '../../api/newsClient'

export default function NewsPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [newsList, setNewsList] = useState([])
  const [paginationMeta, setPaginationMeta] = useState({
    perPage: 0,
    total: 0,
  })
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState(searchParams.get('title') ?? '')
  const currentPage = Math.max(1, Number(searchParams.get('page') ?? 1) || 1)

  useEffect(() => {
    setSearchTerm(searchParams.get('title') ?? '')
  }, [searchParams])

  useEffect(() => {
    setIsLoading(true)
    setError('')

    newsClient.all(Object.fromEntries(searchParams.entries()))
      .then((res) => {
        setNewsList(res.data['data'])
        setPaginationMeta({
          perPage: res.data.meta?.per_page ?? 0,
          total: res.data.meta?.total ?? 0,
        })
      })
      .catch((err) => {
        setError('Une erreur est survenue lors du chargement.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [searchParams])

  const totalPages = paginationMeta.perPage > 0
    ? Math.ceil(paginationMeta.total / paginationMeta.perPage)
    : 0

  const handlePageChange = (page) => {
    const nextParams = new URLSearchParams(searchParams)
    nextParams.set('page', String(page))
    setSearchParams(nextParams)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()

    const nextParams = new URLSearchParams(searchParams)
    const trimmedSearchTerm = searchTerm.trim()

    if (trimmedSearchTerm) {
      nextParams.set('title', trimmedSearchTerm)
    } else {
      nextParams.delete('title')
    }

    nextParams.set('page', '1')
    setSearchParams(nextParams)
  }

  const startEntry = paginationMeta.total === 0
    ? 0
    : ((currentPage - 1) * paginationMeta.perPage) + 1
  const endEntry = paginationMeta.total === 0
    ? 0
    : Math.min(currentPage * paginationMeta.perPage, paginationMeta.total)

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
      <form className="mb-4 d-flex gap-2" onSubmit={handleSearchSubmit}>
        <input
          type="search"
          className="form-control"
          placeholder="Rechercher par titre"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button type="submit" className="btn btn-outline-primary">
          Rechercher
        </button>
      </form>
      {isLoading ? (
        <p className="text-muted">Chargement...</p>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : newsList.length === 0 ? (
        <p className="text-muted">Aucune actualité trouvée.</p>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3 text-muted">
            <small>
              Affichage de {startEntry} à {endEntry} sur {paginationMeta.total} entrées
            </small>
          </div>
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
        </>
      )}

      {totalPages > 1 ? (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isDisabled={isLoading}
        />
      ) : null}
    </div>
  )
}
