// Capture the install prompt event
window.addEventListener("beforeinstallprompt", (e: Event) => {
  e.preventDefault();
  window.__dihferredInstallPrompt = e as BeforeInstallPromptEvent;
});

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

// Push subscription function
export async function subscribeUser(email: string) {
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
    body: JSON.stringify({
      subscription,
      email,
    }),
  });
}

// Install app function
export async function installAppAndSetupNotifications(email: string) {
  if (window.__dihferredInstallPrompt != null) {
    await window.__dihferredInstallPrompt.prompt();
  }

  await subscribeUser(email);
}
