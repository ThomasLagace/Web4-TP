import apiClient from './apiClient'

const tournamentsClient = {
  create = (name, start_date, end_date, prize) => apiClient.post('/tournaments', {
    name,
    start_date,
    end_date,
    prize
  }),
}

export default tournamentsClient
