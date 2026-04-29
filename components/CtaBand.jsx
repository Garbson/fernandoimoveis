'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLang } from '@/context/LangContext';

const WA = 'https://wa.me/554797518960';

export default function CtaBand() {
  const sectionRef = useRef(null);
  const { t } = useLang();

  useEffect(() => {
    let ctx;
    const run = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from('.cta-inner > *', {
          y: 30, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '#cta-band', start: 'top 80%', once: true },
        });
      }, sectionRef);
    };
    run();
    return () => ctx?.revert();
  }, []);

  return (
    <section id="cta-band" ref={sectionRef} className="relative py-[clamp(80px,12vw,160px)] overflow-hidden">
      <div className="absolute inset-0">
        <Image src="/images/edificios/organica3.jpeg" alt="" fill className="object-cover object-center lg:object-[center_32%] brightness-35 saturate-90" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/85" />
      </div>
      <div className="cta-inner relative z-10 max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)] text-center">
        <h2 className="font-display font-light text-creme leading-[1.15] tracking-tight max-w-[700px] mx-auto mb-9"
            style={{ fontSize: 'clamp(28px,4vw,52px)' }}>
          {t('cta_title')}
        </h2>
        <a href={WA} target="_blank" rel="noopener noreferrer"
           className="inline-flex items-center gap-2.5 bg-verde text-creme text-sm font-medium tracking-wide px-10 py-5 rounded-lg border border-verde transition-all hover:bg-verde-mid hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(74,92,53,.4)]">
          {t('cta_btn')}
        </a>
      </div>
    </section>
  );
}
