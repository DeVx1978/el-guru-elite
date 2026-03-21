"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, ArrowUpRight, Lock, FileText, Scale, Activity, Zap, TrendingUp, Globe
} from 'lucide-react';

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  // --- 1. SOLUCIÓN AL PARPADEO DE ENTRADA ---
  useEffect(() => {
    router.prefetch('/panel');
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, [router]);

  // --- 2. SOLUCIÓN AL PARPADEO DE SALIDA ---
  const navegarPrivado = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsNavigating(true); 
    router.push('/panel');
  };

  // BLOQUEO DE RENDERIZADO PARA CERO PARPADEO
  if (loading || isNavigating) {
    return (
      <div className="splash-master">
        <div className="loader-container">
          <div className="pulse-ring"></div>
          <div className="image-wrapper">
            <img 
              src="/images/guru.jpg" 
              alt="El Guru Elite" 
              fetchPriority="high" 
              loading="eager"
            />
          </div>
          <div className="scan-line"></div>
        </div>
        <div className="loading-bar-master">
          <div className="loading-bar-fill"></div>
        </div>
        <h2 className="loading-text-elite">
          {isNavigating ? "ACCEDIENDO A TERMINAL SEGURA..." : "AUTENTICANDO TERMINAL DE INVERSIÓN..."}
        </h2>

        <style jsx global>{`
          .splash-master {
            background: #000 !important;
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            display: flex; flex-direction: column; justify-content: center; align-items: center;
            z-index: 99999999; overflow: hidden;
          }
          .loader-container { position: relative; width: 220px; height: 220px; margin-bottom: 40px; }
          @media (max-width: 768px) { .loader-container { width: 180px; height: 180px; } }
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
          .loading-text-elite { color: #00C853; font-size: 11px; letter-spacing: 6px; margin-top: 25px; font-weight: 300; text-transform: uppercase; text-align: center; }
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
            <button onClick={navegarPrivado} className="btn-access-master">ACCESO PRIVADO</button>
          </div>
        </div>
      </nav>

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
        /* --- ESTILOS MAESTROS RESGUARDADOS AL 100% --- */
        .elite-landing-master { background-color: #000; color: white; min-height: 100vh; font-family: 'Inter', sans-serif; overflow-x: hidden; padding-top: 80px; }
        .navbar-elite { width: 100%; position: fixed; top: 0; z-index: 1000; backdrop-filter: blur(30px); background: rgba(0, 0, 0, 0.9); border-bottom: 1px solid rgba(255,255,255,0.05); }
        .nav-container-master { max-width: 1300px; margin: 0 auto; padding: 22px 30px; display: flex; justify-content: space-between; align-items: center; }
        .brand-text { font-weight: 900; font-size: 1.3rem; letter-spacing: -1px; }
        .brand-neon { color: #00C853; text-shadow: 0 0 15px rgba(0,200,83,0.3); }
        .nav-links-master { display: none; gap: 40px; }
        @media (min-width: 1024px) { .nav-links-master { display: flex; } }
        .link-elite { color: #444; text-decoration: none; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; transition: 0.3s; }
        .link-elite:hover { color: #00C853; }
        .btn-access-master { background: transparent; border: 1px solid #00C853; color: #00C853; padding: 10px 24px; border-radius: 4px; font-size: 11px; font-weight: 900; cursor: pointer; transition: 0.3s; }
        .btn-access-master:hover { background: #00C853; color: black; box-shadow: 0 0 20px rgba(0,200,83,0.3); }

        .hero-elite { max-width: 1300px; margin: 0 auto; padding: 120px 30px; }
        .hero-grid-layout { display: grid; grid-template-columns: 1fr; gap: 80px; }
        @media (min-width: 1024px) { .hero-grid-layout { grid-template-columns: 1.2fr 0.8fr; align-items: center; } }
        .hero-status-tag { color: #00C853; font-size: 11px; font-weight: 900; letter-spacing: 4px; margin-bottom: 25px; display: flex; align-items: center; gap: 10px; }
        .hero-main-title { font-size: 3.5rem; font-weight: 900; line-height: 0.95; margin-bottom: 35px; letter-spacing: -3px; }
        @media (min-width: 768px) { .hero-main-title { font-size: 5.5rem; } }
        .text-glow-neon { background: linear-gradient(180deg, #fff 40%, #00C853 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-subtext { color: #666; font-size: 1.25rem; line-height: 1.7; margin-bottom: 50px; max-width: 550px; }
        .btn-hero-primary { background: #00C853; color: black; border: none; padding: 22px 50px; border-radius: 4px; font-weight: 900; font-size: 15px; display: flex; align-items: center; gap: 15px; cursor: pointer; transition: 0.4s; }
        .btn-hero-primary:hover { transform: translateY(-4px); box-shadow: 0 15px 40px rgba(0, 200, 83, 0.4); }

        .hero-visuals-right { position: relative; display: flex; justify(center); align-items: center; height: 450px; }
        @media (max-width: 1024px) { .hero-visuals-right { height: 350px; margin-top: 50px; } }
        .glass-depth-1 { background: rgba(15, 15, 15, 0.6); backdrop-filter: blur(35px); border: 1px solid rgba(255,255,255,0.06); border-radius: 20px; padding: 35px; width: 300px; position: absolute; top: 10%; right: 5%; animation: float-master 6s ease-in-out infinite; box-shadow: 0 25px 60px rgba(0,0,0,0.6); z-index: 10; }
        .glass-depth-2 { background: rgba(15, 15, 15, 0.6); backdrop-filter: blur(25px); border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 18px 28px; font-size: 12px; font-weight: 900; color: #888; position: absolute; bottom: 15%; left: 0; display: flex; align-items: center; gap: 14px; animation: float-master 6s ease-in-out infinite reverse; z-index: 10; }
        .stat-icon-glow { background: rgba(0, 200, 83, 0.1); padding: 18px; border-radius: 15px; box-shadow: 0 0 25px rgba(0,200,83,0.15); }
        .stat-label-master { font-size: 11px; color: #444; font-weight: 900; line-height: 1.4; }
        .stat-value-master { font-size: 30px; font-weight: 900; color: white; display: block; margin-top: 6px; }
        .master-glow-orb { position: absolute; width: 450px; height: 450px; background: #00C853; filter: blur(160px); opacity: 0.15; z-index: 1; }

        .plans-area-master { padding: 160px 30px; max-width: 1550px; margin: 0 auto; }
        .plans-title-tag { font-size: 12px; letter-spacing: 9px; color: #333; margin-bottom: 20px; text-transform: uppercase; font-weight: 900; text-align: center; }
        .plans-subtitle-master { color: #888; font-size: 1.25rem; text-align: center; margin-bottom: 90px; }
        .plans-grid-master { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 30px; }
        .membership-card-master { background: #080808; border: 1px solid #111; border-radius: 12px; transition: 0.5s cubic-bezier(0.19, 1, 0.22, 1); position: relative; overflow: hidden; }
        .membership-card-master:hover { border-color: #00C853; transform: translateY(-15px); background: #0c0c0c; box-shadow: 0 35px 70px rgba(0, 200, 83, 0.18); }
        .membership-inner { padding: 60px 35px; text-align: center; height: 100%; display: flex; flex-direction: column; }
        .m-name-title { color: #00C853; font-size: 1.9rem; font-weight: 900; text-transform: uppercase; margin: 12px 0 35px; }
        .m-amount-num { font-size: 4.5rem; font-weight: 900; color: white; line-height: 1; }
        .btn-m-select-master { background: transparent; border: 1px solid #1a1a1a; color: white; padding: 18px; width: 100%; border-radius: 4px; font-weight: 900; cursor: pointer; transition: 0.3s; margin-top: auto; }
        .btn-m-select-master:hover { background: white; color: black; }

        .footer-elite-master { padding: 120px 30px 80px; background: #050505; text-align: center; border-top: 1px solid #111; }
        .footer-links-row-elite { display: flex; justify-content: center; gap: 60px; margin-bottom: 50px; flex-wrap: wrap; }
        .f-item-elite { color: #333; text-decoration: none; font-size: 13px; display: flex; align-items: center; gap: 12px; }
        .f-item-elite:hover { color: #00C853; }
        .f-copyright-elite { color: #1a1a1a; font-size: 12px; font-weight: 900; letter-spacing: 3px; text-align: center; text-transform: uppercase; margin-bottom: 12px; }

       /* --- CIERRE DE ESTILOS Y ESTRUCTURA --- */
        @keyframes float-master { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        .fade-up-card { opacity: 0; animation: fadeUpMaster 1.2s ease forwards; }
        @keyframes fadeUpMaster { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}