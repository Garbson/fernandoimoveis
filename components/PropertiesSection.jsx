"use client";
import { useLang } from "@/context/LangContext";
import { useEffect, useRef, useState } from "react";
import { PinIcon } from "./Icons";

const WA = "https://wa.me/554797518960";

const ALBUMS = [
  {
    id: "vision",
    title: "VISION HOME CLUB",
    locKey: "prop1_location",
    typeKey: "prop1_type",
    priceKey: "prop1_price",
    descKey: "prop1_desc",
    images: [
      "/images/edificios/vision.jpeg",
      "/images/edificios/vision1.jpeg",
      "/images/edificios/vision2.jpeg",
      "/images/edificios/vision3.jpeg",
    ],
  },
  {
    id: "lagom",
    title: "LAGOM PEREQUÊ",
    locKey: "prop2_location",
    typeKey: "prop2_type",
    priceKey: "prop2_price",
    descKey: "prop2_desc",
    images: [
      "/images/edificios/lagom.jpeg",
      "/images/edificios/lagom1.jpeg",
      "/images/edificios/lagom2.jpeg",
      "/images/edificios/lagom3.jpeg",
    ],
  },
  {
    id: "sota",
    title: "SÔTA RESIDENCE",
    locKey: "prop3_location",
    typeKey: "prop3_type",
    priceKey: "prop3_price",
    descKey: "prop3_desc",
    images: [
      "/images/edificios/sota.jpeg",
      "/images/edificios/sota1.jpeg",
      "/images/edificios/sota2.jpeg",
      "/images/edificios/sota3.jpeg",
    ],
  },
  {
    id: "organica",
    title: "ORGÂNICA TOWER",
    locKey: "prop4_location",
    typeKey: "prop4_type",
    priceKey: "prop4_price",
    descKey: "prop4_desc",
    images: [
      "/images/edificios/organica.jpeg",
      "/images/edificios/organica1.jpeg",
      "/images/edificios/organica2.jpeg",
      "/images/edificios/organica3.jpeg",
    ],
  },
];

