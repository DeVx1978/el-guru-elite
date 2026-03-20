"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, FileText, LogOut, User, 
  TrendingUp, ShieldCheck, Zap, Bell, Menu, X 
} from 'lucide-react';

export default function PanelSocioElite() {
  const [nombre, setNombre] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Para móviles
  const router = useRouter();

  useEffect(() => {
    const sesion = localStorage.getItem('socio_nombre');
    if (!sesion) {
      router.push('/login');
    } else {
      setNombre(sesion);
    }
  }, [router]);

  const cerrarSesion = () => {
    localStorage.removeItem('socio_nombre');
    router.push('/login');
  };

  return (
    <div style={{ backgroundColor: '#020406', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', display: 'flex', overflowX: 'hidden' }}>
      
      {/* SIDEBAR - Ahora se oculta en móvil si no se activa */}
      <aside style={{
        width: '260px',
        backgroundColor: '#0a0c10',
        borderRight: '1px solid #111',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh',
        zIndex: 100,
        transition: '0.3s ease',
        left: isMenuOpen ? '0' : '-260px', // Efecto deslizar en móvil
      }} id="sidebar-elite">
        <div style={{ padding: '30px', borderBottom: '1px solid #111' }}>
          <h1 style={{ color: '#00C853', margin: 0, fontSize: '1.5rem', fontWeight: 900 }}>EL GURÚ</h1>
          <span style={{ fontSize: '10px', color: '#555', letterSpacing: '2px' }}>SISTEMA ÉLITE</span>
        </div>

        <nav style={{ flex: 1, padding: '20px' }}>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ padding: '15px', color: '#00C853', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', background: 'rgba(0,200,83,0.05)', borderRadius: '12px', marginBottom: '10px' }}>
              <LayoutDashboard size={20} /> <span style={{fontWeight: 'bold'}}>MONITOR EN VIVO</span>
            </li>
            <li style={{ padding: '15px', color: '#444', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', transition: '0.3s' }}>
              <FileText size={20} /> <span>MIS REPORTES</span>
            </li>
            <li style={{ padding: '15px', color: '#444', display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }}>
              <Zap size={20} /> <span>OPERACIONES</span>
            </li>
          </ul>
        </nav>

        <button onClick={cerrarSesion} style={{ margin: '20px', padding: '15px', background: 'none', border: '1px solid #ff4444', color: '#ff4444', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontWeight: 'bold' }}>
          <LogOut size={18} /> CERRAR SESIÓN
        </button>
      </aside>

      {/* CONTENIDO PRINCIPAL - Ajuste dinámico de margen */}
      <main style={{ 
        flex: 1, 
        padding: '20px', 
        marginLeft: '0', // Por defecto en móvil
        transition: '0.3s ease'
      }} className="main-content">
        
        {/* HEADER MÓVIL (Solo visible en pantallas pequeñas) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            style={{ background: '#0a0c10', border: '1px solid #222', padding: '10px', borderRadius: '10px', color: '#00C853', cursor: 'pointer' }}
          >
             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Bell size={24} color="#222" />
        </div>

        {/* TARJETA DE BIENVENIDA PREMIUM */}
        <div style={{ background: 'linear-gradient(135deg, #0a0c10 0%, #020406 100%)', padding: '35px', borderRadius: '30px', border: '1px solid #111', position: 'relative', overflow: 'hidden', marginBottom: '30px' }}>
          <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.1 }}>
            <ShieldCheck size={150} color="#00C853" />
          </div>
          <p style={{ color: '#00C853', fontWeight: 'bold', fontSize: '12px', margin: 0, textTransform: 'uppercase', letterSpacing: '2px' }}>Status: Miembro Élite</p>
          <h2 style={{ fontSize: '2rem', margin: '10px 0', fontWeight: 900 }}>Bienvenido, <span style={{ color: '#00C853' }}>{nombre}</span></h2>
          <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
             <div style={{ textAlign: 'center' }}>
                <p style={{ color: '#555', margin: 0, fontSize: '10px' }}>SESIÓN ACTIVA</p>
                <b style={{ color: 'white' }}>LIVE</b>
             </div>
             <div style={{ textAlign: 'center' }}>
                <p style={{ color: '#555', margin: 0, fontSize: '10px' }}>ACCESO</p>
                <b style={{ color: '#00C853' }}>FULL</b>
             </div>
          </div>
        </div>

        {/* MONITOR DE MÉTRICAS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '20px' }}>
           <div style={{ background: '#0a0c10', padding: '25px', borderRadius: '25px', border: '1px solid #111' }}>
              <TrendingUp size={24} color="#00C853" style={{ marginBottom: '15px' }} />
              <p style={{ fontSize: '11px', color: '#555', margin: 0 }}>RENDIMIENTO</p>
              <h3 style={{ fontSize: '1.5rem', margin: '5px 0' }}>+12.5%</h3>
           </div>
           <div style={{ background: '#0a0c10', padding: '25px', borderRadius: '25px', border: '1px solid #111' }}>
              <Zap size={24} color="#00C853" style={{ marginBottom: '15px' }} />
              <p style={{ fontSize: '11px', color: '#555', margin: 0 }}>OPERACIONES</p>
              <h3 style={{ fontSize: '1.5rem', margin: '5px 0' }}>24</h3>
           </div>
        </div>

        {/* ESPACIO PARA GRÁFICOS */}
        <div style={{ background: '#0a0c10', height: '300px', marginTop: '30px', borderRadius: '30px', border: '1px solid #111', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#222' }}>
           <p>MÓDULO DE MONITOREO EN TIEMPO REAL</p>
        </div>

      </main>

      <style jsx>{`
        @media (min-width: 768px) {
          #sidebar-elite { left: 0 !important; }
          .main-content { margin-left: 260px !important; }
        }
      `}</style>
    </div>
  );
}