"use client";
import React, { useState } from 'react';
import { Users, ShieldCheck, UserX, Trash2, Eye, DollarSign, ArrowLeft, Lock, Power, PowerOff, Key } from 'lucide-react';
import Link from 'next/link';

export default function AdminControlTotal() {
  const [isLocked, setIsLocked] = useState(true);
  const [pass, setPass] = useState("");
  
  // DATOS DE SOCIOS CON CONTRASEÑA VISIBLE PARA ADMIN
  const [socios, setSocios] = useState([
    { id: 1, nombre: "Juan Pérez", email: "juan@mail.com", passUser: "Juan123*", plan: "Elite", precio: 1500, estado: "Pendiente", registro: "20/03/2026" },
    { id: 2, nombre: "Andrés Gomez", email: "andres@mail.com", passUser: "AdminGuru77", plan: "Premium", precio: 1000, estado: "Activo", registro: "19/03/2026" },
  ]);

  // FUNCIÓN DE CONTROL: VER FICHA COMPLETA INCLUYENDO PASSWORD
  const verInfo = (socio: any) => {
    alert(
      `--- EXPEDIENTE DEL SOCIO ---\n\n` +
      `NOMBRE: ${socio.nombre}\n` +
      `EMAIL: ${socio.email}\n` +
      `CONTRASEÑA: ${socio.passUser}\n` + // <--- AQUÍ VISUALIZAS LA CLAVE
      `PLAN: ${socio.plan}\n` +
      `INVERSIÓN: $${socio.precio}\n` +
      `ESTADO: ${socio.estado}\n` +
      `REGISTRO: ${socio.registro}`
    );
  };

  const toggleEstado = (id: number) => {
    setSocios(socios.map(s => s.id === id ? { ...s, estado: s.estado === "Activo" ? "Suspendido" : "Activo" } : s));
  };

  const eliminarSocio = (id: number) => {
    if(confirm("¿ELIMINAR PERMANENTE? Esta acción no se puede deshacer.")) {
      setSocios(socios.filter(s => s.id !== id));
    }
  };

  // PANTALLA DE ACCESO RESTRINGIDO
  if (isLocked) {
    return (
      <div style={{ backgroundColor: '#020406', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
        <div style={{ textAlign: 'center', background: '#0a0c10', padding: '50px', borderRadius: '30px', border: '1px solid #00C853' }}>
          <Lock size={50} color="#00C853" style={{ marginBottom: '20px' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 900 }}>ACCESO RESTRINGIDO</h2>
          <p style={{ fontSize: '10px', color: '#444', marginBottom: '30px' }}>LLAVE MAESTRA REQUERIDA</p>
          <input 
            type="password" 
            placeholder="••••••••" 
            onChange={(e) => setPass(e.target.value)}
            style={{ padding: '15px', borderRadius: '10px', border: '1px solid #222', backgroundColor: '#020406', color: '#00C853', textAlign: 'center', fontSize: '20px', letterSpacing: '5px', width: '100%' }}
          />
          <button 
            onClick={() => pass === "GURU2026" ? setIsLocked(false) : alert("ACCESO DENEGADO")} 
            style={{ marginTop: '20px', width: '100%', padding: '15px', background: '#00C853', color: 'black', border: 'none', borderRadius: '10px', fontWeight: 900, cursor: 'pointer' }}>
            ENTRAR AL PANEL
          </button>
        </div>
      </div>
    );
  }

  return (
    <main style={{ backgroundColor: '#020406', minHeight: '100vh', color: 'white', fontFamily: 'Arial, sans-serif', padding: '40px 5%' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#00C853' }}>CONTROL TOTAL EL GURÚ</h1>
          <p style={{ fontSize: '10px', color: '#555' }}>SISTEMA DE GESTIÓN DE CAPITAL / NIVEL DE ACCESO: RAÍZ</p>
        </div>
        <button onClick={() => setIsLocked(true)} style={{ background: '#111', color: '#ff4444', border: '1px solid #222', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>BLOQUEAR PANEL</button>
      </div>

      {/* MÉTRICAS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: '#0a0c10', padding: '25px', borderRadius: '20px', border: '1px solid #111' }}>
          <Users size={24} color="#00C853" />
          <h2 style={{ fontSize: '30px', margin: '10px 0' }}>{socios.length}</h2>
          <p style={{ fontSize: '10px', color: '#444' }}>SOCIOS REGISTRADOS</p>
        </div>
        <div style={{ background: '#0a0c10', padding: '25px', borderRadius: '20px', border: '1px solid #111' }}>
          <DollarSign size={24} color="#00C853" />
          <h2 style={{ fontSize: '30px', margin: '10px 0' }}>${socios.filter(s => s.estado === "Activo").reduce((acc, s) => acc + s.precio, 0)}</h2>
          <p style={{ fontSize: '10px', color: '#444' }}>CAPITAL ACTIVO</p>
        </div>
      </div>

      {/* LISTA DE PODER */}
      <section style={{ background: '#0a0c10', borderRadius: '25px', border: '1px solid #111', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#111', color: '#555', fontSize: '11px', textTransform: 'uppercase' }}>
              <th style={{ padding: '20px' }}>Socio</th>
              <th style={{ padding: '20px' }}>Plan</th>
              <th style={{ padding: '20px' }}>Estado</th>
              <th style={{ padding: '20px' }}>Acciones de Control</th>
            </tr>
          </thead>
          <tbody>
            {socios.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid #111' }}>
                <td style={{ padding: '20px' }}>
                  <b style={{ fontSize: '14px' }}>{u.nombre}</b><br />
                  <span style={{ fontSize: '11px', color: '#444' }}>{u.email}</span>
                </td>
                <td style={{ padding: '20px' }}>
                  <span style={{ color: '#00C853', fontWeight: 900 }}>{u.plan}</span>
                </td>
                <td style={{ padding: '20px' }}>
                  <span style={{ 
                    padding: '5px 12px', borderRadius: '20px', fontSize: '10px', fontWeight: 900,
                    background: u.estado === 'Activo' ? 'rgba(0,200,83,0.1)' : 'rgba(255,0,0,0.1)',
                    color: u.estado === 'Activo' ? '#00C853' : '#ff4444'
                  }}>
                    {u.estado}
                  </span>
                </td>
                <td style={{ padding: '20px', display: 'flex', gap: '10px' }}>
                  <button onClick={() => verInfo(u)} title="VER EXPEDIENTE COMPLETO" style={{ background: '#111', border: '1px solid #222', padding: '10px', borderRadius: '8px', cursor: 'pointer', color: '#00C853' }}>
                    <Eye size={16}/>
                  </button>
                  <button onClick={() => toggleEstado(u.id)} title="CAMBIAR ESTADO" style={{ background: '#111', border: '1px solid #222', padding: '10px', borderRadius: '8px', cursor: 'pointer', color: 'orange' }}>
                    {u.estado === 'Activo' ? <PowerOff size={16}/> : <Power size={16}/>}
                  </button>
                  <button onClick={() => eliminarSocio(u.id)} title="ELIMINAR REGISTRO" style={{ background: '#111', border: '1px solid #ff444433', padding: '10px', borderRadius: '8px', cursor: 'pointer', color: '#ff4444' }}>
                    <Trash2 size={16}/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}