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
        scrub: 2.5,
      };

      // Sol desce do topo até além do horizonte
      gsap.to(['#bg-sun', '#bg-sun-s', '#bg-glow-day', '#bg-glow-set'], {
        attr: { cy: 650 },
        scrollTrigger: st,
      });

      // Céu do pôr do sol aparece
      gsap.to('#bg-sky-s', { opacity: 0.96, scrollTrigger: st });

      // Sol vira laranja/vermelho
      gsap.to('#bg-sun-s', { opacity: 1, scrollTrigger: st });

      // Halo do pôr do sol aparece
      gsap.to('#bg-glow-set', { opacity: 0.92, scrollTrigger: st });

      // Brilho no horizonte
      gsap.to('#bg-horiz', { opacity: 1, scrollTrigger: st });

      // Serras/morros ficam avermelhados
      gsap.to('#bg-hills-s', { opacity: 0.7, scrollTrigger: st });

      // Mar vira espelho do pôr do sol
      gsap.to('#bg-sea-s', { opacity: 0.78, scrollTrigger: st });

      // Reflexo do sol cresce no mar
      gsap.to('#bg-refl', {
        attr: { ry: 160, rx: 30, cy: 618 },
        opacity: 0.68,
        scrollTrigger: st,
      });

      // Praia fica avermelhada
      gsap.to('#bg-beach-s', { opacity: 0.55, scrollTrigger: st });

      // Escurecimento final (noite chegando)
      gsap.to('#bg-dusk', { opacity: 0.55, scrollTrigger: st });
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
          {/* Céu base — verde escuro da marca */}
          <linearGradient id="bg-sky-base" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#060c06" />
            <stop offset="50%"  stopColor="#0e1b0e" />
            <stop offset="100%" stopColor="#132613" />
          </linearGradient>

          {/* Céu pôr do sol — laranja/vermelho profundo */}
          <linearGradient id="bg-sky-sunset" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#0b0302" />
            <stop offset="28%"  stopColor="#3e0f06" />
            <stop offset="65%"  stopColor="#9a2510" />
            <stop offset="100%" stopColor="#cc3c10" />
          </linearGradient>

          {/* Mar base */}
          <linearGradient id="bg-sea-base" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#0c1d1d" />
            <stop offset="100%" stopColor="#060e0e" />
          </linearGradient>

          {/* Mar espelho do pôr do sol */}
          <linearGradient id="bg-sea-sunset" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#b02e0e" stopOpacity="0.65" />
            <stop offset="45%"  stopColor="#581508" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0c0804" stopOpacity="0" />
          </linearGradient>

          {/* Halo do sol (dia) */}
          <radialGradient id="bg-glow-day-g" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#C4975A" stopOpacity="0.52" />
            <stop offset="48%"  stopColor="#C4975A" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#C4975A" stopOpacity="0" />
          </radialGradient>

          {/* Halo do sol (pôr do sol) */}
          <radialGradient id="bg-glow-set-g" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#e02c0a" stopOpacity="0.68" />
            <stop offset="48%"  stopColor="#e02c0a" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#e02c0a" stopOpacity="0" />
          </radialGradient>

          {/* Reflexo do sol no mar */}
          <linearGradient id="bg-refl-g" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#C4975A" stopOpacity="0.62" />
            <stop offset="100%" stopColor="#C4975A" stopOpacity="0" />
          </linearGradient>

          {/* Brilho horizonte */}
          <radialGradient id="bg-horiz-g" cx="50%" cy="100%" r="58%">
            <stop offset="0%"   stopColor="#d83c0e" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#d83c0e" stopOpacity="0" />
          </radialGradient>

          {/* Vinheta de borda */}
          <radialGradient id="bg-vignette" cx="50%" cy="44%" r="70%">
            <stop offset="22%"  stopColor="transparent" />
            <stop offset="100%" stopColor="#030603" stopOpacity="0.82" />
          </radialGradient>

          {/* Filtros de blur para halos */}
          <filter id="bg-blur28" x="-70%" y="-70%" width="240%" height="240%">
            <feGaussianBlur stdDeviation="28" />
          </filter>
          <filter id="bg-blur14" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>

        {/* ── Céu base ── */}
        <rect width="1440" height="900" fill="url(#bg-sky-base)" />

        {/* ── Overlay pôr do sol (opacity 0 → 0.96 no scroll) ── */}
        <rect id="bg-sky-s" width="1440" height="900" fill="url(#bg-sky-sunset)" opacity="0" />

        {/* ── Halo do sol dia (blur grande) ── */}
        <circle id="bg-glow-day" cx="720" cy="108" r="210"
          fill="url(#bg-glow-day-g)" filter="url(#bg-blur28)" />

        {/* ── Halo do sol pôr (opacity 0 → 0.92) ── */}
        <circle id="bg-glow-set" cx="720" cy="108" r="190"
          fill="url(#bg-glow-set-g)" filter="url(#bg-blur28)" opacity="0" />

        {/* ── Corpo do sol (dourado) ── */}
        <circle id="bg-sun" cx="720" cy="108" r="54" fill="#C4975A" />

        {/* ── Sol pôr do sol (vermelho, opacity 0 → 1) ── */}
        <circle id="bg-sun-s" cx="720" cy="108" r="54" fill="#d0340c" opacity="0" />

        {/* Brilho interno do sol */}
        <circle cx="704" cy="94" r="14" fill="#F0C87A" opacity="0.30" />

        {/* ── Brilho no horizonte (opacity 0 → 1) ── */}
        <ellipse id="bg-horiz" cx="720" cy="592" rx="600" ry="98"
          fill="url(#bg-horiz-g)" opacity="0" />

        {/* ── Serras silhueta base ── */}
        <path
          d="M0,548 Q85,510 208,535 Q305,505 445,530
             Q535,510 648,527 Q720,514 842,530
             Q952,510 1075,534 Q1198,510 1323,532
             Q1396,518 1440,534
             L1440,596 L0,596 Z"
          fill="#090e09"
          opacity="0.94"
        />

        {/* Serras pôr do sol (opacity 0 → 0.7) */}
        <path
          id="bg-hills-s"
          d="M0,548 Q85,510 208,535 Q305,505 445,530
             Q535,510 648,527 Q720,514 842,530
             Q952,510 1075,534 Q1198,510 1323,532
             Q1396,518 1440,534
             L1440,596 L0,596 Z"
          fill="#7a1e0a"
          opacity="0"
        />

        {/* ── Linha do horizonte ── */}
        <line x1="0" y1="592" x2="1440" y2="592"
          stroke="#C4975A" strokeWidth="0.7" opacity="0.14" />

        {/* ── Mar base ── */}
        <rect x="0" y="592" width="1440" height="308" fill="url(#bg-sea-base)" />

        {/* ── Espelho do pôr do sol no mar (opacity 0 → 0.78) ── */}
        <rect id="bg-sea-s" x="0" y="592" width="1440" height="308"
          fill="url(#bg-sea-sunset)" opacity="0" />

        {/* ── Reflexo do sol (cresce no scroll) ── */}
        <ellipse id="bg-refl" cx="720" cy="658" rx="16" ry="72"
          fill="url(#bg-refl-g)" opacity="0.14" />

        {/* ── Ondas ── */}
        <g id="bg-waves" stroke="#1a3d3d" strokeWidth="0.7" fill="none" opacity="0.22">
          <path d="M0,624 Q240,617 480,624 Q720,631 960,624 Q1200,617 1440,624" />
          <path d="M0,648 Q240,641 480,648 Q720,655 960,648 Q1200,641 1440,648" />
          <path d="M0,672 Q240,665 480,672 Q720,679 960,672 Q1200,665 1440,672" />
          <path d="M0,696 Q240,689 480,696 Q720,703 960,696 Q1200,689 1440,696" />
          <path d="M0,720 Q240,713 480,720 Q720,727 960,720 Q1200,713 1440,720" />
          <path d="M0,744 Q240,737 480,744 Q720,751 960,744 Q1200,737 1440,744" />
        </g>

        {/* ── Praia base ── */}
        <path
          d="M0,834 Q200,818 400,830 Q600,840 800,824
             Q1000,808 1200,824 Q1340,834 1440,820
             L1440,900 L0,900 Z"
          fill="#18120a"
          opacity="0.72"
        />

        {/* Praia pôr do sol (opacity 0 → 0.55) */}
        <path
          id="bg-beach-s"
          d="M0,834 Q200,818 400,830 Q600,840 800,824
             Q1000,808 1200,824 Q1340,834 1440,820
             L1440,900 L0,900 Z"
          fill="#882610"
          opacity="0"
        />

        {/* ── Escurecimento de noite (opacity 0 → 0.55) ── */}
        <rect id="bg-dusk" width="1440" height="900" fill="#020402" opacity="0" />

        {/* ── Vinheta de borda ── */}
        <rect width="1440" height="900" fill="url(#bg-vignette)" />
      </svg>
    </div>
  );
}
