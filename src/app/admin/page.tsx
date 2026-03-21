"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  TrendingUp, ShieldCheck, Zap, Globe, ChevronRight, 
  BarChart3, PieChart, Users, Star 
} from 'lucide-react';

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // EFECTO DE CARGA DE 5 SEGUNDOS
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="splash-container">
        <div className="loader-wrapper">
          <div className="loader-ring"></div>
          <div className="loader-scan"></div>
          <div className="logo-center">
            <img src="/images/guru.jpg" alt="Guru Logo" />
          </div>
        </div>
        <div className="loading-text">
          <span className="letter">C</span>
          <span className="letter">O</span>
          <span className="letter">N</span>
          <span className="letter">E</span>
          <span className="letter">C</span>
          <span className="letter">T</span>
          <span className="letter">A</span>
          <span className="letter">N</span>
          <span className="letter">D</span>
          <span className="letter">O</span>
          <span className="dots">...</span>
        </div>
        <style jsx>{`
          .splash-container {
            background: radial-gradient(circle at center, #0a0c10 0%, #020406 100%);
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          .loader-wrapper {
            position: relative;
            width: 180px;
            height: 180px;
          }
          .loader-ring {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 2px solid rgba(0, 200, 83, 0.1);
            border-top: 2px solid #00C853;
            animation: spin 2s linear infinite;
          }
          .loader-scan {
            position: absolute;
            width: 110%;
            height: 110%;
            top: -5%;
            left: -5%;
            border-radius: 50%;
            border: 1px solid #00C853;
            opacity: 0.3;
            animation: pulse 1.5s ease-in-out infinite;
          }
          .logo-center {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 120px;
            height: 120px;
            border-radius: 50%;
            overflow: hidden;
            border: 4px solid #0a0c10;
            box-shadow: 0 0 30px rgba(0, 200, 83, 0.4);
          }
          .logo-center img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            animation: float 3s ease-in-out infinite;
          }
          .loading-text {
            margin-top: 40px;
            color: #00C853;
            font-family: 'monospace';
            letter-spacing: 5px;
            font-weight: bold;
            display: flex;
          }
          @keyframes spin { 100% { transform: rotate(360deg); } }
          @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 0.1; } 50% { transform: scale(1.05); opacity: 0.5; } }
          @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
        `}</style>
      </div>
    );
  }

  return (
    <div className="main-landing">
      {/* NAVBAR */}
      <nav className="nav-blur">
        <div className="nav-content">
          <div className="brand">EL GURÚ <span className="text-green">ÉLITE</span></div>
          <div className="nav-links">
            <button onClick={() => router.push('/unete')} className="btn-main">UNIRSE AHORA</button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-text">
            <div className="badge">VERSION 4.0 LIVE</div>
            <h1 className="main-title">
              DOMINA EL MERCADO CON <br />
              <span className="gradient-text">INTELIGENCIA ÉLITE</span>
            </h1>
            <p className="hero-sub">
              Únete a la red exclusiva de socios fundadores. Tecnología de punta, 
              análisis en tiempo real y rentabilidad de alto impacto.
            </p>
            <div className="hero-actions">
              <button onClick={() => router.push('/unete')} className="btn-primary">
                COMENZAR MIEMBRESÍA <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="stat-card floating-1">
              <BarChart3 color="#00C853" size={30} />
              <div>
                <p className="stat-label">UTILIDAD MENSUAL</p>
                <p className="stat-value">+24.8%</p>
              </div>
            </div>
            <div className="stat-card floating-2">
              <Users color="#00C853" size={30} />
              <div>
                <p className="stat-label">SOCIOS ACTIVOS</p>
                <p className="stat-value">1,240</p>
              </div>
            </div>
            <div className="main-orb"></div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="feature-card">
          <Zap className="text-green" size={40} />
          <h3>Rapidez</h3>
          <p>Ejecuciones en milisegundos para capturar cada oportunidad.</p>
        </div>
        <div className="feature-card">
          <ShieldCheck className="text-green" size={40} />
          <h3>Seguridad</h3>
          <p>Protección de activos bajo estándares de nivel bancario.</p>
        </div>
        <div className="feature-card">
          <Globe className="text-green" size={40} />
          <h3>Global</h3>
          <p>Acceso desde cualquier lugar del mundo sin restricciones.</p>
        </div>
      </section>

      <style jsx>{`
        .main-landing {
          background-color: #020406;
          color: white;
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
        }
        .nav-blur {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 100;
          backdrop-filter: blur(10px);
          background: rgba(2, 4, 6, 0.7);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .nav-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .brand { font-weight: 900; font-size: 1.5rem; letter-spacing: -1px; }
        .text-green { color: #00C853; }
        .btn-main { background: #00C853; color: black; border: none; padding: 10px 20px; border-radius: 10px; font-weight: bold; cursor: pointer; }

        .hero { padding: 150px 20px 100px; max-width: 1200px; margin: 0 auto; }
        .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 50px; align-items: center; }
        .badge { background: rgba(0, 200, 83, 0.1); color: #00C853; padding: 5px 15px; border-radius: 20px; display: inline-block; font-size: 12px; font-weight: bold; margin-bottom: 20px; border: 1px solid rgba(0, 200, 83, 0.2); }
        .main-title { font-size: 4rem; line-height: 1; font-weight: 900; margin-bottom: 25px; }
        .gradient-text { background: linear-gradient(90deg, #00C853, #b2ffce); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-sub { color: #888; font-size: 1.2rem; max-width: 500px; margin-bottom: 40px; line-height: 1.6; }
        
        .btn-primary { background: white; color: black; border: none; padding: 20px 40px; border-radius: 15px; font-size: 1.1rem; font-weight: 900; display: flex; align-items: center; gap: 10px; cursor: pointer; transition: 0.3s; }
        .btn-primary:hover { transform: scale(1.05); box-shadow: 0 0 30px rgba(255,255,255,0.2); }

        .hero-visual { position: relative; display: flex; justify-content: center; align-items: center; }
        .main-orb { width: 400px; height: 400px; background: radial-gradient(circle, rgba(0, 200, 83, 0.2) 0%, transparent 70%); border-radius: 50%; filter: blur(40px); animation: pulse 4s infinite; }
        .stat-card { position: absolute; background: rgba(10, 12, 16, 0.8); border: 1px solid rgba(255,255,255,0.05); padding: 20px; border-radius: 20px; display: flex; align-items: center; gap: 15px; backdrop-filter: blur(10px); width: 220px; }
        .floating-1 { top: 10%; right: 0; animation: float 5s ease-in-out infinite; }
        .floating-2 { bottom: 20%; left: 0; animation: float 6s ease-in-out infinite reverse; }
        .stat-label { font-size: 10px; color: #555; margin: 0; font-weight: bold; }
        .stat-value { font-size: 20px; font-weight: 900; color: white; margin: 0; }

        .features { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 30px; padding: 100px 20px; }
        .feature-card { background: #0a0c10; padding: 40px; border-radius: 30px; border: 1px solid #111; transition: 0.3s; }
        .feature-card:hover { border-color: #00C853; transform: translateY(-10px); }
        .feature-card h3 { margin: 20px 0 10px; font-size: 1.5rem; }
        .feature-card p { color: #666; font-size: 0.9rem; line-height: 1.6; }

        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr; text-align: center; }
          .hero-text { display: flex; flex-direction: column; align-items: center; }
          .main-title { font-size: 2.5rem; }
          .hero-visual { margin-top: 50px; }
          .features { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}