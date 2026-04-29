'use client';
import { useEffect, useRef, useState } from 'react';
import { useLang } from '@/context/LangContext';
import { ArrowIcon } from './Icons';

const SERVICES = [
  {
    titleKey: 's1_title', descKey: 's1_desc', featured: false,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    titleKey: 's2_title', descKey: 's2_desc', featured: true,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    titleKey: 's3_title', descKey: 's3_desc', featured: false,
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
    ),
  },
];

function ServiceCard({ titleKey, descKey, featured, icon, mobile = false }) {
  const { t } = useLang();
  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl border transition-all duration-500
        ${mobile
          ? 'flex-shrink-0 snap-center w-[82vw] p-8'
          : 'svc-card group p-[clamp(28px,3vw,40px)] hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(0,0,0,.4)]'}
        ${featured
          ? 'bg-verde-dk border-verde-lt/50 hover:border-verde-lt'
          : 'bg-ink-2 border-white/[0.06] hover:border-verde/40'}
      `}
    >
      {!mobile && (
        <div className="scard-bg absolute inset-0 bg-gradient-to-br from-verde/10 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none" />
      )}

      <div className={`
        relative w-14 h-14 rounded-xl flex items-center justify-center mb-6
        ${!mobile && 'transition-all group-hover:scale-105'}
        ${featured ? 'bg-verde/50 text-gold' : `bg-verde/20 text-verde-lt ${!mobile && 'group-hover:bg-verde/40'}`}
      `}>
        {icon}
      </div>

      <h3 className="relative font-display text-2xl font-normal text-creme mb-3.5 leading-snug">
        {t(titleKey)}
      </h3>
      <p className="relative text-sm leading-[1.75] text-creme/50 mb-7">{t(descKey)}</p>

      <div className={`relative ${!mobile && 'transition-transform duration-300 group-hover:translate-x-1.5'} ${featured ? 'text-gold' : 'text-verde-lt'}`}>
        <ArrowIcon size={20} />
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const trackRef   = useRef(null);
  const { t } = useLang();
  const [activeCard, setActiveCard] = useState(0);

  /* GSAP */
  useEffect(() => {
    let ctx;
    const run = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from('.section-header-srv > *', {
          y: 30, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '#servicos', start: 'top 85%', once: true },
        });
        gsap.from('.svc-card', {
          y: 40, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.svc-grid', start: 'top 85%', once: true },
        });
      }, sectionRef);
    };
    run();
    return () => ctx?.revert();
  }, []);

  /* Scroll → dot sync */
  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll('.svc-mobile-card');
    if (!cards.length) return;
    const cardW = cards[0].offsetWidth + 16; // width + gap-4
    setActiveCard(Math.round(track.scrollLeft / cardW));
  };

  /* Dot → scroll */
  const scrollTo = (idx) => {
    const track = trackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll('.svc-mobile-card');
    if (!cards[idx]) return;
    cards[idx].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    setActiveCard(idx);
  };

  return (
    <section id="servicos" ref={sectionRef} className="py-[clamp(80px,10vw,140px)] bg-ink overflow-hidden">

      {/* Header — always centred */}
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)]">
        <div className="section-header-srv text-center mb-10 md:mb-14">
          <p className="section-tag inline-flex items-center gap-2.5 text-[11px] font-medium tracking-[0.2em] uppercase text-gold mb-5">
            {t('services_tag')}
          </p>
          <h2 className="font-display font-light leading-[1.12] tracking-tight text-creme"
              style={{ fontSize: 'clamp(32px,4.5vw,52px)' }}>
            {t('services_title')}
          </h2>
        </div>
      </div>

      {/* ── MOBILE: horizontal snap carousel ── */}
      <div className="md:hidden">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="no-scrollbar flex overflow-x-auto snap-x snap-mandatory gap-4 px-[clamp(20px,5vw,80px)]"
        >
          {SERVICES.map(({ titleKey, descKey, featured, icon }) => (
            <div key={titleKey} className="svc-mobile-card snap-center flex-shrink-0 w-[82vw]">
              <ServiceCard titleKey={titleKey} descKey={descKey} featured={featured} icon={icon} mobile />
            </div>
          ))}
          {/* trailing spacer so last card centres */}
          <div className="flex-shrink-0 w-[9vw]" aria-hidden />
        </div>

        {/* Progress dots */}
        <div className="flex justify-center gap-2.5 mt-7">
          {SERVICES.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`serviço ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeCard ? 'w-8 bg-gold' : 'w-2.5 bg-white/25 hover:bg-white/45'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── DESKTOP: 3-column grid ── */}
      <div className="hidden md:block max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)]">
        <div className="svc-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map(({ titleKey, descKey, featured, icon }) => (
            <ServiceCard key={titleKey} titleKey={titleKey} descKey={descKey} featured={featured} icon={icon} />
          ))}
        </div>
      </div>

    </section>
  );
}
