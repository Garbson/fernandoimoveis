import { Plus_Jakarta_Sans, Syne } from 'next/font/google';
import './globals.css';

const syne = Syne({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
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
    icon: '/images/logoBranca.webp',
    shortcut: '/images/logoBranca.webp',
    apple: '/images/logoBranca.webp',
  },
  openGraph: {
    title: 'Fernando Pegoraro | Investimentos Imobiliários',
    description: 'Especialista em ativos de alta valorização no litoral catarinense.',
    images: ['/images/fp-sofa.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${syne.variable} ${jakarta.variable}`}>
      <body className="font-body bg-surface text-text overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
