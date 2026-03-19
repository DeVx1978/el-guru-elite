"use client";
import React, { useState, useEffect } from 'react';
import { Menu, X, LogIn, Activity, Award, Briefcase, DollarSign, Copyright } from 'lucide-react';
import Link from 'next/link';

// Componente Loader Personalizado con Balón
const BallLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
    <div style={{
      width: '50px',
      height: '50px',
      border: '4px solid rgba(0, 200, 83, 0.1)',
      borderTop: '4px solid #00C853',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '20px',
        color: '#00C853',
        animation: 'spinBall 1s linear infinite'
      }}>
        ⚽
      </div>
    </div>
    <style jsx global>{`
      @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      @keyframes spinBall { 0% { transform: translate(-50%, -50%) rotate(360deg); } 100% { transform: translate(-50%, -50%) rotate(0deg); } }
    `}</style>
  </div>
);

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Simulación de carga al hacer clic
  const handleLinkClick = () => {
    setLoading(true);
    setMenuOpen(false);
    // En producción, esto se manejaría con eventos de ruta de Next.js
    setTimeout(() => setLoading(false), 1500); 
  };

  const m = [
    { n: 'Micro', v: '100' },
    { n: 'Inicial', v: '250' },
    { n: 'Activo', v: '500' },
    { n: 'Premium', v: '1000' },
    { n: 'Elite', v: '1500' }
  ];

  const menuLinks = [
    { name: 'QUIÉNES SOMOS', url: '/quienes-somos' },
    { name: 'PROYECTO', url: '#proyecto' }, // Lleva a la landing
    { name: 'INVERSIONISTAS', url: '/inversionistas' }, // Nueva página
  ];

  if (loading) {
    return (
      <main style={{ backgroundColor: '#020406', minHeight: '100vh', color: 'white', fontFamily: 'Arial', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <BallLoader />
      </main>
    );
  }

  return (
    <main id="proyecto" style={{ 
      backgroundColor: '#020406', 
      minHeight: '100vh', 
      color: 'white', 
      fontFamily: 'Arial', 
      overflowX: 'hidden',
      backgroundImage: 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url("/guru.jpg")', 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      {/* NAVEGACIÓN ÉLITE CON LOGO Y INICIAR SESIÓN */}
      <nav style={{ 
        padding: '15px 5%', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        position: 'fixed', 
        top: 0,
        width: '100%',
        zIndex: 1000,
        backgroundColor: 'rgba(2, 4, 6, 0.95)', 
        backdropFilter: 'blur(10px)'
      }}>
        {/* LOGO PROFESIONAL */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start' }}>
          <h2 style={{ color: '#eee', margin: 0, fontSize: '1.8rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>
            EL <span style={{ color: '#00C853' }}>GURÚ</span>
          </h2>
          <p style={{ fontSize: '7px', letterSpacing: '4px', color: '#666', margin: 0, fontWeight: 'bold' }}>ÉLITE INVESTMENTS</p>
        </div>

        {/* MENÚ PC */}
        <div className="pc-menu" style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
          {menuLinks.map(link => (
            <Link key={link.name} href={link.url} onClick={handleLinkClick} style={{ color:'#bbb', textDecoration:'none', fontSize:'11px', fontWeight:600, letterSpacing:'1.5px', textTransform: 'uppercase' }}>
              {link.name}
            </Link>
          ))}
          {/* BOTÓN INICIAR SESIÓN PC */}
          <button onClick={() => { handleLinkClick(); window.location.href = '/login'; }} style={{ backgroundColor: 'transparent', color: '#00C853', border: '1px solid #00C853', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LogIn size={14} /> INICIAR SESIÓN
          </button>
        </div>

        {/* ICONO MÓVIL Y INICIAR SESIÓN MÓVIL */}
        <div className="mobile-header-actions" style={{ display: 'none', alignItems: 'center', gap: '15px' }}>
           <button onClick={() => { handleLinkClick(); window.location.href = '/login'; }} style={{ backgroundColor: 'transparent', color: '#00C853', border: '1px solid #00C853', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', fontSize: '10px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <LogIn size={12} /> ENTRAR
          </button>
          <div className="mobile-menu-icon" style={{ cursor: 'pointer', color: '#00C853' }} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </div>
        </div>

        {/* MENÚ DESPLEGABLE MÓVIL */}
        {menuOpen && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, width: '100%', backgroundColor: '#0a0c10',
            padding: '30px 5%', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'center', borderBottom: '2px solid #00C853'
          }}>
            {menuLinks.map(link => (
              <Link key={link.name} href={link.url} style={{ color:'white', textDecoration:'none', fontSize:'16px', fontWeight:'bold' }} onClick={handleLinkClick}>
                {link.name}
              </Link>
            ))}
          </div>
        )}

        <style jsx global>{`
          @media (min-width: 768px) { .pc-menu { display: flex !important; } .mobile-header-actions { display: none !important; } }
          @media (max-width: 767px) { .pc-menu { display: none !important; } .mobile-header-actions { display: flex !important; } }
        `}</style>
      </nav>

      {/* SECCIÓN HERO - PULCRITUD Y CLASE */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '140px 5% 80px 5%' }}>
        <h3 style={{ color: '#00C853', letterSpacing: '6px', fontSize: 'clamp(0.6rem, 1.5vw, 0.8rem)', marginBottom: '15px', fontWeight: 'bold' }}>INTELIGENCIA DEPORTIVA AVANZADA</h3>
        <h1 style={{ fontSize: 'clamp(3rem, 11vw, 6.5rem)', fontWeight: 900, fontStyle: 'italic', lineHeight: '0.85', marginBottom: '25px', letterSpacing: '-2px' }}>
          MÁXIMO<br /><span style={{ color: '#00C853' }}>RENDIMIENTO</span>
        </h1>
        <p style={{ color: '#ccc', maxWidth: '550px', marginBottom: '50px', fontSize: 'clamp(0.9rem, 3vw, 1.1rem)', lineHeight: '1.7' }}>
          Gestión de capital privado basada en modelos de probabilidad de élite. <br/>Resultados verificados para inversores de alto nivel.
        </p>
        <button onClick={() => { handleLinkClick(); window.location.href = '/registro'; }} style={{ backgroundColor: '#00C853', color: 'black', padding: '18px 45px', borderRadius: '10px', border: 'none', fontWeight: 900, cursor: 'pointer', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px', boxShadow: '0 8px 15px rgba(0, 200, 83, 0.2)' }}>
          ADQUIRIR MEMBRESÍA
        </button>
      </section>

      {/* ESTADÍSTICAS DINÁMICAS PROFESIONALES */}
      <section style={{ padding: '80px 5%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '25px', maxWidth: '1300px', margin: '0 auto', background: 'rgba(5, 7, 10, 0.5)', borderRadius: '30px', border: '1px solid rgba(255, 255, 255, 0.03)' }}>
        {[
          { t: 'CRECIMIENTO ANUAL', v: '+142%', h: 120, i: DollarSign }, 
          { t: 'WIN RATE GLOBAL', v: '78.4%', h: 100, i: Activity }, 
          { t: 'PROFIT MENSUAL (Avg)', v: '$12,400', h: 140, i: Award }
        ].map((s, index) => (
          <div key={s.t} style={{ background: 'rgba(10, 12, 16, 0.7)', backdropFilter: 'blur(5px)', padding: '40px', borderRadius: '20px', border: '1px solid rgba(0, 200, 83, 0.05)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
              <s.i size={16} color="#00C853" />
              <span style={{ fontSize: '11px', color: '#666', fontWeight: 'bold', letterSpacing: '2px' }}>{s.t}</span>
            </div>
            {/* Barra con animación sutil de carga */}
            <div style={{ height: '160px', width: '25px', background: 'rgba(255, 255, 255, 0.02)', margin: '0 auto', borderRadius: '8px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                width: '100%', 
                height: `${s.h}%`, // Altura final de la barra
                background: 'linear-gradient(to top, #00C853, rgba(0, 200, 83, 0.3))', 
                borderRadius: '8px',
                animation: `loadBar 2s ease-out ${index * 0.3}s forwards` // Animación de carga escalonada
              }}></div>
            </div>
            <div style={{ fontSize: '30px', fontWeight: 900, marginTop: '25px', color: '#eee' }}>{s.v}</div>
          </div>
        ))}
        <style jsx global>{`
          @keyframes loadBar { 0% { height: 0; } 100% { height: ${props => props.h}% !important; } }
        `}</style>
      </section>

      {/* MEMBRESÍAS ALINEACIÓN PERFECTA (1 o 2 LÍNEAS) */}
      <section id="membresias" style={{ padding: '120px 5%', textAlign: 'center', background: 'rgba(5, 7, 10, 0.95)' }}>
        <h2 style={{ marginBottom: '60px', fontStyle: 'italic', fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 800 }}>MEMBRESÍAS DE INVERSIÓN ÉLITE</h2>
        {/* Usamos Flexbox para controlar la alineación perfecta en una línea */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'center', // Centrar si son pocas
          gap: '20px', 
          maxWidth: '1200px', 
          margin: '0 auto' 
        }}>
          {m.map(p => (
            <div key={p.n} style={{ 
              background: '#0a0c10', 
              padding: '40px 30px', 
              borderRadius: '16px', 
              border: '1px solid rgba(0, 200, 83, 0.6)', // Borde neón sutil
              flex: '1 1 210px', // Flex crece y encoge, tamaño base 210px
              maxWidth: '250px', // No se hace muy grande
              transition: 'transform 0.3s ease, border-color 0.3s ease',
              cursor: 'pointer'
            }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.borderColor = '#00C853'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(0, 200, 83, 0.6)'; }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <Briefcase size={16} color="#00C853" />
                <b style={{ color: '#00C853', fontSize: '1.3rem', fontWeight: 800 }}>{p.n}</b>
              </div>
              <h3 style={{ fontSize: '2.5rem', fontWeight: 900, margin: '0 0 30px 0', color: '#eee' }}>${p.v}</h3>
              <button onClick={() => { handleLinkClick(); window.location.href = '/registro'; }} style={{ width: '100%', background: '#00C853', border: 'none', padding: '15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>
                SELECCIONAR
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER ÉLITE PROFESIONAL CON CRÉDITOS Y COPY */}
      <footer style={{ 
        padding: '80px 5%', 
        borderTop: '1px solid rgba(255, 255, 255, 0.05)', 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'space-between', 
        gap: '40px', 
        color: '#bbb', // Color de letra visible
        fontSize: '12px', 
        maxWidth: '1300px', 
        margin: '0 auto',
        lineHeight: '1.6'
      }}>
        {/* Info y Copy */}
        <div style={{ minWidth: '280px', flex: 1.5 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
             <Copyright size={14} color="#00C853" />
             <b style={{ color: '#eee', fontSize: '14px', fontWeight: 800 }}>© 2024 EL GURÚ ÉLITE.</b>
          </div>
          <p>Todos los derechos reservados. <br/>Gestión de activos bajo los más altos estándares de seguridad y confidencialidad.</p>
          <p style={{ marginTop: '10px', color: '#eee', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ fontSize: '16px' }}>🧑‍💻</span> Plataforma desarrollada 100% por DeVx.
          </p>
        </div>

        {/* Enlaces Legales actualizados */}
        <div style={{ display: 'flex', gap: '40px' }}>
          <div>
            <b style={{ color: '#eee', marginBottom: '15px', display: 'block', fontSize: '13px' }}>LEGAL</b>
            <Link href="/terminos" style={{ color: 'inherit', textDecoration: 'none', display: 'block', marginBottom: '8px' }}>Términos de Servicio</Link>
            <Link href="/privacidad" style={{ color: 'inherit', textDecoration: 'none', display: 'block', marginBottom: '8px' }}>Política de Privacidad</Link>
            <Link href="/confidencialidad" style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>Política de Confidencialidad</Link>
          </div>
          <div>
            <b style={{ color: '#eee', marginBottom: '15px', display: 'block', fontSize: '13px' }}>REDES OFICIALES</b>
            <Link href="#" style={{ color: 'inherit', textDecoration: 'none', display: 'block', marginBottom: '8px' }}>Instagram</Link>
            <Link href="#" style={{ color: 'inherit', textDecoration: 'none', display: 'block' }}>Telegram Élite</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}