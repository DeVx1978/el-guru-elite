"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, ArrowUpRight, Lock, FileText, Scale, Activity, Zap, TrendingUp, Globe, ChevronDown, X, Menu 
} from 'lucide-react';

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);
  const [modalAbierto, setModalAbierto] = useState<{titulo: string, contenido: string} | null>(null);
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/panel');
    router.prefetch('/unete');
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, [router]);

  const ejecutarTransicion = (e: React.MouseEvent, ruta: string) => {
    e.preventDefault(); 
    setIsNavigating(true); 
    setMenuMovilAbierto(false);
    setTimeout(() => {
      router.push(ruta);
    }, 4000); 
  };

  const membresias = [
    { name: 'Micro', price: '100', profit: '+8-10%', perk: 'Nivel 1: Acceso Base', delay: '0.1s', color: '#444' },
    { name: 'Inicial', price: '250', profit: '+12-15%', perk: 'Nivel 2: Gestión Activa', delay: '0.2s', color: '#00E5FF' },
    { name: 'Activo', price: '500', profit: '+18.5%', perk: 'Nivel 3: Capital Auditado', delay: '0.3s', color: '#00C853' },
    { name: 'Premium', price: '1000', profit: '+20-25%', perk: 'Nivel 4: Prioridad Institucional', delay: '0.4s', color: '#FFD600' },
    { name: 'Élite', price: '1500', profit: '+30% VIP', perk: 'Nivel 5: Fondo Global VIP', delay: '0.5s', color: '#AA00FF' }
  ];

  const abrirLegal = (tipo: string) => {
    const textos: {[key: string]: {t: string, c: string}} = {
      terminos: { t: "Términos de Servicio", c: "Al participar en nuestros fondos, el inversor reconoce que la gestión algorítmica busca maximizar la eficiencia. El Gurú Élite opera bajo protocolos de transparencia institucional." },
      privacidad: { t: "Políticas de Privacidad", c: "Su identidad es nuestro activo más valioso. Utilizamos encriptación AES-256 para asegurar que su actividad financiera permanezca estrictamente privada." },
      confidencialidad: { t: "Confidencialidad", c: "Toda estrategia de arbitraje y análisis cuantitativo compartido en esta plataforma es propiedad intelectual protegida y no debe ser divulgada a terceros." }
    };
    setModalAbierto({titulo: textos[tipo].t, contenido: textos[tipo].c});
  };

  const abrirInfoSeccion = (seccion: string) => {
    const info: {[key: string]: {t: string, c: string}} = {
      quienes: { t: "Quiénes Somos", c: "Somos un colectivo de analistas y desarrolladores de IA enfocados en la optimización de capital. Nuestra misión es proporcionar herramientas de inversión institucional al inversor privado." },
      proyecto: { t: "Proyecto Gurú", c: "Un ecosistema tecnológico de alta frecuencia que utiliza redes neuronales para predecir movimientos de mercado con precisión matemática superior." },
      inversionistas: { t: "Inversionistas", c: "Diseñamos portafolios blindados para capitales que buscan rentabilidad constante. Nuestra infraestructura permite una gestión de activos auditada y segura." }
    };
    setModalAbierto({titulo: info[seccion].t, contenido: info[seccion].c});
    setMenuMovilAbierto(false);
  };

  if (loading || isNavigating) {
    return (
      <div className="splash-master">
        <div className={`loader-container ${isNavigating ? 'nav-mode' : ''}`}>
          <div className="pulse-ring"></div>
          <div className="image-wrapper">
            <img src="/images/guru.jpg" alt="El Guru Elite" />
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
        </div>
        <style jsx global>{`
          .splash-master { background: radial-gradient(circle at center, #0a0c10 0%, #000 100%) !important; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; overflow: hidden; position: fixed; top: 0; left: 0; width: 100%; z-index: 999999; }
          .loader-container { position: relative; width: 220px; height: 220px; margin-bottom: 40px; }
          .image-wrapper { width: 100%; height: 100%; border-radius: 50%; overflow: hidden; border: 2px solid #00C853; box-shadow: 0 0 60px rgba(0, 200, 83, 0.5); position: relative; z-index: 2; }
          .image-wrapper img { width: 100%; height: 100%; object-fit: cover; }
          .pulse-ring { position: absolute; top: -15%; left: -15%; width: 130%; height: 130%; border: 2px solid #00C853; border-radius: 50%; animation: pulse-master 2s infinite; opacity: 0.4; }
          .scan-line { position: absolute; top: 0; left: 0; width: 100%; height: 8px; background: linear-gradient(to right, transparent, #00C853, transparent); box-shadow: 0 0 20px #00C853; z-index: 3; animation: scan-master 3s ease-in-out infinite; }
          .loading-bar-fill { width: 0%; height: 100%; background: #00C853; animation: progress-master 4s linear forwards; }
          .loading-text-elite { color: #00C853; font-size: 11px; letter-spacing: 6px; font-weight: 300; text-transform: uppercase; margin-bottom: 10px; }
          @keyframes pulse-master { 0% { transform: scale(0.8); opacity: 1; } 100% { transform: scale(1.4); opacity: 0; } }
          @keyframes progress-master { 100% { width: 100%; } }
          @keyframes scan-master { 0%, 100% { top: 0%; } 50% { top: 100%; } }
        `}</style>
      </div>
    );
  }

  return (
    <div className="elite-landing-master">
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
            <span onClick={() => abrirInfoSeccion('quienes')} className="link-elite pointer">Quiénes Somos</span>
            <span onClick={() => abrirInfoSeccion('proyecto')} className="link-elite pointer">Proyecto Gurú</span>
            <span onClick={() => abrirInfoSeccion('inversionistas')} className="link-elite pointer">Inversionistas</span>
          </div>

          <div className="nav-actions-master">
            <button onClick={(e) => ejecutarTransicion(e, '/panel')} className="btn-access-master desktop-only">ACCESO EXCLUSIVO</button>
            <button className="menu-toggle" onClick={() => setMenuMovilAbierto(!menuMovilAbierto)}>
              {menuMovilAbierto ? <X size={28} color="#00C853" /> : <Menu size={28} color="#00C853" />}
            </button>
          </div>
        </div>

        <div className={`mobile-menu-overlay ${menuMovilAbierto ? 'active' : ''}`}>
           <span onClick={() => abrirInfoSeccion('quienes')} className="mobile-link">Quiénes Somos</span>
           <span onClick={() => abrirInfoSeccion('proyecto')} className="mobile-link">Proyecto Gurú</span>
           <span onClick={() => abrirInfoSeccion('inversionistas')} className="mobile-link">Inversionistas</span>
           <button onClick={(e) => ejecutarTransicion(e, '/panel')} className="btn-mobile-access">ACCESO EXCLUSIVO</button>
        </div>
      </nav>

      <section className="hero-elite">
        <div className="hero-layout">
          <div className="hero-info-text">
            <div className="hero-status-tag"><Zap size={14} color="#00C853" /> ÉLITE DE INVERSIÓN EXCLUSIVA</div>
            <h1 className="hero-main-title">
              <span className="text-glow-neon">LA CIENCIA DE</span> <br/>
              PREDECIR
            </h1>
            <p className="hero-subtext">
              Optimización estratégica de activos mediante algoritmos de IA de alta frecuencia. 
              Seguridad blindada para inversores de alto perfil.
            </p>
            <div className="hero-cta-btn-group">
              <button onClick={(e) => ejecutarTransicion(e, '/unete')} className="btn-hero-primary">
                COMENZAR <ArrowUpRight size={18} />
              </button>
              <button onClick={(e) => ejecutarTransicion(e, '/login')} className="btn-hero-secondary">
                ACCESO <Lock size={16} />
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
          <h2 className="header-title-luxe">PORTAFOLIO DE MEMBRESIAS <span className="brand-neon">EXCLUSIVAS</span></h2>
          <div className="header-line-luxe"></div>
        </div>
        <div className="plans-grid-luxe">
          {membresias.map((plan) => (
            <div key={plan.name} className="membership-card-luxe fade-up-card shadow-hover" style={{animationDelay: plan.delay, '--card-color': plan.color} as React.CSSProperties}>
              <div className="card-energy-bar"></div>
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
        </div>
        <p className="f-copyright-text">© 2026 EL GURÚ ÉLITE. TODOS LOS DERECHOS RESERVADOS.</p>
      </footer>

      <style jsx global>{`
        :root { --neon: #00C853; }
        .elite-landing-master { background-color: #000; color: white; min-height: 100vh; font-family: 'Inter', sans-serif; overflow-x: hidden; padding-top: 80px; }
        
        .navbar-elite { width: 100%; position: fixed; top: 0; z-index: 1000; background: rgba(0, 0, 0, 0.95); border-bottom: 1px solid rgba(255,255,255,0.05); backdrop-filter: blur(20px); }
        .nav-container-master { max-width: 1400px; margin: 0 auto; padding: 20px 30px; display: flex; justify-content: space-between; align-items: center; }
        .brand-text { font-weight: 900; font-size: 1.5rem; letter-spacing: -1px; }
        .brand-neon { color: var(--neon); text-shadow: 0 0 15px rgba(0,200,83,0.4); }
        
        .nav-links-desktop { display: none; gap: 30px; }
        @media (min-width: 1024px) { .nav-links-desktop { display: flex; } }
        .link-elite { color: #888; text-transform: uppercase; font-size: 11px; font-weight: 900; letter-spacing: 2px; transition: 0.3s; cursor: pointer; }

        .menu-toggle { display: block; background: none; border: none; cursor: pointer; }
        @media (min-width: 1024px) { .menu-toggle { display: none; } .desktop-only { display: block; } }
        .desktop-only { display: none; }

        .mobile-menu-overlay { position: fixed; top: 80px; left: 0; width: 100%; height: 0; background: #000; overflow: hidden; transition: 0.5s cubic-bezier(0.19, 1, 0.22, 1); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 30px; z-index: 999; }
        .mobile-menu-overlay.active { height: calc(100vh - 80px); }
        .mobile-link { color: white; font-size: 1.5rem; font-weight: 900; text-transform: uppercase; letter-spacing: 3px; }

        .hero-elite { max-width: 1400px; margin: 0 auto; padding: 60px 20px; }
        @media (min-width: 1024px) { .hero-elite { padding: 100px 30px; } }
        
        .hero-main-title { font-size: clamp(2.5rem, 8vw, 5.5rem); font-weight: 900; line-height: 0.95; margin-bottom: 25px; letter-spacing: -2px; }
        .text-glow-neon { background: linear-gradient(180deg, #fff 30%, var(--neon) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-subtext { color: #666; font-size: 1.1rem; line-height: 1.6; max-width: 600px; margin-bottom: 35px; }

        /* --- BOTONES EN UNA SOLA FILA PARA MÓVIL --- */
        .hero-cta-btn-group { display: flex; gap: 8px; width: 100%; }
        .btn-hero-primary { background: var(--neon); color: black; border: none; padding: 16px 15px; border-radius: 4px; font-weight: 900; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; flex: 1.5; font-size: 0.75rem; white-space: nowrap; }
        .btn-hero-secondary { background: transparent; border: 1px solid var(--neon); color: var(--neon); padding: 16px 15px; border-radius: 4px; font-weight: 900; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; flex: 1; font-size: 0.75rem; white-space: nowrap; }
        
        @media (min-width: 1024px) { 
          .hero-cta-btn-group { width: auto; gap: 20px; }
          .btn-hero-primary { padding: 20px 40px; font-size: 1rem; }
          .btn-hero-secondary { display: none; } 
        }

        .hero-visuals-horizontal { display: flex; flex-direction: column; gap: 15px; margin-top: 50px; }
        @media (min-width: 1024px) { .hero-visuals-horizontal { flex-direction: row; gap: 20px; } }
        .stat-card-horizontal { background: rgba(10,10,10,0.8); border: 1px solid #111; padding: 20px; border-radius: 12px; display: flex; align-items: center; gap: 15px; flex: 1; }
        .stat-label { font-size: 10px; color: #444; font-weight: 900; letter-spacing: 2px; }
        .stat-value { font-size: 1.3rem; font-weight: 900; }

        .plans-section-luxe { padding: 80px 20px; max-width: 1600px; margin: 0 auto; }
        .plans-grid-luxe { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
        .membership-card-luxe { background: #080808; border: 1px solid #111; border-radius: 16px; padding: 40px 20px; position: relative; overflow: hidden; transition: 0.4s; text-align: center; }
        
        .footer-elite-master { padding: 60px 20px; background: #050505; text-align: center; border-top: 1px solid #111; margin-top: 50px; }
        .footer-links-row { display: flex; justify-content: center; gap: 30px; margin-bottom: 30px; }

        .fade-up-card { opacity: 0; animation: fadeUp 0.8s ease forwards; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}