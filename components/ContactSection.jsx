import { useLang } from "@/context/LangContext";
import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";
import { ArrowIcon, IgIcon, LinkedInIcon, WaIcon } from "./Icons";

const WA_NUM = "554797518960";

export default function ContactSection() {
  const sectionRef = useRef(null);
  const { t } = useLang();

  useEffect(() => {
    let ctx;
    const run = async () => {
      const { gsap } = await getGsap();
      ctx = gsap.context(() => {
        gsap.from(".contact-left > *", {
          y: 30,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            once: true,
          },
        });
      }, sectionRef);
    };
    run();
    return () => ctx?.revert();
  }, []);

  return (
    <section
      id="contato"
      ref={sectionRef}
      className="reveal-section section-alt-a py-[clamp(80px,10vw,140px)]"
    >
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)]">
        <div className="max-w-[600px] mx-auto">
          <div className="contact-left flex flex-col gap-0">
            <p className="section-tag flex items-center gap-2.5 text-[11px] font-medium tracking-[0.2em] uppercase text-gold mb-5">
              {t("contact_tag")}
            </p>
            <h2
              className="font-display font-semibold leading-[1.12] tracking-tight text-ink mb-10"
              style={{ fontSize: "clamp(28px,4vw,48px)" }}
            >
              {t("contact_title")}
            </h2>

            <div className="flex flex-col gap-4">
              <a
                href={`https://wa.me/${WA_NUM}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-xl glass border-[rgba(37,209,102,.12)] transition-all hover:translate-x-1.5 hover:shadow-[0_8px_24px_rgba(37,209,102,.1)] hover:border-[rgba(37,209,102,.25)]"
              >
                <div className="w-11 h-11 rounded-lg bg-[rgba(37,209,102,.08)] flex items-center justify-center text-[#25d166] flex-shrink-0">
                  <WaIcon size={22} />
                </div>
                <div className="flex-1">
                  <span className="block text-[11px] tracking-widest uppercase text-text-3 mb-1">
                    {t("contact_wa")}
                  </span>
                  <span className="block text-base font-medium text-ink">
                    (47) 9751-8960
                  </span>
                </div>
                <ArrowIcon size={16} className="text-text-3 flex-shrink-0" />
              </a>

              <a
                href="https://instagram.com/fernandopegoraro_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-xl glass border-gold/12 transition-all hover:translate-x-1.5 hover:shadow-[0_8px_24px_rgba(196,151,90,.08)] hover:border-gold/25"
              >
                <div className="w-11 h-11 rounded-lg bg-gold/[0.08] flex items-center justify-center text-gold flex-shrink-0">
                  <IgIcon size={22} />
                </div>
                <div className="flex-1">
                  <span className="block text-[11px] tracking-widest uppercase text-text-3 mb-1">
                    {t("contact_ig")}
                  </span>
                  <span className="block text-base font-medium text-ink">
                    @fernandopegoraro_
                  </span>
                </div>
                <ArrowIcon size={16} className="text-text-3 flex-shrink-0" />
              </a>

              <a
                href="https://www.linkedin.com/in/fernandopegoraro"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-xl glass border-gold/12 transition-all hover:translate-x-1.5 hover:shadow-[0_8px_24px_rgba(196,151,90,.08)] hover:border-gold/25"
              >
                <div className="w-11 h-11 rounded-lg bg-gold/[0.08] flex items-center justify-center text-gold flex-shrink-0">
                  <LinkedInIcon size={22} />
                </div>
                <div className="flex-1">
                  <span className="block text-[11px] tracking-widest uppercase text-text-3 mb-1">
                    {t("contact_li")}
                  </span>
                  <span className="block text-base font-medium text-ink">
                    fernandopegoraro
                  </span>
                </div>
                <ArrowIcon size={16} className="text-text-3 flex-shrink-0" />
              </a>

              <div className="pt-5 border-t border-ink/[0.08]">
                <span className="block text-[11px] tracking-widest uppercase text-text-3 mb-1.5">
                  {t("contact_region_label")}
                </span>
                <span className="text-[15px] font-medium text-ink">
                  {t("contact_region_value")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
