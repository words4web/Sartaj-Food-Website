"use client";

import { useEffect } from "react";

export function GoogleTranslator() {
  useEffect(() => {
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "ja,en",
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element",
      );
    };

    const scriptId = "google-translate-script";
    const existingScript = document.getElementById(scriptId);

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if ((window as any).google?.translate?.TranslateElement) {
      (window as any).googleTranslateElementInit();
    }

    return () => {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" +
        window?.location?.hostname;

      const parts = window?.location?.hostname?.split(".");
      if (parts?.length >= 2) {
        const domain = "." + parts?.slice(-2)?.join(".");
        document.cookie =
          "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + domain;
      }

      try {
        const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement;
        if (combo) {
          combo.value = "";
          const event = new Event("change", { bubbles: true });
          combo.dispatchEvent(event);
        }
      } catch (e) {
        console.error("Failed to restore original language on unmount:", e);
      }
    };
  }, []);

  return (
    <div className="flex justify-end items-center gap-2 py-1 px-2 rounded-xl bg-card/45 backdrop-blur-md border border-border/40 shadow-sm max-w-fit ml-auto">
      <span className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1">
        Translate:
      </span>
      <div id="google_translate_element" className="min-h-[24px] flex items-center" />

      <style>{`
        /* Hide google logo and branding */
        .goog-te-gadget {
          font-size: 0 !important;
          color: transparent !important;
        }
        .goog-te-gadget span {
          display: none !important;
        }
        /* Style language selector dropdown */
        .goog-te-gadget .goog-te-combo {
          background-color: var(--card) !important;
          color: var(--foreground) !important;
          border: 1px solid var(--border) !important;
          border-radius: var(--radius-md) !important;
          padding: 3px 8px !important;
          font-size: 12px !important;
          font-weight: 600 !important;
          font-family: var(--font-sans, sans-serif) !important;
          cursor: pointer !important;
          outline: none !important;
          transition: all 0.2s ease !important;
        }
        .goog-te-gadget .goog-te-combo:hover {
          border-color: var(--primary) !important;
        }
        /* Hide translation banner and tooltips */
        iframe.goog-te-banner-frame,
        iframe.VIpgJd-ZVi9od-ORHb-OEVmcd,
        .goog-te-banner-frame,
        .goog-te-banner,
        #goog-gt-tt {
          display: none !important;
          visibility: hidden !important;
        }
        body {
          top: 0px !important;
          position: static !important;
        }
        .goog-tooltip {
          display: none !important;
        }
        .goog-tooltip:hover {
          display: none !important;
        }
        .goog-text-highlight {
          background-color: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }
      `}</style>
    </div>
  );
}
