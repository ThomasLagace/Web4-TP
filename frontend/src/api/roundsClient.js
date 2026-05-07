import apiClient from './apiClient'

const roundsClient = {
  all: () => apiClient.get('/rounds'),
  show: (id) => apiClient.get(`/rounds/${id}`),
  store: (name, status, points_multiplier, tournament_id) =>
    apiClient.post('/rounds', { name, status, points_multiplier, tournament_id }),
  update: (id, name, status, points_multiplier, tournament_id) =>
    apiClient.put(`/rounds/${id}`, { name, status, points_multiplier, tournament_id }),
  delete: (id) => apiClient.delete(`/rounds/${id}`),
  gamesOf: (roundId) => apiClient.get(`/rounds/${roundId}/games`),
}

export default roundsClient
