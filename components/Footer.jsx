'use client';
import Image from 'next/image';
import { useLang } from '@/context/LangContext';
import { WaIcon, IgIcon } from './Icons';

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-ink pt-16">
      <div className="max-w-[1280px] mx-auto px-[clamp(20px,5vw,80px)] pb-12 border-b border-white/[0.06] flex flex-wrap gap-10 justify-between items-start">
        {/* Brand */}
        <div className="flex items-center gap-3 max-w-sm">
          <div className="relative w-12 h-12 bg-creme rounded-lg p-2 flex items-center justify-center flex-shrink-0">
            <Image src="/images/logo-preta.svg" alt="Fernando Pegoraro" fill className="object-contain p-2" />
          </div>
          <div>
            <p className="text-creme font-medium text-sm mb-1">Fernando Pegoraro</p>
            <p className="text-creme/40 text-xs leading-snug">{t('footer_tagline')}</p>
          </div>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-3">
          {['nav_about','nav_services','nav_properties','nav_contact'].map(k => (
            <a key={k} href={`#${k.replace('nav_','')}`}
               className="text-creme/50 hover:text-creme text-xs transition-colors">
              {t(k)}
            </a>
          ))}
        </nav>

        {/* Social */}
        <div className="flex gap-3 items-center">
          {[
            { href:'https://wa.me/554797518960', Icon: WaIcon, label:'WhatsApp' },
            { href:'https://instagram.com/fernandopegoraro_', Icon: IgIcon, label:'Instagram' },
          ].map(({ href, Icon, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
               className="w-10 h-10 border border-white/10 rounded-lg flex items-center justify-center text-creme/50 hover:text-creme hover:border-white/30 hover:-translate-y-0.5 transition-all">
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      <div className="py-5 text-center">
        <p className="text-creme/25 text-xs">
          © {year} Fernando Pegoraro. {t('footer_rights')} {t('footer_creci')}
        </p>
        <a
          href="https://wa.me/5568992490198"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-1 text-[11px] text-creme/20 hover:text-creme/40 transition-colors"
        >
          {t('footer_dev')}
        </a>
      </div>
    </footer>
  );
}
