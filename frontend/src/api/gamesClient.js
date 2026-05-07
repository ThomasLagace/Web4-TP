import apiClient from './apiClient'

const gamesClient = {
  all: () => apiClient.get('/games'),
  show: (id) => apiClient.get(`/games/${id}`),
  store: (start_time, round_id, white_player_id, black_player_id) =>
    apiClient.post('/games', { start_time, round_id, white_player_id, black_player_id }),
  update: (id, start_time, status, round_id, white_player_id, black_player_id, winner_player_id) =>
    apiClient.put(`/games/${id}`, { start_time, status, round_id, white_player_id, black_player_id, winner_player_id }),
  delete: (id) => apiClient.delete(`/games/${id}`),
  finish: (id) => apiClient.post(`/games/${id}/finish`),
}

export default gamesClient
