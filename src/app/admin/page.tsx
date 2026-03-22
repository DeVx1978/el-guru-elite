"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { 
  Users, Wallet, ArrowDownCircle, CheckCircle2, XCircle, 
  ShieldCheck, Search, Filter, MoreVertical, ExternalLink,
  TrendingUp, AlertTriangle, LogOut, LayoutDashboard
} from 'lucide-react';

const clientSupabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function AdminPanel() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [socios, setSocios] = useState<any[]>([]);
  const [retiros, setRetiros] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalCapital: 0, sociosActivos: 0, retirosPendientes: 0 });
  const [tab, setTab] = useState('retiros'); // 'retiros' o 'socios'

  useEffect(() => {
    const rol = localStorage.getItem('socio_rol');
    if (rol !== 'admin') {
      router.push('/panel'); // Protección: Si no es admin, fuera.
    } else {
      cargarDatosMaster();
    }
  }, []);

  const cargarDatosMaster = async () => {
    setLoading(true);
    try {
      // 1. Obtener Socios y sus capitales
      const { data: dataSocios } = await clientSupabase.from('socios_elite').select('*, socios(nombre)');
      // 2. Obtener Retiros Pendientes
      const { data: dataRetiros } = await clientSupabase.from('retiros').select('*, socios(nombre)').order('created_at', { ascending: false });
      
      if (dataSocios) {
        const capital = dataSocios.reduce((acc, curr) => acc + Number(curr.inversion_minima), 0);
        setSocios(dataSocios);
        setStats(prev => ({ ...prev, totalCapital: capital, sociosActivos: dataSocios.length }));
      }
      if (dataRetiros) {
        setRetiros(dataRetiros);
        const pendientes = dataRetiros.filter(r => r.estado === 'pendiente').length;
        setStats(prev => ({ ...prev, retirosPendientes: pendientes }));
      }
    } catch (error) {
      console.error("Error cargando administración:", error);
    } finally {
      setLoading(false);
    }
  };

  const gestionarRetiro = async (id: string, nuevoEstado: 'completado' | 'rechazado') => {
    const { error } = await clientSupabase
      .from('retiros')
      .update({ estado: nuevoEstado })
      .eq('id', id);
    
    if (!error) {
      alert(`Retiro ${nuevoEstado} con éxito.`);
      cargarDatosMaster();
    }
  };

  if (loading) return <div className="admin-loader">INICIALIZANDO BÓVEDA MAESTRA...</div>;

  return (
    <div className="admin-layout">
      {/* Sidebar Admin */}
      <aside className="admin-sidebar">
        <div className="brand">GURÚ <span>ADMIN</span></div>
        <nav>
          <div className={`nav-item ${tab === 'retiros' ? 'active' : ''}`} onClick={() => setTab('retiros')}><ArrowDownCircle size={20}/> Retiros</div>
          <div className={`nav-item ${tab === 'socios' ? 'active' : ''}`} onClick={() => setTab('socios')}><Users size={20}/> Socios</div>
        </nav>
        <button className="btn-exit" onClick={() => router.push('/panel')}><LogOut size={18}/> VOLVER AL PANEL</button>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>Torre de Control <span>Élite</span></h1>
          <div className="admin-badges">
            <div className="badge-item"><span>CAPITAL TOTAL</span><strong>${stats.totalCapital.toLocaleString()}</strong></div>
            <div className="badge-item"><span>SOCIOS</span><strong>{stats.sociosActivos}</strong></div>
            <div className="badge-item red"><span>PENDIENTES</span><strong>{stats.retirosPendientes}</strong></div>
          </div>
        </header>

        <section className="content-area">
          {tab === 'retiros' ? (
            <div className="admin-card">
              <div className="card-header"><h3>Solicitudes de Retiro</h3><Filter size={18}/></div>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Socio</th>
                    <th>Monto</th>
                    <th>Método / Detalles</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {retiros.map((r) => (
                    <tr key={r.id}>
                      <td>{r.socios?.nombre || 'ID: '+r.id_socio}</td>
                      <td className="text-neon">${r.monto}</td>
                      <td className="text-small">{r.billetera}</td>
                      <td><span className={`status-tag ${r.estado}`}>{r.estado}</span></td>
                      <td className="actions">
                        {r.estado === 'pendiente' && (
                          <>
                            <button onClick={() => gestionarRetiro(r.id, 'completado')} className="btn-approve"><CheckCircle2 size={16}/></button>
                            <button onClick={() => gestionarRetiro(r.id, 'rechazado')} className="btn-reject"><XCircle size={16}/></button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="admin-card">
              <div className="card-header"><h3>Listado de Inversores</h3><Search size={18}/></div>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Socio</th>
                    <th>País</th>
                    <th>Teléfono</th>
                    <th>Capital</th>
                    <th>Nivel</th>
                  </tr>
                </thead>
                <tbody>
                  {socios.map((s) => (
                    <tr key={s.id}>
                      <td>{s.socios?.nombre}</td>
                      <td>{s.pais}</td>
                      <td>{s.telefono || 'N/A'}</td>
                      <td>${Number(s.inversion_minima).toLocaleString()}</td>
                      <td><span className="rank-tag">{s.nivel_socio}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      <style jsx>{`
        .admin-layout { display: flex; background: #000; min-height: 100vh; color: #fff; font-family: 'Inter', sans-serif; }
        .admin-sidebar { width: 260px; background: #050505; border-right: 1px solid #111; padding: 40px 20px; display: flex; flex-direction: column; }
        .brand { font-weight: 900; font-size: 1.5rem; margin-bottom: 50px; }
        .brand span { color: #00C853; }
        .nav-item { padding: 15px; cursor: pointer; color: #444; display: flex; gap: 12px; font-weight: 700; transition: 0.3s; }
        .nav-item.active, .nav-item:hover { color: #00C853; background: rgba(0, 200, 83, 0.05); border-radius: 10px; }
        .btn-exit { margin-top: auto; background: #111; border: none; color: #555; padding: 15px; border-radius: 10px; cursor: pointer; display: flex; gap: 10px; font-weight: 800; }
        
        .admin-main { flex: 1; padding: 40px; }
        .admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
        .admin-header h1 span { color: #00C853; }
        .admin-badges { display: flex; gap: 20px; }
        .badge-item { background: #050505; border: 1px solid #111; padding: 15px 25px; border-radius: 15px; display: flex; flex-direction: column; }
        .badge-item span { font-size: 10px; color: #444; font-weight: 900; letter-spacing: 1px; }
        .badge-item strong { font-size: 1.2rem; color: #00C853; }
        .badge-item.red strong { color: #ff4444; }

        .admin-card { background: #050505; border: 1px solid #111; border-radius: 20px; padding: 30px; }
        .card-header { display: flex; justify-content: space-between; margin-bottom: 25px; align-items: center; }
        .admin-table { width: 100%; border-collapse: collapse; }
        .admin-table th { text-align: left; color: #333; font-size: 12px; padding: 15px; text-transform: uppercase; }
        .admin-table td { padding: 15px; border-bottom: 1px solid #0a0a0a; font-size: 14px; }
        .text-neon { color: #00C853; font-weight: 800; }
        .text-small { font-size: 11px; color: #444; }
        
        .status-tag { padding: 4px 10px; border-radius: 6px; font-size: 10px; font-weight: 900; text-transform: uppercase; }
        .status-tag.pendiente { background: rgba(255, 152, 0, 0.1); color: #ffb74d; }
        .status-tag.completado { background: rgba(0, 200, 83, 0.1); color: #00C853; }
        
        .actions { display: flex; gap: 10px; }
        .btn-approve { background: none; border: 1px solid #00C853; color: #00C853; border-radius: 5px; padding: 5px; cursor: pointer; }
        .btn-reject { background: none; border: 1px solid #ff4444; color: #ff4444; border-radius: 5px; padding: 5px; cursor: pointer; }
        
        .rank-tag { background: #111; padding: 4px 10px; border-radius: 20px; font-size: 10px; font-weight: 800; }
        .admin-loader { background: #000; height: 100vh; display: flex; justify-content: center; align-items: center; color: #00C853; font-weight: 900; letter-spacing: 4px; }
      `}</style>
    </div>
  );
}