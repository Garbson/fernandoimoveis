'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLang } from '@/context/LangContext';
import { WaIcon, CheckIcon } from './Icons';

const WA = 'https://wa.me/554797518960';

export default function HeroSection() {
  const sectionRef   = useRef(null);
  const photoRevRef  = useRef(null);
  const { t } = useLang();

  useEffect(() => {
    let ctx;

    const run = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      // Foto revela enquanto o loader ainda está na tela
      const photoTimer = setTimeout(() => {
        photoRevRef.current?.classList.add('visible');
      }, 100);

      ctx = gsap.context(() => {
        // Sem opacity:0 — texto sempre visível, só anima posição
        const tl = gsap.timeline({ delay: 0.1, defaults: { ease: 'power4.out' } });
        tl.from('.hero-eyebrow',    { y: 20, duration: 0.6 })
          .from('.h1-line > *',     { y: 50, duration: 0.7, stagger: 0.1, skewY: 1.5 }, 0.2)
          .from('.hero-desc',       { y: 18, duration: 0.6 }, 0.5)
          .from('.hero-action',     { y: 14, duration: 0.5, stagger: 0.08 }, 0.7)
          .from('.hero-trust-item', { y: 10, duration: 0.4, stagger: 0.06 }, 0.85)
          .from('.hero-badge',      { x: -25, opacity: 0, duration: 0.7, ease: 'back.out(1.7)' }, 0.95)
          .from('.hero-float-card', { x: 25,  opacity: 0, duration: 0.7, ease: 'back.out(1.7)' }, 1.05)
          .from('.hero-scroll-hint',{ opacity: 0, duration: 0.5 }, 1.3);

        gsap.fromTo('.hero-badge-num',
          { textContent: 0 },
          {
            textContent: 12,
            duration: 1.3,
            ease: 'power2.out',
            snap: { textContent: 1 },
            delay: 1.05,
          }
        );
      }, sectionRef);

      return () => clearTimeout(photoTimer);
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
      className="relative min-h-screen bg-ink flex items-center overflow-hidden pt-[140px] pb-20"
    >
      {/* Orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="animate-orb-1 absolute w-[600px] h-[600px] rounded-full bg-verde opacity-20 blur-[100px] -top-[10%] -right-[5%]" />
        <div className="animate-orb-2 absolute w-[400px] h-[400px] rounded-full bg-gold opacity-15 blur-[100px] -bottom-[10%] left-[5%]" />
      </div>

      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)] relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(40px,6vw,100px)] items-center">

          {/* Text */}
          <div>
            <p className="hero-eyebrow flex items-center gap-2.5 text-[11px] font-medium tracking-[0.25em] uppercase text-gold mb-6 overflow-hidden">
              <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 animate-pulse-dot" />
              {t('hero_eyebrow')}
            </p>

            <h1 className="font-display text-creme font-light leading-[1.05] tracking-tight mb-7"
                style={{ fontSize: 'clamp(44px,6vw,80px)' }}>
              <span className="h1-line block overflow-hidden">
                <span>{t('hero_title_1')}</span>
              </span>
              <span className="h1-line block overflow-hidden">
                <em className="italic text-gold">{t('hero_title_2')}</em>
              </span>
              <span className="h1-line block overflow-hidden">
                <span>{t('hero_title_3')}</span>
              </span>
            </h1>

            <p className="hero-desc text-creme/65 leading-relaxed mb-10 max-w-[480px]"
               style={{ fontSize: 'clamp(15px,1.5vw,17px)' }}>
              {t('hero_desc')}
            </p>

            <div className="flex flex-wrap gap-3.5 mb-8">
              <a href={WA} target="_blank" rel="noopener noreferrer"
                 className="hero-action inline-flex items-center gap-2.5 bg-verde text-creme text-sm font-medium tracking-wide px-7 py-3.5 rounded-lg border border-verde transition-all hover:bg-verde-mid hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(74,92,53,.35)]">
                <WaIcon size={18} />
                {t('hero_cta')}
              </a>
              <a href="#sobre" onClick={(e) => scrollTo(e, '#sobre')}
                 className="hero-action inline-flex items-center gap-2 bg-transparent text-creme/75 text-sm font-light tracking-wide px-[26px] py-[13px] rounded-lg border border-creme/25 transition-all hover:text-creme hover:border-creme/60 hover:-translate-y-0.5">
                {t('hero_more')}
              </a>
            </div>

            <div className="flex flex-col gap-2">
              {['hero_company', 'hero_trust2'].map((k) => (
                <div key={k} className="hero-trust-item flex items-center gap-2 text-xs text-creme/45">
                  <CheckIcon size={14} className="text-verde-lt flex-shrink-0" />
                  {t(k)}
                </div>
              ))}
            </div>
          </div>

          {/* Photo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px]">
              {/* Reveal */}
              <div ref={photoRevRef} className="photo-reveal rounded-2xl overflow-hidden">
                <Image
                  src="/images/fp-sofa.jpg"
                  alt="Fernando Pegoraro — Corretor de Imóveis"
                  width={480} height={640}
                  priority
                  className="hero-img w-full object-cover object-top aspect-[3/4] brightness-95 saturate-90 transition-all hover:brightness-100 hover:saturate-100"
                />
              </div>

              {/* Deco border */}
              <div className="hidden sm:block absolute top-[-16px] right-[-16px] bottom-4 left-4 border border-gold/25 rounded-2xl pointer-events-none -z-10" />

              {/* Badge */}
              <div className="hero-badge hidden sm:block absolute bottom-8 left-[-28px] bg-ink-2 border border-gold/30 rounded-2xl px-5 py-4 text-center backdrop-blur-md">
                <div className="animate-badge-ring absolute inset-[-4px] border border-gold/15 rounded-[18px]" />
                <span
                  className="hero-badge-num block font-display text-[36px] font-light text-gold leading-none stat-num"
                  data-count="12"
                >
                  0
                </span>
                <span className="block text-[10px] tracking-wide text-creme/55 mt-1 whitespace-nowrap">{t('hero_badge')}</span>
              </div>

              {/* Float card */}
              <div className="hero-float-card animate-float-card absolute top-9 right-[-24px] bg-verde-dk border border-verde-lt/40 rounded-xl px-[18px] py-3.5 flex items-center gap-3 backdrop-blur-md max-sm:hidden">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C4975A" strokeWidth="1.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                <div>
                  <span className="block font-display text-[22px] font-light text-creme leading-none">R$ 150M+</span>
                  <span className="block text-[10px] text-creme/50 mt-0.5 tracking-wide">{t('float_label')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll-hint absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-creme/30 text-[9px] tracking-[0.3em] uppercase z-10">
        <div className="animate-scroll-ln w-px h-12 bg-gradient-to-b from-transparent to-creme/30" />
        {t('hero_scroll')}
      </div>
    </section>
  );
}
