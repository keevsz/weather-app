import { createContext, useContext, useEffect, useState } from 'react'
import { City } from '../models/Country.models'

type ContextProps = {
  city: City
  setCityFunc: (city: City) => void
  cities: City[]
  setCitiesFunc: (cities: City[]) => void
  loading: boolean
  setLoadingFunc: (value: boolean) => void
  resetFunc: () => void
  visibleSearch: boolean
  setVisibleSearchFunc: (value: boolean) => void
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const WeatherContext = createContext<ContextProps>({} as ContextProps)

export const WeatherProvider = ({ children }: Props) => {
  const [city, setCity] = useState<City>({} as City)
  const [cities, setCities] = useState<City[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [visibleSearch, setVisibleSearch] = useState(false)

  const setCityFunc = (country: any) => setCity(country)
  const setCitiesFunc = (countries: any) => setCities(countries)
  const setLoadingFunc = (value: boolean) => setLoading(value)
  const setVisibleSearchFunc = (value: boolean) => setVisibleSearch(value)

  const resetFunc = () => {
    setCity({} as City)
    setCitiesFunc([])
    setLoading(false)
    setVisibleSearch(false)
  }

  return (
    <WeatherContext.Provider
      value={{
        city,
        setCityFunc,
        cities,
        setCitiesFunc,
        loading,
        setLoadingFunc,
        resetFunc,
        visibleSearch,
        setVisibleSearchFunc,
      }}
    >
      {children}
    </WeatherContext.Provider>
  )
}

export const useWeatherContext = () => {
  const context = useContext(WeatherContext)
  if (context === undefined) {
    throw new Error('usePostContext undefined here')
  }
  return context
}
