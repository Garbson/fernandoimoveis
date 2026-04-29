'use client';
import { Fragment, useEffect, useRef } from 'react';
import { useLang } from '@/context/LangContext';

const STATS = [
  { prefix: 'R$', count: 150, suffix: 'M+', labelKey: 'stat1_label' },
  { count: 12,  labelKey: 'stat2_label' },
  { count: 3, suffix: 'ª', labelKey: 'stat3_label' },
];

export default function StatsSection() {
  const sectionRef = useRef(null);
  const { t } = useLang();

  useEffect(() => {
    let ctx;
    const run = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.utils.toArray('.stat-item').forEach((item, i) => {
          const numEl = item.querySelector('.stat-num[data-count]');
          const target = parseInt(numEl?.dataset.count || '0', 10);

          gsap.fromTo(item,
            { y: 30, scale: 0.98 },
            {
              y: 0,
              scale: 1,
              duration: 0.75,
              ease: 'power3.out',
              delay: i * 0.05,
              scrollTrigger: { trigger: item, start: 'top 90%', once: true },
            }
          );

          if (numEl) {
            gsap.fromTo(numEl,
              { textContent: 0 },
              {
                textContent: target,
                duration: 1.8,
                ease: 'power2.out',
                snap: { textContent: 1 },
                scrollTrigger: { trigger: item, start: 'top 90%', once: true },
              }
            );
          }
        });
      }, sectionRef);
    };
    run();
    return () => ctx?.revert();
  }, []);

  return (
    <section id="stats" ref={sectionRef} className="bg-ink-2 py-20">
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)]">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-0">
          {STATS.map((s, i) => (
            <Fragment key={s.labelKey}>
              <div className="stat-item text-center py-5 px-5">
                <div className="flex items-baseline justify-center gap-1 mb-3">
                  {s.prefix && (
                    <span className="font-display text-gold font-light" style={{ fontSize: 'clamp(20px,2.5vw,28px)' }}>
                      {s.prefix}
                    </span>
                  )}
                  <span
                    className="stat-num font-display text-creme font-light leading-none tracking-tight"
                    style={{ fontSize: 'clamp(52px,7vw,88px)' }}
                    data-count={s.count}
                  >
                    0
                  </span>
                  {s.suffix && (
                    <span className="font-display text-gold font-light" style={{ fontSize: 'clamp(28px,3.5vw,44px)' }}>
                      {s.suffix}
                    </span>
                  )}
                </div>
                <p className="text-xs tracking-wide text-creme/40 leading-snug max-w-[180px] mx-auto">{t(s.labelKey)}</p>
              </div>
              {i < STATS.length - 1 && (
                <div className="hidden md:block w-px h-20 bg-white/[0.08] mx-auto" />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
