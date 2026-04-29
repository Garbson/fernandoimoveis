'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '@/context/LangContext';
import { WaIcon, IgIcon, ArrowIcon } from './Icons';

const WA_NUM = '554797518960';

export default function ContactSection() {
  const sectionRef = useRef(null);
  const { t } = useLang();

  useEffect(() => {
    let ctx;
    const run = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from('.contact-left > *', {
          y: 30, duration: 0.9, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '#contato', start: 'top 85%', once: true },
        });
      }, sectionRef);
    };
    run();
    return () => ctx?.revert();
  }, []);

  return (
    <section id="contato" ref={sectionRef} className="py-[clamp(80px,10vw,140px)] bg-creme-3">
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)]">
        <div className="max-w-[600px] mx-auto">

          {/* Left */}
          <div className="contact-left flex flex-col gap-0">
            <p className="section-tag flex items-center gap-2.5 text-[11px] font-medium tracking-[0.2em] uppercase text-verde-mid mb-5">
              {t('contact_tag')}
            </p>
            <h2 className="font-display font-light leading-[1.12] tracking-tight text-ink mb-10"
                style={{ fontSize: 'clamp(28px,4vw,48px)' }}>
              {t('contact_title')}
            </h2>

            {/* Channels */}
            <div className="flex flex-col gap-4">
              <a href={`https://wa.me/${WA_NUM}`} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-4 p-5 rounded-xl border bg-[rgba(37,209,102,.05)] border-[rgba(37,209,102,.2)] transition-all hover:translate-x-1.5 hover:shadow-[0_8px_24px_rgba(37,209,102,.1)]">
                <div className="w-11 h-11 rounded-lg bg-black/[0.04] flex items-center justify-center text-[#25d166] flex-shrink-0">
                  <WaIcon size={22} />
                </div>
                <div className="flex-1">
                  <span className="block text-[11px] tracking-widest uppercase text-muted mb-1">{t('contact_wa')}</span>
                  <span className="block text-base font-medium text-ink">(47) 9751-8960</span>
                </div>
                <ArrowIcon size={16} className="text-muted flex-shrink-0" />
              </a>

              <a href="https://instagram.com/fernandopegoraro_" target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-4 p-5 rounded-xl border bg-[rgba(196,151,90,.05)] border-[rgba(196,151,90,.2)] transition-all hover:translate-x-1.5 hover:shadow-[0_8px_24px_rgba(196,151,90,.1)]">
                <div className="w-11 h-11 rounded-lg bg-black/[0.04] flex items-center justify-center text-gold flex-shrink-0">
                  <IgIcon size={22} />
                </div>
                <div className="flex-1">
                  <span className="block text-[11px] tracking-widest uppercase text-muted mb-1">{t('contact_ig')}</span>
                  <span className="block text-base font-medium text-ink">@fernandopegoraro_</span>
                </div>
                <ArrowIcon size={16} className="text-muted flex-shrink-0" />
              </a>

              <div className="pt-5 border-t border-black/[0.06]">
                <span className="block text-[11px] tracking-widest uppercase text-muted mb-1.5">{t('contact_region_label')}</span>
                <span className="text-[15px] font-medium text-ink">{t('contact_region_value')}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
