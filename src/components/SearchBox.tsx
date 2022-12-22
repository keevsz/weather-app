import { Box, LinearProgress, Stack, TextField } from '@mui/material'
import { lazy, useEffect, useRef } from 'react'
import { citiesAdapter } from '../adapters'
import { useWeatherContext } from '../context/WeatherProvider'
import { City } from '../models/Country.models'
import { getGeolocationService } from '../services/weather.services'

const CityCard = lazy(() => import('./CityCard'))

const SearchBox = () => {
  const { cities, setCitiesFunc, loading, setLoadingFunc } = useWeatherContext()

  const debounceRef = useRef<any>()

  const onChange = async (searchTerm: string) => {
    setLoadingFunc(true)
    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(() => {
      if (!!!searchTerm) {
        setLoadingFunc(false)
        return setCitiesFunc([])
      }
      getGeolocationService(searchTerm).then((response) => {
        setCitiesFunc(citiesAdapter(response))
        setLoadingFunc(false)
      })
    }, 350)
  }

  return (
    <Stack spacing={1}>
      <TextField
        type="text"
        size="small"
        placeholder="Buscar ciudad"
        onChange={(e) => {
          onChange(e.target.value)
        }}
        fullWidth
        autoFocus
      />
      {cities?.map((city: City, index: number) => (
        <CityCard key={index} city={city}></CityCard>
      ))}

      {loading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
    </Stack>
  )
}
export default SearchBox
