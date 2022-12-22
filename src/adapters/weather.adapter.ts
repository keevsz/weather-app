export const weatherAdapter = (response: any) => ({
  temp: response.data.main.temp,
  rain_chance: response.data.rain ? response.data.rain['1h'] : undefined,
  description: response.data.weather[0].description,
  icon: response.data.weather[0].icon,
  main: response.data.weather[0].main,
})
