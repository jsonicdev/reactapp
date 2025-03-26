import { sleep } from '../../../shared/utils/sleep.js';

const ErrorType = {
  VALIDATION: 'ValidationError',
  AUTHENTICATION: 'AuthenticationError',
  NETWORK: 'NetworkError',
  API: 'ApiError',
};

const validateParams = (city, apiKey, weatherApiUrl) => {
  const errors = [];

  if (!city) {
    errors.push({ type: ErrorType.VALIDATION, message: 'Please enter a city' });
  }

  if (!apiKey) {
    errors.push({
      type: ErrorType.AUTHENTICATION,
      message: 'API key is missing',
    });
  }

  if (!weatherApiUrl) {
    errors.push({
      type: ErrorType.AUTHENTICATION,
      message: 'weatherApiUrl is missing',
    });
  }

  return errors;
};

const fetchWithRetry = async (url, options = {}, retries = 3, delay = 1000) => {
  let attempt = 0;
  let lastError = null;

  while (attempt <= retries) {
    try {
      const res = await fetch(url, options);

      if (res.ok) {
        return res;
      }

      lastError = {
        type: ErrorType.API,
        message: res.statusText,
        code: res.status,
        attempt: attempt + 1,
      };

      // Тут надо в доку апи смотреть, я на шару коды проставил,
      // самые популярные
      if ([500, 502, 503, 504].includes(res.status)) {
        await sleep(delay);
        attempt++;
        delay = delay * attempt;
      } else {
        return { error: lastError };
      }
    } catch (err) {
      lastError = {
        type: ErrorType.NETWORK,
        message: err.message,
        code: null,
        attempt: attempt + 1,
      };
      await sleep(delay);
      attempt++;
      delay = delay * attempt;
    }
  }

  return { error: lastError };
};

export const getWeather = async (city, units = 'metric', maxRetries = 3) => {
  const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const WEATHER_API_URL = import.meta.env.VITE_WEATHER_API_URL;

  const validationErrors = validateParams(
    city,
    WEATHER_API_KEY,
    WEATHER_API_URL
  );

  if (validationErrors.length) {
    return { weather: null, errors: validationErrors };
  }

  const url = new URL(WEATHER_API_URL);
  url.searchParams.append('q', city);
  url.searchParams.append('appid', WEATHER_API_KEY);
  url.searchParams.append('units', units);

  const result = await fetchWithRetry(url.href, {}, maxRetries);

  if (result.error) {
    return { weather: null, errors: [result.error] };
  }

  const weatherData = await result.json();

  return {
    weather: weatherData,
    errors: [],
  };
};
