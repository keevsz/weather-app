import axios from 'axios'

const appid = 'abb8d408cb2e47932a948ab83d170a3e'
export const getGeolocationService = async (search: string) => {
  const response = await axios.get(
    `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${appid}`
  )
  return response
}

export const getWeatherService = async (lon: string, lat: string) => {
  const response = await axios.get(`
    https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=abb8d408cb2e47932a948ab83d170a3e`)
  return response
}

export const getForecastService = async (lon: string, lat: string) => {
  const response = await axios.get(`
  https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=abb8d408cb2e47932a948ab83d170a3e`)
  return response
}