function mobileTransform(queuePos) {
  if (queuePos === 0) return "translate(-50%,-50%) scale(1) rotate(0deg)";
  const depth = 7 + (queuePos - 1) * 6,
    shrink = 1 - queuePos * 0.09,
    tilt = queuePos % 2 === 1 ? 2.5 : -2.5;
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
  const [albumImageIndex, setAlbumImageIndex] = useState({
    vision: 0,
    lagom: 0,
    sota: 0,
    organica: 0,
  });
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  useEffect(() => {
    let ctx;
    const run = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.from(".section-header-prop > *", {
          y: 30,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#empreendimentos",
            start: "top 75%",
            once: true,
          },
        });
        gsap.from(".props-stage", {
          y: 28,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".props-stage",
            start: "top 75%",
            once: true,
          },
        });
        gsap.from(".prop-detail-card", {
          y: 24,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".prop-detail-card",
            start: "top 75%",
            once: true,
          },
        });
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
    const albumId = ALBUMS[active].id,
      albumLen = ALBUMS[active].images.length;
    const timer = setTimeout(() => {
      const cur = albumImageIndex[albumId];
      if (cur >= albumLen - 1) {
        const nextIdx = (active + 1) % ALBUMS.length;
        setAlbumImageIndex((prev) => ({
          ...prev,
          [albumId]: 0,
          [ALBUMS[nextIdx].id]: 0,
        }));
        setActive(nextIdx);
      } else {
        setAlbumImageIndex((prev) => ({
          ...prev,
          [albumId]: prev[albumId] + 1,
        }));
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [active, albumImageIndex]);

  const goTo = (idx) => setActive((idx + ALBUMS.length) % ALBUMS.length);
  const moveImage = (albumId, dir) => {
    const len = ALBUMS.find((a) => a.id === albumId)?.images.length ?? 1;
    setAlbumImageIndex((prev) => ({
      ...prev,
      [albumId]: (prev[albumId] + dir + len) % len,
    }));
  };
  const setImage = (albumId, imgIdx) =>
    setAlbumImageIndex((prev) => ({ ...prev, [albumId]: imgIdx }));
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

  const activeAlbum = ALBUMS[active];

  return (
    <section
      id="empreendimentos"
      ref={sectionRef}
      className="reveal-section section-alt-a py-[clamp(80px,10vw,140px)] overflow-x-hidden"
    >
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)]">
        <div className="section-header-prop text-center mb-14">
          <p className="section-tag inline-flex items-center gap-2.5 text-[11px] font-medium tracking-[0.2em] uppercase text-gold mb-5">
            {t("prop_tag")}
          </p>
          <h2
            className="font-display font-semibold leading-[1.12] tracking-tight text-ink mb-4"
            style={{ fontSize: "clamp(32px,4.5vw,52px)" }}
          >
            {t("prop_title")}
          </h2>
          <p className="text-base leading-relaxed text-text-2 max-w-[600px] mx-auto">
            {t("prop_subtitle")}
          </p>
        </div>

        <div
          className="props-stage relative h-[400px] sm:h-[380px] md:h-[420px] w-full mb-8 [perspective:1400px] overflow-visible"
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

          {ALBUMS.map((album, i) => {
            const queuePos = (i - active + ALBUMS.length) % ALBUMS.length;
            const currentImg = album.images[albumImageIndex[album.id]];
            return (
              <div
                key={album.id}
                onClick={() => goTo(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    goTo(i);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={album.title}
                className="prop-card-wrapper absolute top-1/2 left-1/2 w-[88%] sm:w-[74%] md:w-[60%] h-[84%] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transform: isMobile
                    ? mobileTransform(queuePos)
                    : desktopTransform(queuePos),
                  opacity: OPACITY[queuePos] ?? 0,
                  zIndex: 20 - queuePos,
                  filter: `saturate(${1 - queuePos * 0.16}) brightness(${1 - queuePos * 0.08})`,
                }}
              >
                <div
                  className="w-full h-full relative rounded-2xl overflow-hidden border border-white/40 shadow-[0_14px_34px_rgba(0,0,0,.12)] cursor-pointer animate-float-slow"
                  style={{ animationDelay: `${i * 0.4}s` }}
                >
                  <div
                    className="prop-visual relative h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${currentImg})` }}
                  >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/45" />
                  <span className="absolute left-4 bottom-4 text-sm sm:text-base font-medium text-white/95 tracking-wide">
                    {album.title}
                  </span>
                  {i === active && (
                    <>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          moveImage(album.id, -1);
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm text-white border border-white/20 text-lg flex items-center justify-center hover:bg-black/70 transition-colors"
                        aria-label="anterior"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          moveImage(album.id, 1);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm text-white border border-white/20 text-lg flex items-center justify-center hover:bg-black/70 transition-colors"
                        aria-label="próxima"
                      >
                        ›
                      </button>
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
                        {album.images.map((_, imgIdx) => (
                          <button
                            key={imgIdx}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setImage(album.id, imgIdx);
                            }}
                            className={`h-1.5 rounded-full transition-all ${imgIdx === albumImageIndex[album.id] ? "w-6 bg-white" : "w-2.5 bg-white/40"}`}
                            aria-label={`foto ${imgIdx + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-2 mb-9">
          {ALBUMS.map((album, i) => (
            <button
              key={album.id}
              type="button"
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all ${i === active ? "w-8 bg-gold" : "w-3 bg-ink/15 hover:bg-ink/30"}`}
              aria-label={`empreendimento ${i + 1}`}
            />
          ))}
        </div>

        <div className="prop-detail-card max-w-[920px] mx-auto glass rounded-2xl p-6 sm:p-8 mb-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="text-[10px] font-semibold tracking-[0.12em] uppercase px-3 py-1.5 rounded-full bg-ink text-white">
              {t("prop_badge_featured")}
            </span>
            <span className="text-sm font-medium shimmer-text">
              {t(activeAlbum.priceKey)}
            </span>
          </div>
          <h3 className="font-display text-[clamp(22px,3vw,36px)] leading-tight text-ink mb-2">
            {activeAlbum.title}
          </h3>
          <div className="flex items-center gap-1.5 text-[12px] tracking-wider uppercase text-text-3 mb-3">
            <PinIcon size={13} />
            {t(activeAlbum.locKey)}
          </div>
          <p className="text-sm text-text-3 mb-1">{t(activeAlbum.typeKey)}</p>
          <p className="text-[15px] leading-relaxed text-text-2 mb-6">
            {t(activeAlbum.descKey)}
          </p>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-green-700 text-white text-sm font-medium tracking-wide px-7 py-3.5 rounded-xl transition-all hover:bg-green-800 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(15,25,35,.2)]"
          >
            {t("prop_cta")}
          </a>
        </div>

        <div className="text-center">
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-green-700 text-white text-sm font-semibold tracking-wide px-10 py-5 rounded-xl transition-all hover:bg-green-800 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(15,25,35,.3)]"
          >
            {t("prop_see_all")}
          </a>
        </div>
      </div>
    </section>
  );
}
