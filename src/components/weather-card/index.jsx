import dayjs from "dayjs";
import React from "react";

function WeatherCard({ time, code, temp }) {
  const fetchIconURL = (iconCode) => {
    let imgCode = (iconCode < 10 ? "0" : "") + iconCode;
    return `https://openweathermap.org/img/wn/${imgCode}d@2x.png`;
  };

  return (
    <div
      style={{
        backgroundColor: "#083338",
        color: "white",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        marginBottom: 10,
      }}
    >
      <p>{dayjs(time).format("HH:MM")}</p>
      <img src={fetchIconURL(code)} height={60} />
      <p>{temp}</p>
    </div>
  );
}

export default WeatherCard;
