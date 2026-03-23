"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, KeyRound, Zap, Eye, EyeOff, Lock, UserCheck, Terminal } from 'lucide-react';

export default function BunkerAdmin() {
  const [llave, setLlave] = useState('');
  const [mostrarLlave, setMostrarLlave] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accesoExitoso, setAccesoExitoso] = useState(false);
  const router = useRouter();

  const validarAcceso = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(false);
    setAccesoExitoso(false);

    const LLAVE_CORRECTA = "GURU2026";

    // Simulación de verificación profunda (3 segundos exactos)
    setTimeout(() => {
      if (llave === LLAVE_CORRECTA) {
        setAccesoExitoso(true);

        if (typeof window !== 'undefined') {
          // Limpieza de seguridad
          localStorage.removeItem('socio_id');
          localStorage.removeItem('socio_nombre');
          localStorage.removeItem('socio_rol');
          localStorage.setItem('bunker_auth', LLAVE_CORRECTA);
        }

        // 1 segundo extra para apreciar el efecto de éxito
        setTimeout(() => {
          router.push('/admin');
        }, 1200);

      } else {
        setError(true);
        setLlave('');
        setLoading(false);
      }
    }, 3000);
  };

  return (
    <div className="bunker-wrapper">
      {/* ─── OVERLAY DE CARGA ESPECTACULAR ──────────────────────────────────────── */}
      {loading && (
        <div className="loading-overlay">
          <div className="vault-scanner">
            {/* Anillo exterior giratorio */}
            <div className="scan-ring outer"></div>
            <div className="scan-ring inner"></div>

            {/* Escudo central con pulso */}
            <div className="central-shield">
              {accesoExitoso ? (
                <UserCheck size={100} color="#00ff9d" className="success-icon pulse-glow" />
              ) : (
                <ShieldCheck size={100} color="#00ff9d" className="spin-shield pulse-glow" />
              )}
            </div>

            {/* Texto dinámico */}
            <div className="status-text">
              {accesoExitoso ? (
                <>
                  <h1 className="success-title glitch">ACCESO CONCEDIDO</h1>
                  <p className="success-subtitle">PROTOCOLO ÉLITE AUTORIZADO</p>
                </>
              ) : (
                <>
                  <div className="typing-container">
                    <Terminal size={20} className="terminal-icon" />
                    <span className="typing-text">VERIFICANDO INTEGRIDAD CUÁNTICA...</span>
                  </div>
                  <div className="progress-container">
                    <div className="progress-bar"></div>
                  </div>
                </>
              )}
            </div>

            {/* Partículas decorativas (solo en carga) */}
            {!accesoExitoso && (
              <div className="particles">
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── CARD PRINCIPAL ─────────────────────────────────────────────────────── */}
      <div className={`bunker-card ${loading ? 'blurred' : ''}`}>
        <div className="icon-box">
          <Lock size={64} color="#333" strokeWidth={1.4} />
        </div>

        <h2 className="title">BÚNKER DE SEGURIDAD</h2>
        <p className="subtitle">ACCESO RESTRINGIDO – NIVEL ADMINISTRADOR</p>

        <form onSubmit={validarAcceso} className="form-container">
          <div className={`input-group ${error ? 'error-border' : ''}`}>
            <KeyRound size={22} color="#555" />
            <input
              type={mostrarLlave ? "text" : "password"}
              placeholder="LLAVE MAESTRA"
              value={llave}
              onChange={(e) => setLlave(e.target.value)}
              disabled={loading}
              required
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => setMostrarLlave(!mostrarLlave)}
              className="eye-btn"
              disabled={loading}
            >
              {mostrarLlave ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>

          {error && (
            <p className="error-msg">ACCESO DENEGADO – CREDENCIALES NO VÁLIDAS</p>
          )}

          <button
            type="submit"
            className="unlock-btn"
            disabled={loading}
          >
            <Zap size={20} />
            DESBLOQUEAR BÓVEDA
          </button>
        </form>
      </div>

      <style jsx>{`
        :root {
          --neon-green: #00ff9d;
          --dark-bg: #0a0a0a;
          --card-bg: #111111;
        }

        .bunker-wrapper {
          background: linear-gradient(135deg, #000 0%, #0a0a0a 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: 'Inter', system-ui, sans-serif;
          overflow: hidden;
          position: relative;
        }

        .bunker-card {
          background: var(--card-bg);
          border: 1px solid #222;
          border-radius: 24px;
          padding: 60px 40px;
          width: 100%;
          max-width: 460px;
          text-align: center;
          box-shadow: 0 0 80px rgba(0,0,0,0.9);
          transition: all 0.6s ease;
          position: relative;
          z-index: 10;
        }

        .blurred {
          filter: blur(8px) brightness(0.6);
          transform: scale(0.96);
        }

        .icon-box { margin-bottom: 32px; opacity: 0.8; }
        .title {
          color: #eee;
          font-size: 1.9rem;
          font-weight: 900;
          letter-spacing: 4px;
          margin-bottom: 8px;
        }
        .subtitle {
          color: #555;
          font-size: 0.9rem;
          letter-spacing: 2px;
          margin-bottom: 40px;
        }

        .form-container { display: flex; flex-direction: column; gap: 24px; }

        .input-group {
          background: #0d0d0d;
          border: 1px solid #222;
          border-radius: 16px;
          height: 68px;
          display: flex;
          align-items: center;
          padding: 0 24px;
          gap: 16px;
          transition: all 0.3s;
        }

        .input-group input {
          background: none;
          border: none;
          color: #ddd;
          flex: 1;
          font-size: 1.05rem;
          font-weight: 600;
          letter-spacing: 1px;
          outline: none;
        }

        .eye-btn { background: none; border: none; color: #666; cursor: pointer; }
        .eye-btn:hover { color: var(--neon-green); }

        .error-border { border-color: #ff4444 !important; }
        .error-msg {
          color: #ff5555;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 1px;
          margin: 0;
        }

        .unlock-btn {
          height: 68px;
          background: var(--neon-green);
          color: #000;
          border: none;
          border-radius: 16px;
          font-weight: 900;
          font-size: 1.1rem;
          letter-spacing: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.3s;
        }

        .unlock-btn:hover:not(:disabled) {
          background: #00ff9d;
          box-shadow: 0 0 30px rgba(0,255,157,0.4);
          transform: translateY(-2px);
        }

        .unlock-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        /* ─── OVERLAY & ANIMACIONES FUTURISTAS ────────────────────────────────────── */
        .loading-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.96);
          backdrop-filter: blur(16px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .vault-scanner {
          position: relative;
          width: 320px;
          height: 320px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 40px;
        }

        .scan-ring {
          position: absolute;
          border: 2px solid rgba(0,255,157,0.3);
          border-radius: 50%;
          opacity: 0.6;
        }

        .outer { width: 280px; height: 280px; animation: rotate 12s linear infinite; }
        .inner { width: 220px; height: 220px; animation: rotate 8s linear infinite reverse; }

        .central-shield { position: relative; z-index: 2; }

        .spin-shield { animation: spin 9s linear infinite; }
        .pulse-glow { animation: pulseGlow 2.2s ease-in-out infinite; }
        .success-icon { animation: successPulse 1.8s ease-in-out; }

        .status-text { text-align: center; z-index: 3; }
        .typing-container {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--neon-green);
          font-family: 'Courier New', monospace;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 1.5px;
        }

        .typing-text {
          overflow: hidden;
          white-space: nowrap;
          border-right: 3px solid var(--neon-green);
          animation: typing 3.2s steps(38, end) forwards, blink 0.7s step-end infinite;
        }

        .progress-container {
          width: 280px;
          height: 3px;
          background: #1a1a1a;
          border-radius: 2px;
          overflow: hidden;
          margin-top: 16px;
        }

        .progress-bar {
          width: 0;
          height: 100%;
          background: linear-gradient(90deg, transparent, var(--neon-green), transparent);
          animation: progress 3s linear forwards;
        }

        .success-title {
          font-size: 2.4rem;
          font-weight: 900;
          color: #fff;
          margin: 0 0 8px;
          text-shadow: 0 0 30px rgba(0,255,157,0.7);
        }

        .success-subtitle {
          font-size: 0.95rem;
          color: #555;
          letter-spacing: 3px;
          margin: 0;
        }

        .particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: var(--neon-green);
          border-radius: 50%;
          opacity: 0.6;
          animation: float 4s infinite ease-in-out;
        }

        .particle:nth-child(1) { top: 20%; left: 30%; animation-delay: 0s; }
        .particle:nth-child(2) { top: 40%; right: 25%; animation-delay: 1.2s; }
        .particle:nth-child(3) { bottom: 30%; left: 35%; animation-delay: 2.4s; }
        .particle:nth-child(4) { bottom: 25%; right: 20%; animation-delay: 3.6s; }

        /* Animaciones */
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(720deg); } }
        @keyframes pulseGlow { 0%,100% { opacity: 0.7; } 50% { opacity: 1; } }
        @keyframes successPulse { 0% { transform: scale(0.8); opacity: 0; } 60% { transform: scale(1.15); opacity: 1; } 100% { transform: scale(1); } }
        @keyframes typing { from { width: 0 } to { width: 100% } }
        @keyframes blink { 50% { border-color: transparent } }
        @keyframes progress { to { width: 100% } }
        @keyframes float {
          0%,100% { transform: translate(0,0); opacity: 0.4; }
          50% { transform: translate(20px, -30px); opacity: 0.9; }
        }

        /* Responsividad */
        @media (max-width: 480px) {
          .vault-scanner { width: 280px; height: 280px; }
          .outer { width: 240px; height: 240px; }
          .inner { width: 180px; height: 180px; }
          .central-shield svg { width: 80px; height: 80px; }
          .success-title { font-size: 1.9rem; }
          .bunker-card { padding: 40px 24px; }
        }
      `}</style>
    </div>
  );
}