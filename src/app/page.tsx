"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, ArrowUpRight, Lock, Scale, Activity, Zap, TrendingUp, Globe, X, Menu, ShieldAlert, 
  Cpu, Database, BarChart3, Target, Binary, Radio, MessageSquare, Globe2
} from 'lucide-react';

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const [modalAbierto, setModalAbierto] = useState<{titulo: string, contenido: string} | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    router.prefetch('/panel');
    router.prefetch('/unete');
    router.prefetch('/login');
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, [router]);

  const ejecutarTransicion = (e: React.MouseEvent, ruta: string) => {
    e.preventDefault();
    setIsNavigating(true);

    let destinoFinal = ruta;
    if (ruta === '/login') {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('socio_id');
        localStorage.removeItem('socio_rol');
      }
      destinoFinal = '/login';
    } else if (ruta === '/panel') {
      const socioId = typeof window !== 'undefined' ? localStorage.getItem('socio_id') : null;
      if (!socioId) {
        destinoFinal = '/login';
      } else {
        const socioRol = localStorage.getItem('socio_rol');
        destinoFinal = socioRol === 'admin' ? '/admin' : '/panel';
      }
    }

    setTimeout(() => {
      router.push(destinoFinal);
    }, 3500);
  };

  const membresias = [
    { name: 'Micro', price: '100', profit: '8-10%', perk: 'Nivel 1: Acceso Base', color: '#E0E0E0', delay: '0.1s' },
    { name: 'Inicial', price: '250', profit: '12-15%', perk: 'Nivel 2: Gestión Activa', color: '#00B0FF', delay: '0.2s' },
    { name: 'Activo', price: '500', profit: '18.5%', perk: 'Nivel 3: Capital Auditado', color: '#FFD600', delay: '0.3s' },
    { name: 'Premium', price: '1000', profit: '20-25%', perk: 'Nivel 4: Prioridad Institucional', color: '#FF3D00', delay: '0.4s' },
    { name: 'Élite', price: '1500', profit: '30% VIP', perk: 'Nivel 5: Fondo Global VIP', color: '#AA00FF', delay: '0.5s' }
  ];

  const abrirLegal = (tipo: string) => {
    const textos: {[key: string]: {t: string, c: string}} = {
      terminos: { t: "Protocolo de Servicio", c: "La gestión algorítmica de alta frecuencia opera bajo estándares de precisión matemática. El inversor reconoce que los resultados están basados en probabilidades de mercado y modelos predictivos auditados." },
      privacidad: { t: "Seguridad de Datos", c: "Encriptación de grado militar AES-256 protege cada transacción y dato de identidad de nuestros socios VIP. Ninguna información es compartida con terceros." },
      confidencialidad: { t: "Blindaje de Información", c: "La tecnología de predicción deportiva y los modelos neuronales de El Gurú Élite son propiedad intelectual protegida y exclusiva para miembros activos." }
    };
    setModalAbierto({titulo: textos[tipo].t, contenido: textos[tipo].c});
  };

  if (!isMounted) return <div className="min-h-screen bg-black" />;

  if (loading || isNavigating) {
    return (
      <div className="splash-master">
        <div className="loader-container">
          <div className="pulse-ring"></div>
          <div className="image-wrapper"><img src="/images/guru.jpg" alt="El Guru Elite" /></div>
          <div className="scan-line"></div>
        </div>
        <div className="luxe-loading-text">
          <div className="bar-container"><div className="bar-fill"></div></div>
          <h2 className="loading-text-glow">{isNavigating ? "AUTORIZANDO PROTOCOLO..." : "SINCRONIZANDO TERMINAL ÉLITE..."}</h2>
        </div>
        <style jsx global>{`
          .splash-master { background: radial-gradient(circle at center, #0a0c10 0%, #000 100%) !important; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; position: fixed; inset: 0; z-index: 99999; }
          .loader-container { position: relative; width: 180px; height: 180px; margin-bottom: 40px; }
          .image-wrapper { width: 100%; height: 100%; border-radius: 50%; overflow: hidden; border: 2px solid #00C853; box-shadow: 0 0 60px rgba(0, 200, 83, 0.3); }
          .image-wrapper img { width: 100%; height: 100%; object-fit: cover; }
          .pulse-ring { position: absolute; top: -10%; left: -10%; width: 120%; height: 120%; border: 2px solid #00C853; border-radius: 50%; animation: pulse-master 2s infinite; opacity: 0.4; }
          .scan-line { position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: #00C853; box-shadow: 0 0 20px #00C853; animation: scan 3s infinite ease-in-out; z-index: 10; }
          .bar-container { width: 200px; height: 2px; background: rgba(255,255,255,0.05); margin: 0 auto 15px; }
          .bar-fill { width: 0; height: 100%; background: #00C853; animation: fill 4s forwards linear; }
          .loading-text-glow { color: #00C853; font-size: 11px; letter-spacing: 4px; font-weight: 900; text-transform: uppercase; text-shadow: 0 0 10px rgba(0,200,83,0.5); }
          @keyframes pulse-master { 0% { transform: scale(0.9); opacity: 1; } 100% { transform: scale(1.3); opacity: 0; } }
          @keyframes scan { 0%, 100% { top: 0%; } 50% { top: 100%; } }
          @keyframes fill { 100% { width: 100%; } }
        `}</style>
      </div>
    );
  }

  return (
    <div className="elite-terminal-master" suppressHydrationWarning>
      <div className="double-ticker-container">
        <div className="ticker-top"><div className="ticker-track"><span>MARKET CONFIDENCE: HIGH // INSTITUTIONAL LIQUIDITY: VERIFIED // ALPHA-GEN v4.2 ACTIVE // PORTFOLIO PROTECTION: 100% // GLOBAL ROI: +18.5% </span><span>MARKET CONFIDENCE: HIGH // INSTITUTIONAL LIQUIDITY: VERIFIED // ALPHA-GEN v4.2 ACTIVE // PORTFOLIO PROTECTION: 100% // GLOBAL ROI: +18.5% </span></div></div>
        <div className="ticker-bottom"><div className="ticker-track"><span>LIVE FEED: [NBA] LAL vs GSW: 72% WIN PROB // [UEFA] RM vs MN: 64% OVER 2.5 // [MLB] NYY vs BOS: 58% WIN PROB // </span><span>LIVE FEED: [NBA] LAL vs GSW: 72% WIN PROB // [UEFA] RM vs MN: 64% OVER 2.5 // [MLB] NYY vs BOS: 58% WIN PROB // </span></div></div>
      </div>

      <nav className="navbar-elite">
        <div className="nav-inner">
          <div className="brand">GURÚ <span>ÉLITE</span></div>
          <div className="nav-links-desktop">
             <span onClick={() => abrirLegal('terminos')} className="nav-item">Protocolos</span>
             <span onClick={() => abrirLegal('privacidad')} className="nav-item">Privacidad</span>
             <button onClick={(e) => ejecutarTransicion(e, '/login')} className="btn-nav-vip">ACCESO VIP <Lock size={12}/></button>
          </div>
        </div>
      </nav>

      <main>
        <section className="hero-terminal">
          <div className="scanline-overlay"></div>
          <div className="hero-content">
            <div className="live-status"><Radio size={14} className="animate-pulse"/> CONEXIÓN SATELITAL ACTIVA</div>
            <h1>STAKEHOLDERS <br/><span className="gradient-text">PATRIMONIO DEPORTIVO</span></h1>
            <p>Fusionamos la robustez del mercado financiero con la rentabilidad masiva de las predicciones deportivas de élite. Inversión inteligente, futuro asegurado.</p>
            <div className="hero-btns">
              <button onClick={(e) => ejecutarTransicion(e, '/unete')} className="btn-main">REGISTRO Y COMPRA <ArrowUpRight/></button>
              <button onClick={(e) => ejecutarTransicion(e, '/login')} className="btn-sec">ACCEDER </button>
            </div>
          </div>
        </section>

        <section className="matrix-stats">
          <div className="matrix-card">
            <div className="m-header"><Target size={16}/> PRECISIÓN AI</div>
            <div className="m-value">94.2%</div>
            <div className="m-footer">VERIFICADO EN TIEMPO REAL</div>
          </div>
          <div className="matrix-card glow">
            <div className="m-header"><Activity size={16}/> ROI OBJETIVO</div>
            <div className="m-value">+18.5%</div>
            <div className="m-footer">RENDIMIENTO PROYECTADO PROMEDIO</div>
          </div>
          <div className="matrix-card">
            <div className="m-header"><ShieldCheck size={16}/> SEGURIDAD</div>
            <div className="m-value">AES-256</div>
            <div className="m-footer">ENCRIPTACIÓN DE GRADO MILITAR</div>
          </div>
        </section>

        <section className="dossier-section">
          <h2 className="section-title">NIVELES DE PARTICIPACIÓN</h2>
          <div className="dossier-grid">
            {membresias.map((plan) => (
              <div key={plan.name} className="dossier-card" style={{'--accent': plan.color, '--delay': plan.delay} as any}>
                <div className="card-top">
                  <span className="plan-id">IDENT: {plan.name.toUpperCase()}</span>
                  <h3>{plan.name}</h3>
                </div>
                <div className="card-price">${plan.price} <small>USD</small></div>
                <div className="card-specs">
                  <div className="spec"><span>Rendimiento:</span> <strong>{plan.profit}</strong></div>
                  <div className="spec"><span>Estatus:</span> <span>{plan.perk}</span></div>
                </div>
                <button onClick={(e) => ejecutarTransicion(e, '/unete')} className="btn-select">SELECCIONAR NIVEL</button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer-elite-master">
        <div className="footer-container">
          <div className="f-main-grid">
            <div className="f-col-brand">
              <div className="f-brand">GURÚ <span>ÉLITE</span></div>
              <p className="f-tagline">Infraestructura tecnológica de alta frecuencia para la gestión patrimonial en mercados deportivos globales.</p>
              <div className="f-security-badges">
                <ShieldCheck size={14} color="#00C853"/>
                <span>MILITARY-GRADE ENCRYPTION // AUDITED BY AI</span>
              </div>
            </div>

            <div className="f-col-status">
              <div className="status-indicator">
                <div className="status-dot"></div>
                <span className="font-mono">NODES ONLINE: [LON] [NYC] [HKG]</span>
              </div>
              <div className="f-concierge-link" onClick={() => window.open('https://wa.me/tunumerowhatsapp', '_blank')}>
                <MessageSquare size={16} color="#00C853"/>
                <span>LÍNEA DE SOPORTE</span>
              </div>
            </div>

            <div className="f-col-links">
              <span className="links-header">AUDITORÍA Y LEGAL</span>
              <div className="links-list">
                <span onClick={() => abrirLegal('terminos')}>Protocolos de Servicio</span>
                <span onClick={() => abrirLegal('privacidad')}>Privacidad de Datos</span>
                <span onClick={() => abrirLegal('confidencialidad')}>Acuerdo Confidencial</span>
              </div>
            </div>
          </div>
          <div className="f-bottom-bar">
            <span className="f-copy">© 2026 GURÚ ÉLITE INSTITUTIONAL. PROTECCIÓN DE ACTIVOS GLOBAL.</span>
            <div className="f-node-id"><Globe2 size={12}/> <span>SESSION ID: GE-GLOBAL-X99</span></div>
          </div>
        </div>
      </footer>

      {modalAbierto && (
        <div className="modal-overlay" onClick={() => setModalAbierto(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-top">
              <h3>{modalAbierto.titulo}</h3>
              <button onClick={() => setModalAbierto(null)}><X/></button>
            </div>
            <p>{modalAbierto.contenido}</p>
            <div className="modal-footer-line"></div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700;900&family=JetBrains+Mono:wght@700&display=swap');
        .elite-terminal-master { background: #000; color: #fff; font-family: 'Plus Jakarta Sans', sans-serif; min-height: 100vh; overflow-x: hidden; }
        
        .double-ticker-container { position: sticky; top: 0; z-index: 6000; background: #000; border-bottom: 1px solid #111; }
        .ticker-top { background: #000; padding: 10px 0; border-bottom: 1px solid #00C85311; }
        .ticker-bottom { background: #050505; padding: 10px 0; color: #00C853; }
        .ticker-track { display: flex; white-space: nowrap; animation: ticker-move 40s linear infinite; }
        .ticker-track span { padding-right: 80px; font-family: 'JetBrains Mono'; font-size: 10px; text-transform: uppercase; }
        @keyframes ticker-move { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

        .navbar-elite { padding: 25px; border-bottom: 1px solid #111; position: relative; z-index: 5000; background: rgba(0,0,0,0.8); backdrop-filter: blur(10px); }
        .nav-inner { max-width: 1400px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
        .brand { font-weight: 900; font-size: 1.5rem; letter-spacing: -1px; }
        .brand span { color: #00C853; text-shadow: 0 0 10px rgba(0,200,83,0.4); }
        .nav-links-desktop { display: none; gap: 30px; align-items: center; }
        .nav-item { font-size: 11px; font-weight: 900; color: #444; text-transform: uppercase; letter-spacing: 2px; cursor: pointer; transition: 0.3s; }
        .nav-item:hover { color: #00C853; }
        .btn-nav-vip { background: transparent; border: 1px solid #00C85344; color: #00C853; padding: 8px 20px; border-radius: 6px; font-size: 10px; font-weight: 900; letter-spacing: 1px; display: flex; align-items: center; gap: 8px; cursor: pointer; }

        .hero-terminal { position: relative; padding: 100px 25px; text-align: center; }
        .scanline-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 50%, rgba(0,200,83,0.02) 50%); background-size: 100% 4px; pointer-events: none; }
        .hero-content { position: relative; z-index: 10; max-width: 1000px; margin: 0 auto; }
        .live-status { font-family: 'JetBrains Mono'; font-size: 11px; color: #00C853; letter-spacing: 4px; margin-bottom: 30px; display: flex; align-items: center; justify-content: center; gap: 10px; }
        .hero-terminal h1 { font-size: clamp(2.2rem, 8vw, 6rem); font-weight: 900; letter-spacing: -4px; line-height: 0.85; margin-bottom: 35px; }
        .gradient-text { background: linear-gradient(180deg, #fff 0%, #00C853 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-terminal p { color: #555; font-size: 1.1rem; max-width: 650px; margin: 0 auto 50px; line-height: 1.6; }
        .hero-btns { display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; }
        .btn-main { background: #00C853; color: #000; border: none; padding: 20px 40px; border-radius: 12px; font-weight: 900; font-size: 13px; letter-spacing: 2px; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: 0.4s; }
        .btn-main:hover { transform: translateY(-5px); box-shadow: 0 10px 40px rgba(0,200,83,0.4); }
        .btn-sec { background: #080808; border: 1px solid #111; color: #fff; padding: 20px 40px; border-radius: 12px; font-weight: 900; font-size: 13px; letter-spacing: 2px; cursor: pointer; transition: 0.3s; }
        .btn-sec:hover { border-color: #00C853; }

        .matrix-stats { max-width: 1400px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; padding: 0 25px; margin-top: -40px; position: relative; z-index: 20; }
        .matrix-card { background: #050505; border: 1px solid #111; padding: 35px; border-radius: 24px; text-align: left; }
        .matrix-card.glow { border-color: #00C85333; box-shadow: inset 0 0 30px rgba(0,200,83,0.02); }
        .m-header { font-size: 10px; font-weight: 900; color: #333; letter-spacing: 3px; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
        .m-value { font-size: 3rem; font-weight: 900; letter-spacing: -2px; color: #fff; margin-bottom: 10px; }
        .m-footer { font-size: 10px; color: #00C853; font-weight: 900; letter-spacing: 1px; opacity: 0.6; }

        .dossier-section { padding: 100px 25px; max-width: 1400px; margin: 0 auto; }
        .section-title { font-size: 2.5rem; font-weight: 900; text-align: center; margin-bottom: 70px; letter-spacing: -2px; }
        .dossier-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; }
        .dossier-card { background: #050505; border: 1px solid #111; padding: 40px 30px; border-radius: 30px; border-top: 4px solid var(--accent); transition: 0.4s; animation: card-appear 0.6s ease-out forwards; animation-delay: var(--delay); opacity: 0; }
        @keyframes card-appear { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .dossier-card:hover { transform: translateY(-10px); border-color: var(--accent); }
        .plan-id { font-family: 'JetBrains Mono'; font-size: 9px; color: #222; }
        .dossier-card h3 { font-size: 1.8rem; font-weight: 900; margin: 15px 0 25px; }
        .card-price { font-size: 3.5rem; font-weight: 900; letter-spacing: -3px; margin-bottom: 25px; }
        .card-price small { font-size: 0.9rem; color: #333; letter-spacing: 0; }
        .card-specs { display: flex; flex-direction: column; gap: 12px; margin-bottom: 35px; }
        .spec { font-size: 12px; color: #666; display: flex; justify-content: space-between; border-bottom: 1px solid #111; padding-bottom: 8px; }
        .spec strong { color: var(--accent); }
        .btn-select { width: 100%; padding: 16px; border: 1px solid #111; background: transparent; color: #fff; font-weight: 900; font-size: 10px; border-radius: 10px; cursor: pointer; transition: 0.3s; letter-spacing: 1px; }
        .btn-select:hover { border-color: var(--accent); background: var(--accent); color: #000; }

        .footer-elite-master { background: #000; border-top: 1px solid #111; padding: 80px 25px 40px; }
        .footer-container { max-width: 1400px; margin: 0 auto; }
        .f-main-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 50px; margin-bottom: 60px; }
        .f-brand { font-weight: 900; font-size: 1.8rem; letter-spacing: -1px; margin-bottom: 20px; }
        .f-brand span { color: #00C853; }
        .f-tagline { color: #444; font-size: 13px; line-height: 1.6; max-width: 350px; margin-bottom: 25px; }
        .f-security-badges { display: flex; align-items: center; gap: 10px; font-family: 'JetBrains Mono'; font-size: 9px; color: #222; }
        .status-indicator { display: flex; align-items: center; gap: 10px; color: #00C853; margin-bottom: 20px; font-size: 10px; font-family: 'JetBrains Mono'; }
        .status-dot { width: 6px; height: 6px; background: #00C853; border-radius: 50%; animation: blink 1.5s infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .f-concierge-link { display: flex; align-items: center; gap: 12px; cursor: pointer; transition: 0.3s; }
        .f-concierge-link span { font-size: 10px; font-weight: 900; color: #333; letter-spacing: 2px; }
        .f-concierge-link:hover span { color: #00C853; }
        .links-header { font-size: 10px; font-weight: 900; color: #222; letter-spacing: 3px; margin-bottom: 20px; display: block; }
        .links-list { display: flex; flex-direction: column; gap: 12px; }
        .links-list span { color: #444; font-size: 12px; cursor: pointer; transition: 0.3s; }
        .links-list span:hover { color: #fff; }
        .f-bottom-bar { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #111; padding-top: 30px; }
        .f-copy { color: #222; font-size: 10px; font-weight: 700; }
        .f-node-id { display: flex; align-items: center; gap: 8px; color: #111; font-size: 10px; font-weight: 900; }

        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.95); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: 25px; backdrop-filter: blur(5px); }
        .modal-content { background: #050505; border: 1px solid #111; padding: 40px; border-radius: 30px; max-width: 550px; position: relative; }
        .modal-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
        .modal-top h3 { font-weight: 900; color: #fff; font-size: 1.4rem; letter-spacing: -1px; }
        .modal-top button { background: none; border: none; color: #00C853; cursor: pointer; }
        .modal-content p { color: #666; line-height: 1.8; font-size: 1rem; }
        .modal-footer-line { width: 40px; height: 3px; background: #00C853; margin-top: 30px; border-radius: 10px; }

        @media (min-width: 1024px) {
          .nav-links-desktop { display: flex; }
          .hero-terminal { padding: 140px 25px; }
          .dossier-grid { grid-template-columns: repeat(5, 1fr); }
        }

        @media (max-width: 768px) {
          .btn-main, .btn-sec { width: 100%; }
          .hero-terminal { padding: 80px 20px; }
          .hero-terminal h1 { font-size: 2.8rem; }
          .matrix-stats { margin-top: -20px; }
          .f-bottom-bar { flex-direction: column; gap: 15px; text-align: center; }
        }
      `}</style>
    </div>
  );
}