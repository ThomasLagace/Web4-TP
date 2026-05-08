import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import RoundCard from '../../components/RoundCard'
import Pagination from '../../components/Pagination'
import roundsClient from '../../api/roundsClient'

export default function RoundsPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [roundsList, setRoundsList] = useState([])
  const [paginationMeta, setPaginationMeta] = useState({
    perPage: 0,
    total: 0,
  })
  const currentPage = Math.max(1, Number(searchParams.get('page') ?? 1) || 1)

  useEffect(() => {
    setIsLoading(true)
    setError('')

    roundsClient.all(Object.fromEntries(searchParams.entries()))
      .then((res) => {
        setRoundsList(res.data['data'])
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
        <h1>Rondes</h1>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">{error}</div>
      )}

      {isLoading ? (
        <p className="text-muted">Chargement...</p>
      ) : roundsList.length === 0 ? (
        <p className="text-muted">Aucune ronde trouvée.</p>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3 text-muted">
            <small>
              Affichage de {startEntry} à {endEntry} sur {paginationMeta.total} entrées
            </small>
          </div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
            {roundsList.map((round) => (
              <div className="col" key={round.id}>
                <RoundCard
                  roundId={round.id}
                  name={round.name}
                  status={round.status}
                  pointsMultiplier={round.points_multiplier}
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
