import hotbg from './assets/sunny.jpg';
import coldbg from './assets/rainny.jpg';
import './index.css'
import Descriptions from './assets/components/Descriptions';
import { useEffect, useState } from 'react';
import { getFormattedWeatherData } from './WeatherService';

export default function App() {
  const [city, setCity] = useState('Paris')
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(coldbg);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);

      //dynamic bg
      const threshold = units === 'metric' ? 20 : 60;
      if (data.temp <= threshold) setBg(coldbg);
      else setBg(hotbg);
    };
    fetchWeatherData();
  }, [units, city])

  const handleClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === 'C';
    button.innerText = isCelsius ? '°F' : '°C';
    setUnits(isCelsius ? 'metric' : 'imperial')
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="app" style={{backgroundImage: `url(${bg})`}}>
      <div className="overlay">
        {weather && (
          <div className="container">
          <div className="section section_inputs">
            
              <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder='Enter City' />
              <button onClick={(e) => handleClick(e)}>°F</button>
                        
          </div>
          <div className="section section_temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.ImageUrl} alt='Weather Icon' />
                <h3>{`${weather.description}`}</h3>              
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${units === 'metric' ? 'C' : 'F'}`}</h1>
              </div>
          </div>
          <Descriptions weather={weather} units={units} />
        </div>
        )}
        
      </div>
    </div>
  )
}


