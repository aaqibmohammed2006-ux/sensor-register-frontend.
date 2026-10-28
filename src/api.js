import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
})

export async function getReadings() {
  const { data } = await api.get('/readings')
  return data
}
export async function createReading(reading) {
  const { data } = await api.post('/readings', reading)
  return data
}
export async function updateReading(id, reading) {
  const { data } = await api.put(`/readings/${id}`, reading)
  return data
}
export async function deleteReading(id) {
  await api.delete(`/readings/${id}`)
}
