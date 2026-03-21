"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X, LogIn, Shield, BarChart3, PieChart, Activity, Globe, Lock, FileText, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// CARGADOR INICIAL
const BallLoader = () => (
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', backgroundColor: '#020406', position: 'fixed', top: 0, left: 0, zIndex: 9999 }}>
    <div style={{ width: '60px', height: '60px', border: '4px solid rgba(0, 200, 83, 0.1)', borderTop: '4px solid #00C853', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
    <style jsx global>{` @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } } `}</style>
  </div>
);

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowStats(true), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <BallLoader />;

  return (
    <main style={{ backgroundColor: '#020406', minHeight: '100vh', color: 'white', fontFamily: 'Inter, sans-serif', overflowX: 'hidden' }}>
      
      {/* NAVBAR: LOGO IZQUIERDA + HAMBURGUESA DERECHA */}
      <nav style={{ padding: '0 6%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0, 200, 83, 0.3)', position: 'fixed', top: 0, width: '100%', height: '90px', zIndex: 1000, backgroundColor: '#020406' }}>
        
        {/* LOGO IMPONENTE */}
        <div style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }} onClick={() => window.location.href = '/'}>
          <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-1px', fontStyle: 'italic', color: '#FFF', lineHeight: '1' }}>
            EL <span style={{ color: '#00C853' }}>GURÚ</span>
          </h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '9px', letterSpacing: '3px', fontWeight: 800, color: '#00C853', textTransform: 'uppercase' }}>
            ÉLITE INVESTMENTS
          </p>
        </div>

        {/* HAMBURGUESA (UBICACIÓN EXACTA) */}
        <div style={{ cursor: 'pointer', color: '#00C853' }} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={38} /> : <Menu size={38} />}
        </div>

        {/* DESPLEGABLE: 3 SECCIONES ORDENADAS */}
        {menuOpen && (
          <div style={{ position: 'fixed', top: '90px', left: 0, width: '100vw', height: 'calc(100vh - 90px)', backgroundColor: '#020406', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '40px', zIndex: 999 }}>
            <Link href="/quienes-somos" style={{ color: '#FFF', textDecoration: 'none', fontSize: '24px', fontWeight: 800 }} onClick={() => setLoading(true)}>1. QUIÉNES SOMOS</Link>
            <Link href="/proyecto-guru" style={{ color: '#FFF', textDecoration: 'none', fontSize: '24px', fontWeight: 800 }} onClick={() => setLoading(true)}>2. PROYECTO GURÚ</Link>
            <Link href="/proyecto-inversionistas" style={{ color: '#FFF', textDecoration: 'none', fontSize: '24px', fontWeight: 800 }} onClick={() => setLoading(true)}>3. PROYECTO INVERSIONISTAS</Link>
            <button onClick={() => setMenuOpen(false)} style={{ marginTop: '30px', background: 'rgba(255,255,255,0.05)', border: 'none', color: '#555', padding: '12px 40px', borderRadius: '30px', fontSize: '12px' }}>CERRAR MENÚ</button>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section style={{ height: '85vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 8%' }}>
        <h2 style={{ color: '#00C853', fontSize: '12px', fontWeight: 800, letterSpacing: '8px', marginBottom: '25px', textTransform: 'uppercase' }}>Protocolo de Alto Nivel</h2>
        <h1 style={{ fontSize: 'clamp(3rem, 12vw, 7rem)', fontWeight: 900, fontStyle: 'italic', lineHeight: '0.85', margin: '0 0 45px 0', letterSpacing: '-3px' }}>
          MÁXIMO<br /><span style={{ color: '#00C853' }}>RENDIMIENTO</span>
        </h1>
        
        {/* ACCESO SOCIOS (NUEVA SECCIÓN REQUERIDA) */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          <button onClick={() => { setLoading(true); window.location.href = '/unete'; }} style={{ backgroundColor: '#00C853', color: '#000', padding: '22px 50px', borderRadius: '14px', border: 'none', fontWeight: 900, cursor: 'pointer', fontSize: '14px' }}>
            ADQUIRIR MEMBRESÍA
          </button>
          <button onClick={() => { setLoading(true); window.location.href = '/login'; }} style={{ backgroundColor: 'transparent', color: '#FFF', padding: '22px 50px', borderRadius: '14px', border: '2px solid #333', fontWeight: 800, cursor: 'pointer', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            ACCESO SOCIOS <ChevronRight size={18} />
          </button>
        </div>
      </section>

      {/* ESTADÍSTICAS INTERACTIVAS (BARRAS MÚLTIPLES) */}
      <section style={{ padding: '100px 6%', background: '#05070a' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', maxWidth: '1200px', margin: '0 auto' }}>
          
          {[
            { label: 'RENDIMIENTO MENSUAL', color: '#00C853', bars: [40, 65, 50, 85, 78] },
            { label: 'PROFIT ACUMULADO', color: '#FFF', bars: [30, 45, 90, 70, 95] },
            { label: 'EFECTIVIDAD DEPORTIVA', color: '#00C853', bars: [60, 55, 80, 75, 82] }
          ].map((stat, idx) => (
            <div key={idx} style={{ background: '#0a0c10', padding: '40px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '2px', color: '#555', marginBottom: '30px' }}>{stat.label}</p>
              
              {/* DISEÑO DE BARRAS INTERACTIVAS */}
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '120px', gap: '8px' }}>
                {stat.bars.map((height, i) => (
                  <div key={i} style={{ flex: 1, background: '#111', borderRadius: '4px', position: 'relative', height: '100%' }}>
                    <div style={{ 
                      position: 'absolute', 
                      bottom: 0, 
                      width: '100%', 
                      height: showStats ? `${height}%` : '0%', 
                      background: stat.color, 
                      borderRadius: '4px',
                      transition: `height 1.5s ease-out ${i * 0.1}s`,
                      boxShadow: stat.color === '#00C853' ? '0 0 15px rgba(0, 200, 83, 0.3)' : 'none'
                    }}></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MEMBRESÍAS ALINEADAS */}
      <section style={{ padding: '100px 6%', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 900, fontStyle: 'italic', marginBottom: '60px' }}>MEMBRESÍAS ÉLITE</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', maxWidth: '1300px', margin: '0 auto' }}>
          {[
            { n: 'Micro', v: '100' }, { n: 'Inicial', v: '250' }, { n: 'Activo', v: '500' }, { n: 'Premium', v: '1000' }, { n: 'Elite', v: '1500' }
          ].map(p => (
            <div key={p.n} style={{ background: '#0a0c10', padding: '50px 20px', borderRadius: '24px', border: '1px solid #00C853' }}>
              <span style={{ color: '#00C853', fontWeight: 800, letterSpacing: '2px' }}>{p.n}</span>
              <h3 style={{ fontSize: '2.8rem', margin: '25px 0', fontWeight: 900 }}>${p.v}</h3>
              <button onClick={() => { setLoading(true); window.location.href = '/registro'; }} style={{ width: '100%', background: '#00C853', color: '#000', border: 'none', padding: '16px', borderRadius: '12px', fontWeight: 900, cursor: 'pointer' }}>SELECCIONAR</button>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER (SIN BOTÓN DE VOLVER ARRIBA) */}
      <footer style={{ padding: '80px 6%', borderTop: '1px solid #111', textAlign: 'center', backgroundColor: '#020406' }}>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '30px', marginBottom: '40px', color: '#555', fontSize: '12px', fontWeight: 700 }}>
          <Link href="/terminos" style={{ textDecoration: 'none', color: 'inherit' }}>Términos de Servicio</Link>
          <Link href="/privacidad" style={{ textDecoration: 'none', color: 'inherit' }}>Política de Privacidad</Link>
          <Link href="/confidencialidad" style={{ textDecoration: 'none', color: 'inherit' }}>Confidencialidad</Link>
        </div>
        <div style={{ opacity: 0.2 }}>
          <p style={{ fontSize: '12px', margin: 0 }}>© 2026 EL GURÚ ÉLITE.</p>
          <p style={{ fontSize: '10px', marginTop: '5px' }}>INGENIERÍA DIGITAL POR DEVX.</p>
        </div>
      </footer>

      <style jsx global>{`
        body { margin: 0; padding: 0; overflow-x: hidden; }
        * { box-sizing: border-box; }
      `}</style>
    </main>
  );
}