'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLang } from '@/context/LangContext';
import { WaIcon, PinIcon } from './Icons';

const WA = 'https://wa.me/554797518960';

export default function AboutSection() {
  const sectionRef = useRef(null);
  const { t } = useLang();

  useEffect(() => {
    let ctx;
    const run = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from('.about-photo', {
          y: 30, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '#sobre', start: 'top 85%', once: true },
        });
        gsap.from('.about-text > *', {
          y: 30, duration: 0.9, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '#sobre', start: 'top 85%', once: true },
        });
      }, sectionRef);
    };
    run();
    return () => ctx?.revert();
  }, []);

  return (
    <section id="sobre" ref={sectionRef} className="py-[clamp(80px,10vw,140px)] bg-creme-3">
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(40px,7vw,100px)] items-center max-w-[580px] lg:max-w-none mx-auto">

          {/* Photo */}
          <div className="about-photo relative order-2 lg:order-1">
            <div className="relative">
              <Image
                src="/images/fp-chair.jpg"
                alt="Fernando Pegoraro"
                width={560} height={747}
                className="sobre-img w-full aspect-[3/4] object-cover object-top rounded-2xl brightness-95 saturate-90"
                loading="lazy"
              />
              {/* Deco */}
              <div className="hidden sm:block absolute top-5 left-[-20px] right-5 bottom-[-20px] border border-verde/20 rounded-2xl pointer-events-none -z-10" />
              {/* Region tag */}
              <div className="absolute bottom-[-20px] right-0 sm:right-[-10px] bg-verde text-creme text-xs tracking-wide px-[18px] py-3 rounded-lg flex items-center gap-2 shadow-[0_8px_32px_rgba(74,92,53,.4)]">
                <PinIcon size={14} />
                {t('about_regions')}
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="about-text order-1 lg:order-2 flex flex-col gap-0">
            <p className="section-tag flex items-center gap-2.5 text-[11px] font-medium tracking-[0.2em] uppercase text-verde-mid mb-5">
              {t('about_tag')}
            </p>
            <h2 className="font-display font-light leading-[1.12] tracking-tight text-ink mb-7"
                style={{ fontSize: 'clamp(32px,4.5vw,52px)' }}>
              {t('about_title')}
            </h2>
            {['about_p1','about_p2','about_p3'].map(k => (
              <p key={k} className="text-[15px] leading-[1.75] text-muted mb-4 last-of-type:mb-9">
                {t(k)}
              </p>
            ))}
            <a href={WA} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2.5 self-start bg-verde text-creme text-sm font-medium tracking-wide px-7 py-3.5 rounded-lg border border-verde transition-all hover:bg-verde-mid hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(74,92,53,.35)]">
              <WaIcon size={18} />
              {t('about_cta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
