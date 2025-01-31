import { PWAInstallPrompt } from "./PWAInstallPrompt";
import { Toaster } from "./ui/sonner";
import { isPWA } from "../lib/isPWA";

interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      {!isPWA() && <PWAInstallPrompt />}
      <Toaster />
      {children}
    </>
  );
}
