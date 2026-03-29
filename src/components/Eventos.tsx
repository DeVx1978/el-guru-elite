"use client";

import React, { useState, useEffect } from 'react';

export default function Eventos() {
  const [timeLeft, setTimeLeft] = useState({ dias: 0, horas: 0, minutos: 0, segundos: 0 });

  useEffect(() => {
    const targetDate = new Date("2026-06-11T18:00:00-06:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) return clearInterval(interval);
      setTimeLeft({
        dias: Math.floor(distance / (1000 * 60 * 60 * 24)),
        horas: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutos: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        segundos: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const counters = [
    { label: 'DÍAS', value: timeLeft.dias },
    { label: 'HORAS', value: timeLeft.horas },
    { label: 'MINUTOS', value: timeLeft.minutos },
    { label: 'SEGUNDOS', value: timeLeft.segundos },
  ];

  return (
    <section id="eventos" className="w-full bg-black py-20 md:py-32 border-t border-[#00C853]/10">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Header de Élite */}
        <div className="text-center mb-16 md:mb-24">
          <p className="text-[#00C853] font-mono text-[10px] tracking-[0.6em] uppercase mb-4 opacity-80">
            PLATAFORMA EL GURU DEPORTIVO: ONLINE
          </p>
          <h2 className="text-white text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-4">
            COPA DEL MUNDO <span className="text-[#00C853] drop-shadow-[0_0_20px_rgba(0,200,83,0.3)]">2026</span>
          </h2>
          <div className="h-[2px] w-24 bg-[#00C853] mx-auto opacity-50"></div>
        </div>

        {/* CONTADOR MAESTRO REFINADO */}
        <div className="flex justify-center items-center gap-2 md:gap-8">
          {counters.map((item, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center flex-1 max-w-[90px] md:max-w-[180px]">
                {/* Caja de Número */}
                <div className="w-full bg-[#080808] border border-[#1a1a1a] py-6 md:py-12 flex flex-col items-center justify-center shadow-2xl relative group hover:border-[#00C853]/40 transition-all">
                  <span className="text-white text-3xl sm:text-5xl md:text-8xl font-black font-mono leading-none tracking-tighter">
                    {item.value.toString().padStart(2, '0')}
                  </span>
                </div>
                {/* Etiqueta Separada (Para evitar que pise el número) */}
                <span className="mt-4 text-[#00C853] font-mono text-[8px] md:text-xs tracking-[0.3em] font-bold uppercase opacity-70">
                  {item.label}
                </span>
              </div>

              {/* Separadores Visibles en Desktop */}
              {index < 3 && (
                <div className="hidden md:flex flex-col gap-3 opacity-20">
                  <div className="w-2 h-2 bg-[#00C853] rounded-full"></div>
                  <div className="w-2 h-2 bg-[#00C853] rounded-full"></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Footer de Sección */}
        <div className="mt-20 text-center">
          <p className="text-gray-700 font-mono text-[10px] md:text-xs tracking-[0.5em] uppercase">
            ESTADIO AZTECA • 11 JUNIO 2026 • 18:00 CST
          </p>
        </div>

      </div>
    </section>
  );
}