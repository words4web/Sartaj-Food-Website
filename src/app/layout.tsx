import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import Script from "next/script";
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
  metadataBase: new URL("https://www.sartajfoods.jp"),
  title: "Sartaj Foods - Authentic South Asian Flavors in Japan",
  description:
    "Sartaj Foods Japan trusted source for authentic Indian groceries. Shop premium basmati rice, aromatic spices, snacks & traditional sweets, imported for authentic culinary experience in Japan.",
  alternates: {
    canonical: "./",
  },
  icons: {
    icon: [
      {
        url: "/favicons_sartaj/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
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
        url: "/favicon.ico",
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
      <head />
      <body className="font-sans antialiased relative min-h-screen">
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PVDFQRH7');
          `}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PVDFQRH7"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
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
              </QueryProvider>
            </ReduxProvider>
          </>
        )}
      </body>
    </html>
  );
}
