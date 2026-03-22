"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js'; 
import {
  User, Wallet, TrendingUp, ShieldCheck, LogOut,
  Zap, Award, Star, Target, Briefcase, Bell, LayoutDashboard,
  ArrowUpRight, Activity, ShieldAlert, Trophy, ArrowRightCircle, CreditCard, PieChart, Landmark
} from 'lucide-react';

const clientSupabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function SocioPanel() {
  const router = useRouter();
  const [loading, setLoading] = useState(true); 
  const [nombre, setNombre] = useState("Socio");
  const [esAdmin, setEsAdmin] = useState(false);
  const [pendientes, setPendientes] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

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
    const { data } = await clientSupabase
      .from('socios')
      .select('id')
      .eq('estado', 'pendiente');
    setPendientes(data?.length || 0);
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="elite-loading-screen">
        <div className="guru-loader-master">
          <div className="orbit-ring"></div>
          <div className="inner-vault">
            <span className="logo-g">G</span>
          </div>
        </div>
        <p className="scanning-text">IDENTIFICANDO CREDENCIALES ÉLITE...</p>
        <style jsx>{`
          .elite-loading-screen { background: #000; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; position: fixed; width: 100%; z-index: 9999; }
          .guru-loader-master { width: 140px; height: 140px; position: relative; display: flex; justify-content: center; align-items: center; }
          .orbit-ring { position: absolute; width: 100%; height: 100%; border: 2px solid rgba(0, 200, 83, 0.1); border-top: 2px solid #00C853; border-radius: 50%; animation: spin 1s linear infinite; }
          .inner-vault { width: 90px; height: 90px; border-radius: 50%; background: radial-gradient(circle, #0a0c10 0%, #000 100%); border: 1px solid #00C853; display: flex; justify-content: center; align-items: center; box-shadow: 0 0 40px rgba(0, 200, 83, 0.3); }
          .logo-g { color: #00C853; font-weight: 900; fontSize: 3rem; text-shadow: 0 0 20px #00C853; }
          .scanning-text { color: #00C853; letter-spacing: 5px; font-size: 0.75rem; font-weight: 900; margin-top: 30px; animation: pulse 2s infinite; }
          @keyframes spin { 100% { transform: rotate(360deg); } }
          @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        `}</style>
      </div>
    );
  }

  return (
    <div className="panel-container">
      {/* NAVBAR INSTITUCIONAL */}
      <nav className="nav-elite">
        <div className="nav-content">
          <div className="brand-elite">
            <div className="brand-box">G</div>
            <div className="brand-text">EL GURÚ <span>ÉLITE</span></div>
          </div>
          <div className="nav-tools">
            <div className="notification-bell" onClick={() => esAdmin && router.push('/admin')}>
              <Bell size={20} color={esAdmin && pendientes > 0 ? "#00C853" : "#444"} />
              {esAdmin && pendientes > 0 && <span className="badge">{pendientes}</span>}
            </div>
            <button onClick={handleLogout} className="btn-logout">
              <LogOut size={16} /> <span>TERMINAR SESIÓN</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        {/* ACCESO ADMINISTRADOR */}
        {esAdmin && (
          <div className="admin-banner-container">
            <button onClick={() => router.push('/admin')} className="admin-banner">
              <ShieldAlert size={20} /> CENTRO DE CONTROL: MODO ADMINISTRADOR ACTIVO
            </button>
          </div>
        )}

        {/* HEADER DE BIENVENIDA */}
        <header className="user-welcome">
          <div className="welcome-text">
            <h1>Bienvenido, <span className="highlight">{nombre}</span></h1>
            <div className="verify-tag">
              <ShieldCheck size={16} color="#00C853" />
              <span>Socio Institucional Verificado</span>
            </div>
          </div>
          <div className="socio-rank-badge">
            <div className="rank-info">
              <p>RANGO ACTUAL</p>
              <h4>PLAN ÉLITE</h4>
            </div>
            <Trophy color="#00C853" size={24} />
          </div>
        </header>

        {/* BÓVEDA DE CAPITAL (CENTRAL) */}
        <div className="vault-master-card">
          <div className="vault-header">
            <div className="label">
              <Landmark size={14} color="#555" />
              CAPITAL BAJO GESTIÓN (AUM)
            </div>
            <div className="profit-tag">
              <TrendingUp size={14} /> +18.50% Profit Mensual
            </div>
          </div>
          
          <div className="vault-balance">
            <span className="currency">$</span>
            <span className="amount">0.00</span>
            <div className="live-indicator">
              <div className="dot"></div> LIVE
            </div>
          </div>

          <div className="vault-progress">
            <div className="progress-info">
              <span>ESTADO DEL FONDO</span>
              <span>CARGANDO BLOQUES DE IA...</span>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar-fill"></div>
            </div>
            <div className="algorithm-pulse">
              <Activity size={12} className="pulse-icon" />
              Procesando algoritmos de arbitraje en tiempo real
            </div>
          </div>
        </div>

        {/* GRILLA DE ACCIONES PROFESIONALES */}
        <div className="actions-grid">
          <div className="action-card" onClick={() => router.push('/panel/objetivos')}>
            <div className="action-icon" style={{ background: 'rgba(0, 200, 83, 0.1)' }}>
              <Target color="#00C853" />
            </div>
            <div className="action-info">
              <h4>Hoja de Ruta 2026</h4>
              <p>Expansión y Objetivos</p>
            </div>
            <ArrowUpRight className="arrow" size={18} />
          </div>

          <div className="action-card">
            <div className="action-icon" style={{ background: 'rgba(0, 229, 255, 0.1)' }}>
              <Zap color="#00E5FF" />
            </div>
            <div className="action-info">
              <h4>Señales Élite</h4>
              <p>Operativa Institucional</p>
            </div>
            <ArrowUpRight className="arrow" size={18} />
          </div>

          <div className="action-card">
            <div className="action-icon" style={{ background: 'rgba(255, 214, 0, 0.1)' }}>
              <Wallet color="#FFD600" />
            </div>
            <div className="action-info">
              <h4>Gestión de Retiros</h4>
              <p>Liquidez de Capital</p>
            </div>
            <ArrowUpRight className="arrow" size={18} />
          </div>
        </div>
      </main>

      <style jsx>{`
        .panel-container { background: #000; min-height: 100vh; color: white; font-family: 'Inter', sans-serif; padding-bottom: 100px; }
        
        /* NAVBAR */
        .nav-elite { background: rgba(5, 5, 5, 0.8); backdrop-filter: blur(15px); border-bottom: 1px solid #111; position: sticky; top: 0; z-index: 100; }
        .nav-content { max-width: 1200px; margin: 0 auto; padding: 15px 25px; display: flex; justify-content: space-between; align-items: center; }
        .brand-elite { display: flex; align-items: center; gap: 12px; }
        .brand-box { background: #00C853; color: black; font-weight: 900; padding: 4px 10px; border-radius: 6px; }
        .brand-text { font-weight: 900; font-size: 1rem; letter-spacing: 1px; }
        .brand-text span { color: #00C853; }
        
        .nav-tools { display: flex; align-items: center; gap: 20px; }
        .notification-bell { position: relative; cursor: pointer; }
        .badge { position: absolute; top: -6px; right: -6px; background: #ff4444; width: 15px; height: 15px; border-radius: 50%; font-size: 9px; display: flex; justify-content: center; align-items: center; }
        .btn-logout { background: rgba(255, 68, 68, 0.1); border: 1px solid rgba(255, 68, 68, 0.2); color: #ff4444; padding: 8px 15px; border-radius: 6px; font-size: 0.7rem; font-weight: 900; cursor: pointer; display: flex; align-items: center; gap: 8px; }

        .main-content { max-width: 1100px; margin: 0 auto; padding: 30px 20px; }

        /* BANNERS */
        .admin-banner-container { margin-bottom: 25px; animation: slideDown 0.5s ease; }
        .admin-banner { width: 100%; padding: 15px; background: linear-gradient(90deg, #00C853 0%, #007a33 100%); color: white; border-radius: 12px; border: none; font-weight: 900; font-size: 0.8rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; box-shadow: 0 10px 20px rgba(0, 200, 83, 0.2); }

        /* WELCOME */
        .user-welcome { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; flex-wrap: wrap; gap: 20px; }
        .welcome-text h1 { font-size: 2.2rem; font-weight: 900; margin-bottom: 5px; }
        .highlight { color: #00C853; }
        .verify-tag { display: flex; align-items: center; gap: 8px; color: #444; font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
        
        .socio-rank-badge { background: #0a0c10; border: 1px solid #1a1a1a; padding: 12px 25px; border-radius: 20px; display: flex; align-items: center; gap: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
        .rank-info p { font-size: 10px; color: #444; font-weight: 900; margin: 0; }
        .rank-info h4 { font-size: 1.1rem; color: #fff; font-weight: 900; margin: 0; }

        /* VAULT CARD */
        .vault-master-card { background: linear-gradient(145deg, #0a0c10 0%, #030303 100%); border: 1px solid #151515; border-radius: 35px; padding: 45px; margin-bottom: 40px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7); position: relative; overflow: hidden; }
        .vault-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
        .label { display: flex; align-items: center; gap: 10px; color: #555; font-size: 0.75rem; font-weight: 900; letter-spacing: 2px; }
        .profit-tag { background: rgba(0, 200, 83, 0.1); color: #00C853; padding: 8px 15px; border-radius: 12px; font-size: 0.8rem; font-weight: 900; display: flex; align-items: center; gap: 8px; }
        
        .vault-balance { display: flex; align-items: center; gap: 10px; margin-bottom: 40px; position: relative; }
        .currency { font-size: 2.5rem; font-weight: 900; color: #1a1a1a; }
        .amount { font-size: 4.5rem; font-weight: 900; letter-spacing: -3px; }
        .live-indicator { background: rgba(255, 68, 68, 0.1); color: #ff4444; font-size: 10px; font-weight: 900; padding: 5px 12px; border-radius: 20px; display: flex; align-items: center; gap: 6px; align-self: flex-start; margin-top: 15px; }
        .dot { width: 6px; height: 6px; background: #ff4444; border-radius: 50%; animation: blink 1s infinite; }

        .progress-info { display: flex; justify-content: space-between; font-size: 10px; font-weight: 900; color: #444; margin-bottom: 12px; letter-spacing: 1px; }
        .progress-bar-container { width: 100%; height: 8px; background: #000; border: 1px solid #1a1a1a; border-radius: 10px; overflow: hidden; margin-bottom: 20px; }
        .progress-bar-fill { width: 65%; height: 100%; background: #00C853; box-shadow: 0 0 15px #00C853; border-radius: 10px; animation: grow 3s ease; }
        .algorithm-pulse { display: flex; align-items: center; gap: 10px; color: #222; font-size: 10px; font-weight: 900; text-transform: uppercase; }
        .pulse-icon { animation: pulse 1.5s infinite; }

        /* GRID CARDS */
        .actions-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .action-card { background: #080808; border: 1px solid #111; padding: 25px; border-radius: 25px; display: flex; align-items: center; gap: 20px; cursor: pointer; transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1); position: relative; }
        .action-card:hover { background: #0c0c0c; border-color: #333; transform: translateY(-5px); }
        .action-icon { width: 55px; height: 55px; border-radius: 18px; display: flex; justify-content: center; align-items: center; }
        .action-info h4 { font-size: 1.1rem; font-weight: 900; margin: 0 0 5px; }
        .action-info p { font-size: 0.8rem; color: #444; font-weight: 700; margin: 0; }
        .arrow { margin-left: auto; color: #222; transition: 0.3s; }
        .action-card:hover .arrow { color: #fff; transform: translateX(5px); }

        /* ANIMATIONS */
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.2); opacity: 0.3; } }
        @keyframes grow { from { width: 0%; } to { width: 65%; } }
        @keyframes slideDown { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

        @media (max-width: 768px) {
          .amount { font-size: 3rem; }
          .vault-master-card { padding: 30px 20px; }
          .user-welcome h1 { font-size: 1.8rem; }
        }
      `}</style>
    </div>
  );
}