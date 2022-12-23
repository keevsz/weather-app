import {
  Box,
  createTheme,
  Paper,
  ThemeProvider,
  Typography,
} from '@mui/material'
import { lazy, Suspense, useState } from 'react'
import { Loading, Options, PrincipalLayout, SearchBox } from './components'
import { useWeatherContext } from './context/WeatherProvider'
import weatherImg from './assets/weather.png'

const WeatherDetailsBox = lazy(() => import('./components/WeatherDetailsBox'))

export const App = () => {
  const { cities, city, visibleSearch } = useWeatherContext()
  const [mode, setMode] = useState(false)

  const theme = createTheme({
    palette: {
      mode: mode ? 'light' : 'dark',
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <PrincipalLayout>
        <>
          <Options mode={mode} setMode={setMode}></Options>
          <Box style={{ textAlign: 'center' }}>
            <Typography variant="h5" fontWeight={'bold'}>
              Clima App
            </Typography>
            {visibleSearch && city.name && (
              <Paper
                style={{
                  position: 'absolute',
                  transform: 'scaleY(0.91)',
                  paddingBottom: '400px',
                  height: '100%',
                  width: '100%',
                  top: '30px',
                  zIndex: '200',
                }}
              >
                <Paper>
                  <SearchBox />
                </Paper>
              </Paper>
            )}
            <br />
          </Box>

          {!city.name ? (
            <SearchBox></SearchBox>
          ) : (
            <Suspense fallback={<Loading />}>
              <WeatherDetailsBox></WeatherDetailsBox>
            </Suspense>
          )}
          {!city.name && !cities[0] && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                padding: '1rem',
                width: '400px',
                height: '230px',
              }}
            >
              <img width={'200px'} loading="lazy" src={weatherImg}></img>
            </Box>
          )}
        </>
      </PrincipalLayout>
    </ThemeProvider>
  )
}
