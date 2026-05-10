import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import PlayerCard from '../../components/PlayerCard'
import Pagination from '../../components/Pagination'
import playersClient from '../../api/playersClient'

export default function PlayersPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(true)
  const [playersList, setPlayersList] = useState([])
  const [paginationMeta, setPaginationMeta] = useState({
    perPage: 0,
    total: 0,
  })
  const [error, setError] = useState('')
  const currentPage = Math.max(1, Number(searchParams.get('page') ?? 1) || 1)

  useEffect(() => {
    setIsLoading(true)
    setError('')

    playersClient.all(Object.fromEntries(searchParams.entries()))
      .then((res) => {
        setPlayersList(res.data['data'])
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

  const startEntry = paginationMeta.total === 0
    ? 0
    : ((currentPage - 1) * paginationMeta.perPage) + 1
  const endEntry = paginationMeta.total === 0
    ? 0
    : Math.min(currentPage * paginationMeta.perPage, paginationMeta.total)

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Joueurs</h1>
        <button
          className="btn btn-success"
          onClick={() => navigate('/players/create')}
        >
          + Nouveau joueur
        </button>
      </div>
      {isLoading ? (
        <p className="text-muted">Chargement...</p>
      ) : error ? (
        <div className="alert alert-danger" role="alert">{error}</div>
      ) : playersList.length === 0 ? (
        <p className="text-muted">Aucun joueur trouvé.</p>
      ) : (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3 text-muted">
            <small>
              Affichage de {startEntry} à {endEntry} sur {paginationMeta.total} entrées
            </small>
          </div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
            {playersList.map((player) => (
              <div className="col" key={player.id}>
                <PlayerCard
                  playerId={player.id}
                  username={player.username}
                  affiliation={player.affiliation}
                  points={player.points}
                  rank={player.rank}
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
