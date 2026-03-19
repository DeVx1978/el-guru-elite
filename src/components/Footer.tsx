import React from 'react';

export default function Footer() {
  return (
    <footer style={{ 
      backgroundColor: '#05070a', 
      borderTop: '1px solid rgba(255,255,255,0.05)', 
      padding: '80px 40px 40px' 
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '40px' }}>
          
          {/* IDENTIDAD FINAL */}
          <div style={{ flex: '1', minWidth: '250px' }}>
            <div style={{ 
              color: '#00C853', 
              fontWeight: '900', 
              fontStyle: 'italic', 
              fontSize: '24px',
              textShadow: '0 0 15px rgba(0,200,83,0.5)' 
            }}>
              EL GURÚ
            </div>
            <p style={{ color: '#444', fontSize: '11px', lineHeight: '1.8', marginTop: '20px', maxWidth: '300px' }}>
              La plataforma de inversión deportiva más avanzada del mercado. Gestión privada para socios exclusivos.
            </p>
          </div>

          {/* ENLACES RÁPIDOS */}
          <div style={{ display: 'flex', gap: '60px' }}>
            <div>
              <h4 style={{ color: 'white', fontSize: '10px', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '20px' }}>LEGAL</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: '#444', fontSize: '10px', fontWeight: 'bold' }}>
                <span style={{ cursor: 'pointer' }}>TÉRMINOS DE SERVICIO</span>
                <span style={{ cursor: 'pointer' }}>POLÍTICA DE PRIVACIDAD</span>
                <span style={{ cursor: 'pointer' }}>DESCARGO DE RIESGO</span>
              </div>
            </div>
            <div>
              <h4 style={{ color: 'white', fontSize: '10px', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '20px' }}>SOPORTE</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: '#444', fontSize: '10px', fontWeight: 'bold' }}>
                <span style={{ cursor: 'pointer' }}>CENTRO DE AYUDA</span>
                <span style={{ cursor: 'pointer' }}>CONTACTO VIP</span>
              </div>
            </div>
          </div>
        </div>

        {/* LÍNEA FINAL DE COPYRIGHT */}
        <div style={{ 
          marginTop: '60px', 
          paddingTop: '30px', 
          borderTop: '1px solid rgba(255,255,255,0.02)', 
          textAlign: 'center', 
          color: '#222', 
          fontSize: '9px', 
          fontWeight: 'bold', 
          letterSpacing: '2px' 
        }}>
          © 2026 EL GURÚ • ÉLITE INVESTMENTS • TODOS LOS DERECHOS RESERVADOS.
        </div>
      </div>
    </footer>
  );
}