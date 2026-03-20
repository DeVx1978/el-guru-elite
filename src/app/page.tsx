"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X, LogIn, Copyright, ArrowUp } from 'lucide-react';
import Link from 'next/link';

// 1. CARGADOR ÉLITE (BALÓN ANIMADO)
const BallLoader = () => (
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', backgroundColor: '#020406', position: 'fixed', top: 0, left: 0, zIndex: 9999 }}>
    <div style={{ width: '60px', height: '60px', border: '4px solid rgba(0, 200, 83, 0.1)', borderTop: '4px solid #00C853', borderRadius: '50%', animation: 'spin 1s linear infinite', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '24px' }}>⚽</div>
    </div>
    <p style={{ color: '#00C853', marginTop: '20px', letterSpacing: '4px', fontSize: '10px', fontWeight: 'bold' }}>CARGANDO EL GURÚ...</p>
    <style jsx global>{` @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } } `}</style>
  </div>
);

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowStats(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const planes = [
    { n: 'Micro', v: '100' }, { n: 'Inicial', v: '250' }, { n: 'Activo', v: '500' }, { n: 'Premium', v: '1000' }, { n: 'Elite', v: '1500' }
  ];

  if (loading) return <BallLoader />;

  return (
    <main style={{ backgroundColor: '#020406', minHeight: '100vh', color: 'white', fontFamily: 'Arial, sans-serif', overflowX: 'hidden' }}>
      
      {/* NAVBAR REFORZADA */}
      <nav style={{ padding: '0 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0, 200, 83, 0.3)', position: 'fixed', top: 0, width: '100%', height: '80px', zIndex: 1000, backgroundColor: '#020406' }}>
        <div style={{ display:'flex', flexDirection:'column' }}>
          <h2 style={{ color: '#eee', margin: 0, fontSize: '1.6rem', fontWeight: 900, fontStyle: 'italic' }}>EL <span style={{ color: '#00C853' }}>GURÚ</span></h2>
          <p style={{ fontSize: '7px', letterSpacing: '4px', color: '#555', margin: 0, fontWeight: 'bold' }}>ÉLITE INVESTMENTS</p>
        </div>

        {/* MENÚ PC (Visible solo en pantallas grandes) */}
        <div className="pc-menu" style={{ display: 'none', gap: '25px', alignItems: 'center' }}>
          <Link href="/quienes-somos" onClick={() => setLoading(true)} style={{ color:'#bbb', textDecoration:'none', fontSize:'11px', fontWeight:600 }}>QUIÉNES SOMOS</Link>
          <button onClick={() => { setLoading(true); window.location.href = '/login'; }} style={{ backgroundColor: 'transparent', color: '#00C853', border: '1px solid #00C853', padding: '10px 22px', borderRadius: '8px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LogIn size={14} /> INICIAR SESIÓN
          </button>
        </div>

        {/* HAMBURGUESA MÓVIL (FORZADA VERDE NEÓN) */}
        <div className="mobile-toggle" style={{ cursor: 'pointer', color: '#00C853', display: 'block' }} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={35} /> : <Menu size={35} />}
        </div>

        {/* MENÚ DESPLEGABLE MÓVIL */}
        {menuOpen && (
          <div style={{ position: 'fixed', top: '80px', left: 0, width: '100vw', height: 'calc(100vh - 80px)', backgroundColor: '#020406', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '40px', zIndex: 999 }}>
            <Link href="/quienes-somos" style={{ color:'white', textDecoration:'none', fontSize: '24px', fontWeight: 'bold' }} onClick={() => setLoading(true)}>QUIÉNES SOMOS</Link>
            <Link href="/login" style={{ color:'#00C853', textDecoration:'none', fontSize: '24px', fontWeight: 'bold' }} onClick={() => setLoading(true)}>INICIAR SESIÓN</Link>
            <button onClick={() => setMenuOpen(false)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#444', padding: '10px 30px', borderRadius: '20px' }}>CERRAR</button>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '120px 20px', backgroundImage: 'radial-gradient(circle, rgba(0,200,83,0.07) 0%, transparent 70%)' }}>
        <h3 style={{ color: '#00C853', letterSpacing: '6px', fontSize: '10px', marginBottom: '20px' }}>INTELIGENCIA DEPORTIVA AVANZADA</h3>
        <h1 style={{ fontSize: 'clamp(3rem, 12vw, 6.5rem)', fontWeight: 900, fontStyle: 'italic', lineHeight: '0.85', marginBottom: '40px', letterSpacing: '-2px' }}>MÁXIMO<br /><span style={{ color: '#00C853' }}>RENDIMIENTO</span></h1>
        <button onClick={() => { setLoading(true); window.location.href = '/registro'; }} style={{ backgroundColor: '#00C853', color: 'black', padding: '20px 55px', borderRadius: '12px', border: 'none', fontWeight: 900, cursor: 'pointer', textTransform: 'uppercase', boxShadow: '0 10px 30px rgba(0,200,83,0.2)' }}>ADQUIRIR MEMBRESÍA</button>
      </section>

      {/* ESTADÍSTICAS (GRID BLINDADO) */}
      <section style={{ padding: '80px 5%', background: '#05070a' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
          {[ { t: 'WIN RATE', v: '78.4%', h: '78%' }, { t: 'PROFIT ANUAL', v: '142%', h: '95%' }, { t: 'ROI MENSUAL', v: '12.5%', h: '60%' } ].map(s => (
            <div key={s.t} style={{ background: '#0a0c10', padding: '40px', borderRadius: '25px', border: '1px solid rgba(255,255,255,0.03)', textAlign: 'center' }}>
              <span style={{ fontSize: '11px', color: '#555', fontWeight: 'bold', letterSpacing: '2px' }}>{s.t}</span>
              <div style={{ height: '140px', width: '16px', background: '#020406', margin: '25px auto', borderRadius: '10px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', bottom: 0, width: '100%', height: showStats ? s.h : '0%', background: 'linear-gradient(to top, #00C853, #00E676)', borderRadius: '10px', transition: 'height 2.5s cubic-bezier(0.17, 0.67, 0.83, 0.67)' }}></div>
              </div>
              <div style={{ fontSize: '32px', fontWeight: 900, color: '#eee' }}>{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MEMBRESÍAS (GRID BLINDADO PARA EVITAR DESORDEN) */}
      <section style={{ padding: '100px 5%', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '60px', fontStyle: 'italic', fontSize: '2.5rem', fontWeight: 900 }}>MEMBRESÍAS ÉLITE</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '25px', maxWidth: '1300px', margin: '0 auto' }}>
          {planes.map(p => (
            <div key={p.n} style={{ background: '#0a0c10', padding: '50px 25px', borderRadius: '25px', border: '1px solid #00C853', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <b style={{ color: '#00C853', letterSpacing: '2px', fontSize: '1.2rem' }}>{p.n}</b>
              <h3 style={{ fontSize: '2.8rem', margin: '25px 0', fontWeight: 900 }}>${p.v}</h3>
              <button onClick={() => { setLoading(true); window.location.href = '/registro'; }} style={{ width: '100%', background: '#00C853', border: 'none', padding: '15px', borderRadius: '10px', fontWeight: 900, cursor:'pointer', textTransform: 'uppercase' }}>SELECCIONAR</button>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER PROFESIONAL CON SALIDA */}
      <footer style={{ padding: '80px 5%', borderTop: '1px solid #111', textAlign: 'center', backgroundColor: '#020406' }}>
          <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} style={{ background: 'none', border: '1px solid #222', color: '#555', padding: '10px 20px', borderRadius: '30px', cursor: 'pointer', marginBottom: '40px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <ArrowUp size={14} /> VOLVER AL INICIO
          </button>
          <div style={{ opacity: 0.3, fontSize: '12px' }}>
            <p>© 2026 EL GURÚ ÉLITE.</p>
            <p>PLATAFORMA DESARROLLADA 100% POR DEVX.</p>
          </div>
      </footer>

      <style jsx global>{`
        body { margin: 0; padding: 0; }
        @media (min-width: 992px) { 
          .pc-menu { display: flex !important; } 
          .mobile-toggle { display: none !important; } 
        }
        @media (max-width: 991px) { 
          .pc-menu { display: none !important; } 
          .mobile-toggle { display: block !important; } 
        }
      `}</style>
    </main>
  );
}