"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { 
  Users, Wallet, ArrowDownCircle, CheckCircle2, XCircle, 
  ShieldCheck, Search, Filter, Globe, Smartphone, MapPin,
  TrendingUp, LogOut, Bell
} from 'lucide-react';

const clientSupabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function AdminPanel() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [socios, setSocios] = useState<any[]>([]);
  const [retiros, setRetiros] = useState<any[]>([]);
  const [tab, setTab] = useState('retiros');
  const [stats, setStats] = useState({ totalCapital: 0, sociosActivos: 0, retirosPendientes: 0 });

  useEffect(() => {
    const rol = localStorage.getItem('socio_rol');
    if (rol !== 'admin') {
      router.push('/panel'); 
    } else {
      cargarDatosMaster();
    }
  }, [router]);

  const cargarDatosMaster = async () => {
    setLoading(true);
    try {
      // 1. Carga de datos crudos
      const { data: eliteData } = await clientSupabase.from('socios_elite').select('*');
      const { data: baseSocios } = await clientSupabase.from('socios').select('id, nombre');
      const { data: dataRetiros } = await clientSupabase.from('retiros').select('*').order('created_at', { ascending: false });

      if (eliteData && baseSocios) {
        // Unión manual de tablas para asegurar el nombre
        const sociosCombinados = eliteData.map(elite => ({
          ...elite,
          nombre_socio: baseSocios.find(s => s.id === elite.id_socio)?.nombre || 'Socio Sin Nombre'
        }));

        const capital = eliteData.reduce((acc, curr) => acc + Number(curr.inversion_minima || 0), 0);
        setSocios(sociosCombinados);
        setStats(prev => ({ 
          ...prev, 
          totalCapital: capital, 
          sociosActivos: eliteData.length 
        }));
      }

      if (dataRetiros) {
        setRetiros(dataRetiros);
        setStats(prev => ({ ...prev, retirosPendientes: dataRetiros.filter(r => r.estado === 'pendiente').length }));
      }
    } catch (error) {
      console.error("Error Admin:", error);
    } finally {
      setLoading(false);
    }
  };

  const gestionarRetiro = async (id: string, nuevoEstado: 'completado' | 'rechazado') => {
    const { error } = await clientSupabase.from('retiros').update({ estado: nuevoEstado }).eq('id', id);
    if (!error) { alert(`Solicitud ${nuevoEstado}`); cargarDatosMaster(); }
  };

  if (loading) return <div className="admin-loader">ESTABLECIENDO CONEXIÓN ÉLITE...</div>;

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="brand">GURÚ <span>ADMIN</span></div>
        <nav>
          <div className={`nav-item ${tab === 'retiros' ? 'active' : ''}`} onClick={() => setTab('retiros')}><ArrowDownCircle size={20}/> Retiros</div>
          <div className={`nav-item ${tab === 'socios' ? 'active' : ''}`} onClick={() => setTab('socios')}><Users size={20}/> Socios</div>
        </nav>
        <button className="btn-exit" onClick={() => router.push('/panel')}><LogOut size={18}/> PANEL SOCIO</button>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>Consola de Mando</h1>
          <div className="admin-badges">
            <div className="badge-item"><span>CAPITAL TOTAL</span><strong>${stats.totalCapital.toLocaleString()}</strong></div>
            <div className="badge-item"><span>SOCIOS</span><strong>{stats.sociosActivos}</strong></div>
            <div className="badge-item red"><span>PENDIENTES</span><strong>{stats.retirosPendientes}</strong></div>
          </div>
        </header>

        <section className="content-area">
          {tab === 'retiros' ? (
            <div className="admin-card">
              <h3>Gestión de Pagos</h3>
              <table className="admin-table">
                <thead><tr><th>Socio</th><th>Monto</th><th>Billetera</th><th>Estado</th><th>Acciones</th></tr></thead>
                <tbody>
                  {retiros.map((r) => (
                    <tr key={r.id}>
                      <td>{socios.find(s => s.id_socio === r.id_socio)?.nombre_socio || 'ID: ' + r.id_socio}</td>
                      <td className="text-neon">${r.monto}</td>
                      <td className="text-small">{r.billetera}</td>
                      <td><span className={`status-tag ${r.estado}`}>{r.estado}</span></td>
                      <td>
                        {r.estado === 'pendiente' && (
                          <div className="btn-group">
                            <button onClick={() => gestionarRetiro(r.id, 'completado')} className="btn-approve">OK</button>
                            <button onClick={() => gestionarRetiro(r.id, 'rechazado')} className="btn-reject">X</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="admin-card">
              <h3>Cartera de Clientes</h3>
              <table className="admin-table">
                <thead><tr><th>Nombre</th><th>Ubicación</th><th>Capital</th><th>Rango</th></tr></thead>
                <tbody>
                  {socios.map((s) => (
                    <tr key={s.id}>
                      <td>{s.nombre_socio}</td>
                      <td>{s.pais} / {s.ciudad || 'N/A'}</td>
                      <td>${Number(s.inversion_minima).toLocaleString()}</td>
                      <td><span className="rank-tag">{s.nivel_socio}</span></td>
                    </tr>
                  ))}
                </tbody>
              </tbody>
            </div>
          )}
        </section>
      </main>

      <style jsx>{`
        .admin-layout { display: flex; background: #000; min-height: 100vh; color: #fff; font-family: sans-serif; }
        .admin-sidebar { width: 260px; background: #050505; border-right: 1px solid #111; padding: 40px 20px; display: flex; flex-direction: column; }
        .brand { font-weight: 900; font-size: 1.5rem; margin-bottom: 50px; }
        .brand span { color: #00C853; }
        .nav-item { padding: 15px; cursor: pointer; color: #444; display: flex; gap: 12px; font-weight: 700; transition: 0.3s; }
        .nav-item.active { color: #00C853; background: rgba(0,200,83,0.05); border-radius: 10px; }
        .btn-exit { margin-top: auto; background: #111; border: none; color: #555; padding: 15px; border-radius: 10px; cursor: pointer; font-weight: 800; }
        .admin-main { flex: 1; padding: 40px; }
        .admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
        .admin-badges { display: flex; gap: 20px; }
        .badge-item { background: #050505; border: 1px solid #111; padding: 15px; border-radius: 15px; display: flex; flex-direction: column; min-width: 150px; }
        .badge-item span { font-size: 10px; color: #444; font-weight: 900; }
        .badge-item strong { font-size: 1.2rem; color: #00C853; }
        .badge-item.red strong { color: #ff4444; }
        .admin-card { background: #050505; border: 1px solid #111; border-radius: 20px; padding: 30px; }
        .admin-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .admin-table th { text-align: left; color: #333; font-size: 12px; padding: 15px; border-bottom: 1px solid #111; }
        .admin-table td { padding: 15px; border-bottom: 1px solid #0a0a0a; font-size: 14px; }
        .text-neon { color: #00C853; font-weight: 800; }
        .text-small { font-size: 11px; color: #444; }
        .status-tag { padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: 900; text-transform: uppercase; }
        .status-tag.pendiente { background: rgba(255, 152, 0, 0.1); color: #ffb74d; }
        .status-tag.completado { background: rgba(0, 200, 83, 0.1); color: #00C853; }
        .btn-group { display: flex; gap: 8px; }
        .btn-approve { background: #00C853; color: #000; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-weight: bold; }
        .btn-reject { background: #ff4444; color: #fff; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-weight: bold; }
        .rank-tag { background: #111; padding: 4px 10px; border-radius: 20px; font-size: 10px; font-weight: 800; }
        .admin-loader { background: #000; height: 100vh; display: flex; justify-content: center; align-items: center; color: #00C853; font-weight: 900; }
      `}</style>
    </div>
  );
}