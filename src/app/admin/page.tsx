"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { 
  Users, Wallet, Bell, ShieldCheck, Trash2, Image as ImageIcon,
  LogOut, Smartphone, Mail, Globe, Lock, CheckCircle, XCircle, UserX, Search
} from 'lucide-react';

const clientSupabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function AdminTotalMJ() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pendientes'); 
  const [socios, setSocios] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalCapital: 0, pendientes: 0 });

  useEffect(() => {
    const rol = localStorage.getItem('socio_rol');
    if (rol !== 'admin') { router.push('/panel'); }
    else { cargarDataMaestra(); }
  }, [router]);

  const cargarDataMaestra = async () => {
    setLoading(true);
    try {
      // Traemos la info de inversión y la info personal del socio
      const { data: elite } = await clientSupabase.from('socios_elite').select('*, socios(*)');
      if (elite) {
        setSocios(elite);
        const total = elite.reduce((acc, curr) => acc + Number(curr.inversion_minima || 0), 0);
        const pend = elite.filter(s => s.socios?.estado === 'pendiente').length;
        setStats({ totalCapital: total, pendientes: pend });
      }
    } catch (e) { console.error("Error cargando datos:", e); }
    finally { setLoading(false); }
  };

  // ESTA ES LA FUNCIÓN QUE TENÍAS AYER PARA ACTIVAR CUENTAS
  const gestionarEstado = async (idSocio: string, nuevoEstado: string) => {
    const { error } = await clientSupabase
      .from('socios')
      .update({ estado: nuevoEstado })
      .eq('id', idSocio);

    if (!error) {
      alert(`SOCIO ACTUALIZADO: Ahora está ${nuevoEstado}`);
      cargarDataMaestra(); // Recargamos para que desaparezca de pendientes
    } else {
      alert("Error al actualizar: " + error.message);
    }
  };

  const eliminarSocio = async (idSocio: string) => {
    if (confirm("¿Estás segura, María José? Esto borrará al socio de la faz de la tierra.")) {
      await clientSupabase.from('socios').delete().eq('id', idSocio);
      cargarDataMaestra();
    }
  };

  if (loading) return <div className="admin-loading">RECONECTANDO SISTEMAS...</div>;

  return (
    <div className="admin-wrapper">
      <aside className="admin-nav">
        <div className="admin-logo">GURÚ <span>ADMIN</span></div>
        <div className="mj-badge">
          <div className="mj-avatar">MJ</div>
          <p>María José</p>
          <span>Super Administradora</span>
        </div>
        <nav>
          <div className={`nav-link ${activeTab === 'pendientes' ? 'active' : ''}`} onClick={() => setActiveTab('pendientes')}>
            <Bell size={18} /> Pendientes {stats.pendientes > 0 && <span className="noti-count">{stats.pendientes}</span>}
          </div>
          <div className={`nav-link ${activeTab === 'todos' ? 'active' : ''}`} onClick={() => setActiveTab('todos')}>
            <Users size={18} /> Todos los Socios
          </div>
        </nav>
        <button className="exit-btn" onClick={() => router.push('/panel')}><LogOut size={16}/> VOLVER AL PANEL</button>
      </aside>

      <main className="admin-content">
        <header className="admin-header-stats">
          <div className="stat-box"><span>CAPITAL BAJO GESTIÓN</span><h2>${stats.totalCapital.toLocaleString()}</h2></div>
          <div className="stat-box"><span>SOCIOS ACTIVOS</span><h2>{socios.filter(s => s.socios?.estado === 'activo').length}</h2></div>
        </header>

        <section className="admin-table-container">
          {activeTab === 'pendientes' ? (
            <>
              <h3>Cuentas Esperando Activación</h3>
              <table className="mj-table">
                <thead><tr><th>Socio / Email</th><th>Membresía</th><th>Pago</th><th>Acciones de María José</th></tr></thead>
                <tbody>
                  {socios.filter(s => s.socios?.estado === 'pendiente').map(s => (
                    <tr key={s.id}>
                      <td><strong>{s.socios?.nombre}</strong><br/>{s.socios?.correo}</td>
                      <td>{s.nivel_socio}</td>
                      <td>
                        <a href={s.socios?.comprobante_url} target="_blank" className="view-pay">
                          <ImageIcon size={14}/> Ver Comprobante
                        </a>
                      </td>
                      <td className="action-btns">
                        <button onClick={() => gestionarEstado(s.id_socio, 'activo')} className="btn-activate">ACTUAR / ACTIVAR</button>
                        <button onClick={() => eliminarSocio(s.id_socio)} className="btn-reject">RECHAZAR</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <>
              <h3>Base de Datos Maestra</h3>
              <table className="mj-table">
                <thead><tr><th>Socio</th><th>Ubicación / Tel</th><th>Seguridad</th><th>Estado</th><th>Gestión</th></tr></thead>
                <tbody>
                  {socios.map(s => (
                    <tr key={s.id}>
                      <td><strong>{s.socios?.nombre}</strong><br/>{s.nivel_socio}</td>
                      <td>{s.pais}<br/>{s.telefono}</td>
                      <td>{s.socios?.correo}<br/><span style={{color:'#444'}}>{s.socios?.password}</span></td>
                      <td><span className={`status-pill ${s.socios?.estado}`}>{s.socios?.estado}</span></td>
                      <td className="action-btns">
                        <button onClick={() => gestionarEstado(s.id_socio, 'suspendido')} className="btn-susp">SUSPENDER</button>
                        <button onClick={() => eliminarSocio(s.id_socio)} className="btn-reject"><Trash2 size={14}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </section>
      </main>

      <style jsx>{`
        .admin-wrapper { display: flex; background: #000; min-height: 100vh; color: #fff; font-family: 'Inter', sans-serif; }
        .admin-nav { width: 280px; background: #050505; border-right: 1px solid #111; padding: 40px 20px; display: flex; flex-direction: column; }
        .admin-logo { font-size: 1.5rem; font-weight: 900; margin-bottom: 40px; }
        .admin-logo span { color: #00C853; }
        .mj-badge { text-align: center; margin-bottom: 40px; border-bottom: 1px solid #111; padding-bottom: 20px; }
        .mj-avatar { width: 60px; height: 60px; background: #00C853; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; font-weight: 900; color: #000; font-size: 1.2rem; }
        .mj-badge p { font-weight: 800; margin: 0; }
        .mj-badge span { font-size: 10px; color: #444; text-transform: uppercase; }
        .nav-link { padding: 15px; margin: 5px 0; cursor: pointer; display: flex; align-items: center; gap: 15px; border-radius: 12px; color: #444; font-weight: 700; transition: 0.3s; position: relative; }
        .nav-link.active { background: rgba(0,200,83,0.1); color: #00C853; }
        .noti-count { position: absolute; right: 15px; background: #ff4444; color: #fff; font-size: 10px; padding: 2px 6px; border-radius: 10px; }
        .admin-content { flex: 1; padding: 40px; overflow-y: auto; }
        .admin-header-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 40px; }
        .stat-box { background: #050505; border: 1px solid #111; padding: 25px; border-radius: 20px; }
        .stat-box span { font-size: 10px; color: #444; font-weight: 900; }
        .stat-box h2 { color: #00C853; margin-top: 10px; }
        .admin-table-container { background: #050505; border: 1px solid #111; border-radius: 25px; padding: 30px; }
        .mj-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .mj-table th { text-align: left; color: #333; padding: 15px; border-bottom: 1px solid #111; font-size: 11px; }
        .mj-table td { padding: 15px; border-bottom: 1px solid #080808; font-size: 13px; }
        .btn-activate { background: #00C853; color: #000; border: none; padding: 8px 15px; border-radius: 8px; font-weight: 900; cursor: pointer; }
        .btn-activate:hover { background: #00e676; }
        .btn-reject { background: rgba(255,68,68,0.1); color: #ff4444; border: 1px solid #ff444433; padding: 8px; border-radius: 8px; cursor: pointer; }
        .btn-susp { background: #1a1a1a; color: #fff; border: none; padding: 8px 15px; border-radius: 8px; cursor: pointer; }
        .view-pay { color: #00C853; text-decoration: none; font-weight: 800; font-size: 11px; }
        .status-pill { padding: 4px 8px; border-radius: 4px; font-size: 10px; font-weight: 900; text-transform: uppercase; }
        .status-pill.activo { background: rgba(0,200,83,0.1); color: #00C853; }
        .status-pill.pendiente { background: rgba(255,152,0,0.1); color: #ff9800; }
        .exit-btn { margin-top: auto; background: #111; border: none; color: #fff; padding: 15px; border-radius: 12px; cursor: pointer; font-weight: 800; }
        .admin-loading { height: 100vh; background: #000; color: #00C853; display: flex; justify-content: center; align-items: center; font-weight: 900; }
      `}</style>
    </div>
  );
}