"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, KeyRound, Zap } from 'lucide-react';

export default function BunkerAuth() {
  const [llave, setLlave] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const acceder = (e: React.FormEvent) => {
    e.preventDefault();
    if (llave === 'GURU2026') {
      localStorage.setItem('bunker_auth', 'GURU2026');
      router.push('/admin');
    } else {
      setError(true);
    }
  };

  return (
    <div style={{ background: '#000', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
      <div style={{ background: '#050505', padding: '50px', borderRadius: '20px', border: '1px solid #111', textAlign: 'center' }}>
        <ShieldCheck size={60} color="#00C853" style={{ marginBottom: '20px' }} />
        <h2 style={{ letterSpacing: '2px' }}>CENTRO DE MANDO</h2>
        <form onSubmit={acceder}>
          <input 
            type="password" 
            placeholder="LLAVE MAESTRA" 
            value={llave}
            onChange={(e) => setLlave(e.target.value)}
            style={{ background: '#000', border: '1px solid #222', color: 'white', padding: '15px', borderRadius: '10px', width: '100%', textAlign: 'center', fontSize: '18px' }}
          />
          <button type="submit" style={{ width: '100%', marginTop: '20px', background: '#00C853', padding: '15px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}>
            DESBLOQUEAR
          </button>
        </form>
        {error && <p style={{ color: 'red', fontSize: '12px', marginTop: '10px' }}>ACCESO DENEGADO</p>}
      </div>
    </div>
  );
}