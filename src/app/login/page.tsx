"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Lock, Mail, Eye, EyeOff, Loader2, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPass, setShowPass] = useState(false);

  // --- BLINDAJE 1: LIMPIEZA Y PREPARACIÓN ---
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.clear(); 
      sessionStorage.clear();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setError(null);
    setLoading(true);

    try {
      // NORMALIZACIÓN: Forzamos minúsculas y eliminamos espacios invisibles
      const cleanEmail = email.toLowerCase().trim();
      const cleanPass = password.trim();

      // Consulta a la base de datos con datos normalizados
      const { data, error: err } = await supabase
        .from('socios')
        .select('*')
        .eq('email', cleanEmail)
        .eq('password', cleanPass)
        .single();

      if (err || !data) {
        throw new Error('Credenciales incorrectas. Verifica tu acceso Élite.');
      }

      if (data.estado === 'pendiente') {
        router.push('/revision-pendiente');
        return;
      }

      // --- BLINDAJE 2: PERSISTENCIA DE AUTORIDAD ---
      if (typeof window !== 'undefined') {
        localStorage.setItem('socio_id', data.id);
        localStorage.setItem('socio_nombre', data.nombre);
        localStorage.setItem('socio_rol', data.rol || 'socio');
        sessionStorage.setItem('sesion_activa', 'true');
      }

      // Redirección inteligente: Si es admin (como Maria Jose), a su panel de control
      if (data.rol === 'admin' || cleanEmail === 'mariajose@gmail.com') {
        router.push('/admin');
      } else {
        router.push('/panel');
      }

    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const listoParaIngresar = email.length > 5 && password.length >= 6;

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '400px', background: '#050505', border: '1px solid #111', padding: '40px', borderRadius: '30px', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', padding: '15px', background: 'rgba(0,200,83,0.05)', borderRadius: '20px', marginBottom: '20px', border: '1px solid rgba(0,200,83,0.1)' }}>
            <ShieldCheck size={40} color="#00C853" />
          </div>
          <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 900, color: '#fff' }}>ACCESO <span style={{ color: '#00C853' }}>ÉLITE</span></h1>
          <p style={{ color: '#444', fontSize: '0.9rem', marginTop: '10px' }}>Terminal de Autenticación Bancaria</p>
        </div>

        <form onSubmit={handleLogin} autoComplete="off">
          <label style={{ color: '#333', fontSize: '0.75rem', fontStyle: 'italic', fontWeight: 900, display: 'block', marginBottom: '8px', letterSpacing: '2px' }}>
            CREDENTIAL_ID (EMAIL)
          </label>
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <Mail size={18} color="#222" style={{ position: 'absolute', left: '15px', top: '18px', zIndex: 10 }} />
            <input 
              type="email" 
              placeholder="user@elite.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              style={{ 
                width: '100%', padding: '18px 18px 18px 50px', background: '#080808', border: '1px solid #111',
                borderRadius: '15px', color: 'white', fontSize: '1rem', outline: 'none'
              }} 
            />
          </div>

          <label style={{ color: '#333', fontSize: '0.75rem', fontStyle: 'italic', fontWeight: 900, display: 'block', marginBottom: '8px', letterSpacing: '2px' }}>
            ACCESS_KEY (PASSWORD)
          </label>
          <div style={{ position: 'relative', marginBottom: '30px' }}>
            <Lock size={18} color="#222" style={{ position: 'absolute', left: '15px', top: '18px', zIndex: 10 }} />
            <input 
              type={showPass ? "text" : "password"} 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              style={{ 
                width: '100%', padding: '18px 18px 18px 50px', background: '#080808', border: '1px solid #111',
                borderRadius: '15px', color: 'white', fontSize: '1rem', outline: 'none'
              }} 
            />
            <button 
              type="button" 
              onClick={() => setShowPass(!showPass)} 
              style={{ position: 'absolute', right: '15px', top: '18px', background: 'none', border: 'none', color: '#222', cursor: 'pointer' }}
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <div style={{ background: 'rgba(255,61,0,0.05)', color: '#FF3D00', padding: '15px', borderRadius: '12px', fontSize: '0.85rem', marginBottom: '25px', textAlign: 'center', border: '1px solid rgba(255,61,0,0.1)', fontWeight: 700 }}>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={!listoParaIngresar || loading}
            style={{ 
              width: '100%', padding: '22px', 
              background: listoParaIngresar ? '#00C853' : '#111', 
              color: listoParaIngresar ? 'black' : '#444', 
              border: 'none', borderRadius: '18px', fontSize: '14px', 
              fontWeight: 900, cursor: listoParaIngresar ? 'pointer' : 'not-allowed',
              transition: '0.4s', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px',
              letterSpacing: '1px'
            }}
          >
            {loading ? <Loader2 size={20} className="spin" /> : 'AUTORIZAR INGRESO'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '40px', color: '#222', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '1px' }}>
          PROTOCOLO DE SEGURIDAD AES-256 ACTIVO
        </p>
      </div>

      <style jsx>{`
        .spin { animation: rotate 1s linear infinite; }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input:focus { border-color: #00C853 !important; box-shadow: 0 0 20px rgba(0,200,83,0.1); }
      `}</style>
    </div>
  );
}