import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import RankCard from '../../components/RankCard'
import Pagination from '../../components/Pagination'
import ranksClient from '../../api/ranksClient'

export default function RanksPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [ranksList, setRanksList] = useState([])
  const [paginationMeta, setPaginationMeta] = useState({
    perPage: 0,
    total: 0,
  })
  const [error, setError] = useState('')
  const currentPage = Math.max(1, Number(searchParams.get('page') ?? 1) || 1)

  useEffect(() => {
    setIsLoading(true)
    setError('')

    ranksClient.all(Object.fromEntries(searchParams.entries()))
      .then((res) => {
        setRanksList(res.data.data ?? [])
        setPaginationMeta({
          perPage: res.data.meta?.per_page ?? 0,
          total: res.data.meta?.total ?? 0,
        })
      })
      .catch((err) => {
        setError('Une erreur est survenue lors du chargement.')
        console.error(err)
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

  const startEntry = paginationMeta.total === 0
    ? 0
    : ((currentPage - 1) * paginationMeta.perPage) + 1
  const endEntry = paginationMeta.total === 0
    ? 0
    : Math.min(currentPage * paginationMeta.perPage, paginationMeta.total)

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Rangs</h1>
        <button
          className="btn btn-success"
          onClick={() => navigate('/ranks/create')}
        >
          + Nouveau rang
        </button>
      </div>
      {isLoading ? (
        <p className="text-muted">Chargement...</p>
      ) : error ? (
        <div className="alert alert-danger" role="alert">{error}</div>
      ) : ranksList.length === 0 ? (
        <p className="text-muted">Aucun rang trouvé.</p>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3 text-muted">
            <small>
              Affichage de {startEntry} à {endEntry} sur {paginationMeta.total} entrées
            </small>
          </div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
            {ranksList.map((rank) => (
              <div className="col" key={rank.id}>
                <RankCard
                  rankId={rank.id}
                  name={rank.name}
                  minPoints={rank.min_points}
                  maxPoints={rank?.max_points ?? "infinie" }
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
