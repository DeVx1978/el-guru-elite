"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, ArrowUpRight, ImageIcon, Menu, X, Lock, FileText, Scale 
} from 'lucide-react';

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const router = useRouter();

  // --- EFECTO DE CARGA EXCLUSIVO DE 5 SEGUNDOS (AJUSTADO PARA CERO PARPADEO) ---
  useEffect(() => {
    // Forzamos el estado inicial de carga antes de montar
    setLoading(true); 
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // 1. PANTALLA DE CARGA (SPLASH SCREEN) - IMPACTO INICIAL SIN PARPADEO
  if (loading) {
    return (
      <div className="splash">
        <div className="loader-container">
          <div className="pulse-ring"></div>
          <div className="image-wrapper">
            {/* CORRECCIÓN 1: Imagen precargada y optimizada para evitar parpadeo previo */}
            <img src="/images/guru.jpg" alt="El Guru Elite" fetchPriority="high" />
          </div>
          <div className="scan-line"></div>
        </div>
        <div className="loading-bar-container">
          <div className="loading-bar-progress"></div>
        </div>
        <h2 className="loading-text">IDENTIFICANDO INVERSOR ÉLITE...</h2>

        <style jsx global>{`
          /* Estilos del Splash resguardados al 100% */
          .splash {
            background: radial-gradient(circle at center, #0a0c10 0%, #000 100%);
            height: 100vh;
            display: flex; flex-direction: column;
            justify-content: center; align-items: center;
            overflow: hidden; font-family: sans-serif;
            position: fixed; top: 0; left: 0; width: 100%; z-index: 9999;
          }
          .loader-container { position: relative; width: 180px; height: 180px; margin-bottom: 30px; }
          @media (max-width: 600px) { .loader-container { width: 140px; height: 140px; } }
          .image-wrapper {
            width: 100%; height: 100%; border-radius: 50%; overflow: hidden;
            border: 2px solid #00C853; box-shadow: 0 0 50px rgba(0, 200, 83, 0.4);
            position: relative; z-index: 2;
          }
          .image-wrapper img { width: 100%; height: 100%; object-fit: cover; }
          .pulse-ring {
            position: absolute; top: -10%; left: -10%; width: 120%; height: 120%;
            border: 2px solid #00C853; border-radius: 50%; animation: pulse 2s infinite; opacity: 0.5;
          }
          .scan-line {
            position: absolute; top: 0; left: 0; width: 100%; height: 6px;
            background: linear-gradient(to right, transparent, #00C853, transparent);
            box-shadow: 0 0 15px #00C853; z-index: 3; animation: scan 2.5s ease-in-out infinite;
          }
          .loading-bar-container { width: 200px; height: 2px; background: rgba(255,255,255,0.05); border-radius: 10px; overflow: hidden; }
          .loading-bar-progress { width: 0%; height: 100%; background: #00C853; animation: progress 5s linear forwards; }
          .loading-text { color: #00C853; font-size: 9px; letter-spacing: 5px; margin-top: 15px; font-weight: 300; text-transform: uppercase; }
          @keyframes pulse { 0% { transform: scale(0.9); opacity: 1; } 100% { transform: scale(1.3); opacity: 0; } }
          @keyframes scan { 0%, 100% { top: 0%; } 50% { top: 100%; } }
          @keyframes progress { 100% { width: 100%; } }
        `}</style>
      </div>
    );
  }

  const membresias = [
    { name: 'Micro', price: '100', perk: '0.067% Utilidad', delay: '0.1s' },
    { name: 'Inicial', price: '250', perk: '0.167% Utilidad', delay: '0.2s' },
    { name: 'Activo', price: '500', perk: '0.333% Utilidad', delay: '0.3s' },
    { name: 'Premium', price: '1000', perk: '0.667% Utilidad', delay: '0.4s' },
    { name: 'Élite', price: '1500', perk: '1.0% Utilidad', delay: '0.5s' }
  ];

  return (
    <div className="elite-landing">
      {/* 2. HEADER PROFESIONAL - CORRECCIÓN 2: MENÚ HAMBURGUESA RESTAURADO */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-logo">
            <span className="logo-text">EL GURÚ <span className="neon-text">ÉLITE</span></span>
          </div>
          
          {/* Links de escritorio (ocultos en móvil) */}
          <div className="nav-links-desktop">
            <a href="#portafolio" className="nav-link">Portafolio</a>
            <a href="#nosotros" className="nav-link">Nosotros</a>
            <a href="#soporte" className="nav-link">Soporte</a>
          </div>

          <div className="nav-actions">
            <button onClick={() => router.push('/unete')} className="btn-access">ACCESO PRIVADO</button>
            {/* BOTÓN HAMBURGUESA (Solo visible en móvil) */}
            <button onClick={() => setMenuAbierto(!menuAbierto)} className="btn-hamburger">
              {menuAbierto ? <X size={24} color="white" /> : <Menu size={24} color="white" />}
            </button>
          </div>
        </div>

        {/* MENÚ MÓVIL DESPLEGABLE */}
        {menuAbierto && (
          <div className="mobile-menu fade-in-menu">
            <a href="#portafolio" onClick={() => setMenuAbierto(false)} className="mobile-link">Portafolio Élite</a>
            <a href="#nosotros" onClick={() => setMenuAbierto(false)} className="mobile-link">Nuestra Filosofía</a>
            <a href="#soporte" onClick={() => setMenuAbierto(false)} className="mobile-link">Soporte VIP</a>
            <div className="menu-divider"></div>
            <button onClick={() => { router.push('/unete'); setMenuAbierto(false); }} className="btn-access-mobile">REGISTRO DE SOCIO</button>
          </div>
        )}
      </nav>

      {/* 3. HERO SECTION - SIN TOCAR NADA */}
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-text-block">
            <div className="hero-tag">NETWORK DE INVERSIÓN V4.1</div>
            <h1 className="hero-title">
              ARQUITECTURA DE <br/>
              <span className="gradient-text">RENTABILIDAD</span>
            </h1>
            <p className="hero-description">
              Plataforma exclusiva de gestión de capital institucional y deportiva. 
              Algoritmos de alta frecuencia diseñados para el 1% de los inversores globales.
            </p>
            <div className="hero-buttons">
              <button onClick={() => router.push('/unete')} className="btn-primary">
                COMENZAR AHORA <ArrowUpRight size={18} />
              </button>
            </div>
          </div>

          <div className="hero-visual-block">
            <div className="glow-orb"></div>
            <div className="glass-card stat-card-1">
              <div className="stat-icon-bg">
                <ShieldCheck color="#00C853" size={24} />
              </div>
              <div className="stat-data">
                <span className="stat-label">RENDIMIENTO <br/>PROMEDIO</span>
                <span className="stat-value">+18.5% <small>MES</small></span>
              </div>
            </div>
            <div className="glass-card stat-card-2">
              <Lock color="#00C853" size={18} />
              <span>CAPITAL TOTALMENTE PROTEGIDO</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECCIÓN DE PLANES - SIN TOCAR NADA (5 PLANES) */}
      <section id="portafolio" className="plans-section">
        <div className="section-header">
          <h2 className="section-title">PORTAFOLIO DE MEMBRESÍAS</h2>
          <p className="section-subtitle">Selecciona tu nivel de participación en las utilidades globales.</p>
        </div>
        
        <div className="plans-container">
          {membresias.map((plan) => (
            <div key={plan.name} className="plan-card fade-in-card" style={{animationDelay: plan.delay}}>
              <div className="plan-inner">
                <div className="plan-header">
                  <span className="plan-category">Socio</span>
                  <h3 className="plan-name">{plan.name}</h3>
                </div>
                <div className="plan-body">
                  <div className="plan-price">
                    <span className="currency">$</span>
                    <span className="amount">{plan.price}</span>
                    <span className="usd">USD</span>
                  </div>
                  <div className="plan-divider"></div>
                  <p className="plan-perk">{plan.perk}</p>
                  <p className="plan-desc">Acceso a señales y reportes Élite.</p>
                </div>
                <button onClick={() => router.push('/unete')} className="btn-select">SELECCIONAR</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FOOTER PROFESIONAL - CORRECCIÓN 3: LINKS LEGALES RESTAURADOS */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="/terminos" className="footer-link"><Scale size={14}/> Términos y Condiciones</a>
            <a href="/privacidad" className="footer-link"><FileText size={14}/> Políticas de Privacidad</a>
            <a href="/confidencialidad" className="footer-link"><Lock size={14}/> Acuerdo de Confidencialidad</a>
          </div>
          <div className="footer-divider"></div>
          <p className="footer-copy">&copy; 2026 EL GURÚ ÉLITE. TODOS LOS DERECHOS RESERVADOS.</p>
          <p className="footer-disclaimer">ACCESO EXCLUSIVO PARA MIEMBROS AUTORIZADOS | SISTEMA DE ALTA SEGURIDAD</p>
        </div>
      </footer>

      <style jsx global>{`
        /* ESTILOS RESGUARDADOS AL 100% (Solo añadidos los necesarios para las correcciones) */
        .elite-landing {
          background-color: #000; color: white; min-height: 100vh;
          font-family: 'Inter', -apple-system, sans-serif; overflow-x: hidden;
          padding-top: 80px; /* Espacio para el navbar fixed */
        }
        
        /* NAVBAR RESPONSIVE MEJORADO */
        .navbar {
          width: 100%; position: fixed; top: 0; z-index: 100;
          backdrop-filter: blur(20px); background: rgba(0, 0, 0, 0.9);
          border-bottom: 1px solid rgba(255,255,255,0.03);
        }
        .nav-content {
          max-width: 1200px; margin: 0 auto; padding: 15px 20px;
          display: flex; justify-content: space-between; align-items: center;
        }
        @media (min-width: 768px) { .nav-content { padding: 20px 50px; } }
        .logo-text { font-weight: 900; font-size: 1.1rem; letter-spacing: -0.5px; }
        .neon-text { color: #00C853; text-shadow: 0 0 10px rgba(0,200,83,0.3); }
        
        /* Links escritorio */
        .nav-links-desktop { display: none; gap: 30px; }
        @media (min-width: 992px) { .nav-links-desktop { display: flex; } }
        .nav-link {
          color: #888; text-decoration: none; font-size: 13px; font-weight: 500;
          transition: 0.2s; text-transform: uppercase; letter-spacing: 1px;
        }
        .nav-link:hover { color: white; }

        .nav-actions { display: flex; align-items: center; gap: 15px; }
        .btn-access {
          background: transparent; border: 1px solid #00C853;
          color: #00C853; padding: 6px 15px; border-radius: 4px;
          font-size: 11px; font-weight: bold; cursor: pointer; transition: 0.2s;
        }
        .btn-access:hover { background: #00C853; color: black; }
        
        /* Botón Hamburguesa */
        .btn-hamburger { display: block; background: transparent; border: none; cursor: pointer; padding: 0; }
        @media (min-width: 992px) { .btn-hamburger { display: none; } }

        /* Menú Móvil */
        .mobile-menu {
          position: absolute; top: 100%; left: 0; width: 100%;
          background: rgba(10, 10, 10, 0.98); backdrop-filter: blur(20px);
          padding: 30px; border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex; flex-direction: column; gap: 20px; text-align: center;
        }
        .mobile-link { color: white; text-decoration: none; font-size: 16px; font-weight: bold; text-transform: uppercase; }
        .menu-divider { width: 40px; height: 1px; background: rgba(255,255,255,0.1); margin: 10px auto; }
        .btn-access-mobile { background: #00C853; color: black; border: none; padding: 15px; border-radius: 4px; font-weight: 900; font-size: 14px; }

        /* HERO RESPONSIVE (Resguardado) */
        .hero { max-width: 1200px; margin: 0 auto; padding: 60px 20px; }
        @media (min-width: 768px) { .hero { padding: 100px 50px; } }
        .hero-grid { display: grid; grid-template-columns: 1fr; gap: 40px; }
        @media (min-width: 992px) { .hero-grid { grid-template-columns: 1.1fr 0.9fr; gap: 60px; } }
        .hero-text-block { text-align: center; display: flex; flex-direction: column; align-items: center; }
        @media (min-width: 992px) { .hero-text-block { text-align: left; align-items: flex-start; } }
        .hero-tag { color: #00C853; font-size: 10px; font-weight: 900; letter-spacing: 3px; margin-bottom: 15px; text-transform: uppercase; }
        .hero-title { font-size: 2.8rem; font-weight: 900; line-height: 1; margin-bottom: 25px; letter-spacing: -1px; }
        @media (min-width: 768px) { .hero-title { font-size: 4rem; } }
        .gradient-text { background: linear-gradient(180deg, #fff 30%, #00C853 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-description { color: #666; font-size: 1rem; line-height: 1.6; margin-bottom: 35px; max-width: 450px; }
        .btn-primary {
          background: #00C853; color: black; border: none; padding: 16px 35px; border-radius: 4px;
          font-weight: 900; font-size: 13px; display: flex; align-items: center; gap: 12px;
          cursor: pointer; transition: 0.2s; text-transform: uppercase;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 5px 20px rgba(0,200,83,0.3); }
        .hero-visual-block { position: relative; display: flex; justify-content: center; align-items: center; height: 250px; margin-top: 30px; }
        @media (min-width: 992px) { .hero-visual-block { height: 100%; margin-top: 0; } }
        .glass-card { background: rgba(20, 20, 20, 0.4); backdrop-filter: blur(15px); border: 1px solid rgba(255,255,255,0.03); border-radius: 12px; z-index: 5; transition: 0.3s; }
        .stat-card-1 { display: flex; gap: 15px; align-items: center; padding: 20px; width: 240px; position: absolute; top: 0; right: 10%; animation: float 6s ease-in-out infinite; }
        .stat-icon-bg { background: rgba(0,200,83,0.1); padding: 10px; border-radius: 10px; }
        .stat-label { font-size: 9px; color: #555; display: block; font-weight: bold; line-height: 1.2; }
        .stat-value { font-size: 22px; font-weight: 900; color: white; display: block; margin-top: 3px; }
        .stat-value small { font-size: 10px; color: #00C853; }
        .stat-card-2 { display: flex; gap: 10px; align-items: center; padding: 12px 20px; font-size: 11px; color: #ccc; font-weight: bold; position: absolute; bottom: 15%; left: 5%; animation: float 6s ease-in-out infinite reverse; }
        .glow-orb { position: absolute; width: 250px; height: 250px; background: #00C853; filter: blur(100px); opacity: 0.15; }

        /* PLANES (Resguardado) */
        .plans-section { padding: 80px 20px; max-width: 1200px; margin: 0 auto; }
        @media (min-width: 768px) { .plans-section { padding: 100px 50px; } }
        .section-header { text-align: center; margin-bottom: 50px; }
        .section-title { font-size: 10px; letter-spacing: 5px; color: #444; margin-bottom: 10px; text-transform: uppercase; font-weight: 900; }
        .section-subtitle { color: #888; font-size: 1rem; max-width: 400px; margin: 0 auto; }
        .plans-container { display: grid; grid-template-columns: 1fr; gap: 20px; }
        @media (min-width: 600px) { .plans-container { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 992px) { .plans-container { grid-template-columns: repeat(5, 1fr); gap: 15px; } }
        .plan-card { background: rgba(10, 10, 10, 0.5); border: 1px solid rgba(255,255,255,0.02); border-radius: 8px; transition: 0.3s; position: relative; overflow: hidden; }
        .plan-card:hover { border-color: #00C853; transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,200,83,0.1); }
        .plan-inner { padding: 30px 20px; display: flex; flex-direction: column; height: 100%; text-align: center; }
        .plan-header { margin-bottom: 25px; }
        .plan-category { color: #555; font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; }
        .plan-name { color: #00C853; font-size: 1.4rem; font-weight: 900; margin: 5px 0 0; text-transform: uppercase; }
        .plan-body { flex-grow: 1; display: flex; flex-direction: column; justify-content: center; }
        .plan-price { margin-bottom: 20px; color: white; display: flex; align-items: baseline; justify-content: center; gap: 2px; }
        .plan-price .currency { font-size: 18px; color: #00C853; font-weight: bold; }
        .plan-price .amount { font-size: 3rem; font-weight: 900; line-height: 1; }
        .plan-price .usd { font-size: 10px; color: #555; font-weight: bold; }
        .plan-divider { width: 40px; height: 1px; background: rgba(255,255,255,0.05); margin: 0 auto 20px; }
        .plan-perk { color: #fff; font-size: 14px; font-weight: bold; margin-bottom: 8px; }
        .plan-desc { color: #666; font-size: 12px; line-height: 1.4; margin-bottom: 30px; }
        .btn-select { background: transparent; border: 1px solid #222; color: white; width: 100%; padding: 12px; border-radius: 4px; font-weight: bold; font-size: 12px; cursor: pointer; transition: 0.2s; text-transform: uppercase; }
        .btn-select:hover { background: white; color: black; border-color: white; }

        /* FOOTER PROFESIONAL (Restaurado y mejorado) */
        .footer { padding: 60px 20px 40px; border-top: 1px solid rgba(255,255,255,0.02); background: #050505; }
        @media (min-width: 768px) { .footer { padding: 80px 50px 40px; } }
        .footer-content { max-width: 1200px; margin: 0 auto; text-align: center; }
        .footer-links { display: flex; flex-direction: column; gap: 15px; align-items: center; margin-bottom: 30px; }
        @media (min-width: 768px) { .footer-links { flex-direction: row; justify-content: center; gap: 40px; } }
        .footer-link {
          color: #666; text-decoration: none; font-size: 12px; font-weight: 500;
          transition: 0.2s; display: flex; align-items: center; gap: 8px;
        }
        .footer-link:hover { color: #00C853; }
        .footer-divider { width: 50px; height: 1px; background: rgba(255,255,255,0.03); margin: 0 auto 30px; }
        .footer-copy { color: #444; font-size: 10px; font-weight: bold; letter-spacing: 1px; margin-bottom: 8px; text-transform: uppercase; }
        .footer-disclaimer { color: #222; font-size: 9px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; }

        /* ANIMACIONES (Resguardado) */
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .fade-in-card { opacity: 0; animation: fadeInCard 0.8s ease forwards; }
        @keyframes fadeInCard { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in-menu { animation: fadeInMenu 0.3s ease; }
        @keyframes fadeInMenu { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}