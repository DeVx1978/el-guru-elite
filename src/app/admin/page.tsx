"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  ShieldCheck, Users, TrendingUp, CheckCircle, Eye, Search, 
  Menu, X, BarChart3, Bell, Image as ImageIcon, Loader2, 
  ShieldAlert, Landmark, LogOut, Phone, Globe
} from 'lucide-react';

const clientSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminPanel() {
  const [socios, setSocios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({ totalCapital: 0, pendientes: 0, activos: 0 });
  const [modalImagen, setModalImagen] = useState({ open: false, url: '', nombre: '' });

  // Valores de inversión según el plan registrado en la captura 642
  const preciosPlan: {[key: string]: number} = {
    'elite': 1500,
    'premium': 1000,
    'activo': 500,
    'inicial': 250,
    'micro': 100
  };

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    setLoading(true);
    try {
        const { data, error } = await clientSupabase
          .from('socios')
          .select('*')
          .order('created_at', { ascending: false });

        if (data) {
          const procesados = data.map(s => ({
            ...s,
            monto: preciosPlan[s.plan?.toLowerCase()] || 0
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

  const actualizarEstado = async (id: any, nuevoEstado: string) => {
    await clientSupabase.from('socios').update({ estado: nuevoEstado }).eq('id', id);
    fetchData();
  };

  const filtrados = socios.filter(s => 
    s.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-wrapper">
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <ShieldCheck color="#00C853" size={32} />
          <h2>TORRE DE <span>CONTROL</span></h2>
        </div>
        <nav className="admin-nav">
          <button className="active"><Users size={20}/> Gestión de Socios</button>
          <button><Landmark size={20}/> Bóveda Central</button>
          <button><BarChart3 size={20}/> Reportes</button>
        </nav>
        <div className="sidebar-footer">
            <button className="logout-btn" onClick={() => window.location.href='/'}><LogOut size={18}/> Salir</button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div className="admin-identity">
            <p>ADMINISTRADOR ÉLITE</p>
            <h3>MARÍA JOSÉ</h3>
          </div>
          <div className="header-right">
            <div className="live-pill"><div className="pulse-dot"></div> SISTEMA EN LÍNEA</div>
          </div>
        </header>

        <div className="admin-viewport">
          <section className="stats-container">
            <div className="s-card">
              <div className="s-icon-box"><TrendingUp color="#00C853"/></div>
              <div className="s-data"><span>CAPITAL GESTIONADO</span><h2>${stats.totalCapital.toLocaleString()}</h2></div>
            </div>
            <div className="s-card warning">
              <div className="s-icon-box"><ShieldAlert color="#ffbb00"/></div>
              <div className="s-data"><span>SOCIOS PENDIENTES</span><h2>{stats.pendientes}</h2></div>
            </div>
          </section>

          <section className="audit-table-section">
            <div className="table-top-bar">
              <h2>Auditoría de <span>Miembros</span></h2>
              <div className="search-wrapper"><Search size={18}/><input placeholder="Buscar socio..." onChange={e => setSearchTerm(e.target.value)}/></div>
            </div>
            <div className="responsive-table-holder">
              <table className="guru-admin-table">
                <thead>
                  <tr>
                    <th>SOCIO / CONTACTO</th>
                    <th>UBICACIÓN</th>
                    <th>PLAN</th>
                    <th>INVERSIÓN</th>
                    <th>ESTADO</th>
                    <th>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? <tr><td colSpan={6}>Cargando Bóveda...</td></tr> : filtrados.map((s) => (
                    <tr key={s.id}>
                      <td>
                        <div className="u-info">
                          <span className="u-name">{s.nombre}</span>
                          <span className="u-mail">{s.email}</span>
                        </div>
                      </td>
                      <td>
                        <div className="u-loc">
                          <Globe size={12} color="#444"/> {s.pais || 'N/A'}<br/>
                          <Phone size={12} color="#444"/> {s.telefono || 'N/A'}
                        </div>
                      </td>
                      <td><span className="plan-badge">{s.plan?.toUpperCase()}</span></td>
                      <td className="amount-td">${s.monto.toLocaleString()}</td>
                      <td><span className={`status-tag ${s.estado}`}>{s.estado}</span></td>
                      <td>
                        <div className="action-btns">
                          <button title="Ver Comprobante" onClick={() => setModalImagen({open: true, url: s.comprobante_url, nombre: s.nombre})}><Eye size={16}/></button>
                          {s.estado === 'pendiente' && (
                            <button className="approve" title="Activar Socio" onClick={() => actualizarEstado(s.id, 'activo')}><CheckCircle size={16}/></button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      {/* MODAL DE COMPROBANTE */}
      {modalImagen.open && (
        <div className="modal-root" onClick={() => setModalImagen({open: false, url: '', nombre: ''})}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Comprobante: {modalImagen.nombre}</h3>
              <button onClick={() => setModalImagen({open: false, url: '', nombre: ''})}><X/></button>
            </div>
            <div className="modal-body">
              {modalImagen.url ? (
                <img src={modalImagen.url} alt="Comprobante" />
              ) : (
                <div className="no-img"><ImageIcon size={48}/><p>No se cargó archivo</p></div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        :root { --neon: #00C853; --bg: #000; --panel: #050505; --border: #111; }
        .admin-wrapper { display: flex; background: var(--bg); min-height: 100vh; color: #fff; font-family: 'Inter', sans-serif; }
        .admin-sidebar { width: 280px; background: var(--panel); border-right: 1px solid var(--border); padding: 40px 20px; display: flex; flex-direction: column; }
        .sidebar-brand { display: flex; align-items: center; gap: 15px; margin-bottom: 50px; }
        .sidebar-brand h2 { font-size: 14px; font-weight: 900; letter-spacing: 1px; }
        .sidebar-brand span { color: var(--neon); }
        .admin-nav { flex: 1; }
        .admin-nav button { width: 100%; padding: 15px; background: none; border: none; color: #444; display: flex; align-items: center; gap: 15px; cursor: pointer; font-weight: 700; transition: 0.3s; border-radius: 12px; }
        .admin-nav button.active { color: var(--neon); background: rgba(0,200,83,0.05); }
        .logout-btn { background: none; border: none; color: #444; cursor: pointer; display: flex; align-items: center; gap: 10px; font-weight: bold; }
        .admin-main { flex: 1; display: flex; flex-direction: column; }
        .admin-header { height: 90px; padding: 0 50px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
        .admin-identity p { font-size: 10px; color: #333; letter-spacing: 2px; font-weight: 900; }
        .admin-identity h3 { color: var(--neon); font-size: 20px; font-weight: 900; }
        .live-pill { background: #080808; padding: 8px 15px; border-radius: 20px; font-size: 10px; color: #444; font-weight: 900; display: flex; align-items: center; gap: 8px; border: 1px solid var(--border); }
        .pulse-dot { width: 8px; height: 8px; background: var(--neon); border-radius: 50%; animation: pulse 2s infinite; }
        .admin-viewport { padding: 40px 50px; }
        .stats-container { display: grid; grid-template-columns: repeat(2, 1fr); gap: 25px; margin-bottom: 40px; }
        .s-card { background: var(--panel); border: 1px solid var(--border); padding: 30px; border-radius: 24px; display: flex; align-items: center; gap: 25px; }
        .s-icon-box { background: #000; width: 50px; height: 50px; border-radius: 15px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border); }
        .s-data span { font-size: 11px; color: #333; font-weight: 900; }
        .s-data h2 { font-size: 28px; font-weight: 900; }
        .audit-table-section { background: var(--panel); border: 1px solid var(--border); border-radius: 30px; padding: 35px; }
        .table-top-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .search-wrapper { background: #000; border: 1px solid var(--border); padding: 10px 20px; border-radius: 15px; display: flex; align-items: center; gap: 10px; }
        .search-wrapper input { background: none; border: none; color: #fff; outline: none; font-size: 14px; }
        .guru-admin-table { width: 100%; border-collapse: collapse; }
        th { text-align: left; padding: 15px; font-size: 11px; color: #222; font-weight: 900; text-transform: uppercase; border-bottom: 1px solid var(--border); }
        td { padding: 20px 15px; border-bottom: 1px solid #080808; }
        .u-info .u-name { display: block; font-weight: 900; font-size: 14px; }
        .u-info .u-mail { font-size: 12px; color: #444; }
        .u-loc { font-size: 11px; color: #666; line-height: 1.5; }
        .plan-badge { background: #000; border: 1px solid var(--border); color: var(--neon); padding: 5px 12px; border-radius: 8px; font-size: 10px; font-weight: 900; }
        .amount-td { font-weight: 900; font-family: 'JetBrains Mono', monospace; color: var(--neon); }
        .status-tag { font-size: 10px; font-weight: 900; text-transform: uppercase; }
        .status-tag.activo { color: var(--neon); }
        .status-tag.pendiente { color: #ffbb00; }
        .action-btns { display: flex; gap: 10px; }
        .action-btns button { background: #080808; border: 1px solid var(--border); color: #fff; width: 35px; height: 35px; border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.3s; }
        .action-btns button.approve:hover { background: var(--neon); color: #000; }
        .modal-root { position: fixed; inset: 0; background: rgba(0,0,0,0.9); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; z-index: 2000; }
        .modal-content { background: var(--panel); border: 1px solid var(--border); border-radius: 30px; width: 90%; max-width: 500px; overflow: hidden; }
        .modal-header { padding: 20px 30px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
        .modal-body { padding: 30px; text-align: center; }
        .modal-body img { max-width: 100%; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
      `}</style>
    </div>
  );
}