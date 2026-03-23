"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import {
  User, Wallet, TrendingUp, ShieldCheck, LogOut,
  Zap, Trophy, Activity, ShieldAlert,
  Settings, HelpCircle, BarChart3, LayoutDashboard,
  Building2, Landmark, Globe, X, Terminal, ArrowUpRight, Menu, CreditCard
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
        setEsAdmin(socioBase?.rol === 'admin');
      }
    } catch (err) { console.error("Error conexión:", err); }
    finally { setTimeout(() => setLoading(false), 2000); }
  };

  useEffect(() => {
    if (esAdmin && !loading) {
      obtenerPendientesAdmin();
    }
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
      <header className="content-header">
        <div className="welcome-section">
          <span className="welcome-badge">{nivelSocio.toUpperCase()}</span>
          <h1>Hola, <span>{nombre.split(' ')[0]}</span></h1>
          <p className="welcome-sub">Bienvenido a tu centro de gestión patrimonial.</p>
        </div>
        <div className="geo-tag"><Globe size={14}/> {paisSocio}</div>
      </header>

      <section className="vault-main-card">
        <div className="vault-content">
          <p className="vault-label">CAPITAL TOTAL GESTIONADO</p>
          <h2 className="vault-balance">
            <span className="currency-symbol">$</span>
            {balanceVisual.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </h2>
          <div className="vault-status">
            <div className="status-chip"><div className="pulse"></div> ALGORITMO ACTIVO</div>
            <div className="profit-chip">+${utilidad.toLocaleString()} USD UTILIDAD</div>
          </div>
        </div>
      </section>

      <div className="stats-container">
        <div className="stat-glass">
          <div className="icon-circle green"><TrendingUp size={20}/></div>
          <div className="stat-text">
            <span>GANANCIA NETA</span>
            <h4>${utilidad.toLocaleString()}</h4>
          </div>
        </div>
        <div className="stat-glass">
          <div className="icon-circle green"><ShieldCheck size={20}/></div>
          <div className="stat-text">
            <span>AUDITORÍA</span>
            <h4>VERIFICADA</h4>
          </div>
        </div>
      </div>

      <h3 className="hub-label">OPERACIONES RÁPIDAS</h3>
      <div className="hub-grid">
        <button className="hub-item" onClick={() => setActiveTab('reportes')}><BarChart3 size={24}/> Rendimientos</button>
        <button className="hub-item" onClick={() => setActiveTab('retiros')}><Wallet size={24}/> Retiros</button>
        <button className="hub-item" onClick={() => setActiveTab('perfil')}><User size={24}/> Perfil</button>
        <button className="hub-item" onClick={() => window.open('https://wa.me/soporte', '_blank')}><HelpCircle size={24}/> Soporte</button>
      </div>
    </div>
  );

  if (loading) return (
    <div className="elite-loading">
      <div className="bunker-scanner"></div>
      <p>VALIDANDO BÓVEDA ÉLITE</p>
      <style jsx>{`
        .elite-loading { background: #000; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; }
        .bunker-scanner { width: 50px; height: 50px; border: 2px solid #111; border-top: 2px solid #00C853; border-radius: 50%; animation: spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        p { color: #00C853; font-size: 10px; letter-spacing: 5px; margin-top: 25px; font-weight: 300; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );

  return (
    <div className="mansion-panel">
      {/* SIDEBAR - ESCRITORIO */}
      <aside className="mansion-sidebar desktop-only">
        <div className="mansion-logo">GURÚ<span>ÉLITE</span></div>
        <nav className="mansion-menu">
          <button className={activeTab === 'inicio' ? 'active' : ''} onClick={() => setActiveTab('inicio')}><LayoutDashboard size={18}/> Inicio</button>
          <button className={activeTab === 'reportes' ? 'active' : ''} onClick={() => setActiveTab('reportes')}><BarChart3 size={18}/> Mercados</button>
          <button className={activeTab === 'retiros' ? 'active' : ''} onClick={() => setActiveTab('retiros')}><Wallet size={18}/> Cajero</button>
          <button className={activeTab === 'perfil' ? 'active' : ''} onClick={() => setActiveTab('perfil')}><User size={18}/> Ajustes</button>
        </nav>
        
        <div className="sidebar-bottom">
          {esAdmin && (
            <button className="bunker-trigger" onClick={() => router.push('/admin/auth')}>
              <Terminal size={18}/> TORRE DE CONTROL {pendientes > 0 && <span className="p-badge">{pendientes}</span>}
            </button>
          )}
          <button className="logout-trigger" onClick={handleLogout}><LogOut size={18}/> CERRAR SESIÓN</button>
        </div>
      </aside>

      <div className="mansion-viewport">
        {/* CABECERA MÓVIL */}
        <header className="mansion-mobile-nav mobile-only">
          <div className="m-logo">GURÚ <span>ÉLITE</span></div>
          {esAdmin && <button className="m-bunker-btn" onClick={() => router.push('/admin/auth')}><Terminal size={20}/></button>}
        </header>

        <main className="mansion-main">
          {activeTab === 'inicio' && <RenderInicio />}
          
          {activeTab === 'retiros' && (
            <div className="fade-in">
              <h2 className="section-title">Terminal de <span>Retiros</span></h2>
              <div className="withdraw-glass">
                <div className="w-header">
                  <p>SALDO LÍQUIDO</p>
                  <h3>${balanceVisual.toLocaleString()}</h3>
                </div>
                <div className="method-selector">
                  <button className={metodoRetiro === 'banco' ? 'active' : ''} onClick={() => setMetodoRetiro('banco')}><Building2 size={18}/> BANCO</button>
                  <button className={metodoRetiro === 'cripto' ? 'active' : ''} onClick={() => setMetodoRetiro('cripto')}><Zap size={18}/> USDT</button>
                </div>
                {mensajeRetiro.texto && <div className={`m-alert ${mensajeRetiro.tipo}`}>{mensajeRetiro.texto}</div>}
                <div className="w-fields">
                  <div className="field-group">
                    <label>MONTO USD</label>
                    <input type="number" placeholder="0.00" value={montoRetiro} onChange={e => setMontoRetiro(e.target.value)} />
                  </div>
                  <div className="field-group">
                    <label>DETALLES DE DESTINO</label>
                    <textarea placeholder="Banco, cuenta o wallet..." value={detallesDestino} onChange={e => setDetallesDestino(e.target.value)} />
                  </div>
                  <button className="w-submit" onClick={procesarRetiro} disabled={enviandoRetiro}>
                    {enviandoRetiro ? 'VERIFICANDO...' : 'CONFIRMAR SOLICITUD'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'perfil' && (
            <div className="fade-in">
              <h2 className="section-title">Ajustes de <span>Cuenta</span></h2>
              <div className="profile-container">
                <div className="profile-glass">
                  <div className="p-field"><span>Nombre</span><input value={editNombre} onChange={e => setEditNombre(e.target.value)}/></div>
                  <div className="p-field"><span>País</span><input value={editPais} onChange={e => setEditPais(e.target.value)}/></div>
                  <div className="p-field"><span>Ciudad</span><input value={editCiudad} onChange={e => setEditCiudad(e.target.value)}/></div>
                  <div className="p-field"><span>Móvil</span><input value={editTelefono} onChange={e => setEditTelefono(e.target.value)}/></div>
                  <button className="p-save" onClick={actualizarPerfil} disabled={guardandoPerfil}>
                    {guardandoPerfil ? 'SINCRO...' : 'GUARDAR CAMBIOS'}
                  </button>
                </div>
                <div className="security-glass">
                  <div className="s-line"><span>EMAIL</span><p>{editEmail}</p></div>
                  <div className="s-line"><span>AUDITORÍA</span><p className="v-status">ACTIVA</p></div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reportes' && (
            <div className="fade-in">
              <h2 className="section-title">Análisis de <span>Mercado</span></h2>
              <div className="market-stats">
                <div className="ms-card"><span>CAPITAL SEMILLA</span><h4>${(balance - utilidad).toLocaleString()}</h4></div>
                <div className="ms-card highlight"><span>PROFIT TOTAL</span><h4>+${utilidad.toLocaleString()}</h4></div>
              </div>
              <div className="visual-chart">
                <div className="chart-bars">
                  {[40, 70, 50, 90, 60, 85, 100].map((h, i) => (
                    <div key={i} className="v-bar-wrap">
                      <div className="v-bar" style={{height: h+'%'}}></div>
                    </div>
                  ))}
                </div>
                <div className="chart-days"><span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span></div>
              </div>
            </div>
          )}
        </main>

        {/* NAVEGACIÓN INFERIOR MÓVIL */}
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
        
        :root { --main: #00C853; --bg: #000; --panel: #080808; --border: #151515; --text: #888; }
        
        .mansion-panel { 
          background: var(--bg); 
          min-height: 100vh; 
          display: flex; 
          color: #fff; 
          font-family: 'Plus Jakarta Sans', sans-serif;
          overflow-x: hidden;
        }

        /* SIDEBAR PROFESIONAL */
        .mansion-sidebar { 
          width: 280px; 
          background: var(--panel); 
          border-right: 1px solid var(--border); 
          display: flex; 
          flex-direction: column; 
          padding: 40px 25px; 
          position: sticky; 
          top: 0; 
          height: 100vh; 
        }
        .mansion-logo { font-weight: 800; font-size: 1.2rem; letter-spacing: -1px; margin-bottom: 50px; }
        .mansion-logo span { color: var(--main); }

        .mansion-menu { flex: 1; }
        .mansion-menu button { 
          width: 100%; 
          text-align: left; 
          padding: 16px; 
          border-radius: 14px; 
          border: none; 
          background: transparent; 
          color: var(--text); 
          display: flex; 
          align-items: center; 
          gap: 15px; 
          font-weight: 700; 
          cursor: pointer; 
          transition: 0.3s;
          font-size: 0.85rem;
          margin-bottom: 8px;
        }
        .mansion-menu button:hover, .mansion-menu button.active { color: #fff; background: #0c0c0c; }
        .mansion-menu button.active { color: var(--main); }

        .sidebar-bottom { border-top: 1px solid var(--border); padding-top: 30px; }
        .bunker-trigger { 
          width: 100%; 
          background: rgba(0,200,83,0.05); 
          border: 1px solid rgba(0,200,83,0.1); 
          color: var(--main); 
          padding: 15px; 
          border-radius: 12px; 
          font-weight: 800; 
          font-size: 10px;
          letter-spacing: 1px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        }
        .p-badge { background: #ff4444; color: #fff; padding: 2px 6px; border-radius: 20px; font-size: 8px; }
        .logout-trigger { background: none; border: none; color: #ff4444; font-weight: 800; font-size: 10px; cursor: pointer; padding: 10px; opacity: 0.7; }

        /* VIEWPORT */
        .mansion-viewport { flex: 1; display: flex; flex-direction: column; min-width: 0; }
        .mansion-mobile-nav { 
          height: 80px; 
          border-bottom: 1px solid var(--border); 
          display: flex; 
          align-items: center; 
          justify-content: space-between; 
          padding: 0 25px; 
          background: #000;
        }
        .m-logo { font-weight: 800; font-size: 1rem; }
        .m-logo span { color: var(--main); }
        .m-bunker-btn { background: rgba(0,200,83,0.1); border: none; color: var(--main); width: 45px; height: 45px; border-radius: 14px; }

        .mansion-main { padding: 50px 8%; max-width: 1100px; margin: 0 auto; width: 100%; }

        /* CONTENT HEADER */
        .content-header { margin-bottom: 40px; display: flex; justify-content: space-between; align-items: flex-end; }
        .welcome-badge { font-size: 9px; color: var(--main); font-weight: 800; letter-spacing: 3px; border: 1px solid var(--main); padding: 4px 12px; border-radius: 20px; }
        .welcome-section h1 { font-size: 3rem; font-weight: 800; margin: 10px 0 5px; }
        .welcome-section span { color: var(--main); }
        .welcome-sub { color: #444; font-size: 0.9rem; font-weight: 500; }
        .geo-tag { background: #0c0c0c; border: 1px solid var(--border); padding: 10px 20px; border-radius: 30px; font-size: 10px; font-weight: 800; color: #555; display: flex; align-items: center; gap: 10px; }

        /* VAULT CARD */
        .vault-main-card { 
          background: linear-gradient(135deg, #0a0a0a 0%, #000 100%); 
          border: 1px solid var(--border); 
          padding: 60px 50px; 
          border-radius: 40px; 
          margin-bottom: 30px; 
          position: relative;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }
        .vault-label { font-size: 10px; font-weight: 800; color: #333; letter-spacing: 3px; }
        .vault-balance { font-size: clamp(3rem, 10vw, 5.5rem); font-weight: 800; letter-spacing: -3px; margin: 20px 0; }
        .currency-symbol { color: var(--main); font-size: 2.5rem; vertical-align: top; margin-right: 10px; }
        .vault-status { display: flex; gap: 20px; margin-top: 30px; border-top: 1px solid #0c0c0c; padding-top: 30px; }
        .status-chip { font-size: 9px; font-weight: 800; color: var(--main); display: flex; align-items: center; gap: 10px; }
        .pulse { width: 6px; height: 6px; background: var(--main); border-radius: 50%; animation: pulse 2s infinite; }
        .profit-chip { font-size: 9px; font-weight: 800; color: #333; }

        /* STATS GLASS */
        .stats-container { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 40px; }
        .stat-glass { 
          background: var(--panel); 
          border: 1px solid var(--border); 
          padding: 30px; 
          border-radius: 25px; 
          display: flex; 
          align-items: center; 
          gap: 20px;
          transition: 0.3s;
        }
        .stat-glass:hover { border-color: #222; transform: translateY(-5px); }
        .icon-circle { width: 50px; height: 50px; background: #000; border-radius: 16px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border); }
        .stat-text span { font-size: 9px; font-weight: 800; color: #444; }
        .stat-text h4 { font-size: 1.2rem; font-weight: 800; margin: 2px 0 0; }

        /* HUB */
        .hub-label { font-size: 10px; font-weight: 800; color: #222; letter-spacing: 3px; margin-bottom: 20px; }
        .hub-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; }
        .hub-item { 
          background: var(--panel); 
          border: 1px solid var(--border); 
          padding: 30px 10px; 
          border-radius: 25px; 
          color: #fff; 
          font-weight: 800; 
          font-size: 0.75rem; 
          cursor: pointer; 
          transition: 0.3s; 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          gap: 15px; 
        }
        .hub-item:hover { border-color: var(--main); background: #0c0c0c; }

        /* SECTIONS */
        .section-title { font-size: 2rem; font-weight: 800; margin-bottom: 35px; }
        .section-title span { color: var(--main); }

        /* WITHDRAW GLASS */
        .withdraw-glass { background: var(--panel); border: 1px solid var(--border); padding: 40px; border-radius: 35px; }
        .w-header h3 { font-size: 3rem; font-weight: 800; color: var(--main); margin-top: 10px; letter-spacing: -1px; }
        .w-header p { font-size: 9px; font-weight: 800; color: #333; }
        
        .method-selector { display: flex; gap: 12px; margin: 30px 0; }
        .method-selector button { flex: 1; background: #000; border: 1px solid var(--border); padding: 18px; border-radius: 16px; color: #444; font-weight: 800; cursor: pointer; transition: 0.3s; }
        .method-selector button.active { border-color: var(--main); color: var(--main); }

        .field-group { margin-bottom: 25px; }
        .field-group label { display: block; font-size: 9px; font-weight: 800; color: #222; margin-bottom: 12px; }
        .field-group input, .field-group textarea { width: 100%; background: #000; border: 1px solid var(--border); padding: 20px; border-radius: 16px; color: #fff; font-weight: 600; outline: none; transition: 0.3s; }
        .field-group input:focus { border-color: var(--main); }
        .w-submit { width: 100%; background: var(--main); border: none; padding: 22px; border-radius: 20px; color: #000; font-weight: 800; cursor: pointer; transition: 0.3s; margin-top: 15px; }
        .w-submit:hover { background: #fff; transform: translateY(-3px); }

        /* PROFILE */
        .profile-glass { background: var(--panel); border: 1px solid var(--border); padding: 40px; border-radius: 35px; margin-bottom: 25px; }
        .p-field { margin-bottom: 20px; }
        .p-field span { display: block; font-size: 9px; font-weight: 800; color: #333; margin-bottom: 10px; }
        .p-field input { width: 100%; background: #000; border: 1px solid var(--border); padding: 18px; border-radius: 14px; color: #fff; outline: none; }
        .p-save { width: 100%; background: #fff; color: #000; border: none; padding: 18px; border-radius: 14px; font-weight: 800; cursor: pointer; margin-top: 10px; }
        .security-glass { background: #0c0c0c; padding: 30px; border-radius: 25px; border: 1px solid var(--border); display: flex; flex-direction: column; gap: 15px; }
        .s-line { display: flex; justify-content: space-between; align-items: center; }
        .s-line span { font-size: 10px; font-weight: 800; color: #333; }
        .v-status { color: var(--main); font-size: 9px; font-weight: 800; background: rgba(0,200,83,0.1); padding: 4px 12px; border-radius: 20px; }

        /* CHART */
        .visual-chart { background: var(--panel); border: 1px solid var(--border); padding: 40px; border-radius: 35px; }
        .chart-bars { height: 200px; display: flex; align-items: flex-end; justify-content: space-between; gap: 15px; }
        .v-bar-wrap { flex: 1; height: 100%; display: flex; align-items: flex-end; }
        .v-bar { width: 100%; background: linear-gradient(to top, var(--main), #004d40); border-radius: 10px; opacity: 0.6; transition: 1s ease; }
        .chart-days { display: flex; justify-content: space-between; margin-top: 25px; color: #333; font-size: 10px; font-weight: 800; }

        /* MOBILE BOTTOM BAR */
        .m-bottom-bar { 
          position: fixed; 
          bottom: 20px; 
          left: 20px; 
          right: 20px; 
          height: 75px; 
          background: rgba(10,10,10,0.8); 
          backdrop-filter: blur(25px); 
          border: 1px solid var(--border); 
          border-radius: 25px; 
          display: flex; 
          justify-content: space-around; 
          align-items: center; 
          z-index: 999; 
        }
        .m-bottom-bar button { background: none; border: none; color: #444; }
        .m-bottom-bar button.active { color: var(--main); }

        @keyframes pulse { 50% { opacity: 0.3; } }
        .fade-in { animation: fi 0.8s ease forwards; }
        @keyframes fi { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        /* MOBILE OVERRIDES */
        @media (max-width: 1024px) { 
          .desktop-only { display: none !important; }
          .mansion-main { padding: 30px 20px 120px; }
          .welcome-section h1 { font-size: 2.2rem; }
          .vault-main-card { padding: 40px 25px; border-radius: 30px; }
          .stats-container { grid-template-columns: 1fr; }
          .hub-grid { grid-template-columns: 1fr 1fr; }
          .hub-item { padding: 25px 10px; }
          .vault-balance { font-size: 3rem; }
        }
      `}</style>
    </div>
  );
}