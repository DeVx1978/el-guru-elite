"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, ArrowUpRight, Menu, X, Lock, FileText, Scale, Activity, Zap, Globe, ChevronDown 
} from 'lucide-react';

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [seccionExpandida, setSeccionExpandida] = useState<string | null>(null);
  const router = useRouter();

  // --- BLOQUEO TOTAL DE PARPADEO INICIAL (5 SEGUNDOS) ---
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const toggleSeccion = (seccion: string) => {
    setSeccionExpandida(seccionExpandida === seccion ? null : seccion);
  };

  // Navegación limpia para evitar parpadeos visuales
  const navegarPrivado = () => {
    setLoading(true); // Re-activamos brevemente una capa de transición
    router.push('/panel');
  };

  // 1. PANTALLA DE CARGA (SPLASH SCREEN) - CORRECCIÓN DE CENTRADO
  if (loading) {
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
          <h2 className="loading-text">SISTEMA ÉLITE: IDENTIFICANDO INVERSOR...</h2>
        </div>

        <style jsx global>{`
          .splash-master {
            background: #000;
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            display: flex; flex-direction: column; justify-content: center; align-items: center;
            z-index: 999999; overflow: hidden;
          }
          .loader-container { position: relative; width: 200px; height: 200px; margin-bottom: 40px; }
          .image-wrapper {
            width: 100%; height: 100%; border-radius: 50%; overflow: hidden;
            border: 2px solid #00C853; box-shadow: 0 0 60px rgba(0, 200, 83, 0.5);
            position: relative; z-index: 2;
          }
          .image-wrapper img { width: 100%; height: 100%; object-fit: cover; }
          .pulse-ring {
            position: absolute; top: -15%; left: -15%; width: 130%; height: 130%;
            border: 2px solid #00C853; border-radius: 50%; animation: pulse 2s infinite; opacity: 0.4;
          }
          .scan-line {
            position: absolute; top: 0; left: 0; width: 100%; height: 8px;
            background: linear-gradient(to right, transparent, #00C853, transparent);
            box-shadow: 0 0 20px #00C853; z-index: 3; animation: scan 2.5s ease-in-out infinite;
          }
          /* CORRECCIÓN DE CENTRADO DEL TEXTO */
          .loading-text-wrapper {
            width: 100%;
            display: flex;
            justify-content: center;
            text-align: center;
          }
          .loading-text { 
            color: #00C853; 
            font-size: 10px; 
            letter-spacing: 6px; 
            margin-top: 20px; 
            font-weight: 300; 
            text-transform: uppercase;
            width: auto;
          }
          @keyframes pulse { 0% { transform: scale(0.8); opacity: 1; } 100% { transform: scale(1.4); opacity: 0; } }
          @keyframes scan { 0%, 100% { top: 0%; } 50% { top: 100%; } }
        `}</style>
      </div>
    );
  }

  const membresias = [
    { name: 'Micro', price: '100', perk: '0.067% Utilidad Diaria', delay: '0.1s' },
    { name: 'Inicial', price: '250', perk: '0.167% Utilidad Diaria', delay: '0.2s' },
    { name: 'Activo', price: '500', perk: '0.333% Utilidad Diaria', delay: '0.3s' },
    { name: 'Premium', price: '1000', perk: '0.667% Utilidad Diaria', delay: '0.4s' },
    { name: 'Élite', price: '1500', perk: '1.0% Utilidad Diaria', delay: '0.5s' }
  ];

  const seccionesInfo = [
    { id: 'quienes-somos', title: 'Quiénes Somos', text: 'Somos un ecosistema de analistas cuantitativos y desarrolladores dedicados a la optimización de capital mediante modelos predictivos avanzados.' },
    { id: 'proyecto-guru', title: 'Proyecto Gurú', text: 'Motor de inteligencia artificial que procesa ineficiencias de mercado en tiempo real mediante probabilidad matemática avanzada.' },
    { id: 'proyecto-inversionistas', title: 'Proyecto Inversionistas', text: 'Modelos de participación ajustados a su perfil de capital. Selecciona tu nivel de participación en las utilidades globales.' }
  ];

  return (
    <div className="elite-landing">
      {/* 2. NAVBAR (ESTÉTICA CORREGIDA) */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-logo">
            <span className="logo-text">EL GURÚ <span className="neon-text">ÉLITE</span></span>
          </div>
          
          <div className="nav-actions">
            {/* CORRECCIÓN: Acción con limpieza de transición */}
            <button onClick={navegarPrivado} className="btn-access">ACCESO PRIVADO</button>
            <div className="hamburger-wrapper">
              <button onClick={() => setMenuAbierto(!menuAbierto)} className="btn-hamburger">
                {menuAbierto ? <X size={28} color="white" /> : <Menu size={28} color="white" />}
              </button>
            </div>
          </div>
        </div>

        {/* MENÚ HAMBURGUESA INTERACTIVO */}
        {menuAbierto && (
          <div className="mobile-menu fade-in">
            {seccionesInfo.map((seccion) => (
              <div key={seccion.id} className="menu-item-wrapper">
                <button onClick={() => toggleSeccion(seccion.id)} className="mobile-link-accordion">
                  {seccion.title}
                  <ChevronDown size={18} className={`accordion-icon ${seccionExpandida === seccion.id ? 'rotate' : ''}`} />
                </button>
                {seccionExpandida === seccion.id && (
                  <div className="seccion-texto-desplegado fade-in-down">
                    <p>{seccion.text}</p>
                  </div>
                )}
              </div>
            ))}
            <div className="menu-divider"></div>
            <p className="menu-subtext">TERMINAL DE ALTA SEGURIDAD</p>
          </div>
        )}
      </nav>

      {/* 3. HERO SECTION */}
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-text-content">
            <div className="hero-badge">INVESTMENT NETWORK V4.6</div>
            <h1 className="hero-main-title">
              ARQUITECTURA DE <br/>
              <span className="gradient-text">RENTABILIDAD</span>
            </h1>
            <p className="hero-description">
              Plataforma exclusiva de gestión de capital institucional y deportiva. 
              Algoritmos de alta frecuencia diseñados para el 1% de los inversores globales.
            </p>
            <div className="hero-cta-group">
              <button onClick={() => router.push('/unete')} className="btn-main-cta">
                COMENZAR AHORA <ArrowUpRight size={20} />
              </button>
            </div>
          </div>

          <div className="hero-visual-container">
            <div className="glow-orb-bg"></div>
            <div className="floating-card-1 glass-effect">
              <div className="icon-box-green"><Activity size={24} /></div>
              <div className="card-data">
                <span className="card-label">PROFIT PROMEDIO</span>
                <span className="card-val">+18.5% <small>MES</small></span>
              </div>
            </div>
            <div className="floating-card-2 glass-effect">
              <ShieldCheck color="#00C853" size={20} />
              <span>CAPITAL 100% PROTEGIDO</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PORTAFOLIO DE 5 MEMBRESÍAS */}
      <section id="proyecto-inversionistas" className="plans-area">
        <div className="plans-header">
          <h2 className="tag-line">MERCADO PRIVADO</h2>
          <h3 className="title-section">PORTAFOLIO DE INVERSIÓN</h3>
          <p className="plans-sub">Selecciona tu nivel de participación global.</p>
        </div>
        
        <div className="plans-grid-master">
          {membresias.map((plan) => (
            <div key={plan.name} className="membership-card fade-in-up" style={{animationDelay: plan.delay}}>
              <div className="card-header">
                <span className="s-tag">SOCIO</span>
                <h4 className="s-name">{plan.name}</h4>
              </div>
              <div className="card-body">
                <div className="s-price">
                  <span className="s-currency">$</span>
                  <span className="s-amount">{plan.price}</span>
                  <span className="s-usd">USD</span>
                </div>
                <div className="s-divider"></div>
                <p className="s-perk">{plan.perk}</p>
                <p className="s-desc">Acceso a terminal de señales Élite.</p>
              </div>
              <button onClick={() => router.push('/unete')} className="s-btn">SELECCIONAR</button>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FOOTER LEGAL */}
      <footer className="footer-master">
        <div className="footer-wrap">
          <div className="f-legal">
            <a href="/terminos" className="f-link"><Scale size={14}/> Términos</a>
            <a href="/privacidad" className="f-link"><FileText size={14}/> Privacidad</a>
            <a href="/confidencialidad" className="f-link"><Lock size={14}/> Confidencialidad</a>
          </div>
          <div className="f-divider"></div>
          <p className="f-copy">&copy; 2026 EL GURÚ ÉLITE. TODOS LOS DERECHOS RESERVADOS.</p>
        </div>
      </footer>

      <style jsx global>{`
        :root { --neon: #00C853; --dark: #020406; --glass: rgba(20, 20, 20, 0.5); }
        .elite-landing { background: #000; color: white; font-family: 'Inter', sans-serif; scroll-behavior: smooth; }
        
        .navbar { position: fixed; top: 0; width: 100%; z-index: 1000; background: rgba(0,0,0,0.9); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.03); }
        .nav-content { max-width: 1200px; margin: 0 auto; padding: 18px 25px; display: flex; justify-content: space-between; align-items: center; }
        .logo-text { font-weight: 900; font-size: 1.2rem; }
        .neon-text { color: var(--neon); text-shadow: 0 0 15px rgba(0,200,83,0.3); }
        
        /* CORRECCIÓN DE POSICIÓN DE ACCIONES */
        .nav-actions { display: flex; align-items: center; gap: 25px; }
        .btn-access { background: transparent; border: 1px solid var(--neon); color: var(--neon); padding: 8px 18px; border-radius: 4px; font-weight: 900; font-size: 10px; cursor: pointer; transition: 0.3s; }
        .btn-access:hover { background: var(--neon); color: black; }
        .hamburger-wrapper { display: flex; align-items: center; }
        .btn-hamburger { background: transparent; border: none; cursor: pointer; padding: 0; }

        .mobile-menu { position: absolute; top: 100%; left: 0; width: 100%; background: #080808; padding: 40px; display: flex; flex-direction: column; gap: 15px; border-bottom: 1px solid #111; }
        .mobile-link-accordion { background: transparent; border: none; color: white; width: 100%; display: flex; justify-content: space-between; align-items: center; font-size: 15px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; cursor: pointer; padding: 12px 0; border-bottom: 1px solid #111; }
        .accordion-icon { transition: transform 0.3s ease; }
        .accordion-icon.rotate { transform: rotate(180deg); color: var(--neon); }
        .seccion-texto-desplegado { color: #666; font-size: 13px; line-height: 1.6; padding: 10px 0; }
        .menu-divider { width: 30px; height: 1px; background: #222; margin: 20px auto; }
        .menu-subtext { color: #222; font-size: 10px; font-weight: 900; letter-spacing: 3px; text-align: center; }

        .hero { max-width: 1200px; margin: 0 auto; padding: 120px 25px 80px; }
        .hero-main-title { font-size: 3.2rem; font-weight: 900; line-height: 0.95; margin-bottom: 30px; }
        @media (min-width: 768px) { .hero-main-title { font-size: 4.8rem; } }
        .gradient-text { background: linear-gradient(180deg, #fff 40%, var(--neon) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-description { color: #666; font-size: 1.1rem; line-height: 1.6; margin-bottom: 40px; }
        .btn-main-cta { background: var(--neon); color: black; border: none; padding: 18px 40px; border-radius: 4px; font-weight: 900; cursor: pointer; display: flex; align-items: center; gap: 12px; }

        .plans-area { padding: 100px 25px; max-width: 1400px; margin: 0 auto; }
        .plans-grid-master { display: grid; grid-template-columns: 1fr; gap: 20px; }
        @media (min-width: 768px) { .plans-grid-master { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1100px) { .plans-grid-master { grid-template-columns: repeat(5, 1fr); } }
        .membership-card { background: #080808; border: 1px solid #111; padding: 40px 25px; border-radius: 8px; text-align: center; transition: 0.4s; }
        .membership-card:hover { border-color: var(--neon); transform: translateY(-10px); }
        .s-name { font-size: 1.6rem; font-weight: 900; color: var(--neon); margin: 5px 0 25px; text-transform: uppercase; }
        .s-amount { font-size: 3.5rem; font-weight: 900; color: white; }
        .s-btn { background: transparent; border: 1px solid #222; color: white; padding: 14px; width: 100%; border-radius: 4px; font-weight: 900; cursor: pointer; }
        .s-btn:hover { background: white; color: black; }

        .footer-master { padding: 80px 25px 50px; background: #050505; border-top: 1px solid #111; text-align: center; }
        .f-legal { display: flex; justify-content: center; gap: 40px; flex-wrap: wrap; margin-bottom: 30px; }
        .f-link { color: #444; text-decoration: none; font-size: 11px; font-weight: 600; display: flex; align-items: center; gap: 8px; }
        .f-link:hover { color: var(--neon); }

        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        .fade-in-up { opacity: 0; animation: fadeInUp 0.8s ease forwards; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.4s ease forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}