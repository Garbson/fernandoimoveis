'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLang } from '@/context/LangContext';
import { WaIcon, CheckIcon } from './Icons';

const WA = 'https://wa.me/554797518960';

/* Divide texto em spans por palavra para animação wave */
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
  const sectionRef  = useRef(null);
  const photoRevRef = useRef(null);
  const { t } = useLang();

  useEffect(() => {
    let ctx;

    const run = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.15 });

        /* ── Foto: revela com clip-path wipe de cima pra baixo ── */
        tl.fromTo(
          photoRevRef.current,
          { clipPath: 'inset(0 0 100% 0 round 16px)' },
          { clipPath: 'inset(0 0 0% 0 round 16px)', duration: 1.3, ease: 'power4.inOut' },
          0
        )
        .from('.hero-img', { scale: 1.1, duration: 1.6, ease: 'power3.out' }, 0)

        /* ── Eyebrow desliza ── */
        .from('.hero-eyebrow', { y: 22, autoAlpha: 0, duration: 0.6, ease: 'power4.out' }, 0.3)

        /* ── Palavras do título: wave da esquerda para direita ── */
        .from('.wave-word', {
          y: 70,
          autoAlpha: 0,
          rotateZ: -3,
          duration: 0.6,
          stagger: { each: 0.055, ease: 'power1.inOut' },
          ease: 'back.out(1.6)',
        }, 0.45)

        /* ── Descrição ── */
        .from('.hero-desc', { y: 24, autoAlpha: 0, duration: 0.7, ease: 'power4.out' }, 0.9)

        /* ── Botões ── */
        .from('.hero-action', {
          y: 18, autoAlpha: 0, duration: 0.55, stagger: 0.12, ease: 'back.out(1.4)',
        }, 1.05)

        /* ── Trust items ── */
        .from('.hero-trust-item', {
          x: -16, autoAlpha: 0, duration: 0.45, stagger: 0.1, ease: 'power3.out',
        }, 1.22)

        /* ── Badges com mola ── */
        .from('.hero-badge',      { y: 28, autoAlpha: 0, duration: 0.9, ease: 'back.out(2)' }, 1.1)
        .from('.hero-float-card', { y: -28, autoAlpha: 0, duration: 0.9, ease: 'back.out(2)' }, 1.2)

        /* ── Scroll hint ── */
        .from('.hero-scroll-hint', { autoAlpha: 0, duration: 0.6 }, 1.5);

        /* ── Contador do badge ── */
        gsap.fromTo('.hero-badge-num',
          { textContent: 0 },
          { textContent: 12, duration: 1.4, ease: 'power2.out', snap: { textContent: 1 }, delay: 1.2 }
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
      className="relative min-h-screen flex items-center overflow-hidden pt-[140px] pb-20"
    >
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)] relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(40px,6vw,100px)] items-center">

          {/* ── Texto ── */}
          <div>
            <p className="hero-eyebrow flex items-center gap-2.5 text-[11px] font-medium tracking-[0.25em] uppercase text-gold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0 animate-pulse-dot" />
              {t('hero_eyebrow')}
            </p>

            <h1
              className="font-display text-creme font-bold leading-[1.06] tracking-tight mb-7"
              style={{ fontSize: 'clamp(34px,4.5vw,62px)' }}
            >
              {/* Cada linha tem overflow-hidden para o clip das palavras */}
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

            <p
              className="hero-desc text-creme/65 leading-relaxed mb-10 max-w-[480px]"
              style={{ fontSize: 'clamp(15px,1.5vw,17px)' }}
            >
              {t('hero_desc')}
            </p>

            <div className="flex flex-wrap gap-3.5 mb-8">
              <a
                href={WA} target="_blank" rel="noopener noreferrer"
                className="hero-action inline-flex items-center gap-2.5 bg-verde text-creme text-sm font-medium tracking-wide px-7 py-3.5 rounded-lg border border-verde transition-all hover:bg-verde-mid hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(74,92,53,.35)]"
              >
                <WaIcon size={18} />
                {t('hero_cta')}
              </a>
              <a
                href="#sobre" onClick={(e) => scrollTo(e, '#sobre')}
                className="hero-action inline-flex items-center gap-2 bg-transparent text-creme/75 text-sm font-light tracking-wide px-[26px] py-[13px] rounded-lg border border-creme/25 transition-all hover:text-creme hover:border-creme/60 hover:-translate-y-0.5"
              >
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

          {/* ── Foto ── */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px]">
              <div
                ref={photoRevRef}
                className="rounded-2xl overflow-hidden"
                style={{ clipPath: 'inset(0 0 100% 0 round 16px)' }}
              >
                <Image
                  src="/images/fp-sofa.jpg"
                  alt="Fernando Pegoraro — Corretor de Imóveis"
                  width={480} height={640}
                  priority
                  className="hero-img w-full object-cover object-top aspect-[3/4] brightness-95 saturate-[0.92] transition-all hover:brightness-100 hover:saturate-100"
                />
              </div>

              {/* Deco border */}
              <div className="hidden sm:block absolute top-[-16px] right-[-16px] bottom-4 left-4 border border-gold/25 rounded-2xl pointer-events-none -z-10" />

              {/* Badge */}
              <div className="hero-badge hidden sm:block absolute bottom-8 left-[-28px] glass-warm border border-gold/30 rounded-2xl px-5 py-4 text-center">
                <div className="animate-badge-ring absolute inset-[-4px] border border-gold/15 rounded-[18px]" />
                <span
                  className="hero-badge-num block font-display text-[36px] font-semibold text-gold leading-none"
                  data-count="12"
                >
                  0
                </span>
                <span className="block text-[10px] tracking-wide text-creme/55 mt-1 whitespace-nowrap">{t('hero_badge')}</span>
              </div>

              {/* Float card */}
              <div className="hero-float-card animate-float-card absolute top-9 right-[-24px] glass-verde border border-verde-lt/40 rounded-xl px-[18px] py-3.5 flex items-center gap-3 max-sm:hidden">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C4975A" strokeWidth="1.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                <div>
                  <span className="block font-display text-[22px] font-semibold text-creme leading-none">R$ 150M+</span>
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
