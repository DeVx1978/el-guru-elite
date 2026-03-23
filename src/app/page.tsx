"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, ArrowUpRight, Lock, FileText, Scale, Activity, Zap, TrendingUp, Globe, ChevronDown, X, Menu, ShieldAlert 
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
    router.prefetch('/admin');
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, [router]);

  const ejecutarTransicion = (e: React.MouseEvent, ruta: string) => {
    e.preventDefault(); 
    setIsNavigating(true); 
    setMenuMovilAbierto(false);

    // 🛡️ PROTOCOLO ANTI-INTRUSIÓN:
    // Si el usuario hace clic en ACCESO VIP, forzamos que el sistema pida Login 
    // a menos que explícitamente queramos ir al panel con sesión validada.
    const socioId = typeof window !== 'undefined' ? localStorage.getItem('socio_id') : null;
    
    let destinoFinal = ruta;

    // Si no hay socio_id, o si es un acceso desde la landing, mandamos a LOGIN por seguridad
    if (ruta === '/login' || ruta === '/panel') {
      if (!socioId) {
        destinoFinal = '/login';
      } else {
        // Solo si hay sesión, validamos roles
        const socioRol = localStorage.getItem('socio_rol');
        destinoFinal = socioRol === 'admin' ? '/admin' : '/panel';
      }
    }

    setTimeout(() => { 
      router.push(destinoFinal); 
    }, 3500);
  };

  const membresias = [
    { name: 'Micro', price: '100', profit: '+8-10%', perk: 'Nivel 1: Acceso Base', delay: '0.1s', color: '#E0E0E0' },
    { name: 'Inicial', price: '250', profit: '+12-15%', perk: 'Nivel 2: Gestión Activa', delay: '0.2s', color: '#81D4FA' },
    { name: 'Activo', price: '500', profit: '+18.5%', perk: 'Nivel 3: Capital Auditado', delay: '0.3s', color: '#00C853' },
    { name: 'Premium', price: '1000', profit: '+20-25%', perk: 'Nivel 4: Prioridad Institucional', delay: '0.4s', color: '#FFD600' },
    { name: 'Élite', price: '1500', profit: '+30% VIP', perk: 'Nivel 5: Fondo Global VIP', delay: '0.5s', color: '#AA00FF' }
  ];

  const abrirLegal = (tipo: string) => {
    const textos: {[key: string]: {t: string, c: string}} = {
      terminos: { t: "Términos de Servicio", c: "Al participar en nuestros fondos, el inversor reconoce que la gestión algorítmica busca maximizar la eficiencia. El Gurú Élite opera bajo protocolos de transparencia institucional y el inversor acepta los riesgos inherentes al mercado financiero." },
      privacidad: { t: "Políticas de Privacidad", c: "Su identidad es nuestro activo más valioso. Utilizamos encriptación AES-256 para asegurar que su actividad financiera y datos personales permanezcan bajo estricto anonimato y protección profesional." },
      confidencialidad: { t: "Acuerdo de Confidencialidad", c: "Toda estrategia de arbitraje, análisis de alta frecuencia y tecnología compartida en esta plataforma es propiedad intelectual protegida. Queda prohibida la reproducción total o parcial fuera del entorno Élite." }
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
        <div className="loader-container">
          <div className="pulse-ring"></div>
          <div className="image-wrapper"><img src="/images/guru.jpg" alt="El Guru Elite" /></div>
          <div className="scan-line"></div>
        </div>
        <div className="welcome-container-luxe">
          <div className="loading-bar-master"><div className="loading-bar-fill"></div></div>
          <h2 className="loading-text-elite">{isNavigating ? "VERIFICANDO PROTOCOLO..." : "IDENTIFICANDO INVERSOR ÉLITE..."}</h2>
        </div>
        <style jsx global>{`
          .splash-master { background: radial-gradient(circle at center, #0a0c10 0%, #000 100%) !important; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; overflow: hidden; position: fixed; top: 0; left: 0; width: 100%; z-index: 999999; }
          .loader-container { position: relative; width: 180px; height: 180px; margin-bottom: 40px; }
          .image-wrapper { width: 100%; height: 100%; border-radius: 50%; overflow: hidden; border: 2px solid #00C853; box-shadow: 0 0 60px rgba(0, 200, 83, 0.5); }
          .image-wrapper img { width: 100%; height: 100%; object-fit: cover; }
          .pulse-ring { position: absolute; top: -15%; left: -15%; width: 130%; height: 130%; border: 2px solid #00C853; border-radius: 50%; animation: pulse-master 2s infinite; opacity: 0.4; }
          .scan-line { position: absolute; top: 0; left: 0; width: 100%; height: 8px; background: linear-gradient(to right, transparent, #00C853, transparent); box-shadow: 0 0 20px #00C853; z-index: 3; animation: scan-master 3s ease-in-out infinite; }
          .loading-bar-master { width: 180px; height: 2px; background: rgba(255,255,255,0.05); margin-bottom: 15px; }
          .loading-bar-fill { width: 0%; height: 100%; background: #00C853; animation: progress-master 4s linear forwards; }
          .loading-text-elite { color: #00C853; font-size: 11px; letter-spacing: 4px; font-weight: 800; text-transform: uppercase; }
          @keyframes pulse-master { 0% { transform: scale(0.8); opacity: 1; } 100% { transform: scale(1.4); opacity: 0; } }
          @keyframes progress-master { 100% { width: 100%; } }
          @keyframes scan-master { 0%, 100% { top: 0%; } 50% { top: 100%; } }
          @media (max-width: 768px) { .loader-container { width: 140px; height: 140px; } }
        `}</style>
      </div>
    );
  }

  return (
    <div className="elite-landing-master">
      {modalAbierto && (
        <div className="info-overlay active">
          <div className="info-page-container glass-effect">
            <div className="info-header">
              <h3 className="info-title">{modalAbierto.titulo}</h3>
              <button className="info-close" onClick={() => setModalAbierto(null)}><X size={32} color="#00C853" /></button>
            </div>
            <div className="info-body">
              <div className="info-tag"><Zap size={16} color="#00C853" /> PROTECCIÓN ÉLITE</div>
              <p>{modalAbierto.contenido}</p>
            </div>
            <div className="info-footer-line"></div>
          </div>
        </div>
      )}

      <nav className="navbar-elite">
        <div className="nav-container-master">
          <div className="nav-brand"><span className="brand-text">GURÚ <span className="brand-neon">ÉLITE</span></span></div>
          <div className="nav-links-desktop">
            <span onClick={() => abrirInfoSeccion('quienes')} className="link-elite">Quiénes Somos</span>
            <span onClick={() => abrirInfoSeccion('proyecto')} className="link-elite">Proyecto</span>
            <span onClick={() => abrirInfoSeccion('inversionistas')} className="link-elite">Inversionistas</span>
          </div>
          <div className="nav-actions-master">
            {/* BOTÓN ÚNICO: ACCESO VIP */}
            <button onClick={(e) => ejecutarTransicion(e, '/login')} className="btn-nav-access desktop-only">ACCESO VIP</button>
            <button className="menu-toggle mobile-only" onClick={() => setMenuMovilAbierto(!menuMovilAbierto)}>
              {menuMovilAbierto ? <X size={28} color="#00C853" /> : <Menu size={28} color="#00C853" />}
            </button>
          </div>
        </div>
        <div className={`mobile-menu-overlay ${menuMovilAbierto ? 'active' : ''}`}>
           <span onClick={() => abrirInfoSeccion('quienes')} className="mobile-link">Quiénes Somos</span>
           <span onClick={() => abrirInfoSeccion('proyecto')} className="mobile-link">Proyecto Gurú</span>
           <span onClick={() => abrirInfoSeccion('inversionistas')} className="mobile-link">Inversionistas</span>
           {/* BOTÓN MÓVIL UNIFICADO */}
           <button onClick={(e) => ejecutarTransicion(e, '/login')} className="btn-mobile-login">ACCESO VIP</button>
        </div>
      </nav>

      <section className="hero-elite">
        <div className="hero-content">
          <div className="hero-status-tag"><Zap size={14} color="#00C853" /> FONDO DE CAPITAL PRIVADO</div>
          <h1 className="hero-main-title">
            <span className="text-glow-neon">CIENCIA FINANCIERA</span> <br/>SIN FRONTERAS
          </h1>
          <p className="hero-subtext">Algoritmos de alta frecuencia y redes neuronales dedicadas a la predicción de mercados. Gestión institucional para el inversor privado.</p>
          <div className="hero-cta-btn-group">
            <button onClick={(e) => ejecutarTransicion(e, '/unete')} className="btn-hero-primary">ABRIR CUENTA <ArrowUpRight size={18} /></button>
            {/* BOTÓN HERO MÓVIL UNIFICADO */}
            <button onClick={(e) => ejecutarTransicion(e, '/login')} className="btn-hero-secondary mobile-only">ACCESO VIP <Lock size={16} /></button>
          </div>
        </div>

        <div className="hero-visuals-horizontal">
          <div className="stat-card glass-effect">
            <Activity color="#00C853" size={24} />
            <div className="stat-info"><span className="stat-label">ROI OBJETIVO</span><span className="stat-value">+18.5% MES</span></div>
          </div>
          <div className="stat-card glass-effect">
            <ShieldCheck color="#00C853" size={24} />
            <div className="stat-info"><span className="stat-label">ESTATUS</span><span className="stat-value">Auditado</span></div>
          </div>
          <div className="stat-card glass-effect">
            <Lock color="#00C853" size={24} />
            <div className="stat-info"><span className="stat-label">ENCRIPTACIÓN</span><span className="stat-value">AES-256</span></div>
          </div>
        </div>
      </section>

      <section className="plans-section-luxe">
        <div className="plans-grid-luxe">
          {membresias.map((plan) => (
            <div key={plan.name} className="membership-card-luxe" style={{'--card-color': plan.color} as React.CSSProperties}>
              <div className="card-energy-bar"></div>
              <div className="m-card-inner">
                <div className="m-card-header"><span className="m-fondo-tag">PLAN DE GESTIÓN</span><h3 className="m-card-name">{plan.name}</h3></div>
                <div className="m-card-price"><span className="m-sign" style={{color: plan.color}}>$</span>{plan.price}<span className="m-usd">USD</span></div>
                <div className="m-card-profit"><span>RETORNO: <strong style={{color: plan.color}}>{plan.profit}</strong></span></div>
                <p className="m-card-perk">{plan.perk}</p>
                <button onClick={(e) => ejecutarTransicion(e, '/unete')} className="btn-m-acquire" style={{ '--btn-color': plan.color } as React.CSSProperties}>SELECCIONAR</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer-elite-master">
        <div className="footer-links-row">
          <span className="f-item-elite" onClick={() => abrirLegal('terminos')}><Scale size={14} /> Términos</span>
          <span className="f-item-elite" onClick={() => abrirLegal('privacidad')}><ShieldAlert size={14} /> Privacidad</span>
          <span className="f-item-elite" onClick={() => abrirLegal('confidencialidad')}><Lock size={14} /> Confidencialidad</span>
        </div>
        <p className="f-copyright-text">© 2026 GURÚ ÉLITE INSTITUTIONAL. PROTECCIÓN DE ACTIVOS GLOBAL.</p>
      </footer>

      <style jsx global>{`
        :root { --neon: #00C853; }
        .elite-landing-master { background-color: #000; color: white; min-height: 100vh; font-family: 'Inter', sans-serif; overflow-x: hidden; padding-top: 80px; }
        .navbar-elite { width: 100%; position: fixed; top: 0; z-index: 5000; background: rgba(0, 0, 0, 0.95); border-bottom: 1px solid rgba(255,255,255,0.05); backdrop-filter: blur(20px); }
        .nav-container-master { max-width: 1400px; margin: 0 auto; padding: 15px 25px; display: flex; justify-content: space-between; align-items: center; }
        .brand-text { font-weight: 900; font-size: 1.3rem; letter-spacing: -0.5px; }
        .brand-neon { color: var(--neon); text-shadow: 0 0 10px rgba(0,200,83,0.3); }
        .nav-links-desktop { display: none; gap: 25px; }
        .link-elite { color: #888; text-transform: uppercase; font-size: 10px; font-weight: 900; letter-spacing: 2px; transition: 0.3s; cursor: pointer; }
        .link-elite:hover { color: var(--neon); }
        .btn-nav-access { background: transparent; border: 1px solid var(--neon); color: var(--neon); padding: 8px 20px; border-radius: 4px; font-weight: 900; font-size: 10px; cursor: pointer; transition: 0.3s; }
        .menu-toggle { background: none; border: none; cursor: pointer; }
        
        .hero-elite { max-width: 1400px; margin: 0 auto; padding: 40px 25px; }
        .hero-status-tag { font-size: 10px; font-weight: 900; color: #444; letter-spacing: 2px; margin-bottom: 20px; display: flex; align-items: center; gap: 8px; }
        .hero-main-title { font-size: clamp(2rem, 10vw, 5rem); font-weight: 900; line-height: 1; margin-bottom: 25px; letter-spacing: -2px; }
        .text-glow-neon { background: linear-gradient(180deg, #fff 40%, var(--neon) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-subtext { color: #666; font-size: 1rem; line-height: 1.6; max-width: 550px; margin-bottom: 35px; }
        .hero-cta-btn-group { display: flex; gap: 10px; width: 100%; }
        .btn-hero-primary { background: var(--neon); color: black; border: none; padding: 18px; border-radius: 4px; font-weight: 900; flex: 1; font-size: 12px; display: flex; align-items: center; justify-content: center; gap: 8px; }
        .btn-hero-secondary { background: transparent; border: 1px solid var(--neon); color: var(--neon); padding: 18px; border-radius: 4px; font-weight: 900; flex: 0.5; font-size: 12px; display: flex; align-items: center; justify-content: center; gap: 8px; }
        
        .hero-visuals-horizontal { display: grid; gap: 15px; margin-top: 50px; }
        .stat-card { background: rgba(5,5,5,0.8); border: 1px solid #111; padding: 20px; border-radius: 12px; display: flex; align-items: center; gap: 15px; }
        .stat-label { font-size: 9px; color: #333; font-weight: 900; letter-spacing: 1px; display: block; }
        .stat-value { font-size: 1.1rem; font-weight: 900; }

        .plans-section-luxe { padding: 60px 25px; max-width: 1400px; margin: 0 auto; }
        .plans-grid-luxe { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; }
        .membership-card-luxe { background: #050505; border: 1px solid #111; border-radius: 12px; padding: 30px 20px; position: relative; overflow: hidden; }
        .card-energy-bar { position: absolute; top:0; left:0; width: 100%; height: 3px; background: var(--card-color); box-shadow: 0 0 10px var(--card-color); }
        .m-fondo-tag { font-size: 9px; font-weight: 900; color: #333; letter-spacing: 2px; }
        .m-card-name { font-size: 1.8rem; font-weight: 900; color: white; margin: 5px 0 20px; }
        .m-card-price { font-size: 3rem; font-weight: 900; line-height: 1; margin-bottom: 10px; }
        .m-sign { font-size: 1.2rem; vertical-align: top; margin-right: 5px; }
        .m-usd { font-size: 0.9rem; color: #444; margin-left: 5px; }
        .m-card-profit { font-size: 0.9rem; margin-bottom: 15px; }
        .m-card-perk { font-size: 0.8rem; color: #666; margin-bottom: 25px; line-height: 1.4; }
        .btn-m-acquire { width: 100%; padding: 14px; background: transparent; border: 1px solid var(--btn-color); color: var(--btn-color); font-weight: 900; border-radius: 4px; cursor: pointer; font-size: 11px; letter-spacing: 1px; }

        .footer-elite-master { padding: 40px 25px; text-align: center; border-top: 1px solid #111; }
        .footer-links-row { display: flex; justify-content: center; gap: 20px; margin-bottom: 20px; flex-wrap: wrap; }
        .f-item-elite { color: #444; font-size: 10px; font-weight: 900; text-transform: uppercase; cursor: pointer; display: flex; align-items: center; gap: 5px; }
        .f-copyright-text { color: #222; font-size: 9px; font-weight: 700; letter-spacing: 1px; }

        .mobile-menu-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 0; background: #000; z-index: 4000; overflow: hidden; transition: 0.5s ease-in-out; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 30px; }
        .mobile-menu-overlay.active { height: 100vh; }
        .mobile-link { color: white; font-size: 1.4rem; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; }
        .btn-mobile-login { border: 1px solid var(--neon); background: none; color: var(--neon); padding: 15px 40px; border-radius: 4px; font-weight: 900; }

        .info-overlay { position: fixed; inset: 0; background: #000; z-index: 6000; transform: translateY(100%); transition: 0.5s cubic-bezier(0.19, 1, 0.22, 1); }
        .info-overlay.active { transform: translateY(0); }
        .info-page-container { height: 100%; padding: 40px 25px; display: flex; flex-direction: column; }
        .info-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .info-title { font-size: 1.5rem; font-weight: 900; color: white; }
        .info-body p { font-size: 1rem; line-height: 1.8; color: #999; }
        .info-footer-line { width: 30px; height: 3px; background: var(--neon); margin-top: 30px; }

        @media (min-width: 1024px) {
          .nav-links-desktop { display: flex; }
          .desktop-only { display: block; }
          .mobile-only { display: none !important; }
          .hero-elite { padding: 100px 25px; display: grid; grid-template-columns: 1fr; align-items: center; min-height: 90vh; }
          .hero-main-title { font-size: 6rem; max-width: 900px; }
          .hero-cta-btn-group { width: auto; }
          .btn-hero-primary { width: 300px; padding: 22px; font-size: 14px; }
          .hero-visuals-horizontal { grid-template-columns: repeat(3, 1fr); margin-top: 80px; gap: 30px; }
          .plans-grid-luxe { grid-template-columns: repeat(5, 1fr); }
          .elite-landing-master { padding-top: 100px; }
        }
      `}</style>
    </div>
  );
}