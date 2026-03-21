"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, ArrowUpRight, Menu, X, Lock, FileText, Scale, Activity, Zap, ChevronDown, TrendingUp 
} from 'lucide-react';

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  // --- 1. SOLUCIÓN AL PARPADEO DE ENTRADA Y SALIDA ---
  useEffect(() => {
    router.prefetch('/panel');
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, [router]);

  const navegarPrivado = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsNavigating(true);
    router.push('/panel');
  };

  // RENDERIZADO DEL SPLASH SCREEN (DISEÑO ORIGINAL V1.0)
  if (loading || isNavigating) {
    return (
      <div className="splash-master">
        <div className="loader-container">
          <div className="pulse-ring"></div>
          <div className="image-wrapper">
            <img src="/images/guru.jpg" alt="El Guru Elite" fetchPriority="high" loading="eager" />
          </div>
          <div className="scan-line"></div>
        </div>
        <div className="loading-bar-master">
          <div className="loading-bar-fill"></div>
        </div>
        <h2 className="loading-text-elite">
          {isNavigating ? "ACCEDIENDO A TERMINAL SEGURA..." : "IDENTIFICANDO INVERSOR ÉLITE..."}
        </h2>
        <style jsx global>{`
          .splash-master {
            background: #000 !important;
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            display: flex; flex-direction: column; justify-content: center; align-items: center;
            z-index: 99999999; overflow: hidden;
          }
          .loader-container { position: relative; width: 220px; height: 220px; margin-bottom: 40px; }
          .image-wrapper {
            width: 100%; height: 100%; border-radius: 50%; overflow: hidden;
            border: 2px solid #00C853; box-shadow: 0 0 80px rgba(0, 200, 83, 0.4);
            position: relative; z-index: 2; background: #000;
          }
          .image-wrapper img { width: 100%; height: 100%; object-fit: cover; }
          .pulse-ring {
            position: absolute; top: -15%; left: -15%; width: 130%; height: 130%;
            border: 2px solid #00C853; border-radius: 50%; animation: pulse-master 2s infinite; opacity: 0.4;
          }
          .scan-line {
            position: absolute; top: 0; left: 0; width: 100%; height: 10px;
            background: linear-gradient(to right, transparent, #00C853, transparent);
            box-shadow: 0 0 25px #00C853; z-index: 3; animation: scan-master 3s ease-in-out infinite;
          }
          .loading-bar-master { width: 280px; height: 2px; background: rgba(255,255,255,0.03); border-radius: 10px; overflow: hidden; margin-top: 30px; }
          .loading-bar-fill { width: 0%; height: 100%; background: #00C853; animation: progress-master 5s linear forwards; }
          .loading-text-elite { color: #00C853; font-size: 11px; letter-spacing: 8px; margin-top: 25px; font-weight: 300; text-transform: uppercase; text-align: center; }
          @keyframes pulse-master { 0% { transform: scale(0.8); opacity: 1; } 100% { transform: scale(1.4); opacity: 0; } }
          @keyframes scan-master { 0%, 100% { top: 0%; } 50% { top: 100%; } }
          @keyframes progress-master { 100% { width: 100%; } }
        `}</style>
      </div>
    );
  }

  const membresias = [
    { name: 'Micro', price: '100', perk: 'Nivel 1: Acceso Base', delay: '0.1s' },
    { name: 'Inicial', price: '250', perk: 'Nivel 2: Gestión Activa', delay: '0.2s' },
    { name: 'Activo', price: '500', perk: 'Nivel 3: Capital Auditado', delay: '0.3s' },
    { name: 'Premium', price: '1000', perk: 'Nivel 4: Prioridad Institucional', delay: '0.4s' },
    { name: 'Élite', price: '1500', perk: 'Nivel 5: Fondo Global VIP', delay: '0.5s' }
  ];

  return (
    <div className="elite-landing-master">
      {/* NAVBAR: ALINEACIÓN MILIMÉTRICA Y MENÚ LIMPIO */}
      <nav className="navbar-elite">
        <div className="nav-container">
          <div className="nav-brand">
            <span className="brand-text">EL GURÚ <span className="brand-neon">ÉLITE</span></span>
          </div>
          <div className="nav-actions-master">
            <button onClick={navegarPrivado} className="btn-access-master">ACCESO PRIVADO</button>
            <button onClick={() => setMenuAbierto(!menuAbierto)} className="btn-menu-trigger">
              {menuAbierto ? <X size={26} color="#00C853" /> : <Menu size={26} color="white" />}
            </button>
          </div>
        </div>

        {menuAbierto && (
          <div className="mobile-menu-overlay fade-in-nav">
            <div className="mobile-menu-content">
              {['Quiénes Somos', 'Proyecto Gurú', 'Inversionistas'].map((item) => (
                <div key={item} className="mobile-link-item">
                  <span>{item}</span>
                  <ChevronDown size={18} color="#1a1a1a" />
                </div>
              ))}
              <div className="mobile-status-tag">NETWORK STATUS: SECURE</div>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION: TITULO LIMPIO Y ESTADÍSTICA REUBICADA */}
      <section className="hero-elite">
        <div className="hero-layout">
          <div className="hero-info-box">
            <div className="hero-tag-elite"><Zap size={14} color="#00C853" /> NETWORK DE INVERSIÓN INSTITUCIONAL</div>
            <h1 className="hero-title-main">
              <span className="text-glow-neon">LA CIENCIA DE</span> <br/>
              RENTABILIZAR
            </h1>
            <p className="hero-description">
              Optimización estratégica de activos mediante algoritmos de IA de alta frecuencia. 
              Seguridad blindada para inversores de alto perfil.
            </p>
            <div className="hero-cta-group">
              <button onClick={() => router.push('/unete')} className="btn-hero-primary">
                COMENZAR AHORA <ArrowUpRight size={22} />
              </button>
            </div>

            {/* ESTADÍSTICA FLOTANTE: INTEGRADA DEBAJO DEL BOTÓN PARA MÓVIL */}
            <div className="mobile-stat-card-wrapper">
              <div className="stat-card-luxe glass-effect shadow-glow">
                <div className="stat-card-header">
                  <Activity size={24} color="#00C853" />
                  <span className="stat-label">RENDIMIENTO AUDITADO</span>
                </div>
                <div className="stat-value-main">+18.5% <small>MES</small></div>
              </div>
            </div>
          </div>

          {/* DESKTOP VISUALS: GLOW Y ESTADÍSTICAS POSICIONADAS */}
          <div className="hero-visuals-right">
            <div className="master-glow-orb"></div>
            <div className="floating-stat glass-effect card-desktop-1">
              <div className="stat-icon-glow"><Activity color="#00C853" size={28} /></div>
              <div className="stat-text-desktop">
                <span className="label-desktop">RENDIMIENTO <br/>AUDITADO</span>
                <span className="value-desktop">+18.5% <small>MES</small></span>
              </div>
            </div>
            <div className="floating-stat glass-effect card-desktop-2">
              <ShieldCheck color="#00C853" size={20} />
              <span className="shield-label-desktop">CAPITAL 100% PROTEGIDO</span>
            </div>
          </div>
        </div>
      </section>

      {/* PORTAFOLIO DE 5 MEMBRESÍAS: RESTAURADO ÍNTEGRO */}
      <section id="proyecto-inversionistas" className="plans-area-master">
        <div className="plans-header">
          <h2 className="plans-tag">PORTAFOLIO DE ACTIVOS</h2>
          <p className="plans-subtitle">Membresías exclusivas para la gestión de utilidades institucionales.</p>
        </div>
        <div className="plans-grid-master">
          {membresias.map((plan) => (
            <div key={plan.name} className="membership-card-luxe fade-up-anim" style={{animationDelay: plan.delay}}>
              <div className="m-card-inner">
                <h3 className="m-card-name">{plan.name}</h3>
                <div className="m-card-price">
                  <span className="m-sign">$</span><span className="m-num">{plan.price}</span><span className="m-usd">USD</span>
                </div>
                <div className="m-divider-line"></div>
                <p className="m-perk-text">{plan.perk}</p>
                <button onClick={() => router.push('/unete')} className="btn-m-select">SELECCIONAR NIVEL</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer-elite-master">
        <div className="footer-container">
          <div className="footer-links-row">
            <span className="f-link-item"><Scale size={16}/> Términos</span>
            <span className="f-link-item"><FileText size={16}/> Privacidad</span>
            <span className="f-link-item"><Lock size={16}/> Confidencialidad</span>
          </div>
          <p className="f-copyright-text">&copy; 2026 EL GURÚ ÉLITE. TODOS LOS DERECHOS RESERVADOS.</p>
        </div>
      </footer>

      <style jsx global>{`
        /* --- ARQUITECTURA MAESTRA V8.0 --- */
        :root { --neon: #00C853; --glass: rgba(15, 15, 15, 0.75); }
        .elite-landing-master { background-color: #000; color: white; min-height: 100vh; font-family: 'Inter', sans-serif; overflow-x: hidden; padding-top: 100px; }
        
        /* NAVBAR ALINEACIÓN MILIMÉTRICA */
        .navbar-elite { position: fixed; top: 0; width: 100%; z-index: 1000; background: rgba(0,0,0,0.95); backdrop-filter: blur(30px); border-bottom: 1px solid rgba(255,255,255,0.05); }
        .nav-container { max-width: 1300px; margin: 0 auto; padding: 25px 30px; display: flex; justify-content: space-between; align-items: center; }
        .brand-text { font-weight: 900; font-size: 1.5rem; letter-spacing: -1px; }
        .brand-neon { color: var(--neon); text-shadow: 0 0 20px rgba(0, 200, 83, 0.5); }
        .nav-actions-master { display: flex; align-items: center; gap: 20px; }
        .btn-access-master { background: transparent; border: 1px solid var(--neon); color: var(--neon); padding: 10px 24px; border-radius: 4px; font-weight: 900; font-size: 11px; cursor: pointer; transition: 0.4s; }
        .btn-access-master:hover { background: var(--neon); color: black; box-shadow: 0 0 20px rgba(0,200,83,0.4); }
        .btn-menu-trigger { background: transparent; border: none; cursor: pointer; display: flex; align-items: center; padding: 0; }
        @media (max-width: 600px) { .nav-container { padding: 15px 20px; } .btn-access-master { padding: 8px 16px; font-size: 10px; } }

        /* MENÚ MÓVIL LUXE (SIN AZUL, SIN BOTONES BLANCOS) */
        .mobile-menu-overlay { position: absolute; top: 100%; left: 0; width: 100%; background: #000; border-bottom: 1px solid #111; padding: 30px 20px; }
        .mobile-link-item { display: flex; justify-content: space-between; align-items: center; padding: 20px 0; border-bottom: 1px solid #111; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 2px; }
        .mobile-status-tag { font-size: 9px; color: #222; margin-top: 30px; letter-spacing: 4px; font-weight: 900; text-align: center; }

        /* HERO Y TITULO PROFESIONAL */
        .hero-elite { max-width: 1300px; margin: 0 auto; padding: 120px 30px; }
        @media (max-width: 600px) { .hero-elite { padding: 60px 20px; } }
        .hero-tag-elite { color: var(--neon); font-size: 11px; font-weight: 900; letter-spacing: 4px; margin-bottom: 30px; display: flex; align-items: center; gap: 10px; }
        .hero-title-main { font-size: 3.5rem; font-weight: 900; line-height: 0.95; margin-bottom: 35px; letter-spacing: -3px; }
        @media (min-width: 768px) { .hero-title-main { font-size: 5.5rem; } }
        @media (max-width: 600px) { .hero-title-main { font-size: 2.8rem; letter-spacing: -1px; } }
        .text-glow-neon { background: linear-gradient(180deg, #fff 40%, var(--neon) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-description { color: #666; font-size: 1.25rem; line-height: 1.7; margin-bottom: 50px; max-width: 550px; }
        .btn-hero-primary { background: var(--neon); color: black; border: none; padding: 22px 50px; border-radius: 4px; font-weight: 900; font-size: 15px; display: flex; align-items: center; gap: 15px; cursor: pointer; transition: 0.4s; }
        @media (max-width: 600px) { .btn-hero-primary { width: 100%; justify-content: center; } }

        /* ESTADÍSTICA FLOTANTE REUBICADA */
        .mobile-stat-card-wrapper { margin-top: 60px; }
        @media (min-width: 1024px) { .mobile-stat-card-wrapper { display: none; } }
        .stat-card-luxe { padding: 35px; border-radius: 20px; background: var(--glass); border: 1px solid rgba(255,255,255,0.06); backdrop-filter: blur(40px); }
        .stat-card-header { display: flex; align-items: center; gap: 15px; font-size: 11px; font-weight: 900; color: #444; letter-spacing: 2px; }
        .stat-value-main { font-size: 36px; font-weight: 900; margin-top: 15px; color: #fff; }
        .stat-value-main small { font-size: 14px; color: var(--neon); }
        .shadow-glow { box-shadow: 0 30px 70px rgba(0, 200, 83, 0.15); }

        /* VISUALES DESKTOP */
        .hero-visuals-right { display: none; position: relative; height: 450px; }
        @media (min-width: 1024px) { 
          .hero-visuals-right { display: flex; justify-content: center; align-items: center; }
          .hero-layout { display: grid; grid-template-columns: 1.2fr 0.8fr; align-items: center; }
        }
        .master-glow-orb { position: absolute; width: 450px; height: 450px; background: var(--neon); filter: blur(160px); opacity: 0.15; z-index: 1; }
        .floating-stat { position: absolute; padding: 35px; border-radius: 20px; background: var(--glass); backdrop-filter: blur(40px); border: 1px solid rgba(255,255,255,0.06); transition: 0.5s; }
        .card-desktop-1 { width: 300px; top: 10%; right: 5%; animation: float-master 6s ease-in-out infinite; }
        .card-desktop-2 { bottom: 15%; left: 0; padding: 18px 28px; font-size: 12px; font-weight: 900; color: #888; display: flex; align-items: center; gap: 14px; animation: float-master 6s ease-in-out infinite reverse; }

        /* PORTAFOLIO DE ACTIVOS */
        .plans-area-master { padding: 160px 30px; max-width: 1550px; margin: 0 auto; }
        .plans-tag { font-size: 12px; letter-spacing: 9px; color: #333; margin-bottom: 20px; text-transform: uppercase; font-weight: 900; text-align: center; }
        .plans-subtitle { color: #888; font-size: 1.25rem; text-align: center; margin-bottom: 90px; }
        .plans-grid-master { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 30px; }
        .membership-card-luxe { background: #080808; border: 1px solid #111; border-radius: 12px; transition: 0.5s; text-align: center; overflow: hidden; }
        .membership-card-luxe:hover { border-color: var(--neon); transform: translateY(-15px); box-shadow: 0 35px 70px rgba(0, 200, 83, 0.15); }
        .m-card-inner { padding: 60px 35px; }
        .m-card-name { color: var(--neon); font-size: 1.9rem; font-weight: 900; margin-bottom: 35px; text-transform: uppercase; }
        .m-card-price { font-size: 4.5rem; font-weight: 900; color: #fff; line-height: 1; display: flex; align-items: baseline; justify-content: center; gap: 5px; }
        .m-sign { font-size: 24px; color: var(--neon); }
        .m-usd { font-size: 16px; color: #444; }
        .btn-m-select { background: transparent; border: 1px solid #1a1a1a; color: white; width: 100%; padding: 18px; border-radius: 4px; font-weight: 900; cursor: pointer; margin-top: 40px; transition: 0.3s; }
        .btn-m-select:hover { background: #fff; color: #000; }

        .footer-elite-master { padding: 100px 30px; background: #050505; text-align: center; border-top: 1px solid #111; }
        .footer-links-row { display: flex; justify-content: center; gap: 50px; margin-bottom: 40px; flex-wrap: wrap; }
        .f-link-item { color: #333; font-size: 13px; font-weight: 900; display: flex; align-items: center; gap: 10px; }
        .f-copyright-text { color: #111; font-size: 11px; font-weight: 900; letter-spacing: 3px; }

        @keyframes float-master { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        .fade-up-anim { opacity: 0; animation: fadeUpMaster 1.2s ease forwards; }
        @keyframes fadeUpMaster { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }