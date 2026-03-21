"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, ArrowUpRight, Lock, FileText, Scale, Activity, Zap, TrendingUp, Globe
} from 'lucide-react';

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  // --- BLINDAJE DE ENTRADA (SPLASH SCREEN) ---
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // --- CORRECCIÓN DEFINITIVA: NAVEGACIÓN SIN PARPADEO ---
  const navegarPrivado = async () => {
    // 1. Activamos una capa de bloqueo visual instantánea
    setIsNavigating(true); 
    // 2. Ejecutamos la navegación
    router.push('/panel');
  };

  // Si estamos cargando inicialmente o navegando, mostramos negro absoluto
  if (loading || isNavigating) {
    return (
      <div className="splash-master">
        <div className="loader-container">
          <div className="pulse-ring"></div>
          <div className="image-wrapper">
            <img src="/images/guru.jpg" alt="El Guru Elite" fetchPriority="high" />
          </div>
          <div className="scan-line"></div>
        </div>
        <div className="loading-text-wrapper">
          <h2 className="loading-text">SISTEMA ÉLITE: {isNavigating ? 'ACCEDIENDO...' : 'IDENTIFICANDO INVERSOR...'}</h2>
        </div>

        <style jsx global>{`
          .splash-master {
            background: #000 !important;
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            display: flex; flex-direction: column; justify-content: center; align-items: center;
            z-index: 99999999; overflow: hidden;
          }
          .loader-container { position: relative; width: 220px; height: 220px; margin-bottom: 40px; }
          .image-wrapper {
            width: 100%; height: 100%; border-radius: 50%; overflow: hidden;
            border: 2px solid #00C853; box-shadow: 0 0 80px rgba(0, 200, 83, 0.4);
            position: relative; z-index: 2;
          }
          .image-wrapper img { width: 100%; height: 100%; object-fit: cover; }
          .pulse-ring {
            position: absolute; top: -20%; left: -20%; width: 140%; height: 140%;
            border: 1px solid #00C853; border-radius: 50%; animation: pulse-master 2s infinite; opacity: 0.3;
          }
          .scan-line {
            position: absolute; top: 0; left: 0; width: 100%; height: 10px;
            background: linear-gradient(to right, transparent, #00C853, transparent);
            box-shadow: 0 0 25px #00C853; z-index: 3; animation: scan-master 3s ease-in-out infinite;
          }
          .loading-text-wrapper { width: 100%; text-align: center; }
          .loading-text { color: #00C853; font-size: 11px; letter-spacing: 8px; margin-top: 25px; font-weight: 300; text-transform: uppercase; }
          @keyframes pulse-master { 0% { transform: scale(0.7); opacity: 0.8; } 100% { transform: scale(1.5); opacity: 0; } }
          @keyframes scan-master { 0%, 100% { top: 0%; } 50% { top: 100%; } }
        `}</style>
      </div>
    );
  }

  const membresias = [
    { name: 'Micro', price: '100', perk: 'Nivel 1: Acceso Base', delay: '0.1s' },
    { name: 'Inicial', price: '250', perk: 'Nivel 2: Gestión Activa', delay: '0.2s' },
    { name: 'Activo', price: '500', perk: 'Nivel 3: Capital Auditado', delay: '0.3s' },
    { name: 'Premium', price: '1000', perk: 'Nivel 4: Prioridad Institucional', delay: '0.4s' },
    { name: 'Élite', price: '1500', perk: 'Nivel 5: Fondo Global VIP', delay: '0.5s' }
  ];

  return (
    <div className="elite-landing-master">
      <nav className="navbar-elite">
        <div className="nav-container">
          <div className="brand-logo">
            <span className="logo-main">EL GURÚ <span className="logo-neon">ÉLITE</span></span>
          </div>
          <div className="nav-controls">
            <button onClick={navegarPrivado} className="btn-access-priv">ACCESO PRIVADO</button>
          </div>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-layout">
          <div className="hero-content-left">
            <div className="elite-tag">ELITE INVESTMENT NETWORK V5.5</div>
            <h1 className="hero-title-main">
              ARQUITECTURA DE <br/>
              <span className="text-gradient-neon">RENTABILIDAD</span>
            </h1>
            <p className="hero-description-premium">
              Plataforma exclusiva de gestión de capital institucional y deportiva. 
              Algoritmos de alta frecuencia diseñados para el 1% de los inversores globales.
            </p>
            <div className="hero-cta-box">
              <button onClick={() => router.push('/unete')} className="btn-hero-glow">
                COMENZAR AHORA <ArrowUpRight size={22} />
              </button>
            </div>
          </div>

          <div className="hero-visual-right">
            <div className="master-glow-orb"></div>
            <div className="floating-stat-card glass-morphism card-pos-1">
              <div className="stat-icon-wrapper">
                <Activity size={28} color="#00C853" />
              </div>
              <div className="stat-text-box">
                <span className="label-top">PROFIT PROMEDIO</span>
                <span className="value-main">+18.5% <small>MES</small></span>
              </div>
            </div>
            <div className="floating-stat-card glass-morphism card-pos-2">
              <ShieldCheck size={22} color="#00C853" />
              <span className="shield-text">CAPITAL 100% PROTEGIDO</span>
            </div>
          </div>
        </div>
      </section>

      <section id="proyecto-inversionistas" className="plans-master-section">
        <div className="section-header-elite">
          <span className="header-tag">MERCADO DE CAPITAL PRIVADO</span>
          <h2 className="header-title">PROYECTO INVERSIONISTAS</h2>
          <div className="header-line"></div>
        </div>
        <div className="plans-grid-elite">
          {membresias.map((plan) => (
            <div key={plan.name} className="plan-card-elite fade-up-anim" style={{animationDelay: plan.delay}}>
              <div className="plan-card-inner">
                <h4 className="p-name-title">{plan.name}</h4>
                <div className="p-price-box">
                  <span className="p-curr">$</span>
                  <span className="p-num">{plan.price}</span>
                  <span className="p-tag-usd">USD</span>
                </div>
                <div className="p-sep-line"></div>
                <p className="p-perk-text">{plan.perk}</p>
                <button onClick={() => router.push('/unete')} className="btn-plan-select">SELECCIONAR</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer-elite-master">
        <div className="footer-container">
          <div className="footer-legal-links">
            <a href="/terminos" className="f-legal-item"><Scale size={16}/> Términos</a>
            <a href="/privacidad" className="f-legal-item"><FileText size={16}/> Privacidad</a>
            <a href="/confidencialidad" className="f-legal-item"><Lock size={16}/> Confidencialidad</a>
          </div>
          <p className="f-copy-txt">&copy; 2026 EL GURÚ ÉLITE. TODOS LOS DERECHOS RESERVADOS.</p>
        </div>
      </footer>

      <style jsx global>{`
        :root { --neon: #00C853; --glass: rgba(15, 15, 15, 0.7); }
        .elite-landing-master { background: #000; color: white; font-family: 'Inter', sans-serif; overflow-x: hidden; scroll-behavior: smooth; padding-top: 100px; }
        .navbar-elite { position: fixed; top: 0; width: 100%; z-index: 1000; background: rgba(0,0,0,0.9); backdrop-filter: blur(30px); border-bottom: 1px solid rgba(255,255,255,0.05); }
        .nav-container { max-width: 1400px; margin: 0 auto; padding: 25px 30px; display: flex; justify-content: space-between; align-items: center; }
        .logo-main { font-weight: 900; font-size: 1.4rem; letter-spacing: -1px; }
        .logo-neon { color: var(--neon); text-shadow: 0 0 20px rgba(0, 200, 83, 0.5); }
        .btn-access-priv { background: transparent; border: 1px solid var(--neon); color: var(--neon); padding: 10px 24px; border-radius: 4px; font-weight: 900; font-size: 11px; cursor: pointer; transition: 0.4s; }
        .btn-access-priv:hover { background: var(--neon); color: black; box-shadow: 0 0 20px rgba(0,200,83,0.4); }

        .hero-section { max-width: 1400px; margin: 0 auto; padding: 120px 30px; }
        .hero-layout { display: grid; grid-template-columns: 1fr; gap: 80px; }
        @media (min-width: 1100px) { .hero-layout { grid-template-columns: 1.2fr 0.8fr; align-items: center; } }
        .hero-title-main { font-size: 3.5rem; font-weight: 900; line-height: 0.95; margin-bottom: 35px; letter-spacing: -3px; }
        @media (min-width: 768px) { .hero-title-main { font-size: 5.5rem; } }
        .text-gradient-neon { background: linear-gradient(180deg, #fff 40%, var(--neon) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .btn-hero-glow { background: var(--neon); color: black; border: none; padding: 22px 50px; border-radius: 4px; font-weight: 900; font-size: 15px; display: flex; align-items: center; gap: 15px; cursor: pointer; }
        
        .hero-visual-right { position: relative; height: 450px; display: flex; justify-content: center; align-items: center; }
        .master-glow-orb { position: absolute; width: 450px; height: 450px; background: var(--neon); filter: blur(160px); opacity: 0.15; z-index: 1; }
        .glass-morphism { background: var(--glass); backdrop-filter: blur(35px); border: 1px solid rgba(255,255,255,0.06); border-radius: 20px; padding: 35px; z-index: 10; }
        .floating-stat-card { position: absolute; animation: float-master 6s ease-in-out infinite; }
        .card-pos-1 { top: 10%; right: 5%; width: 300px; display: flex; gap: 20px; align-items: center; }
        .card-pos-2 { bottom: 15%; left: 0; display: flex; gap: 14px; align-items: center; font-size: 12px; font-weight: 900; color: #888; }

        .plans-master-section { padding: 140px 30px; max-width: 1550px; margin: 0 auto; }
        .plans-grid-elite { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 30px; }
        .plan-card-elite { background: #080808; border: 1px solid #111; border-radius: 12px; transition: 0.5s; position: relative; overflow: hidden; }
        .plan-card-elite:hover { border-color: var(--neon); transform: translateY(-15px); box-shadow: 0 35px 70px rgba(0, 200, 83, 0.18); }
        .plan-card-inner { padding: 60px 35px; text-align: center; }
        .p-name-title { color: var(--neon); font-size: 1.9rem; font-weight: 900; text-transform: uppercase; margin-bottom: 35px; }
        .p-num { font-size: 4.5rem; font-weight: 900; color: white; line-height: 1; }

        .footer-elite-master { padding: 120px 30px 80px; background: #050505; text-align: center; border-top: 1px solid #111; }
        .footer-legal-links { display: flex; justify-content: center; gap: 60px; margin-bottom: 50px; flex-wrap: wrap; }
        .f-legal-item { color: #333; text-decoration: none; font-size: 13px; display: flex; align-items: center; gap: 12px; }

        @keyframes float-master { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        .fade-up-anim { opacity: 0; animation: fadeUpMaster 1.2s ease forwards; }
        @keyframes fadeUpMaster { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}