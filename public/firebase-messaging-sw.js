importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

firebase.initializeApp({
  apiKey: "AIzaSyBWxMldSEt2ohShOzHiJJSFkL04Kdl8wFU",
  authDomain: "sartaj-food-booking-app-3447b.firebaseapp.com",
  projectId: "sartaj-food-booking-app-3447b",
  storageBucket: "sartaj-food-booking-app-3447b.firebasestorage.app",
  messagingSenderId: "583642866759",
  appId: "1:583642866759:web:2d80c80806aa343d5d3d62",
});

const messaging = firebase.messaging();

// Handles messages received when the app is in the background / closed.
// The backend sends silent payloads (no notification block), so we
// manually construct and show the native browser notification here.
messaging.onBackgroundMessage((payload) => {
  if (!payload.notification && payload.data) {
    const data = payload.data;
    const title = data.title || "Sartaj Foods";
    const body = data.body || "You have a new update.";

    const notificationOptions = {
      body,
      icon: "/sartaj_logo.svg",
      badge: "/sartaj_logo.svg",
      color: "#e11d48",
      data: payload.data,
      vibrate: [200, 100, 200],
      requireInteraction: false,
      timestamp: Date.now(),
      // Use orderId or type as tag to deduplicate notifications of the same kind
      tag: data.orderId || data.type || "sartaj-general",
      renotify: true,
      actions: [
        {
          action: "view",
          title: "View",
        },
      ],
    };

    self.registration.showNotification(title, notificationOptions);
  }
});

// Handle notification click — focus an existing tab or open a new one.
self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  const data = event.notification.data || {};
  let targetPath = "/";

  if (data.orderId) {
    targetPath = `/orders`;
  } else if (data.type && data.type.includes("PROFILE")) {
    targetPath = "/profile";
  } else {
    targetPath = "/";
  }

  const targetUrl = new URL(targetPath, self.location.origin);

  event.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          try {
            const clientUrl = new URL(client.url);
            if (clientUrl.pathname === targetPath && "focus" in client) {
              return client.focus();
            }
          } catch (urlErr) {
            console.error("Failed to parse client URL:", urlErr);
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(targetUrl.href);
        }
      })
      .catch((err) => {
        console.error("Notification click handler failed:", err);
      }),
  );
});
