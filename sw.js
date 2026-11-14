importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCxINWdKD9oKycRP4nBuhe82fXspjYTz4M",
  authDomain: "weather-bd-pro.firebaseapp.com",
  projectId: "weather-bd-pro",
  storageBucket: "weather-bd-pro.firebasestorage.app",
  messagingSenderId: "958275433699",
  appId: "1:958275433699:web:e08edaccb32a6158b881d6",
  measurementId: "G-YL2BNLF6Z9"
});

const messaging = firebase.messaging();

// নোটিফিকেশন পেলোডে "notification" ফিল্ড থাকলে Firebase নিজেই ব্যাকগ্রাউন্ডে দেখায়।
// তাই এখানে শুধু তখনই দেখাই যখন মেসেজে শুধু "data" ফিল্ড থাকে (ডুপ্লিকেট এড়াতে)।
messaging.onBackgroundMessage((payload) => {
  if (payload.notification) return;
  const data = payload.data || {};
  self.registration.showNotification(data.title || "Weather BD Pro সতর্কবার্তা", {
    body: data.body || "নতুন আবহাওয়া ও কৃষি তথ্য পাওয়া গেছে।",
    icon: "./icons/icon-192.png",
    badge: "./icons/icon-192.png",
    data: { url: "./" }
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = new URL("./", self.registration.scope).href;
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.startsWith(self.registration.scope) && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(target);
    })
  );
});

const CACHE_NAME = "weather-bd-v6";
const FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      // কোনো একটি ফাইল না পেলেও ইনস্টল যেন ব্যর্থ না হয়
      Promise.all(FILES.map((file) => cache.add(file).catch(() => null)))
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        if (request.mode === "navigate") return caches.match("./index.html");
        return new Response("Offline", { status: 503, statusText: "Offline" });
      })
  );
});
