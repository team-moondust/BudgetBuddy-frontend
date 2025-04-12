interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;
let deferredInstallPrompt: BeforeInstallPromptEvent | null = null;

// Capture the install prompt event
window.addEventListener("beforeinstallprompt", (e: Event) => {
  e.preventDefault();
  deferredInstallPrompt = e as BeforeInstallPromptEvent;
});

// Subscribe to push and handle install prompt on first user click
window.addEventListener(
  "click",
  async () => {
    await subscribeUser();

    if (deferredInstallPrompt != null) {
      deferredInstallPrompt.prompt();
      deferredInstallPrompt = null;
    }
  },
  { once: true }
);

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

// Push subscription function
async function subscribeUser() {
  console.log(import.meta.env.VITE_VAPID_PUBLIC_KEY);

  const registration = await navigator.serviceWorker.register("/worker.js");

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
      import.meta.env.VITE_VAPID_PUBLIC_KEY
    ),
  });

  await fetch(`${import.meta.env.VITE_NOTIFICATION_API_URL}/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(subscription),
  });
}
