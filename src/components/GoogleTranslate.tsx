'use client';

import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

const SCRIPT_ID = "google-translate-script";
const CALLBACK_NAME = "googleTranslateElementInit";

function setCookie(name: string, value: string, days = 365) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
}

function getCookie(name: string) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

interface GoogleTranslateProps {
  inHeader?: boolean;
}

export default function GoogleTranslate({ inHeader = false }: GoogleTranslateProps) {
  const [currentLang, setCurrentLang] = useState<"es" | "en">("es");
  const [isReady, setIsReady] = useState(false);

  // Initialize Google Translate
  useEffect(() => {
    // FORCE Spanish as default - clear any existing Google Translate cookies
    const clearGoogleTranslateCookies = () => {
      // Delete all googtrans cookies
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.enloja.net";
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=enloja.net";

      // Set Spanish as default
      setCookie("googtrans", "/es/es");
    };

    // Clear cookies immediately
    clearGoogleTranslateCookies();

    // Check current language from cookie AFTER cleanup
    setTimeout(() => {
      const cookie = getCookie("googtrans");
      if (cookie && cookie.includes("/en")) {
        setCurrentLang("en");
      } else {
        setCurrentLang("es");
      }
    }, 100);

    // Prevent body scroll shift
    document.body.style.top = "0px";

    // Skip if script already exists
    if (document.getElementById(SCRIPT_ID) || window.google?.translate) {
      setIsReady(true);
      return;
    }

    // Create initialization callback
    window[CALLBACK_NAME] = () => {
      setTimeout(() => {
        if (window.google?.translate?.TranslateElement) {
          let container = document.getElementById('google_translate_element');
          if (!container) {
            container = document.createElement('div');
            container.id = 'google_translate_element';
            container.style.display = 'none';
            document.body.appendChild(container);
          }

          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'es',
              includedLanguages: 'es,en',
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false
            },
            'google_translate_element'
          );

          setIsReady(true);
          console.log('Google Translate initialized successfully');
        }
      }, 300);
    };

    // Load script
    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = `https://translate.google.com/translate_a/element.js?cb=${CALLBACK_NAME}&hl=es`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const scriptEl = document.getElementById(SCRIPT_ID);
      if (scriptEl?.parentNode) {
        scriptEl.parentNode.removeChild(scriptEl);
      }
      if (window[CALLBACK_NAME]) {
        window[CALLBACK_NAME] = undefined;
      }
    };
  }, []);

  // Handle language switching
  const switchLanguage = (lang: "es" | "en") => {
    // Update state first
    setCurrentLang(lang);

    // Clear all Google Translate cookies first
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.enloja.net";

    // Set new cookie with correct format
    const cookieValue = lang === "en" ? "/es/en" : "/es/es";
    setCookie("googtrans", cookieValue);

    // Wait a moment then try to change via select
    setTimeout(() => {
      const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
      if (select) {
        select.value = lang;
        select.dispatchEvent(new Event('change', { bubbles: true }));

        // Dispatch input event too for compatibility
        select.dispatchEvent(new Event('input', { bubbles: true }));
      } else {
        // If select not found, reload to apply cookie
        window.location.reload();
      }
    }, 100);
  };

  // Hide Google widgets (run once after initialization)
  useEffect(() => {
    if (!isReady) return;

    const hideWidgets = () => {
      // Hide banner
      const banner = document.querySelector('.goog-te-banner-frame');
      if (banner?.parentElement) {
        banner.parentElement.style.display = 'none';
      }

      // Hide all skiptranslate
      document.querySelectorAll('.skiptranslate').forEach(el => {
        (el as HTMLElement).style.display = 'none';
      });

      // Hide widget  
      const widget = document.getElementById('google_translate_element');
      if (widget) {
        widget.style.display = 'none';
      }

      // Reset body
      document.body.style.top = '0px';
    };

    // Run immediately and after a delay
    hideWidgets();
    setTimeout(hideWidgets, 500);
    setTimeout(hideWidgets, 1000);
  }, [isReady]);

  if (!inHeader) {
    return <div id="google_translate_element" style={{ display: "none" }} />;
  }

  const buttonText = currentLang === "es" ? "EN" : "ES";

  return (
    <>
      <div
        style={{
          position: 'relative',
          display: 'inline-block',
          marginLeft: '1rem',
          zIndex: 10,
        }}
      >
        <button
          onClick={() => switchLanguage(currentLang === "es" ? "en" : "es")}
          style={{
            background: "#3b82f6",
            color: 'white',
            minWidth: '50px',
            textAlign: 'center',
            padding: '0.4rem 0.8rem',
            fontSize: '0.9rem',
            fontWeight: 500,
            borderRadius: '0.375rem',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.opacity = '0.9';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          aria-label={currentLang === "es" ? "Cambiar a inglés" : "Switch to Spanish"}
        >
          {buttonText}
        </button>
      </div>

      <div id="google_translate_element" style={{ display: "none" }} />

      <style jsx global>{`
        /* Hide all Google Translate UI */
        body > .skiptranslate,
        #google_translate_element,
        #google_translate_element *,
        .goog-te-gadget,
        .goog-te-gadget *,
        .goog-te-banner-frame.skiptranslate,
        .goog-te-banner-frame,
        .goog-te-balloon-frame,
        .goog-te-menu-frame,
        iframe.goog-te-banner-frame,
        iframe.goog-te-menu-frame {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
        }

        body {
          top: 0 !important;
          position: static !important;
        }

        html, body {
          margin-top: 0 !important;
        }
      `}</style>
    </>
  );
}
