import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import gamesClient from '../api/gamesClient'
import newsClient from '../api/newsClient'
import playersClient from '../api/playersClient'
import ranksClient from '../api/ranksClient'
import roundsClient from '../api/roundsClient'
import tournamentsClient from '../api/tournamentsClient'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [dashboard, setDashboard] = useState({
    games: { total: 0, items: [] },
    players: { total: 0 },
    ranks: { total: 0 },
    rounds: { total: 0 },
    tournaments: { total: 0, items: [] },
    news: { total: 0, items: [] },
  })

  useEffect(() => {
    let isMounted = true

    const fetchDashboard = async () => {
      try {
        const [gamesResponse, playersResponse, ranksResponse, roundsResponse, tournamentsResponse, newsResponse] = await Promise.all([
          gamesClient.all(),
          playersClient.all(),
          ranksClient.all(),
          roundsClient.all(),
          tournamentsClient.all(),
          newsClient.all(),
        ])

        if (!isMounted) {
          return
        }

        setDashboard({
          games: {
            total: gamesResponse.data.meta?.total ?? 0,
            items: gamesResponse.data.data ?? [],
          },
          players: {
            total: playersResponse.data.meta?.total ?? 0,
          },
          ranks: {
            total: ranksResponse.data.meta?.total ?? 0,
          },
          rounds: {
            total: roundsResponse.data.meta?.total ?? 0,
          },
          tournaments: {
            total: tournamentsResponse.data.meta?.total ?? 0,
            items: tournamentsResponse.data.data ?? [],
          },
          news: {
            total: newsResponse.data.meta?.total ?? 0,
            items: newsResponse.data.data ?? [],
          },
        })
      } catch (fetchError) {
        if (!isMounted) {
          return
        }

        setError('Une erreur est survenue lors du chargement des données.')
        console.error(fetchError)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchDashboard()

    return () => {
      isMounted = false
    }
  }, [])

  const latestTournament = dashboard.tournaments.items[0]
  const latestNews = dashboard.news.items[0]

  return (
    <div className="bg-light min-vh-100">
      <section className="container py-5">
        <div className="row align-items-center g-5 py-4">
          <div className="col-lg-7">
            <span className="badge rounded-pill text-bg-dark mb-3 px-3 py-2">Plateforme de tournoi d'échecs</span>
            <h1 className="display-4 fw-bold lh-1 mb-3">
              Suivez les parties, les joueurs et les tournois avec des données réelles.
            </h1>
            <p className="lead text-secondary mb-4">
              Cette page d'accueil affiche directement les chiffres et les dernières entrées.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <Link to="/games" className="btn btn-primary btn-lg px-4">
                Voir les parties
              </Link>
              <Link to="/tournaments" className="btn btn-outline-secondary btn-lg px-4">
                Explorer les tournois
              </Link>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-4 p-md-5">
                <div className="d-flex justify-content-between align-items-start mb-4">
                  <div>
                    <p className="text-uppercase text-secondary small mb-1">Aperçu en direct</p>
                    <h2 className="h4 mb-0">Résumé du tableau de bord</h2>
                  </div>
                  <span className="badge text-bg-success">En ligne</span>
                </div>

                {isLoading ? (
                  <p className="text-muted mb-0">Chargement des données...</p>
                ) : error ? (
                  <div className="alert alert-danger mb-0" role="alert">
                    {error}
                  </div>
                ) : (
                  <div className="row g-3">
                    <div className="col-6">
                      <div className="p-3 rounded-3 bg-primary-subtle border">
                        <div className="text-secondary small">Parties</div>
                        <div className="fs-3 fw-bold">{dashboard.games.total}</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="p-3 rounded-3 bg-success-subtle border">
                        <div className="text-secondary small">Joueurs</div>
                        <div className="fs-3 fw-bold">{dashboard.players.total}</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="p-3 rounded-3 bg-warning-subtle border">
                        <div className="text-secondary small">Rangs</div>
                        <div className="fs-3 fw-bold">{dashboard.ranks.total}</div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="p-3 rounded-3 bg-danger-subtle border">
                        <div className="text-secondary small">Actualités</div>
                        <div className="fs-3 fw-bold">{dashboard.news.total}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-5">
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body p-4">
                <h3 className="h5">Tournois</h3>
                <p className="text-secondary mb-2">
                  {isLoading ? 'Chargement...' : `${dashboard.tournaments.total} tournoi(s) enregistrés`}
                </p>
                <p className="mb-0 text-muted small">
                  {latestTournament ? `Dernier tournoi: ${latestTournament.name}` : 'Aucun tournoi disponible pour le moment.'}
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body p-4">
                <h3 className="h5">Rondes</h3>
                <p className="text-secondary mb-2">
                  {isLoading ? 'Chargement...' : `${dashboard.rounds.total} ronde(s) enregistrées`}
                </p>
                <p className="mb-0 text-muted small">
                  Gérez l'avancement des tournois à partir des rondes disponibles.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body p-4">
                <h3 className="h5">Dernière actualité</h3>
                <p className="text-secondary mb-2">
                  {isLoading ? 'Chargement...' : latestNews ? latestNews.title : 'Aucune actualité disponible.'}
                </p>
                <p className="mb-0 text-muted small">
                  {latestNews ? `Publiée le ${latestNews.date}` : 'Suivez les annonces importantes ici.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h3 className="h5 mb-0">Dernières parties</h3>
                  <Link to="/games" className="link-secondary text-decoration-none small">
                    Voir tout
                  </Link>
                </div>

                {isLoading ? (
                  <p className="text-muted mb-0">Chargement...</p>
                ) : dashboard.games.items.length === 0 ? (
                  <p className="text-muted mb-0">Aucune partie disponible.</p>
                ) : (
                  <div className="list-group list-group-flush">
                    {dashboard.games.items.slice(0, 3).map((game) => (
                      <div key={game.id} className="list-group-item px-0 d-flex justify-content-between align-items-center">
                        <div>
                          <div className="fw-semibold">
                            {game.white_player?.username ?? 'À déterminer'} contre {game.black_player?.username ?? 'À déterminer'}
                          </div>
                          <div className="text-muted small">{game.status} · {game.start_time}</div>
                        </div>
                        <span className="badge text-bg-light">#{game.id}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h3 className="h5 mb-0">Données récentes</h3>
                  <Link to="/news" className="link-secondary text-decoration-none small">
                    Actualités
                  </Link>
                </div>

                {isLoading ? (
                  <p className="text-muted mb-0">Chargement...</p>
                ) : (
                  <div className="list-group list-group-flush">
                    <div className="list-group-item px-0 d-flex justify-content-between align-items-center">
                      <span>Joueurs enregistrés</span>
                      <span className="badge text-bg-light">{dashboard.players.total}</span>
                    </div>
                    <div className="list-group-item px-0 d-flex justify-content-between align-items-center">
                      <span>Tournois enregistrés</span>
                      <span className="badge text-bg-light">{dashboard.tournaments.total}</span>
                    </div>
                    <div className="list-group-item px-0 d-flex justify-content-between align-items-center">
                      <span>Rondes enregistrées</span>
                      <span className="badge text-bg-light">{dashboard.rounds.total}</span>
                    </div>
                    <div className="list-group-item px-0 d-flex justify-content-between align-items-center">
                      <span>Rangs enregistrés</span>
                      <span className="badge text-bg-light">{dashboard.ranks.total}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
