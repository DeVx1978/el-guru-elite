"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, ArrowUpRight, Menu, X, Lock, FileText, Scale, Activity, TrendingUp, Zap, Globe, ChevronDown 
} from 'lucide-react';

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [seccionExpandida, setSeccionExpandida] = useState<string | null>(null);
  const router = useRouter();

  // --- BLOQUEO TOTAL DE PARPADEO (5 SEGUNDOS CRUCIALES) ---
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const toggleSeccion = (seccion: string) => {
    if (seccionExpandida === seccion) {
      setSeccionExpandida(null);
    } else {
      setSeccionExpandida(seccion);
    }
  };

  // 1. PANTALLA DE CARGA (SPLASH SCREEN) - IMPACTO INSTITUCIONAL
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
        <div className="loading-bar-container">
          <div className="loading-bar-progress"></div>
        </div>
        <h2 className="loading-text">SISTEMA ÉLITE: IDENTIFICANDO INVERSOR...</h2>

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
          .loading-bar-container { width: 280px; height: 2px; background: rgba(255,255,255,0.05); border-radius: 10px; overflow: hidden; }
          .loading-bar-progress { width: 0%; height: 100%; background: #00C853; animation: progress 5s linear forwards; }
          .loading-text { color: #00C853; font-size: 10px; letter-spacing: 6px; margin-top: 20px; font-weight: 300; text-transform: uppercase; }
          @keyframes pulse { 0% { transform: scale(0.8); opacity: 1; } 100% { transform: scale(1.4); opacity: 0; } }
          @keyframes scan { 0%, 100% { top: 0%; } 50% { top: 100%; } }
          @keyframes progress { 100% { width: 100%; } }
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
    { id: 'quienes-somos', title: 'Quiénes Somos', text: 'Somos un ecosistema de analistas cuantitativos y desarrolladores dedicados a la optimización de capital mediante modelos predictivos avanzados. Combinamos el análisis de datos masivos con estrategias de arbitraje para generar rendimientos consistentes en entornos volátiles.' },
    { id: 'proyecto-guru', title: 'Proyecto Gurú', text: 'El "Proyecto Gurú" representa el pináculo de nuestro desarrollo técnico. Es un motor de inteligencia artificial que procesa ineficiencias de mercado en tiempo real. No operamos al azar; operamos donde la probabilidad matemática está a nuestro favor.' },
    { id: 'proyecto-inversionistas', title: 'Proyecto Inversionistas', text: 'Modelos de participación ajustados a su perfil de capital. Selecciona tu nivel de participación en las utilidades globales mediante nuestro portafolio de membresías diseñadas para inversores exigentes.' }
  ];

  return (
    <div className="elite-landing">
      {/* 2. NAVBAR (RESPONSIVE & FUNCIONAL CON CORRECCIONES ESTÉTICAS) */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-logo">
            <span className="logo-text">EL GURÚ <span className="neon-text">ÉLITE</span></span>
          </div>
          
          {/* Links de escritorio resguardados */}
          <div className="nav-links-desktop">
            <a href="#proyecto-inversionistas" className="nav-link">Portafolio</a>
            <a href="#contacto" className="nav-link">Soporte</a>
          </div>

          {/* CORRECCIÓN QUIRÚRGICA: Botón y Hamburguesa separados */}
          <div className="nav-actions">
            <button onClick={() => router.push('/panel')} className="btn-access">ACCESO PRIVADO</button>
            <div className="hamburger-wrapper">
              <button onClick={() => setMenuAbierto(!menuAbierto)} className="btn-hamburger">
                {menuAbierto ? <X size={28} color="white" /> : <Menu size={28} color="white" />}
              </button>
            </div>
          </div>
        </div>

        {/* MENÚ MÓVIL (Interactivo con textos desplegables) */}
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

      {/* 3. HERO SECTION (DISEÑO ESPECTACULAR RECUPERADO) */}
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-text-content">
            <div className="hero-badge">INVESTMENT NETWORK V4.5</div>
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

      {/* 4. SECCIONES INFORMATIVAS (ELIMINADAS DE LA LANDING SEGÚN INSTRUCCIÓN) */}
      {/* Ya no están visibles aquí como textos planos */}

      {/* 5. PORTAFOLIO DE 5 MEMBRESÍAS (RESTAURADO) */}
      <section id="proyecto-inversionistas" className="plans-area">
        <div className="plans-header">
          <h2 className="tag-line">MERCADO PRIVADO</h2>
          <h3 className="title-section">PROYECTO INVERSIONISTAS</h3>
          <p className="plans-sub">Modelos de participación ajustados a su perfil de capital.</p>
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
                <p className="s-desc">Acceso a terminal de señales y reportes de rentabilidad Élite.</p>
              </div>
              <button onClick={() => router.push('/unete')} className="s-btn">SELECCIONAR</button>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FOOTER LEGAL COMPLETO (RESTAURADO) */}
      <footer className="footer-master">
        <div className="footer-wrap">
          <div className="f-legal">
            <a href="/terminos" className="f-link"><Scale size={14}/> Términos</a>
            <a href="/privacidad" className="f-link"><FileText size={14}/> Privacidad</a>
            <a href="/confidencialidad" className="f-link"><Lock size={14}/> Confidencialidad</a>
          </div>
          <div className="f-divider"></div>
          <p className="f-copy">&copy; 2026 EL GURÚ ÉLITE. ACCESO EXCLUSIVO PARA SOCIOS FUNDADORES.</p>
        </div>
      </footer>

      <style jsx global>{`
        /* --- ESTILOS MAESTROS (450+ LINEAS DE ARQUITECTURA RESGUARDADA) --- */
        :root { --neon: #00C853; --dark: #020406; --glass: rgba(20, 20, 20, 0.5); }
        .elite-landing { background: #000; color: white; font-family: 'Inter', sans-serif; scroll-behavior: smooth; }
        
        .navbar { position: fixed; top: 0; width: 100%; z-index: 1000; background: rgba(0,0,0,0.9); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.03); }
        .nav-content { max-width: 1200px; margin: 0 auto; padding: 18px 25px; display: flex; justify-content: space-between; align-items: center; }
        .logo-text { font-weight: 900; font-size: 1.2rem; letter-spacing: -1px; }
        .neon-text { color: var(--neon); text-shadow: 0 0 15px rgba(0,200,83,0.3); }
        .nav-links-desktop { display: none; gap: 35px; }
        @media (min-width: 1024px) { .nav-links-desktop { display: flex; } }
        .nav-link { color: #666; text-decoration: none; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; transition: 0.3s; }
        .nav-link:hover { color: white; }
        
        /* CORRECCIÓN ESTÉTICA CABECERA */
        .nav-actions { display: flex; align-items: center; gap: 30px; }
        .btn-access { background: transparent; border: 1px solid var(--neon); color: var(--neon); padding: 8px 18px; border-radius: 4px; font-weight: 900; font-size: 10px; cursor: pointer; transition: 0.3s; }
        .btn-access:hover { background: var(--neon); color: black; }
        .hamburger-wrapper { display: block; position: relative; padding-right: 15px; }
        .btn-hamburger { background: transparent; border: none; cursor: pointer; display: block; padding: 0; }
        
        .mobile-menu { position: absolute; top: 100%; left: 0; width: 100%; background: #080808; padding: 40px; display: flex; flex-direction: column; gap: 15px; text-align: left; border-bottom: 1px solid #111; max-height: 80vh; overflow-y: auto; }
        .menu-item-wrapper { border-bottom: 1px solid #111; padding-bottom: 10px; }
        .mobile-link-accordion { background: transparent; border: none; color: white; width: 100%; text-align: left; display: flex; justify-content: space-between; align-items: center; font-size: 16px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; cursor: pointer; padding: 10px 0; }
        .mobile-link-accordion:hover { color: var(--neon); }
        .accordion-icon { transition: transform 0.3s ease; color: #444; }
        .accordion-icon.rotate { transform: rotate(180deg); color: var(--neon); }
        .seccion-texto-desplegado { color: #888; font-size: 14px; line-height: 1.6; padding: 10px 0; font-weight: 400; text-transform: none; letter-spacing: normal; }
        .menu-divider { width: 30px; height: 1px; background: #222; margin: 20px auto; }
        .menu-subtext { color: #222; font-size: 10px; font-weight: 900; letter-spacing: 3px; text-align: center; }

        .hero { max-width: 1200px; margin: 0 auto; padding: 120px 25px 80px; }
        .hero-grid { display: grid; grid-template-columns: 1fr; gap: 60px; }
        @media (min-width: 1024px) { .hero-grid { grid-template-columns: 1.2fr 0.8fr; align-items: center; } }
        .hero-badge { color: var(--neon); font-size: 10px; font-weight: 900; letter-spacing: 4px; margin-bottom: 20px; }
        .hero-main-title { font-size: 3.2rem; font-weight: 900; line-height: 0.95; margin-bottom: 30px; letter-spacing: -2px; }
        @media (min-width: 768px) { .hero-main-title { font-size: 4.8rem; } }
        .gradient-text { background: linear-gradient(180deg, #fff 40%, var(--neon) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-description { color: #666; font-size: 1.1rem; line-height: 1.6; margin-bottom: 40px; max-width: 500px; }
        .btn-main-cta { background: var(--neon); color: black; border: none; padding: 18px 40px; border-radius: 4px; font-weight: 900; font-size: 14px; display: flex; align-items: center; gap: 12px; cursor: pointer; transition: 0.3s; text-transform: uppercase; }
        .btn-main-cta:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0,200,83,0.3); }

        .hero-visual-container { position: relative; height: 350px; display: flex; justify-content: center; align-items: center; }
        .glow-orb-bg { position: absolute; width: 350px; height: 350px; background: var(--neon); filter: blur(140px); opacity: 0.12; }
        .glass-effect { background: var(--glass); backdrop-filter: blur(15px); border: 1px solid rgba(255,255,255,0.03); border-radius: 15px; z-index: 10; padding: 25px; }
        .floating-card-1 { position: absolute; top: 10%; right: 5%; width: 260px; display: flex; gap: 20px; align-items: center; animation: float 6s ease-in-out infinite; }
        .icon-box-green { background: rgba(0,200,83,0.1); padding: 12px; border-radius: 10px; color: var(--neon); }
        .card-label { display: block; font-size: 9px; color: #555; font-weight: 800; margin-bottom: 4px; }
        .card-val { font-size: 24px; font-weight: 900; color: white; }
        .card-val small { font-size: 11px; color: var(--neon); }
        .floating-card-2 { position: absolute; bottom: 15%; left: 5%; display: flex; gap: 12px; align-items: center; font-size: 11px; font-weight: 900; color: #888; letter-spacing: 1px; animation: float 6s ease-in-out infinite reverse; }

        .tag-line { font-size: 10px; letter-spacing: 6px; color: #444; font-weight: 900; margin-bottom: 20px; text-align: center; }
        .title-section { font-size: 2.2rem; font-weight: 900; color: white; margin-bottom: 30px; letter-spacing: -1px; text-align: center; }

        .plans-area { padding: 120px 25px; max-width: 1400px; margin: 0 auto; }
        .plans-header { text-align: center; margin-bottom: 70px; }
        .plans-sub { color: #555; font-size: 1.1rem; }
        .plans-grid-master { display: grid; grid-template-columns: 1fr; gap: 25px; }
        @media (min-width: 640px) { .plans-grid-master { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1100px) { .plans-grid-master { grid-template-columns: repeat(5, 1fr); } }
        
        .membership-card { background: #080808; border: 1px solid #111; padding: 40px 25px; border-radius: 8px; text-align: center; transition: 0.4s; display: flex; flex-direction: column; }
        .membership-card:hover { border-color: var(--neon); transform: translateY(-10px); background: #0c0c0c; box-shadow: 0 20px 40px rgba(0,200,83,0.1); }
        .s-tag { font-size: 9px; color: #444; font-weight: 900; letter-spacing: 2px; }
        .s-name { font-size: 1.6rem; font-weight: 900; color: var(--neon); margin: 5px 0 30px; text-transform: uppercase; }
        .card-body { flex-grow: 1; }
        .s-price { margin-bottom: 25px; display: flex; align-items: baseline; justify-content: center; gap: 2px; }
        .s-currency { font-size: 20px; color: var(--neon); font-weight: 900; }
        .s-amount { font-size: 3.5rem; font-weight: 900; color: white; line-height: 1; }
        .s-usd { font-size: 10px; color: #444; font-weight: 900; }
        .s-divider { width: 40px; height: 1px; background: #222; margin: 0 auto 25px; }
        .s-perk { font-size: 14px; font-weight: 900; color: white; margin-bottom: 10px; }
        .s-desc { font-size: 12px; color: #555; line-height: 1.5; margin-bottom: 30px; }
        .s-btn { background: transparent; border: 1px solid #222; color: white; padding: 14px; width: 100%; border-radius: 4px; font-weight: 900; font-size: 11px; cursor: pointer; transition: 0.3s; text-transform: uppercase; }
        .s-btn:hover { background: white; color: black; border-color: white; }

        .footer-master { padding: 80px 25px 50px; background: #050505; border-top: 1px solid #111; }
        .footer-wrap { max-width: 1200px; margin: 0 auto; text-align: center; }
        .f-legal { display: flex; justify-content: center; gap: 40px; margin-bottom: 35px; flex-wrap: wrap; }
        .f-link { color: #444; text-decoration: none; font-size: 11px; font-weight: 600; display: flex; align-items: center; gap: 8px; transition: 0.3s; }
        .f-link:hover { color: var(--neon); }
        .f-divider { width: 60px; height: 1px; background: #1a1a1a; margin: 0 auto 35px; }
        .f-copy { color: #222; font-size: 10px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; }

        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        .fade-in-up { opacity: 0; animation: fadeInUp 0.8s ease forwards; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.4s ease forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .fade-in-down { animation: fadeInDown 0.3s ease forwards; }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}