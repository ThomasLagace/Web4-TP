import apiClient from './apiClient'

const playersClient = {
  all: () => apiClient.get('/players'),
  show: (id) => apiClient.get(`players/${id}`),
}

export default playersClient
