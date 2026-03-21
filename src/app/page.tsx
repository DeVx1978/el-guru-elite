"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  TrendingUp, ShieldCheck, Zap, ChevronRight, 
  ArrowUpRight, Wallet, Activity, Lock
} from 'lucide-react';

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // 1. PANTALLA DE CARGA (SPLASH SCREEN) - IMPACTO INICIAL
  if (loading) {
    return (
      <div className="splash">
        <div className="loader-container">
          <div className="pulse-ring"></div>
          <div className="image-wrapper">
            <img src="/images/guru.jpg" alt="El Guru Elite" />
          </div>
          <div className="scan-line"></div>
        </div>
        <div className="loading-bar-container">
          <div className="loading-bar-progress"></div>
        </div>
        <h2 className="loading-text">IDENTIFICANDO SOCIO ÉLITE...</h2>

        <style jsx>{`
          .splash {
            background: #000;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            overflow: hidden;
          }
          .loader-container {
            position: relative;
            width: 200px;
            height: 200px;
            margin-bottom: 30px;
          }
          .image-wrapper {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            overflow: hidden;
            border: 2px solid #00C853;
            box-shadow: 0 0 50px rgba(0, 200, 83, 0.3);
            position: relative;
            z-index: 2;
          }
          .image-wrapper img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .pulse-ring {
            position: absolute;
            top: -10%; left: -10%; width: 120%; height: 120%;
            border: 2px solid #00C853;
            border-radius: 50%;
            animation: pulse 2s infinite;
            opacity: 0.5;
          }
          .scan-line {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 4px;
            background: #00C853;
            box-shadow: 0 0 15px #00C853;
            z-index: 3;
            animation: scan 2.5s ease-in-out infinite;
          }
          .loading-bar-container {
            width: 250px;
            height: 2px;
            background: rgba(255,255,255,0.1);
            border-radius: 10px;
            overflow: hidden;
          }
          .loading-bar-progress {
            width: 0%;
            height: 100%;
            background: #00C853;
            animation: progress 5s linear forwards;
          }
          .loading-text {
            color: #00C853;
            font-size: 10px;
            letter-spacing: 4px;
            margin-top: 15px;
            font-weight: 300;
          }
          @keyframes pulse { 0% { transform: scale(0.9); opacity: 1; } 100% { transform: scale(1.3); opacity: 0; } }
          @keyframes scan { 0%, 100% { top: 0%; } 50% { top: 100%; } }
          @keyframes progress { 100% { width: 100%; } }
        `}</style>
      </div>
    );
  }

  return (
    <div className="elite-landing">
      {/* 2. HEADER PROFESIONAL */}
      <nav className="navbar">
        <div className="nav-logo">
          <span className="logo-text">EL GURÚ <span className="neon-text">ÉLITE</span></span>
        </div>
        <button onClick={() => router.push('/unete')} className="btn-access">ACCESO PRIVADO</button>
      </nav>

      {/* 3. HERO SECTION - REEMPLAZA LAS GRÁFICAS FEAS */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-tag">INVESTMENT TERMINAL V4.0</div>
          <h1 className="hero-title">
            LA CIENCIA DE LA <br/>
            <span className="gradient-text">RENTABILIDAD</span>
          </h1>
          <p className="hero-description">
            Plataforma exclusiva de gestión de capital institucional y deportiva. 
            Algoritmos de alta frecuencia diseñados para el 1% de los inversores.
          </p>
          
          <div className="hero-buttons">
            <button onClick={() => router.push('/unete')} className="btn-primary">
              COMENZAR AHORA <ArrowUpRight size={18} />
            </button>
          </div>
        </div>

        <div className="hero-visual">
          {/* Aquí reemplazamos las barras feas por un visual de "Dashboard Futuro" */}
          <div className="glass-card main-stat">
            <Activity color="#00C853" size={32} />
            <div className="stat-info">
              <span className="stat-label">RENDIMIENTO PROMEDIO</span>
              <span className="stat-num">+18.5% <small>MENSUAL</small></span>
            </div>
          </div>
          <div className="glass-card secondary-stat">
            <ShieldCheck color="#00C853" size={24} />
            <span>OPERACIÓN PROTEGIDA</span>
          </div>
          <div className="glow-orb"></div>
        </div>
      </section>

      {/* 4. PLANES REDISEÑADOS (Sin los cuadros planos verdes) */}
      <section className="plans-section">
        <h2 className="section-title">PORTAFOLIO DE INVERSIÓN</h2>
        <div className="plans-grid">
          {[
            { name: 'Micro', price: '100', perk: '0.067% Utilidad' },
            { name: 'Activo', price: '500', perk: '0.333% Utilidad' },
            { name: 'Élite', price: '1500', perk: '1.0% Utilidad' }
          ].map((plan) => (
            <div key={plan.name} className="plan-card">
              <div className="plan-name">{plan.name}</div>
              <div className="plan-price"><span>$</span>{plan.price}</div>
              <div className="plan-perk">{plan.perk}</div>
              <button onClick={() => router.push('/unete')} className="btn-select">SELECCIONAR</button>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        .elite-landing {
          background-color: #020406;
          color: white;
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
        }
        .navbar {
          padding: 30px 50px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .logo-text { font-weight: 900; font-size: 1.2rem; letter-spacing: -0.5px; }
        .neon-text { color: #00C853; text-shadow: 0 0 10px rgba(0,200,83,0.5); }
        .btn-access {
          background: transparent;
          border: 1px solid #00C853;
          color: #00C853;
          padding: 8px 20px;
          border-radius: 5px;
          font-size: 12px;
          font-weight: bold;
          cursor: pointer;
        }

        .hero {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          padding: 100px 50px;
          gap: 40px;
        }
        .hero-tag { color: #00C853; font-size: 11px; font-weight: 900; letter-spacing: 3px; margin-bottom: 20px; }
        .hero-title { font-size: 4.5rem; font-weight: 900; line-height: 0.9; margin-bottom: 30px; }
        .gradient-text { background: linear-gradient(180deg, #fff 0%, #00C853 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-description { color: #888; font-size: 1.1rem; line-height: 1.6; margin-bottom: 40px; max-width: 500px; }

        .btn-primary {
          background: #00C853;
          color: black;
          border: none;
          padding: 18px 40px;
          border-radius: 5px;
          font-weight: 900;
          display: flex;
          align-items: center;
          gap: 15px;
          cursor: pointer;
          transition: 0.3s;
        }

        .hero-visual { position: relative; display: flex; justify-content: center; align-items: center; }
        .glass-card {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.05);
          padding: 25px;
          border-radius: 20px;
          z-index: 5;
        }
        .main-stat { display: flex; gap: 20px; align-items: center; width: 300px; }
        .stat-label { font-size: 10px; color: #555; display: block; }
        .stat-num { font-size: 24px; font-weight: 900; color: white; display: block; }
        .glow-orb {
          position: absolute;
          width: 300px; height: 300px;
          background: #00C853;
          filter: blur(120px);
          opacity: 0.2;
        }

        .plans-section { padding: 100px 50px; text-align: center; }
        .section-title { font-size: 10px; letter-spacing: 5px; color: #555; margin-bottom: 50px; }
        .plans-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 1000px; margin: 0 auto; }
        .plan-card {
          background: #0a0c10;
          border: 1px solid #111;
          padding: 40px 20px;
          border-radius: 5px;
          transition: 0.3s;
        }
        .plan-card:hover { border-color: #00C853; transform: translateY(-10px); }
        .plan-name { color: #555; font-size: 12px; font-weight: 900; text-transform: uppercase; margin-bottom: 15px; }
        .plan-price { font-size: 48px; font-weight: 900; margin-bottom: 10px; }
        .plan-price span { font-size: 20px; color: #00C853; }
        .plan-perk { color: #888; font-size: 13px; margin-bottom: 30px; }
        .btn-select {
          background: transparent;
          border: 1px solid #222;
          color: white;
          width: 100%;
          padding: 12px;
          font-weight: bold;
          cursor: pointer;
        }
        .btn-select:hover { background: white; color: black; }

        @media (max-width: 900px) {
          .hero { grid-template-columns: 1fr; text-align: center; padding: 50px 20px; }
          .hero-title { font-size: 2.8rem; }
          .hero-buttons { display: flex; justify-content: center; }
          .plans-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}