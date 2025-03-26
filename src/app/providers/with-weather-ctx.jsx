import React, { createContext } from 'react';

export const WithWeatherCtx = createContext(null);

export const useWeatherCtx = () => {
  const ctx = React.useContext(WithWeatherCtx);
  if (!ctx) {
    throw new Error('useWeatherCtx must be used within a WeatherProvider');
  }
  return ctx;
};

export const withWeatherCtx = (Component) => {
  return (props) => {
    const [weather, setWeather] = React.useState(null);

    return (
      <WithWeatherCtx.Provider value={{ weather, setWeather }}>
        <Component {...props} />
      </WithWeatherCtx.Provider>
    );
  };
};
