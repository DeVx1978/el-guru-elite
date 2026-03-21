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
          .loader-container { position: relative; width: 200px; height: 200px; margin-bottom: 40px; }
          .image-wrapper {
            width: 100%; height: 100%; border-radius: 50%; overflow: hidden;
            border: 2px solid #00C853; box-shadow: 0 0 60px rgba(0, 200, 83, 0.5);
            position: relative; z-index: 2;
          }
          .image-wrapper img { width: 100%; height: 100%; object-fit: cover; }
          .pulse-ring {
            position: absolute; top: -15%; left: -15%; width: 130%; height: 130%;
            border: 2px solid #00C853; border-radius: 50%; animation: pulse-elite 2s infinite; opacity: 0.4;
          }
          .scan-line {
            position: absolute; top: 0; left: 0; width: 100%; height: 8px;
            background: linear-gradient(to right, transparent, #00C853, transparent);
            box-shadow: 0 0 20px #00C853; z-index: 3; animation: scan-elite 2.5s ease-in-out infinite;
          }
          .loading-text-wrapper { width: 100%; text-align: center; }
          .loading-text { color: #00C853; font-size: 10px; letter-spacing: 6px; margin-top: 20px; font-weight: 300; text-transform: uppercase; }
          @keyframes pulse-elite { 0% { transform: scale(0.8); opacity: 1; } 100% { transform: scale(1.4); opacity: 0; } }
          @keyframes scan-elite { 0%, 100% { top: 0%; } 50% { top: 100%; } }
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
    { id: 'quienes', title: 'Quiénes Somos', text: 'Somos un ecosistema de analistas cuantitativos y desarrolladores dedicados a la optimización de capital mediante modelos predictivos avanzados.' },
    { id: 'proyecto-guru', title: 'Proyecto Gurú', text: 'El pináculo de nuestro desarrollo técnico. Un motor de IA que procesa ineficiencias de mercado en tiempo real donde la probabilidad matemática está a nuestro favor.' },
    { id: 'inversionistas', title: 'Proyecto Inversionistas', text: 'Modelos de participación ajustados a su perfil de capital. Seleccione su nivel de participación en las utilidades globales mediante nuestro portafolio Élite.' }
  ];

  return (
    <div className="elite-landing">
      {/* NAVBAR ORIGINAL CON CIRUGÍA DE POSICIÓN */}
      <nav className="navbar-blur">
        <div className="nav-content">
          <div className="nav-logo">
            <span className="logo-text">EL GURÚ <span className="neon-green">ÉLITE</span></span>
          </div>
          <div className="nav-actions">
            <button onClick={() => router.push('/panel')} className="btn-access">ACCESO PRIVADO</button>
            <div className="hamburger-container">
              <button onClick={() => setMenuAbierto(!menuAbierto)} className="btn-hamburger">
                {menuAbierto ? <X size={28} color="white" /> : <Menu size={28} color="white" />}
              </button>
            </div>
          </div>
        </div>

        {/* MENÚ ACORDEÓN (TEXTOS OCULTOS) */}
        {menuAbierto && (
          <div className="mobile-menu fade-in">
            {seccionesInfo.map((sec) => (
              <div key={sec.id} className="accordion-item">
                <button onClick={() => toggleSeccion(sec.id)} className="accordion-trigger">
                  {sec.title}
                  <ChevronDown size={18} className={seccionExpandida === sec.id ? 'rotate' : ''} />
                </button>
                {seccionExpandida === sec.id && (
                  <div className="accordion-content fade-in-down">
                    <p>{sec.text}</p>
                  </div>
                )}
              </div>
            ))}
            <div className="menu-divider"></div>
            <p className="menu-subtext">TERMINAL DE ALTA SEGURIDAD</p>
          </div>
        )}
      </nav>

      {/* HERO ORIGINAL: ESTADÍSTICAS Y GLOW RECUPERADOS */}
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-text-content">
            <div className="hero-badge">VERSION 4.0 LIVE</div>
            <h1 className="hero-title">
              ARQUITECTURA DE <br/>
              <span className="gradient-text">RENTABILIDAD</span>
            </h1>
            <p className="hero-description">
              Plataforma exclusiva de gestión de capital institucional y deportiva. 
              Algoritmos de alta frecuencia diseñados para el 1% de los inversores.
            </p>
            <div className="hero-actions">
              <button onClick={() => router.push('/unete')} className="btn-primary-glow">
                COMENZAR AHORA <ArrowUpRight size={20} />
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="main-orb"></div>
            <div className="stat-card card-1 floating-1 glass">
              <Activity color="#00C853" size={30} />
              <div>
                <p className="stat-label">UTILIDAD MENSUAL</p>
                <p className="stat-value">+24.8%</p>
              </div>
            </div>
            <div className="stat-card card-2 floating-2 glass">
              <ShieldCheck color="#00C853" size={24} />
              <p className="stat-value-sm">CAPITAL PROTEGIDO</p>
            </div>
          </div>
        </div>
      </section>

      {/* PORTAFOLIO DE 5 MEMBRESÍAS ORIGINAL */}
      <section id="portafolio" className="plans-section">
        <div className="plans-header">
          <h2 className="tag-line">MERCADO PRIVADO</h2>
          <h3 className="section-title">PROYECTO INVERSIONISTAS</h3>
        </div>
        <div className="plans-grid">
          {membresias.map((plan) => (
            <div key={plan.name} className="plan-card fade-up" style={{animationDelay: plan.delay}}>
              <div className="plan-name">{plan.name}</div>
              <div className="plan-price"><span>$</span>{plan.price}</div>
              <div className="plan-perk">{plan.perk}</div>
              <button onClick={() => router.push('/unete')} className="btn-select">SELECCIONAR</button>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer-master">
        <div className="footer-links">
          <a href="/terminos" className="f-link"><Scale size={14}/> Términos</a>
          <a href="/privacidad" className="f-link"><FileText size={14}/> Privacidad</a>
          <a href="/confidencialidad" className="f-link"><Lock size={14}/> Confidencialidad</a>
        </div>
        <p className="footer-copy">&copy; 2026 EL GURÚ ÉLITE. TODOS LOS DERECHOS RESERVADOS.</p>
      </footer>

      <style jsx global>{`
        /* --- EL DISEÑO ORIGINAL QUE TE CAUTIVÓ --- */
        .elite-landing { background-color: #020406; color: white; min-height: 100vh; font-family: 'Inter', sans-serif; overflow-x: hidden; }
        
        .navbar-blur { position: fixed; top: 0; width: 100%; z-index: 100; backdrop-filter: blur(10px); background: rgba(2, 4, 6, 0.7); border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
        .nav-content { max-width: 1200px; margin: 0 auto; padding: 20px; display: flex; justify-content: space-between; align-items: center; }
        .logo-text { font-weight: 900; font-size: 1.5rem; letter-spacing: -1px; }
        .neon-green { color: #00C853; }
        .nav-actions { display: flex; align-items: center; gap: 35px; }
        .btn-access { background: transparent; border: 1px solid #00C853; color: #00C853; padding: 8px 18px; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 12px; }

        .mobile-menu { position: absolute; top: 100%; left: 0; width: 100%; background: rgba(10, 12, 16, 0.95); padding: 30px; display: flex; flex-direction: column; gap: 10px; border-bottom: 1px solid #222; }
        .accordion-trigger { width: 100%; background: transparent; border: none; color: white; display: flex; justify-content: space-between; align-items: center; padding: 15px 0; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid #111; cursor: pointer; }
        .accordion-content { padding: 15px 0; color: #666; font-size: 13px; line-height: 1.6; }
        .rotate { transform: rotate(180deg); color: #00C853; transition: 0.3s; }

        .hero { padding: 150px 20px 100px; max-width: 1200px; margin: 0 auto; }
        .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 50px; align-items: center; }
        @media (max-width: 900px) { .hero-grid { grid-template-columns: 1fr; text-align: center; } }
        .hero-badge { background: rgba(0, 200, 83, 0.1); color: #00C853; padding: 5px 15px; border-radius: 20px; display: inline-block; font-size: 12px; font-weight: bold; margin-bottom: 20px; border: 1px solid rgba(0, 200, 83, 0.2); }
        .hero-title { font-size: 4rem; line-height: 1; font-weight: 900; margin-bottom: 25px; }
        .gradient-text { background: linear-gradient(90deg, #00C853, #b2ffce); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-description { color: #888; font-size: 1.2rem; max-width: 500px; margin-bottom: 40px; line-height: 1.6; }
        .btn-primary-glow { background: white; color: black; border: none; padding: 20px 40px; border-radius: 15px; font-size: 1.1rem; font-weight: 900; display: flex; align-items: center; gap: 10px; cursor: pointer; transition: 0.3s; margin: 0 auto; }
        @media (min-width: 900px) { .btn-primary-glow { margin: 0; } }

        .hero-visual { position: relative; display: flex; justify-content: center; align-items: center; }
        .main-orb { width: 400px; height: 400px; background: radial-gradient(circle, rgba(0, 200, 83, 0.2) 0%, transparent 70%); border-radius: 50%; filter: blur(40px); animation: pulse 4s infinite; }
        .glass { background: rgba(10, 12, 16, 0.8); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 20px; padding: 20px; }
        .stat-card { position: absolute; display: flex; align-items: center; gap: 15px; width: 220px; }
        .floating-1 { top: 10%; right: 0; animation: float 5s ease-in-out infinite; }
        .floating-2 { bottom: 20%; left: 0; animation: float 6s ease-in-out infinite reverse; }
        .stat-label { font-size: 10px; color: #555; margin: 0; font-weight: bold; }
        .stat-value { font-size: 20px; font-weight: 900; color: white; margin: 0; }
        .stat-value-sm { font-size: 12px; font-weight: 900; color: white; margin: 0; }

        .plans-section { max-width: 1200px; margin: 0 auto; padding: 100px 20px; text-align: center; }
        .section-title { font-size: 2.2rem; font-weight: 900; margin-bottom: 50px; }
        .plans-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
        .plan-card { background: #0a0c10; padding: 40px 20px; border-radius: 20px; border: 1px solid #111; transition: 0.3s; }
        .plan-card:hover { border-color: #00C853; transform: translateY(-10px); }
        .plan-name { font-size: 1.2rem; font-weight: 900; color: #00C853; margin-bottom: 20px; }
        .plan-price { font-size: 3rem; font-weight: 900; margin-bottom: 10px; }
        .plan-price span { font-size: 1.5rem; color: #00C853; }
        .plan-perk { color: #888; font-size: 0.9rem; margin-bottom: 30px; }
        .btn-select { background: transparent; border: 1px solid #222; color: white; padding: 12px; width: 100%; border-radius: 10px; font-weight: bold; cursor: pointer; }
        .btn-select:hover { background: white; color: black; }

        .footer-master { padding: 60px 20px; border-top: 1px solid #111; text-align: center; }
        .footer-links { display: flex; justify-content: center; gap: 30px; margin-bottom: 20px; flex-wrap: wrap; }
        .f-link { color: #444; text-decoration: none; font-size: 12px; display: flex; align-items: center; gap: 8px; }
        .footer-copy { color: #222; font-size: 10px; font-weight: 900; letter-spacing: 1px; }

        @keyframes pulse { 0% { transform: scale(1); opacity: 0.2; } 50% { transform: scale(1.1); opacity: 0.3; } 100% { transform: scale(1); opacity: 0.2; } }
        @keyframes float { 0% { transform: translateY(0); } 50% { transform: translateY(-15px); } 100% { transform: translateY(0); } }
      `}</style>
    </div>
  );
}