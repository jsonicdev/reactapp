import React from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { getWeather } from '../api/index.js';
import { useWeatherCtx } from '../../../app/providers/with-weather-ctx.jsx';

export function useDebouncedWeather(initialCity = 'Moscow', delay = 1000) {
  const [inputValue, setInputValue] = React.useState(initialCity);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState([]);

  const { weather, setWeather } = useWeatherCtx();

  const debouncedFetch = useDebouncedCallback(async (city) => {
    if (!city) {
      setWeather(null);
      return;
    }

    setLoading(true);

    try {
      const { weather, errors } = await getWeather(city);
      setWeather(weather);
      setErrors(errors);
    } catch (err) {
      // Тут можно лучше сделать, пока затычка
      // В качестве примера
      setErrors([
        { message: 'Unexpected error occurred', details: JSON.stringify(err) },
      ]);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }, delay);

  React.useEffect(() => {
    debouncedFetch(inputValue);
  }, [inputValue, debouncedFetch]);

  return { inputValue, setInputValue, weather, loading, errors };
}
