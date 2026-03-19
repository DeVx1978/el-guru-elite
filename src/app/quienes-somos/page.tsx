"use client";
import React from 'react';

export default function QuienesSomos() {
  return (
    <main style={{ backgroundColor: '#020406', minHeight: '100vh', color: 'white', fontFamily: 'Arial', padding: '100px 5%' }}>
      <nav style={{ position: 'absolute', top: 20, left: '5%' }}>
        <button onClick={() => window.location.href = '/'} style={{ background: 'transparent', color: '#00C853', border: '1px solid #00C853', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>
          ← VOLVER
        </button>
      </nav>

      <section style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ color: '#00C853', fontSize: '3rem', marginBottom: '30px', fontStyle: 'italic' }}>QUIÉNES SOMOS</h1>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#ccc' }}>
          En <span style={{ color: '#00C853', fontWeight: 'bold' }}>EL GURÚ ÉLITE</span>, no creemos en la suerte, creemos en la probabilidad. 
          Somos un equipo especializado en el análisis de datos deportivos y gestión de capital privado.
        </p>
        <div style={{ marginTop: '50px', padding: '40px', background: '#0a0c10', borderRadius: '20px', border: '1px solid #1a1d23' }}>
          <h3 style={{ color: '#00C853' }}>NUESTRA MISIÓN</h3>
          <p style={{ color: '#888' }}>Llevar la inversión deportiva a un nivel institucional, con transparencia y resultados verificados.</p>
        </div>
      </section>
    </main>
  );
}