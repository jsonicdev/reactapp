import Hero from '../components/Hero'
import { WeatherContext } from './Context/WeatherContext'

function App() {
	return (
		<WeatherContext.Provider>
			<Hero></Hero>
		</WeatherContext.Provider>
	)
}

export default App
