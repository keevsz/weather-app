export const forecastsAdapter = (response: any) => {
  return response.data.list.map((forecast: any) => ({
    temp: forecast.main.temp,
    date: forecast.dt_txt,
    icon: forecast.weather[0].icon,
    weather: forecast.weather[0]
  }))
}
