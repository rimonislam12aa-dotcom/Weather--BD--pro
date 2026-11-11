if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log("Latitude:", lat, "Longitude:", lon);
    const apiKey = 'f91f62704c8f45d5708d04d54d7a636e';
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // এখানে আবহাওয়া দেখানোর কোড হবে
  })
  .catch(error => console.log('Error:', error));
  });
} else {
  console.log("Geolocation is not supported by this browser.");
                                           }
