import { useLang } from "@/context/LangContext";
import { useEffect, useRef, useState } from "react";
import { getGsap } from "@/lib/gsap";
import { PinIcon } from "./Icons";

const WA = "https://wa.me/554797518960";

const ALBUMS = [
  {
    id: "lagom",
    title: "LAGOM PEREQUÊ",
    location: "Porto Belo, SC",
    images: [
      "/images/edificios/lagom/4.webp",
      "/images/edificios/lagom/3.webp",
      "/images/edificios/lagom/2.webp",
      "/images/edificios/lagom/1.webp",
    ],
    unit: {
      number: "2901",
      suites: "03 Suítes",
      vagas: "02 Vagas",
      area: "118m²",
      price: "2.573.872,00",
      entrada: "257.387,20",
      mensais: "100x de R$ 6.900,00",
      anuais: "4x de R$ 310.101,00",
      chaves: "386.080,80",
      entrega: "Dezembro/2029",
      inc: "18-31.005",
    },
  },
  {
    id: "portobelo",
    title: "PORTO BELO HOME CLUB",
    location: "Porto Belo, SC",
    images: [
      "/images/PORTO BELO HOME CLUB/1.webp",
      "/images/PORTO BELO HOME CLUB/2.webp",
      "/images/PORTO BELO HOME CLUB/3.webp",
      "/images/PORTO BELO HOME CLUB/4.webp",
    ],
    unit: {
      number: "1004",
      suites: "02 Suítes",
      vagas: "02 Vagas",
      area: "94m²",
      price: "1.580.000,00",
      entrada: "79.000,00",
      mensais: "100x de R$ 4.900,00",
      anuais: "8x de R$ 106.625,00",
      chaves: "158.000,00",
      entrega: "Dezembro/2028",
      inc: "38.842",
    },
  },
  {
    id: "futura",
    title: "FUTURA FLATS",
    location: "Itapema, SC",
    images: [
      "/images/FUTURA FLATS/1.webp",
      "/images/FUTURA FLATS/2.webp",
      "/images/FUTURA FLATS/3.webp",
      "/images/FUTURA FLATS/4.webp",
    ],
    unit: {
      number: "1415",
      suites: "01 Dormitório",
      vagas: "01 Vaga",
      area: "41m²",
      price: "898.900,00",
      entrada: "89.890,00",
      mensais: "100x de R$ 2.990,00",
      anuais: "7x de R$ 72.845,71",
      chaves: null,
      entrega: "Julho/2031",
      inc: "002148.558",
    },
  },
  {
    id: "vitreo",
    title: "VITREO 271",
    location: "Itapema, SC",
    images: [
      "/images/VITREO 271/1.webp",
      "/images/VITREO 271/2.webp",
      "/images/VITREO 271/3.webp",
      "/images/VITREO 271/4.webp",
    ],
    unit: {
      number: "1701",
      suites: "04 Suítes",
      vagas: "03 Vagas",
      area: "178m²",
      price: "4.598.027,00",
      entrada: "990.000,00",
      mensais: "60x de R$ 27.800,00",
      anuais: "5x de R$ 222.605,40",
      chaves: "827.000,00",
      entrega: "Julho/2028",
      inc: "370072",
    },
  },
];

function mobileTransform(queuePos) {
  if (queuePos === 0) return "translate(-50%,-50%) scale(1) rotate(0deg)";
  const depth = 7 + (queuePos - 1) * 6,
    shrink = 1 - queuePos * 0.09;
  const tilt = queuePos % 2 === 1 ? 2.5 : -2.5;
  return `translate(-50%,-50%) translateY(${depth}%) scale(${shrink}) rotate(${tilt}deg)`;
}
function desktopTransform(queuePos) {
  if (queuePos === 0) return "translate(-50%,-50%) scale(1) rotateY(0deg)";
  const shift = 28 + (queuePos - 1) * 12,
    shrink = 1 - queuePos * 0.13;
  return `translate(-50%,-50%) translateX(-${shift}%) scale(${shrink}) rotateY(18deg)`;
}
const OPACITY = [1, 0.82, 0.62, 0.45];

