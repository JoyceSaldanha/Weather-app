import React, { useState } from "react";
import "./weather.css";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchImagelocation, fetchUserLocation } from "../../api/locations";
import dayjs from "dayjs";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { getWeather } from "../../api/weather";
import { ICON_MAP } from "../../utils/iconsmap";
import WeatherCard from "../../components/weather-card";
import { IoSearchSharp } from "react-icons/io5";

const Navbar = () => {
  return (
    <nav className="weather-navbar">
      <div>
        <HiOutlineMenuAlt2 size={30} />
      </div>
      <div>
        <IoSearchSharp size={30} />
      </div>
    </nav>
  );
};

const HourlyWidget = ({ hourlyForecast }) => {
  return (
    <div className="weather-container">
      {hourlyForecast.map((item, index) => (
        <WeatherCard
          temp={item.temp}
          key={index}
          code={item.iconCode}
          time={item.timestamp}
        />
      ))}
    </div>
  );
};

function WeatherPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [location, setLocation] = useState(null);
  const [locationImg, setLocationImg] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);

  //Pluck the values from query params
  const latitude = searchParams.get("lat");
  const longitude = searchParams.get("long");

  useEffect(() => {
    init(latitude, longitude);
    fetchWeatherForcast(latitude, longitude);
  }, [latitude, longitude]);

  const init = async (latitude, longitude) => {
    try {
      const location = await fetchUserLocation(latitude, longitude);
      setLocation(location);
      const img = await fetchImagelocation(
        location.address.city || location.address.country
      );

      setLocationImg(img.data.photos[0].src.original);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchWeatherForcast = async (lat, long) => {
    try {
      const resp = await getWeather(
        lat,
        long,
        Intl.DateTimeFormat().resolvedOptions().timeZone
      );
      const hourlyData = parseHourlyWeather(resp.data);
      console.log(resp.data);
      setHourlyForecast(hourlyData);
    } catch (error) {
      console.log(error);
    }
  };

  //Massage the response from open weather
  const parseHourlyWeather = ({ hourly, current }) => {
    console.log(current);
    return hourly?.time
      .map((time, index) => {
        return {
          timestamp: time * 1000,
          iconCode: hourly?.weather_code[index],
          temp: Math.round(hourly.temperature_2m[index]),
        };
      })
      .filter(({ timestamp }) => timestamp >= current.time * 1000);
  };

  const LocationCard = () => {
    return (
      <>
        <Navbar />
        <div className="location-card">
          {location && (
            <>
              <div className="location-txt">
                <h1> {location.address.city || location.address.village},</h1>
                <h1> {location.address.city || location.address.country}</h1>
                <p className="location-text-year">
                  {dayjs().format("MMM DD, YYYY")}
                </p>
              </div>

              <img
                className="img-card"
                src={locationImg}
                alt={`Image ${locationImg}`}
              />
            </>
          )}
        </div>
      </>
    );
  };

  return (
    <div>
      <LocationCard />
      <HourlyWidget hourlyForecast={hourlyForecast} />
    </div>
  );
}

export default WeatherPage;
