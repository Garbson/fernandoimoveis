'use client';
import { useCallback, useState } from 'react';
import { LangProvider } from '@/context/LangContext';
import Loader          from './Loader';
import Header          from './Header';
import SunsetLayer     from './SunsetLayer';
import HeroSection     from './HeroSection';
import StatsSection    from './StatsSection';
import AboutSection    from './AboutSection';
import ServicesSection from './ServicesSection';
import PortoBeloSection from './PortoBeloSection';
import PropertiesSection from './PropertiesSection';
import CtaBand         from './CtaBand';
import FaqSection      from './FaqSection';
import ContactSection  from './ContactSection';
import Footer          from './Footer';
import FloatWA         from './FloatWA';

export default function ClientApp() {
  const [loaded, setLoaded] = useState(false);
  const onLoaderDone = useCallback(() => setLoaded(true), []);

  return (
    <LangProvider>
      {/* Pôr do sol fixo atrás de todo o site */}
      <SunsetLayer />

      <Loader onDone={onLoaderDone} />
      <Header />
      <main className="relative" style={{ zIndex: 1 }}>
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <ServicesSection />
        <PortoBeloSection />
        <PropertiesSection />
        <CtaBand />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatWA />
    </LangProvider>
  );
}
