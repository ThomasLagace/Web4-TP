import apiClient from './apiClient'

const newsClient = {
  all: () => apiClient.get('/news'),
  show: (id) => apiClient.get(`/news/${id}`),
  store: (date, title, content) => apiClient.post(`/news`, { date, title, content }),
  update: (date, title, content) => apiClient.put(`/news`, { date, title, content }),
  delete: (id) => apiClient.delete(`/news/${id}`),
}

export default newsClient
