"use client";
import { translations } from "@/lib/translations";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const LangCtx = createContext({ lang: "pt", setLang: () => {}, t: (k) => k });

export function LangProvider({ children }) {
  const [lang, setLangState] = useState("pt");

  useEffect(() => {
    const saved =
      typeof localStorage !== "undefined" && localStorage.getItem("fp_lang");
    if (saved && translations[saved]) setLangState(saved);
  }, []);

  const setLang = useCallback((l) => {
    setLangState(l);
    localStorage.setItem("fp_lang", l);
    document.documentElement.lang = l === "pt" ? "pt-BR" : l;
  }, []);

  const t = useCallback((key) => translations[lang]?.[key] ?? key, [lang]);

  return (
    <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>
  );
}

export const useLang = () => useContext(LangCtx);
