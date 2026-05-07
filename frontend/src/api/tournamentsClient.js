import apiClient from './apiClient'

const tournamentsClient = {
  all: () => apiClient.get('/tournaments'),
  show: (id) => apiClient.get(`/tournaments/${id}`),
  store: (name, start_date, end_date, prize) =>
    apiClient.post('/tournaments', { name, start_date, end_date, prize }),
  update: (id, name, start_date, end_date, prize) =>
    apiClient.put(`/tournaments/${id}`, { name, start_date, end_date, prize }),
  delete: (id) => apiClient.delete(`/tournaments/${id}`),
  roundsOf: (tournamentId) => apiClient.get(`/tournaments/${tournamentId}/rounds`),
}

export default tournamentsClient
