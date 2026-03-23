"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, KeyRound, Zap, Loader2, Eye, EyeOff } from 'lucide-react';

export default function BunkerAdmin() {
  const [llave, setLlave] = useState('');
  const [mostrarLlave, setMostrarLlave] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accesoExitoso, setAccesoExitoso] = useState(false); // Nuevo estado para el color verde final
  const router = useRouter();

  const validarAcceso = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setAccesoExitoso(false); // Resetear estado de éxito

    // 🛡️ LLAVE MAESTRA ACTUAL
    const LLAVE_CORRECTA = "GURU2026";

    // ⏱️ SIMULACIÓN DE SEGURIDAD PROFUNDA: 3 Segundos exactos de carga
    setTimeout(() => {
      if (llave === LLAVE_CORRECTA) {
        // ✅ ACCESO CORRECTO: Activamos el color verde neón en el escudo
        setAccesoExitoso(true);
        
        if (typeof window !== 'undefined') {
          // 🧹 LIMPIEZA DE SEGURIDAD TOTAL:
          // Borramos rastros de sesiones previas para que no entre a la cuenta de MJ
          localStorage.removeItem('socio_id');
          localStorage.removeItem('socio_nombre');
          localStorage.removeItem('socio_rol');
          
          // Autorizamos el búnker de forma independiente
          localStorage.setItem('bunker_auth', LLAVE_CORRECTA);
        }

        // Pequeño delay extra para que se vea el escudo verde antes de irse
        setTimeout(() => {
            router.push('/admin'); 
        }, 500);

      } else {
        // ❌ ACCESO INCORRECTO: Activamos el color rojo
        setError(true);
        setLlave('');
        setLoading(false);
      }
    }, 3000); // <-- Los 3 segundos que pidió
  };

  // Determinamos el color del escudo dinámicamente
  const obtenerColorEscudo = () => {
    if (error) return "#ff4444"; // Rojo si falla
    if (accesoExitoso) return "#00C853"; // Verde Neón si acierta (al final)
    return "#333"; // Gris neutro por defecto mientras escribe
  };

  return (
    <div className="bunker-gate">
      <div className="bunker-card">
        <div className="bunker-icon-wrap">
          {/* El color ahora depende de la función obtenerColorEscudo */}
          <ShieldCheck size={70} color={obtenerColorEscudo()} strokeWidth={1.5} className="shield-icon" />
        </div>
        
        <h2 className="bunker-title">CENTRO DE MANDO</h2>
        
        <form onSubmit={validarAcceso} className="bunker-form">
          <div className={`bunker-input ${error ? 'err' : ''} ${accesoExitoso ? 'success' : ''}`}>
            <KeyRound size={20} color="#333" />
            <input 
              type={mostrarLlave ? "text" : "password"} 
              placeholder="LLAVE MAESTRA" 
              value={llave} 
              onChange={(e) => setLlave(e.target.value)}
              required
              disabled={loading} // Deshabilitar input mientras carga
            />
            <button 
              type="button" 
              className="btn-eye" 
              onClick={() => setMostrarLlave(!mostrarLlave)}
              title="Mostrar/Ocultar"
              disabled={loading}
            >
              {mostrarLlave ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          {error && <div className="error-text fade-in">LLAVE INCORRECTA. ACCESO DENEGADO.</div>}

          <button type="submit" className="btn-unlock" disabled={loading}>
            {/* Si está cargando, mostramos SOLO el círculo animado */}
            {loading ? <Loader2 className="spin" size={24} /> : <><Zap size={18}/> DESBLOQUEAR</>}
          </button>
        </form>
      </div>

      <style jsx>{`
        .bunker-gate { background: #000; height: 100vh; display: flex; align-items: center; justify-content: center; font-family: 'Inter', sans-serif; padding: 20px; }
        .bunker-card { background: #050505; border: 1px solid #111; padding: 60px 40px; border-radius: 28px; width: 100%; max-width: 420px; text-align: center; box-shadow: 0 0 80px rgba(0,0,0,0.5); position: relative; overflow: hidden;}
        
        {/* Efecto de brillo sutil en el card cuando hay éxito */}
        .bunker-card::after { content:''; position: absolute; inset:0; background: radial-gradient(circle at center, rgba(0,200,83,0.1) 0%, transparent 70%); opacity: ${accesoExitoso ? 1 : 0}; transition: 0.5s; }

        .bunker-icon-wrap { margin-bottom: 30px; display: flex; justify-content: center; position: relative; z-index: 2; }
        
        {/* Animación suave para el cambio de color del escudo */}
        :global(.shield-icon) { transition: color 0.3s ease, transform 0.3s ease; }
        ${accesoExitoso ? ':global(.shield-icon) { transform: scale(1.1); }' : ''}

        .bunker-title { color: #fff; font-weight: 900; letter-spacing: 2px; font-size: 1.2rem; margin-bottom: 40px; position: relative; z-index: 2;}
        .bunker-form { position: relative; z-index: 2; }
        .bunker-input { background: #000; border: 1px solid #111; border-radius: 14px; display: flex; align-items: center; padding: 0 20px; height: 65px; margin-bottom: 20px; gap: 15px; transition: 0.3s; }
        .bunker-input.err { border-color: #ff4444; background: rgba(255,68,68,0.02); }
        
        {/* Borde verde solo si la clave ya fue validada como correcta */}
        .bunker-input.success { border-color: #00C853; background: rgba(0,200,83,0.02); }

        .bunker-input input { background: none; border: none; color: #fff; width: 100%; outline: none; font-size: 1rem; font-weight: 800; letter-spacing: 2px; }
        .bunker-input input:disabled { opacity: 0.5; }
        .btn-eye { background: none; border: none; color: #333; cursor: pointer; display: flex; align-items: center; transition: 0.2s; }
        .btn-eye:hover { color: #00C853; }
        .btn-eye:disabled { cursor: not-allowed; opacity: 0.3; }
        .error-text { color: #ff4444; font-size: 10px; font-weight: 800; margin-bottom: 20px; letter-spacing: 1px; }
        .btn-unlock { width: 100%; background: #00C853; color: #000; border: none; height: 65px; border-radius: 14px; font-weight: 900; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; transition: 0.3s; }
        
        {/* Estilo del botón mientras carga (más oscuro, sin hover) */}
        .btn-unlock:disabled { background: #0a0a0a; color: #333; border: 1px solid #222; cursor: not-allowed; }
        .btn-unlock:not(:disabled):hover { background: #fff; transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,200,83,0.1); }
        
        .spin { animation: rotation 1s linear infinite; color: #00C853; }
        @keyframes rotation { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .fade-in { animation: fadeIn 0.3s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}