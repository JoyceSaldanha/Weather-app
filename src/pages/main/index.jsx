import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./main.css";
import {
  fetchCoords,
  fetchImagelocation,
  fetchUserLocation,
} from "../../api/locations";
import { FaLocationDot } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

function HomePage() {
  const [location, setLocation] = useState(null);
  const [coords, setCoords] = useState(null);
  const [locationImg, setLocationImg] = useState(null);

  const fetchCurrent = async () => {
    try {
      const coords = await fetchCoords();
      console.log(coords, "co-ordinates");
      setCoords(coords);

      const location = await fetchUserLocation(
        coords.latitude,
        coords.longitude
      );
      setLocation(location);
      const img = await fetchImagelocation(
        location.address.city || location.address.country
      );
      setLocationImg(img.data.photos[0].src.original);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCurrent();
  }, []);

  const Heading = () => {
    return (
      location && (
        <div className="location-container">
          <div>
            <div className="current-location">
              <FaLocationDot size={20} />
              <a
                href={`/weather?lat=${coords.latitude}&long=${coords.longitude}`}
                target={"_blank"}
                style={{ color: "#fff" }}
              >
                {location.address.city || location.address.village}
              </a>
            </div>

            <h1>{location.address.city || location.address.village},</h1>
            <h1>{location.address.country}</h1>
          </div>
        </div>
      )
    );
  };

  const Navbar = () => {
    return (
      <nav className="navbar">
        <p>
          <IoClose size={20} />
        </p>
        <button className="live-btn">LIVE</button>
      </nav>
    );
  };

  return (
    <div>
      {locationImg && (
        <>
          <Navbar />
          <img className="img" src={locationImg} alt={`Image ${locationImg}`} />
        </>
      )}
      <Heading />
    </div>
  );
}

export default HomePage;
