"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, KeyRound, Zap, Loader2, Eye, EyeOff } from 'lucide-react';

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

    // ⏱️ SIMULACIÓN DE SEGURIDAD ELITE: 3 Segundos exactos de carga
    setTimeout(() => {
      if (llave === LLAVE_CORRECTA) {
        setAccesoExitoso(true);
        
        if (typeof window !== 'undefined') {
          // 🧹 LIMPIEZA DE SEGURIDAD: Borramos rastro de Maria Jose o cualquier socio
          localStorage.removeItem('socio_id');
          localStorage.removeItem('socio_nombre');
          localStorage.removeItem('socio_rol');
          
          // Autorizamos el búnker de forma independiente
          localStorage.setItem('bunker_auth', LLAVE_CORRECTA);
        }

        // Delay visual para que el usuario vea el escudo iluminarse en verde
        setTimeout(() => {
          router.push('/admin'); 
        }, 800);

      } else {
        setError(true);
        setLlave('');
        setLoading(false); 
      }
    }, 3000); 
  };

  return (
    <div className="bunker-wrapper">
      <div className="bunker-card">
        <div className="icon-box">
          <ShieldCheck 
            size={80} 
            className={`shield-svg ${accesoExitoso ? 'glow-green' : (error ? 'glow-red' : '')}`}
            color={accesoExitoso ? "#00C853" : (error ? "#ff4444" : "#222")}
          />
        </div>

        <h2 className="title">CENTRO DE MANDO</h2>

        <form onSubmit={validarAcceso} className="form-container">
          <div className={`input-group ${error ? 'border-red' : (accesoExitoso ? 'border-green' : '')}`}>
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

          {error && <p className="error-msg">ACCESO DENEGADO: LLAVE INVÁLIDA</p>}

          <button type="submit" className="unlock-btn" disabled={loading}>
            {loading ? (
              <Loader2 className="animate-spin" size={28} color="#00C853" />
            ) : (
              <><Zap size={18} /> DESBLOQUEAR</>
            )}
          </button>
        </form>
      </div>

      <style jsx>{`
        .bunker-wrapper {
          background: #000;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: 'Inter', sans-serif;
        }
        .bunker-card {
          background: #050505;
          border: 1px solid #111;
          width: 100%;
          max-width: 420px;
          padding: 60px 40px;
          border-radius: 30px;
          text-align: center;
          box-shadow: 0 0 100px rgba(0,0,0,0.8);
          position: relative;
        }
        .icon-box { margin-bottom: 30px; display: flex; justify-content: center; }
        .shield-svg { transition: 0.5s ease; }
        .glow-green { filter: drop-shadow(0 0 15px #00C853); transform: scale(1.1); }
        .glow-red { filter: drop-shadow(0 0 10px #ff4444); }
        
        .title { color: #fff; font-weight: 900; letter-spacing: 3px; font-size: 1.2rem; margin-bottom: 40px; }
        
        .input-group {
          background: #000;
          border: 1px solid #151515;
          height: 65px;
          border-radius: 15px;
          display: flex;
          align-items: center;
          padding: 0 20px;
          gap: 15px;
          transition: 0.3s;
          margin-bottom: 20px;
        }
        .border-red { border-color: #ff4444 !important; }
        .border-green { border-color: #00C853 !important; }
        
        .input-group input {
          background: none;
          border: none;
          color: #fff;
          width: 100%;
          outline: none;
          font-weight: 800;
          font-size: 1rem;
          letter-spacing: 4px;
        }
        .eye-btn { background: none; border: none; color: #333; cursor: pointer; transition: 0.2s; }
        .eye-btn:hover { color: #fff; }

        .error-msg { color: #ff4444; font-size: 10px; font-weight: 900; margin-bottom: 20px; letter-spacing: 1px; }

        .unlock-btn {
          width: 100%;
          height: 65px;
          background: #00C853;
          border: none;
          border-radius: 15px;
          color: #000;
          font-weight: 900;
          font-size: 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: 0.3s;
        }
        .unlock-btn:hover:not(:disabled) { background: #fff; transform: translateY(-3px); }
        .unlock-btn:disabled { background: #0a0a0a; color: #222; cursor: not-allowed; border: 1px solid #111; }

        /* 🌀 ANIMACIÓN DE CARGA */
        :global(.animate-spin) { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        /* RESPONSIVIDAD 100% */
        @media (max-width: 480px) {
          .bunker-card { padding: 40px 20px; border: none; background: #000; }
          .title { font-size: 1rem; }
        }
      `}</style>
    </div>
  );
}