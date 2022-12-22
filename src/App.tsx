import {
  Box,
  createTheme,
  Paper,
  ThemeProvider,
  Typography,
} from '@mui/material'
import { lazy, Suspense, useState } from 'react'
import Lottie from 'react-lottie-player'
import weatherGif from './assets/weatherimage.json'
import { Loading, Options, PrincipalLayout, SearchBox } from './components'
import { useWeatherContext } from './context/WeatherProvider'

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
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Lottie
                animationData={weatherGif}
                loop
                play
                style={{ width: 150, height: 150 }}
              />
            </Box>
          )}
        </>
      </PrincipalLayout>
    </ThemeProvider>
  )
}
