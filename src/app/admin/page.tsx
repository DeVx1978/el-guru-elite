"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  ShieldCheck, Users, TrendingUp, CheckCircle, Eye, Search, 
  Menu, X, BarChart3, Bell, Image as ImageIcon, Loader2, 
  ShieldAlert, Landmark, LogOut, Trash2, Phone, Globe, DollarSign
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
          const procesados = data.map(s => ({ ...s, monto: preciosPlan[s.plan?.toLowerCase()] || 0 }));
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
    if (!confirm(`¿ESTÁ SEGURO? Esta acción eliminará a ${nombre} permanentemente de la Bóveda.`)) return;
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
      {/* SIDEBAR DE LUJO */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <ShieldCheck color="#00C853" size={32} />
          <h2>GURÚ <span>ÉLITE</span></h2>
        </div>
        <nav className="admin-nav">
          <button className="active"><Users size={20}/> Gestión Maestra</button>
          <button><Landmark size={20}/> Bóveda Central</button>
          <button><BarChart3 size={20}/> Auditoría</button>
        </nav>
        <button className="btn-exit" onClick={() => window.location.href='/'}><LogOut size={18}/> Salir</button>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div className="admin-info">
            <p>SISTEMA DE CONTROL</p>
            <h3>MARÍA JOSÉ</h3>
          </div>
          <div className="header-status">
            <div className="status-pill"><div className="dot"></div> SISTEMA ACTIVO</div>
          </div>
        </header>

        <div className="admin-content">
          <section className="stats-grid">
            <div className="stat-card">
              <TrendingUp color="#00C853" size={24}/>
              <div><span>CAPITAL GESTIONADO</span><h3>${stats.totalCapital.toLocaleString()}</h3></div>
            </div>
            <div className="stat-card warning">
              <ShieldAlert color="#ffbb00" size={24}/>
              <div><span>PENDIENTES</span><h3>{stats.pendientes}</h3></div>
            </div>
          </section>

          <section className="table-container">
            <div className="table-header">
              <h2>Listado de <span>Socios</span></h2>
              <div className="search-box"><Search size={18}/><input placeholder="Filtrar por nombre..." onChange={e => setSearchTerm(e.target.value)}/></div>
            </div>
            <div className="table-scroll">
              <table className="elite-table">
                <thead>
                  <tr><th>SOCIO</th><th>PLAN</th><th>INVERSIÓN</th><th>ESTADO</th><th>ACCIONES</th></tr>
                </thead>
                <tbody>
                  {socios.filter(s => s.nombre?.toLowerCase().includes(searchTerm.toLowerCase())).map((s) => (
                    <tr key={s.id}>
                      <td><div className="u-cell"><strong>{s.nombre}</strong><span>{s.email}</span></div></td>
                      <td><span className="plan-tag">{s.plan?.toUpperCase()}</span></td>
                      <td className="price">${s.monto.toLocaleString()}</td>
                      <td><span className={`status ${s.estado}`}>{s.estado}</span></td>
                      <td className="actions">
                        <button onClick={() => setModalImagen({open: true, url: s.comprobante_url, nombre: s.nombre})}><Eye size={16}/></button>
                        {s.estado === 'pendiente' && <button className="check" onClick={() => actualizarEstado(s.id, 'activo')}><CheckCircle size={16}/></button>}
                        <button className="trash" onClick={() => eliminarSocio(s.id, s.nombre)}><Trash2 size={16}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      {/* VISOR DE COMPROBANTES IMPECABLE */}
      {modalImagen.open && (
        <div className="modal-overlay" onClick={() => setModalImagen({open: false, url: '', nombre: ''})}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <div className="modal-top"><h3>Comprobante de {modalImagen.nombre}</h3><button onClick={() => setModalImagen({open: false, url: '', nombre: ''})}><X/></button></div>
            <div className="modal-img">
              {modalImagen.url ? <img src={modalImagen.url} alt="Pago" /> : <div className="no-pago"><ImageIcon size={48}/> <p>Sin imagen cargada</p></div>}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        :root { --neon: #00C853; --dark: #000; --panel: #050505; --border: #111; }
        .admin-wrapper { display: flex; background: var(--dark); min-height: 100vh; color: #fff; font-family: 'Inter', sans-serif; }
        .admin-sidebar { width: 260px; background: var(--panel); border-right: 1px solid var(--border); padding: 40px 20px; display: flex; flex-direction: column; }
        .sidebar-brand { display: flex; align-items: center; gap: 12px; margin-bottom: 50px; }
        .sidebar-brand h2 { font-size: 14px; font-weight: 900; letter-spacing: 2px; }
        .sidebar-brand span { color: var(--neon); }
        .admin-nav { flex: 1; }
        .admin-nav button { width: 100%; padding: 15px; background: none; border: none; color: #444; display: flex; align-items: center; gap: 15px; cursor: pointer; font-weight: bold; transition: 0.3s; }
        .admin-nav button.active { color: var(--neon); background: rgba(0,200,83,0.05); border-radius: 12px; }
        .btn-exit { background: none; border: none; color: #444; padding: 20px; cursor: pointer; display: flex; align-items: center; gap: 10px; font-weight: bold; }
        .admin-main { flex: 1; display: flex; flex-direction: column; }
        .admin-header { height: 90px; padding: 0 50px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
        .admin-info p { font-size: 10px; color: #333; letter-spacing: 2px; font-weight: 900; }
        .admin-info h3 { color: var(--neon); font-size: 22px; font-weight: 900; }
        .status-pill { background: #080808; padding: 8px 15px; border-radius: 20px; font-size: 10px; color: #444; font-weight: 900; display: flex; align-items: center; gap: 8px; border: 1px solid var(--border); }
        .dot { width: 8px; height: 8px; background: var(--neon); border-radius: 50%; box-shadow: 0 0 10px var(--neon); animation: blink 2s infinite; }
        .admin-content { padding: 40px 50px; }
        .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-bottom: 40px; }
        .stat-card { background: var(--panel); border: 1px solid var(--border); padding: 30px; border-radius: 25px; display: flex; align-items: center; gap: 25px; }
        .stat-card span { font-size: 11px; color: #333; font-weight: 900; }
        .stat-card h3 { font-size: 32px; font-weight: 900; }
        .table-container { background: var(--panel); border: 1px solid var(--border); border-radius: 30px; padding: 35px; }
        .table-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .search-box { background: #000; border: 1px solid var(--border); padding: 10px 20px; border-radius: 15px; display: flex; align-items: center; gap: 10px; }
        .search-box input { background: none; border: none; color: #fff; outline: none; }
        .elite-table { width: 100%; border-collapse: collapse; }
        th { text-align: left; padding: 15px; font-size: 11px; color: #222; text-transform: uppercase; border-bottom: 1px solid var(--border); }
        td { padding: 25px 15px; border-bottom: 1px solid #080808; font-size: 14px; }
        .u-cell strong { display: block; font-size: 15px; }
        .u-cell span { font-size: 12px; color: #444; }
        .plan-tag { background: #000; border: 1px solid var(--border); color: var(--neon); padding: 5px 12px; border-radius: 8px; font-size: 10px; font-weight: 900; }
        .price { font-weight: 900; color: var(--neon); font-family: 'JetBrains Mono', monospace; }
        .status.activo { color: var(--neon); }
        .status.pendiente { color: #ffbb00; }
        .actions { display: flex; gap: 12px; }
        .actions button { background: #080808; border: 1px solid var(--border); color: #fff; width: 38px; height: 38px; border-radius: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.3s; }
        .actions button:hover { background: #fff; color: #000; }
        .actions button.trash:hover { background: #ff4444; color: #fff; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.95); display: flex; align-items: center; justify-content: center; z-index: 3000; }
        .modal-card { background: var(--panel); border: 1px solid var(--border); border-radius: 30px; width: 90%; max-width: 500px; padding: 30px; }
        .modal-top { display: flex; justify-content: space-between; margin-bottom: 20px; }
        .modal-img img { width: 100%; border-radius: 20px; box-shadow: 0 20px 50px rgba(0,0,0,1); }
        @keyframes blink { 50% { opacity: 0.3; } }
      `}</style>
    </div>
  );
}