export default function PropertiesSection() {
  const sectionRef = useRef(null);
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [albumImageIndex, setAlbumImageIndex] = useState({ lagom: 0, portobelo: 0, futura: 0, vitreo: 0 });
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  useEffect(() => {
    let ctx;
    const run = async () => {
      const { gsap } = await getGsap();
      ctx = gsap.context(() => {
        gsap.from(".section-header-prop > *", { y: 30, duration: 0.7, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%", once: true } });
        gsap.from(".props-stage", { y: 28, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".props-stage", start: "top 60%", once: true } });
        gsap.from(".prop-detail-card", { y: 24, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: ".prop-detail-card", start: "top 60%", once: true } });
        gsap.from(".prop-unit-card", { y: 24, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: ".prop-unit-card", start: "top 60%", once: true } });
      }, sectionRef);
    };
    run();
    return () => ctx?.revert();
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const albumId = ALBUMS[active].id;
    const albumLen = ALBUMS[active].images.length;
    const timer = setTimeout(() => {
      const cur = albumImageIndex[albumId];
      if (cur >= albumLen - 1) {
        const nextIdx = (active + 1) % ALBUMS.length;
        setAlbumImageIndex((prev) => ({ ...prev, [albumId]: 0, [ALBUMS[nextIdx].id]: 0 }));
        setActive(nextIdx);
      } else {
        setAlbumImageIndex((prev) => ({ ...prev, [albumId]: prev[albumId] + 1 }));
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [active, albumImageIndex]);

  const goTo = (idx) => setActive((idx + ALBUMS.length) % ALBUMS.length);
  const moveImage = (albumId, dir) => {
    const len = ALBUMS.find((a) => a.id === albumId)?.images.length ?? 1;
    setAlbumImageIndex((prev) => ({ ...prev, [albumId]: (prev[albumId] + dir + len) % len }));
  };
  const setImage = (albumId, imgIdx) => setAlbumImageIndex((prev) => ({ ...prev, [albumId]: imgIdx }));
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; touchStartY.current = e.touches[0].clientY; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 45) goTo(active + (dx > 0 ? 1 : -1));
    touchStartX.current = null; touchStartY.current = null;
  };

  const activeAlbum = ALBUMS[active];
  const unit = activeAlbum.unit;

  // SVG icons for the unit card
  const IconCheck = <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>;
  const IconCalendar = <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
  const IconPin = <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
  const IconDoc = <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
  const IconHome = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="9" y1="3" x2="9" y2="21" /></svg>;

  const paymentItems = [
    { label: "Entrada", value: `R$ ${unit.entrada}` },
    { label: "Mensais", value: unit.mensais },
    { label: "Ref. Anuais", value: unit.anuais },
    ...(unit.chaves ? [{ label: "Chaves", value: `R$ ${unit.chaves}` }] : []),
  ];

  return (
    <section id="empreendimentos" ref={sectionRef}
      className="reveal-section section-alt-a py-[clamp(80px,10vw,140px)] overflow-x-hidden">
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)]">

        {/* Header */}
        <div className="section-header-prop text-center mb-14">
          <p className="section-tag inline-flex items-center gap-2.5 text-[11px] font-medium tracking-[0.2em] uppercase text-gold mb-5">
            {t("prop_tag")}
          </p>
          <h2 className="font-display font-semibold leading-[1.12] tracking-tight text-ink mb-4"
              style={{ fontSize: "clamp(32px,4.5vw,52px)" }}>
            {t("prop_title")}
          </h2>
          <p className="text-base leading-relaxed text-text-2 max-w-[600px] mx-auto">
            {t("prop_subtitle")}
          </p>
        </div>

        {/* Card Stage */}
        <div>
            <div className="props-stage relative h-[460px] sm:h-[500px] md:h-[560px] w-full mb-5 [perspective:1400px] overflow-visible"
                 onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
              <div className="sm:hidden absolute top-0 left-1/2 -translate-x-1/2 -translate-y-7 flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-text-3 pointer-events-none select-none">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="-scale-x-100">
                  <path d="M19 12H5M12 5l-7 7 7 7"/></svg>
                <span>deslize</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </div>

              {ALBUMS.map((album, i) => {
                const queuePos = (i - active + ALBUMS.length) % ALBUMS.length;
                const currentImg = album.images[albumImageIndex[album.id]];
                return (
                  <div key={album.id} onClick={() => goTo(i)}
                       onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); goTo(i); } }}
                       role="button" tabIndex={0} aria-label={album.title}
                       className="prop-card-wrapper absolute top-1/2 left-1/2 w-[92%] sm:w-[80%] md:w-[72%] lg:w-[85%] h-[86%] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                       style={{ transform: isMobile ? mobileTransform(queuePos) : desktopTransform(queuePos),
                                opacity: OPACITY[queuePos] ?? 0, zIndex: 20 - queuePos,
                                filter: `saturate(${1 - queuePos * 0.16}) brightness(${1 - queuePos * 0.08})` }}>
                    <div className="w-full h-full relative rounded-2xl overflow-hidden border border-white/40 shadow-[0_14px_34px_rgba(0,0,0,.12)] cursor-pointer animate-float-slow"
                         style={{ animationDelay: `${i * 0.4}s` }}>
                      <div className="prop-visual relative h-full bg-cover bg-center"
                           style={{ backgroundImage: `url("${currentImg}")` }}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/20" />
                        <span className="absolute left-4 bottom-4 text-sm sm:text-base font-medium text-white/95 tracking-wide">
                          {album.title}
                        </span>
                        {i === active && (<>
                          <button type="button" onClick={(e) => { e.stopPropagation(); moveImage(album.id, -1); }}
                                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm text-white border border-white/20 text-lg flex items-center justify-center hover:bg-black/70 transition-colors"
                                  aria-label="anterior">‹</button>
                          <button type="button" onClick={(e) => { e.stopPropagation(); moveImage(album.id, 1); }}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm text-white border border-white/20 text-lg flex items-center justify-center hover:bg-black/70 transition-colors"
                                  aria-label="próxima">›</button>
                          <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
                            {album.images.map((_, imgIdx) => (
                              <button key={imgIdx} type="button" onClick={(e) => { e.stopPropagation(); setImage(album.id, imgIdx); }}
                                      className={`h-1.5 rounded-full transition-all ${imgIdx === albumImageIndex[album.id] ? "w-6 bg-white" : "w-2.5 bg-white/40"}`}
                                      aria-label={`foto ${imgIdx + 1}`} />
                            ))}
                          </div>
                        </>)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Album Dots */}
            <div className="flex items-center justify-center gap-2">
              {ALBUMS.map((album, i) => (
                <button key={album.id} type="button" onClick={() => goTo(i)}
                        className={`h-1.5 rounded-full transition-all ${i === active ? "w-8 bg-gold" : "w-3 bg-ink/15 hover:bg-ink/30"}`}
                        aria-label={`empreendimento ${i + 1}`} />
              ))}
            </div>
        </div>

        {/* 🔥 UNIT CARD */}
        <div className="prop-unit-card max-w-[920px] mx-auto mb-10">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0f1923] via-[#1a2a1a] to-[#0f1923] border border-gold/30 shadow-[0_8px_40px_rgba(212,175,55,0.12)] p-6 sm:p-8">

            {/* Glow accents */}
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gold/10 blur-[60px] pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-verde/10 blur-[50px] pointer-events-none" />

            <div className="relative z-10">

              {/* Badge + Title Row */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 rounded-full px-4 py-1.5 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                    <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-gold">Unidade em Destaque</span>
                  </div>
                  <h3 className="font-display text-white text-[clamp(22px,3vw,30px)] font-semibold leading-tight mb-1">
                    🏆 {activeAlbum.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 text-white/60 text-sm">
                    {IconHome}
                    <span>Unidade {unit.number}</span>
                    <span className="text-white/20">•</span>
                    <span>{unit.suites}</span>
                    <span className="text-white/20">•</span>
                    <span>{unit.vagas}</span>
                    <span className="text-white/20">•</span>
                    <span>{unit.area}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="text-[11px] tracking-widest uppercase text-white/40 mb-1">Valor do Imóvel</p>
                  <p className="font-display text-gold font-bold leading-none" style={{ fontSize: "clamp(24px,3.5vw,34px)" }}>
                    R$ {unit.price}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

              {/* Payment Grid */}
              <div className="grid gap-4 mb-6"
                   style={{ gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))" }}>
                {paymentItems.map((item, idx) => (
                  <div key={idx} className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 hover:border-gold/30 transition-colors">
                    <p className="text-[10px] tracking-wider uppercase text-white/50 mb-2">{item.label}</p>
                    <p className="text-sm font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Footer info */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-white/50 mb-6">
                <span className="flex items-center gap-1.5">{IconCheck} 100% direto com a construtora</span>
                <span className="flex items-center gap-1.5">{IconCalendar} Entrega: {unit.entrega}</span>
                <span className="flex items-center gap-1.5">{IconPin} {activeAlbum.location}</span>
                <span className="flex items-center gap-1.5">{IconDoc} Inc. N° {unit.inc}</span>
              </div>

              {/* CTA */}
              <a href={WA} target="_blank" rel="noopener noreferrer"
                 className="flex items-center justify-center gap-2.5 w-full sm:w-auto sm:inline-flex bg-gradient-to-r from-green-700 to-green-600 text-white text-sm font-semibold tracking-wide px-10 py-4 rounded-xl transition-all hover:from-green-600 hover:to-green-500 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(34,197,94,0.25)]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Quero esta unidade
              </a>

            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center">
          <a href={WA} target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-2.5 bg-green-700 text-white text-sm font-semibold tracking-wide px-10 py-5 rounded-xl transition-all hover:bg-green-800 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(15,25,35,.3)]">
            {t("prop_see_all")}
          </a>
        </div>

      </div>
    </section>
  );
}
