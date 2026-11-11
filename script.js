if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log("Latitude:", lat, "Longitude:", lon);
    // এই লতিটিউড ও লঙ্গিটিউড দিয়ে এপিআই কল করুন
  });
} else {
  console.log("Geolocation is not supported by this browser.");
                                           }
