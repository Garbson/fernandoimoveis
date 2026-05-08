"use client";
import { useLang } from "@/context/LangContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import { WaIcon } from "./Icons";

const WA = "https://wa.me/554797518960";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", menuOpen);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const navItems = [
    { key: "nav_about", href: "#sobre" },
    { key: "nav_services", href: "#servicos" },
    { key: "nav_properties", href: "#empreendimentos" },
    { key: "nav_contact", href: "#contato" },
  ];

  const scrollTo = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    closeMenu();
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[800] transition-all duration-500 ${
          scrolled
            ? "py-3 glass shadow-[0_4px_24px_rgba(0,0,0,0.06)] backdrop-blur-[200px]"
            : "py-[22px] bg-gradient-to-b from-black/40 to-transparent"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)] flex items-center gap-10">
          <a href="#" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="relative w-[90px] h-[90px] flex-shrink-0 transition-transform group-hover:scale-105 group-hover:rotate-[-3deg]">
              <Image
                src={
                  scrolled && !menuOpen
                    ? "/images/logoPretaSemFundo.PNG"
                    : "/images/logoBranca.PNG"
                }
                alt="Fernando Pegoraro"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <span
                className={`block text-sm font-medium leading-tight transition-colors ${scrolled && !menuOpen ? "text-ink" : "text-white"}`}
              >
                Fernando Pegoraro
              </span>
              <span
                className={`block text-[11px] tracking-wide transition-colors ${scrolled && !menuOpen ? "text-text-3" : "text-white/60"}`}
              >
                {t("header_role")}
              </span>
              <span
                className={`block text-[9px] tracking-wide transition-colors ${scrolled && !menuOpen ? "text-text-3" : "text-white/50"}`}
              >
                Creci/SC 39814F 39814F
              </span>
            </div>
          </a>

          <nav className="hidden lg:flex gap-9 ml-auto">
            {navItems.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                onClick={(e) => scrollTo(e, href)}
                className={`nav-link relative text-[13px] transition-colors tracking-wide ${scrolled ? "text-text-2 hover:text-ink" : "text-white/80 hover:text-white"}`}
              >
                {t(key)}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-5 ml-6 flex-shrink-0">
            <LangSwitcher lang={lang} setLang={setLang} scrolled={scrolled} />
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium tracking-wider bg-green-700 text-white px-[18px] py-[9px] rounded-lg transition-all hover:bg-green-800 hover:-translate-y-px hover:shadow-[0_4px_16px_rgba(15,25,35,0.2)]"
            >
              {t("header_cta")}
            </a>
          </div>

          <button
            className="lg:hidden ml-auto flex flex-col gap-[5px] p-1 w-[30px]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Menu"
          >
            <span
              className={`block h-[1.5px] ${scrolled && !menuOpen ? "bg-ink" : "bg-white"} rounded transition-all ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`}
            />
            <span
              className={`block h-[1.5px] ${scrolled && !menuOpen ? "bg-ink" : "bg-white"} rounded transition-all ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
            />
            <span
              className={`block h-[1.5px] ${scrolled && !menuOpen ? "bg-ink" : "bg-white"} rounded transition-all ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`}
            />
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 bg-ink/95 backdrop-blur-2xl z-[700] flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="text-center">
          <nav className="flex flex-col gap-7 mb-10">
            {navItems.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                onClick={(e) => scrollTo(e, href)}
                className="font-display text-[clamp(32px,6vw,44px)] font-light text-white hover:text-gold transition-colors tracking-wide"
              >
                {t(key)}
              </a>
            ))}
          </nav>
          <div className="flex justify-center gap-5 mb-8">
            <LangSwitcher lang={lang} setLang={setLang} size="lg" dark />
          </div>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-green-700 text-white text-sm font-medium tracking-wider px-7 py-3.5 rounded-lg hover:bg-green-800 transition-colors"
          >
            <WaIcon size={18} />
            {t("hero_cta")}
          </a>
        </div>
      </div>
    </>
  );
}

function LangSwitcher({
  lang,
  setLang,
  size = "sm",
  dark = false,
  scrolled = true,
}) {
  const langs = ["pt", "en", "es"];
  const textCls =
    size === "lg" ? "text-sm px-2 py-1" : "text-[11px] px-1 py-0.5";
  return (
    <div className="flex items-center gap-1.5">
      {langs.map((l, i) => (
        <span key={l} className="flex items-center gap-1.5">
          <button
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={`${textCls} font-medium tracking-widest rounded transition-all ${
              lang === l
                ? dark
                  ? "text-white bg-white/15"
                  : scrolled
                    ? "text-ink bg-ink/10"
                    : "text-white bg-white/20"
                : dark
                  ? "text-white/45 hover:text-white"
                  : scrolled
                    ? "text-text-3 hover:text-ink"
                    : "text-white/50 hover:text-white"
            }`}
          >
            {l === "pt" ? "BR" : l.toUpperCase()}
          </button>
          {i < langs.length - 1 && (
            <span
              className={`w-px h-3 ${dark ? "bg-white/20" : scrolled ? "bg-ink/15" : "bg-white/25"}`}
            />
          )}
        </span>
      ))}
    </div>
  );
}
