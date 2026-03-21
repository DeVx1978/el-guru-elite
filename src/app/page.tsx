"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, ArrowUpRight, Menu, X, Lock, FileText, Scale, Activity, Zap, ChevronDown 
} from 'lucide-react';

export default function LandingPage() {
  const [loading, setLoading] = useState(true);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [seccionExpandida, setSeccionExpandida] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/panel');
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, [router]);

  if (loading || isNavigating) {
    return (
      <div className="splash-master">
        <div className="loader-container">
          <div className="pulse-ring"></div>
          <div className="image-wrapper">
            <img src="/images/guru.jpg" alt="El Guru Elite" fetchPriority="high" />
          </div>
          <div className="scan-line"></div>
        </div>
        <h2 className="loading-text">SISTEMA ÉLITE: PROCESANDO...</h2>
        <style jsx global>{`
          .splash-master { background: #000; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; z-index: 99999999; }
          .loader-container { position: relative; width: 200px; height: 200px; }
          .image-wrapper { width: 100%; height: 100%; border-radius: 50%; overflow: hidden; border: 2px solid #00C853; box-shadow: 0 0 60px rgba(0, 200, 83, 0.4); }
          .image-wrapper img { width: 100%; height: 100%; object-fit: cover; }
          .pulse-ring { position: absolute; top: -15%; left: -15%; width: 130%; height: 130%; border: 1px solid #00C853; border-radius: 50%; animation: pulse 2s infinite; opacity: 0.3; }
          .loading-text { color: #00C853; font-size: 10px; letter-spacing: 6px; margin-top: 30px; text-transform: uppercase; }
          @keyframes pulse { 0% { transform: scale(0.8); opacity: 0.8; } 100% { transform: scale(1.3); opacity: 0; } }
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
        <div className="nav-container">
          <div className="nav-brand">EL GURÚ <span className="brand-neon">ÉLITE</span></div>
          <div className="nav-actions">
            <button onClick={() => { setIsNavigating(true); router.push('/panel'); }} className="btn-access">ACCESO PRIVADO</button>
            <button onClick={() => setMenuAbierto(!menuAbierto)} className="btn-menu">
              {menuAbierto ? <X size={26} color="#00C853" /> : <Menu size={26} color="white" />}
            </button>
          </div>
        </div>
        {/* MENÚ MÓVIL ELIMINANDO LOS BOTONES BLANCOS Y EL AZUL */}
        {menuAbierto && (
          <div className="mobile-dropdown-master">
            <div className="dropdown-content">
              {['Quiénes Somos', 'Proyecto Gurú', 'Inversionistas'].map((item) => (
                <div key={item} className="dropdown-item">
                  <span>{item}</span>
                  <ChevronDown size={16} color="#222" />
                </div>
              ))}
              <div className="status-indicator">MODO ÉLITE ACTIVADO</div>
            </div>
          </div>
        )}
      </nav>

      <section className="hero-elite">
        <div className="hero-layout">
          <div className="hero-content">
            <div className="hero-tag"><Zap size={14} /> NETWORK DE INVERSIÓN INSTITUCIONAL</div>
            <h1 className="hero-title">
              <span className="text-glow">LA CIENCIA DE</span><br />RENTABILIZAR
            </h1>
            <p className="hero-sub">
              Optimización estratégica de activos mediante algoritmos de IA de alta frecuencia. Seguridad blindada.
            </p>
            <button onClick={() => router.push('/unete')} className="btn-main">COMENZAR AHORA <ArrowUpRight size={20} /></button>
            
            <div className="stats-container-mobile">
              <div className="stat-card-premium glass">
                <div className="stat-header">
                  <Activity size={22} color="#00C853" />
                  <span>RENDIMIENTO AUDITADO</span>
                </div>
                <div className="stat-value">+18.5% <small>MES</small></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="plans-section">
        <div className="plans-grid">
          {membresias.map((plan) => (
            <div key={plan.name} className="plan-card glass shadow-hover">
              <h3 className="plan-name">{plan.name}</h3>
              <div className="plan-price">${plan.price}<span>USD</span></div>
              <p className="plan-perk">{plan.perk}</p>
              <button onClick={() => router.push('/unete')} className="btn-select">SELECCIONAR</button>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer-master">
        <div className="footer-links">
          <span className="f-link">Términos Legales</span>
          <span className="f-link">Privacidad</span>
          <span className="f-link">Confidencialidad</span>
        </div>
        <p className="f-copy">&copy; 2026 EL GURÚ ÉLITE. TODOS LOS DERECHOS RESERVADOS.</p>
      </footer>

      <style jsx global>{`
        :root { --neon: #00C853; }
        .elite-landing-master { background: #000; color: #fff; font-family: 'Inter', sans-serif; min-height: 100vh; overflow-x: hidden; padding-top: 80px; }
        
        .navbar-elite { position: fixed; top: 0; width: 100%; z-index: 1000; background: rgba(0,0,0,0.95); backdrop-filter: blur(20px); border-bottom: 1px solid #111; }
        .nav-container { max-width: 1200px; margin: 0 auto; padding: 20px; display: flex; justify-content: space-between; align-items: center; }
        .nav-brand { font-weight: 900; font-size: 1.3rem; letter-spacing: -1px; }
        .brand-neon { color: var(--neon); }
        .nav-actions { display: flex; align-items: center; gap: 15px; }
        .btn-access { background: transparent; border: 1px solid var(--neon); color: var(--neon); padding: 8px 16px; border-radius: 4px; font-size: 10px; font-weight: 900; }
        .btn-menu { background: transparent; border: none; cursor: pointer; display: flex; align-items: center; padding: 0; }

        .mobile-dropdown-master { background: #000; border-top: 1px solid #111; padding: 20px; }
        .dropdown-item { display: flex; justify-content: space-between; align-items: center; padding: 18px 0; border-bottom: 1px solid #111; font-weight: 900; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }
        .status-indicator { font-size: 9px; color: #222; margin-top: 20px; letter-spacing: 3px; font-weight: 900; text-align: center; }

        .hero-elite { padding: 40px 20px; max-width: 1200px; margin: 0 auto; }
        .hero-tag { color: var(--neon); font-size: 10px; font-weight: 900; letter-spacing: 3px; margin-bottom: 25px; display: flex; align-items: center; gap: 10px; }
        .hero-title { font-size: 2.8rem; font-weight: 900; line-height: 1.05; margin-bottom: 30px; letter-spacing: -1px; }
        .text-glow { background: linear-gradient(180deg, #fff 40%, var(--neon) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .hero-sub { color: #666; font-size: 1rem; line-height: 1.7; margin-bottom: 40px; }
        .btn-main { background: var(--neon); color: #000; border: none; padding: 20px; border-radius: 4px; font-weight: 900; width: 100%; display: flex; justify-content: center; align-items: center; gap: 12px; }

        .stats-container-mobile { margin-top: 50px; }
        .stat-card-premium { padding: 30px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.06); background: rgba(15,15,15,0.7); }
        .stat-header { display: flex; align-items: center; gap: 12px; font-size: 11px; font-weight: 900; color: #444; }
        .stat-value { font-size: 32px; font-weight: 900; margin-top: 10px; }
        .stat-value small { font-size: 14px; color: var(--neon); }

        .plans-section { padding: 60px 20px; }
        .plans-grid { display: grid; gap: 20px; }
        .plan-card { padding: 40px 30px; border-radius: 12px; text-align: center; border: 1px solid #111; }
        .plan-name { color: var(--neon); font-size: 1.5rem; font-weight: 900; }
        .plan-price { font-size: 3.5rem; font-weight: 900; margin-top: 15px; }
        .plan-price span { font-size: 14px; color: #444; }
        .btn-select { background: transparent; border: 1px solid #222; color: #fff; width: 100%; padding: 15px; border-radius: 4px; margin-top: 30px; font-weight: 900; }

        .footer-master { padding: 60px 20px; text-align: center; border-top: 1px solid #111; }
        .footer-links { display: flex; justify-content: center; gap: 25px; margin-bottom: 30px; }
        .f-link { color: #333; font-size: 12px; font-weight: 900; }
        .f-copy { color: #111; font-size: 10px; font-weight: 900; letter-spacing: 2px; }
      `}</style>
    </div>
  );
}