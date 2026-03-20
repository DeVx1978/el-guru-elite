"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X, LogIn, Copyright } from 'lucide-react';
import Link from 'next/link';

const BallLoader = () => (
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', backgroundColor: '#020406', position: 'fixed', top: 0, left: 0, zIndex: 9999 }}>
    <div style={{ width: '60px', height: '60px', border: '4px solid rgba(0, 200, 83, 0.1)', borderTop: '4px solid #00C853', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
    <div style={{ position: 'absolute', fontSize: '24px', animation: 'bounce 1s infinite' }}>⚽</div>
    <p style={{ color: '#00C853', marginTop: '20px', letterSpacing: '4px', fontSize: '10px', fontWeight: 'bold' }}>CARGANDO...</p>
    <style jsx global>{`
      @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      @keyframes bounce { 0%, 100% { transform: translate(-50%, -60%); } 50% { transform: translate(-50%, -40%); } }
    `}</style>
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

  const planes = [
    { n: 'Micro', v: '100' }, { n: 'Inicial', v: '250' }, { n: 'Activo', v: '500' }, { n: 'Premium', v: '1000' }, { n: 'Elite', v: '1500' }
  ];

  if (loading) return <BallLoader />;

  return (
    <main style={{ backgroundColor: '#020406', minHeight: '100vh', color: 'white', fontFamily: 'Arial, sans-serif', overflowX: 'hidden' }}>
      
      {/* NAVBAR MEJORADO */}
      <nav style={{ padding: '15px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0, 200, 83, 0.2)', position: 'fixed', top: 0, width: '100%', zIndex: 1000, backgroundColor: 'rgba(2, 4, 6, 0.95)', backdropFilter: 'blur(10px)' }}>
        <div style={{ display:'flex', flexDirection:'column' }}>
          <h2 style={{ color: '#eee', margin: 0, fontSize: '1.5rem', fontWeight: 900, fontStyle: 'italic' }}>EL <span style={{ color: '#00C853' }}>GURÚ</span></h2>
          <p style={{ fontSize: '7px', letterSpacing: '4px', color: '#555', margin: 0 }}>ÉLITE INVESTMENTS</p>
        </div>

        {/* PC */}
        <div className="pc-nav" style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
          <Link href="/quienes-somos" onClick={() => setLoading(true)} style={{ color:'#bbb', textDecoration:'none', fontSize:'11px', fontWeight:600 }}>QUIÉNES SOMOS</Link>
          <button onClick={() => { setLoading(true); window.location.href = '/login'; }} style={{ backgroundColor: 'transparent', color: '#00C853', border: '1px solid #00C853', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontSize: '10px', fontWeight: 'bold' }}>
            INICIAR SESIÓN
          </button>
        </div>

        {/* MOBILE HAMBURGER (FORZADO VERDE) */}
        <div className="mobile-toggle" style={{ cursor: 'pointer', color: '#00C853', display: 'none' }} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </div>

        {menuOpen && (
          <div style={{ position: 'fixed', top: '70px', left: 0, width: '100%', height: 'calc(100vh - 70px)', backgroundColor: '#020406', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '30px', zIndex: 999 }}>
            <Link href="/quienes-somos" style={{ color:'white', textDecoration:'none', fontSize: '20px' }} onClick={() => setLoading(true)}>QUIÉNES SOMOS</Link>
            <Link href="/login" style={{ color:'#00C853', textDecoration:'none', fontSize: '20px', fontWeight: 'bold' }} onClick={() => setLoading(true)}>INICIAR SESIÓN</Link>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 20px', backgroundImage: 'radial-gradient(circle at center, rgba(0,200,83,0.05) 0%, transparent 70%)' }}>
        <h3 style={{ color: '#00C853', letterSpacing: '5px', fontSize: '9px', marginBottom: '15px' }}>INTELIGENCIA DEPORTIVA AVANZADA</h3>
        <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', fontWeight: 900, fontStyle: 'italic', lineHeight: '1', marginBottom: '35px' }}>MÁXIMO<br /><span style={{ color: '#00C853' }}>RENDIMIENTO</span></h1>
        <button onClick={() => { setLoading(true); window.location.href = '/registro'; }} style={{ backgroundColor: '#00C853', color: 'black', padding: '18px 45px', borderRadius: '10px', border: 'none', fontWeight: 900, cursor: 'pointer' }}>ADQUIRIR MEMBRESÍA</button>
      </section>

      {/* ESTADÍSTICAS ANIMADAS */}
      <section style={{ padding: '60px 5%', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', maxWidth: '1100px', margin: '0 auto' }}>
        {[ { t: 'WIN RATE', v: '78.4%', h: '78%' }, { t: 'PROFIT', v: '+142%', h: '95%' }, { t: 'ROI', v: '12.5%', h: '60%' } ].map(s => (
          <div key={s.t} style={{ background: '#0a0c10', padding: '25px', borderRadius: '20px', border: '1px solid #111', flex: '1 1 200px', textAlign: 'center' }}>
            <p style={{ fontSize: '10px', color: '#444', fontWeight: 'bold', marginBottom: '15px' }}>{s.t}</p>
            <div style={{ height: '100px', width: '12px', background: '#020406', margin: '0 auto 15px', borderRadius: '10px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', bottom: 0, width: '100%', height: showStats ? s.h : '0%', background: '#00C853', transition: 'height 2s ease-out' }}></div>
            </div>
            <p style={{ fontSize: '22px', fontWeight: 900 }}>{s.v}</p>
          </div>
        ))}
      </section>

      {/* MEMBRESÍAS (REJILLA CORREGIDA) */}
      <section style={{ padding: '80px 5%', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '50px', fontStyle: 'italic', fontSize: '2rem', fontWeight: 900 }}>MEMBRESÍAS ÉLITE</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          {planes.map(p => (
            <div key={p.n} style={{ background: '#0a0c10', padding: '40px 20px', borderRadius: '20px', border: '1px solid #00C853', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <b style={{ color: '#00C853', fontSize: '14px' }}>{p.n}</b>
              <h3 style={{ fontSize: '2.5rem', margin: '20px 0', fontWeight: 900 }}>${p.v}</h3>
              <button onClick={() => { setLoading(true); window.location.href = '/registro'; }} style={{ width: '100%', background: '#00C853', color: 'black', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 900, cursor:'pointer' }}>SELECCIONAR</button>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER LIMPIO */}
      <footer style={{ padding: '50px 5%', borderTop: '1px solid #111', textAlign: 'center', color: '#444' }}>
          <p style={{ fontSize: '12px', marginBottom: '5px' }}>© 2026 EL GURÚ ÉLITE.</p>
          <p style={{ fontSize: '10px' }}>Desarrollada por DeVx.</p>
      </footer>

      <style jsx global>{`
        @media (min-width: 768px) { .pc-nav { display: flex !important; } .mobile-toggle { display: none !important; } }
        @media (max-width: 767px) { .pc-nav { display: none !important; } .mobile-toggle { display: block !important; } }
      `}</style>
    </main>
  );
}