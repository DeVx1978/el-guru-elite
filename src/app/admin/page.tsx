"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  ShieldCheck, Users, Clock, TrendingUp, CheckCircle, XCircle, 
  Eye, DollarSign, Search, Menu, X, BarChart3, 
  Settings, LogOut, Bell, Image as ImageIcon, Loader2, Zap, Percent,
  ArrowUpRight, ArrowDownRight, Filter, Download, Activity, Globe,
  ShieldAlert, UserPlus, PieChart, Landmark
} from 'lucide-react';

const clientSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminPanel() {
  const [socios, setSocios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [accionLoading, setAccionLoading] = useState<string | null>(null);
  const [utilidadPorcentaje, setUtilidadPorcentaje] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({ 
    totalCapital: 0, 
    pendientes: 0, 
    activos: 0, 
    utilidadRepartida: 0 
  });
  const [modalImagen, setModalImagen] = useState<{
    open: boolean; 
    url: string | null; 
    nombreSocio: string 
  }>({ 
    open: false, 
    url: null, 
    nombreSocio: '' 
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
        // SINCRONIZACIÓN ÉLITE: Relación forzada con id_socio para rescatar socios antiguos
        const { data, error } = await clientSupabase
          .from('socios')
          .select('*, socios_elite!id_socio(*) ') 
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data) {
          setSocios(data);
          const pendientes = data.filter(s => s.estado === 'pendiente').length;
          const activos = data.filter(s => s.estado === 'activo').length;
          // Conversión Number() para evitar fallos de suma por tipos de datos
          const capital = data.reduce((acc, s) => acc + (Number(s.socios_elite?.[0]?.inversion_minima) || 0), 0);
          const utilidades = data.reduce((acc, s) => acc + (Number(s.utilidad_total) || 0), 0);
          setStats({ totalCapital: capital, pendientes, activos, utilidadRepartida: utilidades });
        }
    } catch (err) {
        console.error("Error de sincronización en Bóveda:", err);
    } finally {
        setLoading(false);
    }
  }

  const ejecutarDispersionGlobal = async () => {
    const porcentaje = parseFloat(utilidadPorcentaje);
    if (isNaN(porcentaje) || porcentaje <= 0) return alert("Ingrese un porcentaje válido.");
    
    const confirmar = confirm(`ALERTA DE SEGURIDAD: ¿Desea dispersar el ${porcentaje}% de utilidades a TODOS los socios activos?`);
    if (!confirmar) return;

    setAccionLoading('global_utilidad');
    try {
        const sociosActivos = socios.filter(s => s.estado === 'activo');
        for (const socio of sociosActivos) {
            const inversion = Number(socio.socios_elite?.[0]?.inversion_minima) || 0;
            const gananciaCalculada = (inversion * (porcentaje / 100));
            const nuevaUtilidadTotal = (Number(socio.utilidad_total) || 0) + gananciaCalculada;

            const { error } = await clientSupabase
                .from('socios')
                .update({ utilidad_total: nuevaUtilidadTotal })
                .eq('id', socio.id);
            
            if (error) console.error(`Error en socio ${socio.id}:`, error);
        }
        alert("Proceso de Dispersión Finalizado con Éxito.");
        setUtilidadPorcentaje('');
        fetchData();
    } catch (err) {
        alert("Error crítico durante la operación financiera.");
    } finally {
        setAccionLoading(null);
    }
  };

  const actualizarEstadoSocio = async (idSocio: string, nuevoEstado: string) => {
    setAccionLoading(idSocio + nuevoEstado);
    try {
        const { error } = await clientSupabase
            .from('socios')
            .update({ estado: nuevoEstado })
            .eq('id', idSocio);
        
        if (error) throw error;
        fetchData();
    } catch (err) {
        alert("Error al intentar cambiar el estado del socio.");
    } finally {
        setAccionLoading(null);
    }
  };

  const sociosFiltrados = socios.filter(s => 
    s.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-wrapper">
      <aside className={`admin-sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-brand">
          <ShieldCheck color="#00C853" size={32} />
          <h2>TORRE DE <span>CONTROL</span></h2>
          <button className="m-close-btn" onClick={() => setMenuOpen(false)}><X size={24}/></button>
        </div>
        <div className="sidebar-scroll">
          <nav className="admin-nav">
            <p className="nav-label">NÚCLEO</p>
            <button className="active"><Users size={20}/> Gestión de Socios</button>
            <button><Landmark size={20}/> Bóveda Central</button>
            <p className="nav-label">OPERACIONES</p>
            <button><DollarSign size={20}/> Carga de Utilidades</button>
            <button><BarChart3 size={20}/> Reportes Globales</button>
            <p className="nav-label">SISTEMA</p>
            <button><Settings size={20}/> Configuración</button>
          </nav>
        </div>
        <div className="sidebar-footer">
          <button className="btn-logout" onClick={() => window.location.href='/'}>
            <LogOut size={18}/> Salir del Sistema
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div className="header-left">
            <button className="menu-trigger" onClick={() => setMenuOpen(true)}><Menu size={24}/></button>
            <div className="admin-identity">
              <p>RANGO: ADMINISTRADOR ÉLITE</p>
              <h3>MARÍA JOSÉ</h3>
            </div>
          </div>
          <div className="header-right">
            <div className="live-pill"><div className="pulse-dot"></div> SISTEMA EN LÍNEA</div>
            <button className="notif-btn"><Bell size={20}/><span className="notif-count">{stats.pendientes}</span></button>
          </div>
        </header>

        <div className="admin-viewport">
          <section className="stats-container">
            <div className="s-card">
              <div className="s-icon-box"><TrendingUp color="#00C853"/></div>
              <div className="s-data">
                <span>CAPITAL GESTIONADO</span>
                <h2>${stats.totalCapital.toLocaleString()}</h2>
              </div>
            </div>
            <div className="s-card">
              <div className="s-icon-box"><Zap color="#00C853"/></div>
              <div className="s-data">
                <span>UTILIDADES PAGADAS</span>
                <h2 className="text-neon">${stats.utilidadRepartida.toLocaleString()}</h2>
              </div>
            </div>
            <div className="s-card warning">
              <div className="s-icon-box"><ShieldAlert color="#ffbb00"/></div>
              <div className="s-data">
                <span>SOCIOS PENDIENTES</span>
                <h2>{stats.pendientes} <small>MIEMBROS</small></h2>
              </div>
            </div>
          </section>

          <section className="power-module">
            <div className="power-info">
              <div className="power-badge"><Percent size={20} color="#00C853" /></div>
              <div className="power-text">
                <h3>Dispersión Global de Utilidades</h3>
                <p>Ejecute el algoritmo de repartición de beneficios basado en el capital individual de cada socio activo.</p>
              </div>
            </div>
            <div className="power-action">
              <div className="input-group-gen">
                <input 
                  type="number" 
                  placeholder="0.00" 
                  value={utilidadPorcentaje}
                  onChange={(e) => setUtilidadPorcentaje(e.target.value)}
                />
                <span className="unit">%</span>
              </div>
              <button 
                className="btn-power-exec" 
                onClick={ejecutarDispersionGlobal}
                disabled={accionLoading === 'global_utilidad'}
              >
                {accionLoading === 'global_utilidad' ? <Loader2 className="spin" size={20}/> : 'EJECUTAR DISPERSIÓN'}
              </button>
            </div>
          </section>

          <section className="audit-table-section">
            <div className="table-top-bar">
              <div className="t-title">
                <h2>Auditoría de <span>Miembros</span></h2>
                <p>Listado maestro de socios y capitalización real.</p>
              </div>
              <div className="search-wrapper">
                <Search size={18} color="#555" />
                <input 
                  type="text" 
                  placeholder="Buscar socio por nombre o email..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="responsive-table-holder">
              <table className="guru-admin-table">
                <thead>
                  <tr>
                    <th>SOCIO / IDENTIDAD</th>
                    <th>PLAN ÉLITE</th>
                    <th>INVERSIÓN</th>
                    <th>UTILIDAD</th>
                    <th>ESTADO</th>
                    <th>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={6} className="loading-td"><Loader2 className="spin" size={24}/> Sincronizando Bóveda...</td></tr>
                  ) : sociosFiltrados.map((s) => (
                    <tr key={s.id}>
                      <td>
                        <div className="user-td-cell">
                          <div className="avatar-mini">{s.nombre?.charAt(0)}</div>
                          <div>
                            <p className="u-name">{s.nombre}</p>
                            <p className="u-mail">{s.email}</p>
                          </div>
                        </div>
                      </td>
                      <td><span className="plan-badge">{s.socios_elite?.[0]?.nivel_socio || 'N/A'}</span></td>
                      <td className="amount-td">${Number(s.socios_elite?.[0]?.inversion_minima || 0).toLocaleString()}</td>
                      <td className="amount-td highlight">${Number(s.utilidad_total || 0).toLocaleString()}</td>
                      <td><span className={`status-tag ${s.estado}`}>{s.estado}</span></td>
                      <td>
                        <div className="action-btns-group">
                          <button className="btn-circle-action view" onClick={() => setModalImagen({open: true, url: null, nombreSocio: s.nombre})}><Eye size={16}/></button>
                          {s.estado === 'pendiente' && (
                            <button 
                              className="btn-circle-action approve" 
                              onClick={() => actualizarEstadoSocio(s.id, 'activo')}
                              disabled={accionLoading === s.id + 'activo'}
                            >
                              {accionLoading === s.id + 'activo' ? <Loader2 className="spin" size={16}/> : <CheckCircle size={16}/>}
                            </button>
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

      {modalImagen.open && (
        <div className="modal-root" onClick={() => setModalImagen({...modalImagen, open: false})}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Comprobante de Pago: <span>{modalImagen.nombreSocio}</span></h3>
              <button className="close-x" onClick={() => setModalImagen({...modalImagen, open: false})}><X/></button>
            </div>
            <div className="modal-image-body">
              <div className="empty-state-img">
                <ImageIcon size={64} color="#111" />
                <p>No se detectó archivo adjunto en el registro.</p>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn-close-modal" onClick={() => setModalImagen({...modalImagen, open: false})}>CERRAR VISOR</button>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        :root { --neon: #00C853; --bg: #000; --panel: #050505; --border: #111; }
        .admin-wrapper { display: flex; background: var(--bg); min-height: 100vh; color: #fff; font-family: 'Inter', sans-serif; }
        .admin-sidebar { width: 300px; background: var(--panel); border-right: 1px solid var(--border); display: flex; flex-direction: column; position: sticky; top: 0; height: 100vh; transition: 0.3s; z-index: 2000; }
        .sidebar-brand { padding: 40px 30px; display: flex; align-items: center; gap: 15px; border-bottom: 1px solid var(--border); }
        .sidebar-brand h2 { font-size: 16px; font-weight: 900; letter-spacing: -1px; }
        .sidebar-brand span { color: var(--neon); }
        .m-close-btn { display: none; background: none; border: none; color: #fff; }
        .admin-nav { padding: 30px 20px; flex: 1; }
        .nav-label { font-size: 10px; font-weight: 900; color: #222; margin: 25px 0 10px 15px; letter-spacing: 2px; }
        .admin-nav button { width: 100%; background: transparent; border: none; color: #444; padding: 16px 20px; border-radius: 15px; display: flex; align-items: center; gap: 15px; font-weight: 700; cursor: pointer; transition: 0.3s; margin-bottom: 5px; }
        .admin-nav button.active { background: rgba(0, 200, 83, 0.05); color: var(--neon); }
        .admin-nav button:hover:not(.active) { color: #fff; background: #0a0a0a; }
        .sidebar-footer { padding: 30px 20px; border-top: 1px solid var(--border); }
        .btn-logout { width: 100%; background: transparent; border: none; color: #444; padding: 15px; display: flex; align-items: center; gap: 15px; font-weight: 800; cursor: pointer; }
        .admin-main { flex: 1; display: flex; flex-direction: column; min-width: 0; }
        .admin-header { height: 90px; padding: 0 50px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; background: rgba(0,0,0,0.8); backdrop-filter: blur(10px); z-index: 1000; }
        .menu-trigger { display: none; background: none; border: none; color: #fff; margin-right: 20px; }
        .admin-identity p { font-size: 10px; font-weight: 900; color: #333; letter-spacing: 2px; }
        .admin-identity h3 { font-size: 20px; font-weight: 900; color: var(--neon); margin: 0; }
        .header-right { display: flex; align-items: center; gap: 25px; }
        .live-pill { background: #080808; border: 1px solid var(--border); padding: 8px 18px; border-radius: 40px; font-size: 10px; font-weight: 900; color: #444; display: flex; align-items: center; gap: 10px; }
        .pulse-dot { width: 8px; height: 8px; background: var(--neon); border-radius: 50%; box-shadow: 0 0 10px var(--neon); animation: blink 2s infinite; }
        .notif-btn { background: #080808; border: 1px solid var(--border); color: #fff; width: 45px; height: 45px; border-radius: 50%; position: relative; cursor: pointer; }
        .notif-count { position: absolute; top: -5px; right: -5px; background: #ff4444; color: #fff; font-size: 10px; font-weight: 900; padding: 3px 7px; border-radius: 10px; border: 2px solid #000; }
        .admin-viewport { padding: 50px; flex: 1; overflow-y: auto; }
        .stats-container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; margin-bottom: 40px; }
        .s-card { background: var(--panel); border: 1px solid var(--border); padding: 30px; border-radius: 24px; display: flex; align-items: center; gap: 25px; }
        .s-icon-box { background: #000; width: 60px; height: 60px; border-radius: 18px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border); }
        .s-data span { font-size: 11px; font-weight: 900; color: #333; letter-spacing: 1px; }
        .s-data h2 { font-size: 28px; font-weight: 900; margin: 5px 0 0; }
        .s-data h2 small { font-size: 12px; color: #222; }
        .text-neon { color: var(--neon); text-shadow: 0 0 15px rgba(0, 200, 83, 0.2); }
        .power-module { background: #080808; border: 1px solid var(--border); border-left: 6px solid var(--neon); padding: 40px; border-radius: 30px; margin-bottom: 40px; display: flex; justify-content: space-between; align-items: center; }
        .power-info { display: flex; gap: 30px; align-items: center; }
        .power-badge { background: rgba(0,200,83,0.05); width: 60px; height: 60px; border-radius: 20px; display: flex; justify-content: center; align-items: center; border: 1px solid rgba(0,200,83,0.1); }
        .power-text h3 { font-size: 22px; font-weight: 900; margin: 0; }
        .power-text p { color: #444; font-size: 14px; margin-top: 5px; max-width: 450px; line-height: 1.5; }
        .power-action { display: flex; gap: 20px; }
        .input-group-gen { background: #000; border: 1px solid var(--border); border-radius: 18px; display: flex; align-items: center; padding: 0 25px; gap: 15px; width: 160px; }
        .input-group-gen input { background: transparent; border: none; color: #fff; padding: 20px 0; width: 100%; outline: none; font-weight: 900; font-size: 24px; text-align: right; }
        .input-group-gen .unit { color: var(--neon); font-weight: 900; font-size: 20px; }
        .btn-power-exec { background: #fff; color: #000; border: none; padding: 20px 40px; border-radius: 18px; font-weight: 900; font-size: 13px; cursor: pointer; transition: 0.3s; }
        .audit-table-section { background: var(--panel); border: 1px solid var(--border); border-radius: 35px; padding: 45px; }
        .table-top-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
        .search-wrapper { background: #000; border: 1px solid var(--border); border-radius: 18px; display: flex; align-items: center; padding: 0 25px; gap: 15px; width: 400px; }
        .search-wrapper input { background: transparent; border: none; padding: 18px 0; color: #fff; outline: none; flex: 1; font-size: 14px; font-weight: 700; }
        .guru-admin-table { width: 100%; border-collapse: collapse; }
        th { text-align: left; padding: 20px; font-size: 11px; font-weight: 900; color: #333; text-transform: uppercase; border-bottom: 1px solid var(--border); }
        td { padding: 30px 20px; border-bottom: 1px solid #0a0a0a; }
        .user-td-cell { display: flex; align-items: center; gap: 15px; }
        .avatar-mini { width: 40px; height: 40px; background: #111; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 900; color: var(--neon); }
        .plan-badge { background: #000; border: 1px solid var(--border); padding: 6px 14px; border-radius: 10px; font-size: 10px; font-weight: 900; color: var(--neon); }
        .amount-td { font-weight: 900; font-size: 16px; }
        .amount-td.highlight { color: var(--neon); }
        .status-tag { padding: 6px 15px; border-radius: 30px; font-size: 10px; font-weight: 900; }
        .status-tag.pendiente { background: rgba(255, 187, 0, 0.1); color: #ffbb00; }
        .status-tag.activo { background: rgba(0, 200, 83, 0.1); color: var(--neon); }
        .modal-root { position: fixed; inset: 0; background: rgba(0,0,0,0.9); backdrop-filter: blur(15px); z-index: 5000; display: flex; justify-content: center; align-items: center; }
        .modal-content { background: var(--panel); border: 1px solid var(--border); border-radius: 40px; width: 100%; max-width: 600px; }
        .modal-header { padding: 30px; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
        .modal-image-body { padding: 60px; text-align: center; }
        .btn-close-modal { background: #111; color: #fff; border: none; padding: 15px 40px; border-radius: 15px; font-weight: 800; cursor: pointer; }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes blink { 50% { opacity: 0.3; } }
        @media (max-width: 1024px) {
          .admin-sidebar { position: fixed; left: -100%; }
          .sidebar-open { left: 0; }
          .menu-trigger { display: block; }
          .admin-viewport { padding: 25px; }
          .stats-container { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}