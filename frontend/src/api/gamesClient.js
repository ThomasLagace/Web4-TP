import apiClient from './apiClient'

const gamesClient = {
  all: (params = {}) => apiClient.get('/games', { params }),
  show: (id) => apiClient.get(`/games/${id}`),
  store: (start_time, round_id, white_player_id, black_player_id) =>
    apiClient.post('/games', { start_time, round_id, white_player_id, black_player_id }),
  update: (id, start_time) =>
    apiClient.put(`/games/${id}`, { start_time }),
  delete: (id) => apiClient.delete(`/games/${id}`),
  finish: (id) => apiClient.post(`/games/${id}/finish`),
}

export default gamesClient
