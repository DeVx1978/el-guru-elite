"use client";
import React, { useState } from 'react';
import { Menu, X, LogIn, Activity, Award, Briefcase, DollarSign, Copyright } from 'lucide-react';
import Link from 'next/link';

const BallLoader = () => (
  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#020406' }}>
    <div style={{ width: '50px', height: '50px', border: '4px solid rgba(0, 200, 83, 0.1)', borderTop: '4px solid #00C853', borderRadius: '50%', animation: 'spin 1s linear infinite', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '20px' }}>⚽</div>
    </div>
    <p style={{ color: '#00C853', marginTop: '20px', letterSpacing: '3px', fontSize: '10px', fontWeight: 'bold' }}>CARGANDO EL GURÚ...</p>
    <style jsx global>{`
      @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    `}</style>
  </div>
);

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLinkClick = () => {
    setLoading(true);
    setMenuOpen(false);
    setTimeout(() => setLoading(false), 1000); 
  };

  const m = [
    { n: 'Micro', v: '100' }, { n: 'Inicial', v: '250' }, { n: 'Activo', v: '500' }, { n: 'Premium', v: '1000' }, { n: 'Elite', v: '1500' }
  ];

  if (loading) return <BallLoader />;

  return (
    <main id="proyecto" style={{ backgroundColor: '#020406', minHeight: '100vh', color: 'white', fontFamily: 'Arial', overflowX: 'hidden', backgroundImage: 'linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url("/guru.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      
      <nav style={{ padding: '15px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', position: 'fixed', top: 0, width: '100%', zIndex: 1000, backgroundColor: 'rgba(2, 4, 6, 0.95)', backdropFilter: 'blur(10px)' }}>
        <div style={{ display:'flex', flexDirection:'column' }}>
          <h2 style={{ color: '#eee', margin: 0, fontSize: '1.5rem', fontWeight: 900, fontStyle: 'italic' }}>EL <span style={{ color: '#00C853' }}>GURÚ</span></h2>
          <p style={{ fontSize: '7px', letterSpacing: '4px', color: '#555', margin: 0 }}>ÉLITE INVESTMENTS</p>
        </div>

        <div className="pc-menu" style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
          <Link href="/quienes-somos" onClick={handleLinkClick} style={{ color:'#bbb', textDecoration:'none', fontSize:'11px', fontWeight:600, letterSpacing:'1px' }}>QUIÉNES SOMOS</Link>
          <Link href="#proyecto" style={{ color:'#bbb', textDecoration:'none', fontSize:'11px', fontWeight:600, letterSpacing:'1px' }}>PROYECTO</Link>
          <Link href="/inversionistas" onClick={handleLinkClick} style={{ color:'#bbb', textDecoration:'none', fontSize:'11px', fontWeight:600, letterSpacing:'1px' }}>INVERSIONISTAS</Link>
          <button onClick={() => { handleLinkClick(); window.location.href = '/login'; }} style={{ backgroundColor: 'transparent', color: '#00C853', border: '1px solid #00C853', padding: '8px 18px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LogIn size={14} /> INICIAR SESIÓN
          </button>
        </div>

        <div className="mobile-menu-icon" style={{ display: 'none', cursor: 'pointer', color: '#00C853' }} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </div>

        {menuOpen && (
          <div style={{ position: 'absolute', top: '100%', left: 0, width: '100%', backgroundColor: '#0a0c10', padding: '30px 5%', display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'center', borderBottom: '2px solid #00C853' }}>
            <Link href="/quienes-somos" style={{ color:'white', textDecoration:'none' }} onClick={handleLinkClick}>QUIÉNES SOMOS</Link>
            <Link href="#proyecto" style={{ color:'white', textDecoration:'none' }} onClick={handleLinkClick}>PROYECTO</Link>
            <Link href="/inversionistas" style={{ color:'white', textDecoration:'none' }} onClick={handleLinkClick}>INVERSIONISTAS</Link>
            <Link href="/login" style={{ color:'#00C853', fontWeight:'bold' }} onClick={handleLinkClick}>INICIAR SESIÓN</Link>
          </div>
        )}
      </nav>

      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '120px 20px' }}>
        <h3 style={{ color: '#00C853', letterSpacing: '5px', fontSize: '10px', marginBottom: '20px' }}>INTELIGENCIA DEPORTIVA AVANZADA</h3>
        <h1 style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', fontWeight: 900, fontStyle: 'italic', lineHeight: '0.9', marginBottom: '25px' }}>MÁXIMO<br /><span style={{ color: '#00C853' }}>RENDIMIENTO</span></h1>
        <p style={{ color: '#aaa', maxWidth: '500px', marginBottom: '40px', lineHeight: '1.6' }}>Gestión de capital privado basada en modelos de probabilidad de élite. Resultados verificados para inversores de alto nivel.</p>
        <button onClick={() => { handleLinkClick(); window.location.href = '/registro'; }} style={{ backgroundColor: '#00C853', color: 'black', padding: '18px 45px', borderRadius: '10px', border: 'none', fontWeight: 900, cursor: 'pointer', letterSpacing: '1px' }}>ADQUIRIR MEMBRESÍA</button>
      </section>

      <section style={{ padding: '60px 5%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        {[ { t: 'CRECIMIENTO ANUAL', v: '+142%', h: '70%' }, { t: 'WIN RATE GLOBAL', v: '78.4%', h: '60%' }, { t: 'PROFIT MENSUAL', v: '$12,400', h: '85%' } ].map(s => (
          <div key={s.t} style={{ background: 'rgba(10, 12, 16, 0.8)', padding: '30px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
            <span style={{ fontSize: '10px', color: '#555', fontWeight: 'bold', letterSpacing: '1px' }}>{s.t}</span>
            <div style={{ height: '100px', width: '20px', background: 'rgba(255,255,255,0.02)', margin: '20px auto', borderRadius: '10px', position: 'relative' }}>
              <div style={{ position: 'absolute', bottom: 0, width: '100%', height: s.h, background: '#00C853', borderRadius: '10px' }}></div>
            </div>
            <div style={{ fontSize: '24px', fontWeight: 900 }}>{s.v}</div>
          </div>
        ))}
      </section>

      <section id="membresias" style={{ padding: '100px 5%', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '50px', fontStyle: 'italic', fontSize: '2rem' }}>MEMBRESÍAS DE INVERSIÓN ÉLITE</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
          {m.map(p => (
            <div key={p.n} style={{ background: '#0a0c10', padding: '40px 20px', borderRadius: '15px', border: '1px solid #00C853', flex: '1 1 200px', maxWidth: '230px' }}>
              <b style={{ color: '#00C853' }}>{p.n}</b>
              <h3 style={{ fontSize: '2rem', margin: '15px 0' }}>${p.v}</h3>
              <button style={{ width: '100%', background: '#00C853', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor:'pointer' }}>SELECCIONAR</button>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ padding: '80px 5%', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '40px', color: '#666', fontSize: '12px' }}>
        <div style={{ minWidth: '250px' }}>
          <b style={{ color: '#eee' }}>© 2026 EL GURÚ ÉLITE.</b>
          <p>Todos los derechos reservados. <br/>Plataforma desarrollada 100% por DeVx.</p>
        </div>
        <div style={{ display: 'flex', gap: '40px' }}>
          <div>
            <b style={{ color: '#eee', display: 'block', marginBottom: '10px' }}>LEGAL</b>
            <Link href="/terminos" style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>Términos de Servicio</Link>
            <Link href="/privacidad" style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>Privacidad</Link>
            <Link href="/confidencialidad" style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>Confidencialidad</Link>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @media (min-width: 768px) { .pc-menu { display: flex !important; } .mobile-menu-icon { display: none !important; } }
        @media (max-width: 767px) { .pc-menu { display: none !important; } .mobile-menu-icon { display: flex !important; } }
      `}</style>
    </main>
  );
}