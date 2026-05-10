import apiClient from './apiClient'

const gamesClient = {
  all: (params = {}) => apiClient.get('/games', { params }),
  show: (id) => apiClient.get(`/games/${id}`),
  update: (id, start_time) =>
    apiClient.put(`/games/${id}`, { start_time }),
  delete: (id) => apiClient.delete(`/games/${id}`),
  finish: (id) => apiClient.post(`/games/${id}/finish`),
}

export default gamesClient
