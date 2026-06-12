'use client';
import { useEffect, useRef } from 'react';
import { useLang } from '@/context/LangContext';
import { getGsap } from '@/lib/gsap';

const WA = 'https://wa.me/554797518960';

export default function CtaBand() {
  const sectionRef = useRef(null);
  const { t } = useLang();

  useEffect(() => {
    let ctx;
    const run = async () => {
      const { gsap } = await getGsap();
      ctx = gsap.context(() => {
        gsap.from('.cta-inner > *', {
          y: 30, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', once: true },
        });
        gsap.fromTo('.cta-bg-img',
          { scale: 1.15, yPercent: -10 },
          {
            scale: 1,
            yPercent: 10,
            ease: 'none',
            scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );
      }, sectionRef);
    };
    run();
    return () => ctx?.revert();
  }, []);

  return (
    <section id="cta-band" ref={sectionRef} className="relative py-[clamp(80px,12vw,160px)] overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-[-10%] cta-bg-img">
          <img src="/images/edificios/lagom/1.webp" alt="" className="absolute inset-0 w-full h-full object-cover object-center lg:object-[center_32%] brightness-[0.3]" aria-hidden />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/50 to-ink/65" />
      </div>
      <div className="cta-inner relative z-10 max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)] text-center">
        <h2 className="font-display font-semibold text-white leading-[1.15] tracking-tight max-w-[700px] mx-auto mb-9"
            style={{ fontSize: 'clamp(28px,4vw,52px)' }}>
          {t('cta_title')}
        </h2>
        <a href={WA} target="_blank" rel="noopener noreferrer"
           className="inline-flex items-center gap-2.5 bg-green-700 text-white text-sm font-semibold tracking-wide px-10 py-5 rounded-xl transition-all hover:bg-green-800 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(15,25,35,.3)]">
          {t('cta_btn')}
        </a>
      </div>
    </section>
  );
}
