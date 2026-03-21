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

  // --- CONTROL DE CARGA ÉLITE (CERO PARPADEO) ---
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
          {isNavigating ? "AUTENTICANDO ACCESO PRIVADO..." : "AUTENTICANDO TERMINAL DE INVERSIÓN..."}
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
          .loading-text-elite { color: #00C853; font-size: 10px; letter-spacing: 7px; margin-top: 25px; font-weight: 300; text-transform: uppercase; text-align: center; }
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
      {/* NAVBAR: ALINEACIÓN MILIMÉTRICA HORIZONTAL */}
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
              {menuAbierto ? <X size={26} color="white" /> : <Menu size={26} color="white" />}
            </button>
          </div>
        </div>
        {menuAbierto && (
          <div className="mobile-dropdown fade-in-nav">
            <div className="accordion-item">
              <button onClick={() => toggleSeccion('quienes')} className="accordion-trigger">
                Quiénes Somos <ChevronDown size={18} className={seccionExpandida === 'quienes' ? 'rotate' : ''} />
              </button>
              {seccionExpandida === 'quienes' && <p className="accordion-content">Ecosistema de analistas cuantitativos optimizando capital mediante modelos predictivos.</p>}
            </div>
            <div className="accordion-item">
              <button onClick={() => toggleSeccion('proyecto')} className="accordion-trigger">
                Proyecto Gurú <ChevronDown size={18} className={seccionExpandida === 'proyecto' ? 'rotate' : ''} />
              </button>
              {seccionExpandida === 'proyecto' && <p className="accordion-content">IA de alta frecuencia procesando ineficiencias de mercado en tiempo real.</p>}
            </div>
          </div>
        )}
      </nav>

      <section className="hero-elite">
        <div className="hero-layout">
          <div className="hero-info">
            <div className="hero-status-tag"><Zap size={14} color="#00C853" /> NETWORK DE INVERSIÓN INSTITUCIONAL</div>
            <h1 className="hero-main-title">
              <span className="text-glow-neon">LA CIENCIA DE</span> <br/>
              RENTABILIZAR
            </h1>
            <p className="hero-subtext">
              Optimización estratégica de activos mediante algoritmos de IA de alta frecuencia. 
              Seguridad blindada para inversores de alto perfil.
            </p>
            <div className="hero-cta">
              <button onClick={() => router.push('/unete')} className="btn-hero-primary">
                COMENZAR AHORA <ArrowUpRight size={20} />
              </button>
            </div>

            {/* ESTADÍSTICA FLOTANTE RESTAURADA: Reubicada milimétricamente debajo del botón en móvil */}
            <div className="floating-stats-mobile">
              <div className="stat-card-premium glass-morphism">
                <div className="stat-header">
                  <Activity size={22} color="#00C853" />
                  <span>RENDIMIENTO AUDITADO</span>
                </div>
                <div className="stat-value">+18.5% <small>MES</small></div>
              </div>
              <div className="stat-card-mini glass-morphism">
                <ShieldCheck size={18} color="#00C853" />
                <span>CAPITAL 100% PROTEGIDO</span>
              </div>
            </div>
          </div>

          <div className="hero-visuals-desktop">
            <div className="master-glow-orb"></div>
            <div className="stat-card-master glass-depth-1">
              <div className="stat-icon-glow"><Activity color="#00C853" size={28} /></div>
              <div className="stat-text-box">
                <span className="stat-label-master">RENDIMIENTO <br/>AUDITADO</span>
                <span className="stat-value-master">+18.5% <small>MES</small></span>
              </div>
            </div>
            <div className="stat-card-master glass-depth-2">
              <ShieldCheck color="#00C853" size={20} />
              <span className="shield-text-master">CAPITAL 100% PROTEGIDO</span>
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
                <h3 className="m-name">{plan.name}</h3>
                <div className="m-price-box">
                  <span className="m-curr">$</span><span className="m-amount">{plan.price}</span><span className="m-usd">USD</span>
                </div>
                <div className="m-divider"></div>
                <p className="m-perk-text">{plan.perk}</p>
                <button onClick={() => router.push('/unete')} className="btn-m-select">SELECCIONAR NIVEL</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer-elite-master">
        <div className="footer-wrap">
          <div className="footer-links-row">
            <a href="/terminos" className="f-item"><Scale size={14}/> Términos Legales</a>
            <a href="/privacidad" className="f-item"><FileText size={14}/> Privacidad</a>
            <a href="/confidencialidad" className="f-item"><Lock size={14}/> Confidencialidad</a>
          </div>
          <p className="f-copyright">&copy; 2026 EL GURÚ ÉLITE. TODOS LOS DERECHOS RESERVADOS.</p>
        </div>
      </footer>

      <style jsx global>{`
        /* --- ARQUITECTURA MAESTRA (510+ LÍNEAS) --- */
        :root { --neon: #00C853; --glass: rgba(15, 15, 15, 0.7); }
        .elite-landing-master { background-color: #000; color: white; min-height: 100vh; font-family: 'Inter', sans-serif; overflow-x: hidden; padding-top: 80px; }
        
        /* NAVBAR ALINEACIÓN MILIMÉTRICA */
        .navbar-elite { width: 100%; position: fixed; top: 0; z-index: 1000; backdrop-filter: blur(30px); background: rgba(0, 0, 0, 0.95); border-bottom: 1px solid rgba(255,255,255,0.05); }
        .nav-container-master { max-width: 1300px; margin: 0 auto; padding: 25px 30px; display: flex; justify-content: space-between; align-items: center; }
        .brand-text { font-weight: 900; font-size: 1.5rem; letter-spacing: -1px; }
        .brand-neon { color: var(--neon); text-shadow: 0 0 20px rgba(0, 200, 83, 0.5); }
        .nav-actions-master { display: flex; align-items: center; gap: 20px; }
        .btn-access-master { background: transparent; border: 1px solid var(--neon); color: var(--neon); padding: 12px 28px; border-radius: 4px; font-weight: 900; font-size: 12px; cursor: pointer; transition: 0.4s; }
        .btn-menu-master { background: transparent; border: none; cursor: pointer; display: flex; align-items: center; }
        @media (max-width: 600px) { .nav-container-master { padding: 15px 20px; } .btn-access-master { padding: 10px 18px; font-size: 10px; } }

        /* HERO Y TÍTULO (CIENCIA DE RENTABILIZAR) */
        .hero-elite { max-width: 1300px; margin: 0 auto; padding: 120px 30px; }
        .hero-main-title { font-size: 3.5rem; font-weight: 900; line-height: 0.95; margin-bottom: 35px; letter-spacing: -3px; }
        @media (min-width: 768px) { .hero-main-title { font-size: 5.5rem; } }
        @media (max-width: 600px) { .hero-main-title { font-size: 2.8rem; letter-spacing: -1px; } .hero-elite { padding: 60px 20px; } }
        .text-glow-neon { background: linear-gradient(180deg, #fff 40%, var(--neon) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-subtext { color: #666; font-size: 1.25rem; line-height: 1.7; margin-bottom: 50px; max-width: 550px; }
        .btn-hero-primary { background: var(--neon); color: black; border: none; padding: 22px 50px; border-radius: 4px; font-weight: 900; font-size: 15px; display: flex; align-items: center; gap: 15px; cursor: pointer; transition: 0.4s; }
        @media (max-width: 600px) { .btn-hero-primary { width: 100%; justify-content: center; } }

        /* ESTADÍSTICAS FLOTANTES (REUBICADAS EN MÓVIL) */
        .floating-stats-mobile { margin-top: 50px; display: flex; flex-direction: column; gap: 20px; }
        @media (min-width: 1024px) { .floating-stats-mobile { display: none; } }
        .stat-card-premium { padding: 30px; border-radius: 20px; box-shadow: 0 25px 60px rgba(0,0,0,0.6); }
        .stat-header { display: flex; align-items: center; gap: 15px; font-size: 11px; font-weight: 900; color: #444; letter-spacing: 2px; }
        .stat-value { font-size: 32px; font-weight: 900; margin-top: 15px; color: #fff; }
        .stat-value small { font-size: 14px; color: var(--neon); }
        .stat-card-mini { padding: 15px 25px; border-radius: 12px; display: flex; align-items: center; gap: 12px; font-size: 12px; font-weight: 900; color: #888; }
        .glass-morphism { background: var(--glass); backdrop-filter: blur(35px); border: 1px solid rgba(255,255,255,0.06); }

        /* VISUALES DESKTOP */
        .hero-visuals-desktop { display: none; position: relative; height: 450px; }
        @media (min-width: 1024px) { 
          .hero-visuals-desktop { display: flex; justify-content: center; align-items: center; }
          .hero-layout { display: grid; grid-template-columns: 1.2fr 0.8fr; align-items: center; }
        }
        .master-glow-orb { position: absolute; width: 450px; height: 450px; background: var(--neon); filter: blur(160px); opacity: 0.15; z-index: 1; }
        .stat-card-master { background: var(--glass); backdrop-filter: blur(35px); border: 1px solid rgba(255,255,255,0.06); border-radius: 20px; padding: 35px; position: absolute; }
        .glass-depth-1 { width: 300px; top: 10%; right: 5%; animation: float-master 6s ease-in-out infinite; box-shadow: 0 25px 60px rgba(0,0,0,0.6); }
        .glass-depth-2 { bottom: 15%; left: 0; padding: 18px 28px; font-size: 12px; font-weight: 900; color: #888; display: flex; align-items: center; gap: 14px; animation: float-master 6s ease-in-out infinite reverse; }

        /* PLANES */
        .plans-area-master { padding: 160px 30px; max-width: 1550px; margin: 0 auto; }
        .plans-grid-master { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 30px; }
        .membership-card-master { background: #080808; border: 1px solid #111; border-radius: 12px; transition: 0.5s; text-align: center; }
        .membership-inner { padding: 60px 35px; }
        .m-name { color: var(--neon); font-size: 1.9rem; font-weight: 900; margin-bottom: 35px; }
        .m-amount { font-size: 4.5rem; font-weight: 900; }
        .btn-m-select { background: transparent; border: 1px solid #1a1a1a; color: white; width: 100%; padding: 18px; border-radius: 4px; font-weight: 900; cursor: pointer; margin-top: 40px; }

        @keyframes float-master { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        .fade-up-card { opacity: 0; animation: fadeUpMaster 1.2s ease forwards; }
        @keyframes fadeUpMaster { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}