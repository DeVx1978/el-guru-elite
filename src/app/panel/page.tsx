"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import {
  User, Wallet, TrendingUp, ShieldCheck, LogOut,
  Zap, Award, Star, Target, Briefcase, Bell, LayoutDashboard,
  ArrowUpRight, Activity, ShieldAlert, Trophy, ArrowRightCircle,
  Settings, HelpCircle, BarChart3, PieChart, History, PlusCircle
} from 'lucide-react';

const clientSupabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function SocioPanel() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [nombre, setNombre] = useState("Socio");
  const [esAdmin, setEsAdmin] = useState(false);
  const [pendientes, setPendientes] = useState(0);
  const [activeTab, setActiveTab] = useState('inicio');

  useEffect(() => {
    const timer = setTimeout(() => { setLoading(false); }, 4000);
    const socioNombre = localStorage.getItem('socio_nombre');
    const socioId = localStorage.getItem('socio_id');
    const socioRol = localStorage.getItem('socio_rol');

    if (!socioId) {
      router.push('/login');
    } else {
      setNombre(socioNombre || "Socio");
      if (socioRol === 'admin') {
        setEsAdmin(true);
        obtenerPendientes();
      }
    }
    return () => clearTimeout(timer);
  }, [router]);

  const obtenerPendientes = async () => {
    const { data } = await clientSupabase.from('socios').select('id').eq('estado', 'pendiente');
    setPendientes(data?.length || 0);
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="loader-screen">
        <div className="guru-loader">
          <div className="inner-circle"><span className="logo-g">G</span></div>
        </div>
        <p className="pulse loading-text">AUTENTICACIÓN ÉLITE...</p>
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
      {/* 💻 SIDEBAR PARA PC */}
      <aside className="sidebar-desktop">
        <div className="sidebar-header">
          <div className="brand-elite">GURÚ <span>ÉLITE</span></div>
        </div>
        <nav className="sidebar-nav">
          <div className={`nav-item ${activeTab === 'inicio' ? 'active' : ''}`} onClick={() => setActiveTab('inicio')}>
            <LayoutDashboard size={20} /> Inicio
          </div>
          <div className="nav-item"><BarChart3 size={20} /> Reportes y Ganancias</div>
          <div className="nav-item"><PieChart size={20} /> Estadísticas</div>
          <div className="nav-item"><Wallet size={20} /> Retiros</div>
          <div className="nav-item"><PlusCircle size={20} /> Subir Membresía</div>
          <div className="nav-divider"></div>
          <div className="nav-item"><User size={20} /> Mi Perfil</div>
          <div className="nav-item"><HelpCircle size={20} /> Soporte</div>
        </nav>
        <button onClick={handleLogout} className="logout-sidebar">
          <LogOut size={18} /> SALIR DEL SISTEMA
        </button>
      </aside>

      <div className="main-wrapper">
        {/* 📱 HEADER SUPERIOR LIMPIO */}
        <header className="top-navbar">
          <div className="mobile-brand">GURÚ <span>ÉLITE</span></div>
          <div className="header-actions">
            <div className="header-icon" onClick={() => esAdmin && router.push('/admin')}>
              <Bell size={22} color={esAdmin && pendientes > 0 ? "#00C853" : "#555"} />
              {esAdmin && pendientes > 0 && <span className="badge">{pendientes}</span>}
            </div>
            <div className="header-icon mobile-hidden"><Settings size={22} color="#555" /></div>
            <div className="user-avatar">{nombre.charAt(0)}</div>
          </div>
        </header>

        <main className="panel-content">
          {esAdmin && (
            <button onClick={() => router.push('/admin')} className="admin-banner-v2">
              <ShieldAlert size={20} /> MODO ADMINISTRADOR: CENTRO DE MANDO ACTIVO
            </button>
          )}

          <div className="welcome-banner">
            <h1>Bienvenido, <span>{nombre}</span></h1>
            <p><ShieldCheck size={14} color="#00C853" /> CUENTA VERIFICADA E INSTITUCIONAL</p>
          </div>

          <div className="vault-grid">
            {/* CARD DE BALANCE CENTRAL */}
            <div className="vault-card-main">
              <div className="card-top">
                <span className="card-label">CAPITAL TOTAL GESTIONADO</span>
                <span className="profit-badge">+18.5% PROFIT</span>
              </div>
              <div className="balance-display">
                <span className="symbol">$</span>
                <span className="value">0.00</span>
                <div className="live-status"><div className="dot"></div> LIVE</div>
              </div>
              <div className="progress-container">
                <div className="progress-labels"><span>PROGRESO DE CARTERA</span><span>EN ESPERA</span></div>
                <div className="bar-bg"><div className="bar-fill"></div></div>
                <div className="ai-pulse"><Activity size={12} className="pulse" /> ALGORITMOS CALCULANDO...</div>
              </div>
            </div>

            {/* CARD DE NIVEL DE SOCIO */}
            <div className="rank-card-v2">
              <div className="rank-header">
                <Trophy size={32} color="#00C853" />
                <div>
                  <p>NIVEL DE SOCIO</p>
                  <h3>PLAN ÉLITE</h3>
                </div>
              </div>
              <div className="rank-details">
                <div className="detail-item"><span>Inversión</span><span>$1500 USD</span></div>
                <div className="detail-item"><span>Status</span><span className="active-tag">ACTIVO</span></div>
              </div>
              <button className="upgrade-btn">MEJORAR PLAN</button>
            </div>
          </div>

          <div className="section-title">ACCIONES RÁPIDAS</div>
          <div className="actions-grid-v2">
            <div className="action-tile" onClick={() => router.push('/panel/objetivos')}>
              <Target color="#00C853" /> <span>Ruta de Expansión</span>
            </div>
            <div className="action-tile">
              <TrendingUp color="#00C853" /> <span>Señales 2026</span>
            </div>
            <div className="action-tile">
              <History color="#00C853" /> <span>Historial</span>
            </div>
            <div className="action-tile">
              <HelpCircle color="#00C853" /> <span>Soporte</span>
            </div>
          </div>
        </main>

        {/* 📱 MENÚ INFERIOR MÓVIL (TIPO APP BANCARIA) */}
        <nav className="mobile-tab-bar">
          <div className="tab-item active"><LayoutDashboard size={24} /><span>Inicio</span></div>
          <div className="tab-item"><BarChart3 size={24} /><span>Reportes</span></div>
          <div className="tab-item"><Wallet size={24} /><span>Retiros</span></div>
          <div className="tab-item" onClick={handleLogout}><LogOut size={24} color="#ff4444" /><span>Salir</span></div>
        </nav>
      </div>

      <style jsx global>{`
        :root { --neon: #00C853; --dark: #0a0c10; --border: #1a1c20; }
        .app-layout { background: #000; min-height: 100vh; display: flex; font-family: 'Inter', sans-serif; color: #fff; }

        /* SIDEBAR PC */
        .sidebar-desktop { width: 280px; background: #050505; border-right: 1px solid var(--border); display: none; flex-direction: column; padding: 30px 20px; position: sticky; top: 0; height: 100vh; }
        @media (min-width: 1024px) { .sidebar-desktop { display: flex; } }
        .brand-elite { font-weight: 900; font-size: 1.4rem; letter-spacing: -1px; margin-bottom: 40px; }
        .brand-elite span { color: var(--neon); }
        .sidebar-nav { flex: 1; }
        .nav-item { padding: 14px 18px; border-radius: 12px; display: flex; align-items: center; gap: 15px; color: #666; cursor: pointer; transition: 0.3s; margin-bottom: 5px; font-weight: 600; font-size: 0.95rem; }
        .nav-item:hover, .nav-item.active { background: rgba(0,200,83,0.05); color: var(--neon); }
        .nav-divider { height: 1px; background: var(--border); margin: 20px 0; }
        .logout-sidebar { background: rgba(255,68,68,0.05); color: #ff4444; border: 1px solid rgba(255,68,68,0.1); padding: 14px; border-radius: 12px; font-weight: 800; cursor: pointer; font-size: 0.8rem; }

        /* MAIN WRAPPER */
        .main-wrapper { flex: 1; display: flex; flex-direction: column; min-width: 0; }
        
        /* TOP NAVBAR */
        .top-navbar { height: 70px; background: rgba(0,0,0,0.8); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: space-between; padding: 0 25px; border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 100; }
        .mobile-brand { font-weight: 900; font-size: 1.1rem; }
        .mobile-brand span { color: var(--neon); }
        @media (min-width: 1024px) { .mobile-brand { display: none; } }
        .header-actions { display: flex; align-items: center; gap: 20px; }
        .header-icon { position: relative; cursor: pointer; }
        .user-avatar { width: 35px; height: 35px; background: var(--neon); color: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; }
        .badge { position: absolute; top: -5px; right: -5px; background: red; width: 16px; height: 16px; border-radius: 50%; font-size: 10px; display: flex; align-items: center; justify-content: center; }

        /* CONTENT */
        .panel-content { padding: 25px; max-width: 1200px; margin: 0 auto; width: 100%; padding-bottom: 100px; }
        .admin-banner-v2 { width: 100%; background: linear-gradient(90deg, var(--neon), #007a33); border: none; padding: 15px; border-radius: 15px; color: #fff; font-weight: 900; margin-bottom: 30px; display: flex; align-items: center; justify-content: center; gap: 10px; font-size: 0.8rem; cursor: pointer; }
        .welcome-banner h1 { font-size: 2.2rem; font-weight: 900; margin-bottom: 8px; }
        .welcome-banner h1 span { color: var(--neon); }
        .welcome-banner p { color: #555; font-size: 0.8rem; font-weight: 800; display: flex; align-items: center; gap: 8px; }

        /* VAULT GRID */
        .vault-grid { display: grid; grid-template-columns: 1fr; gap: 20px; margin: 30px 0; }
        @media (min-width: 1024px) { .vault-grid { grid-template-columns: 1.5fr 1fr; } }
        
        .vault-card-main { background: linear-gradient(145deg, #0a0c10, #030303); border: 1px solid var(--border); border-radius: 30px; padding: 35px; }
        .card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
        .card-label { font-size: 0.75rem; font-weight: 900; color: #444; letter-spacing: 2px; }
        .profit-badge { background: rgba(0,200,83,0.1); color: var(--neon); padding: 6px 14px; border-radius: 10px; font-size: 0.75rem; font-weight: 900; }
        .balance-display { display: flex; align-items: baseline; gap: 10px; margin-bottom: 30px; }
        .symbol { font-size: 2rem; color: #222; font-weight: 900; }
        .value { font-size: 4rem; font-weight: 900; letter-spacing: -3px; }
        .live-status { display: flex; align-items: center; gap: 8px; font-size: 10px; color: #ff4444; font-weight: 900; margin-left: 15px; border: 1px solid rgba(255,68,68,0.2); padding: 4px 10px; border-radius: 20px; }
        .dot { width: 6px; height: 6px; background: #ff4444; border-radius: 50%; animation: blink 1s infinite; }
        
        .bar-bg { width: 100%; height: 8px; background: #111; border-radius: 10px; margin: 12px 0; overflow: hidden; }
        .bar-fill { width: 40%; height: 100%; background: var(--neon); box-shadow: 0 0 15px var(--neon); border-radius: 10px; }
        .ai-pulse { color: #222; font-size: 10px; font-weight: 900; display: flex; align-items: center; gap: 8px; }

        .rank-card-v2 { background: #080808; border: 1px solid var(--border); border-radius: 30px; padding: 35px; display: flex; flex-direction: column; justify-content: space-between; }
        .rank-header { display: flex; align-items: center; gap: 20px; margin-bottom: 30px; }
        .rank-header p { font-size: 10px; color: #444; font-weight: 900; margin: 0; }
        .rank-header h3 { font-size: 1.5rem; font-weight: 900; margin: 0; }
        .detail-item { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 0.9rem; font-weight: 700; }
        .active-tag { color: var(--neon); }
        .upgrade-btn { width: 100%; background: transparent; border: 1px solid #222; padding: 14px; border-radius: 12px; color: #fff; font-weight: 900; cursor: pointer; transition: 0.3s; margin-top: 20px; }
        .upgrade-btn:hover { border-color: var(--neon); color: var(--neon); }

        /* ACTIONS */
        .section-title { font-size: 0.75rem; font-weight: 900; color: #444; letter-spacing: 2px; margin-bottom: 20px; }
        .actions-grid-v2 { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        @media (min-width: 1024px) { .actions-grid-v2 { grid-template-columns: repeat(4, 1fr); } }
        .action-tile { background: #0a0c10; border: 1px solid var(--border); padding: 25px; border-radius: 20px; display: flex; flex-direction: column; gap: 15px; cursor: pointer; transition: 0.3s; }
        .action-tile:hover { border-color: var(--neon); transform: translateY(-5px); }
        .action-tile span { font-weight: 800; font-size: 0.9rem; }

        /* MOBILE BAR */
        .mobile-tab-bar { position: fixed; bottom: 0; left: 0; width: 100%; height: 75px; background: rgba(5,5,5,0.95); backdrop-filter: blur(20px); border-top: 1px solid var(--border); display: flex; justify-content: space-around; align-items: center; padding-bottom: 15px; z-index: 100; }
        @media (min-width: 1024px) { .mobile-tab-bar { display: none; } }
        .tab-item { display: flex; flex-direction: column; align-items: center; gap: 5px; color: #444; cursor: pointer; transition: 0.3s; }
        .tab-item.active { color: var(--neon); }
        .tab-item span { font-size: 10px; font-weight: 700; }

        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @media (max-width: 768px) { .value { font-size: 3rem; } .panel-content { padding: 20px; } }
      `}</style>
    </div>
  );
}