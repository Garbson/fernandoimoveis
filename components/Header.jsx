'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLang } from '@/context/LangContext';
import { WaIcon } from './Icons';

const WA = 'https://wa.me/554797518960';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', menuOpen);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const navItems = [
    { key: 'nav_about',      href: '#sobre' },
    { key: 'nav_services',   href: '#servicos' },
    { key: 'nav_properties', href: '#empreendimentos' },
    { key: 'nav_contact',    href: '#contato' },
  ];

  const scrollTo = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    closeMenu();
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[800] transition-all duration-300 ${
          scrolled
            ? 'bg-ink shadow-[0_1px_0_rgba(255,255,255,.05)] py-3.5'
            : 'bg-ink shadow-[0_1px_0_rgba(255,255,255,.04)] py-[22px]'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)] flex items-center gap-10">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="relative w-[44px] h-[44px] flex-shrink-0 transition-transform group-hover:scale-105 group-hover:rotate-[-3deg]">
              <Image src="/images/logo-creme.svg" alt="Fernando Pegoraro" fill className="object-contain" />
            </div>
            <div>
              <span className="block text-sm font-medium text-creme leading-tight">Fernando Pegoraro</span>
              <span className="block text-[11px] text-creme/50 tracking-wide">{t('header_role')}</span>
            </div>
          </a>

          {/* Nav */}
          <nav className="hidden lg:flex gap-9 ml-auto">
            {navItems.map(({ key, href }) => (
              <a key={key} href={href} onClick={(e) => scrollTo(e, href)}
                 className="nav-link relative text-[13px] text-creme/70 hover:text-creme transition-colors tracking-wide">
                {t(key)}
              </a>
            ))}
          </nav>

          {/* Right */}
          <div className="hidden lg:flex items-center gap-5 ml-6 flex-shrink-0">
            <LangSwitcher lang={lang} setLang={setLang} />
            <a href={WA} target="_blank" rel="noopener noreferrer"
               className="text-xs font-medium tracking-wider bg-creme text-verde px-[18px] py-[9px] rounded-lg transition-all hover:bg-creme-2 hover:-translate-y-px">
              {t('header_cta')}
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden ml-auto flex flex-col gap-[5px] p-1 w-[30px]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Menu"
          >
            <span className={`block h-[1.5px] bg-creme rounded transition-all ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block h-[1.5px] bg-creme rounded transition-all ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
            <span className={`block h-[1.5px] bg-creme rounded transition-all ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <div
        className={`fixed inset-0 bg-ink z-[700] flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!menuOpen}
      >
        <div className="text-center">
          <nav className="flex flex-col gap-7 mb-10">
            {navItems.map(({ key, href }) => (
              <a key={key} href={href} onClick={(e) => scrollTo(e, href)}
                 className="font-display text-[clamp(32px,6vw,44px)] font-light text-creme hover:text-gold transition-colors tracking-wide">
                {t(key)}
              </a>
            ))}
          </nav>
          <div className="flex justify-center gap-5 mb-8">
            <LangSwitcher lang={lang} setLang={setLang} size="lg" />
          </div>
          <a href={WA} target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-2.5 bg-verde text-creme text-sm font-medium tracking-wider px-7 py-3.5 rounded-lg">
            <WaIcon size={18} />
            {t('hero_cta')}
          </a>
        </div>
      </div>
    </>
  );
}

function LangSwitcher({ lang, setLang, size = 'sm' }) {
  const langs = ['pt','en','es'];
  const textCls = size === 'lg' ? 'text-sm px-2 py-1' : 'text-[11px] px-1 py-0.5';
  return (
    <div className="flex items-center gap-1.5">
      {langs.map((l, i) => (
        <span key={l} className="flex items-center gap-1.5">
          <button
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={`${textCls} font-medium tracking-widest rounded transition-all ${
              lang === l ? 'text-creme bg-white/10' : 'text-creme/45 hover:text-creme'
            }`}
          >
            {l === 'pt' ? 'BR' : l.toUpperCase()}
          </button>
          {i < langs.length - 1 && <span className="w-px h-3 bg-white/20" />}
        </span>
      ))}
    </div>
  );
}
