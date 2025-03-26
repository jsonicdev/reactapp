import compose from 'compose-function/module';
import { withStrict } from './with-strict.jsx';
import { withWeatherCtx } from './with-weather-ctx.jsx';

export const withProviders = compose(withStrict, withWeatherCtx);
