import apiClient from './apiClient'

const newsClient = {
  all: (params = {}) => apiClient.get('/news', { params }),
  show: (id) => apiClient.get(`/news/${id}`),
  store: (date, title, content) => apiClient.post('/news', { date, title, content }),
  update: (id, date, title, content) => apiClient.put(`/news/${id}`, { date, title, content }),
  delete: (id) => apiClient.delete(`/news/${id}`),
}

export default newsClient
