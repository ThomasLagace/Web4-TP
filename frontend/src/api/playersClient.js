import apiClient from './apiClient'

const playersClient = {
  all: (params = {}) => apiClient.get('/players', { params }),
  show: (id) => apiClient.get(`/players/${id}`),
  store: (username, affiliation, points, rank_id) =>
    apiClient.post('/players', { username, affiliation, points, rank_id }),
  update: (id, username, affiliation, points, rank_id) =>
    apiClient.put(`/players/${id}`, { username, affiliation, points, rank_id }),
  delete: (id) => apiClient.delete(`/players/${id}`),
}

export default playersClient
