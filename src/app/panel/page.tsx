"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import {
  User, Wallet, TrendingUp, ShieldCheck, LogOut,
  Zap, Award, Star, Target, Briefcase, Bell, LayoutDashboard,
  ArrowUpRight, Activity, ShieldAlert, Trophy, ArrowRightCircle,
  Settings, HelpCircle, BarChart3, PieChart, History, PlusCircle, ChevronRight, CheckCircle2,
  Building2, Landmark, CreditCard, Smartphone, Globe, Camera, Save, Phone, Mail, ShieldEllipsis, UserCheck
} from 'lucide-react';

const clientSupabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function SocioPanel() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [nombre, setNombre] = useState("Socio");
  const [esAdmin, setEsAdmin] = useState(false);
  const [pendientes, setPendientes] = useState(0);
  const [activeTab, setActiveTab] = useState('inicio');

  // 💉 ESTADOS FINANCIEROS REALES
  const [balance, setBalance] = useState(0);
  const [balanceVisual, setBalanceVisual] = useState(0);
  const [nivelSocio, setNivelSocio] = useState("Socio Élite");
  const [utilidad, setUtilidad] = useState(0);
  const [paisSocio, setPaisSocio] = useState("Colombia");

  // 💰 ESTADOS DE RETIRO AVANZADO
  const [metodoRetiro, setMetodoRetiro] = useState('banco'); 
  const [montoRetiro, setMontoRetiro] = useState('');
  const [detallesDestino, setDetallesDestino] = useState(''); 
  const [enviandoRetiro, setEnviandoRetiro] = useState(false);
  const [mensajeRetiro, setMensajeRetiro] = useState({ tipo: '', texto: '' });

  // 👤 ESTADOS DE IDENTIDAD ÉLITE
  const [editNombre, setEditNombre] = useState("");
  const [editPais, setEditPais] = useState("");
  const [editTelefono, setEditTelefono] = useState("");
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
      const { data, error } = await clientSupabase
        .from('socios_elite')
        .select('inversion_minima, nivel_socio, porcentaje_utilidad, pais')
        .eq('id_socio', idSocio)
        .single();

      if (data) {
        setBalance(Number(data.inversion_minima));
        setNivelSocio(data.nivel_socio || "Socio Élite");
        setUtilidad(Number(data.porcentaje_utilidad) || 0);
        if (data.pais) {
          setPaisSocio(data.pais);
          setEditPais(data.pais);
        }
      }
      // Simulamos la obtención de email de la cuenta base
      setEditEmail(`${idSocio}@elguruelite.com`);
    } catch (err) { console.error("Error de conexión:", err); }
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
    const { data: retirosData } = await clientSupabase.from('retiros').select('id').eq('estado', 'pendiente');
    const { data: sociosData } = await clientSupabase.from('socios').select('id').eq('estado', 'pendiente');
    setPendientes((retirosData?.length || 0) + (sociosData?.length || 0));
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
      const { error: errElite } = await clientSupabase.from('socios_elite').update({ pais: editPais }).eq('id_socio', socioId);
      if (!errSocio && !errElite) {
        setNombre(editNombre); setPaisSocio(editPais);
        localStorage.setItem('socio_nombre', editNombre);
        alert("Sincronización de Identidad Exitosa");
      }
    } catch (err) { alert("Error en la red"); }
    finally { setGuardandoPerfil(false); }
  };

  const procesarRetiro = async () => {
    const socioId = localStorage.getItem('socio_id');
    const valor = parseFloat(montoRetiro);
    if (!montoRetiro || !detallesDestino) { setMensajeRetiro({ tipo: 'error', texto: 'Complete todos los datos.' }); return; }
    if (valor > balance) { setMensajeRetiro({ tipo: 'error', texto: 'Saldo insuficiente.' }); return; }
    setEnviandoRetiro(true);
    try {
      const { error } = await clientSupabase.from('retiros').insert([{ 
        id_socio: socioId, monto: valor, billetera: `[${metodoRetiro.toUpperCase()} - ${paisSocio}] ${detallesDestino}`, estado: 'pendiente' 
      }]);
      if (error) throw error;
      setMensajeRetiro({ tipo: 'exito', texto: 'Solicitud enviada.' });
      setMontoRetiro(''); setDetallesDestino(''); obtenerPendientesAdmin();
    } catch (err) { setMensajeRetiro({ tipo: 'error', texto: 'Error de red.' }); }
    finally { setEnviandoRetiro(false); }
  };

  const obtenerPlaceholderBanco = () => {
    const p = paisSocio.toLowerCase();
    if (p.includes('colombia')) return 'Ej: Bancolombia/Nequi, Ahorros, #...';
    if (p.includes('ecuador')) return 'Ej: Banco Pichincha, Corriente, #...';
    if (p.includes('españa')) return 'Ej: Banco Santander, IBAN ES62...';
    return 'Ej: Banco, Tipo Cuenta, Número...';
  };

  // --- RENDERS ---

  const RenderInicio = () => (
    <div className="fade-in">
      <div className="welcome-banner">
        <h1>Bienvenido, <span>{nombre}</span></h1>
        <p><Globe size={14} color="#00C853" /> REGIÓN ESTRATÉGICA: {paisSocio.toUpperCase()}</p>
      </div>

      <div className="vault-grid">
        <div className="vault-card-main">
          <div className="card-top">
            <span className="card-label">CAPITAL BAJO GESTIÓN</span>
            <span className="profit-badge">+{utilidad}% RENDIMIENTO</span>
          </div>
          <div className="balance-display">
            <span className="symbol">$</span>
            <span className="value">{balanceVisual.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <div className="live-status"><div className="dot"></div> LIVE</div>
          </div>
          <div className="progress-container">
            <div className="progress-labels">
              <span>ESTADO DEL FONDO</span>
              <span className="exec-text">EJECUTANDO</span>
            </div>
            <div className="bar-bg"><div className="bar-fill" style={{ width: '75%' }}></div></div>
            <div className="ai-pulse"><Activity size={12} className="pulse" /> CONEXIÓN DIRECTA CON LIQUIDEZ GLOBAL...</div>
          </div>
        </div>

        <div className="rank-card-v2">
          <div className="rank-header">
            <Trophy size={32} color="#00C853" />
            <div><p>MEMBRESÍA</p><h3>{nivelSocio}</h3></div>
          </div>
          <div className="rank-details">
            <div className="detail-item"><span>ID SOCIO</span><span>{localStorage.getItem('socio_id')}</span></div>
            <div className="detail-item"><span>País Origen</span><span className="active-tag">{paisSocio}</span></div>
          </div>
          <button className="upgrade-btn">CERTIFICADO ÉLITE</button>
        </div>
      </div>

      <div className="section-title">CENTRO DE OPERACIONES</div>
      <div className="actions-grid-v2">
        <div className="action-tile" onClick={() => router.push('/panel/objetivos')}><Target color="#00C853" /> <span>Metas</span></div>
        <div className="action-tile" onClick={() => setActiveTab('reportes')}><TrendingUp color="#00C853" /> <span>Gráficas</span></div>
        <div className="action-tile" onClick={() => setActiveTab('retiros')}><Wallet color="#00C853" /> <span>Retiros</span></div>
        <div className="action-tile" onClick={() => setActiveTab('perfil')}><Settings color="#00C853" /> <span>Perfil</span></div>
      </div>
    </div>
  );

  const RenderReportes = () => (
    <div className="fade-in section-container">
      <h2 className="section-h2">Estado de Cuenta</h2>
      <div className="stats-grid-mini">
        <div className="stat-box-mini"><span>Inversión</span><h3>${balance.toLocaleString()}</h3></div>
        <div className="stat-box-mini"><span>Profit</span><h3>+{(balance * (utilidad/100)).toFixed(2)}</h3></div>
        <div className="stat-box-mini"><span>Proyección</span><h3>${(balance * 1.25).toLocaleString()}</h3></div>
      </div>
      <div className="empty-state"><BarChart3 size={48} color="#222" /><p>Generando reportes de auditoría...</p></div>
    </div>
  );

  const RenderRetiros = () => (
    <div className="fade-in section-container">
      <h2 className="section-h2">Cajero Multidivisa</h2>
      <div className="withdraw-card glass-effect">
        <p className="withdraw-label">Saldo Neto en USD</p>
        <h3 className="withdraw-amount">${balanceVisual.toLocaleString()}</h3>
        
        <div className="method-selector">
          <div className={`method-option ${metodoRetiro === 'banco' ? 'active' : ''}`} onClick={() => setMetodoRetiro('banco')}>
            <Building2 size={18} /> Banco Local
          </div>
          <div className={`method-option ${metodoRetiro === 'cripto' ? 'active' : ''}`} onClick={() => setMetodoRetiro('cripto')}>
            <Zap size={18} /> USDT TRC20
          </div>
        </div>

        <div className="divider"></div>
        
        {mensajeRetiro.texto && (
          <div className={`status-alert ${mensajeRetiro.tipo}`}>
            {mensajeRetiro.tipo === 'exito' ? <CheckCircle2 size={16} /> : <ShieldAlert size={16} />}
            {mensajeRetiro.texto}
          </div>
        )}

        <div className="input-group">
          <label>Monto a Retirar (USD)</label>
          <input type="number" value={montoRetiro} onChange={(e) => setMontoRetiro(e.target.value)} placeholder="0.00" className="elite-input" />
        </div>

        <div className="input-group" style={{ marginTop: '20px' }}>
          <label>{metodoRetiro === 'banco' ? `Datos Bancarios (${paisSocio})` : 'Wallet USDT (TRC20)'}</label>
          <textarea rows={2} value={detallesDestino} onChange={(e) => setDetallesDestino(e.target.value)} placeholder={metodoRetiro === 'banco' ? obtenerPlaceholderBanco() : 'Pegue dirección...'} className="elite-input" />
        </div>

        <button onClick={procesarRetiro} disabled={enviandoRetiro} className="btn-withdraw-action">
          {enviandoRetiro ? 'VERIFICANDO...' : 'CONFIRMAR SOLICITUD'}
        </button>
      </div>
    </div>
  );

  const RenderPerfil = () => (
    <div className="fade-in section-container">
      <div className="identity-master-layout">
        {/* Cabecera de Poder */}
        <div className="identity-header glass-effect">
          <div className="identity-banner"></div>
          <div className="identity-content">
            <div className="identity-avatar-container">
              <div className="identity-avatar-glow"></div>
              <div className="identity-avatar-main">{nombre.charAt(0)}</div>
              <button className="identity-camera"><Camera size={14} /></button>
            </div>
            <div className="identity-info">
              <h2>{nombre}</h2>
              <div className="identity-tags">
                <span className="tag-verify"><ShieldCheck size={14} /> INVERSOR VERIFICADO</span>
                <span className="tag-rank"><Award size={14} /> {nivelSocio}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="identity-grid">
          {/* Tarjeta de Gestión */}
          <div className="identity-card glass-effect">
            <div className="card-header-inner">
              <h3>Gestión de Identidad</h3>
              <UserCheck size={20} color="#00C853" />
            </div>
            <div className="identity-form">
              <div className="field-group">
                <label>Nombre Legal</label>
                <div className="input-wrapper">
                  <User size={16} />
                  <input type="text" value={editNombre} onChange={(e) => setEditNombre(e.target.value)} />
                </div>
              </div>
              <div className="field-group">
                <label>País de Jurisdicción</label>
                <div className="input-wrapper">
                  <Globe size={16} />
                  <input type="text" value={editPais} onChange={(e) => setEditPais(e.target.value)} />
                </div>
              </div>
              <div className="field-group">
                <label>Contacto Telefónico</label>
                <div className="input-wrapper">
                  <Phone size={16} />
                  <input type="text" placeholder="+00 000 00000" />
                </div>
              </div>
              <button onClick={actualizarPerfil} disabled={guardandoPerfil} className="identity-btn-save">
                {guardandoPerfil ? 'SINCRONIZANDO...' : <><Save size={18}/> ACTUALIZAR IDENTIDAD</>}
              </button>
            </div>
          </div>

          {/* Tarjeta de Seguridad y Estatus */}
          <div className="identity-card glass-effect">
            <div className="card-header-inner">
              <h3>Seguridad de Bóveda</h3>
              <ShieldEllipsis size={20} color="#00C853" />
            </div>
            <div className="security-stack">
              <div className="sec-row">
                <div className="sec-icon"><Mail size={20} /></div>
                <div className="sec-data">
                  <h4>Correo Electrónico</h4>
                  <p>{editEmail}</p>
                </div>
                <div className="sec-status-tag">CONFIRMADO</div>
              </div>
              <div className="sec-row">
                <div className="sec-icon"><ShieldCheck size={20} /></div>
                <div className="sec-data">
                  <h4>Doble Factor (2FA)</h4>
                  <p>Protección extra activa</p>
                </div>
                <div className="sec-toggle">ON</div>
              </div>
              <div className="identity-stats-preview">
                <div className="stat-preview-item">
                  <span>Antigüedad</span>
                  <p>Marzo 2026</p>
                </div>
                <div className="stat-preview-item">
                  <span>Operaciones</span>
                  <p>Activas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="loader-screen">
        <div className="guru-loader"><div className="inner-circle"><span className="logo-g">G</span></div></div>
        <p className="pulse loading-text">ESTABLECIENDO CONEXIÓN ÉLITE...</p>
        <style jsx>{`
          .loader-screen { background: #000; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; position: fixed; width: 100%; z-index: 9999; }
          .guru-loader { width: 120px; height: 120px; border-radius: 50%; border: 2px solid #111; display: flex; justify-content: center; align-items: center; position: relative; }
          .guru-loader::after { content: ''; position: absolute; width: 100%; height: 100%; border-radius: 50%; border: 2px solid #00C853; animation: ripple 2s infinite; }
          .inner-circle { width: 80px; height: 80px; border-radius: 50%; background: #050505; border: 3px solid #00C853; display: flex; justify-content: center; align-items: center; box-shadow: 0 0 30px rgba(0, 200, 83, 0.4); }
          .logo-g { color: #00C853; font-weight: 900; font-size: 2.5rem; }
          .loading-text { color: #00C853; letter-spacing: 4px; font-size: 0.8rem; font-weight: 900; margin-top: 30px; }
          @keyframes ripple { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(1.6); opacity: 0; } }
          .pulse { animation: pulse-text 2s infinite; }
          @keyframes pulse-text { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
        `}</style>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <aside className="sidebar-desktop">
        <div className="sidebar-header"><div className="brand-elite">GURÚ <span>ÉLITE</span></div></div>
        <nav className="sidebar-nav">
          <div className={`nav-item ${activeTab === 'inicio' ? 'active' : ''}`} onClick={() => setActiveTab('inicio')}><LayoutDashboard size={20} /> Inicio</div>
          <div className={`nav-item ${activeTab === 'reportes' ? 'active' : ''}`} onClick={() => setActiveTab('reportes')}><BarChart3 size={20} /> Reportes</div>
          <div className={`nav-item ${activeTab === 'retiros' ? 'active' : ''}`} onClick={() => setActiveTab('retiros')}><Wallet size={20} /> Retiros</div>
          <div className={`nav-item ${activeTab === 'perfil' ? 'active' : ''}`} onClick={() => setActiveTab('perfil')}><User size={20} /> Perfil</div>
          <div className="nav-divider"></div>
          <div className="nav-item"><HelpCircle size={20} /> Soporte</div>
        </nav>
        <button onClick={handleLogout} className="logout-sidebar"><LogOut size={18} /> SALIR</button>
      </aside>

      <div className="main-wrapper">
        <header className="top-navbar">
          <div className="mobile-brand">GURÚ <span>ÉLITE</span></div>
          <div className="header-actions">
            <div className="header-icon" onClick={() => esAdmin && router.push('/admin')}>
              <Bell size={22} color={esAdmin && pendientes > 0 ? "#00C853" : "#555"} />
              {esAdmin && pendientes > 0 && <span className="badge">{pendientes}</span>}
            </div>
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
          <div className={`tab-item ${activeTab === 'inicio' ? 'active' : ''}`} onClick={() => setActiveTab('inicio')}><LayoutDashboard size={24} /><span>Inicio</span></div>
          <div className={`tab-item ${activeTab === 'reportes' ? 'active' : ''}`} onClick={() => setActiveTab('reportes')}><BarChart3 size={24} /><span>Reportes</span></div>
          <div className={`tab-item ${activeTab === 'retiros' ? 'active' : ''}`} onClick={() => setActiveTab('retiros')}><Wallet size={24} /><span>Retiros</span></div>
          <div className={`tab-item ${activeTab === 'perfil' ? 'active' : ''}`} onClick={() => setActiveTab('perfil')}><User size={24} /><span>Perfil</span></div>
        </nav>
      </div>

      <style jsx global>{`
        :root { --neon: #00C853; --dark: #0a0c10; --border: #1a1c20; }
        .app-layout { background: #000; min-height: 100vh; display: flex; font-family: 'Inter', sans-serif; color: #fff; overflow-x: hidden; }
        .sidebar-desktop { width: 260px; background: #050505; border-right: 1px solid var(--border); display: none; flex-direction: column; padding: 30px 20px; position: sticky; top: 0; height: 100vh; }
        @media (min-width: 1024px) { .sidebar-desktop { display: flex; } }
        .brand-elite { font-weight: 900; font-size: 1.4rem; letter-spacing: -1px; margin-bottom: 40px; }
        .brand-elite span { color: var(--neon); }
        .nav-item { padding: 14px 18px; border-radius: 12px; display: flex; align-items: center; gap: 15px; color: #444; cursor: pointer; transition: 0.3s; margin-bottom: 5px; font-weight: 600; font-size: 0.95rem; }
        .nav-item:hover, .nav-item.active { background: rgba(0,200,83,0.05); color: var(--neon); }
        .logout-sidebar { background: rgba(255,68,68,0.05); color: #ff4444; border: 1px solid rgba(255,68,68,0.1); padding: 14px; border-radius: 12px; font-weight: 800; cursor: pointer; margin-top: auto; }
        .main-wrapper { flex: 1; display: flex; flex-direction: column; min-width: 0; position: relative; }
        .top-navbar { height: 70px; background: rgba(0,0,0,0.8); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: space-between; padding: 0 25px; border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 100; }
        .header-actions { display: flex; align-items: center; gap: 20px; }
        .user-avatar { width: 35px; height: 35px; background: var(--neon); color: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; cursor: pointer; }
        .panel-content { padding: 20px; max-width: 1200px; margin: 0 auto; width: 100%; padding-bottom: 100px; }
        @media (min-width: 768px) { .panel-content { padding: 35px; } }
        
        /* 🏆 DISEÑO DE IDENTIDAD ÉLITE (PERFIL) */
        .identity-master-layout { display: flex; flex-direction: column; gap: 30px; }
        .identity-header { background: #050505; border: 1px solid var(--border); border-radius: 35px; overflow: hidden; position: relative; }
        .identity-banner { height: 120px; background: linear-gradient(90deg, #000, #0a0c10, #00C85322); }
        .identity-content { padding: 0 40px 40px; display: flex; align-items: flex-end; gap: 30px; margin-top: -50px; }
        .identity-avatar-container { position: relative; }
        .identity-avatar-glow { position: absolute; top: -10px; left: -10px; right: -10px; bottom: -10px; background: var(--neon); filter: blur(25px); opacity: 0.2; border-radius: 50%; }
        .identity-avatar-main { width: 130px; height: 130px; background: var(--neon); color: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 4rem; font-weight: 900; border: 8px solid #050505; position: relative; z-index: 2; }
        .identity-camera { position: absolute; bottom: 10px; right: 10px; background: #fff; color: #000; border: none; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 3; }
        .identity-info h2 { font-size: 2.2rem; font-weight: 900; margin-bottom: 10px; }
        .identity-tags { display: flex; gap: 12px; }
        .tag-verify { background: rgba(0,200,83,0.1); color: var(--neon); padding: 6px 15px; border-radius: 20px; font-size: 0.75rem; font-weight: 900; display: flex; align-items: center; gap: 8px; }
        .tag-rank { background: #111; color: #fff; padding: 6px 15px; border-radius: 20px; font-size: 0.75rem; font-weight: 900; display: flex; align-items: center; gap: 8px; border: 1px solid #222; }

        .identity-grid { display: grid; grid-template-columns: 1fr; gap: 25px; }
        @media (min-width: 1024px) { .identity-grid { grid-template-columns: 1.2fr 1fr; } }
        .identity-card { background: #050505; border: 1px solid var(--border); border-radius: 35px; padding: 35px; }
        .card-header-inner { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .card-header-inner h3 { font-size: 1.2rem; font-weight: 900; }
        
        .field-group { margin-bottom: 20px; }
        .field-group label { font-size: 0.75rem; font-weight: 900; color: #444; margin-bottom: 10px; display: block; text-transform: uppercase; }
        .input-wrapper { background: #000; border: 1px solid #111; border-radius: 15px; display: flex; align-items: center; padding: 0 20px; gap: 15px; transition: 0.3s; }
        .input-wrapper:focus-within { border-color: var(--neon); box-shadow: 0 0 15px rgba(0,200,83,0.1); }
        .input-wrapper input { background: transparent; border: none; padding: 18px 0; color: #fff; width: 100%; font-weight: 600; outline: none; }
        .identity-btn-save { width: 100%; background: var(--neon); color: #000; border: none; padding: 20px; border-radius: 18px; font-weight: 900; cursor: pointer; transition: 0.3s; margin-top: 15px; display: flex; align-items: center; justify-content: center; gap: 10px; }

        .sec-row { display: flex; align-items: center; gap: 20px; padding: 20px; background: rgba(255,255,255,0.02); border-radius: 20px; margin-bottom: 15px; border: 1px solid #111; }
        .sec-icon { color: var(--neon); opacity: 0.5; }
        .sec-data h4 { font-size: 0.9rem; font-weight: 800; margin-bottom: 4px; }
        .sec-data p { font-size: 0.8rem; color: #444; }
        .sec-status-tag { margin-left: auto; background: rgba(0,200,83,0.1); color: var(--neon); font-size: 0.65rem; font-weight: 900; padding: 4px 10px; border-radius: 8px; }
        .sec-toggle { margin-left: auto; color: var(--neon); font-weight: 900; font-size: 0.8rem; }
        .identity-stats-preview { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 25px; }
        .stat-preview-item { background: #000; padding: 20px; border-radius: 20px; border: 1px solid #111; text-align: center; }
        .stat-preview-item span { font-size: 0.65rem; font-weight: 900; color: #444; text-transform: uppercase; }
        .stat-preview-item p { font-size: 1.1rem; font-weight: 900; margin-top: 5px; }

        /* REUTILIZABLES CHASIS ESTABLE */
        .welcome-banner h1 { font-size: 2.5rem; font-weight: 900; margin-bottom: 8px; }
        .vault-grid { display: grid; grid-template-columns: 1fr; gap: 20px; margin: 25px 0; }
        @media (min-width: 1024px) { .vault-grid { grid-template-columns: 1.6fr 1fr; } }
        .vault-card-main { background: #050505; border: 1px solid var(--border); border-radius: 35px; padding: 35px; }
        .balance-display { display: flex; align-items: baseline; gap: 8px; margin-bottom: 25px; flex-wrap: wrap; }
        .value { font-size: 4.2rem; font-weight: 900; letter-spacing: -2px; }
        .bar-bg { width: 100%; height: 8px; background: #111; border-radius: 10px; overflow: hidden; }
        .bar-fill { height: 100%; background: var(--neon); box-shadow: 0 0 15px var(--neon); border-radius: 10px; animation: grow 2s ease-out; }
        .actions-grid-v2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
        @media (min-width: 768px) { .actions-grid-v2 { grid-template-columns: repeat(4, 1fr); } }
        .action-tile { background: #0a0c10; border: 1px solid var(--border); padding: 25px; border-radius: 18px; cursor: pointer; }
        .withdraw-card { background: #0a0c10; padding: 40px; border-radius: 35px; border: 1px solid var(--border); max-width: 500px; margin: 0 auto; }
        .method-selector { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; }
        .method-option { background: #000; border: 1px solid #111; padding: 12px; border-radius: 12px; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; }
        .method-option.active { border-color: var(--neon); color: var(--neon); }
        .elite-input { width: 100%; background: #000; border: 1px solid #111; padding: 15px; border-radius: 12px; color: #fff; margin-top: 10px; }
        .btn-withdraw-action { width: 100%; background: var(--neon); color: #000; border: none; padding: 18px; border-radius: 12px; font-weight: 900; margin-top: 25px; cursor: pointer; }
        .mobile-tab-bar { position: fixed; bottom: 0; left: 0; width: 100%; height: 70px; background: rgba(5,5,5,0.95); backdrop-filter: blur(20px); border-top: 1px solid var(--border); display: flex; justify-content: space-around; align-items: center; padding-bottom: 10px; z-index: 100; }
        @media (min-width: 1024px) { .mobile-tab-bar { display: none; } }
        @keyframes grow { from { width: 0%; } to { width: 75%; } }
        .fade-in { animation: fadeIn 0.5s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}