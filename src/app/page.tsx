"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, ArrowUpRight, Menu, X, Lock, FileText, Scale, Activity, ChevronDown 
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
          .loader-container { position: relative; width: 180px; height: 180px; margin-bottom: 40px; }
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
      {/* NAVBAR: POSICIÓN Y RESPONSIVE CORREGIDO */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-logo">
            <span className="logo-text">EL GURÚ <span className="neon">ÉLITE</span></span>
          </div>
          <div className="nav-actions">
            <button onClick={() => router.push('/panel')} className="btn-access">ACCESO PRIVADO</button>
            <button onClick={() => setMenuAbierto(!menuAbierto)} className="btn-hamburger">
              {menuAbierto ? <X size={28} color="white" /> : <Menu size={28} color="white" />}
            </button>
          </div>
        </div>

        {/* MENÚ MÓVIL ACORDEÓN */}
        {menuAbierto && (
          <div className="mobile-menu fade-in">
            {seccionesInfo.map((sec) => (
              <div key={sec.id} className="accordion-item">
                <button onClick={() => toggleSeccion(sec.id)} className="accordion-trigger">
                  {sec.title}
                  <ChevronDown size={18} className={seccionExpandida === sec.id ? 'rotate' : ''} />
                </button>
                {seccionExpandida === sec.id && (
                  <div className="accordion-content fade-down">
                    <p>{sec.text}</p>
                  </div>
                )}
              </div>
            ))}
            <div className="menu-divider"></div>
            <p className="menu-footer">TERMINAL ÉLITE V5.3</p>
          </div>
        )}
      </nav>

      {/* HERO: RECUPERADA LA JERARQUÍA E IMPACTO VISUAL */}
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-left">
            <div className="hero-badge">INVESTMENT NETWORK V4.0</div>
            <h1 className="hero-title">
              ARQUITECTURA <br/> DE <br/> <span className="gradient-text">RENTABILIDAD</span>
            </h1>
            <p className="hero-description">
              Plataforma exclusiva de gestión de capital institucional y deportiva. 
              Algoritmos de alta frecuencia diseñados para el 1% de los inversores globales.
            </p>
            <button onClick={() => router.push('/unete')} className="btn-main">
              COMENZAR AHORA <ArrowUpRight size={22} />
            </button>
          </div>

          <div className="hero-right">
            <div className="main-glow"></div>
            <div className="floating-stat glass">
              <ShieldCheck size={20} color="#00C853" />
              <span className="stat-text">CAPITAL PROTEGIDO</span>
            </div>
          </div>
        </div>
      </section>

      {/* PLANES: RESPONSIVE Y ESTÉTICOS */}
      <section className="plans-section">
        <div className="plans-header">
          <span className="plans-tag">PORTAFOLIO DE INVERSIÓN</span>
          <h2 className="plans-title">PROYECTO INVERSIONISTAS</h2>
        </div>
        <div className="plans-grid">
          {membresias.map((p) => (
            <div key={p.name} className="plan-card">
              <div className="p-header">SOCIO {p.name}</div>
              <div className="p-price"><span>$</span>{p.price}</div>
              <div className="p-perk">{p.perk}</div>
              <button onClick={() => router.push('/unete')} className="p-button">SELECCIONAR</button>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="f-links">
          <a href="/terminos" className="f-item"><Scale size={14}/> Términos</a>
          <a href="/privacidad" className="f-item"><FileText size={14}/> Privacidad</a>
          <a href="/confidencialidad" className="f-item"><Lock size={14}/> Confidencialidad</a>
        </div>
        <p className="f-copy">&copy; 2026 EL GURÚ ÉLITE. TODOS LOS DERECHOS RESERVADOS.</p>
      </footer>

      <style jsx global>{`
        /* --- ESTILOS MAESTROS RECUPERADOS Y BLINDADOS --- */
        .elite-landing { background: #000; color: white; font-family: 'Inter', sans-serif; overflow-x: hidden; scroll-behavior: smooth; }
        
        .navbar { position: fixed; top: 0; width: 100%; z-index: 1000; background: rgba(0,0,0,0.8); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.05); }
        .nav-content { max-width: 1200px; margin: 0 auto; padding: 20px; display: flex; justify-content: space-between; align-items: center; }
        .logo-text { font-weight: 900; font-size: 1.3rem; letter-spacing: -1px; }
        .neon { color: #00C853; }
        .nav-actions { display: flex; align-items: center; gap: 30px; }
        .btn-access { background: transparent; border: 1px solid #00C853; color: #00C853; padding: 8px 16px; border-radius: 4px; font-weight: 900; font-size: 11px; cursor: pointer; transition: 0.3s; }
        .btn-access:hover { background: #00C853; color: black; }
        .btn-hamburger { background: transparent; border: none; cursor: pointer; padding: 0; display: flex; align-items: center; }

        .mobile-menu { position: absolute; top: 100%; left: 0; width: 100%; background: #080808; padding: 20px 30px; border-bottom: 1px solid #111; }
        .accordion-trigger { width: 100%; background: transparent; border: none; color: white; display: flex; justify-content: space-between; align-items: center; padding: 15px 0; font-size: 14px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid #111; cursor: pointer; }
        .accordion-content { padding: 15px 0; color: #666; font-size: 13px; line-height: 1.6; }
        .rotate { transform: rotate(180deg); color: #00C853; transition: 0.3s; }

        .hero { max-width: 1200px; margin: 0 auto; padding: 150px 20px 80px; }
        .hero-grid { display: grid; grid-template-columns: 1fr; gap: 40px; }
        @media (min-width: 992px) { .hero-grid { grid-template-columns: 1.2fr 0.8fr; align-items: center; } }
        
        .hero-title { font-size: 3.5rem; font-weight: 900; line-height: 0.95; margin-bottom: 30px; }
        @media (min-width: 768px) { .hero-title { font-size: 5.5rem; } }
        .gradient-text { background: linear-gradient(180deg, #fff 40%, #00C853 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-description { color: #555; font-size: 1.1rem; line-height: 1.6; margin-bottom: 40px; max-width: 500px; }
        .btn-main { background: #00C853; color: black; border: none; padding: 18px 40px; border-radius: 4px; font-weight: 900; font-size: 14px; display: flex; align-items: center; gap: 15px; cursor: pointer; }

        .hero-right { position: relative; height: 300px; display: flex; justify-content: center; align-items: center; }
        .main-glow { position: absolute; width: 350px; height: 350px; background: #00C853; filter: blur(140px); opacity: 0.15; }
        .floating-stat { background: rgba(20,20,20,0.6); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.05); padding: 15px 25px; border-radius: 12px; display: flex; align-items: center; gap: 12px; font-size: 11px; font-weight: 900; color: #888; z-index: 10; animation: float 6s ease-in-out infinite; }

        .plans-section { padding: 100px 20px; max-width: 1200px; margin: 0 auto; }
        .plans-header { text-align: center; margin-bottom: 60px; }
        .plans-tag { font-size: 10px; color: #444; font-weight: 900; letter-spacing: 5px; }
        .plans-title { font-size: 2rem; font-weight: 900; margin-top: 10px; }
        .plans-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
        .plan-card { background: #0a0a0a; border: 1px solid #111; padding: 40px 20px; border-radius: 8px; text-align: center; transition: 0.3s; }
        .plan-card:hover { border-color: #00C853; transform: translateY(-10px); }
        .p-price { font-size: 3.5rem; font-weight: 900; margin-bottom: 10px; }
        .p-price span { font-size: 1.5rem; color: #00C853; }
        .p-button { background: transparent; border: 1px solid #222; color: white; padding: 12px; width: 100%; border-radius: 4px; font-weight: 900; cursor: pointer; }

        .footer { padding: 60px 20px; text-align: center; border-top: 1px solid #111; }
        .f-links { display: flex; justify-content: center; gap: 40px; margin-bottom: 30px; flex-wrap: wrap; }
        .f-item { color: #444; text-decoration: none; font-size: 11px; display: flex; align-items: center; gap: 8px; }

        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .fade-in { animation: fadeIn 0.4s ease forwards; }
      `}</style>
    </div>
  );
}