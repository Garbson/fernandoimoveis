import { useLang } from "@/context/LangContext";
import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";

const WA = "https://wa.me/554797518960";

function WaveWords({ text, className = "" }) {
  return (
    <>
      {String(text)
        .split(" ")
        .map((word, i) => (
          <span
            key={i}
            className={`wave-word inline-block ${className}`}
            style={{ marginRight: "0.28em" }}
          >
            {word}
          </span>
        ))}
    </>
  );
}

export default function HeroSection() {
  const sectionRef = useRef(null);
  const { t } = useLang();

  useEffect(() => {
    let ctx;

    const run = async () => {
      const { gsap } = await getGsap();

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.2 });

        tl.fromTo(
          ".hero-eyebrow",
          { y: 20, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.6, ease: "power4.out" },
          0,
        )
          .fromTo(
            ".wave-word",
            { y: 80, autoAlpha: 0, rotateZ: -3 },
            {
              y: 0,
              autoAlpha: 1,
              rotateZ: 0,
              duration: 0.65,
              stagger: { each: 0.05, ease: "power1.inOut" },
              ease: "back.out(1.6)",
            },
            0.25,
          )
          .fromTo(
            ".hero-desc",
            { y: 22, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.7, ease: "power4.out" },
            0.85,
          )
          .fromTo(
            ".hero-divider",
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.8,
              ease: "power3.inOut",
              transformOrigin: "left",
            },
            0.9,
          )
          .fromTo(
            ".hero-stat",
            { y: 18, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.55,
              stagger: 0.12,
              ease: "back.out(1.5)",
            },
            1.0,
          )
          .fromTo(
            ".hero-action",
            { y: 18, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.55,
              stagger: 0.1,
              ease: "back.out(1.4)",
            },
            1.1,
          )
          .fromTo(
            ".hero-trust-item",
            { x: -14, autoAlpha: 0 },
            {
              x: 0,
              autoAlpha: 1,
              duration: 0.45,
              stagger: 0.08,
              ease: "power3.out",
            },
            1.25,
          )
          .fromTo(".hero-scroll-hint", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 }, 1.5);

        gsap.fromTo(
          ".hero-count-12",
          { textContent: 0 },
          {
            textContent: 12,
            duration: 1.4,
            ease: "power2.out",
            snap: { textContent: 1 },
            delay: 1.1,
          },
        );
        gsap.fromTo(
          ".hero-count-150",
          { textContent: 0 },
          {
            textContent: 150,
            duration: 1.4,
            ease: "power2.out",
            snap: { textContent: 1 },
            delay: 1.2,
          },
        );

        // Parallax Effect
        gsap.to(".hero-bg", {
          yPercent: 30,
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(".hero-content", {
          yPercent: 40,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

      }, sectionRef);
    };

    run();
    return () => ctx?.revert();
  }, []);

  const scrollTo = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-[120px] pb-24 text-center"
    >
      <div className="hero-bg absolute inset-[-10%] z-0">
        <div className="absolute inset-0 bg-[url(/images/portoBelloMobile.jpg)] sm:bg-[url(/images/porto-belo-baixio.webp)] bg-cover bg-center" />
      </div>
      <div className="absolute inset-0 bg-black/15 backdrop-blur-[2px] z-0" />
      
      <div className="hero-content max-w-[860px] mx-auto px-[clamp(20px,5vw,60px)] relative z-10 w-full">
        <p className="hero-eyebrow inline-flex items-center gap-2.5 text-[11px] font-medium tracking-[0.28em] uppercase text-white mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0 animate-pulse-dot" />
          {t("hero_eyebrow")}
        </p>

        <h1
          className="font-display text-ink font-bold leading-[1.06] tracking-tight mb-8"
          style={{ fontSize: "clamp(40px,6vw,80px)" }}
        >
          <span className="block pb-1">
            <WaveWords text={t("hero_title_1")} className=" shimmer-text" />
          </span>
          <span className="block pb-1">
            <WaveWords text={t("hero_title_2")} className=" shimmer-text" />
          </span>
          <span className="block pb-1">
            <WaveWords text={t("hero_title_3")} className=" shimmer-text" />
          </span>
        </h1>
      </div>

      <div className="hero-scroll-hint absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-text-3 text-[9px] tracking-[0.3em] uppercase z-10">
        <div className="animate-scroll-ln w-px h-12 bg-gradient-to-b from-transparent to-gold/40" />
        {t("hero_scroll")}
      </div>
    </section>
  );
}
