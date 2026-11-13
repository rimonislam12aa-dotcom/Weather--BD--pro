if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log("Latitude:", lat, "Longitude:", lon);
    const apiKey = 'f91f62704c8f45d5708d04d54d7a636e';
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

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
        
        // --- কৃষি পরামর্শ ও ফসল কাটার সিদ্ধান্ত লজিক ---
        const humidity = data.main.humidity; // আর্দ্রতা (%)
        const windSpeed = data.wind.speed; // বাতাসের গতি (মিটার/সেকেন্ড)
        const weatherCondition = data.weather[0].main.toLowerCase(); // আবহাওয়ার অবস্থা
        
        let advisoryText = "আবহাওয়া স্বাভাবিক আছে।";
        let harvestingText = "ফসল কাটার জন্য আবহাওয়া অনুকূল রয়েছে।";

        // ১. সেচ বা আর্দ্রতা সংক্রান্ত পরামর্শ
        if (humidity < 40) {
          advisoryText = "⚠️ মাটিতে আর্দ্রতা কম হতে পারে, সেচ দেওয়ার কথা বিবেচনা করুন।";
        } else if (humidity > 85) {
          advisoryText = "ℹ️ বাতাসে আর্দ্রতা বেশি রয়েছে, সেচ না দিলেও চলবে।";
        }

        // ২. ফসল কাটা সংক্রান্ত শর্ত (বৃষ্টি বা ঝড়ো হাওয়া থাকলে কাটতে নিষেধ)
        if (weatherCondition.includes('rain') || weatherCondition.includes('storm')) {
          harvestingText = "❌ বৃষ্টির সম্ভাবনা রয়েছে, এই মুহূর্তে ফসল কাটা থেকে বিরত থাকুন।";
        } else if (windSpeed > 8) {
          harvestingText = "❌ বাতাসের গতি বেশি থাকায় ফসল কাটা ঝুঁকিপূর্ণ হতে পারে।";
        }
        // --- বীজ বপন ও কীটনাশক ছিটানোর লজিক ---
let sowMsg = windSpeed < 20 && !weatherCondition.includes('rain') ? "✅বীজ বপনের জন্য আবহাওয়া অনুকূল。" : "⚠️ বাতাস বা বৃষ্টির কারণে বীজ বপন স্থগিত রাখুন。";
let sprayMsg = windSpeed < 25 && !weatherCondition.includes('rain') ? "✅ কীটনাশক প্রয়োগের জন্য আবহাওয়া অনুকূল。" : "⚠️ বেশি বাতাস বা বৃষ্টিতে কীটনাশক ছিটাবেন না。";

document.getElementById("sowMsg").textContent = sowMsg;
document.getElementById("sprayMsg").textContent = sprayMsg;

        // কনসোলে বা আপনার ওয়েবসাইটের UI-তে দেখানোর জন্য
        console.log("পরামর্শ:", advisoryText);
        console.log("ফসল কাটার স্ট্যাটাস:", harvestingText);

        // আপনি চাইলে এগুলো আপনার ওয়েবসাইটের নির্দিষ্ট HTML এলিমেন্টে বসাতে পারেন:
        // document.getElementById('advisory-box').innerText = advisoryText;
        // document.getElementById('harvest-box').innerText = harvestingText;

      })
      .catch(error => console.log('Error:', error));
  });
} else {
  console.log("Geolocation is not supported by this browser.");
}
} else {
  console.log("Geolocation is not supported by this browser.");
                                           }
