import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import HomeIcon from '@mui/icons-material/Home'
import { useWeatherContext } from '../context/WeatherProvider'

interface Props {
  setMode: (value: boolean) => void
  mode: boolean
}
const Options = ({ setMode, mode }: Props) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { setVisibleSearchFunc, resetFunc, visibleSearch } = useWeatherContext()

  const actions = [
    { icon: <HomeIcon />, name: 'Inicio' },
    { icon: <SearchIcon />, name: 'Buscar' },
    { icon: <DarkModeIcon />, name: 'Tema' },
  ]
  return (
    <SpeedDial
      ariaLabel="Opciones"
      sx={{ position: 'absolute', top: -10, right: 16 }}
      icon={<SpeedDialIcon />}
      direction="down"
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => {
            if (action.name === 'Tema') return setMode(!mode)

            if (action.name === 'Buscar') setVisibleSearchFunc(!visibleSearch)
            if (action.name === 'Inicio') resetFunc()

            handleClose()
          }}
        />
      ))}
    </SpeedDial>
  )
}
export default Options
