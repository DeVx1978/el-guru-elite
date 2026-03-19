import React from 'react';

export default function Features() {
  const items = [
    {
      titulo: "SEGURIDAD DE ÉLITE",
      desc: "Protección de datos con cifrado de grado bancario avanzado.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00C853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      )
    },
    {
      titulo: "ALGORITMO 24/7",
      desc: "Análisis en tiempo real de mercados deportivos globales.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00C853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      )
    },
    {
      titulo: "COBERTURA GLOBAL",
      desc: "Invierta desde cualquier lugar con depósitos instantáneos.",
      icon: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#00C853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="2" y1="12" x2="22" y2="12"></line>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
      )
    }
  ];

  return (
    <section style={{ backgroundColor: '#05070a', padding: '100px 20px', borderBottom: '1px solid #1a1d23' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '40px', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {items.map((item, index) => (
          <div key={index} style={{ flex: '1', minWidth: '280px', textAlign: 'center' }}>
            <div style={{ marginBottom: '25px', display: 'flex', justifyContent: 'center' }}>
              {item.icon}
            </div>
            <h3 style={{ color: 'white', fontSize: '14px', fontWeight: '900', letterSpacing: '3px', marginBottom: '15px' }}>
              {item.titulo}
            </h3>
            <p style={{ color: '#444', fontSize: '12px', lineHeight: '1.6', fontWeight: 'bold' }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}