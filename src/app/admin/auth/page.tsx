"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, KeyRound, Zap, Loader2, Eye, EyeOff } from 'lucide-react';

export default function BunkerAdmin() {
  const [llave, setLlave] = useState('');
  const [mostrarLlave, setMostrarLlave] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validarAcceso = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    // 🛡️ LLAVE MAESTRA ACTUAL
    const LLAVE_CORRECTA = "GURU2026";

    setTimeout(() => {
      if (llave === LLAVE_CORRECTA) {
        if (typeof window !== 'undefined') {
          // 🧹 LIMPIEZA DE SEGURIDAD TOTAL:
          // Borramos rastros de sesiones previas para que no entre a la cuenta de MJ
          localStorage.removeItem('socio_id');
          localStorage.removeItem('socio_nombre');
          localStorage.removeItem('socio_rol');
          
          // Autorizamos el búnker de forma independiente
          localStorage.setItem('bunker_auth', LLAVE_CORRECTA);
        }
        router.push('/admin'); 
      } else {
        setError(true);
        setLlave('');
        setLoading(false);
      }
    }, 2000);
  };

  return (
    <div className="bunker-gate">
      <div className="bunker-card">
        <div className="bunker-icon-wrap">
          <ShieldCheck size={70} color={error ? "#ff4444" : "#00C853"} strokeWidth={1.5} />
        </div>
        
        <h2 className="bunker-title">CENTRO DE MANDO</h2>
        
        <form onSubmit={validarAcceso} className="bunker-form">
          <div className={`bunker-input ${error ? 'err' : ''}`}>
            <KeyRound size={20} color="#333" />
            <input 
              type={mostrarLlave ? "text" : "password"} 
              placeholder="LLAVE MAESTRA" 
              value={llave} 
              onChange={(e) => setLlave(e.target.value)}
              required
            />
            <button 
              type="button" 
              className="btn-eye" 
              onClick={() => setMostrarLlave(!mostrarLlave)}
              title="Mostrar/Ocultar"
            >
              {mostrarLlave ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          {error && <div className="error-text">LLAVE INCORRECTA. ACCESO DENEGADO.</div>}

          <button type="submit" className="btn-unlock" disabled={loading}>
            {loading ? <Loader2 className="spin" size={20} /> : <><Zap size={18}/> DESBLOQUEAR</>}
          </button>
        </form>
      </div>

      <style jsx>{`
        .bunker-gate { background: #000; height: 100vh; display: flex; align-items: center; justify-content: center; font-family: 'Inter', sans-serif; padding: 20px; }
        .bunker-card { background: #050505; border: 1px solid #111; padding: 60px 40px; border-radius: 28px; width: 100%; max-width: 420px; text-align: center; box-shadow: 0 0 80px rgba(0,200,83,0.05); }
        .bunker-icon-wrap { margin-bottom: 30px; display: flex; justify-content: center; }
        .bunker-title { color: #fff; font-weight: 900; letter-spacing: 2px; font-size: 1.2rem; margin-bottom: 40px; }
        .bunker-input { background: #000; border: 1px solid #111; border-radius: 14px; display: flex; align-items: center; padding: 0 20px; height: 65px; margin-bottom: 20px; gap: 15px; transition: 0.3s; }
        .bunker-input.err { border-color: #ff4444; }
        .bunker-input input { background: none; border: none; color: #fff; width: 100%; outline: none; font-size: 1rem; font-weight: 800; letter-spacing: 2px; }
        .btn-eye { background: none; border: none; color: #333; cursor: pointer; display: flex; align-items: center; transition: 0.2s; }
        .btn-eye:hover { color: #00C853; }
        .error-text { color: #ff4444; font-size: 10px; font-weight: 800; margin-bottom: 20px; letter-spacing: 1px; }
        .btn-unlock { width: 100%; background: #00C853; color: #000; border: none; height: 65px; border-radius: 14px; font-weight: 900; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: 0.3s; }
        .btn-unlock:hover { background: #fff; transform: translateY(-3px); }
        .spin { animation: rotation 1s linear infinite; }
        @keyframes rotation { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}