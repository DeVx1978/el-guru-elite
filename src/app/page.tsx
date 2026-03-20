"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X, LogIn, Activity, Award, Briefcase, DollarSign, Copyright, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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
    const timer = setTimeout(() => setShowStats(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const m = [{ n: 'Micro', v: '100' }, { n: 'Inicial', v: '250' }, { n: 'Activo', v: '500' }, { n: 'Premium', v: '1000' }, { n: 'Elite', v: '1500' }];

  if (loading) return <BallLoader />;

  return (
    <main style={{ backgroundColor: '#020406', minHeight: '100vh', color: 'white', fontFamily: 'Arial', overflowX: 'hidden', backgroundImage: 'linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url("/guru.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      
      <nav style={{ padding: '15px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0, 200, 83, 0.2)', position: 'fixed', top: 0, width: '100%', zIndex: 1000, backgroundColor: 'rgba(2, 4, 6, 0.98)', backdropFilter: 'blur(10px)' }}>
        <div style={{ display:'flex', flexDirection:'column' }}>
          <h2 style={{ color: '#eee', margin: 0, fontSize: '1.5rem', fontWeight: 900, fontStyle: 'italic' }}>EL <span style={{ color: '#00C853' }}>GURÚ</span></h2>
          <p style={{ fontSize: '7px', letterSpacing: '4px', color: '#555', margin: 0 }}>ÉLITE INVESTMENTS</p>
        </div>

        {/* HAMBURGUESA SIEMPRE VISIBLE EN MÓVIL */}
        <div style={{ cursor: 'pointer', color: '#00C853' }} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={32} /> : <Menu size={32} />}
        </div>

        {menuOpen && (
          <div style={{ position: 'fixed', top: '70px', left: 0, width: '100vw', height: 'calc(100vh - 70px)', backgroundColor: '#020406', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '40px', zIndex: 999 }}>
            <Link href="/quienes-somos" style={{ color:'white', textDecoration:'none', fontSize: '24px', fontWeight: 'bold' }} onClick={() => setLoading(true)}>QUIÉNES SOMOS</Link>
            <Link href="/login" style={{ color:'#00C853', textDecoration:'none', fontSize: '24px', fontWeight: 'bold' }} onClick={() => setLoading(true)}>INICIAR SESIÓN</Link>
            <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: '1px solid #333', color: '#555', padding: '10px 20px', borderRadius: '5px' }}>CERRAR</button>
          </div>
        )}
      </nav>

      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '120px 20px' }}>
        <h3 style={{ color: '#00C853', letterSpacing: '6px', fontSize: '10px', marginBottom: '20px' }}>INTELIGENCIA DEPORTIVA AVANZADA</h3>
        <h1 style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', fontWeight: 900, fontStyle: 'italic', lineHeight: '0.9', marginBottom: '40px' }}>MÁXIMO<br /><span style={{ color: '#00C853' }}>RENDIMIENTO</span></h1>
        <button onClick={() => { setLoading(true); window.location.href = '/registro'; }} style={{ backgroundColor: '#00C853', color: 'black', padding: '20px 50px', borderRadius: '12px', border: 'none', fontWeight: 900, cursor: 'pointer', textTransform: 'uppercase' }}>ADQUIRIR MEMBRESÍA</button>
      </section>

      {/* ESTADÍSTICAS CON ANIMACIÓN DE CARGA */}
      <section style={{ padding: '60px 5%', display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', maxWidth: '1200px', margin: '0 auto' }}>
        {[ { t: 'WIN RATE', v: '78.4%', h: '78%' }, { t: 'PROFIT ANUAL', v: '142%', h: '95%' }, { t: 'ROI MENSUAL', v: '12.5%', h: '60%' } ].map(s => (
          <div key={s.t} style={{ background: 'rgba(10, 12, 16, 0.8)', padding: '30px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', minWidth: '200px' }}>
            <span style={{ fontSize: '11px', color: '#666', fontWeight: 'bold' }}>{s.t}</span>
            <div style={{ height: '120px', width: '15px', background: '#111', margin: '20px auto', borderRadius: '10px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', bottom: 0, width: '100%', height: showStats ? s.h : '0%', background: 'linear-gradient(to top, #00C853, #00E676)', transition: 'height 2s ease-out' }}></div>
            </div>
            <div style={{ fontSize: '26px', fontWeight: 900 }}>{s.v}</div>
          </div>
        ))}
      </section>

      <section id="membresias" style={{ padding: '100px 5%', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '50px', fontStyle: 'italic', fontSize: '2.2rem', fontWeight: 900 }}>MEMBRESÍAS ÉLITE</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          {m.map(p => (
            <div key={p.n} style={{ background: '#0a0c10', padding: '40px 20px', borderRadius: '20px', border: '1px solid #00C853', flex: '1 1 200px', maxWidth: '240px' }}>
              <b style={{ color: '#00C853' }}>{p.n}</b>
              <h3 style={{ fontSize: '2.2rem', margin: '15px 0', fontWeight: 900 }}>${p.v}</h3>
              <button onClick={() => { setLoading(true); window.location.href = '/registro'; }} style={{ width: '100%', background: '#00C853', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 900, cursor:'pointer' }}>SELECCIONAR</button>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ padding: '60px 5%', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', color: '#444', fontSize: '12px' }}>
          <p>© 2026 EL GURÚ ÉLITE. Desarrollada por DeVx.</p>
      </footer>
    </main>
  );
}