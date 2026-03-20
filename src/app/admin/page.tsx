"use client";
import React, { useState } from 'react';
import { Users, Trash2, Eye, DollarSign, Lock, Power, PowerOff, EyeOff, ShieldAlert, KeyRound } from 'lucide-react';

export default function AdminControlTotal() {
  const [isLocked, setIsLocked] = useState(true);
  const [pass, setPass] = useState("");
  const [showMasterPass, setShowMasterPass] = useState(false);
  const [socios, setSocios] = useState([]); // Base de datos inicializada en VACÍO

  // LLAVE MAESTRA CONFIGURADA
  const MASTER_KEY = "GURU2026";

  const verExpediente = (s: any) => {
    alert(`--- EXPEDIENTE DE SOCIO ---\nNombre: ${s.nombre}\nEmail: ${s.email}\nPassword: ${s.passUser}\nPlan: ${s.plan}\nEstado: ${s.estado}`);
  };

  const cambiarEstado = (id: number) => {
    setSocios(socios.map(s => s.id === id ? { ...s, estado: s.estado === "Activo" ? "Suspendido" : "Activo" } : s));
  };

  const eliminarDefinitivo = (id: number) => {
    if (confirm("¿ORDEN DE ELIMINACIÓN? Esta acción es irreversible.")) {
      setSocios(socios.filter(s => s.id !== id));
    }
  };

  // PANTALLA DE SEGURIDAD REFORZADA
  if (isLocked) {
    return (
      <div style={{ backgroundColor: '#020406', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontFamily: 'sans-serif' }}>
        <div style={{ textAlign: 'center', background: '#0a0c10', padding: '50px', borderRadius: '30px', border: '1px solid #00C853', width: '350px', boxShadow: '0 0 30px rgba(0, 200, 83, 0.1)' }}>
          <ShieldAlert size={60} color="#00C853" style={{ marginBottom: '20px' }} />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 900, letterSpacing: '2px' }}>ACCESO NIVEL RAÍZ</h2>
          
          <div style={{ position: 'relative', marginTop: '30px' }}>
            <input 
              type={showMasterPass ? "text" : "password"} 
              placeholder="LLAVE MAESTRA" 
              onChange={(e) => setPass(e.target.value)}
              style={{ padding: '15px', borderRadius: '10px', border: '1px solid #222', backgroundColor: '#020406', color: '#00C853', textAlign: 'center', width: '100%', fontSize: '16px', outline: 'none' }}
            />
            <button 
              onClick={() => setShowMasterPass(!showMasterPass)}
              style={{ position: 'absolute', right: '15px', top: '15px', background: 'none', border: 'none', color: '#444', cursor: 'pointer' }}
            >
              {showMasterPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button 
            onClick={() => pass === MASTER_KEY ? setIsLocked(false) : alert("LLAVE INCORRECTA")} 
            style={{ marginTop: '25px', width: '100%', padding: '15px', background: '#00C853', color: 'black', border: 'none', borderRadius: '10px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
          >
            <KeyRound size={18} /> DESBLOQUEAR SISTEMA
          </button>
        </div>
      </div>
    );
  }

  return (
    <main style={{ backgroundColor: '#020406', minHeight: '100vh', color: 'white', padding: '40px 6%', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px', borderBottom: '1px solid #111', paddingBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#00C853', margin: 0 }}>CENTRO DE MANDO</h1>
          <p style={{ fontSize: '10px', color: '#555', letterSpacing: '2px', marginTop: '5px' }}>EL GURÚ ÉLITE INVESTMENTS | PANEL DE CONTROL TOTAL</p>
        </div>
        <button onClick={() => setIsLocked(true)} style={{ background: 'rgba(255,68,68,0.1)', color: '#ff4444', border: '1px solid #ff4444', padding: '10px 25px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>BLOQUEAR ACCESO</button>
      </div>

      {/* MÉTRICAS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '25px', marginBottom: '50px' }}>
        <div style={{ background: '#0a0c10', padding: '30px', borderRadius: '25px', border: '1px solid #111' }}>
          <Users size={28} color="#00C853" />
          <h2 style={{ fontSize: '35px', margin: '15px 0', fontWeight: 900 }}>{socios.length}</h2>
          <p style={{ fontSize: '11px', color: '#444', fontWeight: 'bold', letterSpacing: '1px' }}>SOCIOS EN BASE DE DATOS</p>
        </div>
        <div style={{ background: '#0a0c10', padding: '30px', borderRadius: '25px', border: '1px solid #111' }}>
          <DollarSign size={28} color="#00C853" />
          <h2 style={{ fontSize: '35px', margin: '15px 0', fontWeight: 900 }}>$0.00</h2>
          <p style={{ fontSize: '11px', color: '#444', fontWeight: 'bold', letterSpacing: '1px' }}>RECAUDO TOTAL VALIDADO</p>
        </div>
      </div>

      {/* TABLA DE PODER */}
      <section style={{ background: '#0a0c10', borderRadius: '30px', border: '1px solid #111', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#111', color: '#666', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              <th style={{ padding: '25px' }}>Socio</th>
              <th style={{ padding: '25px' }}>Membresía</th>
              <th style={{ padding: '25px' }}>Estado Actual</th>
              <th style={{ padding: '25px' }}>Gestión de Datos</th>
            </tr>
          </thead>
          <tbody>
            {socios.length === 0 ? (
              <tr><td colSpan={4} style={{ padding: '60px', textAlign: 'center', color: '#222', fontStyle: 'italic' }}>Sistema en espera de registros reales...</td></tr>
            ) : (
              socios.map(s => (
                <tr key={s.id} style={{ borderBottom: '1px solid #111', transition: '0.3s' }}>
                  <td style={{ padding: '25px' }}>
                    <b style={{ fontSize: '15px' }}>{s.nombre}</b><br/>
                    <span style={{ fontSize: '11px', color: '#444' }}>{s.email}</span>
                  </td>
                  <td style={{ padding: '25px', color: '#00C853', fontWeight: 900 }}>{s.plan}</td>
                  <td style={{ padding: '25px' }}>
                    <span style={{ padding: '6px 15px', borderRadius: '20px', fontSize: '10px', fontWeight: 900, background: s.estado === 'Activo' ? 'rgba(0,200,83,0.1)' : 'rgba(255,68,68,0.1)', color: s.estado === 'Activo' ? '#00C853' : '#ff4444' }}>{s.estado}</span>
                  </td>
                  <td style={{ padding: '25px', display: 'flex', gap: '15px' }}>
                    <button onClick={() => verExpediente(s)} style={{ background: '#111', border: '1px solid #222', color: '#00C853', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}><Eye size={18}/></button>
                    <button onClick={() => cambiarEstado(s.id)} style={{ background: '#111', border: '1px solid #222', color: 'orange', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}>{s.estado === 'Activo' ? <PowerOff size={18}/> : <Power size={18}/>}</button>
                    <button onClick={() => eliminarDefinitivo(s.id)} style={{ background: '#111', border: '1px solid #ff444433', color: '#ff4444', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}><Trash2 size={18}/></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}