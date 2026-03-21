"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, ArrowUpRight, Menu, X, Lock, FileText, Scale, Activity, Zap, Globe, ChevronDown, TrendingUp 
} from 'lucide-react';

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [seccionExpandida, setSeccionExpandida] = useState<string | null>(null);
  const router = useRouter();

  // --- BLINDAJE DE SPLASH (5 SEGUNDOS CRUCIALES - DISEÑO ORIGINAL) ---
  useEffect(() => {
    setLoading(true); 
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
            {/* Imagen original en el centro del círculo */}
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
          .loader-container { position: relative; width: 220px; height: 220px; margin-bottom: 40px; }
          @media (max-width: 768px) { .loader-container { width: 180px; height: 180px; } }
          .image-wrapper {
            width: 100%; height: 100%; border-radius: 50%; overflow: hidden;
            border: 2px solid #00C853; box-shadow: 0 0 80px rgba(0, 200, 83, 0.4);
            position: relative; z-index: 2; background: #000;
          }
          .image-wrapper img { width: 100%; height: 100%; object-fit: cover; }
          .pulse-ring {
            position: absolute; top: -20%; left: -20%; width: 140%; height: 140%;
            border: 1px solid #00C853; border-radius: 50%; animation: pulse-master 2s infinite; opacity: 0.3;
          }
          .scan-line {
            position: absolute; top: 0; left: 0; width: 100%; height: 10px;
            background: linear-gradient(to right, transparent, #00C853, transparent);
            box-shadow: 0 0 25px #00C853; z-index: 3; animation: scan-master 3s ease-in-out infinite;
          }
          .loading-text-wrapper { width: 100%; text-align: center; }
          .loading-text { color: #00C853; font-size: 11px; letter-spacing: 8px; margin-top: 25px; font-weight: 300; text-transform: uppercase; text-align: center; }
          @keyframes pulse-master { 0% { transform: scale(0.7); opacity: 0.8; } 100% { transform: scale(1.5); opacity: 0; } }
          @keyframes scan-master { 0%, 100% { top: 0%; } 50% { top: 100%; } }
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

  const seccionesInfo = [
    { id: 'quienes', title: 'Quiénes Somos', text: 'Somos un ecosistema de analistas cuantitativos y desarrolladores dedicados a la optimización de capital mediante modelos predictivos avanzados.' },
    { id: 'proyecto-guru', title: 'Proyecto Gurú', text: 'El pináculo de nuestro desarrollo técnico. Un motor de IA que procesa ineficiencias de mercado en tiempo real donde la probabilidad matemática está a nuestro favor.' },
    { id: 'inversionistas', title: 'Proyecto Inversionistas', text: 'Modelos de participación ajustados a su perfil de capital. Seleccione su nivel de participación en las utilidades globales mediante nuestro portafolio Élite.' }
  ];

  return (
    <div className="elite-landing-master">
      {/* NAVBAR RESPONSIVE BLINDADO CON CIRUGÍA DE POSICIÓN */}
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
            <button onClick={() => router.push('/panel')} className="btn-access-master">ACCESO PRIVADO</button>
            <button onClick={() => setMenuAbierto(!menuAbierto)} className="btn-menu-master">
              {menuAbierto ? <X size={28} color="white" /> : <Menu size={28} color="white" />}
            </button>
          </div>
        </div>

        {/* MENÚ MÓVIL ACORDEÓN (TEXTOS OCULTOS) */}
        {menuAbierto && (
          <div className="mobile-dropdown fade-in-nav">
            {seccionesInfo.map((sec) => (
              <div key={sec.id} className="accordion-item">
                <button onClick={() => toggleSeccion(sec.id)} className="accordion-trigger">
                  {sec.title}
                  <ChevronDown size={20} className={seccionExpandida === sec.id ? 'rotate' : ''} />
                </button>
                {seccionExpandida === sec.id && (
                  <div className="accordion-content fade-down">
                    <p>{sec.text}</p>
                  </div>
                )}
              </div>
            ))}
            <div className="menu-divider"></div>
            <p className="terminal-status">SISTEMA ÉLITE ACTIVO</p>
          </div>
        )}
      </nav>

      {/* HERO SECTION RESTAURADA AL 100% (Responsive Blindado) */}
      <section className="hero-elite">
        <div className="hero-layout">
          <div className="hero-info">
            <div className="hero-status-tag"><Zap size={14} color="#00C853" /> NETWORK DE INVERSIÓN INSTITUCIONAL</div>
            <h1 className="hero-main-title">
              <span className="text-glow-neon">LA CIENCIA DE</span> <br/>
              RENTABILIZAR
            </h1>
            <p className="hero-subtext">
              Plataforma exclusiva de gestión de capital institucional y deportiva. 
              Algoritmos de alta frecuencia diseñados para el 1% de los inversores globales.
            </p>
            <div className="hero-cta">
              <button onClick={() => router.push('/unete')} className="btn-hero-primary">
                COMENZAR AHORA <ArrowUpRight size={20} />
              </button>
            </div>
          </div>

          {/* VISUALES ORIGINALES (Glow y Estadísticas flotantes) */}
          <div className="hero-visuals">
            <div className="master-glow-orb"></div>
            <div className="floating-stat-card glass-morphism card-pos-1">
              <div className="stat-icon-glow">
                <Activity color="#00C853" size={28} />
              </div>
              <div className="stat-text-box">
                <span className="stat-label-master">RENDIMIENTO <br/>AUDITADO</span>
                <span className="stat-value-master">+18.5% <small>MES</small></span>
              </div>
            </div>
            <div className="floating-stat-card glass-morphism card-pos-2">
              <ShieldCheck color="#00C853" size={22} />
              <span className="shield-text">CAPITAL 100% PROTEGIDO</span>
            </div>
          </div>
        </div>
      </section>

      {/* PORTAFOLIO DE 5 MEMBRESÍAS RESTAURADO */}
      <section id="proyecto-inversionistas" className="plans-master-section">
        <div className="plans-header-master">
          <h2 className="plans-title-tag">PORTAFOLIO DE ACTIVOS</h2>
          <p className="plans-subtitle-master">Membresías exclusivas para la gestión de utilidades institucionales.</p>
        </div>
        
        <div className="plans-grid-elite">
          {membresias.map((plan) => (
            <div key={plan.name} className="membership-card-master fade-up-card" style={{animationDelay: plan.delay}}>
              <div className="membership-inner">
                <div className="membership-top">
                  <span className="m-cat-tag">FONDO ÉLITE</span>
                  <h3 className="m-name">{plan.name}</h3>
                </div>
                <div className="membership-body">
                  <div className="m-price-box">
                    <span className="m-curr">$</span>
                    <span className="m-amount">{plan.price}</span>
                    <span className="m-usd">USD</span>
                  </div>
                  <div className="m-divider"></div>
                  <p className="m-perk-text">{plan.perk}</p>
                  <p className="m-desc-text">Acceso a terminal de señales y reportes en tiempo real.</p>
                </div>
                <button onClick={() => router.push('/unete')} className="btn-m-select">SELECCIONAR NIVEL</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer-elite-master">
        <div className="footer-wrap">
          <div className="footer-links-row">
            <a href="/terminos" className="f-item"><Scale size={14}/> Términos</a>
            <a href="/privacidad" className="f-item"><FileText size={14}/> Privacidad</a>
            <a href="/confidencialidad" className="f-item"><Lock size={14}/> Confidencialidad</a>
          </div>
          <p className="f-copyright">&copy; 2026 EL GURÚ ÉLITE. TODOS LOS DERECHOS RESERVADOS.</p>
        </div>
      </footer>

      <style jsx global>{`
        /* --- ARQUITECTURA MAESTRA V1.0 - ESTILOS RESGUARDADOS AL 100% --- */
        :root { --neon: #00C853; --glass: rgba(15, 15, 15, 0.7); }
        .elite-landing-master { background-color: #000; color: white; min-height: 100vh; font-family: 'Inter', -apple-system, sans-serif; overflow-x: hidden; scroll-behavior: smooth; padding-top: 100px; }
        
        /* NAVBAR RESPONSIVE BLINDADO */
        .navbar-elite { width: 100%; position: fixed; top: 0; z-index: 1000; backdrop-filter: blur(30px); background: rgba(0, 0, 0, 0.95); border-bottom: 1px solid rgba(255,255,255,0.05); }
        .nav-container-master { max-width: 1300px; margin: 0 auto; padding: 25px 30px; display: flex; justify-content: space-between; align-items: center; }
        .brand-text { font-weight: 900; font-size: 1.5rem; letter-spacing: -1px; }
        .brand-neon { color: var(--neon); text-shadow: 0 0 20px rgba(0, 200, 83, 0.5); }
        .nav-links-desktop { display: none; gap: 40px; }
        @media (min-width: 1024px) { .nav-links-desktop { display: flex; } }
        .link-elite { color: #444; text-decoration: none; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px; transition: 0.3s; }
        .link-elite:hover { color: var(--neon); }
        .nav-actions-master { display: flex; align-items: center; gap: 40px; }
        .btn-access-master { background: transparent; border: 1px solid var(--neon); color: var(--neon); padding: 12px 28px; border-radius: 4px; font-weight: 900; font-size: 12px; cursor: pointer; transition: 0.4s; }
        .btn-access-master:hover { background: var(--neon); color: black; box-shadow: 0 0 20px rgba(0,200,83,0.4); }
        .btn-menu-master { background: transparent; border: none; cursor: pointer; padding: 0; display: flex; align-items: center; }
        @media (min-width: 1024px) { .btn-menu-master { display: none; } }
        @media (max-width: 600px) { .brand-text { font-size: 1.2rem; } .nav-container-master { padding: 15px 20px; } .btn-access-master { padding: 10px 20px; font-size: 10px; } }

        /* MENÚ MÓVIL ACORDEÓN */
        .mobile-dropdown { position: absolute; top: 100%; left: 0; width: 100%; background: #080808; padding: 40px; text-align: left; border-bottom: 1px solid #111; }
        @media (max-width: 600px) { .mobile-dropdown { padding: 30px 20px; } }
        .accordion-trigger { width: 100%; background: transparent; border: none; color: white; display: flex; justify-content: space-between; align-items: center; padding: 20px 0; font-size: 14px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid #111; cursor: pointer; }
        .accordion-content { padding: 20px 0; color: #666; font-size: 13px; line-height: 1.8; }
        .rotate { transform: rotate(180deg); color: var(--neon); transition: 0.3s; }
        .menu-divider { width: 40px; height: 1px; background: #1a1a1a; margin: 30px 0 20px; }
        .terminal-status { font-size: 9px; color: #222; letter-spacing: 4px; font-weight: 900; }

        /* HERO RESPONSIVE Y RESTAURADO */
        .hero-elite { max-width: 1300px; margin: 0 auto; padding: 120px 30px; }
        .hero-layout { display: grid; grid-template-columns: 1fr; gap: 80px; }
        @media (min-width: 1024px) { .hero-layout { grid-template-columns: 1.2fr 0.8fr; align-items: center; } }
        .hero-status-tag { color: var(--neon); font-size: 11px; font-weight: 900; letter-spacing: 4px; margin-bottom: 25px; display: flex; align-items: center; gap: 10px; }
        .hero-main-title { font-size: 3.5rem; font-weight: 900; line-height: 0.95; margin-bottom: 35px; letter-spacing: -3px; }
        @media (min-width: 768px) { .hero-main-title { font-size: 5.5rem; } }
        @media (max-width: 600px) { .hero-main-title { font-size: 2.8rem; letter-spacing: -1px; } .hero-elite { padding: 80px 20px; } }
        .text-glow-neon { background: linear-gradient(180deg, #fff 40%, var(--neon) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-subtext { color: #666; font-size: 1.25rem; line-height: 1.7; margin-bottom: 50px; max-width: 550px; }
        @media (max-width: 600px) { .hero-subtext { font-size: 1rem; } }
        .btn-hero-primary { background: var(--neon); color: black; border: none; padding: 22px 50px; border-radius: 4px; font-weight: 900; font-size: 15px; display: flex; align-items: center; gap: 15px; cursor: pointer; transition: 0.4s; }
        .btn-hero-primary:hover { transform: translateY(-4px); box-shadow: 0 15px 40px rgba(0, 200, 83, 0.4); }
        @media (max-width: 600px) { .btn-hero-primary { width: 100%; justify-content: center; } }

        /* VISUALES ORIGINALES RESPONSIVE */
        .hero-visuals { position: relative; display: flex; justify(center); align-items: center; height: 450px; }
        @media (max-width: 1024px) { .hero-visuals { height: 350px; margin-top: 50px; } }
        .master-glow-orb { position: absolute; width: 450px; height: 450px; background: var(--neon); filter: blur(160px); opacity: 0.15; z-index: 1; }
        @media (max-width: 600px) { .master-glow-orb { width: 300px; height: 300px; filter: blur(100px); } }
        .glass-morphism { background: var(--glass); backdrop-filter: blur(35px); border: 1px solid rgba(255,255,255,0.06); border-radius: 20px; padding: 35px; z-index: 10; }
        .floating-stat-card { position: absolute; animation: float-master 6s ease-in-out infinite; }
        .card-pos-1 { top: 10%; right: 5%; width: 300px; display: flex; gap: 20px; align-items: center; box-shadow: 0 25px 60px rgba(0,0,0,0.6); }
        .stat-icon-glow { background: rgba(0, 200, 83, 0.1); padding: 18px; border-radius: 15px; box-shadow: 0 0 25px rgba(0,200,83,0.15); }
        .stat-label-master { font-size: 11px; color: #444; font-weight: 900; line-height: 1.4; }
        .stat-value-master { font-size: 30px; font-weight: 900; color: white; display: block; margin-top: 6px; }
        .stat-value-master small { font-size: 12px; color: var(--neon); }
        .card-pos-2 { bottom: 15%; left: 0; display: flex; gap: 14px; align-items: center; font-size: 12px; font-weight: 900; color: #888; }
        @media (max-width: 768px) { .card-pos-1 { width: 250px; right: 0; padding: 25px; gap: 15px; } .card-pos-2 { left: 0; bottom: 0; } }

        /* PLANES RESTAURADOS Y RESPONSIVE */
        .plans-master-section { padding: 160px 30px; max-width: 1550px; margin: 0 auto; }
        @media (max-width: 768px) { .plans-master-section { padding: 80px 20px; } }
        .plans-title-tag { font-size: 12px; letter-spacing: 9px; color: #333; margin-bottom: 20px; text-transform: uppercase; font-weight: 900; text-align: center; }
        .plans-subtitle-master { color: #888; font-size: 1.25rem; text-align: center; margin-bottom: 90px; }
        @media (max-width: 600px) { .plans-subtitle-master { font-size: 1rem; margin-bottom: 50px; } }
        .plans-grid-elite { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 30px; }
        .membership-card-master { background: #080808; border: 1px solid #111; border-radius: 12px; transition: 0.5s cubic-bezier(0.19, 1, 0.22, 1); position: relative; overflow: hidden; }
        .membership-card-master:hover { border-color: var(--neon); transform: translateY(-15px); background: #0c0c0c; box-shadow: 0 35px 70px rgba(0, 200, 83, 0.18); }
        .membership-inner { padding: 60px 35px; text-align: center; height: 100%; display: flex; flex-direction: column; }
        .m-name { color: var(--neon); font-size: 1.9rem; font-weight: 900; text-transform: uppercase; margin: 12px 0 35px; }
        .m-price-box { margin-bottom: 30px; display: flex; align-items: baseline; justify-content: center; gap: 4px; }
        .m-curr { color: var(--neon); font-size: 24px; font-weight: 900; }
        .m-amount { font-size: 4.5rem; font-weight: 900; color: white; line-height: 1; }
        .m-divider { width: 50px; height: 1px; background: #1a1a1a; margin: 0 auto 30px; }
        .m-perk-text { color: #fff; font-size: 15px; font-weight: 900; margin-bottom: 12px; }
        .m-desc-text { color: #444; font-size: 12px; line-height: 1.6; margin-bottom: 40px; }
        .btn-m-select { background: transparent; border: 1px solid #1a1a1a; color: white; padding: 18px; width: 100%; border-radius: 4px; font-weight: 900; cursor: pointer; transition: 0.3s; margin-top: auto; }
        .btn-m-select:hover { background: white; color: black; border-color: white; }

        /* FOOTER RESTAURADO */
        .footer-elite-master { padding: 120px 30px 80px; background: #050505; text-align: center; border-top: 1px solid #111; }
        .footer-links-row { display: flex; justify(center); gap: 60px; margin-bottom: 50px; flex-wrap: wrap; }
        .f-item { color: #333; text-decoration: none; font-size: 13px; display: flex; align-items: center; gap: 12px; }
        .f-item:hover { color: var(--neon); }
        .f-copyright { color: #1a1a1a; font-size: 12px; font-weight: 900; letter-spacing: 3px; text-align: center; text-transform: uppercase; margin-bottom: 12px; }

        @keyframes float-master { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        .fade-up-card { opacity: 0; animation: fadeUpMaster 1.2s ease forwards; }
        @keyframes fadeUpMaster { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}