"use client";
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

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
    <main style={{ 
      backgroundColor: '#020406', 
      minHeight: '100vh', 
      color: 'white', 
      fontFamily: 'Arial', 
      overflowX: 'hidden',
      backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("/guru.jpg")', // AQUÍ RECUPERAMOS TU IMAGEN
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      {/* NAVEGACIÓN ÉLITE */}
      <nav style={{ 
        padding: '20px 5%', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderBottom: '1px solid rgba(26, 29, 35, 0.5)',
        position: 'fixed', // Para que el menú siempre esté arriba al bajar
        top: 0,
        width: '100%',
        zIndex: 1000,
        backgroundColor: 'rgba(2, 4, 6, 0.8)', // Un toque de transparencia elegante
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start' }}>
          <h2 style={{ color: '#00C853', margin: 0, fontStyle: 'italic', fontSize: '1.4rem' }}>EL GURÚ</h2>
          <p style={{ fontSize: '8px', letterSpacing: '4px', color: '#888', margin: 0 }}>ÉLITE INVESTMENTS</p>
        </div>

        <div className="pc-menu" style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          {menuLinks.map(link => (
            <a key={link.name} href={link.url} style={{ color:'#fff', textDecoration:'none', fontSize:'12px', fontWeight:'bold', letterSpacing:'1px' }}>
              {link.name}
            </a>
          ))}
        </div>

        <div className="mobile-menu-icon" style={{ display: 'none', cursor: 'pointer', color: '#00C853' }} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </div>

        {/* MENÚ DESPLEGABLE */}
        {menuOpen && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, width: '100%', backgroundColor: '#0a0c10',
            padding: '30px 5%', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'center', borderBottom: '2px solid #00C853'
          }}>
            {menuLinks.map(link => (
              <a key={link.name} href={link.url} style={{ color:'white', textDecoration:'none', fontSize:'18px', fontWeight:'bold' }} onClick={() => setMenuOpen(false)}>
                {link.name}
              </a>
            ))}
          </div>
        )}

        <style jsx global>{`
          @media (min-width: 768px) { .pc-menu { display: flex !important; } .mobile-menu-icon { display: none !important; } }
          @media (max-width: 767px) { .pc-menu { display: none !important; } .mobile-menu-icon { display: flex !important; } }
        `}</style>
      </nav>

      {/* SECCIÓN HERO (CON TUS TEXTOS RECUPERADOS) */}
      <section style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        textAlign: 'center', 
        padding: '100px 20px 40px 20px' 
      }}>
        <h3 style={{ color: '#00C853', letterSpacing: '5px', fontSize: 'clamp(0.7rem, 2vw, 0.9rem)', marginBottom: '20px', fontWeight: 'bold' }}>
          INTELIGENCIA DEPORTIVA AVANZADA
        </h3>
        <h1 style={{ 
          fontSize: 'clamp(2.8rem, 13vw, 6rem)', 
          fontWeight: '900', 
          fontStyle: 'italic', 
          lineHeight: '0.85', 
          marginBottom: '30px',
          textShadow: '2px 4px 10px rgba(0,0,0,0.5)' // Para que resalte sobre la imagen
        }}>
          MÁXIMO<br />
          <span style={{ color: '#00C853' }}>RENDIMIENTO</span>
        </h1>
        <p style={{ color: '#eee', maxWidth: '600px', marginBottom: '40px', fontSize: 'clamp(1rem, 3.5vw, 1.2rem)', lineHeight: '1.6' }}>
          Gestión de capital privado basada en modelos de probabilidad. <br/>
          Resultados verificados para inversores de alto nivel.
        </p>
        <button onClick={() => window.location.href = '/registro'} style={{ 
          backgroundColor: '#00C853', color: 'black', padding: '20px 50px', borderRadius: '12px', 
          border: 'none', fontWeight: '900', cursor: 'pointer', fontSize: '1.1rem',
          boxShadow: '0 10px 20px rgba(0, 200, 83, 0.3)'
        }}>
          ADQUIRIR MEMBRESÍA
        </button>
      </section>

      {/* SECCIONES DE ABAJO (ESTADÍSTICAS Y MEMBRESÍAS) */}
      {/* ... (Estas se mantienen igual que las tenías) ... */}
    </main>
  );
}