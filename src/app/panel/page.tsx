"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import {
  User, Wallet, TrendingUp, ShieldCheck, LogOut,
  Zap, Trophy, Activity, ShieldAlert,
  Settings, HelpCircle, BarChart3, LayoutDashboard,
  Building2, Landmark, Globe, X, Terminal, ArrowUpRight, Menu
} from 'lucide-react';

const clientSupabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function SocioPanel() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [nombre, setNombre] = useState("Socio");
  const [esAdmin, setEsAdmin] = useState(false);
  const [pendientes, setPendientes] = useState(0);
  const [activeTab, setActiveTab] = useState('inicio');
  const [menuMovil, setMenuMovil] = useState(false);

  const [balance, setBalance] = useState(0);
  const [balanceVisual, setBalanceVisual] = useState(0);
  const [nivelSocio, setNivelSocio] = useState("Socio Élite");
  const [utilidad, setUtilidad] = useState(0);
  const [paisSocio, setPaisSocio] = useState("Colombia");

  const [metodoRetiro, setMetodoRetiro] = useState('banco'); 
  const [montoRetiro, setMontoRetiro] = useState('');
  const [detallesDestino, setDetallesDestino] = useState(''); 
  const [enviandoRetiro, setEnviandoRetiro] = useState(false);
  const [mensajeRetiro, setMensajeRetiro] = useState({ tipo: '', texto: '' });

  const [editNombre, setEditNombre] = useState("");
  const [editPais, setEditPais] = useState("");
  const [editTelefono, setEditTelefono] = useState("");
  const [editCiudad, setEditCiudad] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [guardandoPerfil, setGuardandoPerfil] = useState(false);

  useEffect(() => {
    const socioId = localStorage.getItem('socio_id');
    const socioNombre = localStorage.getItem('socio_nombre');
    const socioRol = localStorage.getItem('socio_rol');

    if (!socioId) {
      router.push('/login');
    } else {
      setNombre(socioNombre || "Socio");
      setEditNombre(socioNombre || "");
      // Validación inicial de rol admin desde DB
      if (socioRol === 'admin') {
        obtenerPendientesAdmin();
      }
      conectarBovedaElite(socioId);
    }
  }, [router]);

  const conectarBovedaElite = async (idSocio: string) => {
    try {
      const { data: socioBase } = await clientSupabase.from('socios').select('*').eq('id', idSocio).single();
      const { data: socioElite } = await clientSupabase.from('socios_elite').select('*').eq('id_socio', idSocio).single();

      if (socioBase && socioElite) {
        const capital = Number(socioElite.inversion_minima) || 0;
        const ganancia = Number(socioBase.utilidad_total) || 0;
        setBalance(capital + ganancia);
        setNivelSocio(socioElite.nivel_socio || "Socio Élite");
        setUtilidad(ganancia);
        setPaisSocio(socioElite.pais || "Colombia");
        setEditPais(socioElite.pais || "Colombia");
        setEditTelefono(socioElite.telefono || "");
        setEditCiudad(socioElite.ciudad || "");
        setEditEmail(socioBase.email);

        // 🛡️ PODER DE MARÍA JOSÉ: Activación de botón secreto si el email coincide
        // Inserte aquí el email real que usa María José
        if (socioBase.email === 'maria-jose@ejemplo.com' || socioBase.id === 'ID_DE_MARIA_JOSE') {
          setEsAdmin(true);
        }
      }
    } catch (err) { console.error("Error conexión:", err); }
    finally { setTimeout(() => setLoading(false), 2000); }
  };

  useEffect(() => {
    if (!loading && balance > 0) {
      let start = 0;
      const duration = 1500;
      const increment = balance / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= balance) {
          setBalanceVisual(balance);
          clearInterval(timer);
        } else {
          setBalanceVisual(start);
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [loading, balance]);

  const obtenerPendientesAdmin = async () => {
    const { count } = await clientSupabase.from('socios').select('*', { count: 'exact', head: true }).eq('estado', 'pendiente');
    setPendientes(count || 0);
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  const actualizarPerfil = async () => {
    setGuardandoPerfil(true);
    const socioId = localStorage.getItem('socio_id');
    try {
      const { error: errSocio } = await clientSupabase.from('socios').update({ nombre: editNombre }).eq('id', socioId);
      const { error: errElite } = await clientSupabase.from('socios_elite').update({ 
          pais: editPais, telefono: editTelefono, ciudad: editCiudad 
        }).eq('id_socio', socioId);
      if (!errSocio && !errElite) {
        setNombre(editNombre);
        localStorage.setItem('socio_nombre', editNombre);
        alert("Sincronización Exitosa");
      }
    } catch (err) { alert("Error"); }
    finally { setGuardandoPerfil(false); }
  };

  const procesarRetiro = async () => {
    const socioId = localStorage.getItem('socio_id');
    const valor = parseFloat(montoRetiro);
    if (!montoRetiro || !detallesDestino) { setMensajeRetiro({ tipo: 'error', texto: 'Campos requeridos' }); return; }
    if (valor > balance) { setMensajeRetiro({ tipo: 'error', texto: 'Fondos insuficientes' }); return; }
    setEnviandoRetiro(true);
    try {
      await clientSupabase.from('retiros').insert([{ 
        id_socio: socioId, monto: valor, billetera: `[${metodoRetiro.toUpperCase()}] ${detallesDestino}`, estado: 'pendiente' 
      }]);
      setMensajeRetiro({ tipo: 'exito', texto: 'Solicitud en proceso de auditoría' });
      setMontoRetiro(''); setDetallesDestino('');
    } catch (err) { setMensajeRetiro({ tipo: 'error', texto: 'Fallo en la red' }); }
    finally { setEnviandoRetiro(false); }
  };

  const RenderInicio = () => (
    <div className="fade-in">
      <header className="panel-header">
        <div className="user-salute">
          <p>ESTATUS: {nivelSocio.toUpperCase()}</p>
          <h2>Hola, <span>{nombre.split(' ')[0]}</span></h2>
        </div>
        <div className="location-tag"><Globe size={12}/> {paisSocio}</div>
      </header>

      <section className="main-vault-card">
        <div className="vault-info">
          <span>CAPITAL TOTAL BAJO GESTIÓN</span>
          <h1 className="main-balance">${balanceVisual.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h1>
          <div className="vault-status-bar">
            <div className="status-label"><div className="pulse-dot"></div> ALGORITMO ACTIVO</div>
            <div className="profit-mini">+{utilidad.toLocaleString()} USD Ganancia</div>
          </div>
        </div>
      </section>

      <div className="quick-stats-grid">
        <div className="q-card">
          <TrendingUp size={20} color="#00C853"/>
          <div className="q-data"><span>UTILIDAD NETA</span><h4>${utilidad.toLocaleString()}</h4></div>
        </div>
        <div className="q-card">
          <ShieldCheck size={20} color="#00C853"/>
          <div className="q-data"><span>AUDITORÍA</span><h4>VERIFICADA</h4></div>
        </div>
      </div>

      <div className="hub-title">CENTRO DE MANDO</div>
      <div className="operation-hub">
        <button className="hub-btn" onClick={() => setActiveTab('reportes')}><BarChart3 size={22}/> Reportes</button>
        <button className="hub-btn" onClick={() => setActiveTab('retiros')}><Wallet size={22}/> Retiros</button>
        <button className="hub-btn" onClick={() => setActiveTab('perfil')}><User size={22}/> Perfil</button>
        <button className="hub-btn" onClick={() => window.open('https://wa.me/soporte', '_blank')}><HelpCircle size={22}/> Ayuda</button>
      </div>
    </div>
  );

  if (loading) return (
    <div className="loader-screen">
      <div className="loader-ring"></div>
      <p>ACCEDIENDO A LA BÓVEDA...</p>
      <style jsx>{`
        .loader-screen { background: #000; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; color: #00C853; font-weight: 800; font-size: 11px; letter-spacing: 3px; }
        .loader-ring { width: 50px; height: 50px; border: 2px solid #111; border-top: 2px solid #00C853; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 20px; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );

  return (
    <div className="panel-master">
      {/* SIDEBAR ESCRITORIO */}
      <aside className="panel-sidebar desktop-only">
        <div className="sidebar-brand">GURÚ <span>ÉLITE</span></div>
        <nav className="sidebar-menu">
          <button className={activeTab === 'inicio' ? 'active' : ''} onClick={() => setActiveTab('inicio')}><LayoutDashboard size={18}/> Inicio</button>
          <button className={activeTab === 'reportes' ? 'active' : ''} onClick={() => setActiveTab('reportes')}><BarChart3 size={18}/> Rendimientos</button>
          <button className={activeTab === 'retiros' ? 'active' : ''} onClick={() => setActiveTab('retiros')}><Wallet size={18}/> Retiros</button>
          <button className={activeTab === 'perfil' ? 'active' : ''} onClick={() => setActiveTab('perfil')}><User size={18}/> Perfil</button>
          {esAdmin && (
            <button className="admin-special-btn" onClick={() => router.push('/admin/auth')}>
              <Terminal size={18}/> TORRE CONTROL {pendientes > 0 && <span className="alert-count">{pendientes}</span>}
            </button>
          )}
        </nav>
        <button className="sidebar-logout" onClick={handleLogout}><LogOut size={18}/> CERRAR SESIÓN</button>
      </aside>

      <div className="viewport">
        {/* NAV MÓVIL */}
        <header className="mobile-header mobile-only">
          <div className="m-brand">GURÚ <span>ÉLITE</span></div>
          {esAdmin && <button className="m-admin-btn" onClick={() => router.push('/admin/auth')}><Terminal size={20}/></button>}
        </header>

        <main className="main-content">
          {activeTab === 'inicio' && <RenderInicio />}
          {activeTab === 'retiros' && (
            <div className="fade-in">
              <h2 className="section-title">Terminal de <span>Retiros</span></h2>
              <div className="withdraw-box">
                <div className="w-balance"><span>SALDO LIQUIDABLE</span><h3>${balanceVisual.toLocaleString()}</h3></div>
                <div className="w-methods">
                  <button className={metodoRetiro === 'banco' ? 'active' : ''} onClick={() => setMetodoRetiro('banco')}><Building2 size={18}/> Banco</button>
                  <button className={metodoRetiro === 'cripto' ? 'active' : ''} onClick={() => setMetodoRetiro('cripto')}><Zap size={18}/> USDT</button>
                </div>
                {mensajeRetiro.texto && <div className={`alert ${mensajeRetiro.tipo}`}>{mensajeRetiro.texto}</div>}
                <div className="w-form">
                  <label>Monto USD</label>
                  <input type="number" placeholder="0.00" value={montoRetiro} onChange={e => setMontoRetiro(e.target.value)} />
                  <label>Detalles de transferencia</label>
                  <textarea placeholder="Banco, cuenta o wallet..." value={detallesDestino} onChange={e => setDetallesDestino(e.target.value)} />
                  <button onClick={procesarRetiro} disabled={enviandoRetiro}>{enviandoRetiro ? 'VERIFICANDO...' : 'SOLICITAR RETIRO'}</button>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'perfil' && (
            <div className="fade-in">
              <h2 className="section-title">Configuración de <span>Socio</span></h2>
              <div className="profile-grid">
                <div className="profile-card">
                  <div className="field"><span>Nombre Completo</span><input value={editNombre} onChange={e => setEditNombre(e.target.value)}/></div>
                  <div className="field"><span>País de Operación</span><input value={editPais} onChange={e => setEditPais(e.target.value)}/></div>
                  <div className="field"><span>Ciudad</span><input value={editCiudad} onChange={e => setEditCiudad(e.target.value)}/></div>
                  <div className="field"><span>Teléfono</span><input value={editTelefono} onChange={e => setEditTelefono(e.target.value)}/></div>
                  <button onClick={actualizarPerfil} disabled={guardandoPerfil}>{guardandoPerfil ? 'SINCRONIZANDO...' : 'GUARDAR CAMBIOS'}</button>
                </div>
                <div className="security-card">
                  <div className="s-row"><span>Email Asociado</span><p>{editEmail}</p></div>
                  <div className="s-row"><span>Estado de Auditoría</span><p className="v-tag">VERIFICADO</p></div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'reportes' && (
            <div className="fade-in">
              <h2 className="section-title">Estado de <span>Rendimientos</span></h2>
              <div className="report-stats">
                <div className="r-card"><span>CAPITAL SEMILLA</span><h4>${(balance - utilidad).toLocaleString()}</h4></div>
                <div className="r-card"><span>PROFIT GENERADO</span><h4 style={{color: '#00C853'}}>+${utilidad.toLocaleString()}</h4></div>
              </div>
              <div className="chart-mock">
                <div className="mock-bars">{[30, 60, 45, 80, 55, 90, 100].map((h, i) => <div key={i} className="bar" style={{height: h+'%'}}></div>)}</div>
                <div className="mock-labels"><span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span></div>
              </div>
            </div>
          )}
        </main>

        {/* TAB BAR MÓVIL */}
        <nav className="mobile-tabs mobile-only">
          <button className={activeTab === 'inicio' ? 'active' : ''} onClick={() => setActiveTab('inicio')}><LayoutDashboard size={22}/></button>
          <button className={activeTab === 'reportes' ? 'active' : ''} onClick={() => setActiveTab('reportes')}><BarChart3 size={22}/></button>
          <button className={activeTab === 'retiros' ? 'active' : ''} onClick={() => setActiveTab('retiros')}><Wallet size={22}/></button>
          <button className={activeTab === 'perfil' ? 'active' : ''} onClick={() => setActiveTab('perfil')}><User size={22}/></button>
          <button onClick={handleLogout}><LogOut size={22} color="#ff4444"/></button>
        </nav>
      </div>

      <style jsx global>{`
        :root { --neon: #00C853; --bg: #000; --panel: #050505; --border: #111; --text-muted: #444; }
        .panel-master { background: var(--bg); min-height: 100vh; display: flex; color: #fff; font-family: 'Inter', sans-serif; overflow-x: hidden; }
        .panel-sidebar { width: 260px; background: var(--panel); border-right: 1px solid var(--border); display: flex; flex-direction: column; padding: 35px 20px; position: sticky; top: 0; height: 100vh; }
        .sidebar-brand { font-weight: 900; font-size: 1.2rem; letter-spacing: -1px; margin-bottom: 50px; }
        .sidebar-brand span { color: var(--neon); }
        .sidebar-menu { flex: 1; }
        .sidebar-menu button { width: 100%; text-align: left; padding: 15px; border-radius: 12px; border: none; background: transparent; color: var(--text-muted); display: flex; align-items: center; gap: 15px; font-weight: 700; cursor: pointer; transition: 0.3s; margin-bottom: 5px; }
        .sidebar-menu button.active, .sidebar-menu button:hover { color: var(--neon); background: rgba(0,200,83,0.05); }
        .admin-special-btn { margin-top: 20px; border: 1px solid rgba(0,200,83,0.1) !important; position: relative; }
        .alert-count { position: absolute; right: 10px; background: #ff4444; color: #fff; font-size: 9px; padding: 2px 6px; border-radius: 10px; }
        .sidebar-logout { background: transparent; border: none; color: #ff4444; padding: 15px; font-weight: 800; cursor: pointer; text-align: left; }
        .viewport { flex: 1; display: flex; flex-direction: column; min-width: 0; }
        .mobile-header { height: 70px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; padding: 0 25px; background: var(--panel); }
        .m-brand { font-weight: 900; font-size: 1rem; }
        .m-brand span { color: var(--neon); }
        .m-admin-btn { background: rgba(0,200,83,0.1); border: none; color: var(--neon); width: 40px; height: 40px; border-radius: 10px; }
        .main-content { padding: 40px; max-width: 900px; margin: 0 auto; width: 100%; }
        .panel-header { margin-bottom: 30px; display: flex; justify-content: space-between; align-items: flex-start; }
        .user-salute p { font-size: 10px; color: var(--text-muted); font-weight: 900; letter-spacing: 2px; }
        .user-salute h2 { font-size: 2.2rem; font-weight: 900; margin-top: 5px; }
        .user-salute span { color: var(--neon); }
        .location-tag { background: #080808; border: 1px solid var(--border); padding: 6px 15px; border-radius: 20px; font-size: 10px; font-weight: 900; color: #666; display: flex; align-items: center; gap: 8px; }
        .main-vault-card { background: var(--panel); border: 1px solid var(--border); padding: 40px; border-radius: 30px; position: relative; overflow: hidden; }
        .vault-info span { font-size: 11px; font-weight: 900; color: var(--text-muted); letter-spacing: 2px; }
        .main-balance { font-size: clamp(2.5rem, 8vw, 4.5rem); font-weight: 900; letter-spacing: -2px; margin: 15px 0; line-height: 1; }
        .vault-status-bar { display: flex; justify-content: space-between; margin-top: 25px; border-top: 1px solid #080808; padding-top: 20px; }
        .status-label { font-size: 9px; font-weight: 900; color: var(--neon); display: flex; align-items: center; gap: 8px; }
        .pulse-dot { width: 6px; height: 6px; background: var(--neon); border-radius: 50%; animation: pulse 2s infinite; }
        .profit-mini { font-size: 10px; font-weight: 900; color: #444; }
        .quick-stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
        .q-card { background: var(--panel); border: 1px solid var(--border); padding: 20px; border-radius: 15px; display: flex; align-items: center; gap: 15px; }
        .q-data span { font-size: 9px; font-weight: 900; color: var(--text-muted); }
        .q-data h4 { font-size: 16px; font-weight: 900; }
        .hub-title { font-size: 10px; font-weight: 900; color: #222; letter-spacing: 3px; margin: 40px 0 20px; }
        .operation-hub { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; }
        .hub-btn { background: var(--panel); border: 1px solid var(--border); padding: 25px 10px; border-radius: 20px; color: #fff; font-weight: 900; font-size: 11px; cursor: pointer; transition: 0.3s; display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .hub-btn:hover { border-color: var(--neon); transform: translateY(-3px); }
        .section-title { font-size: 1.5rem; font-weight: 900; margin-bottom: 25px; }
        .section-title span { color: var(--neon); }
        .withdraw-box { background: var(--panel); border: 1px solid var(--border); padding: 30px; border-radius: 25px; }
        .w-balance h3 { font-size: 2.5rem; font-weight: 900; color: var(--neon); margin-top: 10px; }
        .w-methods { display: flex; gap: 10px; margin: 25px 0; }
        .w-methods button { flex: 1; background: #000; border: 1px solid var(--border); padding: 15px; border-radius: 12px; color: #444; font-weight: 800; cursor: pointer; }
        .w-methods button.active { border-color: var(--neon); color: var(--neon); background: rgba(0,200,83,0.05); }
        .w-form label { display: block; font-size: 10px; font-weight: 900; color: #333; margin: 15px 0 8px; text-transform: uppercase; }
        .w-form input, .w-form textarea { width: 100%; background: #000; border: 1px solid var(--border); padding: 15px; border-radius: 12px; color: #fff; font-weight: 700; outline: none; }
        .w-form button { width: 100%; background: var(--neon); border: none; padding: 20px; border-radius: 15px; color: #000; font-weight: 900; margin-top: 25px; cursor: pointer; }
        .profile-card { background: var(--panel); border: 1px solid var(--border); padding: 30px; border-radius: 25px; margin-bottom: 20px; }
        .field { margin-bottom: 20px; }
        .field span { display: block; font-size: 10px; font-weight: 900; color: #333; margin-bottom: 8px; }
        .field input { width: 100%; background: #000; border: 1px solid var(--border); padding: 15px; border-radius: 12px; color: #fff; font-weight: 700; outline: none; }
        .profile-card button { width: 100%; background: #fff; border: none; padding: 15px; border-radius: 12px; font-weight: 900; cursor: pointer; }
        .security-card { background: #080808; padding: 25px; border-radius: 20px; border: 1px solid var(--border); }
        .s-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; }
        .s-row span { font-size: 11px; font-weight: 800; color: #333; }
        .v-tag { background: rgba(0,200,83,0.1); color: var(--neon); padding: 4px 10px; border-radius: 20px; font-size: 9px; font-weight: 900; }
        .chart-mock { background: var(--panel); border: 1px solid var(--border); padding: 30px; border-radius: 25px; }
        .mock-bars { height: 150px; display: flex; align-items: flex-end; justify-content: space-between; gap: 10px; }
        .bar { width: 100%; background: var(--neon); border-radius: 4px; opacity: 0.3; }
        .mobile-tabs { position: fixed; bottom: 0; left: 0; width: 100%; height: 70px; background: rgba(5,5,5,0.95); backdrop-filter: blur(15px); border-top: 1px solid var(--border); display: flex; justify-content: space-around; align-items: center; }
        .mobile-tabs button { background: none; border: none; color: #333; cursor: pointer; }
        .mobile-tabs button.active { color: var(--neon); }
        .desktop-only { display: none; }
        @media (min-width: 1024px) { .desktop-only { display: flex; } .mobile-only { display: none !important; } }
        @media (max-width: 600px) { 
          .main-content { padding: 25px; padding-bottom: 100px; } 
          .operation-hub { grid-template-columns: repeat(2, 1fr); }
          .hub-btn { padding: 20px 10px; }
          .main-vault-card { padding: 30px 25px; }
        }
        @keyframes pulse { 50% { opacity: 0.3; } }
        .fade-in { animation: fi 0.5s ease forwards; }
        @keyframes fi { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}