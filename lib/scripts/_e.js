const detectDeviceType = () => {
  const userAgent = navigator.userAgent;
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    )
  ) {
    return "mobile";
  } else if (/iPad/i.test(userAgent)) {
    return "tablet";
  } else {
    return "desktop";
  }
};

const handleLocationPermission = async () => {
  try {
    const position =
      (await new Promise()) <
      GeolocationPosition >
      ((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

    // You can now use the position object (latitude, longitude, etc.)
    console.log("User allowed location access:", position);
  } catch (error) {
    // Handle errors (e.g., user denied permission)
    console.error("Error getting location:", error);
  }
};

export { detectDeviceType, handleLocationPermission };
