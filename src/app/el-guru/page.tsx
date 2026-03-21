"use client";
import React from 'react';

export default function ElGuruInfo() {
  return (
    <main style={{ backgroundColor: '#020406', minHeight: '100vh', color: 'white', fontFamily: 'Arial' }}>
      
      {/* Botón Volver */}
      <nav style={{ padding: '30px 50px' }}>
        <button onClick={() => window.location.href = '/'} style={{ background: 'none', border: '1px solid #1a1d23', color: '#00C853', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
          ← VOLVER
        </button>
      </nav>

      <section style={{ maxWidth: '950px', margin: '0 auto', padding: '0 20px 100px' }}>
        
        {/* IMAGEN DEL GURÚ */}
        <div style={{ 
          width: '100%', 
          height: '450px', 
          borderRadius: '25px', 
          backgroundImage: "url('/images/guru.jpg')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          border: '1px solid #00C85333',
          marginBottom: '50px' 
        }}></div>

        <h1 style={{ fontSize: '55px', fontStyle: 'italic', fontWeight: '900', color: '#00C853', marginBottom: '40px', textTransform: 'uppercase' }}>El Gurú del Fútbol</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px' }}>
          <div>
            <h3 style={{ color: '#fff', fontSize: '22px', marginBottom: '20px', borderBottom: '1px solid #00C853', paddingBottom: '10px' }}>¿QUÉ ES EL GURÚ DEL FÚTBOL?</h3>
            <p style={{ color: '#888', lineHeight: '1.8', fontSize: '16px' }}>
              El Gurú del Fútbol es una plataforma de predicciones deportivas que será lanzada durante el **Mundial de Fútbol 2026**. <br/><br/>
              Cada usuario se convierte en un Gurú y pone a prueba su conocimiento e intuición prediciendo los resultados. Es un juego competitivo donde los participantes deben acertar a medida que el torneo avanza.
            </p>

            <h3 style={{ color: '#fff', fontSize: '22px', marginTop: '50px', marginBottom: '20px', borderBottom: '1px solid #00C853', paddingBottom: '10px' }}>EL PREMIO ACUMULADO</h3>
            <p style={{ color: '#ccc', lineHeight: '1.8', fontSize: '16px', fontWeight: 'bold' }}>
              El juego inicia con un premio acumulado de $100,000 dólares.
            </p>
            <p style={{ color: '#888', lineHeight: '1.8', fontSize: '16px' }}>
              Este pozo se irá incrementando constantemente a medida que más usuarios se registren. Mientras más avance el torneo y más gente juegue, más grande será el premio final.
            </p>
          </div>

          <div>
            <h3 style={{ color: '#fff', fontSize: '22px', marginBottom: '20px', borderBottom: '1px solid #00C853', paddingBottom: '10px' }}>CÓMO FUNCIONA</h3>
            <ul style={{ color: '#888', lineHeight: '2', fontSize: '16px', paddingLeft: '20px' }}>
              <li>Te registras y participas de forma gratuita.</li>
              <li>Predices los resultados de los partidos del Mundial.</li>
              <li>Acumulas puntos según tus aciertos.</li>
              <li>Los mejores Gurús compiten por el premio acumulado.</li>
            </ul>
            <p style={{ color: '#888', marginTop: '15px', fontStyle: 'italic' }}>La intuición y la estrategia serán clave para llevarse el premio mayor.</p>

            <h3 style={{ color: '#fff', fontSize: '22px', marginTop: '50px', marginBottom: '20px', borderBottom: '1px solid #00C853', paddingBottom: '10px' }}>¿QUIERES SER GURÚ?</h3>
            <p style={{ color: '#888', lineHeight: '1.8', fontSize: '16px' }}>
              Este es tu momento. Regístrate ahora y forma parte de uno de los juegos más grandes del **Mundial 2026**. <br/><br/>
              ¡Demuestra que eres un verdadero Gurú del Fútbol! El premio de **$100,000 USD** es solo el punto de partida.
            </p>
          </div>
        </div>

        {/* BOTÓN DE ACCIÓN */}
        <div style={{ marginTop: '80px', textAlign: 'center', padding: '60px', background: '#0a0c10', borderRadius: '30px', border: '1px solid #00C853' }}>
          <h2 style={{ marginBottom: '30px', fontSize: '28px' }}>¿LISTO PARA EL MUNDIAL?</h2>
          <button onClick={() => window.location.href = '/unete'} style={{ backgroundColor: '#00C853', color: 'black', padding: '20px 50px', borderRadius: '12px', border: 'none', fontWeight: '900', fontSize: '18px', cursor: 'pointer', textTransform: 'uppercase' }}>
            Registrarme como Gurú
          </button>
        </div>
      </section>
    </main>
  );
}