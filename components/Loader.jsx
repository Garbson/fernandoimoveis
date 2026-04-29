'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Loader({ onDone }) {
  const ref = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      ref.current?.classList.add('done');
      setTimeout(() => {
        ref.current && (ref.current.style.display = 'none');
        onDone?.();
      }, 800);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div
      ref={ref}
      id="loader"
      className="fixed inset-0 bg-ink z-[9000] flex items-center justify-center flex-col"
    >
      <div className="loader-logo relative w-[clamp(150px,24vw,260px)] h-[clamp(64px,10vw,110px)]">
        <Image src="/images/logo-creme.svg" alt="Fernando Pegoraro" fill className="object-contain" priority />
      </div>
      <div className="loader-bar w-40 h-px bg-white/10 overflow-hidden rounded mt-6 mb-4">
        <span />
      </div>
      <p className="loader-label text-[11px] tracking-[0.3em] uppercase text-creme/40 font-body">
        Fernando Pegoraro
      </p>
    </div>
  );
}
