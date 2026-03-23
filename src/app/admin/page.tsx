"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  ShieldCheck, Users, Clock, TrendingUp, CheckCircle, XCircle, 
  Eye, DollarSign, Search, Menu, X, BarChart3, 
  Settings, LogOut, Bell, Image as ImageIcon, Loader2, Zap, Percent,
  ArrowUpRight, ArrowDownRight, Filter, Download
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
        const { data, error } = await clientSupabase
          .from('socios')
          .select('*, socios_elite(*) ')
          .order('created_at', { ascending: false });

        if (data) {
          setSocios(data);
          const pendientes = data.filter(s => s.estado === 'pendiente').length;
          const activos = data.filter(s => s.estado === 'activo').length;
          const capital = data.reduce((acc, s) => acc + (s.socios_elite?.[0]?.inversion_minima || 0), 0);
          const utilidades = data.reduce((acc, s) => acc + (s.utilidad_total || 0), 0);
          setStats({ totalCapital: capital, pendientes, activos, utilidadRepartida: utilidades });
        }
    } catch (err) {
        console.error("Error fetch:", err);
    } finally {
        setLoading(false);
    }
  }

  const ejecutarDispersionGlobal = async () => {
    const porcentaje = parseFloat(utilidadPorcentaje);
    if (isNaN(porcentaje) || porcentaje <= 0) return alert("Ingrese un porcentaje válido.");
    
    const confirmar = confirm(`¿ESTÁ SEGURO? Se dispersará el ${porcentaje}% de utilidades a TODOS los socios activos.`);
    if (!confirmar) return;

    setAccionLoading('global_utilidad');
    try {
        const sociosActivos = socios.filter(s => s.estado === 'activo');
        
        for (const socio of sociosActivos) {
            const inversion = socio.socios_elite?.[0]?.inversion_minima || 0;
            const nuevaUtilidad = (inversion * (porcentaje / 100));
            const utilidadAcumulada = (socio.utilidad_total || 0) + nuevaUtilidad;

            await clientSupabase
                .from('socios')
                .update({ utilidad_total: utilidadAcumulada })
                .eq('id', socio.id);
        }

        alert(`OPERACIÓN EXITOSA: ${sociosActivos.length} socios actualizados.`);
        setUtilidadPorcentaje('');
        fetchData();
    } catch (err) {
        alert("Error crítico en la dispersión.");
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
        alert("Error al actualizar socio.");
    } finally {
        setAccionLoading(null);
    }
  };

  const sociosFiltrados = socios.filter(s => 
    s.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-wrapper">
      {/* SIDEBAR IZQUIERDO */}
      <aside className={`admin-sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="admin-brand">
          <ShieldCheck color="#00C853" size={28} />
          <h2>TORRE DE <span>CONTROL</span></h2>
        </div>
        <nav className="admin-nav">
          <button className="active"><Users size={20}/> Gestión de Socios</button>
          <button><DollarSign size={20}/> Carga de Utilidades</button>
          <button><BarChart3 size={20}/> Reportes Globales</button>
          <button><Settings size={20}/> Configuración</button>
        </nav>
        <div className="admin-footer">
          <button className="btn-logout" onClick={() => window.location.href='/'}><LogOut size={18}/> Salir del Sistema</button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="admin-main">
        <header className="admin-header">
          <button className="m-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
          <div className="admin-user">
            <p>Rango: Administrador Élite</p>
            <h3>MARÍA JOSÉ</h3>
          </div>
          <div className="header-right">
            <div className="status-badge"><div className="pulse"></div> EN LÍNEA</div>
            <button className="btn-icon-circle"><Bell size={20}/></button>
          </div>
        </header>

        <div className="admin-scroll">
          {/* TARJETAS DE INDICADORES */}
          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-head"><span>CAPITAL GESTIONADO</span><TrendingUp size={16} color="#00C853"/></div>
              <h2>${stats.totalCapital.toLocaleString()} <small>USD</small></h2>
              <p className="stat-footer">Capital total del fondo</p>
            </div>
            <div className="stat-card">
              <div className="stat-head"><span>UTILIDADES REPARTIDAS</span><Zap size={16} color="#00C853"/></div>
              <h2 style={{color: '#00C853'}}>${stats.utilidadRepartida.toLocaleString()} <small>USD</small></h2>
              <p className="stat-footer">Histórico de ganancias</p>
            </div>
            <div className="stat-card alert">
              <div className="stat-head"><span>POR APROBAR</span><Clock size={16} color="#ffbb00"/></div>
              <h2>{stats.pendientes} <small>SOCIOS</small></h2>
              <p className="stat-footer">Requieren verificación</p>
            </div>
          </section>

          {/* GENERADOR DE UTILIDADES (MÓDULO DE PODER) */}
          <section className="generator-container">
            <div className="gen-text">
                <div className="gen-icon"><Percent color="#00C853" size={24}/></div>
                <div>
                    <h3>Dispersión Global de Utilidades</h3>
                    <p>Ingrese el porcentaje de ganancia para aplicarlo a todos los socios activos.</p>
                </div>
            </div>
            <div className="gen-form">
                <div className="input-wrapper">
                    <input 
                        type="number" 
                        placeholder="0.00" 
                        value={utilidadPorcentaje}
                        onChange={(e) => setUtilidadPorcentaje(e.target.value)}
                    />
                    <span>%</span>
                </div>
                <button 
                    className="btn-execute" 
                    onClick={ejecutarDispersionGlobal}
                    disabled={accionLoading === 'global_utilidad'}
                >
                    {accionLoading === 'global_utilidad' ? <Loader2 className="spin" size={20}/> : 'EJECUTAR DISPERSIÓN'}
                </button>
            </div>
          </section>

          {/* TABLA DE AUDITORÍA */}
          <section className="table-wrapper">
            <div className="table-top">
              <h2>Auditoría de <span>Miembros</span></h2>
              <div className="search-box">
                <Search size={18} color="#444" />
                <input 
                    type="text" 
                    placeholder="Filtrar por nombre o email..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>SOCIO</th>
                    <th>PLAN</th>
                    <th>INVERSIÓN</th>
                    <th>UTILIDAD</th>
                    <th>ESTADO</th>
                    <th>ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={6} className="table-loader">Sincronizando con Supabase...</td></tr>
                  ) : sociosFiltrados.map((s) => (
                    <tr key={s.id}>
                      <td>
                        <div className="s-info">
                          <p className="s-name">{s.nombre}</p>
                          <p className="s-email">{s.email}</p>
                        </div>
                      </td>
                      <td><span className="p-tag">{s.socios_elite?.[0]?.nivel_socio || 'N/A'}</span></td>
                      <td className="s-amount">${s.socios_elite?.[0]?.inversion_minima?.toLocaleString() || 0}</td>
                      <td className="s-amount highlight">${s.utilidad_total?.toLocaleString() || 0}</td>
                      <td><span className={`status-pill ${s.estado}`}>{s.estado?.toUpperCase()}</span></td>
                      <td>
                        <div className="action-row">
                          <button 
                            className="a-btn view" 
                            onClick={() => setModalImagen({open: true, url: null, nombreSocio: s.nombre})}
                          ><Eye size={16}/></button>
                          
                          {s.estado === 'pendiente' && (
                            <>
                              <button 
                                className="a-btn approve" 
                                onClick={() => actualizarEstadoSocio(s.id, 'activo')}
                                disabled={accionLoading === s.id + 'activo'}
                              >
                                {accionLoading === s.id + 'activo' ? <Loader2 className="spin" size={16}/> : <CheckCircle size={16}/>}
                              </button>
                              <button 
                                className="a-btn reject" 
                                onClick={() => actualizarEstadoSocio(s.id, 'rechazado')}
                                disabled={accionLoading === s.id + 'rechazado'}
                              >
                                {accionLoading === s.id + 'rechazado' ? <Loader2 className="spin" size={16}/> : <XCircle size={16}/>}
                              </button>
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

      {/* MODAL VISOR DE EVIDENCIA */}
      {modalImagen.open && (
        <div className="modal-overlay" onClick={() => setModalImagen({...modalImagen, open: false})}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-head">
                    <h3>Evidencia de Pago: <span>{modalImagen.nombreSocio}</span></h3>
                    <button className="m-close" onClick={() => setModalImagen({...modalImagen, open: false})}><X/></button>
                </div>
                <div className="modal-body">
                    {modalImagen.url ? (
                        <img src={modalImagen.url} className="img-full" alt="Comprobante" />
                    ) : (
                        <div className="no-img-box">
                            <ImageIcon size={60} color="#111" />
                            <p>El socio aún no ha cargado el archivo o la URL ha expirado.</p>
                        </div>
                    )}
                </div>
                <div className="modal-foot">
                    <button className="btn-sec" onClick={() => setModalImagen({...modalImagen, open: false})}>CERRAR VISOR</button>
                </div>
            </div>
        </div>
      )}

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap');
        
        .admin-wrapper { display: flex; background: #000; min-height: 100vh; color: #fff; font-family: 'Inter', sans-serif; }
        
        /* SIDEBAR COMPLETO */
        .admin-sidebar { width: 280px; background: #050505; border-right: 1px solid #111; padding: 40px 20px; display: flex; flex-direction: column; transition: 0.3s; z-index: 100; }
        .admin-brand { display: flex; align-items: center; gap: 15px; margin-bottom: 50px; }
        .admin-brand h2 { font-size: 16px; font-weight: 900; letter-spacing: -1px; }
        .admin-brand span { color: #00C853; }
        .admin-nav { flex: 1; display: flex; flex-direction: column; gap: 8px; }
        .admin-nav button { background: transparent; border: none; color: #444; padding: 16px; border-radius: 12px; display: flex; align-items: center; gap: 15px; font-weight: 700; cursor: pointer; text-align: left; transition: 0.3s; }
        .admin-nav button.active, .admin-nav button:hover { color: #fff; background: #0a0a0a; }
        .admin-nav button.active { color: #00C853; background: rgba(0, 200, 83, 0.05); }
        .admin-footer { padding-top: 20px; border-top: 1px solid #111; }
        .btn-logout { width: 100%; background: transparent; border: none; color: #333; padding: 15px; display: flex; align-items: center; gap: 15px; font-weight: 800; cursor: pointer; transition: 0.3s; }
        .btn-logout:hover { color: #ff4444; }

        /* MAIN */
        .admin-main { flex: 1; display: flex; flex-direction: column; height: 100vh; overflow: hidden; }
        .admin-header { padding: 30px 50px; border-bottom: 1px solid #111; display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.5); backdrop-filter: blur(10px); }
        .admin-user p { font-size: 10px; font-weight: 900; color: #444; text-transform: uppercase; letter-spacing: 2px; }
        .admin-user h3 { font-size: 20px; font-weight: 900; color: #00C853; margin: 0; }
        .status-badge { display: flex; align-items: center; gap: 10px; background: #080808; padding: 8px 15px; border-radius: 30px; border: 1px solid #111; font-size: 10px; font-weight: 900; color: #444; }
        .pulse { width: 8px; height: 8px; background: #00C853; border-radius: 50%; box-shadow: 0 0 10px #00C853; animation: blink 2s infinite; }
        .btn-icon-circle { background: #080808; border: 1px solid #111; color: #fff; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; }

        .admin-scroll { flex: 1; overflow-y: auto; padding: 50px; }

        /* CARDS */
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; margin-bottom: 40px; }
        .stat-card { background: #050505; border: 1px solid #111; padding: 30px; border-radius: 24px; transition: 0.4s; }
        .stat-card.alert { border-color: rgba(255, 187, 0, 0.2); }
        .stat-head { display: flex; justify-content: space-between; margin-bottom: 20px; }
        .stat-head span { font-size: 10px; font-weight: 900; color: #444; letter-spacing: 1px; }
        .stat-card h2 { font-size: 32px; font-weight: 900; margin: 0; }
        .stat-card h2 small { font-size: 12px; color: #222; margin-left: 5px; }
        .stat-footer { font-size: 11px; color: #222; font-weight: 800; margin-top: 15px; text-transform: uppercase; }

        /* GENERADOR */
        .generator-container { background: linear-gradient(145deg, #080808, #000); border: 1px solid #111; padding: 40px; border-radius: 30px; margin-bottom: 40px; display: flex; justify-content: space-between; align-items: center; border-left: 6px solid #00C853; }
        .gen-text { display: flex; gap: 25px; align-items: center; }
        .gen-icon { background: rgba(0,200,83,0.05); width: 60px; height: 60px; border-radius: 20px; display: flex; justify-content: center; align-items: center; border: 1px solid rgba(0,200,83,0.1); }
        .gen-text h3 { font-size: 22px; font-weight: 900; margin: 0; }
        .gen-text p { color: #444; font-size: 14px; margin-top: 5px; }
        .gen-form { display: flex; gap: 20px; align-items: center; }
        .input-wrapper { background: #000; border: 1px solid #111; border-radius: 15px; display: flex; align-items: center; padding: 0 20px; gap: 10px; width: 140px; }
        .input-wrapper input { background: transparent; border: none; color: #fff; padding: 18px 0; width: 100%; outline: none; font-weight: 900; font-size: 20px; text-align: right; }
        .input-wrapper span { color: #00C853; font-weight: 900; }
        .btn-execute { background: #fff; color: #000; border: none; padding: 20px 35px; border-radius: 15px; font-weight: 900; cursor: pointer; transition: 0.3s; }
        .btn-execute:hover:not(:disabled) { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(255,255,255,0.1); }

        /* TABLA */
        .table-wrapper { background: #050505; border: 1px solid #111; border-radius: 30px; padding: 40px; }
        .table-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
        .table-top h2 span { color: #00C853; }
        .search-box { background: #000; border: 1px solid #111; border-radius: 15px; display: flex; align-items: center; padding: 0 20px; gap: 15px; width: 350px; }
        .search-box input { background: transparent; border: none; padding: 15px 0; color: #fff; outline: none; flex: 1; font-size: 14px; }
        
        .admin-table { width: 100%; border-collapse: collapse; }
        th { text-align: left; padding: 20px; color: #333; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; border-bottom: 1px solid #111; }
        td { padding: 25px 20px; border-bottom: 1px solid #080808; }
        .s-name { font-weight: 900; font-size: 15px; margin: 0; }
        .s-email { font-size: 12px; color: #444; margin: 2px 0 0 0; }
        .p-tag { background: #000; border: 1px solid #111; padding: 6px 12px; border-radius: 10px; font-size: 10px; font-weight: 900; color: #00C853; }
        .s-amount { font-weight: 900; font-size: 16px; font-family: 'Courier New', monospace; }
        .s-amount.highlight { color: #00C853; }
        .status-pill { padding: 6px 15px; border-radius: 30px; font-size: 10px; font-weight: 900; }
        .status-pill.pendiente { background: rgba(255, 187, 0, 0.1); color: #ffbb00; }
        .status-pill.activo { background: rgba(0, 200, 83, 0.1); color: #00C853; }
        .status-pill.rechazado { background: rgba(255, 68, 68, 0.1); color: #ff4444; }

        .action-row { display: flex; gap: 10px; }
        .a-btn { background: #000; border: 1px solid #111; color: #444; width: 38px; height: 38px; border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.3s; }
        .a-btn:hover:not(:disabled) { transform: translateY(-2px); color: #fff; border-color: #222; }
        .a-btn.approve:hover { color: #00C853; border-color: rgba(0, 200, 83, 0.3); }
        .a-btn.reject:hover { color: #ff4444; border-color: rgba(255, 68, 68, 0.3); }

        /* MODAL */
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.9); backdrop-filter: blur(10px); z-index: 1000; display: flex; justify-content: center; align-items: center; padding: 40px; }
        .modal-card { background: #050505; border: 1px solid #111; border-radius: 35px; width: 100%; max-width: 700px; display: flex; flex-direction: column; overflow: hidden; }
        .modal-head { padding: 30px; border-bottom: 1px solid #111; display: flex; justify-content: space-between; align-items: center; }
        .modal-head h3 span { color: #00C853; }
        .m-close { background: #000; border: 1px solid #111; color: #fff; border-radius: 10px; padding: 5px; cursor: pointer; }
        .modal-body { padding: 40px; display: flex; justify-content: center; align-items: center; background: #000; min-height: 400px; }
        .img-full { max-width: 100%; max-height: 500px; border-radius: 20px; }
        .no-img-box { text-align: center; color: #222; }
        .modal-foot { padding: 30px; border-top: 1px solid #111; display: flex; justify-content: center; }
        .btn-sec { background: #111; color: #fff; border: none; padding: 15px 30px; border-radius: 12px; font-weight: 900; cursor: pointer; }

        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

        @media (max-width: 1200px) {
            .stats-grid { grid-template-columns: 1fr; }
            .generator-container { flex-direction: column; gap: 30px; align-items: flex-start; }
            .search-box { width: 100%; }
        }
      `}</style>
    </div>
  );
}