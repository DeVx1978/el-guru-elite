"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, ArrowUpRight, Lock, FileText, Scale, Activity, Zap, TrendingUp, Globe, ChevronDown, X 
} from 'lucide-react';

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const [seccionExpandida, setSeccionExpandida] = useState<string | null>(null);
  const [modalAbierto, setModalAbierto] = useState<{titulo: string, contenido: string} | null>(null);
  const router = useRouter();

  // --- 1. CARGA INICIAL (5 SEGUNDOS) ---
  useEffect(() => {
    router.prefetch('/panel');
    router.prefetch('/unete');
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, [router]);

  // --- 2. NAVEGACIÓN BLINDADA ---
  const ejecutarTransicion = (e: React.MouseEvent, ruta: string) => {
    e.preventDefault(); 
    setIsNavigating(true); 
    setTimeout(() => {
      router.push(ruta);
    }, 4000); 
  };

  const toggleSeccion = (id: string) => {
    setSeccionExpandida(seccionExpandida === id ? null : id);
  };

  const membresias = [
    { name: 'Micro', price: '100', profit: '+8-10%', perk: 'Nivel 1: Acceso Base', delay: '0.1s', color: '#444' },
    { name: 'Inicial', price: '250', profit: '+12-15%', perk: 'Nivel 2: Gestión Activa', delay: '0.2s', color: '#00E5FF' },
    { name: 'Activo', price: '500', profit: '+18.5%', perk: 'Nivel 3: Capital Auditado', delay: '0.3s', color: '#00C853' },
    { name: 'Premium', price: '1000', profit: '+20-25%', perk: 'Nivel 4: Prioridad Institucional', delay: '0.4s', color: '#FFD600' },
    { name: 'Élite', price: '1500', profit: '+30% VIP', perk: 'Nivel 5: Fondo Global VIP', delay: '0.5s', color: '#AA00FF' }
  ];

  // --- 3. LÓGICA LEGAL ---
  const abrirLegal = (tipo: string) => {
    const textos: {[key: string]: {t: string, c: string}} = {
      terminos: { t: "Términos de Servicio", c: "Al participar en nuestros fondos, el inversor reconoce que la gestión algorítmica busca maximizar la eficiencia. El Gurú Élite opera bajo protocolos de transparencia institucional." },
      privacidad: { t: "Políticas de Privacidad", c: "Su identidad es nuestro activo más valioso. Utilizamos encriptación AES-256 para asegurar que su actividad financiera permanezca estrictamente privada." },
      confidencialidad: { t: "Confidencialidad", c: "Toda estrategia de arbitraje y análisis cuantitativo compartido en esta plataforma es propiedad intelectual protegida y no debe ser divulgada a terceros." }
    };
    setModalAbierto({titulo: textos[tipo].t, contenido: textos[tipo].c});
  };

  // --- 4. LOADER DUAL ---
  if (loading || isNavigating) {
    return (
      <div className="splash-master">
        <div className={`loader-container ${isNavigating ? 'nav-mode' : ''}`}>
          <div className="pulse-ring"></div>
          <div className="image-wrapper">
            <img src="/images/guru.jpg" alt="El Guru Elite" fetchPriority="high" loading="eager" />
          </div>
          <div className="scan-line"></div>
        </div>
        <div className="welcome-container-luxe">
          <div className="loading-bar-master">
            <div className="loading-bar-fill"></div>
          </div>
          <h2 className="loading-text-elite">
            {isNavigating ? "VALIDANDO CREDENCIALES..." : "IDENTIFICANDO INVERSOR ÉLITE..."}
          </h2>
          <p className="welcome-subtext">
            {isNavigating ? "ABRIENDO PUERTA DE ENLACE SEGURO" : "LA PUERTA AL CAPITAL GLOBAL SE ESTÁ ABRIENDO"}
          </p>
        </div>
        <style jsx global>{`
          .splash-master { background: radial-gradient(circle at center, #0a0c10 0%, #000 100%) !important; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; overflow: hidden; position: fixed; top: 0; left: 0; width: 100%; z-index: 999999; }
          .loader-container { position: relative; width: 220px; height: 220px; margin-bottom: 40px; transition: all 0.5s ease; }
          .nav-mode { width: 160px; height: 160px; }
          .image-wrapper { width: 100%; height: 100%; border-radius: 50%; overflow: hidden; border: 2px solid #00C853; box-shadow: 0 0 60px rgba(0, 200, 83, 0.5); position: relative; z-index: 2; }
          .image-wrapper img { width: 100%; height: 100%; object-fit: cover; }
          .pulse-ring { position: absolute; top: -15%; left: -15%; width: 130%; height: 130%; border: 2px solid #00C853; border-radius: 50%; animation: pulse-master 2s infinite; opacity: 0.4; }
          .scan-line { position: absolute; top: 0; left: 0; width: 100%; height: 8px; background: linear-gradient(to right, transparent, #00C853, transparent); box-shadow: 0 0 20px #00C853; z-index: 3; animation: scan-master 3s ease-in-out infinite; }
          .welcome-container-luxe { width: 100%; max-width: 320px; display: flex; flex-direction: column; align-items: center; text-align: center; margin-top: 20px; }
          .loading-bar-master { width: 100%; height: 2px; background: rgba(255,255,255,0.03); border-radius: 10px; overflow: hidden; margin-bottom: 25px; }
          .loading-bar-fill { width: 0%; height: 100%; background: #00C853; animation: progress-master 4s linear forwards; box-shadow: 0 0 10px #00C853; }
          .loading-text-elite { color: #00C853; font-size: 11px; letter-spacing: 6px; font-weight: 300; text-transform: uppercase; margin-bottom: 10px; }
          .welcome-subtext { color: #222; font-size: 9px; letter-spacing: 3px; font-weight: 700; text-transform: uppercase; }
          @keyframes pulse-master { 0% { transform: scale(0.8); opacity: 1; } 100% { transform: scale(1.4); opacity: 0; } }
          @keyframes scan-master { 0%, 100% { top: 0%; } 50% { top: 100%; } }
          @keyframes progress-master { 100% { width: 100%; } }
        `}</style>
      </div>
    );
  }

  return (
    <div className="elite-landing-master">
      {/* 💉 MODAL LEGAL (NUEVO ÓRGANO AGREGADO) */}
      {modalAbierto && (
        <div className="legal-overlay" onClick={() => setModalAbierto(null)}>
          <div className="legal-modal glass-effect" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{modalAbierto.titulo}</h3>
              <button onClick={() => setModalAbierto(null)}><X size={20} color="#00C853" /></button>
            </div>
            <p>{modalAbierto.contenido}</p>
            <div className="modal-accent"></div>
          </div>
        </div>
      )}

      <nav className="navbar-elite">
        <div className="nav-container-master">
          <div className="nav-brand">
            <span className="brand-text">EL GURÚ <span className="brand-neon">ÉLITE</span></span>
          </div>
          <div className="nav-links-desktop">
            <a href="#quienes-somos" className="link-elite">Quiénes Somos</a>
            <a href="#proyecto-guru" className="link-elite">Proyecto Gurú</a>
            <a href="#proyecto-inversionistas" className="link-elite">Inversionistas</a>
          </div>
          <div className="nav-actions-master">
            <button onClick={(e) => ejecutarTransicion(e, '/panel')} className="btn-access-master">ACCESO PRIVADO</button>
          </div>
        </div>
      </nav>

      <section className="hero-elite">
        <div className="hero-layout">
          <div className="hero-info-text">
            <div className="hero-status-tag"><Zap size={14} color="#00C853" /> NETWORK DE INVERSIÓN INSTITUCIONAL</div>
            <h1 className="hero-main-title">
              <span className="text-glow-neon">LA CIENCIA DE</span> <br/>
              RENTABILIZAR
            </h1>
            <p className="hero-subtext">
              Optimización estratégica de activos mediante algoritmos de IA de alta frecuencia. 
              Seguridad blindada para inversores de alto perfil.
            </p>
            <div className="hero-cta-btn-group">
              <button onClick={(e) => ejecutarTransicion(e, '/unete')} className="btn-hero-primary">
                COMENZAR AHORA <ArrowUpRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="hero-visuals-horizontal">
          <div className="master-glow-orb"></div>
          <div className="stat-card-horizontal glass-effect">
            <div className="stat-icon-glow"><Activity color="#00C853" size={24} /></div>
            <div className="stat-info">
              <span className="stat-label">RENDIMIENTO PROMEDIO</span>
              <span className="stat-value">+18.5% <small>MES</small></span>
            </div>
          </div>
          <div className="stat-card-horizontal glass-effect">
            <div className="stat-icon-glow"><ShieldCheck color="#00C853" size={24} /></div>
            <div className="stat-info">
              <span className="stat-label">PROTECCIÓN DE CAPITAL</span>
              <span className="stat-value">100% Auditado</span>
            </div>
          </div>
          <div className="stat-card-horizontal glass-effect">
            <div className="stat-icon-glow"><Lock color="#00C853" size={24} /></div>
            <div className="stat-info">
              <span className="stat-label">SEGURIDAD INSTITUCIONAL</span>
              <span className="stat-value">Validación IA</span>
            </div>
          </div>
        </div>
      </section>

      <section id="proyecto-inversionistas" className="plans-section-luxe">
        <div className="section-header-luxe">
          <span className="header-tag-luxe">MERCADO DE CAPITAL PRIVADO</span>
          <h2 className="header-title-luxe">PORTAFOLIO DE ACTIVOS <span className="brand-neon">ÉLITE</span></h2>
          <div className="header-line-luxe"></div>
        </div>
        <div className="plans-grid-luxe">
          {membresias.map((plan) => (
            <div key={plan.name} className="membership-card-luxe fade-up-card shadow-hover" style={{animationDelay: plan.delay, '--card-color': plan.color} as React.CSSProperties}>
              <div className="card-energy-bar"></div>
              <div className="card-glow-effect"></div>
              <div className="m-card-inner">
                <div className="m-card-header"><span className="m-fondo-tag">FONDO DE INVERSIÓN</span><h3 className="m-card-name">{plan.name}</h3></div>
                <div className="m-card-body">
                  <div className="m-card-price"><span className="m-sign">$</span><span className="m-num">{plan.price}</span><span className="m-usd">USD</span></div>
                  <div className="m-card-profit"><TrendingUp size={18} color={plan.color} /><span>PROFIT: <strong>{plan.profit}</strong></span></div>
                  <div className="m-divider-luxe"></div>
                  <p className="m-perk-text">{plan.perk}</p>
                </div>
                <button onClick={(e) => ejecutarTransicion(e, '/unete')} className="btn-m-acquire">ADQUIRIR</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer-elite-master">
        <div className="footer-links-row">
          <span className="f-item-elite" onClick={() => abrirLegal('terminos')}><Scale size={16} color="#00C853" /> Términos</span>
          <span className="f-item-elite" onClick={() => abrirLegal('privacidad')}><FileText size={16} color="#00C853" /> Privacidad</span>
          <span className="f-item-elite" onClick={() => abrirLegal('confidencialidad')}><Lock size={16} color="#00C853" /> Confidencialidad</span>
        </div>
        <div className="footer-info-row">
           <p className="f-copyright-text">© 2026 EL GURÚ ÉLITE. TODOS LOS DERECHOS RESERVADOS.</p>
           <p className="f-dev-text">Desarrollado por <span className="dev-brand">DeVx</span></p>
        </div>
      </footer>

      <style jsx global>{`
        :root { --neon: #00C853; --glass: rgba(15, 15, 15, 0.75); }
        .elite-landing-master { background-color: #000; color: white; min-height: 100vh; font-family: 'Inter', sans-serif; overflow-x: hidden; padding-top: 80px; scroll-behavior: smooth; }
        .navbar-elite { width: 100%; position: fixed; top: 0; z-index: 1000; backdrop-filter: blur(30px); background: rgba(0, 0, 0, 0.95); border-bottom: 1px solid rgba(255,255,255,0.05); }
        .nav-container-master { max-width: 1400px; margin: 0 auto; padding: 25px 30px; display: flex; justify-content: space-between; align-items: center; }
        .brand-text { font-weight: 900; font-size: 1.5rem; }
        .brand-neon { color: var(--neon); text-shadow: 0 0 20px rgba(0, 200, 83, 0.5); }
        .link-elite { color: #444; text-decoration: none; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; }
        .link-elite:hover { color: var(--neon); }
        .btn-access-master { background: transparent; border: 1px solid var(--neon); color: var(--neon); padding: 12px 28px; border-radius: 4px; font-weight: 900; font-size: 11px; cursor: pointer; transition: 0.3s; }
        .btn-access-master:hover { background: var(--neon); color: black; box-shadow: 0 0 15px var(--neon); }
        .hero-elite { max-width: 1400px; margin: 0 auto; padding: 100px 30px; }
        .hero-main-title { font-size: 3.5rem; font-weight: 900; line-height: 0.95; margin-bottom: 35px; letter-spacing: -3px; }
        @media (min-width: 768px) { .hero-main-title { font-size: 5.5rem; } }
        .text-glow-neon { background: linear-gradient(180deg, #fff 40%, var(--neon) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-subtext { color: #888; font-size: 1.25rem; line-height: 1.7; margin-bottom: 50px; }
        .btn-hero-primary { background: var(--neon); color: black; border: none; padding: 22px 50px; border-radius: 4px; font-weight: 900; display: flex; align-items: center; gap: 15px; cursor: pointer; }
        .hero-visuals-horizontal { max-width: 1400px; margin: 0 auto; padding: 80px 30px; display: flex; flex-direction: column; align-items: center; gap: 25px; position: relative; }
        @media (min-width: 1024px) { .hero-visuals-horizontal { flex-direction: row; justify-content: center; gap: 20px; margin-top: 100px; } }
        .master-glow-orb { position: absolute; width: 500px; height: 500px; background: var(--neon); filter: blur(160px); opacity: 0.1; z-index: 1; top: 50%; left: 50%; transform: translate(-50%, -50%); }
        .stat-card-horizontal { background: var(--glass); backdrop-filter: blur(40px); border: 1px solid rgba(0, 200, 83, 0.1); border-radius: 12px; padding: 25px; display: flex; align-items: center; gap: 20px; width: 100%; position: relative; z-index: 10; transition: 0.5s; }
        .stat-card-horizontal:hover { border-color: var(--neon); transform: translateY(-5px); }
        .stat-label { font-size: 11px; color: #444; font-weight: 900; letter-spacing: 1px; }
        .stat-value { font-size: 24px; font-weight: 900; color: white; display: block; margin-top: 6px; }
        .plans-section-luxe { padding: 140px 30px; max-width: 1600px; margin: 0 auto; }
        .membership-card-luxe { background: #080808; border: 1px solid #111; border-radius: 16px; position: relative; overflow: hidden; transition: 0.5s; display: flex; flex-direction: column; }
        .membership-card-luxe:hover { border-color: var(--card-color); transform: translateY(-15px); }
        .card-energy-bar { width: 100%; height: 5px; background: var(--card-color); position: absolute; top: 0; left: 0; box-shadow: 0 0 15px var(--card-color); z-index: 5; }
        .btn-m-acquire { background: transparent; border: 1px solid var(--card-color); color: var(--card-color); padding: 14px; border-radius: 4px; font-weight: 900; font-size: 11px; cursor: pointer; transition: 0.3s; }

        /* --- STYLES MODAL & FOOTER VISIBILITY --- */
        .legal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); z-index: 1000000; display: flex; justify-content: center; align-items: center; backdrop-filter: blur(8px); }
        .legal-modal { background: #0a0a0a; border: 1px solid var(--neon); padding: 40px; border-radius: 20px; max-width: 500px; width: 90%; position: relative; box-shadow: 0 0 40px rgba(0, 200, 83, 0.2); }
        .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .modal-header h3 { color: white; font-weight: 900; letter-spacing: 1px; text-transform: uppercase; }
        .modal-header button { background: transparent; border: none; cursor: pointer; }
        .legal-modal p { color: #ccc; line-height: 1.6; font-size: 14px; }
        .modal-accent { width: 40px; height: 2px; background: var(--neon); margin-top: 25px; box-shadow: 0 0 10px var(--neon); }

        .footer-elite-master { padding: 100px 30px 60px; background: #050505; text-align: center; border-top: 1px solid #111; margin-top: 50px; }
        .footer-links-row { display: flex; justify-content: center; gap: 40px; margin-bottom: 50px; flex-wrap: wrap; }
        .f-item-elite { color: #E0E0E0 !important; font-size: 13px; font-weight: 900; display: flex; align-items: center; gap: 10px; transition: 0.3s; cursor: pointer; }
        .f-item-elite:hover { color: var(--neon); }
        .footer-info-row { display: flex; flex-direction: column; gap: 15px; align-items: center; border-top: 1px solid rgba(255,255,255,0.03); padding-top: 40px; }
        .f-copyright-text { color: #BBBBBB; font-size: 11px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; }
        .f-dev-text { color: #666; font-size: 10px; font-weight: 800; letter-spacing: 4px; text-transform: uppercase; margin-top: 10px; }
        .dev-brand { color: var(--neon); font-weight: 900; }
        .fade-up-card { opacity: 0; animation: fadeUpMaster 1s ease forwards; }
        @keyframes fadeUpMaster { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}