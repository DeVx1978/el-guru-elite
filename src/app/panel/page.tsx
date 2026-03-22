"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js'; // Importamos para el conteo real
import { 
  User, Wallet, TrendingUp, ShieldCheck, LogOut, 
  Zap, Award, Star, Target, Briefcase, Bell, LayoutDashboard,
  ArrowUpRight, Activity, ShieldAlert
} from 'lucide-react';

const clientSupabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function SocioPanel() {
  const router = useRouter();
  const [nombre, setNombre] = useState("Socio");
  const [esAdmin, setEsAdmin] = useState(false);
  const [pendientes, setPendientes] = useState(0);

  useEffect(() => {
    const socioNombre = localStorage.getItem('socio_nombre');
    const socioId = localStorage.getItem('socio_id');
    const socioRol = localStorage.getItem('socio_rol'); // Asumimos que guardas el rol al loguear

    if (!socioId) {
      router.push('/login');
    } else {
      setNombre(socioNombre || "Socio");
      // Si el rol en la base de datos es admin, activamos el poder
      if (socioRol === 'admin') {
        setEsAdmin(true);
        obtenerPendientes();
      }
    }
  }, []);

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

  return (
    <div style={{ backgroundColor: '#020406', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      
      {/* BARRA SUPERIOR ELEGANTE */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 40px', borderBottom: '1px solid #111', background: '#050505', alignItems: 'center' }}>
        <div style={{ color: '#00C853', fontWeight: 900, fontSize: '1.2rem', letterSpacing: '1px' }}>
          GURÚ <span style={{color: '#fff'}}>ÉLITE</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          
          {/* CAMPANA INTELIGENTE: Solo brilla si es Admin y hay pendientes */}
          <div style={{ position: 'relative', cursor: esAdmin ? 'pointer' : 'default' }} onClick={() => esAdmin && router.push('/admin')}>
            <Bell size={20} color={esAdmin && pendientes > 0 ? "#00C853" : "#333"} />
            {esAdmin && pendientes > 0 && (
              <span className="bell-badge">{pendientes}</span>
            )}
          </div>

          <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: '#ff4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: 'bold' }}>
            <LogOut size={16} /> SALIR
          </button>
        </div>
      </nav>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* BOTÓN DE ACCESO MAESTRO (SOLO PARA MARÍA JOSÉ / ADMINS) */}
        {esAdmin && (
          <div className="fade-in" style={{ marginBottom: '30px' }}>
            <button 
              onClick={() => router.push('/admin')}
              style={{ 
                width: '100%', 
                padding: '20px', 
                background: 'linear-gradient(90deg, #00C853 0%, #007a33 100%)', 
                color: 'white', 
                borderRadius: '20px', 
                border: 'none', 
                fontWeight: 900, 
                fontSize: '1rem', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '15px',
                boxShadow: '0 10px 20px rgba(0,200,83,0.2)'
              }}
            >
              <ShieldAlert size={24} /> ENTRAR AL CENTRO DE MANDO (ADMINISTRADOR)
            </button>
          </div>
        )}

        {/* BIENVENIDA PERSONALIZADA */}
        <header style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '10px' }}>
            Bienvenido, <span style={{ color: '#00C853' }}>{nombre}</span>
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#555' }}>
            <ShieldCheck size={18} color="#00C853" />
            <span style={{ fontSize: '0.9rem', fontWeight: 'bold', letterSpacing: '1px' }}>CUENTA VERIFICADA POR AUDITORÍA</span>
          </div>
        </header>

        {/* --- MONITOR DE CRECIMIENTO ÉLITE --- */}
        <div style={{ 
          background: 'linear-gradient(145deg, #0a0c10 0%, #050505 100%)', 
          border: '1px solid #111', 
          padding: '40px', 
          borderRadius: '35px', 
          marginBottom: '40px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          position: 'relative',
          overflow: 'hidden'
        }}>
           <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'rgba(0, 200, 83, 0.05)', filter: 'blur(50px)', borderRadius: '50%' }}></div>

           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', position: 'relative', zIndex: 1 }}>
              <div>
                <p style={{ color: '#555', fontSize: '0.8rem', fontWeight: 900, letterSpacing: '2px', marginBottom: '15px' }}>ESTADO ACTUAL DE RENDIMIENTO</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '15px' }}>
                  <h2 style={{ fontSize: '3.5rem', fontWeight: 900, margin: 0, letterSpacing: '-2px' }}>$0.00</h2>
                  <span style={{ color: '#00C853', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '1.2rem' }}>
                    <ArrowUpRight size={20} /> +0.00%
                  </span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ background: 'rgba(129, 212, 250, 0.1)', padding: '10px 20px', borderRadius: '15px', border: '1px solid rgba(129, 212, 250, 0.2)', display: 'inline-block' }}>
                  <p style={{ color: '#81D4FA', fontSize: '0.7rem', fontWeight: 900, margin: 0, letterSpacing: '1px' }}>NIVEL DE SOCIO</p>
                  <p style={{ color: '#fff', fontWeight: 900, margin: 0, fontSize: '1.1rem' }}>PLAN INICIAL</p>
                </div>
              </div>
           </div>

           <div style={{ marginTop: '40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.8rem', fontWeight: 'bold', color: '#444' }}>
                <span>PROGRESO DE CARTERA</span>
                <span style={{ color: '#00C853' }}>EN ESPERA DE MERCADO</span>
              </div>
              <div style={{ width: '100%', height: '12px', background: '#111', borderRadius: '20px', overflow: 'hidden', border: '1px solid #1a1a1a' }}>
                <div className="progress-bar-glow" style={{ width: '5%', height: '100%', background: '#00C853', borderRadius: '20px' }}></div>
              </div>
              <p style={{ color: '#333', fontSize: '0.7rem', marginTop: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={12} className="pulse" /> SISTEMA DE ALGORITMOS CALCULANDO UTILIDADES EN TIEMPO REAL...
              </p>
           </div>
        </div>

        {/* TARJETAS DE ACCIÓN RÁPIDA */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
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

          <div className="action-card">
            <div className="icon-box" style={{ background: 'rgba(255, 213, 79, 0.1)', color: '#FFD54F' }}><User /></div>
            <div>
              <h4 style={{ margin: 0 }}>Perfil Élite</h4>
              <p style={{ margin: '5px 0 0', fontSize: '0.8rem', color: '#555' }}>Ajustes de cuenta</p>
            </div>
          </div>
        </div>

      </main>

      <style jsx>{`
        .action-card {
          background: #0a0c10;
          border: 1px solid #111;
          padding: 25px;
          border-radius: 25px;
          display: flex;
          align-items: center;
          gap: 20px;
          transition: 0.3s ease;
          cursor: pointer;
        }
        .action-card:hover {
          border-color: #00C853;
          background: #0d1015;
          transform: translateY(-5px);
        }
        .bell-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #ff4444;
          color: white;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          font-size: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          border: 2px solid #050505;
        }
        .progress-bar-glow {
          box-shadow: 0 0 15px #00C853;
          animation: loading 2s infinite ease-in-out;
        }
        .pulse {
          animation: pulse-animation 2s infinite;
        }
        @keyframes pulse-animation {
          0% { opacity: 1; }
          50% { opacity: 0.3; }
          100% { opacity: 1; }
        }
        @keyframes loading {
          0% { filter: brightness(1); }
          50% { filter: brightness(1.5); }
          100% { filter: brightness(1); }
        }
        .fade-in { animation: fadeIn 0.8s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}