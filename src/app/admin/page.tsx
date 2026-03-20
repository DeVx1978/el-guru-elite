"use client";
import React, { useState } from 'react';
import { Users, CheckCircle, XCircle, DollarSign, ArrowLeft, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  // Simulamos datos que vendrán de la base de datos
  const [usuarios, setUsuarios] = useState([
    { id: 1, nombre: "Juan Pérez", email: "juan@mail.com", plan: "Elite", estado: "Pendiente", fecha: "20/03/2026" },
    { id: 2, nombre: "Andrés Gomez", email: "andres@mail.com", plan: "Premium", estado: "Pendiente", fecha: "19/03/2026" },
  ]);

  const aprobarUsuario = (id: number) => {
    setUsuarios(usuarios.map(u => u.id === id ? { ...u, estado: "Activo" } : u));
    alert("Usuario activado con éxito. Se le ha enviado acceso al Proyecto Gurú.");
  };

  return (
    <main style={{ backgroundColor: '#020406', minHeight: '100vh', color: 'white', fontFamily: 'Arial, sans-serif', padding: '40px 5%' }}>
      
      {/* HEADER ADMIN */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px', borderBottom: '1px solid #111', paddingBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#00C853' }}>PANEL DE CONTROL ADMIN</h1>
          <p style={{ fontSize: '10px', color: '#555', letterSpacing: '2px' }}>EL GURÚ ÉLITE INVESTMENTS</p>
        </div>
        <Link href="/" style={{ color: '#555', textDecoration: 'none', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeft size={16} /> SALIR AL SITIO
        </Link>
      </div>

      {/* MÉTRICAS RÁPIDAS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: '#0a0c10', padding: '20px', borderRadius: '15px', border: '1px solid #111' }}>
          <Users size={20} color="#00C853" />
          <h3 style={{ fontSize: '24px', margin: '10px 0' }}>{usuarios.length}</h3>
          <p style={{ fontSize: '10px', color: '#444' }}>SOLICITUDES PENDIENTES</p>
        </div>
        <div style={{ background: '#0a0c10', padding: '20px', borderRadius: '15px', border: '1px solid #111' }}>
          <DollarSign size={20} color="#00C853" />
          <h3 style={{ fontSize: '24px', margin: '10px 0' }}>$2,500</h3>
          <p style={{ fontSize: '10px', color: '#444' }}>RECAUDO POR VALIDAR</p>
        </div>
      </div>

      {/* TABLA DE GESTIÓN DE SOCIOS */}
      <section style={{ background: '#0a0c10', borderRadius: '20px', border: '1px solid #111', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#111', color: '#555', fontSize: '12px' }}>
              <th style={{ padding: '20px' }}>SOCIO / EMAIL</th>
              <th style={{ padding: '20px' }}>MEMBRESÍA</th>
              <th style={{ padding: '20px' }}>FECHA REGISTRO</th>
              <th style={{ padding: '20px' }}>ESTADO</th>
              <th style={{ padding: '20px' }}>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid #111', fontSize: '13px' }}>
                <td style={{ padding: '20px' }}>
                  <b>{u.nombre}</b><br />
                  <span style={{ color: '#444', fontSize: '11px' }}>{u.email}</span>
                </td>
                <td style={{ padding: '20px' }}>
                  <span style={{ color: '#00C853', fontWeight: 'bold' }}>{u.plan}</span>
                </td>
                <td style={{ padding: '20px', color: '#555' }}>{u.fecha}</td>
                <td style={{ padding: '20px' }}>
                  <span style={{ 
                    padding: '5px 12px', 
                    borderRadius: '20px', 
                    fontSize: '10px', 
                    fontWeight: 'bold',
                    backgroundColor: u.estado === 'Pendiente' ? 'rgba(255,165,0,0.1)' : 'rgba(0,200,83,0.1)',
                    color: u.estado === 'Pendiente' ? 'orange' : '#00C853'
                  }}>
                    {u.estado}
                  </span>
                </td>
                <td style={{ padding: '20px' }}>
                  {u.estado === 'Pendiente' ? (
                    <button 
                      onClick={() => aprobarUsuario(u.id)}
                      style={{ background: '#00C853', border: 'none', color: 'black', padding: '8px 15px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '11px' }}>
                      APROBAR ACCESO
                    </button>
                  ) : (
                    <ShieldCheck size={20} color="#00C853" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}