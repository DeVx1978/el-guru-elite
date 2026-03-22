"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { 
  Users, Wallet, Bell, ShieldCheck, Trash2, Image as ImageIcon,
  LogOut, Smartphone, Mail, Globe, Lock, CheckCircle, XCircle, UserX
} from 'lucide-react';

const clientSupabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function AdminConsole() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('notificaciones'); 
  const [socios, setSocios] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalCapital: 0, pendientes: 0 });

  useEffect(() => {
    const rol = localStorage.getItem('socio_rol');
    if (rol !== 'admin') { router.push('/panel'); }
    else { cargarDataMaestra(); }
  }, []);

  const cargarDataMaestra = async () => {
    setLoading(true);
    try {
      const { data: elite } = await clientSupabase.from('socios_elite').select('*, socios(*)');
      if (elite) {
        setSocios(elite);
        const total = elite.reduce((acc, curr) => acc + Number(curr.inversion_minima || 0), 0);
        const pend = elite.filter(s => s.socios?.estado === 'pendiente').length;
        setStats({ totalCapital: total, pendientes: pend });
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const ejecutarAccion = async (id: string, estado: string) => {
    const { error } = await clientSupabase.from('socios').update({ estado }).eq('id', id);
    if (!error) { alert(`Operación Exitosa: Socio ${estado}`); cargarDataMaestra(); }
  };

  const eliminarDefinitivo = async (id: string) => {
    if (confirm("¿Eliminar socio permanentemente?")) {
      await clientSupabase.from('socios').delete().eq('id', id);
      cargarDataMaestra();
    }
  };

  if (loading) return <div className="admin-loading">INICIANDO SISTEMA DE CONTROL...</div>;

  return (
    <div className="admin-wrapper">
      <aside className="admin-nav">
        <div className="admin-logo">GURÚ <span>ADMIN</span></div>
        <div className="admin-user-card">
          <div className="mj-avatar">MJ</div>
          <p>María José</p>
        </div>
        <nav>
          <div className={`nav-link ${activeTab === 'notificaciones' ? 'active' : ''}`} onClick={() => setActiveTab('notificaciones')}>
            <Bell size={20} /> Notificaciones {stats.pendientes > 0 && <span className="alert-dot">{stats.pendientes}</span>}
          </div>
          <div className={`nav-link ${activeTab === 'socios' ? 'active' : ''}`} onClick={() => setActiveTab('socios')}>
            <Users size={20} /> Base de Datos
          </div>
        </nav>
        <button className="exit-btn" onClick={() => router.push('/panel')}><LogOut size={18}/> PANEL SOCIO</button>
      </aside>

      <main className="admin-main-content">
        <header className="admin-top-stats">
          <div className="mini-stat"><span>CAPITAL TOTAL GESTIONADO</span><h2>${stats.totalCapital.toLocaleString()}</h2></div>
          <div className="mini-stat"><span>SOCIOS REGISTRADOS</span><h2>{socios.length}</h2></div>
        </header>

        <section className="admin-panel-area">
          {activeTab === 'notificaciones' ? (
            <div className="admin-card-table">
              <h2>Solicitudes de Ingreso (Pendientes)</h2>
              <table className="pro-table">
                <thead><tr><th>Socio</th><th>Membresía</th><th>Comprobante</th><th>Acciones</th></tr></thead>
                <tbody>
                  {socios.filter(s => s.socios?.estado === 'pendiente').map(s => (
                    <tr key={s.id}>
                      <td><strong>{s.socios?.nombre}</strong><br/>{s.socios?.correo}</td>
                      <td>{s.nivel_socio}</td>
                      <td><a href={s.socios?.comprobante_url} target="_blank" className="btn-link"><ImageIcon size={14}/> Ver Pago</a></td>
                      <td>
                        <button onClick={() => ejecutarAccion(s.id_socio, 'activo')} className="btn-done">APROBAR</button>
                        <button onClick={() => eliminarDefinitivo(s.id_socio)} className="btn-del">RECHAZAR</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="admin-card-table">
              <h2>Expediente Completo de Socios</h2>
              <table className="pro-table">
                <thead><tr><th>Datos Personales</th><th>Contacto/País</th><th>Seguridad</th><th>Gestión</th></tr></thead>
                <tbody>
                  {socios.map(s => (
                    <tr key={s.id}>
                      <td><strong>{s.socios?.nombre}</strong><br/>{s.nivel_socio}</td>
                      <td><Globe size={12}/> {s.pais}<br/><Smartphone size={12}/> {s.telefono}</td>
                      <td><Mail size={12}/> {s.socios?.correo}<br/><Lock size={12}/> {s.socios?.password}</td>
                      <td>
                        <div className="action-row">
                          <button onClick={() => ejecutarAccion(s.id_socio, 'suspendido')} className="btn-susp" title="Suspender">⏸</button>
                          <button onClick={() => eliminarDefinitivo(s.id_socio)} className="btn-del" title="Eliminar"><Trash2 size={16}/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      <style jsx>{`
        .admin-wrapper { display: flex; background: #000; min-height: 100vh; color: #fff; font-family: 'Inter', sans-serif; }
        .admin-nav { width: 280px; background: #050505; border-right: 1px solid #111; padding: 40px 20px; display: flex; flex-direction: column; }
        .admin-logo { font-size: 1.5rem; font-weight: 900; margin-bottom: 40px; }
        .admin-logo span { color: #00C853; }
        .mj-avatar { width: 70px; height: 70px; background: #00C853; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 10px; font-weight: 900; color: #000; font-size: 1.5rem; }
        .nav-link { padding: 15px; margin: 5px 0; cursor: pointer; display: flex; align-items: center; gap: 15px; border-radius: 12px; color: #555; font-weight: 700; position: relative; }
        .nav-link.active { background: rgba(0,200,83,0.1); color: #00C853; }
        .alert-dot { position: absolute; right: 15px; background: #ff4444; color: #fff; font-size: 10px; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .admin-main-content { flex: 1; padding: 40px; overflow-y: auto; }
        .admin-top-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 40px; }
        .mini-stat { background: #050505; border: 1px solid #111; padding: 25px; border-radius: 20px; }
        .mini-stat span { font-size: 10px; color: #444; letter-spacing: 1px; font-weight: 900; }
        .mini-stat h2 { color: #00C853; margin-top: 10px; font-size: 1.8rem; }
        .admin-card-table { background: #050505; border: 1px solid #111; border-radius: 25px; padding: 30px; }
        .pro-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .pro-table th { text-align: left; color: #333; padding: 15px; border-bottom: 1px solid #111; font-size: 11px; text-transform: uppercase; }
        .pro-table td { padding: 15px; border-bottom: 1px solid #080808; font-size: 13px; line-height: 1.4; }
        .btn-done { background: #00C853; color: #000; border: none; padding: 8px 15px; border-radius: 8px; font-weight: 900; cursor: pointer; }
        .btn-susp { background: #222; color: #fff; border: none; padding: 8px 12px; border-radius: 8px; cursor: pointer; }
        .btn-del { background: rgba(255,68,68,0.1); color: #ff4444; border: 1px solid #ff444422; padding: 8px; border-radius: 8px; cursor: pointer; }
        .btn-link { color: #00C853; text-decoration: none; font-weight: 800; font-size: 11px; }
        .exit-btn { margin-top: auto; background: #111; border: none; color: #fff; padding: 15px; border-radius: 12px; cursor: pointer; font-weight: 800; }
        .admin-loading { height: 100vh; background: #000; color: #00C853; display: flex; justify-content: center; align-items: center; font-weight: 900; letter-spacing: 3px; }
      `}</style>
    </div>
  );
}