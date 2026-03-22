"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Trophy, Globe, Target, Calendar, Star, 
  ArrowRightCircle, barChart as Chart, Zap, ShieldCheck, ChevronRight
} from 'lucide-react';

// --- DATOS ESTRATÉGICOS ---
const hitos = [
  { 
    id: 1, 
    torneo: 'WORLD CUP 2026', 
    fecha: 'JUNIO 2026', 
    estado: 'Lanzamiento Oficial', 
    color: '#00C853', 
    desc: 'Despliegue total del algoritmo de predicción Élite.',
    stats: 'Impacto Global: 100%' 
  },
  { 
    id: 2, 
    torneo: 'UEFA CHAMPIONS LEAGUE', 
    fecha: 'SEPT 2026', 
    estado: 'Fase de Expansión', 
    color: '#81D4FA', 
    desc: 'Predicciones de alta precisión para el torneo de clubes más importante de Europa.',
    stats: 'Precisión Estimada: 94.8%'
  },
  { 
    id: 3, 
    torneo: 'COPA LIBERTADORES & SUDAMERICANA', 
    fecha: '2027', 
    estado: 'Dominio Regional', 
    color: '#FFD54F', 
    desc: 'Conquista del mercado Sudamericano con datos en tiempo real.',
    stats: 'Cobertura: 100% CONMEBOL'
  },
  { 
    id: 4, 
    torneo: 'LIGA BETPLAY & TORNEO ECUADOR', 
    fecha: 'CONTINUO', 
    estado: 'Operación Local', 
    color: '#FF8A65', 
    desc: 'Análisis profundo de los mercados locales de Colombia y Ecuador.',
    stats: 'Soportes Locales: Activos'
  },
];

export default function ObjetivosPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // --- EFECTO DE CARGA "EL GURÚ" ---
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={{ backgroundColor: '#020406', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="loader-container">
          <div className="pulse-ring"></div>
          <img src="/images/guru.jpg" alt="El Gurú" className="guru-loader-img" />
        </div>
        <style jsx>{`
          .loader-container { position: relative; width: 150px; height: 150px; display: flex; justifyContent: center; alignItems: center; }
          .guru-loader-img { width: 80px; height: 80px; borderRadius: 50%; border: 3px solid #00C853; z-index: 2; box-shadow: 0 0 30px #00C853; }
          .pulse-ring { position: absolute; width: 100%; height: 100%; border: 2px solid #00C853; borderRadius: 50%; animation: pulse 1.5s infinite; }
          @keyframes pulse { 0% { transform: scale(0.5); opacity: 1; } 100% { transform: scale(1.5); opacity: 0; } }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#020406', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', overflowX: 'hidden' }}>
      
      {/* HEADER DE NAVEGACIÓN */}
      <nav style={{ padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #111' }}>
        <button onClick={() => router.back()} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}>
          <ChevronRight style={{ transform: 'rotate(180deg)' }} /> VOLVER AL PANEL
        </button>
        <div style={{ fontWeight: 900, color: '#00C853' }}>OBJETIVOS ESTRATÉGICOS 2026</div>
      </nav>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 20px' }}>
        
        {/* SECCIÓN HERO */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }} className="fade-in">
          <div style={{ display: 'inline-block', padding: '8px 20px', background: 'rgba(0, 200, 83, 0.1)', borderRadius: '50px', color: '#00C853', fontSize: '0.8rem', fontWeight: 900, letterSpacing: '2px', marginBottom: '20px' }}>
            PRÓXIMA PARADA: UNITED 2026
          </div>
          <h1 style={{ fontSize: '4rem', fontWeight: 900, margin: 0, letterSpacing: '-3px', lineHeight: 1 }}>
            EL MUNDIAL <span style={{ color: '#00C853' }}>ES NUESTRO</span>
          </h1>
          <p style={{ color: '#555', maxWidth: '600px', margin: '20px auto', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Estamos construyendo la infraestructura de datos más potente del fútbol. Nuestra tecnología debutará en la cima del deporte rey.
          </p>
        </div>

        {/* CONTENEDOR DE LA RUTA (TIMELINE) */}
        <div style={{ position: 'relative' }}>
          {/* Línea central decorativa */}
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: '2px', height: '100%', background: 'linear-gradient(to bottom, #00C853, transparent)', opacity: 0.2 }}></div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {hitos.map((h, index) => (
              <div key={h.id} className="hito-card" style={{ 
                background: '#0a0c10', 
                border: '1px solid #111', 
                borderRadius: '30px', 
                padding: '40px',
                display: 'flex',
                alignItems: 'center',
                gap: '40px',
                position: 'relative',
                zIndex: 2,
                transition: '0.4s',
                flexDirection: index % 2 === 0 ? 'row' : 'row-reverse'
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                    <Trophy color={h.color} size={30} />
                    <span style={{ color: h.color, fontWeight: 900, fontSize: '0.9rem' }}>{h.estado}</span>
                  </div>
                  <h3 style={{ fontSize: '2rem', fontWeight: 900, margin: '0 0 10px 0' }}>{h.torneo}</h3>
                  <p style={{ color: '#666', fontSize: '1rem', lineHeight: 1.5 }}>{h.desc}</p>
                  
                  <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
                    <div style={{ background: '#020406', padding: '10px 20px', borderRadius: '15px', border: '1px solid #1a1a1a' }}>
                        <span style={{ display: 'block', fontSize: '0.7rem', color: '#444', fontWeight: 900 }}>FECHA ESTIMADA</span>
                        <span style={{ fontWeight: 'bold' }}>{h.fecha}</span>
                    </div>
                    <div style={{ background: '#020406', padding: '10px 20px', borderRadius: '15px', border: '1px solid #1a1a1a' }}>
                        <span style={{ display: 'block', fontSize: '0.7rem', color: '#444', fontWeight: 900 }}>DATA FEED</span>
                        <span style={{ fontWeight: 'bold', color: '#00C853' }}>{h.stats}</span>
                    </div>
                  </div>
                </div>

                <div style={{ 
                    width: '120px', 
                    height: '120px', 
                    background: `${h.color}10`, 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    border: `2px dashed ${h.color}30`
                  }}>
                    <Globe size={50} color={h.color} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECCIÓN DE EVENTOS ESPECIALES */}
        <div style={{ marginTop: '100px', background: 'linear-gradient(180deg, transparent, #0a0c10)', padding: '60px', borderRadius: '40px', border: '1px solid #111', textAlign: 'center' }}>
          <Star color="#FFD54F" size={40} style={{ marginBottom: '20px' }} />
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '10px' }}>EVENTOS ESPECIALES ÉLITE</h2>
          <p style={{ color: '#666', marginBottom: '40px' }}>Crearemos experiencias presenciales y digitales exclusivas para nuestros inversionistas VIP.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div className="mini-card">Masterclass de Trading</div>
            <div className="mini-card">Análisis en Vivo Mundial</div>
            <div className="mini-card">Cena de Gala Gurú</div>
          </div>
        </div>

      </main>

      <style jsx>{`
        .fade-in { animation: fadeIn 1s ease; }
        .hito-card:hover { border-color: #00C853; transform: scale(1.02); box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
        .mini-card { background: #020406; padding: 20px; borderRadius: 20px; border: 1px solid #111; fontWeight: bold; fontSize: 0.9rem; color: #888; transition: 0.3s; }
        .mini-card:hover { color: #00C853; border-color: #00C853; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}