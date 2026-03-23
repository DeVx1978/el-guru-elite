"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ArrowUpRight, Lock, FileText, Scale, Activity, Zap, TrendingUp, Globe, ChevronDown, X, Menu, ShieldAlert } from 'lucide-react';

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

  // ====================== FUNCIÓN CORREGIDA ======================
  const ejecutarTransicion = (e: React.MouseEvent, ruta: string) => {
    e.preventDefault();
    setIsNavigating(true);
    setMenuMovilAbierto(false);

    let destinoFinal = ruta;

    // === REGLA ESPECIAL PARA ACCESO VIP ===
    // Siempre va a /login + limpia sesión anterior (para que no salte a María José)
    if (ruta === '/login') {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('socio_id');
        localStorage.removeItem('socio_rol');
      }
      destinoFinal = '/login';
    }
    // Para rutas que requieren sesión (ej: /panel directo)
    else if (ruta === '/panel') {
      const socioId = typeof window !== 'undefined' ? localStorage.getItem('socio_id') : null;
      if (!socioId) {
        destinoFinal = '/login';
      } else {
        const socioRol = localStorage.getItem('socio_rol');
        destinoFinal = socioRol === 'admin' ? '/admin' : '/panel';
      }
    }

    setTimeout(() => {
      router.push(destinoFinal);
    }, 3500);
  };
  // ============================================================

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
        {/* ... (el splash se mantiene exactamente igual) ... */}
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
            {/* BOTÓN ACCESO VIP ELIMINADO COMPLETAMENTE (ya no aparece junto a la hamburguesa) */}
            <button className="menu-toggle mobile-only" onClick={() => setMenuMovilAbierto(!menuMovilAbierto)}>
              {menuMovilAbierto ? <X size={28} color="#00C853" /> : <Menu size={28} color="#00C853" />}
            </button>
          </div>
        </div>

        {/* MENÚ MÓVIL (con botón ACCESO VIP que ahora funciona correctamente) */}
        <div className={`mobile-menu-overlay ${menuMovilAbierto ? 'active' : ''}`}>
          <span onClick={() => abrirInfoSeccion('quienes')} className="mobile-link">Quiénes Somos</span>
          <span onClick={() => abrirInfoSeccion('proyecto')} className="mobile-link">Proyecto Gurú</span>
          <span onClick={() => abrirInfoSeccion('inversionistas')} className="mobile-link">Inversionistas</span>
          <button onClick={(e) => ejecutarTransicion(e, '/login')} className="btn-mobile-login">
            ACCESO VIP
          </button>
        </div>
      </nav>

      {/* Resto del código (hero, planes, footer) se mantiene exactamente igual */}
      <section className="hero-elite">
        <div className="hero-content">
          <div className="hero-status-tag"><Zap size={14} color="#00C853" /> FONDO DE CAPITAL PRIVADO</div>
          <h1 className="hero-main-title">
            <span className="text-glow-neon">CIENCIA FINANCIERA</span> <br/>SIN FRONTERAS
          </h1>
          <p className="hero-subtext">Algoritmos de alta frecuencia y redes neuronales dedicadas a la predicción de mercados. Gestión institucional para el inversor privado.</p>
          <div className="hero-cta-btn-group">
            <button onClick={(e) => ejecutarTransicion(e, '/unete')} className="btn-hero-primary">ABRIR CUENTA <ArrowUpRight size={18} /></button>
            <button onClick={(e) => ejecutarTransicion(e, '/login')} className="btn-hero-secondary mobile-only">
              ACCESO VIP <Lock size={16} />
            </button>
          </div>
        </div>
        {/* ... resto de hero, planes y footer igual que antes ... */}
        {/* (para no hacer el mensaje eterno, el resto es idéntico al original que me diste) */}
      </section>

      <section className="plans-section-luxe">
        <div className="plans-grid-luxe">
          {membresias.map((plan) => (
            <div key={plan.name} className="membership-card-luxe" style={{'--card-color': plan.color} as React.CSSProperties}>
              {/* ... igual ... */}
            </div>
          ))}
        </div>
      </section>

      <footer className="footer-elite-master">
        {/* ... igual ... */}
      </footer>

      <style jsx global>{` 
        /* ... todo el estilo original (sin cambios) ... */
        /* (lo mantengo igual para que no rompas nada) */
      `}</style>
    </div>
  );
}