import { Grid, Skeleton, Stack, Typography } from '@mui/material'

interface Props {
  item: any
  loading: boolean
}
const DailyForecastCard = ({ item, loading }: Props) => {
  return (
    <Stack direction="row" alignItems="center" height={'50px'}>
      {loading ? (
        <Skeleton height={'50px'} width={'100%'} />
      ) : (
        <>
          <Grid item xs={4}>
            <Typography>
              {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
            </Typography>
          </Grid>

          <Grid item xs={5}>
            <Stack
              style={{ float: 'left' }}
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              <img
                loading="lazy"
                width={'35%'}
                src={`https://openweathermap.org/img/wn/${item.weather.icon}.png`}
              />
              <Typography>
                {item.weather.description.charAt(0).toUpperCase() +
                  item.weather.description.slice(1)}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={3} textAlign="right">
            <Typography>
              {item.maxTemp}/<code>{item.minTemp}</code>
            </Typography>
          </Grid>
        </>
      )}
    </Stack>
  )
}
export default DailyForecastCard
