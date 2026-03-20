import React from 'react';

const planes = [
  { nombre: 'MICRO-SOCIO', precio: '100', retorno: '0.067%' },
  { nombre: 'SOCIO INICIAL', precio: '250', retorno: '0.167%' },
  { nombre: 'SOCIO ACTIVO', precio: '500', retorno: '0.333%' },
  { nombre: 'SOCIO PREMIUM', precio: '1000', retorno: '0.667%' },
  { nombre: 'SOCIO ELITE', precio: '1500', retorno: '1.000%' },
];

export default function Membresias() {
  return (
    <section id="membresias" style={{ backgroundColor: '#05070a', padding: '80px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ color: '#00C853', letterSpacing: '5px', fontSize: '12px', fontWeight: 'bold' }}>PORTAFOLIO DE INVERSIÓN</h2>
          <h1 style={{ color: 'white', fontSize: '40px', fontWeight: '900', fontStyle: 'italic' }}>
            ELIGE TU NIVEL DE <span style={{ color: '#00C853' }}>PARTICIPACIÓN</span>
          </h1>
        </div>

        <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '15px', justifyContent: 'center' }}>
          {planes.map((plan) => (
            <div key={plan.nombre} style={{ backgroundColor: '#0a0c10', border: '1px solid #1a1d23', padding: '30px 20px', borderRadius: '10px', flex: '1', minWidth: '200px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ color: '#444', fontSize: '10px', fontWeight: 'bold', marginBottom: '20px' }}>{plan.nombre}</h3>
                <div style={{ color: 'white', fontSize: '32px', fontWeight: '900', fontStyle: 'italic', marginBottom: '5px' }}>
                  <span style={{ color: '#00C853', fontSize: '18px' }}>$</span>{plan.precio}
                </div>
                <p style={{ color: '#333', fontSize: '9px', marginBottom: '30px' }}>CAPITAL DE INGRESO</p>
                <div style={{ color: '#00C853', fontWeight: 'bold', fontSize: '16px' }}>{plan.retorno} <span style={{ color: '#555', fontSize: '9px' }}>DIARIO</span></div>
              </div>

              {/* ENLACE AL REGISTRO */}
              <a href="/unete" style={{ textDecoration: 'none', marginTop: '30px' }}>
                <button style={{ backgroundColor: '#111', border: '1px solid #222', color: 'white', padding: '12px 0', fontSize: '10px', fontWeight: 'bold', borderRadius: '5px', cursor: 'pointer', width: '100%' }}>
                  SELECCIONAR PLAN
                </button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}