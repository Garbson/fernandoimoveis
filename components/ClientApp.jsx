"use client";
import { LangProvider } from "@/context/LangContext";
import { useEffect } from "react";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import CtaBand from "./CtaBand";
import FaqSection from "./FaqSection";
import FloatWA from "./FloatWA";
import Footer from "./Footer";
import Header from "./Header";
import HeroSection from "./HeroSection";

import PortoBeloSection from "./PortoBeloSection";
import PropertiesSection from "./PropertiesSection";
import ServicesSection from "./ServicesSection";
import StatsSection from "./StatsSection";

export default function ClientApp() {

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    document
      .querySelectorAll(".reveal-section")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <LangProvider>
      {/* Ambient glow orbs */}
      <div
        className="fixed inset-0 pointer-events-none select-none overflow-hidden"
        style={{ zIndex: 0 }}
        aria-hidden
      >
        <div className="glow-orb w-[500px] h-[500px] bg-gold/[0.07] top-[-100px] right-[-100px] animate-glow-pulse" />
        <div
          className="glow-orb w-[600px] h-[600px] bg-verde/[0.05] bottom-[-200px] left-[-150px] animate-glow-pulse"
          style={{ animationDelay: "2.5s" }}
        />
        <div
          className="glow-orb w-[400px] h-[400px] bg-surface-4/50 top-[40%] left-[60%] animate-glow-pulse"
          style={{ animationDelay: "1.2s" }}
        />
      </div>

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
