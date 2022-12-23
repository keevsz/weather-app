import { Box, Grid, Skeleton, Typography } from '@mui/material'
import { Forecast } from '../models/Forecast.models'

interface Props {
  forecast: Forecast
  loading: boolean
}
const ForecastCard = ({ forecast, loading }: Props) => {
  const timeFormat = () => {
    const time = parseInt(
      forecast.date.split(':')[0].split(' ').pop() as string
    )
    return time && time >= 12 && time <= 24 ? time + ':00 PM' : time + ':00 AM'
  }
  return (
    <Grid item xs={4} textAlign="center">
      <Typography>{loading ? <Skeleton /> : timeFormat()}</Typography>
      <Box width={'100%'} height={'50px'}>
        {loading ? (
          <Grid alignItems="center" justifyContent="center" display="flex">
            <Skeleton variant="circular" height={'50px'} width={'50px'} />
          </Grid>
        ) : (
          <img
            loading="lazy"
            width={'40%'}
            src={`https://openweathermap.org/img/wn/${forecast.icon}.png`}
            alt=""
          />
        )}
      </Box>

      <Typography>
        {loading ? <Skeleton /> : parseInt(forecast.temp) + '°'}
      </Typography>
    </Grid>
  )
}
export default ForecastCard
