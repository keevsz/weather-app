export const cityAdapter = (response: any) => ({
  country: response.data.country,
  lat: response.data.lat,
  lon: response.data.lon,
  name: response.data.name,
  state: response.data.state,
})

export const citiesAdapter = (response: any) => {
  return response.data.map((city: any) => ({
    country: city.country,
    lat: city.lat,
    lon: city.lon,
    name: city.name,
    state: city.state,
  }))
}
