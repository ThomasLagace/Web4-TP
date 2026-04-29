import apiClient from './apiClient'

const gamesClient = {
  finish = (id) => apiClient.post(`/games/${id}/finish`),
}

export default gamesClient
