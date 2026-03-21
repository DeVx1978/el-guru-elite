"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, ArrowUpRight, Lock, FileText, Scale, Activity, Zap, TrendingUp, Globe
} from 'lucide-react';

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  // Mantenemos el estado para no dañar la lógica, aunque la hamburguesa no sea visible
  const [menuAbierto, setMenuAbierto] = useState(false);
  const router = useRouter();

  // --- BLINDAJE DE CARGA (5 SEGUNDOS CRUCIALES - CORREGIDO PARA CERO PARPADEO DE ENTRADA) ---
  useEffect(() => {
    // Forzamos el estado de carga antes de montar
    setLoading(true); 
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Función de navegación directa para evitar parpadeos visuales
  const navegarPrivado = () => {
    // Usamos el router de Next.js directamente para una transición limpia
    router.push('/panel');
  };

  if (loading) {
    return (
      <div className="splash-master">
        <div className="loader-container">
          <div className="pulse-ring"></div>
          <div className="image-wrapper">
            {/* CORRECCIÓN DE PARPADEO: Imagen precargada con fetchPriority */}
            <img src="/images/guru.jpg" alt="El Guru Elite" fetchPriority="high" />
          </div>
          <div className="scan-line"></div>
        </div>
        <div className="loading-bar-master">
          <div className="loading-bar-fill"></div>
        </div>
        <h2 className="loading-text-elite">AUTENTICANDO TERMINAL DE INVERSIÓN...</h2>

        <style jsx global>{`
          /* Estilos del Splash resguardados al 100% */
          .splash-master {
            background: radial-gradient(circle at center, #0a0c10 0%, #000 100%);
            height: 100vh; display: flex; flex-direction: column;
            justify-content: center; align-items: center;
            overflow: hidden; position: fixed; top: 0; left: 0; width: 100%; z-index: 99999;
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
            border: 2px solid #00C853; border-radius: 50%; animation: pulse-master 2s infinite; opacity: 0.4;
          }
          .scan-line {
            position: absolute; top: 0; left: 0; width: 100%; height: 8px;
            background: linear-gradient(to right, transparent, #00C853, transparent);
            box-shadow: 0 0 20px #00C853; z-index: 3; animation: scan-master 3s ease-in-out infinite;
          }
          .loading-bar-master { width: 250px; height: 2px; background: rgba(255,255,255,0.03); border-radius: 10px; overflow: hidden; margin-top: 20px; }
          .loading-bar-fill { width: 0%; height: 100%; background: #00C853; animation: progress-master 5s linear forwards; }
          .loading-text-elite { color: #00C853; font-size: 10px; letter-spacing: 7px; margin-top: 25px; font-weight: 300; text-transform: uppercase; }
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
      {/* 2. NAVBAR REFORZADO - CON CORRECCIONES QUIRÚRGICAS */}
      <nav className="navbar-elite">
        <div className="nav-container-master">
          <div className="nav-brand">
            <span className="brand-text">EL GURÚ <span className="brand-neon">ÉLITE</span></span>
          </div>
          
          <div className="nav-links-master">
            <a href="#quienes-somos" className="link-elite">Quiénes Somos</a>
            <a href="#proyecto-guru" className="link-elite">Proyecto Gurú</a>
            <a href="#proyecto-inversionistas" className="link-elite">Inversionistas</a>
          </div>

          <div className="nav-actions-master">
            {/* CORRECCIÓN DE PARPADEO: Navegación directa */}
            <button onClick={navegarPrivado} className="btn-access-master">ACCESO PRIVADO</button>
            {/* AJUSTE QUIRÚRGICO: Hamburguesa invisible pero mantenida en el DOM */}
            <div className="hamburger-container" style={{display: 'none'}}>
              <button onClick={() => setMenuAbierto(!menuAbierto)} className="btn-menu-master">
                <Lock size={20} color="white" />
              </button>
            </div>
          </div>
        </div>

        {/* MENÚ MÓVIL (Mantenemos la lógica por seguridad, aunque no sea visible) */}
        {menuAbierto && (
          <div className="mobile-dropdown fade-in-nav" style={{display: 'none'}}>
            <a href="#quienes-somos" onClick={() => setMenuAbierto(false)} className="mob-link">Quiénes Somos</a>
          </div>
        )}
      </nav>

      {/* 3. HERO SECTION - RESGUARDADA AL 100% */}
      <section className="hero-elite">
        <div className="hero-grid-layout">
          <div className="hero-info-text">
            <div className="hero-status-tag"><Zap size={14} color="#00C853" /> NETWORK DE INVERSIÓN INSTITUCIONAL</div>
            <h1 className="hero-main-title">
              ARQUITECTURA DE <br/>
              <span className="text-glow-neon">CAPITAL GLOBAL</span>
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

          {/* VISUALES CON GLASSMORPHISM REAL (Sombreado y Blur resguardado) */}
          <div className="hero-visuals-right">
            <div className="master-glow-orb"></div>
            <div className="stat-card-master glass-depth-1">
              <div className="stat-icon-glow">
                <Activity color="#00C853" size={28} />
              </div>
              <div className="stat-info-text-box">
                <span className="stat-label-master">RENDIMIENTO <br/>AUDITADO</span>
                <span className="stat-value-master">+18.5% <small>MES</small></span>
              </div>
            </div>
            <div className="stat-card-master glass-depth-2">
              <ShieldCheck color="#00C853" size={20} />
              <span className="shield-text-master">CAPITAL 100% PROTEGIDO // SSL 256</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECCIÓN DE PLANES - RESGUARDADA CON 5 NIVELES */}
      <section id="proyecto-inversionistas" className="plans-area-master">
        <div className="plans-header-master">
          <h2 className="plans-title-tag">PORTAFOLIO DE ACTIVOS</h2>
          <p className="plans-subtitle-master">Membresías exclusivas para la gestión de utilidades institucionales.</p>
        </div>
        
        <div className="plans-grid-master">
          {membresias.map((plan) => (
            <div key={plan.name} className="membership-card-master fade-up-card" style={{animationDelay: plan.delay}}>
              <div className="membership-inner">
                <div className="membership-top-info">
                  <span className="m-cat-tag">FONDO</span>
                  <h3 className="m-name-title">{plan.name}</h3>
                </div>
                <div className="membership-body-info">
                  <div className="m-price-box-master">
                    <span className="m-curr-sign">$</span>
                    <span className="m-amount-num">{plan.price}</span>
                    <span className="m-usd-tag">USD</span>
                  </div>
                  <div className="m-divider-master"></div>
                  <p className="m-perk-text-elite">{plan.perk}</p>
                  <p className="m-desc-text-elite">Acceso a terminal de señales y reportes en tiempo real.</p>
                </div>
                <button onClick={() => router.push('/unete')} className="btn-m-select-master">SELECCIONAR NIVEL</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FOOTER MAESTRO RESGUARDADO */}
      <footer className="footer-elite-master">
        <div className="footer-wrap">
          <div className="footer-links-row-elite">
            <a href="/terminos" className="f-item-elite"><Scale size={16}/> Términos Legales</a>
            <a href="/privacidad" className="f-item-elite"><FileText size={16}/> Privacidad</a>
            <a href="/confidencialidad" className="f-item-elite"><Lock size={16}/> Confidencialidad</a>
          </div>
          <div className="f-divider-master-elite"></div>
          <p className="f-copyright-elite">&copy; 2026 EL GURÚ ÉLITE. TODOS LOS DERECHOS RESERVADOS.</p>
        </div>
      </footer>

      <style jsx global>{`
        /* --- ARQUITECTURA MAESTRA DE ESTILOS (PROPIEDADES RESGUARDADAS AL 100%) --- */
        .elite-landing-master {
          background-color: #000; color: white; min-height: 100vh;
          font-family: 'Inter', -apple-system, sans-serif; overflow-x: hidden;
          padding-top: 80px;
        }
        
        .navbar-elite {
          width: 100%; position: fixed; top: 0; z-index: 1000;
          backdrop-filter: blur(30px); background: rgba(0, 0, 0, 0.9);
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .nav-container-master {
          max-width: 1300px; margin: 0 auto; padding: 20px 30px;
          display: flex; justify-content: space-between; align-items: center;
        }
        .brand-text { font-weight: 900; font-size: 1.2rem; letter-spacing: -1px; }
        .brand-neon { color: #00C853; text-shadow: 0 0 15px rgba(0,200,83,0.3); }
        .nav-links-master { display: none; gap: 40px; }
        @media (min-width: 1024px) { .nav-links-master { display: flex; } }
        .link-elite { color: #444; text-decoration: none; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; transition: 0.3s; }
        .link-elite:hover { color: #00C853; }
        .btn-access-master { background: transparent; border: 1px solid #00C853; color: #00C853; padding: 10px 22px; border-radius: 4px; font-size: 10px; font-weight: 900; cursor: pointer; transition: 0.3s; }
        .btn-access-master:hover { background: #00C853; color: black; box-shadow: 0 0 20px rgba(0,200,83,0.3); }
        
        /* AJUSTE DE HAMBURGUESA: Oculta visualmente */
        .btn-menu-master { display: none; background: transparent; border: none; cursor: pointer; }
        @media (min-width: 1024px) { .btn-menu-master { display: none; } }

        .mobile-dropdown { display: none !important; }

        .hero-elite { max-width: 1300px; margin: 0 auto; padding: 100px 30px; }
        .hero-grid-layout { display: grid; grid-template-columns: 1fr; gap: 80px; }
        @media (min-width: 1024px) { .hero-grid-layout { grid-template-columns: 1.2fr 0.8fr; align-items: center; } }
        .hero-status-tag { color: #00C853; font-size: 11px; font-weight: 900; letter-spacing: 4px; margin-bottom: 25px; display: flex; align-items: center; gap: 10px; }
        .hero-main-title { font-size: 3.2rem; font-weight: 900; line-height: 0.95; margin-bottom: 35px; letter-spacing: -3px; }
        @media (min-width: 768px) { .hero-main-title { font-size: 5rem; } }
        .text-glow-neon { background: linear-gradient(180deg, #fff 40%, #00C853 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-subtext { color: #666; font-size: 1.2rem; line-height: 1.7; margin-bottom: 50px; max-width: 520px; }
        .btn-hero-primary { background: #00C853; color: black; border: none; padding: 20px 45px; border-radius: 4px; font-weight: 900; font-size: 14px; display: flex; align-items: center; gap: 15px; cursor: pointer; transition: 0.4s; }
        .btn-hero-primary:hover { transform: translateY(-4px); box-shadow: 0 15px 40px rgba(0, 200, 83, 0.4); }

        .hero-visuals-right { position: relative; display: flex; justify-content: center; align-items: center; height: 400px; }
        .glass-depth-1 { background: rgba(15, 15, 15, 0.6); backdrop-filter: blur(30px); border: 1px solid rgba(255,255,255,0.05); border-radius: 20px; padding: 30px; width: 280px; position: absolute; top: 10%; right: 5%; animation: float-master 6s ease-in-out infinite; box-shadow: 0 20px 50px rgba(0,0,0,0.5); z-index: 10; }
        .glass-depth-2 { background: rgba(15, 15, 15, 0.6); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 15px 25px; font-size: 11px; font-weight: 900; color: #888; position: absolute; bottom: 15%; left: 0; display: flex; align-items: center; gap: 12px; animation: float-master 6s ease-in-out infinite reverse; z-index: 10; }
        .stat-icon-glow { background: rgba(0, 200, 83, 0.1); padding: 15px; border-radius: 15px; box-shadow: 0 0 20px rgba(0,200,83,0.1); }
        .stat-label-master { font-size: 10px; color: #444; font-weight: 900; line-height: 1.3; }
        .stat-value-master { font-size: 28px; font-weight: 900; color: white; display: block; margin-top: 5px; }
        .master-glow-orb { position: absolute; width: 350px; height: 350px; background: #00C853; filter: blur(140px); opacity: 0.12; z-index: 1; }

        .plans-area-master { padding: 140px 30px; max-width: 1500px; margin: 0 auto; }
        .plans-title-tag { font-size: 11px; letter-spacing: 8px; color: #333; margin-bottom: 15px; text-transform: uppercase; font-weight: 900; text-align: center; }
        .plans-subtitle-master { color: #888; font-size: 1.2rem; text-align: center; margin-bottom: 80px; }
        .plans-grid-master { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 25px; }
        .membership-card-master { background: #080808; border: 1px solid #111; border-radius: 12px; transition: 0.5s cubic-bezier(0.19, 1, 0.22, 1); position: relative; overflow: hidden; }
        .membership-card-master:hover { border-color: #00C853; transform: translateY(-15px); background: #0c0c0c; box-shadow: 0 30px 60px rgba(0, 200, 83, 0.15); }
        .membership-inner { padding: 50px 30px; text-align: center; height: 100%; display: flex; flex-direction: column; }
        .m-name-title { color: #00C853; font-size: 1.7rem; font-weight: 900; text-transform: uppercase; margin: 10px 0 30px; }
        .m-amount-num { font-size: 4rem; font-weight: 900; color: white; line-height: 1; }
        .btn-m-select-master { background: transparent; border: 1px solid #1a1a1a; color: white; padding: 15px; width: 100%; border-radius: 4px; font-weight: 900; cursor: pointer; transition: 0.3s; margin-top: auto; }
        .btn-m-select-master:hover { background: white; color: black; }

        .footer-elite-master { padding: 100px 30px 60px; background: #050505; text-align: center; border-top: 1px solid #111; }
        .footer-links-row-elite { display: flex; justify-content: center; gap: 50px; margin-bottom: 40px; flex-wrap: wrap; }
        .f-item-elite { color: #333; text-decoration: none; font-size: 12px; display: flex; align-items: center; gap: 10px; }
        .f-item-elite:hover { color: #00C853; }
        .f-copyright-elite { color: #1a1a1a; font-size: 11px; font-weight: 900; letter-spacing: 2px; text-align: center; text-transform: uppercase; margin-bottom: 10px; }

        @keyframes float-master { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        .fade-up-card { opacity: 0; animation: fadeUpMaster 1s ease forwards; }
        @keyframes fadeUpMaster { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}