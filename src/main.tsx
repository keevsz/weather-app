import ReactDOM from 'react-dom/client'
import { App } from './App'
import { WeatherProvider } from './context/WeatherProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <WeatherProvider>
    <App />
  </WeatherProvider>
)
