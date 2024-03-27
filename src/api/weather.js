import axios from "axios";

export const getWeather = async (lat, lon, timezone) => {
  try {
    const resp = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation,weather_code,windspeed_10m&timezone=${timezone}&forecast_days=1&timeformat=unixtime&current=temperature_2m`
    );
    return resp;
  } catch (error) {
    throw new Error(error);
  }
};
