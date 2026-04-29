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
        gsap.from('.faq-head > *', {
          y: 24, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '#duvidas', start: 'top 88%', once: true },
        });
        gsap.from('.faq-item', {
          y: 24, duration: 0.7, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.faq-list', start: 'top 90%', once: true },
        });
      }, sectionRef);
    };
    run();
    return () => ctx?.revert();
  }, []);

  const items = [1, 2, 3, 4];

  return (
    <section id="duvidas" ref={sectionRef} className="relative py-[clamp(80px,10vw,140px)] bg-ink overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-24 -left-20 w-[360px] h-[360px] rounded-full bg-verde/20 blur-[120px]" />
        <div className="absolute -bottom-24 -right-20 w-[380px] h-[380px] rounded-full bg-gold/15 blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)]">
        <div className="faq-head text-center mb-12">
          <p className="section-tag inline-flex items-center gap-2.5 text-[11px] font-medium tracking-[0.2em] uppercase text-gold mb-5">
            {t('faq_tag')}
          </p>
          <h2 className="font-display font-light leading-[1.12] tracking-tight text-creme mb-4"
            style={{ fontSize: 'clamp(30px,4.2vw,50px)' }}>
            {t('faq_title')}
          </h2>
          <p className="text-base leading-relaxed text-creme/70 max-w-[760px] mx-auto">{t('faq_subtitle')}</p>
        </div>

        <div className="faq-list max-w-[920px] mx-auto space-y-3.5">
          {items.map((id, idx) => {
            const opened = open === idx;
            return (
              <div
                key={id}
                className={`faq-item rounded-xl overflow-hidden border transition-colors ${
                  opened ? 'bg-white/12 border-white/30' : 'bg-white/5 border-white/15 hover:border-white/25'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(opened ? -1 : idx)}
                  className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-start justify-between gap-4"
                  aria-expanded={opened}
                >
                  <span className="text-[15px] sm:text-base font-medium text-creme leading-snug">{t(`faq_q${id}`)}</span>
                  <span className="text-gold text-xl leading-none mt-0.5">{opened ? '−' : '+'}</span>
                </button>
                <div className={`grid transition-all duration-300 ease-out ${opened ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <p className="px-5 sm:px-6 pb-5 text-sm leading-relaxed text-creme/70">{t(`faq_a${id}`)}</p>
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
