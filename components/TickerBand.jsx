import { useLang } from "@/context/LangContext";

export default function TickerBand() {
  const { t } = useLang();
  
  // Create an array of repeating items so it fills the screen and loops seamlessly
  const items = new Array(8).fill(t("hero_ticker"));

  return (
    <div className="relative w-full bg-ink border-y border-ink-2 overflow-hidden py-3.5 select-none flex">
      {/* Ticker Container */}
      <div className="flex whitespace-nowrap animate-marquee-slow sm:animate-marquee">
        {items.map((item, i) => (
          <span key={i} className="text-gold uppercase tracking-widest text-xs md:text-sm font-body font-medium px-8 flex-shrink-0">
            {item}
          </span>
        ))}
      </div>
      {/* Duplicate for seamless infinite loop */}
      <div className="flex whitespace-nowrap animate-marquee-slow sm:animate-marquee" aria-hidden="true">
        {items.map((item, i) => (
          <span key={`dup-${i}`} className="text-gold uppercase tracking-widest text-xs md:text-sm font-body font-medium px-8 flex-shrink-0">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
