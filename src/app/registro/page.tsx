"use client";
import React, { useState } from 'react';
import { ArrowLeft, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function RegistroPage() {
  const [loading, setLoading] = useState(false);

  if (loading) return <div style={{height:'100vh', display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'#020406', color:'#00C853'}}>⚽ Cargando...</div>;

  return (
    <main style={{ backgroundColor: '#020406', minHeight: '100vh', color: 'white', padding: '40px 20px', fontFamily: 'Arial' }}>
      <Link href="/" onClick={() => setLoading(true)} style={{ color: '#00C853', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px', fontWeight: 'bold' }}>
        <ArrowLeft size={20} /> VOLVER AL INICIO
      </Link>

      <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center', background: '#0a0c10', padding: '40px', borderRadius: '20px', border: '1px solid #111' }}>
        <UserPlus size={40} color="#00C853" style={{ marginBottom: '20px' }} />
        <h1 style={{ fontSize: '2rem', marginBottom: '30px', fontWeight: 900 }}>REGISTRO ÉLITE</h1>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="text" placeholder="Nombre" style={{ padding: '15px', borderRadius: '8px', border: '1px solid #222', backgroundColor: '#020406', color: 'white' }} />
          <input type="email" placeholder="Email" style={{ padding: '15px', borderRadius: '8px', border: '1px solid #222', backgroundColor: '#020406', color: 'white' }} />
          <input type="password" placeholder="Contraseña" style={{ padding: '15px', borderRadius: '8px', border: '1px solid #222', backgroundColor: '#020406', color: 'white' }} />
          <button type="button" style={{ backgroundColor: '#00C853', color: 'black', padding: '15px', borderRadius: '8px', border: 'none', fontWeight: 900, marginTop: '10px' }}>REGISTRARME</button>
        </form>
      </div>
    </main>
  );
}