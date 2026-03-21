"use client";
import React, { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { 
  Users, ShieldCheck, CheckCircle, XCircle, Search, 
  Lock, ArrowLeft, RefreshCw, Mail, User
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminBunker() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [inversores, setInversores] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- 1. RECONEXIÓN CON LA TABLA 'SOCIOS' ---
  const fetchSocios = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('socios') // Tabla exacta de tu captura
      .select('id, nombre, email, password') 
      .order('id', { ascending: true });

    if (error) {
      console.error("Error en el búnker:", error.message);
    } else {
      setInversores(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSocios();
  }, []);

  return (
    <div className="admin-master-container">
      <nav className="top-command-bar">
        <div className="brand-admin">
          <Lock size={18} color="#00C853" />
          <span>GURÚ ÉLITE <span className="tag-admin">SISTEMA CENTRAL</span></span>
        </div>
        <div className="nav-actions">
          <button onClick={fetchSocios} className="btn-refresh">
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            ACTUALIZAR DATOS
          </button>
          <button onClick={() => router.push('/')} className="back-to-web">
            <ArrowLeft size={14} /> SITIO PÚBLICO
          </button>
        </div>
      </nav>

      <main className="dashboard-layout">
        <section className="content-vault">
          <header className="content-header">
            <h1>Control Maestro de Socios</h1>
            <p>Visualización directa de la tabla <span className="neon-text">public.socios</span> en Supabase</p>
          </header>

          <div className="table-wrapper">
            <table className="management-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th><User size={12} /> NOMBRE COMPLETO</th>
                  <th><Mail size={12} /> CORREO ELECTRÓNICO</th>
                  <th>CONTRASEÑA (SISTEMA)</th>
                  <th>ESTADO DE ACCESO</th>
                </tr>
              </thead>
              <tbody>
                {inversores.map((socio) => (
                  <tr key={socio.id}>
                    <td className="id-cell">#{socio.id}</td>
                    <td className="bold-white">{socio.nombre}</td>
                    <td className="email-cell">{socio.email}</td>
                    <td className="pass-cell"><code>{socio.password}</code></td>
                    <td>
                      <div className="action-group">
                        <span className="status-pill active">AUTORIZADO</span>
                        <button className="btn-manage">GESTIONAR</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {inversores.length === 0 && !loading && (
              <div className="empty-state text-glow">
                Sincronizando con Supabase... Verifica la conexión.
              </div>
            )}
          </div>
        </section>
      </main>

      <style jsx global>{`
        .admin-master-container { background: #000; min-height: 100vh; color: #fff; font-family: 'Inter', sans-serif; }
        .top-command-bar { display: flex; justify-content: space-between; padding: 20px 40px; border-bottom: 1px solid #111; background: #050505; align-items: center; }
        .brand-admin { display: flex; align-items: center; gap: 12px; font-weight: 900; letter-spacing: 1px; }
        .tag-admin { background: #00C853; color: #000; font-size: 10px; padding: 2px 8px; border-radius: 3px; font-weight: 900; }
        .nav-actions { display: flex; gap: 20px; }
        
        .btn-refresh { background: rgba(0, 200, 83, 0.1); border: 1px solid #00C853; color: #00C853; padding: 10px 18px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 10px; font-size: 11px; font-weight: 800; }
        .back-to-web { background: transparent; border: 1px solid #222; color: #666; padding: 10px 18px; border-radius: 6px; cursor: pointer; font-size: 11px; display: flex; align-items: center; gap: 8px; font-weight: 800; }
        
        .dashboard-layout { padding: 60px 40px; max-width: 1400px; margin: 0 auto; }
        .content-header h1 { font-size: 32px; font-weight: 900; letter-spacing: -1px; margin-bottom: 10px; }
        .content-header p { color: #555; font-size: 15px; }
        .neon-text { color: #00C853; font-weight: 800; }

        .table-wrapper { background: #080808; border: 1px solid #111; border-radius: 20px; overflow: hidden; margin-top: 40px; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
        .management-table { width: 100%; border-collapse: collapse; text-align: left; }
        .management-table th { background: #0c0c0c; padding: 20px; font-size: 11px; color: #444; text-transform: uppercase; letter-spacing: 2px; font-weight: 900; border-bottom: 1px solid #111; }
        .management-table td { padding: 25px 20px; border-bottom: 1px solid #111; font-size: 14px; color: #999; }
        
        .id-cell { color: #00C853; font-weight: 800; font-family: monospace; }
        .bold-white { color: #fff; font-weight: 800; font-size: 15px; }
        .email-cell { color: #00E5FF; text-decoration: underline; opacity: 0.8; }
        .pass-cell code { background: #111; padding: 4px 8px; border-radius: 4px; color: #666; font-size: 12px; }

        .status-pill { padding: 6px 14px; border-radius: 6px; font-size: 10px; font-weight: 900; letter-spacing: 1px; }
        .status-pill.active { background: rgba(0, 200, 83, 0.1); color: #00C853; border: 1px solid rgba(0, 200, 83, 0.2); }
        
        .action-group { display: flex; align-items: center; gap: 20px; }
        .btn-manage { background: #111; border: 1px solid #222; color: #fff; padding: 8px 16px; border-radius: 6px; font-size: 11px; font-weight: 800; cursor: pointer; transition: 0.3s; }
        .btn-manage:hover { background: #fff; color: #000; }

        .empty-state { padding: 100px; text-align: center; color: #333; font-weight: 800; font-size: 18px; text-transform: uppercase; letter-spacing: 4px; }
        .text-glow { text-shadow: 0 0 20px rgba(255,255,255,0.1); }
        .animate-spin { animation: spin 2s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}