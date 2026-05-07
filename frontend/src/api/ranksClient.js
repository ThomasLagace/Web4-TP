import apiClient from './apiClient'

const ranksClient = {
  all: () => apiClient.get('/ranks'),
  show: (id) => apiClient.get(`/ranks/${id}`),
  store: (minPoints, maxPoints, name) => apiClient.post('/ranks', { minPoints, maxPoints, name }),
  update: (minPoints, maxPoints, name) => apiClient.put('/ranks', { minPoints, maxPoints, name }),
  show: (id) => apiClient.delete(`/ranks/${id}`),
}

export default ranksClient
