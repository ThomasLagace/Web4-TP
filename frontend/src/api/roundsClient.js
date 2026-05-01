import apiClient from './apiClient'

const roundsClient = {
  all: () => apiClient.get('/rounds'),
  gamesOf: (roundId) => apiClient.get(`/rounds/${roundId}/games`),
}

export default roundsClient
