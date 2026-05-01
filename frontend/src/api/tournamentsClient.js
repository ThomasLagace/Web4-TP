import apiClient from './apiClient'

const tournamentsClient = {
  all: () => apiClient.get('/games'),
  create: (name, start_date, end_date, prize) => apiClient.post('/tournaments', {
    name,
    start_date,
    end_date,
    prize
  }),
  roundsOf: (tournamentId) => apiClient.get(`/tournaments/${tournamentId}/rounds`),
}

export default tournamentsClient
