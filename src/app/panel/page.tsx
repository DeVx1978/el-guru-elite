"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import {
  User, Wallet, TrendingUp, ShieldCheck, LogOut,
  Zap, Award, Star, Target, Briefcase, Bell, LayoutDashboard,
  ArrowUpRight, Activity, ShieldAlert, Trophy, ArrowRightCircle,
  Settings, HelpCircle, BarChart3, PieChart, History, PlusCircle, ChevronRight, CheckCircle2,
  Building2, Landmark, CreditCard, Smartphone, Globe, Camera, Save, Phone, Mail, 
  ShieldEllipsis, UserCheck, CandlestickChart, Download, FileText, MapPin, 
  Terminal
} from 'lucide-react';

const clientSupabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function SocioPanel() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [nombre, setNombre] = useState("Socio");
  const [esAdmin, setEsAdmin] = useState(false);
  const [pendientes, setPendientes] = useState(0);
  const [activeTab, setActiveTab] = useState('inicio');

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
      if (socioRol === 'admin') {
        setEsAdmin(true);
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
      }
    } catch (err) { console.error("Error conexión:", err); }
    finally { setTimeout(() => setLoading(false), 2000); }
  };

  useEffect(() => {
    if (!loading && balance > 0) {
      let start = 0;
      const duration = 2000;
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
        setPaisSocio(editPais);
        localStorage.setItem('socio_nombre', editNombre);
        alert("Perfil Sincronizado");
      }
    } catch (err) { alert("Error"); }
    finally { setGuardandoPerfil(false); }
  };

  const procesarRetiro = async () => {
    const socioId = localStorage.getItem('socio_id');
    const valor = parseFloat(montoRetiro);
    if (!montoRetiro || !detallesDestino) { setMensajeRetiro({ tipo: 'error', texto: 'Faltan datos' }); return; }
    if (valor > balance) { setMensajeRetiro({ tipo: 'error', texto: 'Saldo insuficiente' }); return; }
    setEnviandoRetiro(true);
    try {
      const { error } = await clientSupabase.from('retiros').insert([{ 
        id_socio: socioId, monto: valor, billetera: `[${metodoRetiro.toUpperCase()} - ${paisSocio}] ${detallesDestino}`, estado: 'pendiente' 
      }]);
      if (error) throw error;
      setMensajeRetiro({ tipo: 'exito', texto: 'Enviado' });
      setMontoRetiro(''); setDetallesDestino('');
    } catch (err) { setMensajeRetiro({ tipo: 'error', texto: 'Error' }); }
    finally { setEnviandoRetiro(false); }
  };

  const RenderInicio = () => (
    <div className="fade-in">
      <div className="welcome-banner">
        <h1>Bienvenido, <span>{nombre}</span></h1>
        <p><Globe size={14} color="#00C853" /> REGIÓN ESTRATÉGICA: {paisSocio.toUpperCase()}</p>
      </div>
      <div className="vault-grid">
        <div className="vault-card-main">
          <div className="card-top"><span className="card-label">CAPITAL BAJO GESTIÓN</span><span className="profit-badge">USD INVERSIÓN TOTAL</span></div>
          <div className="balance-display">
            <span className="symbol">$</span>
            <span className="value">{balanceVisual.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            <div className="live-status"><div className="dot"></div> LIVE</div>
          </div>
          <div className="progress-container">
            <div className="progress-labels"><span>ESTADO DEL FONDO</span><span className="exec-text">EJECUTANDO</span></div>
            <div className="bar-bg"><div className="bar-fill" style={{ width: '100%' }}></div></div>
            <div className="ai-pulse"><Activity size={12} className="pulse" /> CONEXIÓN DIRECTA CON LIQUIDEZ GLOBAL...</div>
          </div>
        </div>
        <div className="rank-card-v2">
          <div className="rank-header"><Trophy size={32} color="#00C853" /><div><p>MEMBRESÍA</p><h3>{nivelSocio}</h3></div></div>
          <div className="rank-details">
            <div className="detail-item"><span>UTILIDAD NETA</span><span className="text-neon">+${utilidad.toLocaleString()}</span></div>
            <div className="detail-item"><span>ESTADO CUENTA</span><span className="active-tag">AUDITADA</span></div>
          </div>
          <button className="upgrade-btn" onClick={() => setActiveTab('reportes')}>CERTIFICADO ÉLITE</button>
        </div>
      </div>
      <div className="section-title">CENTRO DE OPERACIONES</div>
      <div className="actions-grid-v2">
        <div className="action-tile" onClick={() => setActiveTab('reportes')}><TrendingUp color="#00C853" /> <span>Reportes</span></div>
        <div className="action-tile" onClick={() => setActiveTab('retiros')}><Wallet color="#00C853" /> <span>Retiros</span></div>
        <div className="action-tile" onClick={() => setActiveTab('perfil')}><Settings color="#00C853" /> <span>Perfil</span></div>
        <div className="action-tile" onClick={() => window.open('https://wa.me/soporte', '_blank')}><HelpCircle color="#00C853" /> <span>Soporte</span></div>
      </div>
    </div>
  );

  const RenderRetiros = () => (
    <div className="fade-in section-container">
      <h2 className="section-h2">Cajero <span>Multidivisa</span></h2>
      <div className="withdraw-card glass-effect">
        <p className="withdraw-label">Saldo Neto Disponible</p>
        <h3 className="withdraw-amount">${balanceVisual.toLocaleString()}</h3>
        <div className="method-selector">
          <div className={`method-option ${metodoRetiro === 'banco' ? 'active' : ''}`} onClick={() => setMetodoRetiro('banco')}><Building2 size={18} /> Banco Local</div>
          <div className={`method-option ${metodoRetiro === 'cripto' ? 'active' : ''}`} onClick={() => setMetodoRetiro('cripto')}><Zap size={18} /> USDT TRC20</div>
        </div>
        {mensajeRetiro.texto && (<div className={`status-alert ${mensajeRetiro.tipo}`}>{mensajeRetiro.texto}</div>)}
        <div className="input-group"><label>Monto a Retirar (USD)</label><input type="number" value={montoRetiro} onChange={(e) => setMontoRetiro(e.target.value)} placeholder="0.00" /></div>
        <div className="input-group"><label>Datos de Destino</label><textarea rows={2} value={detallesDestino} onChange={(e) => setDetallesDestino(e.target.value)} placeholder="Indique banco, cuenta o wallet..." /></div>
        <button onClick={procesarRetiro} disabled={enviandoRetiro} className="btn-withdraw-action">{enviandoRetiro ? 'VERIFICANDO...' : 'CONFIRMAR SOLICITUD'}</button>
      </div>
    </div>
  );

  const RenderPerfil = () => (
    <div className="fade-in section-container">
      <div className="identity-master-layout">
        <div className="identity-header glass-effect">
          <div className="identity-content">
            <div className="identity-avatar-main">{nombre.charAt(0)}</div>
            <div className="identity-info"><h2>{nombre}</h2><span className="tag-verify"><ShieldCheck size={14} /> INVERSOR VERIFICADO</span></div>
          </div>
        </div>
        <div className="identity-grid">
          <div className="identity-card glass-effect">
            <h3>Gestión de Identidad</h3>
            <div className="identity-form">
              <div className="field-group"><label>Nombre Completo</label><input type="text" value={editNombre} onChange={(e) => setEditNombre(e.target.value)} /></div>
              <div className="field-group"><label>País</label><input type="text" value={editPais} onChange={(e) => setEditPais(e.target.value)} /></div>
              <div className="field-group"><label>Teléfono</label><input type="text" value={editTelefono} onChange={(e) => setEditTelefono(e.target.value)} /></div>
              <button onClick={actualizarPerfil} disabled={guardandoPerfil} className="identity-btn-save">{guardandoPerfil ? 'SINCRONIZANDO...' : 'ACTUALIZAR DATOS'}</button>
            </div>
          </div>
          <div className="identity-card glass-effect">
             <h3>Seguridad de Cuenta</h3>
             <div className="sec-row"><h4>Email Corporativo</h4><p>{editEmail}</p></div>
             <div className="sec-row"><h4>ID Único de Socio</h4><p className="text-neon">{localStorage.getItem('socio_id')}</p></div>
          </div>
        </div>
      </div>
    </div>
  );

  const RenderReportes = () => (
    <div className="fade-in section-container">
      <h2 className="section-h2">Análisis de <span>Crecimiento</span></h2>
      <div className="stats-grid-mini">
        <div className="stat-box-pro"><span>Inversión</span><h3>${(balance - utilidad).toLocaleString()}</h3></div>
        <div className="stat-box-pro"><span>Ganancia</span><h3 className="text-neon">+${utilidad.toLocaleString()}</h3></div>
        <div className="stat-box-pro"><span>Total</span><h3>${balance.toLocaleString()}</h3></div>
      </div>
      <div className="chart-container glass-effect">
          <h4>Rendimiento en Tiempo Real</h4>
          <div className="fake-chart-bars">{[40, 70, 50, 90, 60, 100].map((h, i) => (<div key={i} className="v-bar" style={{height: `${h}%`}}><div className="v-glow"></div></div>))}</div>
          <div className="chart-labels"><span>MAR</span><span>ABR</span><span>MAY</span><span>JUN</span><span>JUL</span><span>AGO</span></div>
      </div>
    </div>
  );

  if (loading) return (
    <div className="loader-screen">
      <div className="guru-loader"><div className="inner-circle"><span className="logo-g">G</span></div></div>
      <p className="pulse loading-text">SINCRONIZANDO BÓVEDA...</p>
      <style jsx>{`.loader-screen{background:#000;height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center}.guru-loader{width:100px;height:100px;border-radius:50%;border:2px solid #111;display:flex;justify-content:center;align-items:center;position:relative}.guru-loader::after{content:'';position:absolute;width:100%;height:100%;border-radius:50%;border:2px solid #00C853;animation:ripple 2s infinite}.inner-circle{width:70px;height:70px;border-radius:50%;background:#050505;border:2px solid #00C853;display:flex;justify-content:center;align-items:center;box-shadow:0 0 20px rgba(0,200,83,0.3)}.logo-g{color:#00C853;font-weight:900;font-size:2rem}@keyframes ripple{0%{transform:scale(1);opacity:1}100%{transform:scale(1.5);opacity:0}}.loading-text{color:#00C853;letter-spacing:3px;font-size:10px;font-weight:900;margin-top:20px}.pulse{animation:p 2s infinite}@keyframes p{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
    </div>
  );

  return (
    <div className="app-layout">
      <aside className="sidebar-desktop">
        <div className="sidebar-header"><div className="brand-elite">GURÚ <span>ÉLITE</span></div></div>
        <nav className="sidebar-nav">
          <div className={`nav-item ${activeTab === 'inicio' ? 'active' : ''}`} onClick={() => setActiveTab('inicio')}><LayoutDashboard size={20} /> Inicio</div>
          <div className={`nav-item ${activeTab === 'reportes' ? 'active' : ''}`} onClick={() => setActiveTab('reportes')}><BarChart3 size={20} /> Reportes</div>
          <div className={`nav-item ${activeTab === 'retiros' ? 'active' : ''}`} onClick={() => setActiveTab('retiros')}><Wallet size={20} /> Retiros</div>
          <div className={`nav-item ${activeTab === 'perfil' ? 'active' : ''}`} onClick={() => setActiveTab('perfil')}><User size={20} /> Perfil</div>
          {esAdmin && (
            <div className="nav-item admin-vip-link" onClick={() => router.push('/admin')}>
              <Terminal size={20} color="#00C853" /> <span style={{color: '#00C853', fontWeight: '900'}}>TORRE CONTROL</span>
              {pendientes > 0 && <span className="alert-badge">{pendientes}</span>}
            </div>
          )}
        </nav>
        <button onClick={handleLogout} className="logout-sidebar"><LogOut size={18} /> SALIR</button>
      </aside>
      <div className="main-wrapper">
        <header className="top-navbar">
          <div className="mobile-brand">GURÚ <span>ÉLITE</span></div>
          <div className="header-actions">
            <div className="user-avatar" onClick={() => setActiveTab('perfil')}>{nombre.charAt(0)}</div>
          </div>
        </header>
        <main className="panel-content">
          {activeTab === 'inicio' && <RenderInicio />}
          {activeTab === 'reportes' && <RenderReportes />}
          {activeTab === 'retiros' && <RenderRetiros />}
          {activeTab === 'perfil' && <RenderPerfil />}
        </main>
        <nav className="mobile-tab-bar">
          <div className={activeTab === 'inicio' ? 'active' : ''} onClick={() => setActiveTab('inicio')}><LayoutDashboard size={24} /></div>
          <div className={activeTab === 'reportes' ? 'active' : ''} onClick={() => setActiveTab('reportes')}><BarChart3 size={24} /></div>
          <div className={activeTab === 'retiros' ? 'active' : ''} onClick={() => setActiveTab('retiros')}><Wallet size={24} /></div>
          <div className={activeTab === 'perfil' ? 'active' : ''} onClick={() => setActiveTab('perfil')}><User size={24} /></div>
        </nav>
      </div>
      <style jsx global>{`
        :root { --neon: #00C853; --dark: #050505; --border: #111; }
        .app-layout { background: #000; min-height: 100vh; display: flex; color: #fff; font-family: 'Inter', sans-serif; }
        .sidebar-desktop { width: 260px; background: #050505; border-right: 1px solid var(--border); display: none; flex-direction: column; padding: 30px 20px; position: sticky; top: 0; height: 100vh; }
        @media (min-width: 1024px) { .sidebar-desktop { display: flex; } }
        .brand-elite { font-weight: 900; font-size: 1.2rem; margin-bottom: 40px; }
        .brand-elite span { color: var(--neon); }
        .nav-item { padding: 15px; border-radius: 12px; display: flex; align-items: center; gap: 15px; color: #444; cursor: pointer; transition: 0.3s; font-weight: 700; position: relative; }
        .nav-item.active, .nav-item:hover { color: var(--neon); background: rgba(0,200,83,0.05); }
        .alert-badge { background: #ff4444; color: #fff; font-size: 9px; padding: 2px 6px; border-radius: 10px; position: absolute; right: 10px; }
        .logout-sidebar { margin-top: auto; background: transparent; border: none; color: #ff4444; padding: 15px; font-weight: 800; cursor: pointer; }
        .main-wrapper { flex: 1; display: flex; flex-direction: column; min-width: 0; }
        .top-navbar { height: 70px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; padding: 0 25px; }
        @media (min-width: 1024px) { .top-navbar { display: none; } }
        .mobile-brand { font-weight: 900; }
        .mobile-brand span { color: var(--neon); }
        .user-avatar { width: 35px; height: 35px; background: var(--neon); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #000; font-weight: 900; cursor: pointer; }
        .panel-content { padding: 30px; max-width: 1100px; margin: 0 auto; width: 100%; }
        @media (max-width: 600px) { .panel-content { padding: 20px; padding-bottom: 100px; } }
        .welcome-banner h1 { font-size: 2.5rem; font-weight: 900; margin: 0; }
        .welcome-banner span { color: var(--neon); }
        .welcome-banner p { font-size: 10px; font-weight: 900; color: #333; margin-top: 10px; letter-spacing: 2px; }
        .vault-grid { display: grid; grid-template-columns: 1fr; gap: 20px; margin: 30px 0; }
        @media (min-width: 1024px) { .vault-grid { grid-template-columns: 1.5fr 1fr; } }
        .vault-card-main { background: var(--dark); border: 1px solid var(--border); border-radius: 30px; padding: 40px; position: relative; overflow: hidden; }
        .card-label { font-size: 10px; font-weight: 900; color: #333; letter-spacing: 2px; }
        .balance-display { margin: 20px 0; display: flex; align-items: baseline; gap: 10px; }
        .symbol { font-size: 2rem; color: #222; font-weight: 900; }
        .value { font-size: 4.5rem; font-weight: 900; letter-spacing: -2px; }
        .live-status { background: #000; border: 1px solid #111; padding: 5px 12px; border-radius: 20px; font-size: 9px; font-weight: 900; color: var(--neon); display: flex; align-items: center; gap: 8px; }
        .dot { width: 6px; height: 6px; background: var(--neon); border-radius: 50%; box-shadow: 0 0 10px var(--neon); }
        .bar-bg { height: 6px; background: #000; border-radius: 10px; margin: 20px 0 10px; }
        .bar-fill { height: 100%; background: var(--neon); border-radius: 10px; box-shadow: 0 0 15px var(--neon); }
        .ai-pulse { font-size: 9px; color: #222; font-weight: 800; display: flex; align-items: center; gap: 8px; }
        .rank-card-v2 { background: var(--dark); border: 1px solid var(--border); border-radius: 30px; padding: 30px; display: flex; flex-direction: column; justify-content: space-between; }
        .rank-header { display: flex; align-items: center; gap: 20px; }
        .rank-header p { font-size: 9px; font-weight: 900; color: #333; margin: 0; }
        .rank-header h3 { font-size: 20px; font-weight: 900; margin: 0; color: var(--neon); }
        .detail-item { display: flex; justify-content: space-between; padding: 15px 0; border-bottom: 1px solid #080808; font-size: 11px; font-weight: 800; }
        .detail-item span:first-child { color: #333; }
        .text-neon { color: var(--neon); }
        .active-tag { background: rgba(0,200,83,0.1); color: var(--neon); padding: 4px 10px; border-radius: 20px; font-size: 9px; }
        .upgrade-btn { width: 100%; background: #fff; color: #000; border: none; padding: 15px; border-radius: 15px; font-weight: 900; font-size: 11px; cursor: pointer; transition: 0.3s; margin-top: 20px; }
        .section-title { font-size: 11px; font-weight: 900; color: #333; letter-spacing: 3px; margin: 40px 0 20px; }
        .actions-grid-v2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
        @media (min-width: 600px) { .actions-grid-v2 { grid-template-columns: repeat(4, 1fr); } }
        .action-tile { background: var(--dark); border: 1px solid var(--border); padding: 25px; border-radius: 24px; text-align: center; cursor: pointer; transition: 0.3s; }
        .action-tile:hover { border-color: var(--neon); transform: translateY(-3px); }
        .action-tile span { display: block; margin-top: 15px; font-size: 12px; font-weight: 900; }
        .withdraw-card { background: var(--dark); border: 1px solid var(--border); border-radius: 30px; padding: 40px; text-align: center; }
        .withdraw-amount { font-size: 3rem; font-weight: 900; color: var(--neon); margin: 10px 0 30px; }
        .method-selector { display: flex; gap: 15px; margin-bottom: 30px; }
        .method-option { flex: 1; background: #000; border: 1px solid #111; padding: 20px; border-radius: 15px; cursor: pointer; font-weight: 800; font-size: 12px; color: #333; transition: 0.3s; }
        .method-option.active { border-color: var(--neon); color: var(--neon); background: rgba(0,200,83,0.05); }
        .input-group { text-align: left; margin-bottom: 20px; }
        .input-group label { display: block; font-size: 10px; font-weight: 900; color: #333; margin-bottom: 10px; letter-spacing: 1px; }
        .input-group input, .input-group textarea { width: 100%; background: #000; border: 1px solid #111; padding: 18px; border-radius: 15px; color: #fff; outline: none; font-weight: 700; }
        .btn-withdraw-action { width: 100%; background: var(--neon); color: #000; border: none; padding: 20px; border-radius: 18px; font-weight: 900; cursor: pointer; }
        .mobile-tab-bar { position: fixed; bottom: 0; left: 0; width: 100%; height: 70px; background: rgba(5,5,5,0.95); backdrop-filter: blur(15px); border-top: 1px solid var(--border); display: flex; justify-content: space-around; align-items: center; z-index: 100; }
        @media (min-width: 1024px) { .mobile-tab-bar { display: none; } }
        .mobile-tab-bar div { color: #333; cursor: pointer; transition: 0.3s; }
        .mobile-tab-bar div.active { color: var(--neon); }
        .fade-in { animation: f 0.6s ease; }
        @keyframes f { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}