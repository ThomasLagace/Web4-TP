import apiClient from './apiClient'

const newsClient = {
  all = () => apiClient.get('/news'),
}

export default newsClient
