import Hero from './components/Hero';
import { WeatherContext } from './context/WeatherContext';
import { useState } from 'react';
// Подучи жизненный цикл компонентов
// Хуки
// Да и архитектурное решение в виде FSD
// Можешь почитать про другие архитектурные подходы,
// Например, про Layer
// Ну и вводи потихонку TS, он тебе сэкономит кучу времени и сил

function App() {
  const [weather, setWeather] = useState(null);

  return (
    <WeatherContext.Provider value={{ weather, setWeather }}>
      <Hero />
    </WeatherContext.Provider>
  );
}

export default App;
