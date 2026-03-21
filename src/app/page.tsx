"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, ArrowUpRight, Menu, X, Lock, FileText, Scale, Activity, Zap, Globe, ChevronDown, TrendingUp 
} from 'lucide-react';

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [seccionExpandida, setSeccionExpandida] = useState<string | null>(null);
  const router = useRouter();

  // --- BLINDAJE DE SEGURIDAD: 5 SEGUNDOS DE SPLASH ---
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const toggleSeccion = (id: string) => {
    setSeccionExpandida(seccionExpandida === id ? null : id);
  };

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
            z-index: 99999999; overflow: hidden;
          }
          .loader-container { position: relative; width: 220px; height: 220px; margin-bottom: 50px; }
          .image-wrapper {
            width: 100%; height: 100%; border-radius: 50%; overflow: hidden;
            border: 2px solid #00C853; box-shadow: 0 0 80px rgba(0, 200, 83, 0.4);
            position: relative; z-index: 2;
          }
          .image-wrapper img { width: 100%; height: 100%; object-fit: cover; }
          .pulse-ring {
            position: absolute; top: -20%; left: -20%; width: 140%; height: 140%;
            border: 1px solid #00C853; border-radius: 50%; animation: pulse-elite 2.5s infinite; opacity: 0.3;
          }
          .scan-line {
            position: absolute; top: 0; left: 0; width: 100%; height: 10px;
            background: linear-gradient(to right, transparent, #00C853, transparent);
            box-shadow: 0 0 25px #00C853; z-index: 3; animation: scan-elite 3s ease-in-out infinite;
          }
          .loading-text-wrapper { width: 100%; text-align: center; }
          .loading-text { color: #00C853; font-size: 11px; letter-spacing: 8px; margin-top: 25px; font-weight: 300; text-transform: uppercase; }
          
          @keyframes pulse-elite { 0% { transform: scale(0.7); opacity: 0.8; } 100% { transform: scale(1.5); opacity: 0; } }
          @keyframes scan-elite { 0%, 100% { top: 0%; opacity: 0; } 50% { top: 100%; opacity: 1; } }
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
    { id: 'quienes', title: 'Quiénes Somos', text: 'Ecosistema de analistas cuantitativos y desarrolladores dedicados a la optimización de capital mediante modelos predictivos avanzados.' },
    { id: 'proyecto-guru', title: 'Proyecto Gurú', text: 'Motor de Inteligencia Artificial que procesa ineficiencias de mercado en milisegundos para identificar arbitrajes de bajo riesgo.' },
    { id: 'inversionistas', title: 'Proyecto Inversionistas', text: 'Modelos de participación diseñados para socios que buscan rentabilidad institucional protegida bajo protocolos de seguridad SSL-256.' }
  ];

  return (
    <div className="elite-landing-master">
      {/* --- NAVBAR PREMIUM: CORRECCIÓN QUIRÚRGICA --- */}
      <nav className="navbar-elite">
        <div className="nav-container">
          <div className="brand-logo">
            <span className="logo-main">EL GURÚ <span className="logo-neon">ÉLITE</span></span>
          </div>
          
          <div className="nav-controls">
            <button onClick={() => router.push('/panel')} className="btn-access-priv">ACCESO PRIVADO</button>
            <div className="hamburger-box">
              <button onClick={() => setMenuAbierto(!menuAbierto)} className="btn-menu-trigger">
                {menuAbierto ? <X size={32} color="white" /> : <Menu size={32} color="white" />}
              </button>
            </div>
          </div>
        </div>

        {/* --- MENÚ ACORDEÓN: TEXTOS OCULTOS --- */}
        {menuAbierto && (
          <div className="mobile-dropdown fade-in-nav">
            <div className="dropdown-inner">
              {seccionesInfo.map((sec) => (
                <div key={sec.id} className="accordion-wrapper">
                  <button onClick={() => toggleSeccion(sec.id)} className="accordion-btn">
                    {sec.title}
                    <ChevronDown size={20} className={`chevron-anim ${seccionExpandida === sec.id ? 'active' : ''}`} />
                  </button>
                  {seccionExpandida === sec.id && (
                    <div className="accordion-content-box fade-down-fast">
                      <p>{sec.text}</p>
                    </div>
                  )}
                </div>
              ))}
              <div className="dropdown-footer">
                <span className="terminal-id">SISTEMA_ÉLITE_V5.1_ACTIVO</span>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION: RESTAURADA LA DENSIDAD VISUAL --- */}
      <section className="hero-section">
        <div className="hero-layout">
          <div className="hero-content-left">
            <div className="elite-tag">ELITE INVESTMENT NETWORK V5.1</div>
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

          {/* --- VISUALES FLOTANTES CON BLUR Y GLOW (RESTAURADOS) --- */}
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

            <div className="floating-stat-card glass-morphism card-pos-3">
              <TrendingUp size={22} color="#00C853" />
              <span className="shield-text">AUDITADO POR IA</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- PORTAFOLIO DE 5 MEMBRESÍAS: RESTAURADO --- */}
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
                <div className="plan-top">
                  <span className="p-type">SOCIO FUNDADOR</span>
                  <h4 className="p-name-title">{plan.name}</h4>
                </div>
                <div className="plan-middle">
                  <div className="p-price-box">
                    <span className="p-curr">$</span>
                    <span className="p-num">{plan.price}</span>
                    <span className="p-tag-usd">USD</span>
                  </div>
                  <div className="p-sep-line"></div>
                  <p className="p-perk-text">{plan.perk}</p>
                  <p className="p-legal-note">Acceso a terminal de señales Élite y reportes certificados.</p>
                </div>
                <button onClick={() => router.push('/unete')} className="btn-plan-select">SELECCIONAR</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER LEGAL RESTAURADO --- */}
      <footer className="footer-elite-master">
        <div className="footer-container">
          <div className="footer-legal-links">
            <a href="/terminos" className="f-legal-item"><Scale size={16}/> Términos Legales</a>
            <a href="/privacidad" className="f-legal-item"><FileText size={16}/> Privacidad</a>
            <a href="/confidencialidad" className="f-legal-item"><Lock size={16}/> Confidencialidad</a>
          </div>
          <div className="footer-hr"></div>
          <p className="f-copy-txt">&copy; 2026 EL GURÚ ÉLITE. TODOS LOS DERECHOS RESERVADOS.</p>
        </div>
      </footer>

      <style jsx global>{`
        /* --- ARQUITECTURA MAESTRA (500+ LÍNEAS) --- */
        :root { --neon: #00C853; --glass: rgba(15, 15, 15, 0.75); }
        .elite-landing-master { background: #000; color: white; font-family: 'Inter', sans-serif; overflow-x: hidden; scroll-behavior: smooth; }
        
        .navbar-elite { position: fixed; top: 0; width: 100%; z-index: 1000; background: rgba(0,0,0,0.9); backdrop-filter: blur(30px); border-bottom: 1px solid rgba(255,255,255,0.05); }
        .nav-container { max-width: 1400px; margin: 0 auto; padding: 25px 30px; display: flex; justify-content: space-between; align-items: center; }
        .logo-main { font-weight: 900; font-size: 1.4rem; letter-spacing: -1px; }
        .logo-neon { color: var(--neon); text-shadow: 0 0 20px rgba(0, 200, 83, 0.5); }
        
        /* NAVBAR CORRECCIÓN POSICIÓN */
        .nav-controls { display: flex; align-items: center; gap: 45px; }
        .btn-access-priv { background: transparent; border: 1px solid var(--neon); color: var(--neon); padding: 10px 24px; border-radius: 4px; font-weight: 900; font-size: 11px; cursor: pointer; transition: 0.4s; }
        .btn-access-priv:hover { background: var(--neon); color: black; box-shadow: 0 0 20px rgba(0, 200, 83, 0.4); }
        .btn-menu-trigger { background: transparent; border: none; cursor: pointer; display: flex; align-items: center; }

        /* ACORDEÓN DESPLEGABLE */
        .mobile-dropdown { position: absolute; top: 100%; left: 0; width: 100%; background: rgba(5, 5, 5, 0.98); backdrop-filter: blur(35px); border-bottom: 1px solid rgba(255,255,255,0.05); }
        .dropdown-inner { max-width: 1200px; margin: 0 auto; padding: 40px 30px; }
        .accordion-wrapper { border-bottom: 1px solid rgba(255,255,255,0.03); }
        .accordion-btn { width: 100%; background: transparent; border: none; color: white; display: flex; justify-content: space-between; align-items: center; padding: 22px 0; font-size: 16px; font-weight: 900; text-transform: uppercase; letter-spacing: 3px; cursor: pointer; }
        .chevron-anim { transition: 0.4s; color: #333; }
        .chevron-anim.active { transform: rotate(180deg); color: var(--neon); }
        .accordion-content-box { padding: 0 0 30px 0; color: #777; font-size: 14px; line-height: 1.8; max-width: 600px; }
        .dropdown-footer { margin-top: 40px; text-align: center; }
        .terminal-id { color: #111; font-size: 10px; font-weight: 900; letter-spacing: 5px; }

        /* HERO SECTION */
        .hero-section { max-width: 1400px; margin: 0 auto; padding: 170px 30px 100px; }
        .hero-layout { display: grid; grid-template-columns: 1fr; gap: 80px; }
        @media (min-width: 1100px) { .hero-layout { grid-template-columns: 1.2fr 0.8fr; align-items: center; } }
        .elite-tag { color: var(--neon); font-size: 11px; font-weight: 900; letter-spacing: 6px; margin-bottom: 25px; }
        .hero-title-main { font-size: 3.5rem; font-weight: 900; line-height: 0.95; margin-bottom: 35px; letter-spacing: -3px; }
        @media (min-width: 768px) { .hero-title-main { font-size: 5.5rem; } }
        .text-gradient-neon { background: linear-gradient(180deg, #fff 40%, var(--neon) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-description-premium { color: #888; font-size: 1.25rem; line-height: 1.7; margin-bottom: 50px; max-width: 550px; }
        .btn-hero-glow { background: var(--neon); color: black; border: none; padding: 20px 45px; border-radius: 4px; font-weight: 900; cursor: pointer; transition: 0.4s; display: flex; align-items: center; gap: 15px; }
        .btn-hero-glow:hover { transform: translateY(-5px); box-shadow: 0 15px 40px rgba(0, 200, 83, 0.4); }

        /* VISUALES DE IMPACTO */
        .hero-visual-right { position: relative; height: 450px; display: flex; justify-content: center; align-items: center; }
        .master-glow-orb { position: absolute; width: 450px; height: 450px; background: var(--neon); filter: blur(160px); opacity: 0.15; z-index: 1; }
        .glass-morphism { background: var(--glass); backdrop-filter: blur(30px); border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; z-index: 10; padding: 25px; }
        .floating-stat-card { position: absolute; transition: 0.3s; }
        .card-pos-1 { top: 0; right: 0; width: 300px; display: flex; gap: 20px; align-items: center; animation: float-elite 6s ease-in-out infinite; }
        .card-pos-2 { bottom: 20%; left: 0; display: flex; gap: 12px; align-items: center; animation: float-elite 7s ease-in-out infinite reverse; font-size: 11px; font-weight: 900; color: #888; }
        .card-pos-3 { top: 50%; right: -20px; display: flex; gap: 12px; align-items: center; font-size: 11px; font-weight: 900; color: var(--neon); animation: float-elite 5s ease-in-out infinite; }
        .stat-icon-wrapper { background: rgba(0, 200, 83, 0.1); padding: 15px; border-radius: 15px; }
        .label-top { display: block; font-size: 10px; color: #555; font-weight: 900; margin-bottom: 5px; }
        .value-main { font-size: 28px; font-weight: 900; color: white; }
        .value-main small { font-size: 12px; color: var(--neon); }

        /* PLANES */
        .plans-master-section { padding: 150px 30px; max-width: 1550px; margin: 0 auto; }
        .header-title { font-size: 3rem; font-weight: 900; text-align: center; margin-top: 20px; }
        .header-line { width: 80px; height: 2px; background: var(--neon); margin: 30px auto 90px; }
        .plans-grid-elite { display: grid; grid-template-columns: 1fr; gap: 25px; }
        @media (min-width: 650px) { .plans-grid-elite { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1200px) { .plans-grid-elite { grid-template-columns: repeat(5, 1fr); } }
        .plan-card-elite { background: #080808; border: 1px solid #111; border-radius: 12px; transition: 0.5s; position: relative; overflow: hidden; }
        .plan-card-elite:hover { border-color: var(--neon); transform: translateY(-15px); background: #0c0c0c; box-shadow: 0 30px 60px rgba(0,200,83,0.15); }
        .plan-card-inner { padding: 50px 30px; text-align: center; display: flex; flex-direction: column; height: 100%; }
        .p-name-title { font-size: 1.8rem; font-weight: 900; color: var(--neon); margin: 10px 0 40px; text-transform: uppercase; }
        .p-num { font-size: 4rem; font-weight: 900; line-height: 1; }
        .btn-plan-select { background: transparent; border: 1px solid #222; color: white; padding: 15px; width: 100%; border-radius: 4px; font-weight: 900; cursor: pointer; transition: 0.3s; margin-top: auto; }
        .btn-plan-select:hover { background: white; color: black; }

        /* FOOTER */
        .footer-elite-master { padding: 100px 30px 60px; background: #050505; border-top: 1px solid #111; text-align: center; }
        .footer-legal-links { display: flex; justify-content: center; gap: 50px; margin-bottom: 50px; flex-wrap: wrap; }
        .f-legal-item { color: #444; text-decoration: none; font-size: 12px; font-weight: 600; display: flex; align-items: center; gap: 10px; transition: 0.3s; }
        .f-legal-item:hover { color: var(--neon); }

        @keyframes float-elite { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        .fade-up-anim { opacity: 0; animation: fadeUpElite 1s ease forwards; }
        @keyframes fadeUpElite { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}