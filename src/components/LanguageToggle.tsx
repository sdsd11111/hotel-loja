"use client";
import { useState, useEffect } from "react";

export default function LanguageToggle() {
  const [lang, setLang] = useState("es");

  // Detectar idioma actual al cargar
  useEffect(() => {
    const cookie = document.cookie.match(/googtrans=\/(.*?)(\/|;|$)/);
    if (cookie && cookie[1]) setLang(cookie[1]);
    else setLang("es"); // por defecto español
  }, []);

  // Cambiar idioma con Google Translate
  const changeLanguage = () => {
    const newLang = lang === "es" ? "en" : "es";
    const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (select) {
      select.value = newLang;
      select.dispatchEvent(new Event("change"));
      setLang(newLang);
      
      // Actualizar la cookie para persistencia
      const cookieValue = newLang === "en" ? "/es/en" : "/es/es";
      document.cookie = `googtrans=${cookieValue};path=/;max-age=31536000`;
    }
  };

  return (
    <button
      onClick={changeLanguage}
      style={{
        padding: "0.5rem 1rem",
        borderRadius: "0.375rem",
        border: "1px solid #d1d5db",
        backgroundColor: "white",
        color: "#374151",
        fontSize: "0.875rem",
        fontWeight: 500,
        cursor: "pointer",
        transition: "all 0.2s",
        whiteSpace: "nowrap",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = "#f3f4f6";
        e.currentTarget.style.borderColor = "#9ca3af";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = "white";
        e.currentTarget.style.borderColor = "#d1d5db";
      }}
      aria-label={lang === "es" ? "Cambiar a inglés" : "Cambiar a español"}
    >
      {lang === "es" ? "English" : "Español"}
    </button>
  );
}
