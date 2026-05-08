'use client';
import { useEffect, useRef, useState } from 'react';
import { useLang } from '@/context/LangContext';

export default function FaqSection() {
  const sectionRef = useRef(null);
  const { t } = useLang();
  const [open, setOpen] = useState(0);

  useEffect(() => {
    let ctx;
    const run = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from('.faq-head > *', { y: 24, duration: 0.7, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: '#duvidas', start: 'top 75%', once: true } });
        gsap.from('.faq-item', { y: 24, duration: 0.7, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '.faq-list', start: 'top 75%', once: true } });
      }, sectionRef);
    };
    run();
    return () => ctx?.revert();
  }, []);

  const items = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <section id="duvidas" ref={sectionRef} className="reveal-section section-alt-b relative py-[clamp(80px,10vw,140px)] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-24 -left-20 w-[360px] h-[360px] rounded-full bg-surface-3/80 blur-[120px]" />
        <div className="absolute -bottom-24 -right-20 w-[380px] h-[380px] rounded-full bg-gold/[0.07] blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)]">
        <div className="faq-head text-center mb-12">
          <p className="section-tag inline-flex items-center gap-2.5 text-[11px] font-medium tracking-[0.2em] uppercase text-gold mb-5">{t('faq_tag')}</p>
          <h2 className="font-display font-semibold leading-[1.12] tracking-tight text-ink mb-4" style={{ fontSize: 'clamp(30px,4.2vw,50px)' }}>{t('faq_title')}</h2>
          <p className="text-base leading-relaxed text-text-2 max-w-[760px] mx-auto">{t('faq_subtitle')}</p>
        </div>

        <div className="faq-list max-w-[920px] mx-auto space-y-3.5">
          {items.map((id, idx) => {
            const opened = open === idx;
            return (
              <div key={id} className={`faq-item rounded-xl overflow-hidden transition-all duration-300 ${opened ? 'glass shadow-[0_8px_24px_rgba(0,0,0,.06)]' : 'bg-white/40 border border-ink/[0.06] hover:border-ink/[0.12]'}`}>
                <button type="button" onClick={() => setOpen(opened ? -1 : idx)}
                  className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-start justify-between gap-4" aria-expanded={opened}>
                  <span className="text-[15px] sm:text-base font-medium text-ink leading-snug">{t(`faq_q${id}`)}</span>
                  <span className="text-gold text-xl leading-none mt-0.5 transition-transform duration-300" style={{ transform: opened ? 'rotate(45deg)' : 'rotate(0deg)' }}>+</span>
                </button>
                <div className={`grid transition-all duration-300 ease-out ${opened ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <p className="px-5 sm:px-6 pb-5 text-sm leading-relaxed text-text-2">{t(`faq_a${id}`)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
