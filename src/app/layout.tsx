import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "sonner";
import { ReduxProvider } from "@/providers/ReduxProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { I18nProvider } from "@/providers/I18nProvider";
import { LoadingOverlay, ThemeProvider, MaintenancePage } from "@/components/common";
import { NotificationListener } from "@/providers/NotificationListener";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Sartaj Foods - Authentic South Asian Flavors in Japan",
  description:
    "Premium basmati rice, aromatic spices, and traditional sweets imported directly for authentic culinary experience in Japan",
  icons: {
    icon: [
      {
        url: "/favicons_sartaj/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicons_sartaj/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicons_sartaj/favicon.ico",
      },
    ],
    apple: "/favicons_sartaj/apple-touch-icon.png",
  },
  manifest: "/favicons_sartaj/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";

  return (
    <html lang="en" className={`bg-background ${playfair.variable}`}>
      <body className="font-sans antialiased relative min-h-screen">
        {isMaintenance ? (
          <MaintenancePage />
        ) : (
          <>
            {/* Large premium global header-backdrop glow pools wrapper to prevent horizontal scroll */}
            <div className="absolute inset-x-0 top-0 h-[800px] overflow-hidden pointer-events-none -z-50">
              <div className="absolute top-0 left-[10%] w-[600px] h-[450px] rounded-full bg-primary/22 blur-[130px]" />
              <div className="absolute top-0 right-[15%] w-[500px] h-[400px] rounded-full bg-accent/18 blur-[110px]" />
            </div>
            <ReduxProvider>
              <QueryProvider>
                <I18nProvider>
                  <ThemeProvider>
                    {children}
                    <LoadingOverlay />
                    <NotificationListener />
                  </ThemeProvider>
                </I18nProvider>

                <Toaster position="top-right" />
                {process.env.NODE_ENV === "production" && <Analytics />}
              </QueryProvider>
            </ReduxProvider>
          </>
        )}
      </body>
    </html>
  );
}
