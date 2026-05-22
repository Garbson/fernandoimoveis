import { useLang } from "@/context/LangContext";
import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";
import { PinIcon, WaIcon } from "./Icons";

const WA = "https://wa.me/554797518960";

export default function AboutSection() {
  const sectionRef = useRef(null);
  const { t } = useLang();

  useEffect(() => {
    let ctx;
    const run = async () => {
      const { gsap } = await getGsap();
      ctx = gsap.context(() => {
        gsap.fromTo(
          ".about-photo",
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.4,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              once: true,
            },
          }
        );
        gsap.fromTo(
          ".sobre-img",
          { scale: 1.4 },
          {
            scale: 1,
            duration: 1.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              once: true,
            },
          }
        );
        gsap.fromTo(".about-text > *",
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.13,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              once: true,
              invalidateOnRefresh: true,
            },
          }
        );
      }, sectionRef);
    };
    run();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="reveal-section section-alt-b py-[clamp(80px,10vw,140px)]"
    >
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(40px,7vw,100px)] items-center max-w-[580px] lg:max-w-none mx-auto">
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              <div className="about-photo relative overflow-hidden rounded-2xl w-full aspect-[3/4]">
                <img
                  src="/images/fp-chair.jpg"
                  alt="Fernando Pegoraro"
                  className="sobre-img w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <div className="hidden sm:block absolute top-5 left-[-20px] right-5 bottom-[-20px] border border-gold/15 rounded-2xl pointer-events-none -z-10" />
              <div className="hidden sm:block absolute -top-4 -left-4 w-24 h-24 rounded-full bg-gold/10 blur-[40px] pointer-events-none" />
              <div className="absolute bottom-[-20px] right-0 sm:right-[-10px] bg-ink text-white text-xs tracking-wide px-[18px] py-3 rounded-lg flex items-center gap-2 shadow-[0_8px_32px_rgba(15,25,35,.2)] z-10">
                <PinIcon size={14} />
                {t("about_regions")}
              </div>
            </div>
          </div>

          <div className="about-text order-1 lg:order-2 flex flex-col gap-0">
            <p className="section-tag flex items-center gap-2.5 text-[11px] font-medium tracking-[0.2em] uppercase text-gold mb-5">
              {t("about_tag")}
            </p>
            <h2
              className="font-display font-semibold leading-[1.12] tracking-tight text-ink mb-7"
              style={{ fontSize: "clamp(32px,4.5vw,52px)" }}
            >
              {t("about_title")}
            </h2>
            {["about_p1", "about_p2", "about_p3"].map((k) => (
              <p
                key={k}
                className="text-[15px] leading-[1.75] text-text-2 mb-4 last-of-type:mb-9"
              >
                {t(k)}
              </p>
            ))}
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 self-start bg-green-700 text-white text-sm font-medium tracking-wide px-7 py-3.5 rounded-xl transition-all hover:bg-green-800 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(15,25,35,.2)]"
            >
              <WaIcon size={18} />
              {t("about_cta")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
