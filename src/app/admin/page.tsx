"use client";
import React, { useState, useEffect } from 'react';
import { Users, Trash2, Eye, DollarSign, Lock, Power, PowerOff, ShieldCheck } from 'lucide-react';

export default function AdminControlTotal() {
  const [isLocked, setIsLocked] = useState(true);
  const [pass, setPass] = useState("");
  
  // ESTADO DE SOCIOS: Ahora inicia vacío para no traer usuarios falsos
  const [socios, setSocios] = useState([]);

  // FUNCIÓN PARA VER EXPEDIENTE
  const verInfo = (socio: any) => {
    alert(
      `--- EXPEDIENTE DEL SOCIO ---\n\n` +
      `NOMBRE: ${socio.nombre}\n` +
      `EMAIL: ${socio.email}\n` +
      `CONTRASEÑA: ${socio.passUser}\n` +
      `PLAN: ${socio.plan}\n` +
      `ESTADO: ${socio.estado}`
    );
  };

  const toggleEstado = (id: number) => {
    setSocios(socios.map(s => s.id === id ? { ...s, estado: s.estado === "Activo" ? "Suspendido" : "Activo" } : s));
  };

  const eliminarSocio = (id: number) => {
    if(confirm("¿ELIMINAR PERMANENTE?")) {
      setSocios(socios.filter(s => s.id !== id));
    }
  };

  if (isLocked) {
    return (
      <div style={{ backgroundColor: '#020406', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
        <div style={{ textAlign: 'center', background: '#0a0c10', padding: '50px', borderRadius: '30px', border: '1px solid #00C853' }}>
          <Lock size={50} color="#00C853" style={{ marginBottom: '20px' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>ADMIN EL GURÚ</h2>
          <input 
            type="password" 
            placeholder="LLAVE MAESTRA" 
            onChange={(e) => setPass(e.target.value)}
            style={{ padding: '15px', borderRadius: '10px', border: '1px solid #222', backgroundColor: '#020406', color: '#00C853', textAlign: 'center', marginTop: '20px', width: '100%' }}
          />
          <button 
            onClick={() => pass === "GURU2026" ? setIsLocked(false) : alert("DENEGADO")} 
            style={{ marginTop: '20px', width: '100%', padding: '15px', background: '#00C853', color: 'black', border: 'none', borderRadius: '10px', fontWeight: 900, cursor: 'pointer' }}>
            ENTRAR
          </button>
        </div>
      </div>
    );
  }

  return (
    <main style={{ backgroundColor: '#020406', minHeight: '100vh', color: 'white', padding: '40px 5%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#00C853' }}>CONTROL TOTAL</h1>
        <button onClick={() => setIsLocked(true)} style={{ background: '#111', color: '#ff4444', border: '1px solid #222', padding: '10px 20px', borderRadius: '10px' }}>BLOQUEAR</button>
      </div>

      {/* MÉTRICAS RELEVANTES */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: '#0a0c10', padding: '25px', borderRadius: '20px', border: '1px solid #111' }}>
          <Users size={24} color="#00C853" />
          <h2 style={{ fontSize: '30px', margin: '10px 0' }}>{socios.length}</h2>
          <p style={{ fontSize: '10px', color: '#444' }}>SOCIOS REALES</p>
        </div>
      </div>

      <section style={{ background: '#0a0c10', borderRadius: '25px', border: '1px solid #111', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#111', color: '#555', fontSize: '11px' }}>
              <th style={{ padding: '20px' }}>SOCIO</th>
              <th style={{ padding: '20px' }}>PLAN</th>
              <th style={{ padding: '20px' }}>ESTADO</th>
              <th style={{ padding: '20px' }}>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {socios.length === 0 ? (
              <tr><td colSpan={4} style={{ padding: '40px', textAlign: 'center', color: '#333' }}>No hay socios registrados aún.</td></tr>
            ) : (
              socios.map(u => (
                <tr key={u.id} style={{ borderBottom: '1px solid #111' }}>
                  <td style={{ padding: '20px' }}><b>{u.nombre}</b><br/><span style={{fontSize:'11px', color:'#444'}}>{u.email}</span></td>
                  <td style={{ padding: '20px', color: '#00C853', fontWeight: 900 }}>{u.plan}</td>
                  <td style={{ padding: '20px' }}>{u.estado}</td>
                  <td style={{ padding: '20px', display: 'flex', gap: '10px' }}>
                    <button onClick={() => verInfo(u)} style={{ background: '#111', color: '#00C853', border: '1px solid #222', padding: '8px', borderRadius: '5px' }}><Eye size={16}/></button>
                    <button onClick={() => toggleEstado(u.id)} style={{ background: '#111', color: 'orange', border: '1px solid #222', padding: '8px', borderRadius: '5px' }}><Power size={16}/></button>
                    <button onClick={() => eliminarSocio(u.id)} style={{ background: '#111', color: '#ff4444', border: '1px solid #222', padding: '8px', borderRadius: '5px' }}><Trash2 size={16}/></button>
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