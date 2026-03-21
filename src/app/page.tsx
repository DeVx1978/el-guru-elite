"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, ArrowUpRight, Menu, X, Lock, FileText, Scale, Activity, Zap, TrendingUp, Globe, ChevronDown 
} from 'lucide-react';

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [seccionExpandida, setSeccionExpandida] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  // --- 1. BLINDAJE DE ENTRADA (CERO PARPADEO) ---
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

  const toggleSeccion = (id: string) => {
    setSeccionExpandida(seccionExpandida === id ? null : id);
  };

  // --- SPLASH SCREEN BLINDADO (DISEÑO ORIGINAL V1.0) ---
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
            background: radial-gradient(circle at center, #0a0c10 0%, #000 100%);
            height: 100vh; display: flex; flex-direction: column;
            justify-content: center; align-items: center;
            overflow: hidden; position: fixed; top: 0; left: 0; width: 100%; z-index: 99999;
          }
          .loader-container { position: relative; width: 220px; height: 220px; margin-bottom: 40px; }
          .image-wrapper {
            width: 100%; height: 100%; border-radius: 50%; overflow: hidden;
            border: 2px solid #00C853; box-shadow: 0 0 60px rgba(0, 200, 83, 0.4);
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
          .loading-text-elite { color: #00C853; font-size: 11px; letter-spacing: 8px; font-weight: 300; text-transform: uppercase; margin-top: 25px; }
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
      {/* NAVBAR: ALINEACIÓN MILIMÉTRICA Y MENÚ LIMPIO EN MÓVIL */}
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
            <button onClick={navegarPrivado} className="btn-access-master">ACCESO PRIVADO</button>
            <button onClick={() => setMenuAbierto(!menuAbierto)} className="btn-menu-master">
              {menuAbierto ? <X size={26} color="#00C853" /> : <Menu size={26} color="white" />}
            </button>
          </div>
        </div>
        {menuAbierto && (
          <div className="mobile-dropdown-master fade-in-nav">
            <div className="accordion-item">
              <button onClick={() => toggleSeccion('quienes')} className="accordion-trigger link-elite">
                Quiénes Somos <ChevronDown size={18} className={seccionExpandida === 'quienes' ? 'rotate' : ''} />
              </button>
              {seccionExpandida === 'quienes' && <p className="accordion-content">Ecosistema de analistas cuantitativos optimizando capital mediante modelos predictivos avanzados.</p>}
            </div>
            <div className="accordion-item">
              <button onClick={() => toggleSeccion('proyecto')} className="accordion-trigger link-elite">
                Proyecto Gurú <ChevronDown size={18} className={seccionExpandida === 'proyecto' ? 'rotate' : ''} />
              </button>
              {seccionExpandida === 'proyecto' && <p className="accordion-content">IA de alta frecuencia procesando ineficiencias de mercado en tiempo real donde la probabilidad matemática está a nuestro favor.</p>}
            </div>
            <div className="menu-divider"></div>
            <p className="terminal-status">SISTEMA SEGURO ACTIVO // VERSIÓN FINAL</p>
          </div>
        )}
      </nav>

      {/* HERO SECTION: DISEÑO PC RESTAURADO CON TARJETAS FLOTANTES */}
      <section className="hero-elite">
        <div className="hero-layout">
          <div className="hero-info-text">
            <div className="hero-status-tag"><Zap size={14} color="#00C853" /> NETWORK DE INVERSIÓN INSTITUCIONAL</div>
            <h1 className="hero-main-title">
              <span className="text-glow-neon">ARQUITECTURA</span> <br/>
              DE <br/>
              <span className="text-glow-neon">RENTABILIDAD</span>
            </h1>
            <p className="hero-subtext">
              Optimización estratégica de activos mediante algoritmos de IA de alta frecuencia. 
              Seguridad blindada para inversores de alto perfil.
            </p>
            <div className="hero-cta-btn-group">
              <button onClick={() => router.push('/unete')} className="btn-hero-primary">
                COMENZAR AHORA <ArrowUpRight size={20} />
              </button>
            </div>
          </div>

          <div className="hero-visuals-right">
            <div className="master-glow-orb"></div>
            <div className="stat-card-master glass-depth-1 float-anim">
              <div className="stat-icon-glow">
                <Activity color="#00C853" size={28} />
              </div>
              <div className="stat-info-text-box">
                <span className="stat-label-master">RENDIMIENTO <br/>AUDITADO</span>
                <span className="stat-value-master">+18.5% <small>MES</small></span>
              </div>
            </div>
            <div className="stat-card-master glass-depth-2 float-anim-reverse">
              <ShieldCheck color="#00C853" size={20} />
              <span className="shield-text-master">CAPITAL 100% PROTEGIDO</span>
            </div>
          </div>
        </div>
      </section>

      {/* PORTAFOLIO DE 5 MEMBRESÍAS RESTAURADO HORIZONTALMENTE EN PC */}
      <section id="proyecto-inversionistas" className="plans-area-master">
        <div className="plans-header-master">
          <h2 className="plans-title-tag">PORTAFOLIO DE ACTIVOS</h2>
          <p className="plans-subtitle-master">Membresías exclusivas para la gestión de utilidades institucionales.</p>
        </div>
        
        <div className="plans-grid-master">
          {membresias.map((plan) => (
            <div key={plan.name} className="membership-card-master fade-up-card shadow-hover" style={{animationDelay: plan.delay}}>
              <div className="membership-inner">
                <h3 className="m-name">{plan.name}</h3>
                <div className="m-price-box">
                  <span className="m-curr">$</span>
                  <span className="m-amount">{plan.price}</span>
                  <span className="m-usd">USD</span>
                </div>
                <div className="m-divider"></div>
                <p className="m-perk-text">{plan.perk}</p>
                <button onClick={() => router.push('/unete')} className="btn-m-select">SELECCIONAR NIVEL</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER RESTAURADO CON ICONOS NEÓN */}
      <footer className="footer-elite-master">
        <div className="footer-wrap">
          <div className="footer-links-row">
            <a href="/terminos" className="f-item-elite"><Scale size={16} color="#00C853" /> Términos Legales</a>
            <a href="/privacidad" className="f-item-elite"><FileText size={16} color="#00C853" /> Privacidad</a>
            <a href="/confidencialidad" className="f-item-elite"><Lock size={16} color="#00C853" /> Confidencialidad</a>
          </div>
          <p className="f-copyright-text">&copy; 2026 EL GURÚ ÉLITE. TODOS LOS DERECHOS RESERVADOS.</p>
        </div>
      </footer>

      <style jsx global>{`
        /* --- ARQUITECTURA MAESTRA DE ESTILOS (600+ LÍNEAS) --- */
        :root { --neon: #00C853; --glass: rgba(15, 15, 15, 0.75); }
        .elite-landing-master { background-color: #000; color: white; min-height: 100vh; font-family: 'Inter', sans-serif; overflow-x: hidden; padding-top: 80px; scroll-behavior: smooth; }
        
        /* NAVBAR ALINEACIÓN MILIMÉTRICA */
        .navbar-elite { width: 100%; position: fixed; top: 0; z-index: 1000; backdrop-filter: blur(30px); background: rgba(0, 0, 0, 0.95); border-bottom: 1px solid rgba(255,255,255,0.05); }
        .nav-container-master { max-width: 1400px; margin: 0 auto; padding: 25px 30px; display: flex; justify-content: space-between; align-items: center; }
        .brand-text { font-weight: 900; font-size: 1.5rem; letter-spacing: -1px; }
        .brand-neon { color: var(--neon); text-shadow: 0 0 20px rgba(0, 200, 83, 0.5); }
        .nav-links-desktop { display: none; gap: 40px; }
        @media (min-width: 1024px) { .nav-links-desktop { display: flex; } }
        .link-elite { color: #444; text-decoration: none; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; transition: 0.3s; }
        .link-elite:hover { color: var(--neon); }
        .nav-actions-master { display: flex; align-items: center; gap: 20px; }
        .btn-access-master { background: transparent; border: 1px solid var(--neon); color: var(--neon); padding: 12px 28px; border-radius: 4px; font-weight: 900; font-size: 11px; cursor: pointer; transition: 0.4s; }
        .btn-access-master:hover { background: var(--neon); color: black; box-shadow: 0 0 20px rgba(0,200,83,0.4); }
        .btn-menu-master { background: transparent; border: none; cursor: pointer; display: flex; align-items: center; }
        @media (min-width: 1024px) { .btn-menu-master { display: none; } }
        @media (max-width: 600px) { .brand-text { font-size: 1.2rem; } .nav-container-master { padding: 15px 20px; } .btn-access-master { padding: 8px 16px; font-size: 10px; } }

        /* MENÚ MÓVIL ESTILO ACORDEÓN CUIDANDO EL DETALLE */
        .mobile-dropdown-master { position: absolute; top: 100%; left: 0; width: 100%; background: #000; border-bottom: 1px solid #111; padding: 30px 20px; }
        .accordion-item { border-bottom: 1px solid #111; }
        .accordion-trigger { width: 100%; background: transparent; border: none; display: flex; justify-content: space-between; align-items: center; padding: 18px 0; cursor: pointer; }
        .accordion-content { padding: 15px 0; color: #666; font-size: 12px; line-height: 1.6; }
        .rotate { transform: rotate(180deg); color: var(--neon); transition: 0.3s; }
        .menu-divider { width: 40px; height: 1px; background: #1a1a1a; margin: 30px 0 20px; }
        .terminal-status { font-size: 9px; color: #222; letter-spacing: 4px; font-weight: 900; text-align: center; }

        /* HERO Y TITULO PROFESIONAL (ARQUITECTURA V1.0 RESTAURADA) */
        .hero-elite { max-width: 1400px; margin: 0 auto; padding: 120px 30px; }
        .hero-layout { display: grid; grid-template-columns: 1fr; gap: 80px; }
        @media (min-width: 1024px) { .hero-layout { grid-template-columns: 1.2fr 0.8fr; align-items: center; } }
        .hero-tag-elite { color: var(--neon); font-size: 11px; font-weight: 900; letter-spacing: 4px; margin-bottom: 30px; display: flex; align-items: center; gap: 10px; }
        .hero-main-title { font-size: 3.5rem; font-weight: 900; line-height: 0.95; margin-bottom: 35px; letter-spacing: -3px; }
        @media (min-width: 768px) { .hero-main-title { font-size: 5.5rem; } }
        @media (max-width: 600px) { .hero-main-title { font-size: 2.8rem; letter-spacing: -1px; } .hero-elite { padding: 60px 20px; } }
        .text-glow-neon { background: linear-gradient(180deg, #fff 40%, var(--neon) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-subtext { color: #666; font-size: 1.25rem; line-height: 1.7; margin-bottom: 50px; max-width: 550px; }
        .btn-hero-primary { background: var(--neon); color: black; border: none; padding: 22px 50px; border-radius: 4px; font-weight: 900; font-size: 15px; display: flex; align-items: center; gap: 15px; cursor: pointer; transition: 0.4s; }
        .btn-hero-primary:hover { transform: translateY(-4px); box-shadow: 0 15px 40px rgba(0, 200, 83, 0.4); }
        @media (max-width: 600px) { .btn-hero-primary { width: 100%; justify-content: center; } }

        /* VISUALES DESKTOP (TARJETAS FLOTANTES RESTAURADAS) */
        .hero-visuals-right { display: none; position: relative; height: 500px; }
        @media (min-width: 1024px) { 
          .hero-visuals-right { display: flex; justify-content: center; align-items: center; } 
          .hero-layout { display: grid; grid-template-columns: 1.2fr 0.8fr; align-items: center; }
        }
        .master-glow-orb { position: absolute; width: 500px; height: 500px; background: var(--neon); filter: blur(180px); opacity: 0.15; z-index: 1; }
        .stat-card-master { background: var(--glass); backdrop-filter: blur(35px); border: 1px solid rgba(255,255,255,0.06); border-radius: 20px; padding: 35px; position: absolute; }
        .glass-depth-1 { width: 320px; top: 10%; right: 0; box-shadow: 0 25px 60px rgba(0,0,0,0.6); }
        .stat-icon-glow { background: rgba(0, 200, 83, 0.1); padding: 18px; border-radius: 15px; box-shadow: 0 0 25px rgba(0,200,83,0.15); }
        .stat-label-master { font-size: 11px; color: #444; font-weight: 900; line-height: 1.4; }
        .stat-value-master { font-size: 30px; font-weight: 900; color: white; display: block; margin-top: 6px; }
        .stat-value-master small { font-size: 12px; color: var(--neon); }
        .glass-depth-2 { bottom: 15%; left: -20%; padding: 18px 28px; font-size: 12px; font-weight: 900; color: #888; display: flex; align-items: center; gap: 14px; }

        /* PLANES (ALINEACIÓN HORIZONTAL EN PC RESTAURADA) */
        .plans-area-master { padding: 160px 30px; max-width: 1550px; margin: 0 auto; }
        @media (max-width: 768px) { .plans-area-master { padding: 80px 20px; } }
        .plans-title-tag { font-size: 12px; letter-spacing: 9px; color: #333; margin-bottom: 20px; text-transform: uppercase; font-weight: 900; text-align: center; }
        .plans-subtitle-master { color: #888; font-size: 1.25rem; text-align: center; margin-bottom: 90px; }
        .plans-grid-master { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 30px; }
        .membership-card-master { background: #080808; border: 1px solid #111; border-radius: 12px; transition: 0.5s cubic-bezier(0.19, 1, 0.22, 1); text-align: center; }
        .membership-card-master:hover { border-color: var(--neon); transform: translateY(-15px); box-shadow: 0 35px 70px rgba(0, 200, 83, 0.15); }
        .membership-inner { padding: 60px 35px; height: 100%; display: flex; flex-direction: column; }
        .m-name { color: var(--neon); font-size: 1.9rem; font-weight: 900; text-transform: uppercase; margin-bottom: 35px; }
        .m-price-box { margin-bottom: 30px; display: flex; align-items: baseline; justify-content: center; gap: 5px; }
        .m-curr { color: var(--neon); font-size: 24px; font-weight: 900; }
        .m-amount { font-size: 4.5rem; font-weight: 900; color: white; line-height: 1; }
        .m-usd { font-size: 16px; color: #444; }
        .m-divider { width: 50px; height: 1px; background: #1a1a1a; margin: 0 auto 30px; }
        .m-perk-text { color: #fff; font-size: 15px; font-weight: 900; margin-bottom: 12px; margin-top: auto; }
        .btn-m-select { background: transparent; border: 1px solid #1a1a1a; color: white; width: 100%; padding: 18px; border-radius: 4px; font-weight: 900; cursor: pointer; margin-top: 40px; transition: 0.3s; }
        .btn-m-select:hover { background: white; color: black; }

        /* FOOTER RESTAURADO CON COLORES NEÓN */
        .footer-elite-master { padding: 120px 30px 80px; background: #050505; text-align: center; border-top: 1px solid #111; }
        .footer-links-row { display: flex; justify(center); gap: 60px; margin-bottom: 50px; flex-wrap: wrap; }
        .f-item-elite { color: #444; text-decoration: none; font-size: 13px; display: flex; align-items: center; gap: 12px; font-weight: 900; }
        .f-item-elite:hover { color: var(--neon); }
        .f-copyright-text { color: #111; font-size: 11px; font-weight: 900; letter-spacing: 3px; }

        .float-anim { animation: float-master 6s ease-in-out infinite; }
        .float-anim-reverse { animation: float-master 6s ease-in-out infinite reverse; }
        @keyframes float-master { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        .fade-up-card { opacity: 0; animation: fadeUpMaster 1.2s ease forwards; }
        @keyframes fadeUpMaster { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}