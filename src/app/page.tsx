"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X, LogIn, Copyright, ShieldCheck, FileText, Lock, BarChart3, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

const BallLoader = () => (
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', backgroundColor: '#020406', position: 'fixed', top: 0, left: 0, zIndex: 9999 }}>
    <div style={{ width: '60px', height: '60px', border: '4px solid rgba(0, 200, 83, 0.1)', borderTop: '4px solid #00C853', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
    <div style={{ position: 'absolute', fontSize: '24px', animation: 'bounce 1s infinite' }}>⚽</div>
    <style jsx global>{` @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } } @keyframes bounce { 0%, 100% { transform: translateY(-5px); } 50% { transform: translateY(5px); } } `}</style>
  </div>
);

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => { setTimeout(() => setShowStats(true), 800); }, []);

  if (loading) return <BallLoader />;

  return (
    <main style={{ backgroundColor: '#020406', minHeight: '100vh', color: 'white', fontFamily: 'Arial, sans-serif', overflowX: 'hidden' }}>
      
      {/* NAVBAR RESPONSIVE BLINDADA */}
      <nav style={{ padding: '0 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0, 200, 83, 0.2)', position: 'fixed', top: 0, width: '100%', height: '80px', zIndex: 1000, backgroundColor: '#020406' }}>
        <div style={{ cursor: 'pointer' }} onClick={() => window.location.reload()}>
          <h2 style={{ color: '#eee', margin: 0, fontSize: '1.5rem', fontWeight: 900, fontStyle: 'italic' }}>EL <span style={{ color: '#00C853' }}>GURÚ</span></h2>
          <p style={{ fontSize: '7px', letterSpacing: '4px', color: '#555', margin: 0 }}>ÉLITE INVESTMENTS</p>
        </div>

        {/* MENÚ PC */}
        <div className="pc-nav" style={{ display: 'none', gap: '20px', alignItems: 'center' }}>
          <Link href="/quienes-somos" style={{ color:'#bbb', textDecoration:'none', fontSize:'11px' }}>QUIÉNES SOMOS</Link>
          <Link href="/estadisticas" style={{ color:'#bbb', textDecoration:'none', fontSize:'11px' }}>ESTADÍSTICAS</Link>
          <Link href="/panel" style={{ color:'#bbb', textDecoration:'none', fontSize:'11px' }}>PANEL</Link>
          <button onClick={() => { setLoading(true); window.location.href = '/login'; }} style={{ background: 'transparent', color: '#00C853', border: '1px solid #00C853', padding: '8px 15px', borderRadius: '5px', fontSize: '10px', fontWeight: 'bold' }}>LOGIN</button>
        </div>

        {/* HAMBURGUESA MÓVIL (VERDE NEÓN) */}
        <div className="mobile-toggle" style={{ color: '#00C853', cursor: 'pointer', zIndex: 1001 }} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={35} /> : <Menu size={35} />}
        </div>

        {/* MENÚ DESPLEGABLE CON LAS 4 PESTAÑAS */}
        {menuOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: '#020406', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '35px', zIndex: 1000 }}>
            <Link href="/quienes-somos" style={{ color:'white', textDecoration:'none', fontSize: '22px', fontWeight: 'bold' }} onClick={() => setLoading(true)}>QUIÉNES SOMOS</Link>
            <Link href="/estadisticas" style={{ color:'white', textDecoration:'none', fontSize: '22px', fontWeight: 'bold' }} onClick={() => setLoading(true)}>ESTADÍSTICAS</Link>
            <Link href="/panel" style={{ color:'white', textDecoration:'none', fontSize: '22px', fontWeight: 'bold' }} onClick={() => setLoading(true)}>PANEL DE CONTROL</Link>
            <Link href="/login" style={{ color:'#00C853', textDecoration:'none', fontSize: '22px', fontWeight: 'bold' }} onClick={() => setLoading(true)}>INICIAR SESIÓN</Link>
            <button onClick={() => setMenuOpen(false)} style={{ marginTop: '20px', background: '#111', border: 'none', color: '#444', padding: '10px 30px', borderRadius: '20px' }}>VOLVER</button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section style={{ height: '95vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 20px', backgroundImage: 'radial-gradient(circle, rgba(0,200,83,0.05) 0%, transparent 70%)' }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 10vw, 5.5rem)', fontWeight: 900, fontStyle: 'italic', lineHeight: '0.9', marginBottom: '35px' }}>MÁXIMO<br /><span style={{ color: '#00C853' }}>RENDIMIENTO</span></h1>
        <button onClick={() => { setLoading(true); window.location.href = '/registro'; }} style={{ backgroundColor: '#00C853', color: 'black', padding: '18px 45px', borderRadius: '12px', border: 'none', fontWeight: 900, cursor: 'pointer' }}>ADQUIRIR MEMBRESÍA</button>
      </section>

      {/* ESTADÍSTICAS CON 3 BARRAS DINÁMICAS */}
      <section style={{ padding: '60px 5%', background: '#05070a', borderTop: '1px solid #111' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', maxWidth: '1100px', margin: '0 auto' }}>
          {[ { t: 'WIN RATE', v: '78.4%', h: '78%' }, { t: 'PROFIT ANUAL', v: '142%', h: '95%' }, { t: 'ROI MENSUAL', v: '12.5%', h: '60%' } ].map(s => (
            <div key={s.t} style={{ background: '#0a0c10', padding: '30px', borderRadius: '20px', textAlign: 'center', border: '1px solid #111' }}>
              <div style={{ height: '100px', width: '12px', background: '#020406', margin: '0 auto 15px', borderRadius: '10px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', bottom: 0, width: '100%', height: showStats ? s.h : '0%', background: '#00C853', transition: 'height 2s ease' }}></div>
              </div>
              <div style={{ fontSize: '26px', fontWeight: 900 }}>{s.v}</div>
              <div style={{ fontSize: '10px', color: '#444', fontWeight: 'bold' }}>{s.t}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MEMBRESÍAS ALINEADAS PROFESIONALMENTE */}
      <section style={{ padding: '80px 5%', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '50px', fontWeight: 900, fontStyle: 'italic' }}>MEMBRESÍAS ÉLITE</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', maxWidth: '1300px', margin: '0 auto' }}>
          {planes.map(p => (
            <div key={p.n} style={{ background: '#0a0c10', padding: '40px 20px', borderRadius: '20px', border: '1px solid #00C853' }}>
              <b style={{ color: '#00C853' }}>{p.n}</b>
              <h3 style={{ fontSize: '2.5rem', margin: '20px 0', fontWeight: 900 }}>${p.v}</h3>
              <button onClick={() => { setLoading(true); window.location.href = '/registro'; }} style={{ width: '100%', background: '#00C853', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 900, color: 'black' }}>SELECCIONAR</button>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER CON TODA LA INFORMACIÓN LEGAL */}
      <footer style={{ padding: '60px 5%', borderTop: '1px solid #111', textAlign: 'center', backgroundColor: '#020406', color: '#444' }}>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '30px', fontSize: '11px', fontWeight: 'bold' }}>
            <Link href="/terminos" style={{ color: 'inherit', textDecoration: 'none' }}>Términos de Servicio</Link>
            <Link href="/privacidad" style={{ color: 'inherit', textDecoration: 'none' }}>Política de Privacidad</Link>
            <Link href="/confidencialidad" style={{ color: 'inherit', textDecoration: 'none' }}>Confidencialidad</Link>
          </div>
          <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} style={{ background: 'none', border: '1px solid #222', color: '#555', padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', marginBottom: '30px' }}>↑ VOLVER AL INICIO</button>
          <p style={{ fontSize: '10px' }}>© 2026 EL GURÚ ÉLITE. PLATAFORMA DESARROLLADA POR DEVX.</p>
      </footer>

      <style jsx global>{`
        @media (min-width: 992px) { .pc-nav { display: flex !important; } .mobile-toggle { display: none !important; } }
        @media (max-width: 991px) { .pc-nav { display: none !important; } .mobile-toggle { display: block !important; } }
      `}</style>
    </main>
  );
}

const planes = [{ n: 'Micro', v: '100' }, { n: 'Inicial', v: '250' }, { n: 'Activo', v: '500' }, { n: 'Premium', v: '1000' }, { n: 'Elite', v: '1500' }];