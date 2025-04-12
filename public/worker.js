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
