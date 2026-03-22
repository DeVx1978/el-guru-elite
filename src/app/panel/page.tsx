"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import {
  User, Wallet, TrendingUp, ShieldCheck, LogOut,
  Zap, Award, Star, Target, Briefcase, Bell, LayoutDashboard,
  ArrowUpRight, Activity, ShieldAlert, Trophy, ArrowRightCircle
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
      <div className="loader-master">
        <div className="guru-loader">
          <div className="inner-circle">
            <span className="logo-text">G</span>
          </div>
        </div>
        <p className="pulse elite-text">ACCESO ÉLITE</p>
        <style jsx>{`
          .loader-master { background-color: #020406; height: 100vh; display: flex; justifyContent: center; alignItems: center; flexDirection: column; gap: 20px; position: fixed; top: 0; left: 0; width: 100%; zIndex: 9999; }
          .guru-loader { width: 120px; height: 120px; border-radius: 50%; border: 2px solid #111; display: flex; justify-content: center; align-items: center; position: relative; }
          .guru-loader::after { content: ''; position: absolute; width: 100%; height: 100%; border-radius: 50%; border: 2px solid #00C853; animation: ripple 2s infinite; }
          .inner-circle { width: 80px; height: 80px; border-radius: 50%; background: #050505; border: 3px solid #00C853; display: flex; justify-content: center; align-items: center; box-shadow: 0 0 30px rgba(0, 200, 83, 0.4); }
          .logo-text { color: #00C853; fontWeight: 900; fontSize: 2.5rem; }
          .elite-text { color: #00C853; letterSpacing: 4px; fontSize: 0.9rem; fontWeight: 900; }
          @keyframes ripple { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(1.6); opacity: 0; } }
          .pulse { animation: pulse-text 2s infinite; }
          @keyframes pulse-text { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
        `}</style>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <nav className="nav-elite">
        <div className="nav-brand">
          GURÚ <span className="text-white">ÉLITE</span>
        </div>
        <div className="nav-actions">
          <div className={`notification-box ${esAdmin ? 'pointer' : ''}`} onClick={() => esAdmin && router.push('/admin')}>
            <Bell size={20} color={esAdmin && pendientes > 0 ? "#00C853" : "#333"} />
            {esAdmin && pendientes > 0 && (
              <span className="badge-count">{pendientes}</span>
            )}
          </div>
          <button onClick={handleLogout} className="btn-logout">
            <LogOut size={16} /> SALIR
          </button>
        </div>
      </nav>

      <main className="panel-main">
        {esAdmin && (
          <div className="fade-in admin-section">
            <button onClick={() => router.push('/admin')} className="btn-admin-command">
              <ShieldAlert size={24} /> ENTRAR AL CENTRO DE MANDO (ADMINISTRADOR)
            </button>
          </div>
        )}

        <header className="panel-header">
          <h1 className="welcome-text">
            Bienvenido, <span className="text-neon">{nombre}</span>
          </h1>
          <div className="verify-container">
            <ShieldCheck size={18} color="#00C853" />
            <span className="verify-text">CUENTA VERIFICADA POR AUDITORÍA</span>
          </div>
        </header>

        {/* MONITOR DE CRECIMIENTO REDISEÑADO */}
        <div className="vault-card">
          <div className="vault-flex">
            <div className="vault-info">
              <p className="label-small">ESTADO ACTUAL DE RENDIMIENTO</p>
              <div className="amount-container">
                <h2 className="amount-text">$0.00</h2>
                <span className="percentage-up">
                  <ArrowUpRight size={20} /> +0.00%
                </span>
              </div>
            </div>
            <div className="rank-container">
              <div className="rank-card">
                <p className="label-rank">NIVEL DE SOCIO</p>
                <p className="rank-name">PLAN ÉLITE ACTIVO</p>
              </div>
            </div>
          </div>
          <div className="progress-section">
            <div className="progress-labels">
              <span>PROGRESO DE CARTERA</span>
              <span className="text-neon">EN ESPERA DE MERCADO</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill"></div>
            </div>
            <p className="ai-status">
              <Activity size={12} className="pulse" /> SISTEMA DE ALGORITMOS CALCULANDO UTILIDADES EN TIEMPO REAL...
            </p>
          </div>
        </div>

        {/* BANNER DE IMPACTO MUNDIAL 2026 */}
        <div onClick={() => router.push('/panel/objetivos')} className="banner-world-cup">
          <div className="banner-content">
            <div className="icon-badge"><Trophy size={28} /></div>
            <div className="banner-text-box">
              <h3 className="banner-title">PROYECCIÓN MUNDIAL 2026</h3>
              <p className="banner-desc">Hoja de ruta exclusiva: Champions League, Libertadores y expansión Global.</p>
            </div>
          </div>
          <ArrowRightCircle size={32} color="#00C853" />
        </div>

        {/* GRILLA DE ACCIONES */}
        <div className="actions-grid">
          <div onClick={() => router.push('/panel/objetivos')} className="action-card">
            <div className="icon-neon"><Target /></div>
            <div className="card-info">
              <h4>Ruta de Expansión</h4>
              <p>Objetivos Élite</p>
            </div>
          </div>
          <div className="action-card">
            <div className="icon-neon"><TrendingUp /></div>
            <div className="card-info">
              <h4>Señales en Vivo</h4>
              <p>Operativa diaria</p>
            </div>
          </div>
          <div className="action-card">
            <div className="icon-blue"><Wallet size={24} /></div>
            <div className="card-info">
              <h4>Gestionar Retiros</h4>
              <p>Solicitudes de capital</p>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .dashboard-container { background-color: #020406; min-height: 100vh; color: white; font-family: 'Inter', sans-serif; }
        
        .nav-elite { display: flex; justifyContent: space-between; padding: 20px 40px; border-bottom: 1px solid #111; background: #050505; alignItems: center; }
        .nav-brand { color: #00C853; fontWeight: 900; fontSize: 1.2rem; letterSpacing: 1px; }
        .text-white { color: #fff; }
        .nav-actions { display: flex; alignItems: center; gap: 20px; }
        .badge-count { position: absolute; top: -5; right: -5; background: red; borderRadius: 50%; width: 14, height: 14, fontSize: 9, display: flex; justifyContent: center; alignItems: center; }
        .btn-logout { background: transparent; border: none; color: #ff4444; cursor: pointer; display: flex; alignItems: center; gap: 8px; fontSize: '0.8rem'; fontWeight: 'bold'; }
        
        .panel-main { maxWidth: 1200px; margin: 0 auto; padding: 40px 20px; }
        .btn-admin-command { width: 100%; padding: 20px; background: linear-gradient(90deg, #00C853 0%, #007a33 100%); color: white; borderRadius: 20px; border: none; fontWeight: 900; fontSize: 1rem; cursor: pointer; display: flex; alignItems: center; justifyContent: center; gap: 15px; boxShadow: 0 10px 20px rgba(0,200,83,0.2); }
        
        .welcome-text { fontSize: 2.5rem; fontWeight: 900; marginBottom: 10px; }
        .text-neon { color: #00C853; }
        .verify-container { display: flex; alignItems: center; gap: 10px; color: #555; }
        .verify-text { fontSize: 0.9rem; fontWeight: bold; letterSpacing: 1px; }

        /* MONITOR DE CRECIMIENTO - THE VAULT */
        .vault-card { 
          background: linear-gradient(145deg, #0a0c10 0%, #050505 100%); 
          border: 1px solid #111; 
          padding: 40px; 
          borderRadius: 35px; 
          marginBottom: 30px; 
          boxShadow: 0 10px 30px rgba(0,0,0,0.5); 
          position: relative; 
          overflow: hidden; 
        }
        .vault-flex { display: flex; justifyContent: space-between; alignItems: flex-start; flexWrap: wrap; gap: 20px; position: relative; zIndex: 1; }
        .label-small { color: #555; fontSize: 0.8rem; fontWeight: 900; letterSpacing: 2px; marginBottom: 15px; }
        .amount-container { display: flex; alignItems: baseline; gap: 15px; }
        .amount-text { fontSize: 4rem; fontWeight: 900; margin: 0; letterSpacing: -3px; }
        .percentage-up { color: #00C853; fontWeight: bold; display: flex; alignItems: center; gap: 5px; fontSize: 1.2rem; }
        
        .rank-card { background: rgba(0, 200, 83, 0.05); padding: 15px 25px; borderRadius: 20px; border: 1px solid rgba(0, 200, 83, 0.1); }
        .label-rank { color: #00C853; fontSize: 0.7rem; fontWeight: 900; margin: 0; letterSpacing: 1px; }
        .rank-name { color: #fff; fontWeight: 900; margin: 0; fontSize: 1.1rem; }

        .progress-section { marginTop: 40px; }
        .progress-labels { display: flex; justifyContent: space-between; marginBottom: 12px; fontSize: 0.8rem; fontWeight: bold; color: #444; }
        .progress-track { width: 100%; height: 12px; background: #111; borderRadius: 20px; overflow: hidden; border: 1px solid #1a1a1a; }
        .progress-fill { width: 45%; height: 100%; background: #00C853; borderRadius: 20px; boxShadow: 0 0 15px #00C853; animation: grow 3s ease-out forwards; }
        .ai-status { color: #333; fontSize: 0.7rem; marginTop: 15px; display: flex; alignItems: center; gap: 8px; font-weight: 800; }

        /* BANNER MUNDIAL */
        .banner-world-cup { 
          background: linear-gradient(90deg, rgba(0,200,83,0.15) 0%, rgba(10,12,16,1) 100%); 
          border: 1px solid #00C853; 
          padding: 25px; 
          borderRadius: 25px; 
          marginBottom: 40px; 
          cursor: pointer; 
          display: flex; 
          alignItems: center; 
          justifyContent: space-between;
          transition: 0.3s;
        }
        .banner-world-cup:hover { transform: scale(1.01); background: linear-gradient(90deg, rgba(0,200,83,0.2) 0%, rgba(10,12,16,1) 100%); }
        .banner-content { display: flex; alignItems: center; gap: 20px; }
        .icon-badge { background: #00C853; padding: 12px; borderRadius: 15px; color: black; }
        .banner-title { margin: 0; fontSize: 1.2rem; color: #00C853; fontWeight: 900; }
        .banner-desc { margin: 5px 0 0; fontSize: 0.9rem; color: #888; }

        /* ACCIONES GRILLA */
        .actions-grid { display: grid; gridTemplateColumns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; }
        .action-card { 
          background: #0a0c10; 
          padding: 30px; 
          borderRadius: 25px; 
          border: 1px solid #111; 
          display: flex; 
          alignItems: center; 
          gap: 20px; 
          cursor: pointer;
          transition: 0.3s;
        }
        .action-card:hover { border-color: #00C853; background: #0e1117; transform: translateY(-5px); }
        .icon-neon { color: #00C853; }
        .icon-blue { color: #81D4FA; }
        .card-info h4 { margin: 0; fontSize: 1.1rem; }
        .card-info p { margin: 0; fontSize: 0.8rem; color: #555; fontWeight: 600; }

        @keyframes grow { from { width: 0%; } to { width: 45%; } }
        .pulse { animation: pulse-animation 2s infinite; }
        @keyframes pulse-animation { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
        .fade-in { animation: fadeIn 0.8s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 768px) {
          .amount-text { fontSize: 2.5rem; }
          .welcome-text { fontSize: 1.8rem; }
          .nav-elite { padding: 20px; }
        }
      `}</style>
    </div>
  );
}