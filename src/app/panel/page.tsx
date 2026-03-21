"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, Wallet, TrendingUp, ShieldCheck, LogOut, 
  Zap, Award, Star, Target, Briefcase, Bell, LayoutDashboard
} from 'lucide-react';

export default function SocioPanel() {
  const router = useRouter();
  const [nombre, setNombre] = useState("Socio");
  const [plan, setPlan] = useState("Cargando...");

  // --- CONFIGURACIÓN DE PLANES (COLORES Y NOMBRES) ---
  const configPlanes: any = {
    micro: { nombre: 'MICRO SOCIO', color: '#E0E0E0', icon: Target },
    inicial: { nombre: 'SOCIO INICIAL', color: '#81D4FA', icon: Briefcase },
    activo: { nombre: 'SOCIO ACTIVO', color: '#FFD54F', icon: Zap },
    premium: { nombre: 'SOCIO PREMIUM', color: '#FF8A65', icon: Award },
    elite: { nombre: 'SOCIO ÉLITE', color: '#00C853', icon: Star },
  };

  useEffect(() => {
    // 1. Recuperamos los datos que guardamos en el Login Maestro
    const socioNombre = localStorage.getItem('socio_nombre');
    const socioId = localStorage.getItem('socio_id');

    if (!socioId) {
      router.push('/login'); // Si no hay sesión, expulsar
    } else {
      setNombre(socioNombre || "Socio");
      // Aquí podrías hacer un fetch rápido a Supabase si quieres el plan exacto en tiempo real
      // Por ahora simulamos que ya lo tenemos o lo pedimos
    }
  }, []);

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
          <Bell size={20} color="#333" />
          <button onClick={handleLogout} style={{ background: 'transparent', border: 'none', color: '#ff4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: 'bold' }}>
            <LogOut size={16} /> SALIR
          </button>
        </div>
      </nav>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        
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

        {/* TARJETAS DE ESTADO RAPIDO */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          
          {/* TARJETA DE PLAN ACTUAL */}
          <div style={{ background: '#0a0c10', border: '1px solid #111', padding: '30px', borderRadius: '25px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ color: '#555', fontSize: '0.8rem', fontWeight: 900, marginBottom: '15px', letterSpacing: '2px' }}>MEMBRESÍA ACTIVA</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ background: 'rgba(129, 212, 250, 0.1)', padding: '15px', borderRadius: '15px' }}>
                <Briefcase size={30} color="#81D4FA" />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 900, color: '#81D4FA' }}>SOCIO INICIAL</h2>
                <p style={{ margin: 0, color: '#00C853', fontSize: '0.8rem', fontWeight: 'bold' }}>Participación: 0.167%</p>
              </div>
            </div>
          </div>

          {/* TARJETA DE BALANCE (SIMULADO POR AHORA) */}
          <div style={{ background: '#0a0c10', border: '1px solid #111', padding: '30px', borderRadius: '25px' }}>
            <div style={{ color: '#555', fontSize: '0.8rem', fontWeight: 900, marginBottom: '15px', letterSpacing: '2px' }}>UTILIDADES ACUMULADAS</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ background: 'rgba(0, 200, 83, 0.1)', padding: '15px', borderRadius: '15px' }}>
                <TrendingUp size={30} color="#00C853" />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: '2rem', fontWeight: 900 }}>$0.00 <span style={{fontSize: '0.8rem', color: '#444'}}>USD</span></h2>
                <p style={{ margin: 0, color: '#555', fontSize: '0.8rem' }}>Próximo corte: 30 de Marzo</p>
              </div>
            </div>
          </div>

        </div>

        {/* SECCIÓN DE HERRAMIENTAS ÉLITE */}
        <h3 style={{ marginBottom: '20px', fontWeight: 900, fontSize: '1.2rem' }}>HERRAMIENTAS DISPONIBLES</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div className="tool-card"> <LayoutDashboard size={20} /> Señales en Vivo</div>
          <div className="tool-card"> <Wallet size={20} /> Gestionar Retiros</div>
          <div className="tool-card"> <User size={20} /> Datos Personales</div>
        </div>

      </main>

      <style jsx>{`
        .tool-card {
          background: #080808;
          border: 1px solid #111;
          padding: 25px;
          border-radius: 15px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          font-weight: bold;
          font-size: 0.9rem;
          color: #444;
          transition: 0.3s;
          cursor: pointer;
        }
        .tool-card:hover {
          border-color: #00C853;
          color: #fff;
          background: #0a0c10;
        }
      `}</style>
    </div>
  );
}