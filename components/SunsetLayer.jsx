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

      /* Praia avermelhada */
      gsap.to('#bg-beach-s', { opacity: 0.65, scrollTrigger: st });

      /* Escurecimento noturno — mínimo */
      gsap.to('#bg-dusk', { opacity: 0.18, scrollTrigger: st });

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
          {/* Céu base — verde médio, mais claro */}
          <linearGradient id="bg-sky-base" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#1a3a22" />
            <stop offset="45%"  stopColor="#265c30" />
            <stop offset="100%" stopColor="#2e7040" />
          </linearGradient>

          {/* Céu pôr do sol — saturado */}
          <linearGradient id="bg-sky-sunset" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#180806" />
            <stop offset="22%"  stopColor="#6b1a08" />
            <stop offset="58%"  stopColor="#c43010" />
            <stop offset="100%" stopColor="#f04820" />
          </linearGradient>

          {/* Mar base — teal visível */}
          <linearGradient id="bg-sea-base" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#102e2e" />
            <stop offset="100%" stopColor="#081818" />
          </linearGradient>

          {/* Mar espelho pôr do sol */}
          <linearGradient id="bg-sea-sunset" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#e03810" stopOpacity="0.75" />
            <stop offset="40%"  stopColor="#801808" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#180804" stopOpacity="0" />
          </linearGradient>

          {/* Halo do sol dia */}
          <radialGradient id="bg-glow-day-g" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#E8C070" stopOpacity="0.75" />
            <stop offset="40%"  stopColor="#C4975A" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#C4975A" stopOpacity="0" />
          </radialGradient>

          {/* Halo pôr do sol */}
          <radialGradient id="bg-glow-set-g" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#ff4010" stopOpacity="0.85" />
            <stop offset="40%"  stopColor="#e02808" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#e02808" stopOpacity="0" />
          </radialGradient>

          {/* Brilho horizonte */}
          <radialGradient id="bg-horiz-g" cx="50%" cy="100%" r="60%">
            <stop offset="0%"   stopColor="#f04010" stopOpacity="0.85" />
            <stop offset="50%"  stopColor="#c03010" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#c03010" stopOpacity="0" />
          </radialGradient>

          {/* Vinheta mínima — quase invisível */}
          <radialGradient id="bg-vignette" cx="50%" cy="44%" r="75%">
            <stop offset="60%"  stopColor="transparent" />
            <stop offset="100%" stopColor="#020603" stopOpacity="0.12" />
          </radialGradient>

          {/* Blur para halos */}
          <filter id="bg-blur32" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="32" />
          </filter>
        </defs>

        {/* ── Céu base ── */}
        <rect width="1440" height="900" fill="url(#bg-sky-base)" />

        {/* ── Pôr do sol (opacity 0 → 1) ── */}
        <rect id="bg-sky-s" width="1440" height="900" fill="url(#bg-sky-sunset)" opacity="0" />

        {/* ── Halo dia (grande, dourado) ── */}
        <circle id="bg-glow-day" cx="720" cy="108" r="260"
          fill="url(#bg-glow-day-g)" filter="url(#bg-blur32)" />

        {/* ── Halo pôr (vermelho) ── */}
        <circle id="bg-glow-set" cx="720" cy="108" r="240"
          fill="url(#bg-glow-set-g)" filter="url(#bg-blur32)" opacity="0" />

        {/* ── Sol dourado ── */}
        <circle id="bg-sun" cx="720" cy="108" r="58" fill="#E8B060" />

        {/* ── Sol vermelho ── */}
        <circle id="bg-sun-s" cx="720" cy="108" r="58" fill="#e83810" opacity="0" />

        {/* Brilho interno */}
        <ellipse cx="705" cy="92" rx="18" ry="12" fill="#FDE08A" opacity="0.45" />

        {/* ── Brilho horizonte ── */}
        <ellipse id="bg-horiz" cx="720" cy="592" rx="640" ry="110"
          fill="url(#bg-horiz-g)" opacity="0" />

        {/* ════════════════════════════════════════
            PRÉDIOS — skyline detalhada
            Hills em y=548, horizonte em y=592
        ════════════════════════════════════════ */}
        <g fill="#0b1c12">

          {/* —— CLUSTER ESQUERDO —— */}
          {/* prédio largo baixo */}
          <rect x="18"  y="520" width="38" height="76" />
          {/* torre estreita */}
          <rect x="30"  y="500" width="14" height="20" />
          <rect x="60"  y="498" width="28" height="98" />
          {/* antena */}
          <rect x="72"  y="484" width="4"  height="14" />
          <rect x="92"  y="508" width="36" height="88" />
          <rect x="104" y="490" width="12" height="18" />
          <rect x="132" y="485" width="20" height="111" />
          {/* janelão no topo */}
          <rect x="133" y="470" width="18" height="15" />
          <rect x="156" y="495" width="30" height="101" />
          <rect x="190" y="478" width="24" height="118" />
          <rect x="196" y="462" width="12" height="16" />
          <rect x="218" y="503" width="18" height="93" />
          <rect x="240" y="485" width="32" height="111" />
          <rect x="244" y="468" width="24" height="17" />
          <rect x="276" y="495" width="22" height="101" />
          <rect x="302" y="510" width="16" height="86" />
          <rect x="320" y="490" width="26" height="106" />
          <rect x="350" y="505" width="20" height="91" />

          {/* —— CLUSTER CENTRAL —— */}
          <rect x="480" y="495" width="24" height="101" />
          <rect x="508" y="478" width="28" height="118" />
          <rect x="514" y="460" width="16" height="18" />
          <rect x="540" y="462" width="26" height="134" />
          <rect x="570" y="448" width="30" height="148" />
          <rect x="574" y="432" width="22" height="16" />
          <rect x="604" y="432" width="28" height="164" />
          <rect x="636" y="415" width="32" height="181" />
          <rect x="640" y="400" width="24" height="15" />
          <rect x="672" y="395" width="28" height="201" />
          <rect x="676" y="378" width="20" height="17" />
          {/* ARRANHA-CÉU CENTRAL — mais alto */}
          <rect x="704" y="330" width="36" height="266" />
          <rect x="710" y="312" width="24" height="18" />
          <rect x="718" y="298" width="8"  height="14" />
          <rect x="744" y="342" width="32" height="254" />
          <rect x="748" y="326" width="24" height="16" />
          <rect x="780" y="358" width="28" height="238" />
          <rect x="812" y="372" width="34" height="224" />
          <rect x="816" y="358" width="26" height="14" />
          <rect x="850" y="390" width="26" height="206" />
          <rect x="880" y="408" width="30" height="188" />
          <rect x="914" y="425" width="24" height="171" />
          <rect x="942" y="440" width="28" height="156" />
          <rect x="946" y="426" width="20" height="14" />
          <rect x="974" y="455" width="22" height="141" />
          <rect x="1000" y="468" width="26" height="128" />

          {/* —— CLUSTER DIREITO —— */}
          <rect x="1060" y="500" width="22" height="96" />
          <rect x="1086" y="486" width="28" height="110" />
          <rect x="1118" y="470" width="26" height="126" />
          <rect x="1122" y="455" width="18" height="15" />
          <rect x="1148" y="455" width="32" height="141" />
          <rect x="1184" y="440" width="24" height="156" />
          <rect x="1188" y="424" width="16" height="16" />
          <rect x="1212" y="452" width="28" height="144" />
          <rect x="1244" y="465" width="22" height="131" />
          <rect x="1270" y="478" width="30" height="118" />
          <rect x="1304" y="490" width="24" height="106" />
          <rect x="1332" y="478" width="28" height="118" />
          <rect x="1336" y="462" width="20" height="16" />
          <rect x="1364" y="492" width="22" height="104" />
          <rect x="1390" y="506" width="30" height="90" />
          <rect x="1424" y="515" width="18" height="81" />
        </g>

        {/* ════════════════════════════════════════
            LUZES DA CIDADE
        ════════════════════════════════════════ */}
        <g id="bg-city-lights" opacity="0">
          {/* cluster esquerdo */}
          <rect x="22"  y="526" width="4" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="30"  y="533" width="4" height="3" fill="#FFD580" opacity="0.8" />
          <rect x="22"  y="540" width="4" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="64"  y="504" width="4" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="72"  y="512" width="4" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="64"  y="520" width="4" height="3" fill="#FFA040" opacity="0.8" />
          <rect x="64"  y="528" width="4" height="3" fill="#FFD580" opacity="0.7" />
          <rect x="96"  y="515" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="104" y="523" width="5" height="3" fill="#FFD580" opacity="0.8" />
          <rect x="96"  y="531" width="5" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="136" y="491" width="4" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="144" y="499" width="4" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="136" y="507" width="4" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="136" y="515" width="4" height="3" fill="#FFD580" opacity="0.75" />
          <rect x="144" y="523" width="4" height="3" fill="#FFD580" opacity="0.8" />
          <rect x="160" y="501" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="168" y="509" width="5" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="160" y="517" width="5" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="168" y="525" width="5" height="3" fill="#FFD580" opacity="0.7" />
          <rect x="194" y="484" width="4" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="202" y="492" width="4" height="3" fill="#FFD580" opacity="0.8" />
          <rect x="194" y="500" width="4" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="202" y="508" width="4" height="3" fill="#FFD580" opacity="0.75" />
          <rect x="244" y="491" width="5" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="252" y="499" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="244" y="507" width="5" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="252" y="515" width="5" height="3" fill="#FFD580" opacity="0.7" />
          <rect x="324" y="496" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="332" y="504" width="5" height="3" fill="#FFD580" opacity="0.8" />
          <rect x="324" y="512" width="5" height="3" fill="#FFA040" opacity="0.85" />

          {/* cluster central */}
          <rect x="544" y="468" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="552" y="477" width="5" height="3" fill="#FFD580" opacity="0.8" />
          <rect x="544" y="486" width="5" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="552" y="495" width="5" height="3" fill="#FFD580" opacity="0.75" />
          <rect x="574" y="452" width="5" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="582" y="461" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="574" y="470" width="5" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="582" y="479" width="5" height="3" fill="#FFD580" opacity="0.8" />
          <rect x="574" y="488" width="5" height="3" fill="#FFD580" opacity="0.7" />
          <rect x="608" y="438" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="616" y="447" width="5" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="608" y="456" width="5" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="616" y="465" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="608" y="474" width="5" height="3" fill="#FFD580" opacity="0.75" />
          <rect x="640" y="420" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="648" y="429" width="5" height="3" fill="#FFD580" opacity="0.8" />
          <rect x="640" y="438" width="5" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="648" y="447" width="5" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="640" y="456" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="648" y="465" width="5" height="3" fill="#FFD580" opacity="0.7" />
          <rect x="676" y="400" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="684" y="410" width="5" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="676" y="420" width="5" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="684" y="430" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="676" y="440" width="5" height="3" fill="#FFD580" opacity="0.8" />
          <rect x="684" y="450" width="5" height="3" fill="#FFD580" opacity="0.75" />
          <rect x="676" y="460" width="5" height="3" fill="#FFA040" opacity="0.85" />
          {/* arranha-céu central — muitas janelas */}
          <rect x="708" y="336" width="6" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="718" y="346" width="6" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="708" y="356" width="6" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="718" y="366" width="6" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="708" y="376" width="6" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="718" y="386" width="6" height="3" fill="#FFD580" opacity="0.8" />
          <rect x="708" y="396" width="6" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="718" y="406" width="6" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="708" y="416" width="6" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="718" y="426" width="6" height="3" fill="#FFD580" opacity="0.75" />
          <rect x="708" y="436" width="6" height="3" fill="#FFA040" opacity="0.8" />
          <rect x="748" y="348" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="756" y="358" width="5" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="748" y="368" width="5" height="3" fill="#FFD580" opacity="0.8" />
          <rect x="756" y="378" width="5" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="748" y="388" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="756" y="398" width="5" height="3" fill="#FFD580" opacity="0.75" />
          <rect x="748" y="408" width="5" height="3" fill="#FFA040" opacity="0.8" />
          <rect x="756" y="418" width="5" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="784" y="365" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="792" y="374" width="5" height="3" fill="#FFD580" opacity="0.8" />
          <rect x="784" y="383" width="5" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="792" y="392" width="5" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="784" y="401" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="792" y="410" width="5" height="3" fill="#FFD580" opacity="0.7" />
          <rect x="816" y="378" width="6" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="826" y="387" width="6" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="816" y="396" width="6" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="826" y="405" width="6" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="816" y="414" width="6" height="3" fill="#FFD580" opacity="0.75" />
          <rect x="854" y="396" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="862" y="405" width="5" height="3" fill="#FFD580" opacity="0.8" />
          <rect x="854" y="414" width="5" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="862" y="423" width="5" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="884" y="414" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="892" y="422" width="5" height="3" fill="#FFD580" opacity="0.8" />
          <rect x="884" y="430" width="5" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="946" y="431" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="954" y="439" width="5" height="3" fill="#FFD580" opacity="0.8" />
          <rect x="946" y="447" width="5" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="978" y="461" width="4" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="986" y="469" width="4" height="3" fill="#FFD580" opacity="0.8" />

          {/* cluster direito */}
          <rect x="1122" y="461" width="4" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="1130" y="470" width="4" height="3" fill="#FFD580" opacity="0.8" />
          <rect x="1122" y="479" width="4" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="1152" y="461" width="5" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="1160" y="470" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="1152" y="479" width="5" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="1160" y="488" width="5" height="3" fill="#FFD580" opacity="0.7" />
          <rect x="1188" y="446" width="4" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="1196" y="455" width="4" height="3" fill="#FFD580" opacity="0.8" />
          <rect x="1188" y="464" width="4" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="1196" y="473" width="4" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="1188" y="482" width="4" height="3" fill="#FFD580" opacity="0.75" />
          <rect x="1216" y="458" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="1224" y="467" width="5" height="3" fill="#FFD580" opacity="0.8" />
          <rect x="1216" y="476" width="5" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="1248" y="471" width="4" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="1256" y="479" width="4" height="3" fill="#FFD580" opacity="0.8" />
          <rect x="1248" y="487" width="4" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="1274" y="484" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="1282" y="492" width="5" height="3" fill="#FFD580" opacity="0.8" />
          <rect x="1336" y="484" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="1344" y="492" width="5" height="3" fill="#FFE090" opacity="0.95" />
          <rect x="1336" y="500" width="5" height="3" fill="#FFA040" opacity="0.85" />
          <rect x="1368" y="498" width="4" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="1376" y="506" width="4" height="3" fill="#FFD580" opacity="0.8" />
          <rect x="1394" y="512" width="5" height="3" fill="#FFD580" opacity="0.9" />
          <rect x="1402" y="520" width="5" height="3" fill="#FFD580" opacity="0.8" />
        </g>

        {/* ── Serras base ── */}
        <path
          d="M0,548 Q90,505 215,532 Q310,500 450,528
             Q540,506 650,525 Q720,512 845,528
             Q956,506 1078,532 Q1200,506 1325,530
             Q1398,516 1440,532 L1440,596 L0,596 Z"
          fill="#0a1510"
          opacity="0.96"
        />

        {/* Serras avermelhadas no pôr */}
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

        {/* ── Espelho laranja ── */}
        <rect id="bg-sea-s" x="0" y="592" width="1440" height="308"
          fill="url(#bg-sea-sunset)" opacity="0" />

        {/* ── Ondas — mais visíveis ── */}
        <g fill="none" opacity="0.55">
          <path d="M0,612 Q180,606 360,612 Q540,618 720,612 Q900,606 1080,612 Q1260,618 1440,612"
            stroke="#3a7a6a" strokeWidth="1.2"/>
          <path d="M0,628 Q180,622 360,628 Q540,634 720,628 Q900,622 1080,628 Q1260,634 1440,628"
            stroke="#346a5c" strokeWidth="1"/>
          <path d="M0,645 Q180,638 360,645 Q540,652 720,645 Q900,638 1080,645 Q1260,652 1440,645"
            stroke="#2e5e52" strokeWidth="1.2"/>
          <path d="M0,663 Q240,656 480,663 Q720,670 960,663 Q1200,656 1440,663"
            stroke="#285248" strokeWidth="1"/>
          <path d="M0,682 Q240,675 480,682 Q720,689 960,682 Q1200,675 1440,682"
            stroke="#224640" strokeWidth="1.2"/>
          <path d="M0,703 Q240,696 480,703 Q720,710 960,703 Q1200,696 1440,703"
            stroke="#1e3e38" strokeWidth="1"/>
          <path d="M0,726 Q240,719 480,726 Q720,733 960,726 Q1200,719 1440,726"
            stroke="#1a3632" strokeWidth="1.2"/>
          <path d="M0,752 Q240,745 480,752 Q720,759 960,752 Q1200,745 1440,752"
            stroke="#162e2a" strokeWidth="1"/>
        </g>

        {/* ── Praia base ── */}
        <path
          d="M0,832 Q200,816 400,828 Q600,840 800,822
             Q1000,806 1200,822 Q1340,832 1440,818 L1440,900 L0,900 Z"
          fill="#22180c"
          opacity="0.78"
        />

        {/* Praia avermelhada */}
        <path
          id="bg-beach-s"
          d="M0,832 Q200,816 400,828 Q600,840 800,822
             Q1000,806 1200,822 Q1340,832 1440,818 L1440,900 L0,900 Z"
          fill="#a82c0a"
          opacity="0"
        />

        {/* ── Noite chegando — bem suave ── */}
        <rect id="bg-dusk" width="1440" height="900" fill="#020504" opacity="0" />

        {/* ── Vinheta mínima ── */}
        <rect width="1440" height="900" fill="url(#bg-vignette)" />
      </svg>
    </div>
  );
}
