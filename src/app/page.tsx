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

  // ====================== LOADER (con imagen solo aquí) ======================
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
          {isNavigating ? "AUTENTICANDO ACCESO PRIVADO..." : "AUTENTICANDO TERMINAL DE INVERSIÓN..."}
        </h2>

        <style jsx global>{`
          .splash-master {
            background: #000 !important;
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            display: flex; flex-direction: column; justify-content: center; align-items: center;
            z-index: 9999999; overflow: hidden;
          }
          .loader-container { position: relative; width: 220px; height: 220px; margin-bottom: 40px; }
          .image-wrapper {
            width: 100%; height: 100%; border-radius: 50%; overflow: hidden;
            border: 2px solid #00C853; box-shadow: 0 0 70px rgba(0, 200, 83, 0.5);
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
          .loading-text-elite { color: #00C853; font-size: 11px; letter-spacing: 8px; margin-top: 25px; font-weight: 300; text-transform: uppercase; }
          
          @keyframes pulse-master { 0% { transform: scale(0.8); opacity: 1; } 100% { transform: scale(1.4); opacity: 0; } }
          @keyframes scan-master { 0%, 100% { top: 0%; } 50% { top: 100%; } }
          @keyframes progress-master { 100% { width: 100%; } }
        `}</style>
      </div>
    );
  }

  // ====================== CONTENIDO NORMAL ======================
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
        .elite-landing-master { background-color: #000; color: white; min-height: 100vh; font-family: 'Inter', sans-serif; overflow-x: hidden; padding-top: 80px; }
        .navbar-elite { width: 100%; position: fixed; top: 0; z-index: 1000; backdrop-filter: blur(30px); background: rgba(0, 0, 0, 0.9); border-bottom: 1px solid rgba(255,255,255,0.05); }
        .nav-container-master { max-width: 1300px; margin: 0 auto; padding: 22px 30px; display: flex; justify-content: space-between; align-items: center; }
        .brand-text { font-weight: 900; font-size: 1.3rem; letter-spacing: -1px; }
        .brand-neon { color: #00C853; text-shadow: 0 0 15px rgba(0,200,83,0.3); }
        .nav-links-master { display: none; gap: 40px; }
        @media (min-width: 1024px) { .nav-links-master { display: flex; } }
        .hero-main-title { font-size: 3.2rem; }
        @media (max-width: 768px) { .hero-main-title { font-size: 2.4rem; } }
        /* Resto de estilos sin cambios */
        .hero-subtext { font-size: 1.1rem; }
        @media (max-width: 768px) { .hero-subtext { font-size: 1rem; } }
        /* ... (el resto de tu estilo original queda igual) ... */
      `}</style>
    </div>
  );
}