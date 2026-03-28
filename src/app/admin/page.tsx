"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  ShieldCheck, Users, CheckCircle, Eye, Search, 
  X, LogOut, Trash2, Loader2, Menu 
} from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminPanel() {
  const [socios, setSocios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalImagen, setModalImagen] = useState({ open: false, url: '', nombre: '' });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('socios')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setSocios(data || []);
    } catch (err) {
      console.error("Error en Auditoría:", err);
    } finally {
      setLoading(false);
    }
  }

  const actualizarEstado = async (id: string, nuevoEstado: string) => {
    const { error } = await supabase
      .from('socios')
      .update({ estado: nuevoEstado })
      .eq('id', id);
    if (!error) fetchData();
  };

  const eliminarSocio = async (id: string, nombre: string) => {
    if (!confirm(`¿ELIMINAR A ${nombre.toUpperCase()}?`)) return;
    const { error } = await supabase.from('socios').delete().eq('id', id);
    if (!error) fetchData();
  };

  const totalCapital = socios
    .filter(s => s.estado === 'activo')
    .reduce((acc, s) => acc + (Number(s.inversion) || 0), 0);

  if (loading) {
    return (
      <div style={{ height: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 style={{ animation: 'spin 1s linear infinite', color: '#00C853' }} size={40} />
      </div>
    );
  }

  return (
    <div className="admin-container">
      {/* SIDEBAR */}
      <aside className={`sidebar ${menuOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <ShieldCheck color="#00C853" size={28} />
          <div className="brand">
            <h2>GURÚ <span>ÉLITE</span></h2>
            <p>CONTROL CENTRAL</p>
          </div>
          <button className="close-menu" onClick={() => setMenuOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <nav className="nav-menu">
          <button className="nav-link active">
            <Users size={18} /> PORTAFOLIO
          </button>
        </nav>
        <button className="btn-logout" onClick={() => window.location.href='/panel'}>
          <LogOut size={16} /> SALIR
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <header className="header">
          <button className="menu-trigger" onClick={() => setMenuOpen(true)}>
            <Menu size={24} />
          </button>
          <div className="header-info">
            <p>OPERADOR ACTUAL</p>
            <h3>MARÍA JOSÉ</h3>
          </div>
          <div className="stats-header">
            <span>TOTAL GESTIONADO</span>
            <h3 className="neon-green">${totalCapital.toLocaleString()}</h3>
          </div>
        </header>

        <div className="view-content">
          <div className="content-top">
            <h2>REGISTROS <span>MAESTROS</span></h2>
            <div className="search-box">
              <Search size={16} color="#444" />
              <input 
                placeholder="BUSCAR INVERSOR..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
            </div>
          </div>

          {/* DESKTOP VIEW */}
          <div className="desktop-view">
            <table className="table">
              <thead>
                <tr>
                  <th>FECHA</th>
                  <th>INVERSOR</th>
                  <th>PLAN</th>
                  <th>CAPITAL</th>
                  <th>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {socios
                  .filter(s => s.nombre?.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((s) => (
                    <tr key={s.id}>
                      <td className="date-td">{new Date(s.created_at).toLocaleDateString('es-ES')}</td>
                      <td>
                        <div className="u-data">
                          <strong>{s.nombre}</strong>
                          <span>{s.email}</span>
                        </div>
                      </td>
                      <td><span className="badge-plan">{s.plan || 'N/A'}</span></td>
                      <td className="neon-green font-bold">
                        ${Number(s.inversion || 0).toLocaleString()}
                      </td>
                      <td className="actions-td">
                        <div className="actions-flex">
                          <button 
                            onClick={() => setModalImagen({ open: true, url: s.comprobante_url || '', nombre: s.nombre })}
                            className="action-btn view-btn"
                          >
                            <Eye size={16} /> VER
                          </button>
                          {s.estado === 'pendiente' && (
                            <button 
                              onClick={() => actualizarEstado(s.id, 'activo')} 
                              className="action-btn approve-btn"
                            >
                              <CheckCircle size={16} /> APROBAR
                            </button>
                          )}
                          <button 
                            onClick={() => eliminarSocio(s.id, s.nombre)} 
                            className="action-btn delete-btn"
                          >
                            <Trash2 size={16} /> ELIMINAR
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE VIEW - Intacta */}
          <div className="mobile-view">
            {socios
              .filter(s => s.nombre?.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((s) => (
                <div key={s.id} className="card-socio">
                  <div className="card-head">
                    <div className="card-user">
                      <strong>{s.nombre}</strong>
                      <span className="user-email">{s.email}</span>
                    </div>
                    <span className={`status-badge ${s.estado || 'pendiente'}`}>
                      {(s.estado || 'PENDIENTE').toUpperCase()}
                    </span>
                  </div>

                  <div className="card-details">
                    <div className="detail-row">
                      <span className="detail-label">PLAN</span>
                      <span className="detail-value">{s.plan || 'N/A'}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">INVERSIÓN</span>
                      <span className="detail-value neon-green">
                        ${Number(s.inversion || 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">REGISTRO</span>
                      <span className="detail-value date">
                        {new Date(s.created_at).toLocaleDateString('es-ES')}
                      </span>
                    </div>
                  </div>

                  <div className="card-actions-mobile">
                    <button 
                      onClick={() => setModalImagen({ open: true, url: s.comprobante_url || '', nombre: s.nombre })}
                      className="action-btn view-btn"
                    >
                      <Eye size={16} /> VER COMPROBANTE
                    </button>
                    
                    {s.estado === 'pendiente' && (
                      <button 
                        onClick={() => actualizarEstado(s.id, 'activo')} 
                        className="action-btn approve-btn"
                      >
                        <CheckCircle size={16} /> APROBAR
                      </button>
                    )}

                    <button 
                      onClick={() => eliminarSocio(s.id, s.nombre)} 
                      className="action-btn delete-btn"
                    >
                      <Trash2 size={16} /> ELIMINAR
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </main>

      {/* MODAL VOUCHER - Tamaño corregido y adaptado */}
      {modalImagen.open && (
        <div className="modal-overlay" onClick={() => setModalImagen({ open: false, url: '', nombre: '' })}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-top-bar">
              <h3>VOUCHER: {modalImagen.nombre.toUpperCase()}</h3>
              <button onClick={() => setModalImagen({ open: false, url: '', nombre: '' })}>
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              {modalImagen.url ? (
                <img src={modalImagen.url} alt="Comprobante" className="voucher-image" />
              ) : (
                <div className="no-pago">SIN IMAGEN DISPONIBLE</div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .admin-container { display: flex; min-height: 100vh; background: #000; color: #fff; }
        
        .sidebar { 
          width: 260px; 
          background: #050505; 
          border-right: 1px solid #111; 
          padding: 40px 20px; 
          position: fixed; 
          height: 100vh; 
          transition: 0.3s; 
          z-index: 1000; 
          left: -260px; 
        }
        .sidebar.active { left: 0; }

        .brand h2 { font-size: 15px; font-weight: 900; letter-spacing: 2px; margin: 0; }
        .brand span { color: #00C853; }
        .brand p { font-size: 8px; color: #333; margin: 0; font-weight: 900; letter-spacing: 3px; }

        .close-menu { display: none; background: none; border: none; color: #fff; cursor: pointer; }

        .nav-menu { margin-top: 50px; display: flex; flex-direction: column; gap: 10px; }
        .nav-link { 
          background: none; 
          border: none; 
          color: #444; 
          padding: 15px; 
          border-radius: 12px; 
          display: flex; 
          align-items: center; 
          gap: 15px; 
          cursor: pointer; 
          font-weight: 800; 
          font-size: 12px; 
        }
        .nav-link.active { background: rgba(0, 200, 83, 0.05); color: #00C853; }

        .btn-logout { 
          background: none; 
          border: 1px solid #111; 
          color: #333; 
          padding: 15px; 
          border-radius: 12px; 
          cursor: pointer; 
          font-weight: 900; 
          font-size: 11px; 
        }

        .main-content { flex: 1; margin-left: 260px; padding: 40px; transition: 0.3s; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 50px; }
        .header-info p { font-size: 9px; color: #444; letter-spacing: 3px; margin: 0; font-weight: 900; }
        .header-info h3 { font-size: 24px; margin: 0; font-weight: 900; }
        .neon-green { color: #00C853; text-shadow: 0 0 10px rgba(0,200,83,0.3); }

        .content-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
        .content-top h2 { font-size: 14px; letter-spacing: 3px; margin: 0; font-weight: 900; }
        .content-top h2 span { color: #00C853; }

        .search-box { 
          background: #050505; 
          border: 1px solid #111; 
          padding: 10px 20px; 
          border-radius: 50px; 
          display: flex; 
          align-items: center; 
          gap: 12px; 
          width: 300px; 
        }
        .search-box input { background: none; border: none; color: #fff; outline: none; width: 100%; font-size: 12px; }

        /* Tabla Escritorio */
        .desktop-view {
          background: #050505;
          border: 1px solid #111;
          border-radius: 24px;
          overflow: hidden;
        }

        .table { width: 100%; border-collapse: collapse; }
        th { 
          text-align: left; 
          padding: 24px 20px; 
          font-size: 10px; 
          color: #555; 
          letter-spacing: 2px; 
          text-transform: uppercase; 
          font-weight: 900; 
          border-bottom: 1px solid #111; 
        }
        td { 
          padding: 22px 20px; 
          border-bottom: 1px solid #0a0a0a; 
          font-size: 14.5px; 
        }

        .u-data strong { display: block; font-weight: 900; text-transform: uppercase; margin-bottom: 4px; }
        .u-data span { font-size: 12.5px; color: #777; }
        .badge-plan { 
          color: #00B0FF; 
          background: rgba(0, 176, 255, 0.08); 
          padding: 6px 12px; 
          border-radius: 8px; 
          font-size: 11px; 
          font-weight: 900; 
        }

        .actions-flex { display: flex; gap: 12px; }

        .action-btn {
          background: #111;
          border: 1px solid #333;
          color: #ddd;
          padding: 10px 16px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .action-btn:hover {
          background: #1a1a1a;
          border-color: #555;
          color: #fff;
          transform: translateY(-2px);
        }

        .view-btn { border-color: #00C853; color: #00C853; }
        .approve-btn { border-color: #00C853; color: #00C853; }
        .delete-btn { border-color: #FF3D00; color: #FF3D00; }

        /* ==================== MODAL VOUCHER - TAMAÑO CORREGIDO ==================== */
        .modal-overlay { 
          position: fixed; 
          inset: 0; 
          background: rgba(0,0,0,0.95); 
          z-index: 5000; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          padding: 20px; 
        }

        .modal-content { 
          background: #050505; 
          border: 1px solid #222; 
          width: 100%; 
          max-width: 580px; 
          border-radius: 24px; 
          overflow: hidden; 
          max-height: 92vh; 
        }

        .modal-top-bar { 
          padding: 20px 25px; 
          border-bottom: 1px solid #111; 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
        }

        .modal-body { 
          padding: 20px; 
          overflow-y: auto; 
          background: #000; 
          display: flex; 
          justify-content: center; 
          align-items: center; 
        }

        .voucher-image { 
          max-width: 100%; 
          max-height: 78vh; 
          border-radius: 12px; 
          object-fit: contain; 
        }

        .no-pago { 
          color: #555; 
          font-size: 16px; 
          padding: 60px 20px; 
          text-align: center; 
        }

        /* Mobile View intacta */
        .mobile-view { display: none; flex-direction: column; gap: 20px; padding-bottom: 40px; }

        .card-socio { background: #050505; border: 1px solid #111; border-radius: 22px; padding: 24px; transition: all 0.3s ease; }

        .card-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
        .card-user strong { font-size: 16px; font-weight: 900; text-transform: uppercase; display: block; }
        .user-email { font-size: 12.5px; color: #666; margin-top: 3px; }

        .status-badge { 
          font-size: 9.5px; 
          font-weight: 900; 
          padding: 6px 12px; 
          border-radius: 8px; 
          text-transform: uppercase; 
        }
        .status-badge.pendiente { background: rgba(255, 214, 0, 0.15); color: #FFD600; }
        .status-badge.activo { background: rgba(0, 200, 83, 0.15); color: #00C853; }

        .card-details { background: #0a0a0a; border-radius: 14px; padding: 16px; margin-bottom: 22px; border: 1px solid #111; }
        .detail-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #111; }
        .detail-row:last-child { border-bottom: none; }
        .detail-label { font-size: 10px; color: #555; font-weight: 700; letter-spacing: 1px; }
        .detail-value { font-weight: 900; font-size: 14px; }

        .card-actions-mobile { display: flex; flex-direction: column; gap: 10px; }

        .action-btn {
          width: 100%;
          padding: 14px 18px;
          border-radius: 12px;
          font-size: 12.5px;
          font-weight: 900;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 1px solid #222;
          background: #080808;
          cursor: pointer;
          transition: all 0.3s;
        }

        .view-btn { border-color: #00C853; color: #00C853; }
        .approve-btn { border-color: #00C853; color: #00C853; }
        .delete-btn { border-color: #FF3D00; color: #FF3D00; }

        /* Responsive */
        .menu-trigger { display: none; }

        @media (max-width: 1024px) {
          .sidebar { left: -260px; }
          .sidebar.active { left: 0; }
          .close-menu { display: block; }
          .main-content { margin-left: 0; padding: 20px; }
          .desktop-view { display: none; }
          .mobile-view { display: flex; }
          .menu-trigger { display: block; }
          .stats-header { display: none; }
          .search-box { width: 100%; }
        }
      `}</style>
    </div>
  );
}