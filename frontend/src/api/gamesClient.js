import apiClient from './apiClient'

const gamesClient = {
  all: () => apiClient.get('/games'),
  show: (id) => apiClient.get(`/games/${id}`),
  finish: (id) => apiClient.post(`/games/${id}/finish`),
}

export default gamesClient
