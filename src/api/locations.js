import axios from "axios";

export const fetchCoords = async () => {
  try {
    const position = await getCurrentLocation();
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    return { latitude, longitude };
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchUserLocation = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchImagelocation = async (location = "Udupi") => {
  try {
    const response = await axios.get(
      `https://api.pexels.com/v1/search?query=${location}&per_page=1`,
      {
        headers: {
          Authorization:
            "cV8KPOAwgCsDesX3iVG17QjCIshiXcSsBcR67jCzAl7F9nfX3PFuL0xz",
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
