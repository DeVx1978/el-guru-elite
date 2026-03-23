"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import {
  User, Wallet, TrendingUp, ShieldCheck, LogOut,
  Zap, Trophy, Activity, ShieldAlert,
  Settings, HelpCircle, BarChart3, LayoutDashboard,
  Building2, Landmark, Globe, X, Terminal, ArrowUpRight, Menu, CreditCard, ChevronDown, Lock, ArrowLeft, Mail, Phone, MapPin
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
  const [show2FA, setShow2FA] = useState(false);
  const [codigoIngresado, setCodigoIngresado] = useState('');
  const [codigoGenerado, setCodigoGenerado] = useState('');

  const [editNombre, setEditNombre] = useState("");
  const [editPais, setEditPais] = useState("");
  const [editTelefono, setEditTelefono] = useState("");
  const [editCiudad, setEditCiudad] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [guardandoPerfil, setGuardandoPerfil] = useState(false);

  useEffect(() => {
    const socioId = localStorage.getItem('socio_id');
    const socioNombre = localStorage.getItem('socio_nombre');
    if (!socioId) {
      router.push('/login');
    } else {
      setNombre(socioNombre || "Socio");
      setEditNombre(socioNombre || "");
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
        setEsAdmin(socioBase?.rol === 'admin' || socioBase?.email === 'mariajose@gmail.com');
      }
    } catch (err) { console.error("Error conexión:", err); }
    finally { setTimeout(() => setLoading(false), 2000); }
  };

  useEffect(() => {
    if (esAdmin && !loading) { obtenerPendientesAdmin(); }
  }, [esAdmin, loading]);

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

  const iniciarProtocoloRetiro = () => {
    if (!montoRetiro || !detallesDestino) return alert("Complete los datos requeridos");
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setCodigoGenerado(code);
    console.log("CÓDIGO SEGURIDAD:", code);
    setShow2FA(true);
  };

  const confirmarRetiroFinal = async () => {
    if (codigoIngresado !== codigoGenerado) return alert("Código inválido");
    setEnviandoRetiro(true);
    const socioId = localStorage.getItem('socio_id');
    try {
      await clientSupabase.from('retiros').insert([{ 
        id_socio: socioId, monto: parseFloat(montoRetiro), billetera: detallesDestino, estado: 'pendiente' 
      }]);
      setShow2FA(false);
      setMontoRetiro(''); setDetallesDestino('');
      alert("Solicitud en auditoría");
    } catch (err) { alert("Error"); }
    finally { setEnviandoRetiro(false); }
  };

  const actualizarPerfil = async () => {
    setGuardandoPerfil(true);
    const socioId = localStorage.getItem('socio_id');
    try {
      await clientSupabase.from('socios').update({ nombre: editNombre }).eq('id', socioId);
      await clientSupabase.from('socios_elite').update({ pais: editPais, telefono: editTelefono, ciudad: editCiudad }).eq('id_socio', socioId);
      setNombre(editNombre);
      localStorage.setItem('socio_nombre', editNombre);
      alert("Sincronización Exitosa");
    } catch (err) { alert("Error"); }
    finally { setGuardandoPerfil(false); }
  };

  const RenderInicio = () => (
    <div className="fade-in">
      <header className="content-header">
        <div className="welcome-section">
          <span className="elite-badge">{nivelSocio.toUpperCase()}</span>
          <h1>Hola, <span>{nombre.split(' ')[0]}</span></h1>
          <p className="welcome-sub">Gestión de activos en tiempo real.</p>
        </div>
        <div className="geo-pill"><Globe size={12}/> {paisSocio}</div>
      </header>

      <section className="glass-vault-card">
        <div className="vault-top">
          <p>BALANCE TOTAL <ChevronDown size={14}/></p>
          <div className="yield-tag">+{((utilidad / (balance - utilidad)) * 100 || 0).toFixed(2)}%</div>
        </div>
        <h2 className="vault-amount">
          <span className="symbol">$</span>{balanceVisual.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </h2>
        <div className="vault-footer">
          <div className="status-live"><div className="pulse"></div> ALGORITMO ACTIVO</div>
          <div className="profit-text">+${utilidad.toLocaleString()} USD UTILIDAD</div>
        </div>
      </section>

      <div className="stats-grid">
        <div className="stat-box" onClick={() => setActiveTab('reportes')}>
          <div className="sb-icon"><TrendingUp size={20} color="#00C853"/></div>
          <div className="sb-info"><span>PROFIT TOTAL</span><h4>${utilidad.toLocaleString()}</h4></div>
        </div>
        <div className="stat-box">
          <div className="sb-icon"><ShieldCheck size={20} color="#00C853"/></div>
          <div className="sb-info"><span>AUDITORÍA</span><h4>VERIFICADA</h4></div>
        </div>
      </div>

      <h3 className="hub-label">CENTRO DE CONTROL</h3>
      <div className="hub-grid">
        <button className="hub-card" onClick={() => setActiveTab('reportes')}><BarChart3 size={22}/> Rendimientos</button>
        <button className="hub-card" onClick={() => setActiveTab('retiros')}><Wallet size={22}/> Retiros</button>
        <button className="hub-card" onClick={() => setActiveTab('perfil')}><User size={22}/> Perfil</button>
        <button className="hub-card" onClick={() => window.open('https://wa.me/soporte', '_blank')}><HelpCircle size={22}/> Soporte</button>
      </div>
    </div>
  );

  if (loading) return (
    <div className="elite-loader">
      <div className="scanner-ring"></div>
      <p>VALIDANDO CREDENCIALES ÉLITE</p>
      <style jsx>{`
        .elite-loader { background: #000; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; }
        .scanner-ring { width: 45px; height: 45px; border: 2px solid #111; border-top: 2px solid #00C853; border-radius: 50%; animation: spin 0.8s linear infinite; }
        p { color: #00C853; font-size: 10px; letter-spacing: 5px; margin-top: 25px; font-weight: 300; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );

  return (
    <div className="mansion-container">
      {/* 🛡️ MODAL 2FA */}
      {show2FA && (
        <div className="security-overlay fade-in">
          <div className="security-card scale-in">
            <button className="close-x" onClick={() => setShow2FA(false)}><X size={20}/></button>
            <ShieldAlert size={40} color="#00C853" style={{marginBottom:'20px'}}/>
            <h2>VERIFICACIÓN REQUERIDA</h2>
            <p>Código enviado a: {editEmail}</p>
            <input type="text" maxLength={6} placeholder="000000" value={codigoIngresado} onChange={(e) => setCodigoIngresado(e.target.value)} />
            <button className="verify-btn" onClick={confirmarRetiroFinal} disabled={enviandoRetiro}>CONFIRMAR</button>
          </div>
        </div>
      )}

      <aside className="mansion-sidebar desktop-only">
        <div className="brand-logo">GURÚ<span>ÉLITE</span></div>
        <nav className="mansion-nav">
          <button className={activeTab === 'inicio' ? 'active' : ''} onClick={() => setActiveTab('inicio')}><LayoutDashboard size={18}/> Inicio</button>
          <button className={activeTab === 'reportes' ? 'active' : ''} onClick={() => setActiveTab('reportes')}><BarChart3 size={18}/> Mercados</button>
          <button className={activeTab === 'retiros' ? 'active' : ''} onClick={() => setActiveTab('retiros')}><Wallet size={18}/> Cajero</button>
          <button className={activeTab === 'perfil' ? 'active' : ''} onClick={() => setActiveTab('perfil')}><User size={18}/> Cuenta</button>
        </nav>
        <div className="sidebar-footer">
          {esAdmin && <button className="admin-trigger" onClick={() => router.push('/admin/auth')}><Terminal size={16}/> ADMIN {pendientes > 0 && <span className="p-badge">{pendientes}</span>}</button>}
          <button className="logout-trigger" onClick={handleLogout}><LogOut size={16}/> SALIR</button>
        </div>
      </aside>

      <div className="mansion-viewport">
        <header className="mobile-header mobile-only">
          <div className="m-brand">GURÚ <span>ÉLITE</span></div>
          {esAdmin && <button className="m-admin-btn" onClick={() => router.push('/admin/auth')}><Terminal size={18}/></button>}
        </header>

        <main className="mansion-main">
          {activeTab !== 'inicio' && (
            <button className="back-btn" onClick={() => setActiveTab('inicio')}><ArrowLeft size={16}/> REGRESAR A BÓVEDA</button>
          )}

          {activeTab === 'inicio' && <RenderInicio />}
          
          {activeTab === 'retiros' && (
            <div className="fade-in">
              <h2 className="section-title">Cajero de <span>Liquidación</span></h2>
              <div className="glass-withdraw-card">
                <div className="w-header"><span>SALDO LÍQUIDO</span><h3>${balanceVisual.toLocaleString()}</h3></div>
                <div className="w-method-selector">
                  <button className={metodoRetiro === 'banco' ? 'active' : ''} onClick={() => setMetodoRetiro('banco')}><Building2 size={16}/> BANCO</button>
                  <button className={metodoRetiro === 'cripto' ? 'active' : ''} onClick={() => setMetodoRetiro('cripto')}><Zap size={16}/> USDT</button>
                </div>
                <div className="w-fields">
                  <div className="w-field-group"><label>MONTO USD</label><input type="number" placeholder="0.00" value={montoRetiro} onChange={e => setMontoRetiro(e.target.value)} /></div>
                  <div className="w-field-group"><label>DESTINO</label><textarea placeholder="Detalles de cuenta o wallet..." value={detallesDestino} onChange={e => setDetallesDestino(e.target.value)} /></div>
                  <button className="w-submit-btn" onClick={iniciarProtocoloRetiro}><Lock size={16}/> ACTIVAR PROTOCOLO</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'perfil' && (
            <div className="fade-in">
              <h2 className="section-title">Perfil del <span>Socio</span></h2>
              <div className="profile-grid-mansion">
                <div className="p-glass-card">
                  <div className="p-header-info"><User size={20} color="#00C853"/> <span>DATOS PERSONALES</span></div>
                  <div className="p-input-row"><label>NOMBRE</label><input value={editNombre} onChange={e => setEditNombre(e.target.value)}/></div>
                  <div className="p-input-row"><label>PAÍS</label><input value={editPais} onChange={e => setEditPais(e.target.value)}/></div>
                  <div className="p-input-row"><label>CIUDAD</label><input value={editCiudad} onChange={e => setEditCiudad(e.target.value)}/></div>
                  <div className="p-input-row"><label>TELÉFONO</label><input value={editTelefono} onChange={e => setEditTelefono(e.target.value)}/></div>
                  <button className="p-save-btn" onClick={actualizarPerfil}>GUARDAR CAMBIOS</button>
                </div>
                <div className="p-security-card">
                  <div className="ps-row"><div className="ps-icon"><Mail size={16}/></div><div><span>EMAIL</span><p>{editEmail}</p></div></div>
                  <div className="ps-row"><div className="ps-icon"><ShieldCheck size={16}/></div><div><span>AUDITORÍA</span><p className="v-tag">ACTIVA</p></div></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reportes' && (
            <div className="fade-in">
              <h2 className="section-title">Análisis de <span>Rendimientos</span></h2>
              <div className="report-grid">
                <div className="r-card">
                   <div className="r-card-head"><Wallet size={16} color="#444"/> <span>CAPITAL SEMILLA</span></div>
                   <h4>${(balance - utilidad).toLocaleString()}</h4>
                </div>
                <div className="r-card highlight">
                   <div className="r-card-head"><Activity size={16} color="#00C853"/> <span>PROFIT ACUMULADO</span></div>
                   <h4>+${utilidad.toLocaleString()}</h4>
                </div>
              </div>
              <div className="chart-container-mansion">
                <div className="chart-bars-wrap">
                  {[35, 65, 45, 85, 55, 95, 100].map((h, i) => (
                    <div key={i} className="c-bar-box"><div className="c-bar" style={{height: h+'%'}}></div></div>
                  ))}
                </div>
                <div className="chart-days-labels"><span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span></div>
              </div>
            </div>
          )}
        </main>

        <nav className="m-bottom-bar mobile-only">
          <button className={activeTab === 'inicio' ? 'active' : ''} onClick={() => setActiveTab('inicio')}><LayoutDashboard size={20}/></button>
          <button className={activeTab === 'reportes' ? 'active' : ''} onClick={() => setActiveTab('reportes')}><BarChart3 size={20}/></button>
          <button className={activeTab === 'retiros' ? 'active' : ''} onClick={() => setActiveTab('retiros')}><Wallet size={20}/></button>
          <button className={activeTab === 'perfil' ? 'active' : ''} onClick={() => setActiveTab('perfil')}><User size={20}/></button>
          <button onClick={handleLogout}><LogOut size={20} color="#ff4444"/></button>
        </nav>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;400;700;800&display=swap');
        :root { --main: #00C853; --bg: #000; --panel: #080808; --border: #151515; }
        .mansion-container { background: #000; min-height: 100vh; display: flex; color: #fff; font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: hidden; }

        .mansion-sidebar { width: 260px; background: var(--panel); border-right: 1px solid var(--border); display: flex; flex-direction: column; padding: 40px 25px; position: sticky; top: 0; height: 100vh; }
        .brand-logo { font-weight: 800; font-size: 1.2rem; letter-spacing: -1px; margin-bottom: 50px; }
        .brand-logo span { color: var(--main); }
        .mansion-nav button { width: 100%; text-align: left; padding: 16px; border-radius: 14px; background: transparent; color: #444; border: none; display: flex; align-items: center; gap: 15px; font-weight: 700; cursor: pointer; transition: 0.3s; margin-bottom: 8px; font-size: 0.85rem; }
        .mansion-nav button:hover, .mansion-nav button.active { color: #fff; background: #0c0c0c; }
        .mansion-nav button.active { color: var(--main); }
        .sidebar-footer { border-top: 1px solid var(--border); padding-top: 30px; }
        .admin-trigger { width: 100%; background: rgba(0,200,83,0.05); border: 1px solid rgba(0,200,83,0.1); color: var(--main); padding: 12px; border-radius: 10px; font-weight: 800; font-size: 9px; cursor: pointer; display: flex; align-items: center; gap: 8px; margin-bottom: 10px; }
        .p-badge { background: #ff4444; color: #fff; padding: 2px 6px; border-radius: 20px; font-size: 8px; }
        .logout-trigger { background: none; border: none; color: #ff4444; font-weight: 800; font-size: 10px; cursor: pointer; padding: 10px; opacity: 0.6; }

        .mansion-viewport { flex: 1; display: flex; flex-direction: column; min-width: 0; }
        .mobile-header { height: 75px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; padding: 0 25px; background: #000; }
        .m-brand { font-weight: 800; font-size: 1rem; color: #fff; }
        .m-brand span { color: var(--main); }
        .m-admin-btn { background: rgba(0,200,83,0.1); border: none; color: var(--main); width: 40px; height: 40px; border-radius: 10px; }

        .mansion-main { padding: 40px 6%; max-width: 1000px; margin: 0 auto; width: 100%; position: relative; }
        .back-btn { background: none; border: none; color: var(--main); font-weight: 800; font-size: 9px; letter-spacing: 2px; cursor: pointer; display: flex; align-items: center; gap: 10px; margin-bottom: 30px; }
        
        .content-header { margin-bottom: 40px; display: flex; justify-content: space-between; align-items: flex-end; }
        .elite-badge { font-size: 8px; color: var(--main); font-weight: 800; letter-spacing: 3px; border: 1px solid var(--main); padding: 4px 12px; border-radius: 20px; }
        .welcome-section h1 { font-size: 2.8rem; font-weight: 800; margin: 10px 0 5px; }
        .welcome-section span { color: var(--main); }
        .welcome-sub { color: #333; font-size: 0.85rem; font-weight: 600; }
        .geo-pill { background: #0c0c0c; border: 1px solid var(--border); padding: 10px 20px; border-radius: 30px; font-size: 10px; font-weight: 800; color: #333; display: flex; align-items: center; gap: 10px; }

        .glass-vault-card { background: linear-gradient(135deg, #0a0a0a 0%, #000 100%); border: 1px solid var(--border); padding: 50px; border-radius: 40px; margin-bottom: 30px; box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
        .vault-top { display: flex; justify-content: space-between; align-items: center; }
        .vault-top p { font-size: 9px; font-weight: 800; color: #333; letter-spacing: 3px; display: flex; align-items: center; gap: 8px; }
        .yield-tag { background: rgba(0,200,83,0.1); color: var(--main); padding: 4px 10px; border-radius: 20px; font-size: 9px; font-weight: 800; }
        .vault-amount { font-size: clamp(3rem, 10vw, 5.5rem); font-weight: 800; letter-spacing: -3px; margin: 20px 0; }
        .symbol { color: var(--main); font-size: 2rem; vertical-align: top; margin-right: 10px; font-weight: 400; }
        .vault-footer { display: flex; justify-content: space-between; border-top: 1px solid #0c0c0c; padding-top: 30px; }
        .status-live { font-size: 9px; font-weight: 800; color: var(--main); display: flex; align-items: center; gap: 10px; }
        .pulse { width: 6px; height: 6px; background: var(--main); border-radius: 50%; animation: pulse 2s infinite; }
        .profit-text { font-size: 9px; font-weight: 800; color: #222; }

        .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 40px; }
        .stat-box { background: var(--panel); border: 1px solid var(--border); padding: 30px; border-radius: 25px; display: flex; align-items: center; gap: 20px; cursor: pointer; }
        .sb-icon { width: 50px; height: 50px; background: #000; border-radius: 16px; border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; }
        .sb-info span { font-size: 9px; font-weight: 800; color: #333; }
        .sb-info h4 { font-size: 1.2rem; font-weight: 800; margin-top: 2px; }

        .hub-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; }
        .hub-card { background: var(--panel); border: 1px solid var(--border); padding: 25px 10px; border-radius: 20px; color: #fff; font-weight: 800; font-size: 0.75rem; cursor: pointer; transition: 0.3s; display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .hub-card:hover { border-color: var(--main); background: #0c0c0c; }

        /* PERFIL CORREGIDO */
        .profile-grid-mansion { display: grid; grid-template-columns: 1.5fr 1fr; gap: 25px; }
        .p-glass-card { background: var(--panel); border: 1px solid var(--border); padding: 35px; border-radius: 30px; }
        .p-header-info { display: flex; align-items: center; gap: 12px; font-size: 9px; font-weight: 800; letter-spacing: 2px; color: #444; margin-bottom: 30px; border-bottom: 1px solid #111; padding-bottom: 15px; }
        .p-input-row { margin-bottom: 15px; }
        .p-input-row label { display: block; font-size: 8px; font-weight: 800; color: #222; margin-bottom: 6px; letter-spacing: 1px; }
        .p-input-row input { width: 100%; background: #000; border: 1px solid #151515; padding: 14px; border-radius: 12px; color: #fff; font-size: 13px; font-weight: 600; outline: none; transition: 0.3s; }
        .p-input-row input:focus { border-color: var(--main); }
        .p-save-btn { width: 100%; background: #fff; color: #000; border: none; padding: 16px; border-radius: 12px; font-weight: 800; font-size: 11px; margin-top: 15px; cursor: pointer; }

        .p-security-card { display: flex; flex-direction: column; gap: 20px; }
        .ps-row { background: #0c0c0c; border: 1px solid #151515; padding: 20px; border-radius: 20px; display: flex; align-items: center; gap: 15px; }
        .ps-icon { width: 35px; height: 35px; background: #000; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #333; }
        .ps-row span { font-size: 8px; font-weight: 800; color: #333; letter-spacing: 1px; }
        .ps-row p { font-size: 12px; font-weight: 700; color: #fff; margin: 2px 0 0; }
        .v-tag { color: var(--main); font-weight: 800; font-size: 10px; }

        /* RENDIMIENTOS CORREGIDO */
        .report-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px; }
        .r-card { background: var(--panel); border: 1px solid var(--border); padding: 25px; border-radius: 25px; }
        .r-card-head { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
        .r-card-head span { font-size: 9px; font-weight: 800; color: #333; letter-spacing: 1px; }
        .r-card h4 { font-size: 1.4rem; font-weight: 800; margin: 0; }
        .highlight h4 { color: var(--main); }

        .chart-container-mansion { background: var(--panel); border: 1px solid var(--border); padding: 35px; border-radius: 30px; }
        .chart-bars-wrap { height: 180px; display: flex; align-items: flex-end; justify-content: space-between; gap: 12px; border-bottom: 1px solid #111; padding-bottom: 15px; }
        .c-bar-box { flex: 1; height: 100%; display: flex; align-items: flex-end; }
        .c-bar { width: 100%; background: linear-gradient(to top, var(--main), #004d40); border-radius: 8px; opacity: 0.5; transition: 1s ease; }
        .chart-days-labels { display: flex; justify-content: space-between; margin-top: 15px; font-size: 9px; font-weight: 800; color: #222; }

        .m-bottom-bar { position: fixed; bottom: 20px; left: 20px; right: 20px; height: 75px; background: rgba(5,5,5,0.8); backdrop-filter: blur(25px); border: 1px solid var(--border); border-radius: 25px; display: flex; justify-content: space-around; align-items: center; z-index: 999; }
        .m-bottom-bar button { background: none; border: none; color: #333; }
        .m-bottom-bar button.active { color: var(--main); }

        @keyframes pulse { 50% { opacity: 0.3; } }
        .fade-in { animation: fi 0.8s ease forwards; }
        @keyframes fi { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 1024px) { 
          .desktop-only { display: none !important; }
          .mansion-main { padding: 30px 20px 120px; }
          .welcome-section h1 { font-size: 2.2rem; }
          .hub-grid { grid-template-columns: 1fr 1fr; }
          .profile-grid-mansion, .report-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}