"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X, LogIn, Activity, Award, Briefcase, DollarSign, Copyright } from 'lucide-react';
import Link from 'next/link';

// COMPONENTE LOADER ÉLITE CON BALÓN
const BallLoader = () => (
  <div style={{ 
    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', 
    height: '100vh', width: '100vw', backgroundColor: '#020406', position: 'fixed', top: 0, left: 0, zIndex: 9999 
  }}>
    <div style={{ 
      width: '60px', height: '60px', border: '4px solid rgba(0, 200, 83, 0.1)', 
      borderTop: '4px solid #00C853', borderRadius: '50%', animation: 'spin 1s linear infinite', position: 'relative' 
    }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '24px' }}>⚽</div>
    </div>
    <p style={{ color: '#00C853', marginTop: '25px', letterSpacing: '4px', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}>Cargando El Gurú</p>
    <style jsx global>{`
      @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    `}</style>
  </div>
);

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLinkClick = (e: any, target: string) => {
    if(target.startsWith('/')) {
        setLoading(true);
        // El redireccionamiento real ocurre por el Link de Next.js
    }
    setMenuOpen(false);
  };

  const membresias = [
    { n: 'Micro', v: '100' }, { n: 'Inicial', v: '250' }, { n: 'Activo', v: '500' }, { n: 'Premium', v: '1000' }, { n: 'Elite', v: '1500' }
  ];

  if (loading) return <BallLoader />;

  return (
    <main id="proyecto" style={{ 
      backgroundColor: '#020406', minHeight: '100vh', color: 'white', fontFamily: 'Arial, sans-serif', 
      overflowX: 'hidden', backgroundImage: 'linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url("/guru.jpg")', 
      backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' 
    }}>
      
      {/* HEADER / NAVEGACIÓN PROFESIONAL */}
      <nav style={{ 
        padding: '15px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)', position: 'fixed', top: 0, width: '100%', 
        zIndex: 1000, backgroundColor: 'rgba(2, 4, 6, 0.95)', backdropFilter: 'blur(10px)' 
      }}>
        <div style={{ display:'flex', flexDirection:'column' }}>
          <h2 style={{ color: '#eee', margin: 0, fontSize: '1.6rem', fontWeight: 900, fontStyle: 'italic', letterSpacing: '1px' }}>
            EL <span style={{ color: '#00C853' }}>GURÚ</span>
          </h2>
          <p style={{ fontSize: '7px', letterSpacing: '4px', color: '#555', margin: 0, fontWeight: 'bold' }}>ÉLITE INVESTMENTS</p>
        </div>

        {/* MENÚ PC */}
        <div className="pc-menu" style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <Link href="/quienes-somos" onClick={(e) => handleLinkClick(e, '/quienes-somos')} style={{ color:'#bbb', textDecoration:'none', fontSize:'11px', fontWeight:600, letterSpacing:'1.5px' }}>QUIÉNES SOMOS</Link>
          <Link href="#proyecto" style={{ color:'#bbb', textDecoration:'none', fontSize:'11px', fontWeight:600, letterSpacing:'1.5px' }}>PROYECTO</Link>
          <Link href="/inversionistas" onClick={(e) => handleLinkClick(e, '/inversionistas')} style={{ color:'#bbb', textDecoration:'none', fontSize:'11px', fontWeight:600, letterSpacing:'1.5px' }}>INVERSIONISTAS</Link>
          <button onClick={() => { setLoading(true); window.location.href = '/login'; }} style={{ backgroundColor: 'transparent', color: '#00C853', border: '1px solid #00C853', padding: '10px 22px', borderRadius: '8px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LogIn size={14} /> INICIAR SESIÓN
          </button>
        </div>

        {/* MENÚ MÓVIL (HAMBURGUESA) */}
        <div className="mobile-actions" style={{ display: 'none', alignItems: 'center', gap: '15px' }}>
          <button onClick={() => { setLoading(true); window.location.href = '/login'; }} style={{ backgroundColor: 'transparent', color: '#00C853', border: '1px solid #00C853', padding: '8px 15px', borderRadius: '6px', fontSize: '10px', fontWeight: 'bold' }}>ENTRAR</button>
          <div style={{ cursor: 'pointer', color: '#00C853' }} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={30} /> : <Menu size={30} />}
          </div>
        </div>

        {menuOpen && (
          <div style={{ position: 'absolute', top: '100%', left: 0, width: '100%', backgroundColor: '#0a0c10', padding: '40px 5%', display: 'flex', flexDirection: 'column', gap: '25px', textAlign: 'center', borderBottom: '3px solid #00C853', boxShadow: '0 20px 40px rgba(0,0,0,0.8)' }}>
            <Link href="/quienes-somos" style={{ color:'white', textDecoration:'none', fontSize: '18px', fontWeight: 'bold' }} onClick={(e) => handleLinkClick(e, '/quienes-somos')}>QUIÉNES SOMOS</Link>
            <Link href="#proyecto" style={{ color:'white', textDecoration:'none', fontSize: '18px', fontWeight: 'bold' }} onClick={() => setMenuOpen(false)}>PROYECTO</Link>
            <Link href="/inversionistas" style={{ color:'white', textDecoration:'none', fontSize: '18px', fontWeight: 'bold' }} onClick={(e) => handleLinkClick(e, '/inversionistas')}>INVERSIONISTAS</Link>
          </div>
        )}
      </nav>

      {/* SECCIÓN HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '120px 20px' }}>
        <h3 style={{ color: '#00C853', letterSpacing: '6px', fontSize: '10px', marginBottom: '20px', fontWeight: 'bold' }}>INTELIGENCIA DEPORTIVA AVANZADA</h3>
        <h1 style={{ fontSize: 'clamp(3.2rem, 11vw, 6.5rem)', fontWeight: 900, fontStyle: 'italic', lineHeight: '0.85', marginBottom: '30px', letterSpacing: '-2px' }}>
          MÁXIMO<br /><span style={{ color: '#00C853' }}>RENDIMIENTO</span>
        </h1>
        <p style={{ color: '#bbb', maxWidth: '550px', marginBottom: '50px', lineHeight: '1.7', fontSize: '1.1rem' }}>Gestión de capital privado basada en modelos de probabilidad de élite. Resultados verificados para inversores de alto nivel.</p>
        <button onClick={() => { setLoading(true); window.location.href = '/registro'; }} style={{ backgroundColor: '#00C853', color: 'black', padding: '20px 50px', borderRadius: '12px', border: 'none', fontWeight: 900, cursor: 'pointer', letterSpacing: '1px', textTransform: 'uppercase', boxShadow: '0 10px 20px rgba(0, 200, 83, 0.3)' }}>ADQUIRIR MEMBRESÍA</button>
      </section>

      {/* SECCIÓN ESTADÍSTICAS DINÁMICAS */}
      <section style={{ padding: '80px 5%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '30px', maxWidth: '1250px', margin: '0 auto' }}>
        {[ { t: 'CRECIMIENTO ANUAL', v: '+142%', h: '80%' }, { t: 'WIN RATE GLOBAL', v: '78.4%', h: '65%' }, { t: 'PROFIT MENSUAL', v: '$12,400', h: '90%' } ].map(s => (
          <div key={s.t} style={{ background: 'rgba(10, 12, 16, 0.8)', padding: '40px', borderRadius: '25px', border: '1px solid rgba(0, 200, 83, 0.1)', textAlign: 'center', backdropFilter: 'blur(5px)' }}>
            <span style={{ fontSize: '11px', color: '#666', fontWeight: 'bold', letterSpacing: '2px' }}>{s.t}</span>
            <div style={{ height: '120px', width: '22px', background: 'rgba(255,255,255,0.03)', margin: '25px auto', borderRadius: '11px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', bottom: 0, width: '100%', height: s.h, background: 'linear-gradient(to top, #00C853, #00E676)', borderRadius: '11px' }}></div>
            </div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#eee' }}>{s.v}</div>
          </div>
        ))}
      </section>

      {/* SECCIÓN MEMBRESÍAS ALINEADAS */}
      <section id="membresias" style={{ padding: '120px 5%', textAlign: 'center', background: 'rgba(5, 7, 10, 0.8)' }}>
        <h2 style={{ marginBottom: '60px', fontStyle: 'italic', fontSize: '2.5rem', fontWeight: 900 }}>MEMBRESÍAS DE INVERSIÓN ÉLITE</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', maxWidth: '1300px', margin: '0 auto' }}>
          {membresias.map(p => (
            <div key={p.n} style={{ background: '#0a0c10', padding: '45px 25px', borderRadius: '20px', border: '1px solid #00C853', flex: '1 1 200px', maxWidth: '240px', transition: 'transform 0.3s' }}>
              <b style={{ color: '#00C853', letterSpacing: '2px', fontSize: '1.1rem' }}>{p.n}</b>
              <h3 style={{ fontSize: '2.2rem', margin: '20px 0', fontWeight: 900 }}>${p.v}</h3>
              <button onClick={() => { setLoading(true); window.location.href = '/registro'; }} style={{ width: '100%', background: '#00C853', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 900, cursor:'pointer', textTransform: 'uppercase', fontSize: '0.8rem' }}>SELECCIONAR</button>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER PROFESIONAL */}
      <footer style={{ padding: '80px 5%', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '50px', color: '#888', fontSize: '13px', maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ minWidth: '300px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Copyright size={16} color="#00C853" />
            <b style={{ color: '#eee', fontSize: '15px' }}>2026 EL GURÚ ÉLITE.</b>
          </div>
          <p>Gestión de activos bajo los más altos estándares de seguridad y confidencialidad.</p>
          <p style={{ marginTop: '15px', color: '#eee', fontWeight: 'bold' }}>Plataforma desarrollada 100% por DeVx.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '60px' }}>
          <div>
            <b style={{ color: '#eee', display: 'block', marginBottom: '20px', letterSpacing: '1px' }}>LEGAL</b>
            <Link href="/terminos" style={{ color: 'inherit', textDecoration: 'none', display: 'block', marginBottom: '12px' }}>Términos de Servicio</Link>
            <Link href="/privacidad" style={{ color: 'inherit', textDecoration: 'none', display: 'block', marginBottom: '12px' }}>Privacidad</Link>
            <Link href="/confidencialidad" style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>Confidencialidad</Link>
          </div>
          <div>
            <b style={{ color: '#eee', display: 'block', marginBottom: '20px', letterSpacing: '1px' }}>REDES</b>
            <p style={{ marginBottom: '12px' }}>Instagram</p>
            <p>Telegram</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @media (min-width: 768px) { .pc-menu { display: flex !important; } .mobile-actions { display: none !important; } }
        @media (max-width: 767px) { .pc-menu { display: none !important; } .mobile-actions { display: flex !important; } }
      `}</style>
    </main>
  );
}