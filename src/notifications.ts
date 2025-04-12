// cooked prompt
declare global {
  interface Window {
    __deferredPwaPrompt: (Event & { prompt: () => Promise<void> }) | null;
  }
}

window.__deferredPwaPrompt = null;

window.addEventListener("beforeinstallprompt", (e: Event) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Save the event so it can be triggered later
  window.__deferredPwaPrompt = e as Event & { prompt: () => Promise<void> };
});

window.addEventListener(
  "click",
  async () => {
    await window.__deferredPwaPrompt?.prompt();
    await Notification.requestPermission();
    setTimeout(() => spawnNotification(), 3000);
  },
  {
    once: true,
  }
);

export function spawnNotification() {
  new Notification("MoonDih", {
    body: "Bro lay off the taco ur gna kill me...",
    icon: "/test.png",
    requireInteraction: true,
  });
}
