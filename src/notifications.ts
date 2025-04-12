window.addEventListener(
  "mousemove",
  () => Notification.requestPermission().then(spawnNotification),
  {
    once: true,
  }
);

export function spawnNotification() {
  const noti = new Notification("MoonDih", {
    body: "Bro lay off the taco ur gna kill me...",
    icon: "/test.png",
    requireInteraction: true,
  });
}
