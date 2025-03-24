import { useState } from 'react'
import { WeatherContext } from '../src/Context/WeatherContext'
import Forecast from './Forecast'
import ColdTemp from './icons/ColdTemp'
import Drip from './icons/Drip'
import HotTemp from './icons/HotTemp'
import Search from './icons/Search'
import SmallCloud from './icons/SmallCloud'
import Wind from './icons/Wind'

function SideBar() {
	const apiKey = import.meta.env.VITE_API_KEY

	async function getData(event) {
		if (event.key === 'Enter') {
			const resopnse = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}&units=metric`
			)
			const data = await resopnse.json()
			console.log(data)
			setTemp(data)
			setWeather(data)
		}
	}
	const [name, setName] = useState('')
	const [temp, setTemp] = useState({})
	const [weather, setWeather] = useState({})

	return (
		<WeatherContext.Provider value={temp}>
			<div className='mx-auto max-w-[352px]'>
				<div className='flex border-b-1 pt-10'>
					<input
						value={name}
						onKeyDown={e => getData(e)}
						onChange={e => setName(e.target.value)}
						className='focus:outline-none pr-10 text-2xl pb-3'
						type='text'
						placeholder='Search Location...'
					/>
					<Search />
				</div>

				<p className='pt-10 text-lg'>Weather Details...</p>
				<div className='pt-12 max-w-[354px] border-b-1 pb-20'>
					<h2 className='uppercase font-bold text-lg'>
						Короткая инфа какая сейчас погода
					</h2>
					<div className='flex pt-[33px] justify-between'>
						<p className='text-lg opacity-[70%]'>Temp max</p>
						<span className='pl-44'>
							{temp?.main?.temp_max ? Math.ceil(temp.main.temp_max) : 0}°
						</span>
						<HotTemp />
					</div>
					<div className='flex pt-[33px] justify-between'>
						<p className='text-lg opacity-[70%]'>Temp min</p>
						<span className='pl-44'>
							{temp?.main?.temp_min ? Math.floor(temp.main.temp_min) : 0}°
						</span>
						<ColdTemp />
					</div>
					<div className='flex pt-[33px] justify-between'>
						<p className='text-lg opacity-[70%]'>Humidity</p>
						<span className='pl-44'>
							{temp?.main?.humidity ? temp.main.humidity : 0}%
						</span>
						<Drip />
					</div>
					<div className='flex pt-[33px] justify-between'>
						<p className='text-lg opacity-[70%]'>Cloudy</p>
						<span className='pl-44'>
							{temp?.clouds?.all ? temp.clouds.all : 0}%
						</span>
						<SmallCloud />
					</div>
					<div className='flex pt-[33px] justify-between'>
						<p className='text-lg opacity-[70%]'>Windy</p>
						<span className='pl-44'>
							{temp?.wind?.speed ? temp.wind.speed : 0} km/h
						</span>
						<Wind />
					</div>
				</div>
				<div>
					<h2 className='pt-10 text-lg font-medium'>Weather Forecast</h2>
					<Forecast />
				</div>
			</div>
		</WeatherContext.Provider>
	)
}

export default SideBar
