import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import { useWeatherContext } from '../context/WeatherProvider'
import { City } from '../models/Country.models'

interface Props {
  city: City
}
const CityCard = ({ city }: Props) => {
  const { setCityFunc, setVisibleSearchFunc } = useWeatherContext()
  return (
    <Card
      onClick={() => {
        setCityFunc(city)
        setVisibleSearchFunc(false)
      }}
    >
      <CardActionArea>
        <CardContent>
          <Typography variant="body1">{city.name}</Typography>
          <Typography variant="caption">{city.country}</Typography>
          <Typography>{city.state}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
export default CityCard
