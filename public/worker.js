self.addEventListener("install", (event) => {
  console.log("Service worker installing...");
  // Optionally: cache files
});

self.addEventListener("activate", (event) => {
  console.log("Service worker activated");
});

self.addEventListener("fetch", (event) => {
  // Optionally: intercept requests
});

self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};
  const title = data.title || "Notification";
  const body = data.body || "You have a new message.";
  console.log("new message dropped...");

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: "/icon.png",
    })
  );
});
