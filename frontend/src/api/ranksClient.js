import apiClient from './apiClient'

const ranksClient = {
  all: (params = {}) => apiClient.get('/ranks', { params }),
  show: (id) => apiClient.get(`/ranks/${id}`),
  store: (min_points, max_points, name) => apiClient.post('/ranks', { min_points, max_points, name }),
  update: (id, min_points, max_points, name) => apiClient.put(`/ranks/${id}`, { min_points, max_points, name }),
  delete: (id) => apiClient.delete(`/ranks/${id}`),
}

export default ranksClient
