'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '@/context/LangContext';
import { WaIcon, CheckIcon } from './Icons';

const WA = 'https://wa.me/554797518960';

/* Divide texto em spans por palavra — animação wave */
function WaveWords({ text, className = '' }) {
  return (
    <>
      {String(text).split(' ').map((word, i) => (
        <span
          key={i}
          className={`wave-word inline-block ${className}`}
          style={{ marginRight: '0.28em' }}
        >
          {word}
        </span>
      ))}
    </>
  );
}

export default function HeroSection() {
  const sectionRef = useRef(null);
  const { t } = useLang();

  useEffect(() => {
    let ctx;

    const run = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.2 });

        /* Eyebrow */
        tl.from('.hero-eyebrow', { y: 20, autoAlpha: 0, duration: 0.6, ease: 'power4.out' }, 0)

        /* Palavras wave da esquerda para direita */
        .from('.wave-word', {
          y: 80, autoAlpha: 0, rotateZ: -3,
          duration: 0.65,
          stagger: { each: 0.05, ease: 'power1.inOut' },
          ease: 'back.out(1.6)',
        }, 0.25)

        /* Descrição */
        .from('.hero-desc', { y: 22, autoAlpha: 0, duration: 0.7, ease: 'power4.out' }, 0.85)

        /* Linha divisora */
        .from('.hero-divider', { scaleX: 0, duration: 0.8, ease: 'power3.inOut', transformOrigin: 'left' }, 0.9)

        /* Stats */
        .from('.hero-stat', { y: 18, autoAlpha: 0, duration: 0.55, stagger: 0.12, ease: 'back.out(1.5)' }, 1.0)

        /* Botões */
        .from('.hero-action', { y: 18, autoAlpha: 0, duration: 0.55, stagger: 0.1, ease: 'back.out(1.4)' }, 1.1)

        /* Trust items */
        .from('.hero-trust-item', { x: -14, autoAlpha: 0, duration: 0.45, stagger: 0.08, ease: 'power3.out' }, 1.25)

        /* Ondas no mar — fade-in animado */
        .from('.hero-wave-line', { autoAlpha: 0, x: -40, duration: 0.6, stagger: 0.07, ease: 'power2.out' }, 0.55)

        /* Scroll hint */
        .from('.hero-scroll-hint', { autoAlpha: 0, duration: 0.6 }, 1.5);

        /* Contador animado */
        gsap.fromTo('.hero-count-12',
          { textContent: 0 },
          { textContent: 12, duration: 1.4, ease: 'power2.out', snap: { textContent: 1 }, delay: 1.1 }
        );
        gsap.fromTo('.hero-count-150',
          { textContent: 0 },
          { textContent: 150, duration: 1.4, ease: 'power2.out', snap: { textContent: 1 }, delay: 1.2 }
        );
      }, sectionRef);
    };

    run();
    return () => ctx?.revert();
  }, []);

  const scrollTo = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-[120px] pb-24 text-center"
    >
      <div className="max-w-[860px] mx-auto px-[clamp(20px,5vw,60px)] relative z-10 w-full">

        {/* Eyebrow */}
        <p className="hero-eyebrow inline-flex items-center gap-2.5 text-[11px] font-medium tracking-[0.28em] uppercase text-gold mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 animate-pulse-dot" />
          {t('hero_eyebrow')}
        </p>

        {/* Título wave */}
        <h1
          className="font-display text-creme font-bold leading-[1.06] tracking-tight mb-8"
          style={{ fontSize: 'clamp(40px,6vw,80px)' }}
        >
          <span className="block overflow-hidden pb-1">
            <WaveWords text={t('hero_title_1')} />
          </span>
          <span className="block overflow-hidden pb-1">
            <WaveWords text={t('hero_title_2')} className="italic text-gold" />
          </span>
          <span className="block overflow-hidden pb-1">
            <WaveWords text={t('hero_title_3')} />
          </span>
        </h1>

        {/* Descrição */}
        <p
          className="hero-desc text-creme/60 leading-relaxed mb-10 max-w-[560px] mx-auto"
          style={{ fontSize: 'clamp(15px,1.6vw,18px)' }}
        >
          {t('hero_desc')}
        </p>

        {/* Botões */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-10">
          <a
            href={WA} target="_blank" rel="noopener noreferrer"
            className="hero-action inline-flex items-center gap-2.5 bg-verde text-creme text-sm font-medium tracking-wide px-8 py-4 rounded-lg border border-verde transition-all hover:bg-verde-mid hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(74,92,53,.35)]"
          >
            <WaIcon size={18} />
            {t('hero_cta')}
          </a>
          <a
            href="#sobre" onClick={(e) => scrollTo(e, '#sobre')}
            className="hero-action inline-flex items-center gap-2 bg-transparent text-creme/75 text-sm font-light tracking-wide px-7 py-[15px] rounded-lg border border-creme/25 transition-all hover:text-creme hover:border-creme/60 hover:-translate-y-0.5"
          >
            {t('hero_more')}
          </a>
        </div>

        {/* Linha divisora */}
        <div className="hero-divider w-16 h-px bg-creme/20 mx-auto mb-10" />

        {/* Stats */}
        <div className="flex items-center justify-center gap-[clamp(24px,5vw,56px)] mb-10">
          <div className="hero-stat text-center">
            <div className="font-display font-bold text-gold leading-none mb-1" style={{ fontSize: 'clamp(28px,3.5vw,44px)' }}>
              <span className="hero-count-12">0</span>
            </div>
            <span className="text-[11px] tracking-widest uppercase text-creme/45">{t('hero_badge')}</span>
          </div>
          <div className="w-px h-10 bg-creme/15" />
          <div className="hero-stat text-center">
            <div className="font-display font-bold text-gold leading-none mb-1" style={{ fontSize: 'clamp(28px,3.5vw,44px)' }}>
              R$ <span className="hero-count-150">0</span>M+
            </div>
            <span className="text-[11px] tracking-widest uppercase text-creme/45">{t('float_label')}</span>
          </div>
        </div>

        {/* Trust items */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
          {['hero_company', 'hero_trust2'].map((k) => (
            <div key={k} className="hero-trust-item flex items-center gap-2 text-xs text-creme/40">
              <CheckIcon size={14} className="text-verde-lt flex-shrink-0" />
              {t(k)}
            </div>
          ))}
        </div>
      </div>

      {/* ── Ondas animadas no horizonte ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ zIndex: 2 }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full" height="80">
          <path className="hero-wave-line" d="M0,40 Q180,20 360,40 Q540,60 720,40 Q900,20 1080,40 Q1260,60 1440,40 L1440,80 L0,80 Z"
            fill="rgba(14,46,64,0.35)" />
          <path className="hero-wave-line" d="M0,52 Q180,34 360,52 Q540,70 720,52 Q900,34 1080,52 Q1260,70 1440,52 L1440,80 L0,80 Z"
            fill="rgba(14,46,64,0.25)" />
          <path className="hero-wave-line" d="M0,62 Q240,46 480,62 Q720,78 960,62 Q1200,46 1440,62 L1440,80 L0,80 Z"
            fill="rgba(10,30,50,0.2)" />
        </svg>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll-hint absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-creme/30 text-[9px] tracking-[0.3em] uppercase z-10">
        <div className="animate-scroll-ln w-px h-12 bg-gradient-to-b from-transparent to-creme/30" />
        {t('hero_scroll')}
      </div>
    </section>
  );
}
