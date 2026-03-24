"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import {
  User, Wallet, TrendingUp, ShieldCheck, LogOut,
  Zap, Trophy, Activity, ShieldAlert,
  Settings, HelpCircle, BarChart3, LayoutDashboard,
  Building2, Landmark, Globe, X, Terminal, ArrowUpRight, Menu, CreditCard, ChevronDown, Lock, ArrowLeft, Mail, Phone, MapPin, Bell
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
      alert("Solicitud en auditoría enviada correctamente.");
    } catch (err) { alert("Error en el envío."); }
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
      alert("Perfil actualizado correctamente.");
    } catch (err) { alert("Error al actualizar perfil."); }
    finally { setGuardandoPerfil(false); }
  };

  const RenderInicio = () => (
    <div className="fade-in">
      <header className="content-header">
        <div className="welcome-section">
          <span className="elite-badge">{nivelSocio.toUpperCase()}</span>
          <h1>Hola, <span>{nombre.split(' ')[0]}</span></h1>
          <p className="welcome-sub">Gestión de activos bajo estándares de seguridad Élite.</p>
        </div>
        <div className="geo-pill"><Globe size={12}/> {paisSocio}</div>
      </header>

      <section className="glass-vault-card">
        <div className="vault-top">
          <p className="vault-label-text">BALANCE TOTAL <ChevronDown size={14}/></p>
          <div className="yield-tag">+{((utilidad / (balance - utilidad)) * 100 || 0).toFixed(2)}%</div>
        </div>
        <h2 className="vault-amount">
          <span className="symbol">$</span>{balanceVisual.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </h2>
        <div className="vault-footer">
          <div className="status-live"><div className="pulse"></div> IA ALGORITMO ACTIVO</div>
          <div className="profit-text">+${utilidad.toLocaleString()} USD UTILIDAD</div>
        </div>
      </section>

      <div className="stats-grid">
        <div className="stat-box" onClick={() => setActiveTab('reportes')}>
          <div className="sb-icon"><TrendingUp size={20} color="#00C853"/></div>
          <div className="sb-info"><span className="vault-label-text">PROFIT TOTAL ACUMULADO</span><h4>${utilidad.toLocaleString()}</h4></div>
        </div>
        <div className="stat-box">
          <div className="sb-icon"><ShieldCheck size={20} color="#00C853"/></div>
          <div className="sb-info"><span className="vault-label-text">ESTADO DE AUDITORÍA</span><h4>VERIFICADA</h4></div>
        </div>
      </div>

      <h3 className="hub-label">CENTRO DE OPERACIONES</h3>
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
      <p>ESCANEANDO CREDENCIALES ÉLITE...</p>
      <style jsx>{`
        .elite-loader { background: #000; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; }
        .scanner-ring { width: 50px; height: 50px; border: 2px solid #111; border-top: 2px solid #00C853; border-radius: 50%; animation: spin 0.8s linear infinite; }
        p { color: #00C853; font-size: 10px; letter-spacing: 5px; margin-top: 25px; font-weight: 300; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );

  return (
    <div className="mansion-container">
      {show2FA && (
        <div className="security-overlay fade-in">
          <div className="security-card scale-in">
            <button className="close-x" onClick={() => setShow2FA(false)}><X size={20}/></button>
            <ShieldAlert size={40} color="#00C853" style={{marginBottom:'20px'}}/>
            <h2>VERIFICACIÓN DE SEGURIDAD</h2>
            <p className="vault-label-text">Se ha enviado un código a su email: {editEmail}</p>
            <input className="vault-input-fixed" type="text" maxLength={6} placeholder="000000" value={codigoIngresado} onChange={(e) => setCodigoIngresado(e.target.value)} />
            <button className="w-submit-btn-fixed" onClick={confirmarRetiroFinal} disabled={enviandoRetiro}>
              {enviandoRetiro ? 'PROCESANDO...' : 'CONFIRMAR IDENTIDAD'}
            </button>
          </div>
        </div>
      )}

      <aside className="mansion-sidebar desktop-only">
        <div className="brand-logo">GURÚ<span>ÉLITE</span></div>
        <nav className="mansion-nav">
          <button className={activeTab === 'inicio' ? 'active' : ''} onClick={() => setActiveTab('inicio')}><LayoutDashboard size={18}/> Mi Bóveda</button>
          <button className={activeTab === 'reportes' ? 'active' : ''} onClick={() => setActiveTab('reportes')}><BarChart3 size={18}/> Mercados</button>
          <button className={activeTab === 'retiros' ? 'active' : ''} onClick={() => setActiveTab('retiros')}><Wallet size={18}/> Cajero</button>
          <button className={activeTab === 'perfil' ? 'active' : ''} onClick={() => setActiveTab('perfil')}><User size={18}/> Cuenta</button>
        </nav>
        <div className="sidebar-footer">
          {esAdmin && <button className="admin-trigger" onClick={() => router.push('/admin/auth')}> <Terminal size={16}/> ADMIN {pendientes > 0 && <span className="p-badge">{pendientes}</span>}</button>}
          <button className="logout-trigger" onClick={handleLogout}><LogOut size={16}/> CERRAR SESIÓN</button>
        </div>
      </aside>

      <div className="mansion-viewport">
        <header className="mobile-header mobile-only">
          <div className="m-brand-box">GURÚ <span>ÉLITE</span></div>
          <div className="m-icons-box">
             {esAdmin && <button className="m-admin-btn" onClick={() => router.push('/admin/auth')}><Terminal size={18}/></button>}
             <button className="m-bell-btn"><Bell size={18} color="#555"/></button>
          </div>
        </header>

        <main className="mansion-main">
          {activeTab !== 'inicio' && (
            <button className="back-btn" onClick={() => setActiveTab('inicio')}><ArrowLeft size={16}/> REGRESAR A BÓVEDA</button>
          )}

          {activeTab === 'inicio' && <RenderInicio />}
          
          {activeTab === 'retiros' && (
            <div className="fade-in">
              <h2 className="section-title">Terminal de <span>Retiros</span></h2>
              <div className="glass-withdraw-card">
                <div className="w-header-box">
                  <span className="vault-label-text">SALDO LÍQUIDO DISPONIBLE</span>
                  <h3 className="w-main-balance-text">${balanceVisual.toLocaleString()}</h3>
                </div>
                <div className="w-method-selector">
                  <button className={metodoRetiro === 'banco' ? 'active' : ''} onClick={() => setMetodoRetiro('banco')}><Building2 size={16}/> BANCO</button>
                  <button className={metodoRetiro === 'cripto' ? 'active' : ''} onClick={() => setMetodoRetiro('cripto')}><Zap size={16}/> USDT</button>
                </div>
                <div className="w-fields-container">
                  <div className="w-input-group"><label className="vault-label-text">MONTO A RETIRAR (USD)</label><input className="vault-input-fixed" type="number" placeholder="0.00" value={montoRetiro} onChange={e => setMontoRetiro(e.target.value)} /></div>
                  <div className="w-input-group"><label className="vault-label-text">DESTINO DE FONDOS</label><textarea className="vault-input-fixed" placeholder="Banco, cuenta o wallet address..." value={detallesDestino} onChange={e => setDetallesDestino(e.target.value)} /></div>
                  <button className="w-submit-btn-fixed" onClick={iniciarProtocoloRetiro}><Lock size={16}/> ACTIVAR PROTOCOLO SEGURO</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'perfil' && (
            <div className="fade-in">
              <h2 className="section-title">Ajustes de <span>Perfil</span></h2>
              <div className="profile-grid-mansion">
                <div className="p-glass-card">
                  <div className="p-header-info"><User size={20} color="#00C853"/> <span>INFORMACIÓN PERSONAL</span></div>
                  <div className="p-input-row"><label className="vault-label-text">NOMBRE COMPLETO</label><input className="vault-input-fixed" value={editNombre} onChange={e => setEditNombre(e.target.value)}/></div>
                  <div className="p-input-row"><label className="vault-label-text">PAÍS DE RESIDENCIA</label><input className="vault-input-fixed" value={editPais} onChange={e => setEditPais(e.target.value)}/></div>
                  <div className="p-input-row"><label className="vault-label-text">CIUDAD</label><input className="vault-input-fixed" value={editCiudad} onChange={e => setEditCiudad(e.target.value)}/></div>
                  <div className="p-input-row"><label className="vault-label-text">TELÉFONO MÓVIL</label><input className="vault-input-fixed" value={editTelefono} onChange={e => setEditTelefono(e.target.value)}/></div>
                  <button className="p-save-btn-fixed" onClick={actualizarPerfil} disabled={guardandoPerfil}>
                    {guardandoPerfil ? 'SINCRONIZANDO...' : 'GUARDAR CAMBIOS'}
                  </button>
                </div>
                <div className="p-security-stack">
                  <div className="ps-card-glass"><div className="ps-icon-circle"><Mail size={16}/></div><div><span className="vault-label-text">EMAIL ASOCIADO</span><p>{editEmail}</p></div></div>
                  <div className="ps-card-glass"><div className="ps-icon-circle"><ShieldCheck size={16}/></div><div><span className="vault-label-text">AUDITORÍA DE CUENTA</span><p className="v-tag-neon">ACTIVA</p></div></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reportes' && (
            <div className="fade-in">
              <h2 className="section-title">Análisis de <span>Mercados</span></h2>
              <div className="report-grid-fixed">
                <div className="r-card-glass">
                   <div className="r-head"><Wallet size={16} color="#A0A0A0"/> <span className="vault-label-text">CAPITAL SEMILLA</span></div>
                   <h4>${(balance - utilidad).toLocaleString()}</h4>
                </div>
                <div className="r-card-glass highlight-border">
                   <div className="r-head"><Activity size={16} color="#00C853"/> <span className="vault-label-text">PROFIT TOTAL</span></div>
                   <h4 className="neon-text">+${utilidad.toLocaleString()}</h4>
                </div>
              </div>
              <div className="chart-container-mansion-fixed">
                <div className="chart-bars-wrap-fixed">
                  {[35, 65, 45, 85, 55, 95, 100].map((h, i) => (
                    <div key={i} className="c-bar-box-fixed"><div className="c-bar-inner" style={{height: h+'%'}}></div></div>
                  ))}
                </div>
                <div className="chart-days-labels-fixed"><span className="vault-label-text">L</span><span className="vault-label-text">M</span><span className="vault-label-text">M</span><span className="vault-label-text">J</span><span className="vault-label-text">V</span><span className="vault-label-text">S</span><span className="vault-label-text">D</span></div>
              </div>
            </div>
          )}
        </main>

        <nav className="m-bottom-bar-fixed mobile-only">
          <button className={activeTab === 'inicio' ? 'active' : ''} onClick={() => setActiveTab('inicio')}><LayoutDashboard size={20}/></button>
          <button className={activeTab === 'reportes' ? 'active' : ''} onClick={() => setActiveTab('reportes')}><BarChart3 size={20}/></button>
          <button className={activeTab === 'retiros' ? 'active' : ''} onClick={() => setActiveTab('retiros')}><Wallet size={20}/></button>
          <button className={activeTab === 'perfil' ? 'active' : ''} onClick={() => setActiveTab('perfil')}><User size={20}/></button>
          <button onClick={handleLogout}><LogOut size={20} color="#ff4444"/></button>
        </nav>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;400;700;800&display=swap');
        :root { --main: #00C853; --bg: #000; --border: #1a1a1a; --text-muted: #D1D1D1; }
        
        body { margin: 0; background: #000 !important; color: #fff; font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: hidden; }

        /* --- AISLAMIENTO RESPONSIVO RADICAL --- */
        .desktop-only { display: none !important; }
        @media (min-width: 1024px) { 
          .desktop-only { display: flex !important; }
          .mobile-only { display: none !important; }
        }

        .mansion-container { display: flex; min-height: 100vh; background: #000; }
        .mansion-sidebar { width: 280px; background: #050505; border-right: 1px solid var(--border); position: sticky; top: 0; height: 100vh; z-index: 1000; padding: 40px 25px; box-sizing: border-box; display: flex; flex-direction: column; }
        .brand-logo { font-weight: 800; font-size: 1.2rem; letter-spacing: -1px; margin-bottom: 50px; }
        .brand-logo span { color: var(--main); }
        .mansion-nav button { width: 100%; text-align: left; padding: 16px; border-radius: 14px; background: transparent; color: #555; border: none; display: flex; align-items: center; gap: 15px; font-weight: 700; cursor: pointer; transition: 0.3s; margin-bottom: 8px; }
        .mansion-nav button.active { color: var(--main); background: rgba(0,200,83,0.03); }

        .mansion-viewport { flex: 1; display: flex; flex-direction: column; background: #000; min-width: 0; }
        .mobile-header { height: 75px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; padding: 0 25px; background: #000; position: sticky; top: 0; z-index: 500; }
        .m-brand-box { font-weight: 800; font-size: 1.1rem; color: #fff; display: flex; align-items: center; }
        .m-brand-box span { color: var(--main); margin-left: 5px; }

        .mansion-main { padding: 40px 6%; max-width: 1000px; margin: 0 auto; width: 100%; box-sizing: border-box; position: relative; }
        .vault-label-text { color: #888 !important; font-size: 9px !important; font-weight: 800 !important; letter-spacing: 1.5px !important; text-transform: uppercase; }

        /* --- BLINDAJE DE TARJETAS (HIERRO SÓLIDO) --- */
        .glass-vault-card, .p-glass-card, .r-card-glass, .glass-withdraw-card, .stat-box, .stat-box-glass, .hub-card, .ps-card-glass { 
          background: #0a0a0a !important; 
          border: 1px solid var(--border) !important; 
          padding: 40px !important; 
          border-radius: 35px !important; 
          margin-bottom: 30px !important; 
          display: block !important;
          width: 100% !important;
          box-sizing: border-box !important;
          box-shadow: 0 15px 40px rgba(0,0,0,0.9) !important;
        }

        /* --- BLINDAJE DE INPUTS NEGROS --- */
        .vault-input-fixed {
          width: 100% !important;
          background: #000 !important;
          background-color: #000 !important;
          border: 1px solid #222 !important;
          padding: 18px !important;
          border-radius: 15px !important;
          color: #fff !important;
          font-size: 15px !important;
          outline: none !important;
          appearance: none !important;
          -webkit-appearance: none !important;
          -moz-appearance: none !important;
          box-shadow: none !important;
        }

        .w-submit-btn-fixed, .p-save-btn-fixed, .verify-btn-vault { 
          width: 100%; background: var(--main); color: #000; border: none; padding: 22px; border-radius: 20px; font-weight: 900; margin-top: 15px; cursor: pointer; transition: 0.3s; 
        }

        .m-bottom-bar-fixed { position: fixed; bottom: 20px; left: 20px; right: 20px; height: 75px; background: rgba(5,5,5,0.95); backdrop-filter: blur(20px); border: 1px solid var(--border); border-radius: 25px; display: flex; justify-content: space-around; align-items: center; z-index: 999; }
        .m-bottom-bar-fixed button { background: none; border: none; color: #444; }
        .m-bottom-bar-fixed button.active { color: var(--main); }

        @media (min-width: 1024px) { 
          .mansion-main { padding: 40px 20px 80px; max-width: 900px; margin: 0 auto; }
          .glass-withdraw-card, .p-glass-card { max-width: 600px !important; margin: 0 auto 30px !important; }
          .stats-grid, .report-grid-fixed { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
          .stat-box { display: flex !important; align-items: center; gap: 20px; padding: 30px !important; }
        }

        @media (max-width: 1023px) {
          .mansion-main { padding: 30px 20px 120px !important; }
          .hub-grid, .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
          .glass-vault-card, .p-glass-card, .glass-withdraw-card { padding: 25px !important; border-radius: 25px !important; }
          .stat-box { display: block !important; padding: 25px !important; }
        }

        .vault-amount { font-size: clamp(3rem, 10vw, 4.5rem); font-weight: 800; letter-spacing: -2px; margin: 15px 0; }
        .fade-in { animation: fi 0.8s ease forwards; }
        @keyframes fi { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}