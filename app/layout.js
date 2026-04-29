import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  title: 'Fernando Pegoraro | Especialista em Investimentos Imobiliários',
  description: 'Especialista em investimentos imobiliários no litoral de Santa Catarina. Lançamentos exclusivos em Itapema e Porto Belo.',
  keywords: 'corretor imóveis Itapema, Porto Belo, Santa Catarina, lançamentos, investimento imobiliário',
  icons: {
    icon: '/images/logo-creme.svg',
    shortcut: '/images/logo-creme.svg',
    apple: '/images/logo-creme.svg',
  },
  openGraph: {
    title: 'Fernando Pegoraro | Investimentos Imobiliários',
    description: 'Especialista em ativos de alta valorização no litoral catarinense.',
    images: ['/images/fp-sofa.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-body bg-creme-3 text-text overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
