"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, KeyRound, Zap, Loader2, Eye, EyeOff, Lock, UserCheck } from 'lucide-react';

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

    setLoading(true); // 🚀 ACTIVAMOS LA CARGA DE PANTALLA COMPLETA
    setError(false);
    setAccesoExitoso(false);

    const LLAVE_CORRECTA = "GURU2026";

    // ⏱️ SIMULACIÓN DE SEGURIDAD PROFUNDA: 3 Segundos exactos
    setTimeout(() => {
      if (llave === LLAVE_CORRECTA) {
        setAccesoExitoso(true);
        
        if (typeof window !== 'undefined') {
          // 🧹 LIMPIEZA DE SEGURIDAD
          localStorage.removeItem('socio_id');
          localStorage.removeItem('socio_nombre');
          localStorage.removeItem('socio_rol');
          localStorage.setItem('bunker_auth', LLAVE_CORRECTA);
        }

        setTimeout(() => {
          router.push('/admin'); 
        }, 1000); // Un segundo extra para disfrutar el éxito visual

      } else {
        setError(true);
        setLlave('');
        setLoading(false); // ⏹️ DESACTIVAMOS LA CARGA SI FALLA
      }
    }, 3000); 
  };

  return (
    <div className="bunker-wrapper">
      
      {/* 🎭 CAPA DE CARGA ESPECTACULAR (FULL SCREEN) */}
      {loading && (
        <div className="loading-overlay fade-in">
          <div className="loading-content">
            {accesoExitoso ? (
              // Vista de Éxito
              <div className="success-view scale-in">
                <UserCheck size={100} color="#00C853" className="glow-green-icon" />
                <h1 className="success-text">ACCESO CONCEDIDO</h1>
                <p className="sub-text">BIENVENIDO, ADMINISTRADOR</p>
              </div>
            ) : (
              // Vista de Carga
              <div className="processing-view">
                <div className="shield-spinner">
                  <ShieldCheck size={120} color="#00C853" strokeWidth={1} className="spin-slow glow-green-icon" />
                </div>
                <div className="text-typing">
                  <span>AUTENTICANDO CREDENCIALES DE ÉLITE...</span>
                </div>
                <div className="progress-bar-wrap">
                  <div className="progress-bar-fill"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* EL CARD DEL BÚNKER (Se mantiene igual, responsivo) */}
      <div className={`bunker-card ${loading ? 'blur-bg' : ''}`}>
        <div className="icon-box">
          <Lock size={60} color="#222" strokeWidth={1.5} />
        </div>

        <h2 className="title">CENTRO DE MANDO</h2>

        <form onSubmit={validarAcceso} className="form-container">
          <div className={`input-group ${error ? 'border-red' : ''}`}>
            <KeyRound size={20} color="#444" />
            <input 
              type={mostrarLlave ? "text" : "password"} 
              placeholder="LLAVE MAESTRA" 
              value={llave}
              onChange={(e) => setLlave(e.target.value)}
              disabled={loading}
              required
            />
            <button 
              type="button" 
              onClick={() => setMostrarLlave(!mostrarLlave)}
              className="eye-btn"
              disabled={loading}
            >
              {mostrarLlave ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && <p className="error-msg fade-in">ACCESO DENEGADO: LLAVE INVÁLIDA</p>}

          <button type="submit" className="unlock-btn" disabled={loading}>
            <Zap size={18} /> DESBLOQUEAR
          </button>
        </form>
      </div>

      <style jsx>{`
        .bunker-wrapper { background: #000; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; font-family: 'Inter', sans-serif; position: relative; }
        
        /* RESPONSIVIDAD 100% PARA EL CARD */
        .bunker-card { background: #050505; border: 1px solid #111; width: 100%; max-width: 420px; padding: 60px 40px; border-radius: 30px; text-align: center; box-shadow: 0 0 100px rgba(0,0,0,0.8); transition: transform 0.5s ease, filter 0.5s ease; position: relative; z-index: 1; }
        .blur-bg { filter: blur(10px); transform: scale(0.95); }
        
        .icon-box { margin-bottom: 30px; display: flex; justify-content: center; }
        .title { color: #fff; font-weight: 900; letter-spacing: 3px; font-size: 1.2rem; margin-bottom: 40px; }
        .input-group { background: #000; border: 1px solid #151515; height: 65px; border-radius: 15px; display: flex; align-items: center; padding: 0 20px; gap: 15px; transition: 0.3s; margin-bottom: 20px; }
        .border-red { border-color: #ff4444 !important; }
        .input-group input { background: none; border: none; color: #fff; width: 100%; outline: none; font-weight: 800; font-size: 1rem; letter-spacing: 4px; }
        .eye-btn { background: none; border: none; color: #333; cursor: pointer; transition: 0.2s; }
        .eye-btn:hover { color: #fff; }
        .error-msg { color: #ff4444; font-size: 10px; font-weight: 900; margin-bottom: 20px; letter-spacing: 1px; }
        .unlock-btn { width: 100%; height: 65px; background: #00C853; border: none; border-radius: 15px; color: #000; font-weight: 900; font-size: 13px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: 0.3s; }
        .unlock-btn:hover:not(:disabled) { background: #fff; transform: translateY(-3px); }
        .unlock-btn:disabled { opacity: 0.3; cursor: not-allowed; }

        /* 🎭 ESTILOS DE LA CAPA DE CARGA ESPECTACULAR */
        .loading-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.9); backdrop-filter: blur(20px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px; }
        .loading-content { text-align: center; color: #fff; width: 100%; max-width: 500px; }
        
        /* Vista de Procesando */
        .processing-view { display: flex; flex-direction: column; align-items: center; gap: 30px; }
        .shield-spinner { position: relative; margin-bottom: 20px; }
        .glow-green-icon { filter: drop-shadow(0 0 20px rgba(0,200,83,0.6)); }
        
        /* Animación del escudo girando lento */
        :global(.spin-slow) { animation: spinSlow 6s linear infinite; }
        @keyframes spinSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        /* Efecto de texto escribiendo */
        .text-typing { font-size: clamp(10px, 4vw, 12px); font-weight: 900; color: #00C853; letter-spacing: 3px; font-family: 'Courier New', monospace; white-space: nowrap; overflow: hidden; border-right: 2px solid #00C853; width: 100%; animation: typing 2.5s steps(40, end), blink-caret 0.75s step-end infinite; }
        
        @keyframes typing { from { width: 0 } to { width: 100% } }
        @keyframes blink-caret { from, to { border-color: transparent } 50% { border-color: #00C853 } }

        /* Barra de progreso sutil */
        .progress-bar-wrap { width: 100%; max-width: 300px; height: 2px; background: #111; border-radius: 2px; overflow: hidden; }
        .progress-bar-fill { width: 100%; height: 100%; background: #00C853; animation: progressLoad 3s linear forwards; transform-origin: left; }
        @keyframes progressLoad { from { transform: scaleX(0); } to { transform: scaleX(1); } }

        /* Vista de Éxito */
        .success-view { display: flex; flex-direction: column; align-items: center; gap: 15px; }
        .success-text { font-size: 2rem; font-weight: 900; color: #fff; letter-spacing: -1px; margin: 0; }
        .sub-text { font-size: 10px; font-weight: 800; color: #444; letter-spacing: 3px; }

        /* Animaciones de entrada */
        .fade-in { animation: fadeIn 0.5s ease forwards; }
        .scale-in { animation: scaleIn 0.5s ease forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }

        /* RESPONSIVIDAD PARA EL OVERLAY */
        @media (max-width: 480px) {
          .bunker-card { padding: 40px 20px; border: none; background: #000; }
          .title { font-size: 1rem; }
          .loading-content { padding: 0 10px; }
          .text-typing { letter-spacing: 1px; }
          .success-text { font-size: 1.5rem; }
        }
      `}</style>
    </div>
  );
}