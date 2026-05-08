"use client";
import { useLang } from "@/context/LangContext";
import { Fragment, useEffect, useRef } from "react";

const STATS = [
  { prefix: "R$", count: 1.4, suffix: "B+", labelKey: "stat1_label" },
  { count: 12, labelKey: "stat2_label" },
  { count: 3, suffix: "ª", labelKey: "stat3_label" },
];

export default function StatsSection() {
  const sectionRef = useRef(null);
  const { t } = useLang();

  useEffect(() => {
    let ctx;
    const run = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.utils.toArray(".stat-item").forEach((item, i) => {
          const numEl = item.querySelector(".stat-num[data-count]");
          const target = parseFloat(numEl?.dataset.count || "0");

          gsap.fromTo(
            item,
            { y: 44, opacity: 0, scale: 0.94 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.9,
              ease: "power4.out",
              delay: i * 0.12,
              scrollTrigger: { trigger: item, start: "top 75%", once: true },
            },
          );

          if (numEl) {
            const isDecimal = target % 1 !== 0;
            const obj = { val: 0 };
            gsap.to(obj, {
              val: target,
              duration: 1.8,
              ease: "power2.out",
              scrollTrigger: { trigger: item, start: "top 75%", once: true },
              onUpdate: () => {
                numEl.textContent = isDecimal
                  ? obj.val.toFixed(1)
                  : Math.round(obj.val);
              },
            });
          }
        });
      }, sectionRef);
    };
    run();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="reveal-section section-alt-a py-20"
    >
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)]">
        <div className="bg-ink rounded-2xl p-8 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-0">
          {STATS.map((s, i) => (
            <Fragment key={s.labelKey}>
              <div className="stat-item text-center py-5 px-5">
                <div className="flex items-baseline justify-center gap-1 mb-3">
                  {s.prefix && (
                    <span
                      className="font-display text-white font-semibold"
                      style={{ fontSize: "clamp(20px,2.5vw,28px)" }}
                    >
                      {s.prefix}
                    </span>
                  )}
                  <span
                    className="stat-num font-display text-white font-bold leading-none tracking-tight"
                    style={{ fontSize: "clamp(52px,7vw,88px)" }}
                    data-count={s.count}
                  >
                    0
                  </span>
                  {s.suffix && (
                    <span
                      className="font-display text-white font-semibold"
                      style={{ fontSize: "clamp(28px,3.5vw,44px)" }}
                    >
                      {s.suffix}
                    </span>
                  )}
                </div>
                <p className="text-xs tracking-wide text-white leading-snug max-w-[180px] mx-auto">
                  {t(s.labelKey)}
                </p>
              </div>
              {i < STATS.length - 1 && (
                <div className="hidden md:block w-px h-20 bg-white/[0.06] mx-auto" />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
