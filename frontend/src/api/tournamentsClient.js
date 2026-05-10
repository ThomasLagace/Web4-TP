import apiClient from './apiClient'

const tournamentsClient = {
  all: (params = {}) => apiClient.get('/tournaments', { params }),
  show: (id) => apiClient.get(`/tournaments/${id}`),
  store: (name, start_date, prize, player_ids) =>
    apiClient.post('/tournaments', { name, start_date, prize, player_ids }),
  update: (id, name, start_date, prize) =>
    apiClient.put(`/tournaments/${id}`, { name, start_date, prize }),
  delete: (id) => apiClient.delete(`/tournaments/${id}`),
  roundsOf: (tournamentId) => apiClient.get(`/tournaments/${tournamentId}/rounds`),
}

export default tournamentsClient
