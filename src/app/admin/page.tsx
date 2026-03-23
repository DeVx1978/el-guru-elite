"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  ShieldCheck, Users, TrendingUp, CheckCircle, Eye, Search, 
  Menu, X, BarChart3, Bell, Image as ImageIcon, Loader2, 
  ShieldAlert, Landmark, LogOut, Trash2, Phone, Globe, DollarSign, CalendarDays
} from 'lucide-react';

const clientSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminPanel() {
  const [socios, setSocios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [accionLoading, setAccionLoading] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({ totalCapital: 0, pendientes: 0, activos: 0 });
  const [modalImagen, setModalImagen] = useState({ open: false, url: '', nombre: '' });

  const preciosPlan: {[key: string]: number} = {
    'elite': 1500, 'premium': 1000, 'activo': 500, 'inicial': 250, 'micro': 100
  };

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    setLoading(true);
    try {
        const { data } = await clientSupabase.from('socios').select('*').order('created_at', { ascending: false });
        if (data) {
          const procesados = data.map(s => ({ 
            ...s, 
            monto: preciosPlan[s.plan?.toLowerCase()] || 0,
            fecha: new Date(s.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })
          }));
          setSocios(procesados);
          const activos = procesados.filter(s => s.estado === 'activo');
          setStats({
            totalCapital: activos.reduce((acc, s) => acc + s.monto, 0),
            pendientes: procesados.filter(s => s.estado === 'pendiente').length,
            activos: activos.length
          });
        }
    } catch (err) { console.error(err); } finally { setLoading(false); }
  }

  const eliminarSocio = async (id: any, nombre: string) => {
    if (!confirm(`¿Confirmar eliminación permanente de ${nombre}?`)) return;
    setAccionLoading(id + 'delete');
    await clientSupabase.from('socios').delete().eq('id', id);
    fetchData();
    setAccionLoading(null);
  };

  const actualizarEstado = async (id: any, nuevoEstado: string) => {
    setAccionLoading(id + nuevoEstado);
    await clientSupabase.from('socios').update({ estado: nuevoEstado }).eq('id', id);
    fetchData();
    setAccionLoading(null);
  };

  return (
    <div className="admin-wrapper">
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <ShieldCheck color="#10B981" size={28} />
          <h2>GURÚ <span>CAPITAL</span></h2>
        </div>
        <nav className="admin-nav">
          <button className="active"><Users size={18}/> Portafolio de Socios</button>
          <button><Landmark size={18}/> Tesorería Central</button>
          <button><BarChart3 size={18}/> Informes</button>
        </nav>
        <button className="btn-exit" onClick={() => window.location.href='/'}><LogOut size={16}/> Cerrar Sesión</button>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div className="admin-info">
            <p>TERMINAL DE GESTIÓN</p>
            <h3>MARÍA JOSÉ</h3>
          </div>
          <div className="header-status">
            <div className="status-pill"><div className="dot"></div> EN LÍNEA</div>
          </div>
        </header>

        <div className="admin-content">
          <section className="stats-grid">
            <div className="stat-card">
              <TrendingUp color="#10B981" size={20}/>
              <div><span>AUM (CAPITAL BAJO GESTIÓN)</span><h3>${stats.totalCapital.toLocaleString()}</h3></div>
            </div>
            <div className="stat-card">
              <ShieldAlert color="#FBBF24" size={20}/>
              <div><span>SOLICITUDES PENDIENTES</span><h3>{stats.pendientes}</h3></div>
            </div>
          </section>

          <section className="table-container">
            <div className="table-header">
              <h2>Registros de <span>Inversión</span></h2>
              <div className="search-box"><Search size={16}/><input placeholder="Buscar socio..." onChange={e => setSearchTerm(e.target.value)}/></div>
            </div>
            <div className="table-scroll">
              <table className="elite-table">
                <thead>
                  <tr><th>FECHA</th><th>SOCIO</th><th>PLAN</th><th>INVERSIÓN</th><th>ESTADO</th><th>ACCIONES</th></tr>
                </thead>
                <tbody>
                  {socios.filter(s => s.nombre?.toLowerCase().includes(searchTerm.toLowerCase())).map((s) => (
                    <tr key={s.id}>
                      <td><div className="date-cell"><CalendarDays size={14} color="#333"/> {s.fecha}</div></td>
                      <td><div className="u-cell"><strong>{s.nombre}</strong><span>{s.email}</span></div></td>
                      <td><span className="plan-tag">{s.plan?.toUpperCase()}</span></td>
                      <td className="price amount-td">${s.monto.toLocaleString()}</td>
                      <td><span className={`status ${s.estado}`}>{s.estado}</span></td>
                      <td className="actions">
                        <button onClick={() => setModalImagen({open: true, url: s.comprobante_url, nombre: s.nombre})}><Eye size={14}/></button>
                        {s.estado === 'pendiente' && <button className="check" onClick={() => actualizarEstado(s.id, 'activo')}><CheckCircle size={14}/></button>}
                        <button className="trash" onClick={() => eliminarSocio(s.id, s.nombre)}><Trash2 size={14}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      {modalImagen.open && (
        <div className="modal-overlay" onClick={() => setModalImagen({open: false, url: '', nombre: ''})}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-top"><h3>Verificación de Depósito: {modalImagen.nombre}</h3><button onClick={() => setModalImagen({open: false, url: '', nombre: ''})}><X size={18}/></button></div>
            <div className="modal-img">
              {modalImagen.url ? <img src={modalImagen.url} alt="Comprobante" /> : <div className="no-pago"><ImageIcon size={48}/> <p>Documento no disponible</p></div>}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        :root { --emerald: #10B981; --bg: #000; --panel: #080808; --border: #141414; --text-primary: #E5E7EB; --text-secondary: #6B7280; --text-muted: #374151; }
        .admin-wrapper { display: flex; background: var(--bg); min-height: 100vh; color: var(--text-primary); font-family: 'Geist Sans', 'Inter', sans-serif; font-size: 14px; }
        .admin-sidebar { width: 250px; background: var(--panel); border-right: 1px solid var(--border); padding: 40px 15px; display: flex; flex-direction: column; }
        .sidebar-brand { display: flex; align-items: center; gap: 10px; margin-bottom: 50px; padding-left: 10px; }
        .sidebar-brand h2 { font-size: 13px; font-weight: 800; letter-spacing: 2px; color: var(--text-primary); }
        .sidebar-brand span { color: var(--emerald); }
        .admin-nav { flex: 1; }
        .admin-nav button { width: 100%; padding: 12px 15px; background: none; border: none; color: var(--text-secondary); display: flex; align-items: center; gap: 12px; cursor: pointer; font-weight: 600; font-size: 13px; transition: 0.2s; border-radius: 8px; text-align: left; }
        .admin-nav button:hover { color: var(--text-primary); background: #0a0a0a; }
        .admin-nav button.active { color: var(--emerald); background: rgba(16, 185, 129, 0.04); }
        .btn-exit { background: none; border: none; color: var(--text-muted); padding: 15px; cursor: pointer; display: flex; align-items: center; gap: 10px; font-weight: 600; font-size: 12px; border-radius: 8px; }
        .btn-exit:hover { color: #EF4444; background: rgba(239, 68, 68, 0.04); }
        .admin-main { flex: 1; display: flex; flex-direction: column; }
        .admin-header { height: 80px; padding: 0 40px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; background: var(--panel); }
        .admin-info p { font-size: 10px; color: var(--text-muted); letter-spacing: 1.5px; font-weight: 700; }
        .admin-info h3 { color: var(--text-primary); font-size: 18px; font-weight: 800; }
        .status-pill { background: #000; padding: 6px 12px; border-radius: 6px; font-size: 10px; color: var(--text-secondary); font-weight: 700; display: flex; align-items: center; gap: 6px; border: 1px solid var(--border); }
        .dot { width: 6px; height: 6px; background: var(--emerald); border-radius: 50%; animation: pulse 2s infinite; }
        .admin-content { padding: 40px; }
        .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
        .stat-card { background: var(--panel); border: 1px solid var(--border); padding: 25px; border-radius: 12px; display: flex; align-items: center; gap: 20px; }
        .stat-card span { font-size: 10px; color: var(--text-secondary); font-weight: 700; letter-spacing: 1px; }
        .stat-card h3 { font-size: 28px; font-weight: 800; color: var(--text-primary); }
        .stat-card.warning { border-left: 2px solid #FBBF24; }
        .table-container { background: var(--panel); border: 1px solid var(--border); border-radius: 12px; padding: 30px; }
        .table-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
        .search-box { background: #000; border: 1px solid var(--border); padding: 8px 15px; border-radius: 8px; display: flex; align-items: center; gap: 10px; width: 300px; }
        .search-box input { background: none; border: none; color: var(--text-primary); outline: none; font-size: 13px; width: 100%; }
        .search-box input::placeholder { color: var(--text-muted); }
        .elite-table { width: 100%; border-collapse: collapse; }
        th { text-align: left; padding: 12px 15px; font-size: 10px; color: var(--text-muted); text-transform: uppercase; border-bottom: 1px solid var(--border); font-weight: 700; letter-spacing: 1px; }
        td { padding: 18px 15px; border-bottom: 1px solid #0a0a0a; font-size: 13px; color: var(--text-secondary); }
        .date-cell { display: flex; align-items: center; gap: 8px; color: var(--text-muted); font-size: 12px; font-weight: 600; }
        .u-cell strong { display: block; font-size: 14px; color: var(--text-primary); }
        .u-cell span { font-size: 12px; color: var(--text-secondary); }
        .plan-tag { background: #000; border: 1px solid var(--border); color: var(--emerald); padding: 4px 10px; border-radius: 6px; font-size: 10px; font-weight: 700; }
        .price { font-weight: 700; color: var(--text-primary); font-family: 'SF Mono', 'JetBrains Mono', monospace; }
        .status { font-weight: 700; font-size: 11px; text-transform: uppercase; }
        .status.activo { color: var(--emerald); }
        .status.pendiente { color: #FBBF24; }
        .actions { display: flex; gap: 8px; justify-content: flex-end;}
        .actions button { background: #000; border: 1px solid var(--border); color: var(--text-secondary); width: 32px; height: 32px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
        .actions button:hover { color: var(--text-primary); border-color: var(--text-muted); background: #0a0a0a; }
        .actions button.check:hover { color: var(--emerald); border-color: rgba(16, 185, 129, 0.2); background: rgba(16, 185, 129, 0.04); }
        .actions button.trash:hover { color: #EF4444; border-color: rgba(239, 68, 68, 0.2); background: rgba(239, 68, 68, 0.04); }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.9); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 3000; }
        .modal-card { background: var(--panel); border: 1px solid var(--border); border-radius: 12px; width: 90%; max-width: 500px; padding: 25px; }
        .modal-top { display: flex; justify-content: space-between; margin-bottom: 20px; align-items: center; }
        .modal-top h3 { font-size: 14px; font-weight: 700; color: var(--text-primary); }
        .modal-top button { background: none; border: none; color: var(--text-muted); cursor: pointer; }
        .modal-top button:hover { color: var(--text-primary); }
        .modal-img img { width: 100%; border-radius: 8px; border: 1px solid var(--border); box-shadow: 0 10px 40px rgba(0,0,0,0.5); }
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.4; } 100% { opacity: 1; } }
      `}</style>
    </div>
  );
}