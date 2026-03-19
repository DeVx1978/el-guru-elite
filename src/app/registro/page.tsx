"use client";
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';

// Icono del ojo para ver contraseña
const Eye = ({ s }: { s: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={s ? "#00C853" : "#444"} strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    {!s && <line x1="1" y1="1" x2="23" y2="23" stroke="#444" />}
  </svg>
);

export default function RegistroPage() {
  const [form, setForm] = useState({ nombre: '', email: '', pass: '', confirm: '' });
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState('');

  const handleRegistro = async (e: any) => {
    e.preventDefault();
    setMsg('Procesando...');

    if (form.pass !== form.confirm) {
      setMsg('❌ Las contraseñas no coinciden');
      return;
    }

    // Insertar en Supabase
    const { error } = await supabase.from('socios_elite').insert([{
      nombre_completo: form.nombre,
      id_socio: form.email.toLowerCase().trim(),
      clave_acceso: form.pass,
      estatus_pago: 'PENDIENTE',
      nivel_socio: 'Socio en Verificación'
    }]);

    if (error) {
      setMsg('❌ Error: Este correo ya está registrado');
    } else {
      // GUARDAR SESIÓN PARA AUTO-LOGIN
      localStorage.setItem('user_elite', JSON.stringify({
        id_socio: form.email.toLowerCase().trim(),
        clave_acceso: form.pass
      }));
      
      setMsg('✅ ¡Cuenta creada! Entrando al panel...');
      setTimeout(() => window.location.href = '/panel', 1500);
    }
  };

  return (
    <main style={{ backgroundColor: '#020406', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Arial' }}>
      <form onSubmit={handleRegistro} style={{ width: '450px', padding: '40px', backgroundColor: '#0a0c10', borderRadius: '24px', border: '1px solid #1a1d23' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ color: '#fff', fontStyle: 'italic', fontWeight: '900' }}>CREAR CUENTA DE <span style={{ color: '#00C853' }}>SOCIO</span></h2>
        </div>

        <input style={iN} placeholder="Nombre completo" onChange={e => setForm({...form, nombre: e.target.value})} required />
        <input style={iN} type="email" placeholder="Correo electrónico" onChange={e => setForm({...form, email: e.target.value})} required />

        <div style={{ position: 'relative' }}>
          <input style={iN} type={show ? "text" : "password"} placeholder="Contraseña" onChange={e => setForm({...form, pass: e.target.value})} required />
          <button type="button" onClick={() => setShow(!show)} style={btnEye}><Eye s={show}/></button>
        </div>

        <div style={{ position: 'relative' }}>
          <input style={iN} type={show ? "text" : "password"} placeholder="Confirmar contraseña" onChange={e => setForm({...form, confirm: e.target.value})} required />
          <button type="button" onClick={() => setShow(!show)} style={btnEye}><Eye s={show}/></button>
        </div>

        <button type="submit" style={bT}>REGISTRARME AHORA</button>
        
        {msg && <p style={{ color: msg.includes('❌') ? '#ff4444' : '#00C853', textAlign: 'center', marginTop: '15px', fontSize: '14px', fontWeight: 'bold' }}>{msg}</p>}
      </form>
    </main>
  );
}

const iN = { width: '100%', backgroundColor: '#05070a', border: '1px solid #1a1d23', padding: '15px', color: 'white', marginBottom: '15px', borderRadius: '10px', outline: 'none' };
const bT = { width: '100%', backgroundColor: '#00C853', color: 'black', padding: '15px', borderRadius: '10px', fontWeight: 'bold' as const, border: 'none', cursor: 'pointer', fontSize: '16px' };
const btnEye = { position: 'absolute' as const, right: '15px', top: '15px', background: 'none', border: 'none', cursor: 'pointer' };