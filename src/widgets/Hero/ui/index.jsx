import { CloudIcon } from '../../../shared/icons/CloudIcon.jsx';
import { SideBar } from '../../SideBar';
import { useWeatherCtx } from '../../../app/providers/with-weather-ctx.jsx';
import { useMemo } from 'react';

export function UI() {
  const { weather } = useWeatherCtx();

  const date = useMemo(() => {
    const unixTimestamp = weather?.dt ? weather.dt : '00';
    const date = new Date(unixTimestamp * 1000);
    const parsedTime = date.toLocaleTimeString();
    const dateNow = date.toDateString();

    return { parsedTime, dateNow };
  }, [weather]);

  return (
    <div className="bg-cover w-full h-full bg-[url(/bg-weather.svg)]">
      <div className="w-screen max-w-[1440px] mx-auto text-white h-full">
        <div className="flex justify-between w-full h-full">
          <div className="w-[914px] flex flex-col justify-between pb-32">
            <div className="flex pt-10">
              <h1 className="font-bold text-xl backdrop-blur-3xl p-4 rounded-xl border-1 border-white opacity-70">
                Weather App (by Jsonicdev)
              </h1>
            </div>
            <div className="flex items-center">
              <span className="text-9xl">
                {weather?.main?.temp ? Math.floor(weather.main.temp) : 0}°
              </span>
              <div className="flex">
                <div className="flex flex-col pl-3">
                  <span className="text-6xl">
                    {weather?.name ? weather.name : 'City'}
                  </span>
                  <span className="text-lg font-medium pt-5">
                    {date.dateNow} {date.parsedTime}
                  </span>
                </div>
                <div className="flex items-end pl-5">
                  <CloudIcon />
                </div>
              </div>
            </div>
          </div>
          <div
            className="w-[526px] h-screen backdrop-blur-sm flex border-l-10 border-white/30 overflow-auto scrollbar-hidden cursor-pointer
					"
          >
            <p className="h-full "></p>
            <SideBar />
          </div>
        </div>
      </div>
    </div>
  );
}
