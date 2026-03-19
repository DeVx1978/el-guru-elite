"use client";
import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function EstadisticasPage() {
  return (
    <main style={{ backgroundColor: '#05070a', minHeight: '100vh', color: 'white' }}>
      <Header />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '120px 20px 60px' }}>
        <h2 style={{ fontSize: '10px', color: '#00C853', letterSpacing: '4px', fontWeight: '900', textAlign: 'center' }}>RENDIMIENTO VERIFICADO</h2>
        <h1 style={{ fontSize: '32px', fontWeight: '900', fontStyle: 'italic', textAlign: 'center', marginTop: '10px', textTransform: 'uppercase' }}>
          ESTADÍSTICAS <span style={{ color: '#00C853' }}>VIP</span>
        </h1>

        {/* CONTENEDOR DE TARJETAS */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px', 
          marginTop: '50px' 
        }}>
          
          <div style={{ background: '#0a0c10', padding: '30px', borderRadius: '15px', border: '1px solid #1a1d23', textAlign: 'center' }}>
            <p style={{ color: '#444', fontSize: '10px', fontWeight: '900', letterSpacing: '2px' }}>TASA DE ACIERTO</p>
            <div style={{ fontSize: '50px', fontWeight: '900', color: '#00C853', margin: '15px 0' }}>84.2%</div>
            <div style={{ height: '5px', background: '#111', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ width: '84.2%', height: '100%', background: '#00C853', boxShadow: '0 0 10px #00C853' }}></div>
            </div>
            <p style={{ color: '#666', fontSize: '11px', marginTop: '15px' }}>Promedio de los últimos 30 días.</p>
          </div>

          <div style={{ background: '#0a0c10', padding: '30px', borderRadius: '15px', border: '1px solid #1a1d23', textAlign: 'center' }}>
            <p style={{ color: '#444', fontSize: '10px', fontWeight: '900', letterSpacing: '2px' }}>RENTABILIDAD (ROI)</p>
            <div style={{ fontSize: '50px', fontWeight: '900', color: 'white', margin: '15px 0' }}>+12.4%</div>
            <p style={{ color: '#00C853', fontSize: '12px', fontWeight: 'bold' }}>↑ Crecimiento constante</p>
            <p style={{ color: '#666', fontSize: '11px', marginTop: '15px' }}>Resultados auditados por EL GURÚ.</p>
          </div>
        </div>

        {/* GRÁFICO DE TENDENCIA */}
        <div style={{ marginTop: '30px', background: '#0a0c10', padding: '30px', borderRadius: '15px', border: '1px solid #1a1d23' }}>
          <p style={{ color: '#444', fontSize: '10px', fontWeight: '900', letterSpacing: '2px', marginBottom: '20px' }}>TENDENCIA DE GANANCIAS SEMANAL</p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '150px', gap: '10px' }}>
            {[40, 70, 45, 90, 65, 80, 95].map((altura, i) => (
              <div key={i} style={{ flex: 1, backgroundColor: i === 6 ? '#00C853' : '#1a1d23', height: `${altura}%`, borderRadius: '5px' }}></div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', color: '#444', fontSize: '9px', fontWeight: 'bold' }}>
            <span>LUN</span><span>MAR</span><span>MIE</span><span>JUE</span><span>VIE</span><span>SAB</span><span>DOM</span>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <a href="/" style={{ 
            textDecoration: 'none', color: '#444', fontSize: '12px', fontWeight: '900', 
            border: '1px solid #1a1d23', padding: '15px 30px', borderRadius: '10px' 
          }}>
            VOLVER AL INICIO
          </a>
        </div>
      </div>

      <Footer />
    </main>
  );
}