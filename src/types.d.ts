declare interface Window {
  __dihferredInstallPrompt: BeforeInstallPromptEvent | undefined;
}

declare interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

declare interface Transaction {
  _id: string;
  description: string;
  purchase_date: string;
  amount: number;
}