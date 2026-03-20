"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X, LogIn, Copyright, ShieldCheck, FileText, Lock, ArrowUp } from 'lucide-react';
import Link from 'next/link';

const BallLoader = () => (
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', backgroundColor: '#020406', position: 'fixed', top: 0, left: 0, zIndex: 9999 }}>
    <div style={{ width: '60px', height: '60px', border: '4px solid rgba(0, 200, 83, 0.1)', borderTop: '4px solid #00C853', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
    <div style={{ position: 'absolute', fontSize: '24px', animation: 'bounce 1s infinite' }}>⚽</div>
    <p style={{ color: '#00C853', marginTop: '20px', letterSpacing: '4px', fontSize: '10px', fontWeight: 'bold' }}>CARGANDO EL GURÚ...</p>
    <style jsx global>{`
      @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      @keyframes bounce { 0%, 100% { transform: translateY(-5px); } 50% { transform: translateY(5px); } }
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
      
      {/* NAVBAR RESPONSIVE REAL */}
      <nav style={{ padding: '0 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0, 200, 83, 0.2)', position: 'fixed', top: 0, width: '100%', height: '80px', zIndex: 1000, backgroundColor: '#020406' }}>
        <div style={{ display:'flex', flexDirection:'column' }}>
          <h2 style={{ color: '#eee', margin: 0, fontSize: '1.5rem', fontWeight: 900, fontStyle: 'italic' }}>EL <span style={{ color: '#00C853' }}>GURÚ</span></h2>
          <p style={{ fontSize: '7px', letterSpacing: '4px', color: '#555', margin: 0 }}>ÉLITE INVESTMENTS</p>
        </div>

        {/* MENÚ PC */}
        <div className="pc-nav" style={{ display: 'none', gap: '25px', alignItems: 'center' }}>
          <Link href="/quienes-somos" onClick={() => setLoading(true)} style={{ color:'#bbb', textDecoration:'none', fontSize:'11px', fontWeight:600 }}>QUIÉNES SOMOS</Link>
          <button onClick={() => { setLoading(true); window.location.href = '/login'; }} style={{ backgroundColor: 'transparent', color: '#00C853', border: '1px solid #00C853', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>INICIAR SESIÓN</button>
        </div>

        {/* HAMBURGUESA MÓVIL */}
        <div className="mobile-toggle" style={{ cursor: 'pointer', color: '#00C853' }} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={35} /> : <Menu size={35} />}
        </div>

        {/* MENÚ DESPLEGABLE */}
        {menuOpen && (
          <div style={{ position: 'fixed', top: '80px', left: 0, width: '100vw', height: 'calc(100vh - 80px)', backgroundColor: '#020406', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '40px', zIndex: 999 }}>
            <Link href="/quienes-somos" style={{ color:'white', textDecoration:'none', fontSize: '24px', fontWeight: 'bold' }} onClick={() => setLoading(true)}>QUIÉNES SOMOS</Link>
            <Link href="/login" style={{ color:'#00C853', textDecoration:'none', fontSize: '24px', fontWeight: 'bold' }} onClick={() => setLoading(true)}>INICIAR SESIÓN</Link>
            <button onClick={() => setMenuOpen(false)} style={{ background: '#111', border: 'none', color: '#555', padding: '10px 30px', borderRadius: '20px' }}>CERRAR</button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 20px' }}>
        <h3 style={{ color: '#00C853', letterSpacing: '6px', fontSize: '10px', marginBottom: '20px' }}>INTELIGENCIA DEPORTIVA AVANZADA</h3>
        <h1 style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', fontWeight: 900, fontStyle: 'italic', lineHeight: '0.9', marginBottom: '40px' }}>MÁXIMO<br /><span style={{ color: '#00C853' }}>RENDIMIENTO</span></h1>
        <button onClick={() => { setLoading(true); window.location.href = '/registro'; }} style={{ backgroundColor: '#00C853', color: 'black', padding: '20px 50px', borderRadius: '12px', border: 'none', fontWeight: 900, cursor: 'pointer', textTransform: 'uppercase' }}>ADQUIRIR MEMBRESÍA</button>
      </section>

      {/* ESTADÍSTICAS DINÁMICAS (3 BARRAS) */}
      <section style={{ padding: '80px 5%', background: '#05070a' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
          {[ { t: 'WIN RATE', v: '78.4%', h: '78%' }, { t: 'PROFIT ANUAL', v: '142%', h: '95%' }, { t: 'ROI MENSUAL', v: '12.5%', h: '60%' } ].map(s => (
            <div key={s.t} style={{ background: '#0a0c10', padding: '40px', borderRadius: '25px', border: '1px solid rgba(255,255,255,0.03)', textAlign: 'center' }}>
              <span style={{ fontSize: '11px', color: '#555', fontWeight: 'bold', letterSpacing: '2px' }}>{s.t}</span>
              <div style={{ height: '120px', width: '15px', background: '#020406', margin: '25px auto', borderRadius: '10px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', bottom: 0, width: '100%', height: showStats ? s.h : '0%', background: 'linear-gradient(to top, #00C853, #00E676)', transition: 'height 2s ease-out' }}></div>
              </div>
              <div style={{ fontSize: '32px', fontWeight: 900 }}>{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MEMBRESÍAS ALINEADAS */}
      <section style={{ padding: '100px 5%', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '60px', fontStyle: 'italic', fontSize: '2rem', fontWeight: 900 }}>MEMBRESÍAS ÉLITE</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', maxWidth: '1300px', margin: '0 auto' }}>
          {planes.map(p => (
            <div key={p.n} style={{ background: '#0a0c10', padding: '45px 20px', borderRadius: '20px', border: '1px solid #00C853', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <b style={{ color: '#00C853', fontSize: '1.2rem' }}>{p.n}</b>
              <h3 style={{ fontSize: '2.5rem', margin: '20px 0', fontWeight: 900 }}>${p.v}</h3>
              <button onClick={() => { setLoading(true); window.location.href = '/registro'; }} style={{ width: '100%', background: '#00C853', border: 'none', padding: '15px', borderRadius: '8px', fontWeight: 900, cursor:'pointer' }}>SELECCIONAR</button>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER COMPLETO CON TYC */}
      <footer style={{ padding: '60px 5%', borderTop: '1px solid #111', textAlign: 'center', backgroundColor: '#020406' }}>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '40px', color: '#444', fontSize: '11px' }}>
            <Link href="/terminos" style={{ textDecoration: 'none', color: 'inherit' }}>Términos</Link>
            <Link href="/privacidad" style={{ textDecoration: 'none', color: 'inherit' }}>Privacidad</Link>
            <Link href="/confidencialidad" style={{ textDecoration: 'none', color: 'inherit' }}>Confidencialidad</Link>
          </div>
          <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} style={{ background: 'none', border: '1px solid #222', color: '#555', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', marginBottom: '30px' }}>↑ VOLVER ARRIBA</button>
          <p style={{ fontSize: '12px', color: '#222' }}>© 2026 EL GURÚ ÉLITE. PLATAFORMA POR DEVX.</p>
      </footer>

      <style jsx global>{`
        @media (min-width: 992px) { .pc-nav { display: flex !important; } .mobile-toggle { display: none !important; } }
        @media (max-width: 991px) { .pc-nav { display: none !important; } .mobile-toggle { display: block !important; } }
      `}</style>
    </main>
  );
}