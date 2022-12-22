import {
  Box,
  Container,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useWeatherContext } from '../context/WeatherProvider'
import {
  getForecastService,
  getWeatherService,
} from '../services/weather.services'
import ForecastCard from './ForecastCard'
import { format, addDays } from 'date-fns'
import { es } from 'date-fns/locale'
import DailyForecastCard from './DailyForecastCard'
import { Weather } from '../models/Weather.models'
import { Forecast } from '../models/Forecast.models'
import Loading from './Loading'
import { forecastsAdapter, weatherAdapter } from '../adapters'

const WeatherDetailsBox = () => {
  const { city, setLoadingFunc, loading } = useWeatherContext()
  const [weather, setWeather] = useState<Weather>()
  const [forecasts, setForecasts] = useState<Forecast[]>()

  const getWeather = async () => {
    setLoadingFunc(true)
    const response = await getWeatherService(city.lon, city.lat)
    const response2 = await getForecastService(city.lon, city.lat)
    setWeather(weatherAdapter(response))
    setForecasts(forecastsAdapter(response2))
    setLoadingFunc(false)
  }

  useEffect(() => {
    if (!!!city.name) return
    getWeather()
  }, [city])

  const getDate = (add: number) =>
    format(addDays(Date.now(), add), 'yyyy-MM-dd')

  const getFutureForecast = (): any => {
    if (!forecasts) return

    let array = []
    for (let index = 1; index < 4; index++) {
      let total = 0
      const result = forecasts.filter((f: Forecast) => {
        if (f.date.split(' ')[0] === getDate(index)) {
          total += parseInt(f.temp)
          return f
        }
      })

      const tempValues = result.map((f: Forecast) => parseInt(f.temp))
      const maxValue = Math.max(...tempValues)
      const minValue = Math.min(...tempValues)

      const dayName = format(addDays(Date.now(), index), 'EEEE', {
        locale: es,
      })
      let day = ''
      if (index === 1) day = 'Mañana'
      if (index === 2) day = dayName
      if (index === 3) day = dayName

      array.push({
        averageTemp: Math.round(total / result.length),
        weather: result[0].weather,
        minTemp: Math.round(minValue),
        maxTemp: Math.round(maxValue),
        day,
      })
    }
    return array
  }

  const chanceOfRainc = () => {
    const probably = weather?.rain_chance
      ? weather.rain_chance * 100 + '%'
      : ' 0%'
    return 'Probabilidad de lluvia: ' + parseInt(probably) + '%'
  }

  return (
    <>
      {!weather && <Loading />}
      {weather && (
        <Stack divider={<Divider orientation="horizontal" />} spacing={2}>
          <Container>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="h4" fontWeight={900}>
                  {loading ? <Skeleton /> : city.name}
                </Typography>
                <Typography variant="body2">
                  {loading ? <Skeleton /> : chanceOfRainc()}
                </Typography>
                <Typography variant="h2" fontWeight={900}>
                  {loading ? <Skeleton /> : parseInt(weather.temp) + '°'}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Box height={'120px'}>
                  {loading ? (
                    <Skeleton
                      style={{ float: 'right', marginTop: '35px' }}
                      variant="rounded"
                      width={'80%'}
                      height={'100px'}
                    />
                  ) : (
                    <img
                      width={'100%'}
                      src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
                    ></img>                    
                  )}
                </Box>
              </Grid>
            </Grid>
          </Container>

          <Grid container>
            <Grid item xs={12}>
              <Typography variant="caption" fontWeight={500}>
                PRONÓSTICO DE HOY
              </Typography>
              <Stack direction="row">
                {forecasts?.map((forecast: Forecast, index: number) => {
                  if (index < 3) {
                    return (
                      <ForecastCard
                        loading={loading}
                        forecast={forecast}
                        key={index}
                      ></ForecastCard>
                    )
                  }
                })}
              </Stack>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12}>
              <Typography variant="caption" fontWeight={500}>
                PRONÓSTICOS FUTUROS
              </Typography>
              <br />
              <Stack divider={<Divider orientation="horizontal" />} spacing={1}>
                {getFutureForecast().map((item: any, index: number) => (
                  <DailyForecastCard
                    key={index}
                    item={item}
                    loading={loading}
                  ></DailyForecastCard>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      )}
    </>
  )
}
export default WeatherDetailsBox
