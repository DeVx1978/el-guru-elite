import React from 'react';

export default function Header() {
  return (
    <header style={{ 
      position: 'fixed', top: 0, left: 0, right: 0, width: '100%', zIndex: 100, 
      backgroundColor: 'rgba(5, 7, 10, 0.8)', backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{ 
        maxWidth: '1200px', margin: '0 auto', display: 'flex', 
        justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px' 
      }}>
        
        {/* LOGO - Al hacer clic vuelve al inicio */}
        <a href="/" style={{ textDecoration: 'none' }}>
          <div style={{ color: '#00C853', fontWeight: '900', fontStyle: 'italic', fontSize: '20px', textShadow: '0 0 15px rgba(0,200,83,0.6)' }}>EL GURÚ</div>
          <div style={{ color: 'white', fontSize: '7px', letterSpacing: '3px', opacity: 0.5, fontWeight: 'bold' }}>ÉLITE INVESTMENTS</div>
        </a>

        {/* BOTONES DE ACCESO */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <a href="/login" style={{ color: 'white', textDecoration: 'none', fontSize: '10px', fontWeight: '900', letterSpacing: '1px' }}>
            INICIAR SESIÓN
          </a>
          <a href="/registro" style={{ textDecoration: 'none' }}>
            <button style={{ 
              backgroundColor: '#00C853', color: 'black', fontWeight: '900', fontSize: '10px', 
              padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer', 
              boxShadow: '0 0 20px rgba(0,200,83,0.4)', textTransform: 'uppercase'
            }}>
              REGISTRARSE
            </button>
          </a>
        </div>
      </div>
    </header>
  );
}