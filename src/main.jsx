import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { WeatherContext } from './Context/WeatherContext.jsx'
WeatherContext

createRoot(document.getElementById('root')).render(
	<WeatherContext>
		<App />
	</WeatherContext>
)
