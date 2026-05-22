import { useLang } from "@/context/LangContext";
import { useEffect, useRef, useState } from "react";
import { getGsap } from "@/lib/gsap";

const PHOTOS = [
  { src: "/images/porto-belo-praia.webp", pos: "center 48%" },
  { src: "/images/porto-belo-ilha.webp", pos: "center 52%" },
  { src: "/images/porto-belo-pereque.webp", pos: "center 46%" },
  { src: "/images/porto-belo-baixio.webp", pos: "center 50%" },
];

function mobileDeckTransform(offset, distance) {
  if (offset === 0) return "translate(-50%,-50%) scale(1) rotate(0deg)";
  const depth = 5 + (distance - 1) * 5;
  const shrink = 1 - distance * 0.09;
  const tilt = offset > 0 ? 2.5 : -2.5;
  return `translate(-50%,-50%) translateY(${depth}%) scale(${shrink}) rotate(${tilt}deg)`;
}

function desktopFanTransform(offset, distance) {
  if (offset === 0) return "translate(-50%,-50%) scale(1) rotateY(0deg)";
  const shift = offset * 46;
  const shrink = 1 - distance * 0.18;
  return `translate(-50%,-50%) translateX(${shift}%) scale(${shrink}) rotateY(${offset * -18}deg)`;
}

export default function PortoBeloSection() {
  const sectionRef = useRef(null);
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  useEffect(() => {
    let ctx;
    const run = async () => {
      const { gsap } = await getGsap();
      ctx = gsap.context(() => {
        gsap.from(".porto-head > *", {
          y: 26,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            once: true,
            invalidateOnRefresh: true,
          },
        });
        gsap.from(".porto-stage", {
          y: 26,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".porto-stage",
            start: "top 60%",
            once: true,
            invalidateOnRefresh: true,
          },
        });
        gsap.from(".porto-invest > *", {
          y: 24,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".porto-invest",
            start: "top 60%",
            once: true,
          },
        });
      }, sectionRef);
    };
    run();
    return () => ctx?.revert();
  }, []);

  useEffect(() => {
    const timer = setInterval(
      () => setActive((prev) => (prev + 1) % PHOTOS.length),
      3200,
    );
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const goTo = (idx) => setActive((idx + PHOTOS.length) % PHOTOS.length);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 45)
      goTo(active + (dx > 0 ? 1 : -1));
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <section
      id="porto-belo"
      ref={sectionRef}
      className="reveal-section section-alt-b py-[clamp(80px,10vw,140px)] overflow-x-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)]">
        <div className="porto-head text-center mb-12">
          <p className="section-tag inline-flex items-center gap-2.5 text-[11px] font-medium tracking-[0.2em] uppercase text-gold mb-5">
            {t("porto_tag")}
          </p>
          <h2
            className="font-display font-semibold leading-[1.12] tracking-tight text-ink mb-4"
            style={{ fontSize: "clamp(32px,4.4vw,52px)" }}
          >
            {t("porto_title")}
          </h2>
          <p className="text-base leading-relaxed text-text-2 max-w-[760px] mx-auto">
            {t("porto_subtitle")}
          </p>
        </div>

        <div
          className="porto-stage relative h-[380px] sm:h-[360px] md:h-[430px] w-full mb-9 [perspective:1400px] overflow-visible"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="sm:hidden absolute top-0 left-1/2 -translate-x-1/2 -translate-y-7 flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-text-3 pointer-events-none select-none">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="-scale-x-100"
            >
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            <span>deslize</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>

          {PHOTOS.map(({ src, pos }, i) => {
            let offset = i - active;
            if (offset > PHOTOS.length / 2) offset -= PHOTOS.length;
            if (offset < -PHOTOS.length / 2) offset += PHOTOS.length;
            const distance = Math.abs(offset);

            return (
              <div
                key={src}
                className="absolute top-1/2 left-1/2 w-[88%] sm:w-[74%] md:w-[62%] h-[80%] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transform: isMobile
                    ? mobileDeckTransform(offset, distance)
                    : desktopFanTransform(offset, distance),
                  opacity:
                    distance > 2
                      ? 0
                      : isMobile
                        ? 1 - distance * 0.2
                        : 1 - distance * 0.28,
                  zIndex: 20 - distance,
                  filter: `saturate(${1 - distance * 0.2}) brightness(${1 - distance * 0.1})`,
                }}
              >
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  className="w-full h-full relative rounded-2xl overflow-hidden border border-white/40 shadow-[0_14px_34px_rgba(0,0,0,.12)] animate-float-slow"
                  style={{ animationDelay: `${i * 0.5}s` }}
                  aria-label={t(`porto_alt_${i + 1}`)}
                >
                  <img
                    src={src}
                    alt={t(`porto_alt_${i + 1}`)}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ objectPosition: pos }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                  <span className="absolute left-4 bottom-3 text-[11px] sm:text-xs tracking-[0.12em] uppercase text-white/85">
                    {t(`porto_alt_${i + 1}`)}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-2 mb-10">
          {PHOTOS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all ${i === active ? "w-8 bg-gold" : "w-3 bg-ink/15 hover:bg-ink/30"}`}
              aria-label={`foto ${i + 1}`}
            />
          ))}
        </div>

        <div className="porto-invest max-w-[980px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {["porto_inv_1", "porto_inv_2", "porto_inv_3"].map((k) => (
            <div key={k} className="glass glass-hover rounded-xl px-5 py-4">
              <p className="text-sm text-text-2 leading-relaxed">{t(k)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
