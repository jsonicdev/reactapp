import React from 'react';
import { Forecast } from '../../../features/Forecast';
import { ColdTempIcon } from '../../../shared/icons/ColdTempIcon.jsx';
import { DripIcon } from '../../../shared/icons/DripIcon.jsx';
import { HotTempIcon } from '../../../shared/icons/HotTempIcon.jsx';
import { SearchIcon } from '../../../shared/icons/SearchIcon.jsx';
import { SmallCloudIcon } from '../../../shared/icons/SmallCloudIcon.jsx';
import { WindIcon } from '../../../shared/icons/WindIcon.jsx';
import { useDebouncedWeather } from '../hooks/index.js';

export function UI() {
  const { weather, errors, inputValue, setInputValue, loading } =
    useDebouncedWeather();

  // Ну тут заглушка пока просто, я верстку не трогал
  if (loading) return <div>Loading...</div>;

  return (
    <div className="mx-auto max-w-[352px]">
      <div className="flex border-b-1 pt-10">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="focus:outline-none pr-10 text-2xl pb-3"
          type="text"
          placeholder="Search Location..."
        />
        <SearchIcon />
      </div>

      {errors.length > 0 && (
        <div className="mt-4 text-red-500">
          <h2 className="font-semibold">Errors:</h2>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>
                {error.type ? `${error.type}: ` : ''}
                {error.message}
                {error.code && ` (code: ${error.code})`}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="pt-10 text-lg">Weather Details...</p>
      <div className="pt-12 max-w-[354px] border-b-1 pb-20">
        <h2 className="uppercase font-bold text-lg">
          {weather?.weather
            ? weather.weather[0].description
            : 'No data available'}
        </h2>

        <div className="flex pt-[33px] justify-between">
          <p className="text-lg opacity-[70%]">Temp max</p>
          <span className="pl-44">
            {weather?.main?.temp_max ? Math.ceil(weather.main.temp_max) : '-'}°
          </span>
          <HotTempIcon />
        </div>

        <div className="flex pt-[33px] justify-between">
          <p className="text-lg opacity-[70%]">Temp min</p>
          <span className="pl-44">
            {weather?.main?.temp_min ? Math.floor(weather.main.temp_min) : '-'}°
          </span>
          <ColdTempIcon />
        </div>

        <div className="flex pt-[33px] justify-between">
          <p className="text-lg opacity-[70%]">Humidity</p>
          <span className="pl-44">
            {weather?.main?.humidity ? weather.main.humidity : '-'}%
          </span>
          <DripIcon />
        </div>

        <div className="flex pt-[33px] justify-between">
          <p className="text-lg opacity-[70%]">Cloudy</p>
          <span className="pl-44">
            {weather?.clouds?.all ? weather.clouds.all : '-'}%
          </span>
          <SmallCloudIcon />
        </div>

        <div className="flex pt-[33px] justify-between">
          <p className="text-lg opacity-[70%]">Windy</p>
          <span className="pl-44">
            {weather?.wind?.speed ? weather.wind.speed : '-'} km/h
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
