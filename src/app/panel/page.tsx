"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, FileText, LogOut, User } from 'lucide-react';

export default function PanelSocio() {
  const [nombre, setNombre] = useState("");
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
    <div style={{ backgroundColor: '#020406', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', display: 'flex', flexDirection: 'column' }}>
      
      {/* CABECERA MÓVIL */}
      <header style={{ padding: '20px', borderBottom: '1px solid #111', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0a0c10' }}>
        <div>
          <h1 style={{ color: '#00C853', margin: 0, fontSize: '1.2rem', fontWeight: 900 }}>EL GURÚ</h1>
          <span style={{ fontSize: '10px', color: '#555' }}>SISTEMA ÉLITE</span>
        </div>
        <button onClick={cerrarSesion} style={{ background: 'none', border: 'none', color: '#ff4444' }}>
          <LogOut size={20} />
        </button>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main style={{ padding: '20px', flex: 1 }}>
        <div style={{ background: 'linear-gradient(145deg, #0a0c10, #020406)', padding: '25px', borderRadius: '20px', border: '1px solid #00C853', marginBottom: '20px' }}>
          <User size={30} color="#00C853" style={{ marginBottom: '10px' }} />
          <h2 style={{ margin: 0, fontSize: '1.4rem' }}>¡Bienvenido,</h2>
          <h2 style={{ margin: 0, color: '#00C853', textTransform: 'uppercase', fontWeight: 900 }}>{nombre}!</h2>
          <p style={{ color: '#555', fontSize: '13px', marginTop: '10px' }}>Tu estatus actual es: <b style={{color: '#00C853'}}>ACTIVO</b></p>
        </div>

        {/* ACCESOS RÁPIDOS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div style={{ background: '#0a0c10', padding: '20px', borderRadius: '15px', border: '1px solid #111', textAlign: 'center' }}>
            <LayoutDashboard size={24} color="#00C853" style={{ margin: '0 auto 10px' }} />
            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>MONITOR</span>
          </div>
          <div style={{ background: '#0a0c10', padding: '20px', borderRadius: '15px', border: '1px solid #111', textAlign: 'center' }}>
            <FileText size={24} color="#00C853" style={{ margin: '0 auto 10px' }} />
            <span style={{ fontSize: '12px', fontWeight: 'bold' }}>REPORTES</span>
          </div>
        </div>
      </main>

      {/* PIE DE PÁGINA */}
      <footer style={{ padding: '20px', textAlign: 'center', color: '#222', fontSize: '10px' }}>
        &copy; 2026 EL GURÚ ÉLITE - ACCESO EXCLUSIVO
      </footer>
    </div>
  );
}