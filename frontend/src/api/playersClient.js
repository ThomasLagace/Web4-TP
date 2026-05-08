import apiClient from './apiClient'

const playersClient = {
  all: (params = {}) => apiClient.get('/players', { params }),
  show: (id) => apiClient.get(`/players/${id}`),
  store: (username, affiliation, points) =>
    apiClient.post('/players', { username, affiliation, points }),
  update: (id, username, affiliation, points) =>
    apiClient.put(`/players/${id}`, { username, affiliation, points }),
  delete: (id) => apiClient.delete(`/players/${id}`),
}

export default playersClient
