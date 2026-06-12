import { useLang } from "@/context/LangContext";
import { IgIcon, WaIcon } from "./Icons";

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-ink pt-16">
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)] pb-12 border-b border-white/[0.06] flex flex-wrap gap-10 justify-between items-start">
        <div className="flex items-center gap-3 max-w-sm">
          <div className="relative w-12 h-12 bg-white/10 rounded-lg p-2 flex items-center justify-center flex-shrink-0">
            <img
              src="/images/logoBranca.webp"
              alt="Fernando Pegoraro"
              className="absolute inset-0 w-full h-full object-contain p-2"
            />
          </div>
          <div>
            <p className="text-white font-medium text-sm mb-1">
              Fernando Pegoraro
            </p>
            <p className="text-white/40 text-xs leading-snug">
              {t("footer_tagline")}
            </p>
          </div>
        </div>

        <nav className="flex flex-col gap-3">
          {[
            { key: "nav_about", href: "#sobre" },
            { key: "nav_services", href: "#servicos" },
            { key: "nav_properties", href: "#empreendimentos" },
            { key: "nav_contact", href: "#contato" },
          ].map(({ key, href }) => (
            <a
              key={key}
              href={href}
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelector(href);
                if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
              }}
              className="text-white/50 hover:text-white text-xs transition-colors"
            >
              {t(key)}
            </a>
          ))}
        </nav>

        <div className="flex gap-3 items-center">
          {[
            {
              href: "https://wa.me/554797518960",
              Icon: WaIcon,
              label: "WhatsApp",
            },
            {
              href: "https://instagram.com/fernandopegoraro_",
              Icon: IgIcon,
              label: "Instagram",
            },
          ].map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-10 h-10 border border-white/10 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 hover:-translate-y-0.5 transition-all"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      <div className="py-5 text-center">
        <p className="text-white/25 text-xs">
          © {year} Fernando Pegoraro. {t("footer_rights")} {t("footer_creci")}
        </p>
        <a
          href="https://wa.me/5568992490198"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-1 text-[11px] text-white/20 hover:text-white/40 transition-colors"
        >
          {t("footer_dev")}
        </a>
      </div>
    </footer>
  );
}
