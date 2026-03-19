"use client";
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Importamos los iconos

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false); // Estado para el menú móvil

  const m = [
    { n: 'Micro', v: '100' },
    { n: 'Inicial', v: '250' },
    { n: 'Activo', v: '500' },
    { n: 'Premium', v: '1000' },
    { n: 'Elite', v: '1500' }
  ];

  const menuLinks = [
    { name: 'QUIÉNES SOMOS', url: '/quienes-somos' },
    { name: 'MEMBRESÍAS', url: '#membresias' },
    { name: 'REGISTRO', url: '/registro' },
  ];

  return (
    <main style={{ backgroundColor: '#020406', minHeight: '100vh', color: 'white', fontFamily: 'Arial', overflowX: 'hidden' }}>
      {/* NAVEGACIÓN TOTALMENTE NUEVA Y RESPONSIVE */}
      <nav style={{ 
        padding: '20px 5%', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderBottom: '1px solid #1a1d23',
        position: 'relative' // Necesario para el menú móvil
      }}>
        {/* 1. LOGO (AHORA A LA IZQUIERDA) */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start' }}>
          <h2 style={{ color: '#00C853', margin: 0, fontStyle: 'italic', fontSize: '1.4rem' }}>EL GURÚ</h2>
          <p style={{ fontSize: '8px', letterSpacing: '4px', color: '#444', margin: 0 }}>ÉLITE INVESTMENTS</p>
        </div>

        {/* 2. ENLACES PARA PC (OCULTOS EN MÓVIL) */}
        {/* Usamos una media query "a mano" con CSS en línea para simular el comportamiento */}
        <div className="pc-menu" style={{ 
          display: 'flex', 
          gap: '30px',
          alignItems: 'center'
        }}>
          {menuLinks.map(link => (
            <a key={link.name} href={link.url} style={{ color:'#888', textDecoration:'none', fontSize:'12px', fontWeight:'bold', letterSpacing:'1px' }}>
              {link.name}
            </a>
          ))}
        </div>

        {/* 3. ICONO DE HAMBURGUESA PARA MÓVIL (OCULTO EN PC) */}
        <div className="mobile-menu-icon" style={{ 
          display: 'none', // Por defecto oculto, lo mostraremos con CSS
          cursor: 'pointer',
          color: '#00C853'
        }} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </div>

        {/* 4. MENÚ DESPLEGABLE MÓVIL (SOLO SE VE SI menuOpen ES TRUE) */}
        {menuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            backgroundColor: '#0a0c10',
            borderTop: '1px solid #1a1d23',
            borderBottom: '1px solid #1a1d23',
            padding: '30px 5%',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            textAlign: 'center'
          }}>
            {menuLinks.map(link => (
              <a key={link.name} href={link.url} style={{ color:'white', textDecoration:'none', fontSize:'18px', fontWeight:'bold' }} onClick={() => setMenuOpen(false)}>
                {link.name}
              </a>
            ))}
          </div>
        )}

        {/* ESTILOS CSS INLINE PARA EL RESPONSIVE (LA MAGIA) */}
        <style jsx global>{`
          /* En pantallas grandes (PC) */
          @media (min-width: 768px) {
            .pc-menu { display: flex !important; }
            .mobile-menu-icon { display: none !important; }
          }
          /* En pantallas pequeñas (Móvil) */
          @media (max-width: 767px) {
            .pc-menu { display: none !important; }
            .mobile-menu-icon { display: flex !important; }
          }
        `}</style>
      </nav>

      {/* SECCIÓN HERO (SIN CAMBIOS) */}
      <section style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '40px 20px' }}>
        <h3 style={{ color: '#00C853', letterSpacing: '3px', fontSize: 'clamp(0.6rem, 2vw, 0.8rem)', marginBottom: '20px' }}>INTELIGENCIA DEPORTIVA AVANZADA</h3>
        <h1 style={{ fontSize: 'clamp(2.5rem, 12vw, 5.5rem)', fontWeight: '900', fontStyle: 'italic', lineHeight: '0.9', marginBottom: '30px', padding: '0 10px' }}>MÁXIMO<br /><span style={{ color: '#00C853' }}>RENDIMIENTO</span></h1>
        <p style={{ color: '#666', maxWidth: '500px', marginBottom: '40px', fontSize: 'clamp(0.9rem, 3vw, 1.1rem)' }}>Gestión de capital privado basada en modelos de probabilidad. Resultados verificados para inversores de alto nivel.</p>
        <button onClick={() => window.location.href = '/registro'} style={{ backgroundColor: '#00C853', color: 'black', padding: '18px 40px', borderRadius: '12px', border: 'none', fontWeight: '900', cursor: 'pointer', fontSize: '1rem' }}>ADQUIRIR MEMBRESÍA</button>
      </section>

      {/* ESTADÍSTICAS (SIN CAMBIOS) */}
      <section style={{ padding: '60px 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        {[{ t: 'CRECIMIENTO ANUAL', v: '+142%', h: 100 }, { t: 'WIN RATE GLOBAL', v: '78.4%', h: 80 }, { t: 'PROFIT MENSUAL', v: '$12,400', h: 120 }].map(s => (
          <div key={s.t} style={{ background: '#0a0c10', padding: '30px', borderRadius: '25px', border: '1px solid #1a1d23', textAlign: 'center' }}>
            <span style={{ fontSize: '10px', color: '#444', fontWeight: 'bold' }}>{s.t}</span>
            <div style={{ height: s.h, background: 'linear-gradient(to top,#00C853,transparent)', width: '25px', margin: '20px auto', borderRadius: '4px' }}></div>
            <div style={{ fontSize: '24px', fontWeight: '900' }}>{s.v}</div>
          </div>
        ))}
      </section>

      {/* MEMBRESÍAS (LE PUSE ID PARA EL MENÚ) */}
      <section id="membresias" style={{ padding: '80px 20px', textAlign: 'center', background: '#05070a' }}>
        <h2 style={{ marginBottom: '50px', fontStyle: 'italic', fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}>MEMBRESÍAS DE INVERSIÓN</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '20px', maxWidth: '1100px', margin: '0 auto' }}>
          {m.map(p => (
            <div key={p.n} style={{ background: '#0a0c10', padding: '30px', borderRadius: '20px', border: '1px solid #00C853' }}>
              <b style={{ color: '#00C853', fontSize: '1.2rem' }}>{p.n}</b><h3 style={{ fontSize: '2rem', margin: '15px 0' }}>${p.v}</h3><button onClick={() => window.location.href = '/registro'} style={{ width: '100%', background: '#00C853', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>SELECCIONAR</button>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER (SIN CAMBIOS) */}
      <footer style={{ padding: '60px 20px', borderTop: '1px solid #1a1d23', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '30px', color: '#444', fontSize: '12px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ minWidth: '200px', flex: 1 }}><b style={{ color: '#eee' }}>EL GURÚ ÉLITE</b><p>Gestión de activos bajo estándares de máxima seguridad.</p></div>
        <div style={{ display: 'flex', gap: '40px' }}>
          <div><b style={{ color: '#eee' }}>LEGAL</b><p>Términos</p><p>Privacidad</p></div>
          <div><b style={{ color: '#eee' }}>REDES</b><p>Instagram</p><p>Telegram</p></div>
        </div>
      </footer>
    </main>
  );
}