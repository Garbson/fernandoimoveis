'use client';
import { useEffect } from 'react';

export default function SunsetLayer() {
  useEffect(() => {
    const run = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const st = {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2,
      };

      /* Sol e halos descem até o horizonte */
      gsap.to(['#bg-sun', '#bg-sun-s', '#bg-glow-day', '#bg-glow-set'], {
        attr: { cy: 648 },
        scrollTrigger: st,
      });

      /* Céu do pôr do sol aparece */
      gsap.to('#bg-sky-s', { opacity: 1, scrollTrigger: st });

      /* Sol vira vermelho */
      gsap.to('#bg-sun-s', { opacity: 1, scrollTrigger: st });

      /* Halo vermelho aparece */
      gsap.to('#bg-glow-set', { opacity: 1, scrollTrigger: st });

      /* Brilho no horizonte */
      gsap.to('#bg-horiz', { opacity: 1, scrollTrigger: st });

      /* Serras ficam avermelhadas */
      gsap.to('#bg-hills-s', { opacity: 0.8, scrollTrigger: st });

      /* Mar vira espelho */
      gsap.to('#bg-sea-s', { opacity: 0.9, scrollTrigger: st });

      /* Reflexo cresce */
      gsap.to('#bg-refl', {
        attr: { ry: 170, rx: 34, cy: 615 },
        opacity: 0.75,
        scrollTrigger: st,
      });

      /* Praia avermelhada */
      gsap.to('#bg-beach-s', { opacity: 0.65, scrollTrigger: st });

      /* Escurecimento noturno */
      gsap.to('#bg-dusk', { opacity: 0.5, scrollTrigger: st });
    };

    run();
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none select-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Céu base — verde médio (mais visível que preto) */}
          <linearGradient id="bg-sky-base" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#0d1f10" />
            <stop offset="45%"  stopColor="#173520" />
            <stop offset="100%" stopColor="#1e4828" />
          </linearGradient>

          {/* Céu pôr do sol — bem saturado */}
          <linearGradient id="bg-sky-sunset" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#180806" />
            <stop offset="22%"  stopColor="#6b1a08" />
            <stop offset="58%"  stopColor="#c43010" />
            <stop offset="100%" stopColor="#f04820" />
          </linearGradient>

          {/* Mar base — teal visível */}
          <linearGradient id="bg-sea-base" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#0e2a2a" />
            <stop offset="100%" stopColor="#071414" />
          </linearGradient>

          {/* Mar espelho pôr do sol — laranja intenso */}
          <linearGradient id="bg-sea-sunset" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#e03810" stopOpacity="0.75" />
            <stop offset="40%"  stopColor="#801808" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#180804" stopOpacity="0" />
          </linearGradient>

          {/* Halo do sol dia */}
          <radialGradient id="bg-glow-day-g" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#E8B870" stopOpacity="0.7" />
            <stop offset="40%"  stopColor="#C4975A" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#C4975A" stopOpacity="0" />
          </radialGradient>

          {/* Halo pôr do sol */}
          <radialGradient id="bg-glow-set-g" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#ff4010" stopOpacity="0.85" />
            <stop offset="40%"  stopColor="#e02808" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#e02808" stopOpacity="0" />
          </radialGradient>

          {/* Reflexo do sol no mar */}
          <linearGradient id="bg-refl-g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#F0B060" stopOpacity="0.8" />
            <stop offset="60%"  stopColor="#C4975A" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#C4975A" stopOpacity="0" />
          </linearGradient>

          {/* Brilho horizonte */}
          <radialGradient id="bg-horiz-g" cx="50%" cy="100%" r="60%">
            <stop offset="0%"   stopColor="#f04010" stopOpacity="0.85" />
            <stop offset="50%"  stopColor="#c03010" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#c03010" stopOpacity="0" />
          </radialGradient>

          {/* Vinheta suave (reduzida para não esconder SVG) */}
          <radialGradient id="bg-vignette" cx="50%" cy="44%" r="72%">
            <stop offset="30%"  stopColor="transparent" />
            <stop offset="100%" stopColor="#030803" stopOpacity="0.55" />
          </radialGradient>

          {/* Blur para halos */}
          <filter id="bg-blur32" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="32" />
          </filter>
        </defs>

        {/* ── Céu base (verde médio, sempre visível) ── */}
        <rect width="1440" height="900" fill="url(#bg-sky-base)" />

        {/* ── Pôr do sol (opacity 0 → 1) ── */}
        <rect id="bg-sky-s" width="1440" height="900" fill="url(#bg-sky-sunset)" opacity="0" />

        {/* ── Halo dia (grande, dourado) ── */}
        <circle id="bg-glow-day" cx="720" cy="108" r="240"
          fill="url(#bg-glow-day-g)" filter="url(#bg-blur32)" />

        {/* ── Halo pôr (vermelho, opacity 0 → 1) ── */}
        <circle id="bg-glow-set" cx="720" cy="108" r="220"
          fill="url(#bg-glow-set-g)" filter="url(#bg-blur32)" opacity="0" />

        {/* ── Sol dourado ── */}
        <circle id="bg-sun" cx="720" cy="108" r="58" fill="#E8B060" />

        {/* ── Sol vermelho (aparece no scroll) ── */}
        <circle id="bg-sun-s" cx="720" cy="108" r="58" fill="#e83810" opacity="0" />

        {/* Brilho interno */}
        <ellipse cx="705" cy="92" rx="18" ry="12" fill="#FDE08A" opacity="0.45" />

        {/* ── Brilho horizonte (opacity 0 → 1) ── */}
        <ellipse id="bg-horiz" cx="720" cy="592" rx="640" ry="110"
          fill="url(#bg-horiz-g)" opacity="0" />

        {/* ── Serras base ── */}
        <path
          d="M0,548 Q90,505 215,532 Q310,500 450,528
             Q540,506 650,525 Q720,512 845,528
             Q956,506 1078,532 Q1200,506 1325,530
             Q1398,516 1440,532 L1440,596 L0,596 Z"
          fill="#0a1510"
          opacity="0.96"
        />

        {/* Serras avermelhadas no pôr (opacity 0 → 0.8) */}
        <path
          id="bg-hills-s"
          d="M0,548 Q90,505 215,532 Q310,500 450,528
             Q540,506 650,525 Q720,512 845,528
             Q956,506 1078,532 Q1200,506 1325,530
             Q1398,516 1440,532 L1440,596 L0,596 Z"
          fill="#c02808"
          opacity="0"
        />

        {/* ── Linha horizonte ── */}
        <line x1="0" y1="592" x2="1440" y2="592"
          stroke="#E8B060" strokeWidth="1" opacity="0.2" />

        {/* ── Mar base (teal) ── */}
        <rect x="0" y="592" width="1440" height="308" fill="url(#bg-sea-base)" />

        {/* ── Espelho laranja (opacity 0 → 0.9) ── */}
        <rect id="bg-sea-s" x="0" y="592" width="1440" height="308"
          fill="url(#bg-sea-sunset)" opacity="0" />

        {/* ── Reflexo do sol ── */}
        <ellipse id="bg-refl" cx="720" cy="660" rx="16" ry="68"
          fill="url(#bg-refl-g)" opacity="0.12" />

        {/* ── Ondas ── */}
        <g stroke="#2a5a50" strokeWidth="0.8" fill="none" opacity="0.3">
          <path d="M0,622 Q240,615 480,622 Q720,629 960,622 Q1200,615 1440,622" />
          <path d="M0,646 Q240,639 480,646 Q720,653 960,646 Q1200,639 1440,646" />
          <path d="M0,670 Q240,663 480,670 Q720,677 960,670 Q1200,663 1440,670" />
          <path d="M0,694 Q240,687 480,694 Q720,701 960,694 Q1200,687 1440,694" />
          <path d="M0,718 Q240,711 480,718 Q720,725 960,718 Q1200,711 1440,718" />
          <path d="M0,742 Q240,735 480,742 Q720,749 960,742 Q1200,735 1440,742" />
        </g>

        {/* ── Praia base ── */}
        <path
          d="M0,832 Q200,816 400,828 Q600,840 800,822
             Q1000,806 1200,822 Q1340,832 1440,818 L1440,900 L0,900 Z"
          fill="#22180c"
          opacity="0.78"
        />

        {/* Praia avermelhada (opacity 0 → 0.65) */}
        <path
          id="bg-beach-s"
          d="M0,832 Q200,816 400,828 Q600,840 800,822
             Q1000,806 1200,822 Q1340,832 1440,818 L1440,900 L0,900 Z"
          fill="#a82c0a"
          opacity="0"
        />

        {/* ── Noite chegando (opacity 0 → 0.5) ── */}
        <rect id="bg-dusk" width="1440" height="900" fill="#020504" opacity="0" />

        {/* ── Vinheta suave ── */}
        <rect width="1440" height="900" fill="url(#bg-vignette)" />
      </svg>
    </div>
  );
}
