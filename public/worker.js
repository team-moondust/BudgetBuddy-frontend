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
  const title = data.title || "BudgetBuddy";
  const body = data.body || "New message!";
  const imageId = data.imageId || 0;
  const petChoice = data.petChoice || 0;

  console.log("new message dropped...");

  console.log(`/pets/pet${petChoice}_${imageId}.gif`);

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: `/pets/pet${petChoice}_${imageId}.gif`,
    })
  );
});
