import React, { useState } from "react";
import axios from "axios";
import ShowTemp from "./ShowTemp";

const App = () => {
  const [city, setCity] = useState([]);
  const [data, setData] = useState({
    description: "",
    temp: "",
    temp_max: "",
    temp_min: "",
    humidity: "",
    sunrise: "",
    sunset: "",
    country: "",
  });

  const handleClick = () => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1206b9e1705a0fe964ed4c26b9b2528b`
      )
      .then((response) => {
        setData({
          description: response.data.weather[0].description,
          temp: response.data.main.temp,
          temp_max: response.data.main.temp_max,
          temp_min: response.data.main.temp_min,
          humidity: response.data.main.humidity,
          sunrise: response.data.sys.sunrise,
          sunset: response.data.sys.sunset,
          country: response.data.sys.country,
        });
      })
      .catch((error) => {
        console.log("Fetching error...", error);
      });
  };
  return (
    <>
      <div className="container text-center my-5">
        <h2>Weather App</h2>
        <input
          className="from-control"
          type="text"
          placeholder="Search city...."
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <button
          className="btn btn-primary mx-2"
          type="submit"
          onClick={handleClick}
        >
          Check
        </button>
      </div>

      <ShowTemp text={data} />
    </>
  );
};

export default App;
