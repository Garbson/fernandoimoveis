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

      /* Prédios ficam avermelhados */
      gsap.to('#bg-bldg-s', { opacity: 0.7, scrollTrigger: st });

      /* Mar vira espelho */
      gsap.to('#bg-sea-s', { opacity: 0.9, scrollTrigger: st });

      /* Praia avermelhada */
      gsap.to('#bg-beach-s', { opacity: 0.65, scrollTrigger: st });

      /* Luzes da cidade acendem na noite */
      gsap.to('#bg-city-lights', {
        opacity: 1,
        scrollTrigger: {
          trigger: document.documentElement,
          start: '62% top',
          end: '88% top',
          scrub: 1,
        },
      });
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
          {/* Céu azul diurno */}
          <linearGradient id="bg-sky-base" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#0d2244" />
            <stop offset="40%"  stopColor="#1a5490" />
            <stop offset="100%" stopColor="#2878b8" />
          </linearGradient>

          {/* Céu pôr do sol */}
          <linearGradient id="bg-sky-sunset" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#180806" />
            <stop offset="22%"  stopColor="#6b1a08" />
            <stop offset="58%"  stopColor="#c43010" />
            <stop offset="100%" stopColor="#f04820" />
          </linearGradient>

          {/* Mar base */}
          <linearGradient id="bg-sea-base" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#0e2e40" />
            <stop offset="100%" stopColor="#071820" />
          </linearGradient>

          {/* Mar espelho pôr do sol */}
          <linearGradient id="bg-sea-sunset" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#e03810" stopOpacity="0.75" />
            <stop offset="40%"  stopColor="#801808" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#180804" stopOpacity="0" />
          </linearGradient>

          {/* Halo do sol dia */}
          <radialGradient id="bg-glow-day-g" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#E8D080" stopOpacity="0.8" />
            <stop offset="40%"  stopColor="#C4A840" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#C4A840" stopOpacity="0" />
          </radialGradient>

          {/* Halo pôr do sol */}
          <radialGradient id="bg-glow-set-g" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#ff4010" stopOpacity="0.9" />
            <stop offset="40%"  stopColor="#e02808" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#e02808" stopOpacity="0" />
          </radialGradient>

          {/* Brilho horizonte */}
          <radialGradient id="bg-horiz-g" cx="50%" cy="100%" r="60%">
            <stop offset="0%"   stopColor="#f04010" stopOpacity="0.9" />
            <stop offset="50%"  stopColor="#c03010" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#c03010" stopOpacity="0" />
          </radialGradient>

          {/* Blur para halos */}
          <filter id="bg-blur32" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="32" />
          </filter>
        </defs>

        {/* ── Céu azul base ── */}
        <rect width="1440" height="900" fill="url(#bg-sky-base)" />

        {/* ── Pôr do sol (opacity 0 → 1) ── */}
        <rect id="bg-sky-s" width="1440" height="900" fill="url(#bg-sky-sunset)" opacity="0" />

        {/* ── Halo dia ── */}
        <circle id="bg-glow-day" cx="720" cy="100" r="280"
          fill="url(#bg-glow-day-g)" filter="url(#bg-blur32)" />

        {/* ── Halo pôr ── */}
        <circle id="bg-glow-set" cx="720" cy="100" r="260"
          fill="url(#bg-glow-set-g)" filter="url(#bg-blur32)" opacity="0" />

        {/* ── Sol amarelo ── */}
        <circle id="bg-sun" cx="720" cy="100" r="62" fill="#F5D060" />

        {/* ── Sol vermelho ── */}
        <circle id="bg-sun-s" cx="720" cy="100" r="62" fill="#e83810" opacity="0" />

        {/* Brilho interno */}
        <ellipse cx="704" cy="84" rx="20" ry="13" fill="#FFF5B0" opacity="0.5" />

        {/* ── Brilho horizonte ── */}
        <ellipse id="bg-horiz" cx="720" cy="592" rx="660" ry="120"
          fill="url(#bg-horiz-g)" opacity="0" />

        {/* ════════════════════════════════════════
            SKYLINE — sem serras, bases em y=592
        ════════════════════════════════════════ */}
        <g id="bg-buildings" fill="#0b1820">

          {/* —— BORDA ESQUERDA —— */}
          <rect x="0"   y="545" width="22" height="47" />
          <rect x="24"  y="528" width="30" height="64" />
          <rect x="28"  y="512" width="12" height="16" />
          <rect x="56"  y="498" width="26" height="94" />
          <rect x="60"  y="480" width="18" height="18" />
          <rect x="84"  y="510" width="20" height="82" />
          <rect x="106" y="488" width="34" height="104" />
          <rect x="112" y="472" width="14" height="16" />
          <rect x="142" y="472" width="28" height="120" />
          <rect x="146" y="454" width="20" height="18" />
          <rect x="172" y="482" width="24" height="110" />
          <rect x="198" y="460" width="32" height="132" />
          <rect x="204" y="442" width="12" height="18" />
          <rect x="232" y="478" width="22" height="114" />
          <rect x="256" y="465" width="36" height="127" />
          <rect x="262" y="446" width="24" height="19" />
          <rect x="294" y="490" width="20" height="102" />
          <rect x="316" y="475" width="28" height="117" />
          <rect x="346" y="505" width="18" height="87" />
          <rect x="366" y="488" width="32" height="104" />
          <rect x="372" y="470" width="20" height="18" />
          <rect x="400" y="510" width="24" height="82" />
          <rect x="426" y="494" width="18" height="98" />

          {/* —— CLUSTER CENTRAL — SKYLINE PRINCIPAL —— */}
          <rect x="464" y="510" width="22" height="82" />
          <rect x="488" y="492" width="28" height="100" />
          <rect x="518" y="474" width="26" height="118" />
          <rect x="522" y="456" width="18" height="18" />
          <rect x="546" y="455" width="30" height="137" />
          <rect x="550" y="436" width="22" height="19" />
          <rect x="578" y="440" width="28" height="152" />
          <rect x="582" y="420" width="20" height="20" />
          <rect x="608" y="422" width="32" height="170" />
          <rect x="614" y="402" width="20" height="20" />
          <rect x="642" y="404" width="30" height="188" />
          <rect x="646" y="384" width="22" height="20" />
          <rect x="674" y="385" width="28" height="207" />
          <rect x="678" y="364" width="20" height="21" />
          {/* TORRES CENTRAIS — as mais altas */}
          <rect x="704" y="310" width="38" height="282" />
          <rect x="711" y="288" width="24" height="22" />
          <rect x="719" y="272" width="10" height="16" /> {/* antena */}
          <rect x="744" y="322" width="34" height="270" />
          <rect x="750" y="300" width="22" height="22" />
          <rect x="780" y="336" width="36" height="256" />
          <rect x="786" y="315" width="24" height="21" />
          <rect x="818" y="350" width="30" height="242" />
          <rect x="822" y="330" width="22" height="20" />
          <rect x="850" y="365" width="34" height="227" />
          <rect x="856" y="346" width="22" height="19" />
          <rect x="886" y="382" width="28" height="210" />
          <rect x="916" y="400" width="32" height="192" />
          <rect x="920" y="380" width="24" height="20" />
          <rect x="950" y="418" width="26" height="174" />
          <rect x="978" y="436" width="30" height="156" />
          <rect x="1010" y="452" width="24" height="140" />

          {/* —— BORDA DIREITA —— */}
          <rect x="1036" y="465" width="28" height="127" />
          <rect x="1066" y="480" width="22" height="112" />
          <rect x="1090" y="462" width="32" height="130" />
          <rect x="1096" y="444" width="20" height="18" />
          <rect x="1124" y="475" width="26" height="117" />
          <rect x="1152" y="458" width="30" height="134" />
          <rect x="1158" y="440" width="18" height="18" />
          <rect x="1184" y="470" width="24" height="122" />
          <rect x="1210" y="455" width="32" height="137" />
          <rect x="1216" y="436" width="20" height="19" />
          <rect x="1244" y="468" width="26" height="124" />
          <rect x="1272" y="482" width="22" height="110" />
          <rect x="1296" y="494" width="30" height="98" />
          <rect x="1328" y="478" width="26" height="114" />
          <rect x="1332" y="460" width="18" height="18" />
          <rect x="1356" y="492" width="28" height="100" />
          <rect x="1386" y="508" width="22" height="84" />
          <rect x="1410" y="522" width="30" height="70" />
        </g>

        {/* ── Prédios tingidos de vermelho no pôr ── */}
        <use id="bg-bldg-s" href="#bg-buildings"
          fill="#c03010" opacity="0"
          style={{ mixBlendMode: 'multiply' }}
        />

        {/* ── Linha horizonte ── */}
        <line x1="0" y1="592" x2="1440" y2="592"
          stroke="#90C8E0" strokeWidth="0.8" opacity="0.25" />

        {/* ── Mar base ── */}
        <rect x="0" y="592" width="1440" height="308" fill="url(#bg-sea-base)" />

        {/* ── Espelho laranja ── */}
        <rect id="bg-sea-s" x="0" y="592" width="1440" height="308"
          fill="url(#bg-sea-sunset)" opacity="0" />

        {/* ── Ondas visíveis ── */}
        <g fill="none" opacity="0.55">
          <path d="M0,610 Q180,603 360,610 Q540,617 720,610 Q900,603 1080,610 Q1260,617 1440,610"
            stroke="#4aa0c0" strokeWidth="1.2"/>
          <path d="M0,626 Q180,619 360,626 Q540,633 720,626 Q900,619 1080,626 Q1260,633 1440,626"
            stroke="#3e90b0" strokeWidth="1"/>
          <path d="M0,644 Q240,637 480,644 Q720,651 960,644 Q1200,637 1440,644"
            stroke="#347a98" strokeWidth="1.2"/>
          <path d="M0,663 Q240,656 480,663 Q720,670 960,663 Q1200,656 1440,663"
            stroke="#2c6880" strokeWidth="1"/>
          <path d="M0,684 Q240,677 480,684 Q720,691 960,684 Q1200,677 1440,684"
            stroke="#245870" strokeWidth="1.2"/>
          <path d="M0,707 Q240,700 480,707 Q720,714 960,707 Q1200,700 1440,707"
            stroke="#1e4c60" strokeWidth="1"/>
          <path d="M0,733 Q240,726 480,733 Q720,740 960,733 Q1200,726 1440,733"
            stroke="#184050" strokeWidth="1.2"/>
          <path d="M0,762 Q240,755 480,762 Q720,769 960,762 Q1200,755 1440,762"
            stroke="#123440" strokeWidth="1"/>
        </g>

        {/* ── Praia arenosa ── */}
        <path
          d="M0,836 Q200,820 400,832 Q600,844 800,826
             Q1000,810 1200,826 Q1340,836 1440,822 L1440,900 L0,900 Z"
          fill="#c8a858"
          opacity="0.82"
        />
        {/* Faixa mais clara na beira da água */}
        <path
          d="M0,843 Q240,832 480,840 Q720,848 960,836 Q1200,824 1440,832 L1440,848 Q1200,838 960,850 Q720,862 480,854 Q240,846 0,857 Z"
          fill="#deba70"
          opacity="0.35"
        />

        {/* Praia dourada no pôr do sol */}
        <path
          id="bg-beach-s"
          d="M0,836 Q200,820 400,832 Q600,844 800,826
             Q1000,810 1200,826 Q1340,836 1440,822 L1440,900 L0,900 Z"
          fill="#d07830"
          opacity="0"
        />

        {/* ════════════════════════════════════════
            LUZES DA CIDADE
        ════════════════════════════════════════ */}
        <g id="bg-city-lights" opacity="0">
          {/* Borda esquerda */}
          <rect x="28"  y="534" width="4" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="36"  y="541" width="4" height="3" fill="#FFD580" opacity="0.8" />
          <rect x="60"  y="504" width="4" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="68"  y="512" width="4" height="3" fill="#FFD580" opacity="0.85" />
          <rect x="60"  y="520" width="4" height="3" fill="#FFA040" opacity="0.8" />
          <rect x="110" y="494" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="118" y="502" width="5" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="110" y="510" width="5" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="146" y="478" width="4" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="154" y="486" width="4" height="3" fill="#FFD580" opacity="0.8" />
          <rect x="146" y="494" width="4" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="146" y="502" width="4" height="3" fill="#FFD580" opacity="0.7" />
          <rect x="202" y="466" width="5" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="210" y="474" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="202" y="482" width="5" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="210" y="490" width="5" height="3" fill="#FFD580" opacity="0.75" />
          <rect x="260" y="471" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="268" y="479" width="5" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="260" y="487" width="5" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="268" y="495" width="5" height="3" fill="#FFD580" opacity="0.7" />
          <rect x="320" y="481" width="4" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="328" y="489" width="4" height="3" fill="#FFD580" opacity="0.8" />
          <rect x="370" y="476" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="378" y="484" width="5" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="370" y="492" width="5" height="3" fill="#FFA040" opacity="0.85" />

          {/* Cluster central */}
          <rect x="522" y="462" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="530" y="470" width="5" height="3" fill="#FFD580" opacity="0.8" />
          <rect x="522" y="478" width="5" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="552" y="442" width="5" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="560" y="450" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="552" y="458" width="5" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="552" y="466" width="5" height="3" fill="#FFD580" opacity="0.7" />
          <rect x="584" y="426" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="592" y="434" width="5" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="584" y="442" width="5" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="592" y="450" width="5" height="3" fill="#FFD580" opacity="0.8" />
          <rect x="614" y="408" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="622" y="416" width="5" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="614" y="424" width="5" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="622" y="432" width="5" height="3" fill="#FFD580" opacity="0.75" />
          <rect x="648" y="390" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="656" y="398" width="5" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="648" y="406" width="5" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="656" y="414" width="5" height="3" fill="#FFD580" opacity="0.8" />
          <rect x="648" y="422" width="5" height="3" fill="#FFD580" opacity="0.7" />
          <rect x="680" y="370" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="688" y="379" width="5" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="680" y="388" width="5" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="688" y="397" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="680" y="406" width="5" height="3" fill="#FFD580" opacity="0.75" />
          {/* Torres centrais — janelas densas */}
          <rect x="708" y="316" width="6" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="718" y="326" width="6" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="708" y="336" width="6" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="718" y="346" width="6" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="708" y="356" width="6" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="718" y="366" width="6" height="3" fill="#FFD580" opacity="0.8" />
          <rect x="708" y="376" width="6" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="718" y="386" width="6" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="708" y="396" width="6" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="718" y="406" width="6" height="3" fill="#FFD580" opacity="0.7" />
          <rect x="708" y="416" width="6" height="3" fill="#FFA040" opacity="0.8" />
          <rect x="750" y="328" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="758" y="337" width="5" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="750" y="346" width="5" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="758" y="355" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="750" y="364" width="5" height="3" fill="#FFD580" opacity="0.8" />
          <rect x="758" y="373" width="5" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="750" y="382" width="5" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="758" y="391" width="5" height="3" fill="#FFD580" opacity="0.7" />
          <rect x="750" y="400" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="786" y="342" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="794" y="350" width="5" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="786" y="358" width="5" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="794" y="366" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="786" y="374" width="5" height="3" fill="#FFD580" opacity="0.75" />
          <rect x="794" y="382" width="5" height="3" fill="#FFA040" opacity="0.8" />
          <rect x="824" y="356" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="832" y="364" width="5" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="824" y="372" width="5" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="832" y="380" width="5" height="3" fill="#FFD580" opacity="0.8" />
          <rect x="856" y="371" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="864" y="379" width="5" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="856" y="387" width="5" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="922" y="386" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="930" y="394" width="5" height="3" fill="#FFD580" opacity="0.8" />
          <rect x="922" y="402" width="5" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="984" y="442" width="4" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="992" y="450" width="4" height="3" fill="#FFD580" opacity="0.8" />

          {/* Borda direita */}
          <rect x="1096" y="450" width="4" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="1104" y="458" width="4" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="1096" y="466" width="4" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="1160" y="446" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="1168" y="454" width="5" height="3" fill="#FFD580" opacity="0.8" />
          <rect x="1160" y="462" width="5" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="1218" y="442" width="4" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="1226" y="450" width="4" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="1218" y="458" width="4" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="1218" y="466" width="4" height="3" fill="#FFD580" opacity="0.7" />
          <rect x="1248" y="474" width="4" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="1256" y="482" width="4" height="3" fill="#FFD580" opacity="0.8" />
          <rect x="1332" y="484" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="1340" y="492" width="5" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="1332" y="500" width="5" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="1360" y="498" width="4" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="1368" y="506" width="4" height="3" fill="#FFD580" opacity="0.8" />
          <rect x="1390" y="514" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="1414" y="528" width="5" height="3" fill="#FFD580" opacity="0.8" />
        </g>

        {/* ── Linha horizonte ── */}
        <line x1="0" y1="592" x2="1440" y2="592"
          stroke="#90C8E0" strokeWidth="0.8" opacity="0.2" />

        {/* ════════════════════════════════════════
            PALMEIRAS — tronco preenchido + frondes largas
            Cada palmeira: [baseX, crownX, crownY]
        ════════════════════════════════════════ */}
        {[
          [175, 194, 738],   // esq — inclina direita
          [315, 308, 752],   // esq — inclina esq, menor
          [510, 514, 730],   // centro-esq — reta, mais alta
          [930, 926, 732],   // centro-dir — reta, mais alta
          [1125, 1130, 750], // dir — inclina dir, menor
          [1295, 1310, 738], // dir — inclina direita
        ].map(([bx, cx, cy], i) => {
          const by = 900;
          const mx = Math.round((bx + cx) / 2);
          const my = Math.round((cy + by) / 2);
          // tronco: path preenchido cônico, base ~14px, topo ~7px
          const trunk = `M${bx-7},${by} Q${mx-4},${my} ${cx-3},${cy+6} L${cx+4},${cy+4} Q${mx+5},${my} ${bx+7},${by} Z`;
          // frondes [controle dx, controle dy, ponta dx, ponta dy, espessura]
          const fronds = [
            [-26,-28,-56,-46, 13], // cima-esq
            [  2,-30,  2,-52, 14], // cima centro
            [ 28,-28, 58,-46, 13], // cima-dir
            [ 48, -8, 88,  6, 12], // dir horizontal
            [ 50, 10, 88, 26, 11], // dir para baixo
            [-48, -8,-88,  6, 12], // esq horizontal
            [-50, 10,-88, 26, 11], // esq para baixo
          ];
          return (
            <g key={i}>
              {/* Tronco preenchido */}
              <path d={trunk} fill="#1e1008" />
              {/* Frondes grossas com ponta redonda */}
              {fronds.map(([qx, qy, tx, ty, sw], fi) => (
                <path key={fi}
                  d={`M${cx},${cy} Q${cx+qx},${cy+qy} ${cx+tx},${cy+ty}`}
                  stroke="#1a3d08" strokeWidth={sw}
                  strokeLinecap="round" fill="none"
                />
              ))}
              {/* Fronde de baixo — cai atrás do tronco */}
              <path d={`M${cx},${cy} Q${cx+4},${cy+20} ${cx+2},${cy+44}`}
                stroke="#162e06" strokeWidth="10" strokeLinecap="round" fill="none"/>
              {/* Nó do tronco (cocos) */}
              <ellipse cx={cx} cy={cy+2} rx="7" ry="5" fill="#141008"/>
              <circle cx={cx-3} cy={cy+5} r="3.5" fill="#0e0c06"/>
              <circle cx={cx+4} cy={cy+6} r="3" fill="#0e0c06"/>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
