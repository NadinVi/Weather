import { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [town, setTown] = useState('');

  const key = '63f1a202b3eb0fa4d655779f99d7b4b9';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${town}&units=metric&appid=${key}`;

  const searchWeather = (event) => {
    if(event.key === 'Enter') {
      // fetch(url)
      // .then((response) => response.json())
      // .then((response) => {
      //   setData(response);
      // });
      axios.get(url).then((response) => {
        setData(response.data);
      })
      setTown('');
  
    }
  }

  return (
    <div className="app">
      <div className="inp-field">
        <input type="text"
        value={town}
        onChange={(event) => setTown(event.target.value)}
        placeholder="Enter location"
        onKeyDown={searchWeather}/>
      </div>
      <div className="container">
        <div className="header">
          <div className="city">
            <p>{data.name}</p>
          </div>
        </div>
        <div className="temp">
          {data.main ? (
            <h1>
              {data.main.temp.toFixed()}
              °C
            </h1>
          ): null}
        </div>
        <div className="desc">
          {data.weather ? <p>{data.weather[0].main}</p> : null}
        </div>
      </div>
      {data.name !== undefined
      && (
        <div className="footer">
          <div className="feels">
          <p>Відчувається: </p>
            {data.main ? (
              <p className="bold"> 
                {data.main.feels_like.toFixed()}
                °C
              </p>
            ): null}
          </div>
          <div className="humidity">
          <p>Вологість: </p>
            {data.main ? (
              <p className="bold"> 
                {data.main.humidity}
                %
              </p>
            ): null}
          </div>
          <div className="wind">
          <p>Вітер: </p>
            {data.main ? (
              <p className="bold"> 
                {`${data.wind.speed} `}
              M/C
              </p>
            ): null}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
