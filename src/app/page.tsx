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

  useEffect(() => {
    router.prefetch('/panel');
    router.prefetch('/unete');
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, [router]);

  const ejecutarTransicion = (e: React.MouseEvent, ruta: string) => {
    e.preventDefault(); 
    setIsNavigating(true); 
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
          .splash-master { background: radial-gradient(circle at center, #0a0c10 0%, #000 100%); height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; overflow: hidden; position: fixed; top: 0; left: 0; width: 100%; z-index: 999999; }
          .loader-container { position: relative; width: clamp(140px, 30vw, 200px); height: clamp(140px, 30vw, 200px); margin-bottom: 30px; }
          .image-wrapper { width: 100%; height: 100%; border-radius: 50%; overflow: hidden; border: 2px solid #00C853; box-shadow: 0 0 40px rgba(0, 200, 83, 0.4); position: relative; z-index: 2; }
          .image-wrapper img { width: 100%; height: 100%; object-fit: cover; }
          .pulse-ring { position: absolute; top: -10%; left: -10%; width: 120%; height: 120%; border: 1px solid #00C853; border-radius: 50%; animation: pulse-master 2s infinite; opacity: 0.3; }
          .loading-bar-master { width: 200px; height: 1px; background: rgba(255,255,255,0.05); margin-bottom: 15px; }
          .loading-bar-fill { width: 0%; height: 100%; background: #00C853; animation: progress-master 4s linear forwards; }
          .loading-text-elite { color: #00C853; font-size: 10px; letter-spacing: 4px; font-weight: 300; text-transform: uppercase; }
          @keyframes pulse-master { 0% { transform: scale(0.9); opacity: 1; } 100% { transform: scale(1.3); opacity: 0; } }
          @keyframes progress-master { 100% { width: 100%; } }
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
            <span className="brand-text">GURÚ <span className="brand-neon">ÉLITE</span></span>
          </div>
          <div className="nav-links-desktop">
            <span onClick={() => abrirInfoSeccion('quienes')} className="link-elite pointer">Quiénes</span>
            <span onClick={() => abrirInfoSeccion('proyecto')} className="link-elite pointer">Proyecto</span>
            <span onClick={() => abrirInfoSeccion('inversionistas')} className="link-elite pointer">Inversionistas</span>
          </div>
          <button onClick={(e) => ejecutarTransicion(e, '/panel')} className="btn-access-master">ACCESO</button>
        </div>
      </nav>

      <section className="hero-elite">
        <div className="hero-layout">
          <div className="hero-status-tag"><Zap size={12} color="#00C853" /> INVERSIÓN EXCLUSIVA</div>
          <h1 className="hero-main-title">
            <span className="text-glow-neon">LA CIENCIA DE</span> <br/>
            PREDECIR
          </h1>
          <p className="hero-subtext">
            Optimización de activos mediante algoritmos de IA. 
            Seguridad institucional para inversores de alto perfil.
          </p>
          <button onClick={(e) => ejecutarTransicion(e, '/unete')} className="btn-hero-primary">
            COMENZAR <ArrowUpRight size={18} />
          </button>
        </div>

        <div className="hero-visuals-horizontal">
          {[
            { icon: Activity, label: "PROMEDIO", val: "+18.5%" },
            { icon: ShieldCheck, label: "CAPITAL", val: "100% Auditado" },
            { icon: Lock, label: "SEGURIDAD", val: "Validación IA" }
          ].map((item, i) => (
            <div key={i} className="stat-card-horizontal glass-effect">
              <item.icon color="#00C853" size={20} />
              <div className="stat-info">
                <span className="stat-label">{item.label}</span>
                <span className="stat-value">{item.val}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="plans-section-luxe">
        <div className="section-header-luxe">
          <span className="header-tag-luxe">MERCADO PRIVADO</span>
          <h2 className="header-title-luxe">MEMBRESÍAS <span className="brand-neon">ÉLITE</span></h2>
        </div>
        <div className="plans-grid-luxe">
          {membresias.map((plan) => (
            <div key={plan.name} className="membership-card-luxe fade-up-card" style={{animationDelay: plan.delay, '--card-color': plan.color} as React.CSSProperties}>
              <div className="card-energy-bar"></div>
              <div className="m-card-inner">
                <h3 className="m-card-name">{plan.name}</h3>
                <div className="m-card-price"><span>$</span>{plan.price}</div>
                <p className="m-card-profit">Profit: {plan.profit}</p>
                <button onClick={(e) => ejecutarTransicion(e, '/unete')} className="btn-m-acquire">ADQUIRIR</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer-elite-master">
        <div className="footer-links-row">
          <span className="f-item-elite" onClick={() => abrirLegal('terminos')}>Términos</span>
          <span className="f-item-elite" onClick={() => abrirLegal('privacidad')}>Privacidad</span>
        </div>
        <p className="f-copyright-text">© 2026 EL GURÚ ÉLITE</p>
      </footer>

      <style jsx global>{`
        :root { --neon: #00C853; }
        .elite-landing-master { background-color: #000; color: white; min-height: 100vh; font-family: 'Inter', sans-serif; overflow-x: hidden; padding-top: 60px; }
        
        /* NAVBAR COMPACTA */
        .navbar-elite { width: 100%; position: fixed; top: 0; z-index: 1000; background: rgba(0, 0, 0, 0.9); border-bottom: 1px solid rgba(255,255,255,0.05); backdrop-filter: blur(10px); }
        .nav-container-master { max-width: 1200px; margin: 0 auto; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; }
        .brand-text { font-weight: 900; font-size: clamp(1rem, 4vw, 1.3rem); }
        .btn-access-master { border: 1px solid var(--neon); color: var(--neon); padding: 8px 16px; border-radius: 4px; font-weight: 900; font-size: 10px; background: transparent; cursor: pointer; }

        /* HERO AJUSTADO */
        .hero-elite { max-width: 1200px; margin: 0 auto; padding: 60px 20px; text-align: center; }
        .hero-layout { display: flex; flex-direction: column; align-items: center; }
        .hero-status-tag { background: rgba(0,200,83,0.1); padding: 6px 12px; border-radius: 20px; color: var(--neon); font-size: 10px; font-weight: 900; margin-bottom: 20px; display: flex; gap: 8px; align-items: center; }
        .hero-main-title { font-size: clamp(2.2rem, 10vw, 4.5rem); font-weight: 900; line-height: 1; margin-bottom: 20px; letter-spacing: -2px; }
        .hero-subtext { color: #666; font-size: clamp(0.9rem, 3vw, 1.1rem); line-height: 1.5; margin-bottom: 30px; max-width: 500px; }
        .btn-hero-primary { background: var(--neon); color: black; border: none; padding: 16px 32px; border-radius: 4px; font-weight: 900; display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 0.9rem; }

        /* STATS COMPACTOS */
        .hero-visuals-horizontal { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px; margin-top: 50px; width: 100%; }
        .stat-card-horizontal { background: #080808; border: 1px solid #111; border-radius: 12px; padding: 15px; display: flex; align-items: center; gap: 12px; text-align: left; }
        .stat-label { font-size: 9px; color: #444; font-weight: 900; display: block; }
        .stat-value { font-size: 14px; font-weight: 900; color: white; }

        /* MEMBRESÍAS RESPONSIVAS */
        .plans-section-luxe { padding: 80px 20px; max-width: 1200px; margin: 0 auto; }
        .section-header-luxe { text-align: center; margin-bottom: 40px; }
        .header-title-luxe { font-size: clamp(1.8rem, 5vw, 2.5rem); font-weight: 900; }
        .plans-grid-luxe { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px; }
        .membership-card-luxe { background: #080808; border: 1px solid #111; border-radius: 12px; padding: 30px 15px; text-align: center; position: relative; transition: 0.3s; }
        .m-card-name { font-size: 1rem; font-weight: 900; margin-bottom: 10px; text-transform: uppercase; color: #555; }
        .m-card-price { font-size: 2rem; font-weight: 900; color: white; margin-bottom: 10px; }
        .m-card-price span { font-size: 1rem; color: var(--neon); vertical-align: top; }
        .m-card-profit { font-size: 0.8rem; color: #00C853; font-weight: bold; margin-bottom: 20px; }
        .btn-m-acquire { width: 100%; padding: 12px; background: transparent; border: 1px solid var(--card-color); color: var(--card-color); font-weight: 900; border-radius: 4px; cursor: pointer; font-size: 10px; }

        .footer-elite-master { padding: 40px 20px; text-align: center; border-top: 1px solid #111; color: #333; }
        .footer-links-row { display: flex; justify-content: center; gap: 20px; margin-bottom: 20px; }
        .f-item-elite { font-size: 11px; font-weight: 900; cursor: pointer; }
        .f-copyright-text { font-size: 9px; letter-spacing: 2px; }

        @keyframes progress-master { 100% { width: 100%; } }
        .fade-up-card { opacity: 0; animation: fadeUp 0.8s ease forwards; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}