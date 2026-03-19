import React from 'react';

export default function Hero() {
  return (
    <section style={{ height: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 20px' }}>
      <p style={{ color: '#00C853', letterSpacing: '5px', fontSize: '12px', fontWeight: '900', marginBottom: '20px' }}>BIENVENIDO A LA INTELIGENCIA DEPORTIVA</p>
      
      <h1 style={{ color: 'white', fontSize: 'clamp(40px, 8vw, 90px)', fontWeight: '900', fontStyle: 'italic', lineHeight: '0.9', margin: '0' }}>
        MÁXIMO <br /> <span style={{ color: '#00C853', textShadow: '0 0 30px rgba(0,200,83,0.5)' }}>RENDIMIENTO</span>
      </h1>

      <p style={{ color: '#666', maxWidth: '600px', marginTop: '30px', fontSize: '14px', fontWeight: 'bold', lineHeight: '1.6' }}>
        Gestión de capital privado basada en algoritmos de predicción avanzada. Resultados verificados para inversores que exigen exclusividad.
      </p>

      <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
        {/* Este botón bajará a las membresías */}
        <a href="#membresias" style={{ textDecoration: 'none' }}>
          <button style={{ backgroundColor: '#00C853', color: 'black', padding: '18px 35px', borderRadius: '10px', fontWeight: '900', border: 'none', cursor: 'pointer', fontSize: '12px', boxShadow: '0 10px 30px rgba(0,200,83,0.3)' }}>
            ADQUIRIR MEMBRESÍA
          </button>
        </a>

        {/* Este botón irá a la sección de estadísticas */}
        <a href="/estadisticas" style={{ textDecoration: 'none' }}>
          <button style={{ backgroundColor: 'transparent', color: 'white', padding: '18px 35px', borderRadius: '10px', fontWeight: '900', border: '1px solid #222', cursor: 'pointer', fontSize: '12px' }}>
            ESTADÍSTICAS VIP
          </button>
        </a>
      </div>
    </section>
  );
}