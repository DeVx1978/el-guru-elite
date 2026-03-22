"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js'; 
import { 
  User, Wallet, TrendingUp, ShieldCheck, LogOut, 
  Bell, ArrowUpRight, Activity, ShieldAlert, Target, Trophy, ArrowRightCircle
} from 'lucide-react';

const clientSupabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function SocioPanel() {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // El logo empieza activo
  const [nombre, setNombre] = useState("Socio");
  const [esAdmin, setEsAdmin] = useState(false);
  const [pendientes, setPendientes] = useState(0);

  useEffect(() => {
    // 1. Efecto de carga del Logo Élite (4 segundos obligatorios para impacto visual)
    const timer = setTimeout(() => setLoading(false), 4000);

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

  // --- CAPA DE CARGA: EL LOGO DEL GURÚ ---
  if (loading) {
    return (
      <div style={{ backgroundColor: '#020406', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '20px' }}>
        <div className="guru-loader">
          <div className="inner-circle">
            <span style={{ color: '#00C853', fontWeight: 900, fontSize: '1.5rem' }}>G</span>
          </div>
        </div>
        <p style={{ color: '#00C853', letterSpacing: '3px', fontSize: '0.8rem', fontWeight: 'bold' }} className="pulse">ACCESO ÉLITE</p>
        <style jsx>{`
          .guru-loader { width: 100px; height: 100px; border-radius: 50%; border: 2px solid #111; display: flex; justify-content: center; align-items: center; position: relative; }
          .guru-loader::after { content: ''; position: absolute; width: 100%; height: 100%; border-radius: 50%; border: 2px solid #00C853; animation: ripple 2s infinite; }
          .inner-circle { width: 60px; height: 60px; border-radius: 50%; background: #050505; border: 1px solid #00C853; display: flex; justify-content: center; align-items: center; box-shadow: 0 0 20px rgba(0, 200, 83, 0.2); }
          @keyframes ripple { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(1.5); opacity: 0; } }
          .pulse { animation: pulse-text 2s infinite; }
          @keyframes pulse-text { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#020406', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      
      {/* BARRA SUPERIOR */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 40px', borderBottom: '1px solid #111', background: '#050505', alignItems: 'center' }}>
        <div style={{ color: '#00C853', fontWeight: 900, fontSize: '1.2rem', letterSpacing: '1px' }}>
          GURÚ <span style={{color: '#fff'}}>ÉLITE</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ position: 'relative', cursor: esAdmin ? 'pointer' : 'default' }} onClick={() => esAdmin && router.push('/admin')}>
            <Bell size={20} color={esAdmin && pendientes > 0 ? "#00C853" : "#333"} />
            {esAdmin && pendientes > 0 && <span className="bell-badge">{pendientes}</span>}
          </div>
          <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: '#ff4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: 'bold' }}>
            <LogOut size={16} /> SALIR
          </button>
        </div>
      </nav>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        
        {esAdmin && (
          <div className="fade-in" style={{ marginBottom: '30px' }}>
            <button 
              onClick={() => router.push('/admin')}
              style={{ width: '100%', padding: '20px', background: 'linear-gradient(90deg, #00C853 0%, #007a33 100%)', color: 'white', borderRadius: '20px', border: 'none', fontWeight: 900, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', boxShadow: '0 10px 20px rgba(0,200,83,0.2)' }}
            >
              <ShieldAlert size={24} /> ENTRAR AL CENTRO DE MANDO (ADMINISTRADOR)
            </button>
          </div>
        )}

        <header style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '10px' }}>
            Bienvenido, <span style={{ color: '#00C853' }}>{nombre}</span>
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#555' }}>
            <ShieldCheck size={18} color="#00C853" />
            <span style={{ fontSize: '0.9rem', fontWeight: 'bold', letterSpacing: '1px' }}>CUENTA VERIFICADA POR AUDITORÍA</span>
          </div>
        </header>

        {/* MONITOR DE CRECIMIENTO */}
        <div style={{ background: 'linear-gradient(145deg, #0a0c10 0%, #050505 100%)', border: '1px solid #111', padding: '40px', borderRadius: '35px', marginBottom: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', position: 'relative', overflow: 'hidden' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', position: 'relative', zIndex: 1 }}>
              <div>
                <p style={{ color: '#555', fontSize: '0.8rem', fontWeight: 900, letterSpacing: '2px', marginBottom: '15px' }}>ESTADO ACTUAL DE RENDIMIENTO</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '15px' }}>
                  <h2 style={{ fontSize: '3.5rem', fontWeight: 900, margin: 0 }}>$0.00</h2>
                  <span style={{ color: '#00C853', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '1.2rem' }}>
                    <ArrowUpRight size={20} /> +0.00%
                  </span>
                </div>
              </div>
           </div>
        </div>

        {/* --- BANNER DE IMPACTO MUNDIAL 2026 --- */}
        <div 
          onClick={() => router.push('/panel/objetivos')}
          className="investor-banner"
          style={{ background: 'linear-gradient(90deg, rgba(0,200,83,0.15) 0%, rgba(10,12,16,1) 100%)', border: '1px solid #00C853', padding: '25px', borderRadius: '25px', marginBottom: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ background: '#00C853', padding: '12px', borderRadius: '15px', color: 'black' }}>
              <Trophy size={28} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#00C853', fontWeight: 900 }}>PROYECCIÓN MUNDIAL 2026</h3>
              <p style={{ margin: '5px 0 0', fontSize: '0.9rem', color: '#888' }}>Hoja de ruta exclusiva: Champions League, Libertadores y expansión Global.</p>
            </div>
          </div>
          <ArrowRightCircle size={32} color="#00C853" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <div className="action-card" onClick={() => router.push('/panel/objetivos')}>
            <div className="icon-box" style={{ background: 'rgba(0, 200, 83, 0.1)', color: '#00C853' }}><Target /></div>
            <div>
              <h4 style={{ margin: 0 }}>Ruta de Expansión</h4>
              <p style={{ margin: '5px 0 0', fontSize: '0.8rem', color: '#555' }}>Objetivos y Torneos Élite</p>
            </div>
          </div>
          <div className="action-card">
            <div className="icon-box" style={{ background: 'rgba(0, 200, 83, 0.1)', color: '#00C853' }}><TrendingUp /></div>
            <div>
              <h4 style={{ margin: 0 }}>Señales en Vivo</h4>
              <p style={{ margin: '5px 0 0', fontSize: '0.8rem', color: '#555' }}>Acceso a operativa diaria</p>
            </div>
          </div>
          <div className="action-card">
            <div className="icon-box" style={{ background: 'rgba(129, 212, 250, 0.1)', color: '#81D4FA' }}><Wallet /></div>
            <div>
              <h4 style={{ margin: 0 }}>Gestionar Retiros</h4>
              <p style={{ margin: '5px 0 0', fontSize: '0.8rem', color: '#555' }}>Solicitudes de capital</p>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .action-card { background: #0a0c10; border: 1px solid #111; padding: 25px; border-radius: 25px; display: flex; align-items: center; gap: 20px; transition: 0.3s ease; cursor: pointer; }
        .action-card:hover { border-color: #00C853; background: #0d1015; transform: translateY(-5px); }
        .investor-banner { transition: 0.4s; }
        .investor-banner:hover { transform: scale(1.01); border-color: #fff; box-shadow: 0 0 30px rgba(0,200,83,0.2); }
        .bell-badge { position: absolute; top: -8px; right: -8px; background: #ff4444; color: white; border-radius: 50%; width: 16px; height: 16px; font-size: 9px; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 2px solid #050505; }
        .pulse { animation: pulse-animation 2s infinite; }
        @keyframes pulse-animation { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
        .fade-in { animation: fadeIn 0.8s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}