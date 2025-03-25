import { useState } from 'react';
import Forecast from './Forecast.jsx';
import { ColdTempIcon } from '../common/icons/ColdTempIcon.jsx';
import { DripIcon } from '../common/icons/DripIcon.jsx';
import { HotTempIcon } from '../common/icons/HotTempIcon.jsx';
import { SearchIcon } from '../common/icons/SearchIcon.jsx';
import { SmallCloudIcon } from '../common/icons/SmallCloudIcon.jsx';
import { WindIcon } from '../common/icons/WindIcon.jsx';
import { useWeatherCtx } from '../context/WeatherContext.jsx';

const API_KEY = import.meta.env.VITE_API_KEY;

function SideBar() {
  const [city, setCity] = useState('Moscow');
  const { weather, setWeather } = useWeatherCtx();

  async function handleKeyDown(event) {
    if (event.key === 'Enter') {
      const url = new URL('https://api.openweathermap.org/data/2.5/weather');
      url.searchParams.append('q', city);
      url.searchParams.append('appid', API_KEY);
      url.searchParams.append('units', 'metric');

      const weatherRes = await fetch(url);

      setWeather(await weatherRes.json());
    }
  }

  return (
    <div className="mx-auto max-w-[352px]">
      <div className="flex border-b-1 pt-10">
        <input
          value={name}
          onKeyDown={(e) => handleKeyDown(e)}
          onChange={(e) => setCity(e.target.value)}
          className="focus:outline-none pr-10 text-2xl pb-3"
          type="text"
          placeholder="Search Location..."
        />
        <SearchIcon />
      </div>

      <p className="pt-10 text-lg">Weather Details...</p>
      <div className="pt-12 max-w-[354px] border-b-1 pb-20">
        <h2 className="uppercase font-bold text-lg">
          {weather?.weather ? weather.weather[0].description : 'Error'}
        </h2>
        <div className="flex pt-[33px] justify-between">
          <p className="text-lg opacity-[70%]">Temp max</p>
          <span className="pl-44">
            {weather?.main?.temp_max ? Math.ceil(weather.main.temp_max) : 0}°
          </span>
          <HotTempIcon />
        </div>
        <div className="flex pt-[33px] justify-between">
          <p className="text-lg opacity-[70%]">Temp min</p>
          <span className="pl-44">
            {weather?.main?.temp_min ? Math.floor(weather.main.temp_min) : 0}°
          </span>
          <ColdTempIcon />
        </div>
        <div className="flex pt-[33px] justify-between">
          <p className="text-lg opacity-[70%]">Humidity</p>
          <span className="pl-44">
            {weather?.main?.humidity ? weather.main.humidity : 0}%
          </span>
          <DripIcon />
        </div>
        <div className="flex pt-[33px] justify-between">
          <p className="text-lg opacity-[70%]">Cloudy</p>
          <span className="pl-44">
            {weather?.clouds?.all ? weather.clouds.all : 0}%
          </span>
          <SmallCloudIcon />
        </div>
        <div className="flex pt-[33px] justify-between">
          <p className="text-lg opacity-[70%]">Windy</p>
          <span className="pl-44">
            {weather?.wind?.speed ? weather.wind.speed : 0} km/h
          </span>
          <WindIcon />
        </div>
      </div>
      <div>
        <h2 className="pt-10 text-lg font-medium">Weather Forecast</h2>
        <Forecast />
      </div>
    </div>
  );
}

export default SideBar;
