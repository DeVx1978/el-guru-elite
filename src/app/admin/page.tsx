"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  ShieldCheck, Users, Clock, TrendingUp, CheckCircle, XCircle, 
  Eye, DollarSign, Download, Filter, Search, Menu, X, BarChart3, 
  Settings, LogOut, Bell
} from 'lucide-react';

const clientSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminPanel() {
  const [socios, setSocios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [stats, setStats] = useState({ totalCapital: 0, pendientes: 0, activos: 0 });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    // 1. Obtener Socios y sus datos financieros
    const { data, error } = await clientSupabase
      .from('socios')
      .select('*, socios_elite(*) ')
      .order('created_at', { ascending: false });

    if (data) {
      setSocios(data);
      const pendientes = data.filter(s => s.estado === 'pendiente').length;
      const activos = data.filter(s => s.estado === 'activo').length;
      const capital = data.reduce((acc, s) => acc + (s.socios_elite?.[0]?.inversion_minima || 0), 0);
      setStats({ totalCapital: capital, pendientes, activos });
    }
    setLoading(false);
  }

  const actualizarEstado = async (id: string, nuevoEstado: string) => {
    const { error } = await clientSupabase
      .from('socios')
      .update({ estado: nuevoEstado })
      .eq('id', id);
    
    if (!error) fetchData();
  };

  return (
    <div className="admin-wrapper">
      {/* SIDEBAR ADMIN */}
      <aside className={`admin-sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="admin-brand">
          <ShieldCheck color="#00C853" size={28} />
          <h2>TORRE DE <span>CONTROL</span></h2>
        </div>
        <nav className="admin-nav">
          <button className="active"><Users size={20}/> Gestión de Socios</button>
          <button><BarChart3 size={20}/> Reportes Globales</button>
          <button><DollarSign size={20}/> Carga de Utilidades</button>
          <button><Settings size={20}/> Configuración</button>
        </nav>
        <div className="admin-footer">
          <button className="btn-logout"><LogOut size={18}/> Salir</button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="admin-main">
        <header className="admin-header">
          <button className="m-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
          <div className="admin-user">
            <p>Admin Principal</p>
            <h3>MARÍA JOSÉ</h3>
          </div>
          <div className="header-actions">
            <button className="btn-icon"><Bell size={20}/></button>
            <div className="admin-pill">SISTEMA SEGURO</div>
          </div>
        </header>

        <div className="admin-scroll">
          {/* INDICADORES DE PODER */}
          <section className="stats-grid">
            <div className="stat-box">
              <span>CAPITAL BAJO GESTIÓN</span>
              <h2>${stats.totalCapital.toLocaleString()} <small>USD</small></h2>
              <div className="trend-up">+ Rendimiento Global</div>
            </div>
            <div className="stat-box">
              <span>SOCIOS ÉLITE</span>
              <h2>{stats.activos}</h2>
              <div className="trend-neutral">Cuentas Verificadas</div>
            </div>
            <div className="stat-box highlight">
              <span>SOLICITUDES PENDIENTES</span>
              <h2>{stats.pendientes}</h2>
              <div className="trend-alert">Requiere Atención Urgente</div>
            </div>
          </section>

          {/* TABLA DE AUDITORÍA */}
          <section className="table-container">
            <div className="table-header">
              <h2>Auditoría de <span>Nuevos Miembros</span></h2>
              <div className="table-search">
                <Search size={16} />
                <input type="text" placeholder="Buscar por nombre o correo..." />
              </div>
            </div>

            <div className="responsive-table">
              <table>
                <thead>
                  <tr>
                    <th>Socio</th>
                    <th>Plan</th>
                    <th>País / Ciudad</th>
                    <th>Inversión</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {socios.map((s) => (
                    <tr key={s.id}>
                      <td>
                        <div className="user-info">
                          <p className="name">{s.nombre}</p>
                          <p className="email">{s.email}</p>
                        </div>
                      </td>
                      <td><span className="plan-tag">{s.socios_elite?.[0]?.nivel_socio || 'N/A'}</span></td>
                      <td>{s.socios_elite?.[0]?.pais} <br /> <small>{s.socios_elite?.[0]?.ciudad}</small></td>
                      <td className="amount">${s.socios_elite?.[0]?.inversion_minima || 0}</td>
                      <td>
                        <span className={`status-tag ${s.estado}`}>
                          {s.estado.toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <div className="action-btns">
                          <button className="btn-view" title="Ver Comprobante"><Eye size={16}/></button>
                          {s.estado === 'pendiente' && (
                            <>
                              <button onClick={() => actualizarEstado(s.id, 'activo')} className="btn-approve" title="Aprobar"><CheckCircle size={16}/></button>
                              <button onClick={() => actualizarEstado(s.id, 'rechazado')} className="btn-reject" title="Rechazar"><XCircle size={16}/></button>
                            </>
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

      <style jsx global>{`
        .admin-wrapper { display: flex; background: #000; min-height: 100vh; color: #fff; font-family: 'Inter', sans-serif; }
        
        .admin-sidebar { width: 280px; background: #050505; border-right: 1px solid #111; padding: 40px 20px; display: flex; flex-direction: column; transition: 0.3s; z-index: 1000; }
        .admin-brand { display: flex; align-items: center; gap: 15px; margin-bottom: 50px; }
        .admin-brand h2 { font-size: 16px; font-weight: 900; letter-spacing: -1px; }
        .admin-brand span { color: #00C853; }
        
        .admin-nav { flex: 1; display: flex; flex-direction: column; gap: 10px; }
        .admin-nav button { background: transparent; border: none; color: #444; padding: 15px; border-radius: 12px; display: flex; align-items: center; gap: 15px; font-weight: 700; cursor: pointer; text-align: left; transition: 0.3s; }
        .admin-nav button.active, .admin-nav button:hover { color: #fff; background: #0a0a0a; }
        .admin-nav button.active { color: #00C853; }

        .admin-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
        .admin-header { padding: 30px 40px; border-bottom: 1px solid #111; display: flex; justify-content: space-between; align-items: center; }
        .admin-user p { font-size: 10px; font-weight: 900; color: #444; margin: 0; }
        .admin-user h3 { font-size: 18px; font-weight: 900; margin: 0; color: #00C853; }
        
        .admin-pill { background: rgba(0,200,83,0.1); color: #00C853; padding: 8px 15px; border-radius: 20px; font-size: 10px; font-weight: 900; }
        .admin-scroll { flex: 1; overflow-y: auto; padding: 40px; }

        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 40px; }
        .stat-box { background: #050505; border: 1px solid #111; padding: 25px; border-radius: 20px; }
        .stat-box.highlight { border-color: rgba(255, 68, 68, 0.2); }
        .stat-box span { font-size: 10px; font-weight: 900; color: #444; letter-spacing: 1px; }
        .stat-box h2 { font-size: 28px; font-weight: 900; margin: 10px 0; }
        .stat-box h2 small { font-size: 12px; color: #222; }
        .trend-up { color: #00C853; font-size: 11px; font-weight: 800; }
        .trend-alert { color: #ff4444; font-size: 11px; font-weight: 800; }

        .table-container { background: #050505; border: 1px solid #111; border-radius: 24px; padding: 30px; }
        .table-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .table-header h2 span { color: #00C853; }
        .table-search { background: #000; border: 1px solid #111; border-radius: 12px; display: flex; align-items: center; padding: 0 15px; gap: 10px; }
        .table-search input { background: transparent; border: none; padding: 12px 0; color: #fff; outline: none; font-size: 13px; }

        .responsive-table { overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; min-width: 800px; }
        th { text-align: left; padding: 15px; border-bottom: 1px solid #111; color: #333; font-size: 11px; font-weight: 900; text-transform: uppercase; }
        td { padding: 20px 15px; border-bottom: 1px solid #080808; font-size: 13px; }
        
        .user-info .name { font-weight: 800; margin: 0; }
        .user-info .email { color: #444; font-size: 11px; margin: 0; }
        .plan-tag { background: #000; border: 1px solid #111; padding: 5px 10px; border-radius: 8px; font-size: 10px; font-weight: 900; color: #00C853; }
        .amount { font-weight: 900; font-family: 'Courier New', monospace; }
        
        .status-tag { padding: 5px 12px; border-radius: 20px; font-size: 10px; font-weight: 900; }
        .status-tag.pendiente { background: rgba(255, 187, 0, 0.1); color: #ffbb00; }
        .status-tag.activo { background: rgba(0, 200, 83, 0.1); color: #00C853; }
        .status-tag.rechazado { background: rgba(255, 68, 68, 0.1); color: #ff4444; }

        .action-btns { display: flex; gap: 10px; }
        .action-btns button { background: #000; border: 1px solid #111; color: #444; padding: 8px; border-radius: 8px; cursor: pointer; transition: 0.3s; }
        .btn-view:hover { color: #fff; border-color: #fff; }
        .btn-approve:hover { color: #00C853; border-color: #00C853; }
        .btn-reject:hover { color: #ff4444; border-color: #ff4444; }

        .m-toggle { display: none; }

        @media (max-width: 1024px) {
          .admin-sidebar { position: fixed; left: -100%; top: 0; bottom: 0; }
          .admin-sidebar.open { left: 0; }
          .m-toggle { display: block; background: #050505; border: 1px solid #111; color: #fff; padding: 10px; border-radius: 10px; margin-right: 20px; }
          .stats-grid { grid-template-columns: 1fr; }
          .admin-scroll { padding: 20px; }
          .table-header { flex-direction: column; gap: 20px; align-items: flex-start; }
        }
      `}</style>
    </div>
  );
}