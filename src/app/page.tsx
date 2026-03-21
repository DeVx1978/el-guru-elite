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
    <div className="elite-landing-restored">
      {/* NAVBAR POSICIÓN QUIRÚRGICA */}
      <nav className="navbar-custom">
        <div className="nav-inner">
          <div className="brand">
            <span className="brand-text">EL GURÚ <span className="green-accent">ÉLITE</span></span>
          </div>
          <div className="nav-actions">
            <button onClick={() => router.push('/panel')} className="btn-privado">ACCESO PRIVADO</button>
            <div className="hamburger-wrap">
              <button onClick={() => setMenuAbierto(!menuAbierto)} className="btn-hamburger">
                {menuAbierto ? <X size={30} color="white" /> : <Menu size={30} color="white" />}
              </button>
            </div>
          </div>
        </div>

        {/* MENÚ ACORDEÓN INTERACTIVO */}
        {menuAbierto && (
          <div className="menu-desplegable fade-in">
            {seccionesInfo.map((sec) => (
              <div key={sec.id} className="accordion-group">
                <button onClick={() => toggleSeccion(sec.id)} className="accordion-head">
                  {sec.title}
                  <ChevronDown size={18} className={seccionExpandida === sec.id ? 'active' : ''} />
                </button>
                {seccionExpandida === sec.id && (
                  <div className="accordion-body fade-down">
                    <p>{sec.text}</p>
                  </div>
                )}
              </div>
            ))}
            <div className="menu-line"></div>
            <p className="menu-footer">TERMINAL ÉLITE V5.2</p>
          </div>
        )}
      </nav>

      {/* HERO SECTION: RESTAURADO EXACTAMENTE COMO LA IMAGEN */}
      <section className="hero-main">
        <div className="hero-content">
          <div className="hero-left">
            <div className="tag-version">INVESTMENT NETWORK V4.0</div>
            <h1 className="main-title">
              ARQUITECTURA <br/>
              DE <br/>
              <span className="gradient-text">RENTABILIDAD</span>
            </h1>
            <p className="main-description">
              Plataforma exclusiva de gestión de capital institucional y deportiva. 
              Algoritmos de alta frecuencia diseñados para el 1% de los inversores globales.
            </p>
            <button onClick={() => router.push('/unete')} className="btn-cta">
              COMENZAR AHORA <ArrowUpRight size={22} />
            </button>
          </div>

          <div className="hero-right">
            <div className="glow-effect"></div>
            <div className="stat-pill glass">
              <ShieldCheck size={18} color="#00C853" />
              <span>CAPITAL PROTEGIDO</span>
            </div>
          </div>
        </div>
      </section>

      {/* PORTAFOLIO DE MEMBRESÍAS RESTAURADO */}
      <section className="portfolio-section">
        <div className="portfolio-header">
          <span className="sub-tag">PORTAFOLIO DE MEMBRESÍAS</span>
          <h2 className="title-alt">Selecciona tu nivel de participación</h2>
        </div>
        <div className="plans-grid-custom">
          {membresias.map((p) => (
            <div key={p.name} className="p-card-elite fade-up">
              <div className="p-card-name">SOCIO {p.name}</div>
              <div className="p-card-price"><span>$</span>{p.price}</div>
              <div className="p-card-perk">{p.perk}</div>
              <button onClick={() => router.push('/unete')} className="p-card-btn">SELECCIONAR</button>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer-elite">
        <div className="f-links-row">
          <a href="/terminos" className="f-link-item"><Scale size={14}/> Términos</a>
          <a href="/privacidad" className="f-link-item"><FileText size={14}/> Privacidad</a>
          <a href="/confidencialidad" className="f-link-item"><Lock size={14}/> Confidencialidad</a>
        </div>
        <div className="f-line"></div>
        <p className="f-copy">&copy; 2026 EL GURÚ ÉLITE. TODOS LOS DERECHOS RESERVADOS.</p>
      </footer>

      <style jsx global>{`
        /* --- ESTILOS BASADOS 100% EN TU CAPTURA --- */
        .elite-landing-restored { background-color: #000; color: white; min-height: 100vh; font-family: 'Inter', sans-serif; overflow-x: hidden; scroll-behavior: smooth; }
        
        /* NAVBAR POSICIONADA */
        .navbar-custom { position: fixed; top: 0; width: 100%; z-index: 1000; background: rgba(0,0,0,0.8); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255,255,255,0.03); }
        .nav-inner { max-width: 1400px; margin: 0 auto; padding: 20px 30px; display: flex; justify-content: space-between; align-items: center; }
        .brand-text { font-weight: 900; font-size: 1.4rem; letter-spacing: -1px; }
        .green-accent { color: #00C853; }
        .nav-actions { display: flex; align-items: center; gap: 40px; }
        .btn-privado { background: transparent; border: 1px solid #00C853; color: #00C853; padding: 8px 18px; border-radius: 4px; font-weight: 900; font-size: 11px; cursor: pointer; transition: 0.3s; }
        .btn-privado:hover { background: #00C853; color: black; }
        .btn-hamburger { background: transparent; border: none; cursor: pointer; padding: 0; }

        /* ACORDEÓN */
        .menu-desplegable { position: absolute; top: 100%; left: 0; width: 100%; background: #080808; padding: 30px; border-bottom: 1px solid #111; }
        .accordion-head { width: 100%; background: transparent; border: none; color: white; display: flex; justify-content: space-between; align-items: center; padding: 15px 0; font-size: 14px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid #111; }
        .accordion-body { padding: 15px 0; color: #666; font-size: 13px; line-height: 1.6; }
        .active { transform: rotate(180deg); color: #00C853; transition: 0.3s; }

        /* HERO IDENTICO A LA IMAGEN */
        .hero-main { max-width: 1400px; margin: 0 auto; padding: 140px 30px 100px; }
        .hero-content { display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 40px; }
        @media (max-width: 900px) { .hero-content { grid-template-columns: 1fr; } }
        .tag-version { color: #00C853; font-size: 10px; font-weight: 900; letter-spacing: 4px; margin-bottom: 30px; }
        .main-title { font-size: 4rem; font-weight: 900; line-height: 0.9; margin-bottom: 40px; }
        @media (min-width: 900px) { .main-title { font-size: 6rem; } }
        .gradient-text { background: linear-gradient(180deg, #fff 40%, #00C853 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .main-description { color: #555; font-size: 1.2rem; line-height: 1.6; margin-bottom: 50px; max-width: 500px; }
        .btn-cta { background: #00C853; color: black; border: none; padding: 20px 45px; border-radius: 5px; font-weight: 900; font-size: 14px; display: flex; align-items: center; gap: 15px; cursor: pointer; }

        .hero-right { position: relative; height: 400px; display: flex; justify-content: center; align-items: center; }
        .glow-effect { position: absolute; width: 400px; height: 400px; background: #00C853; filter: blur(140px); opacity: 0.15; }
        .stat-pill { background: rgba(20,20,20,0.6); border: 1px solid rgba(255,255,255,0.05); padding: 12px 25px; border-radius: 10px; display: flex; align-items: center; gap: 12px; font-size: 11px; font-weight: 900; color: #888; z-index: 10; }

        /* PLANES */
        .portfolio-section { padding: 100px 30px; max-width: 1400px; margin: 0 auto; }
        .portfolio-header { text-align: center; margin-bottom: 70px; }
        .sub-tag { font-size: 10px; color: #444; letter-spacing: 5px; font-weight: 900; }
        .title-alt { font-size: 1.5rem; margin-top: 10px; }
        .plans-grid-custom { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
        .p-card-elite { background: #0a0a0a; border: 1px solid #111; padding: 40px 20px; border-radius: 8px; text-align: center; transition: 0.3s; }
        .p-card-elite:hover { border-color: #00C853; transform: translateY(-10px); }
        .p-card-name { font-size: 11px; color: #444; font-weight: 900; margin-bottom: 25px; text-transform: uppercase; }
        .p-card-price { font-size: 4rem; font-weight: 900; color: white; margin-bottom: 10px; }
        .p-card-price span { font-size: 1.5rem; color: #00C853; }
        .p-card-btn { background: transparent; border: 1px solid #222; color: white; padding: 12px; width: 100%; border-radius: 4px; font-weight: bold; cursor: pointer; }
        .p-card-btn:hover { background: white; color: black; }

        .footer-elite { padding: 60px 30px; text-align: center; border-top: 1px solid #111; }
        .f-links-row { display: flex; justify-content: center; gap: 40px; margin-bottom: 30px; flex-wrap: wrap; }
        .f-link-item { color: #444; text-decoration: none; font-size: 11px; display: flex; align-items: center; gap: 8px; }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .fade-in { animation: fadeIn 0.4s ease forwards; }
      `}</style>
    </div>
  );
}