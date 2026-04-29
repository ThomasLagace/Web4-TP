import apiClient from './apiClient'

const ranksClient = {
  all = () => apiClient.get('/ranks'),
}

export default ranksClient
