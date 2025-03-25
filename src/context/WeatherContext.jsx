import React, { createContext } from 'react';

export const WeatherContext = createContext(null);

export const useWeatherCtx = () => {
  const ctx = React.useContext(WeatherContext);
  if (!ctx) {
    throw new Error('useWeatherCtx must be used within a WeatherProvider');
  }
  return ctx;
};
