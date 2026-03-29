"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Lock, Mail, Loader2, ShieldCheck, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // ESTADO PARA EL OJO
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- BLINDAJE DE PRIVACIDAD: LIMPIEZA TOTAL AL CARGAR ---
  useEffect(() => {
    setEmail('');
    setPassword('');
    if (typeof window !== 'undefined') {
      localStorage.clear();
      sessionStorage.clear();
      window.scrollTo(0, 0);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error: err } = await supabase
        .from('socios')
        .select('*')
        .eq('email', email.toLowerCase().trim())
        .eq('password', password.trim())
        .single();

      if (err || !data) throw new Error('Credenciales inválidas. Verifica tu acceso.');

      if (typeof window !== 'undefined') {
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('userRol', data.rol || 'socio');
        localStorage.setItem('socio_id', data.id);
        localStorage.setItem('socio_nombre', data.nombre);
      }

      router.push('/panel');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      
      {/* SOLUCIÓN A LA FRANJA BLANCA: Forzamos el color del autocompletado */}
      <style jsx global>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active  {
          -webkit-box-shadow: 0 0 0 30px #080808 inset !important;
          -webkit-text-fill-color: #fff !important;
          transition: background-color 5000s ease-in-out 0s;
        }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      <div style={{ width: '100%', maxWidth: '400px', background: '#050505', border: '1px solid #111', padding: '40px', borderRadius: '30px', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}>
        <ShieldCheck size={40} color="#00C853" style={{ marginBottom: '20px' }} />
        <h1 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 900, margin: 0 }}>ACCESO <span style={{ color: '#00C853' }}>ÉLITE</span></h1>
        <p style={{ color: '#444', fontSize: '0.8rem', marginTop: '5px' }}>Terminal de Socios</p>
        
        <form onSubmit={handleLogin} autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
          
          {/* CAMPO EMAIL */}
          <input 
            type="email" 
            name="elite_entry_email" 
            autoComplete="off"
            placeholder="EMAIL" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            style={{ width: '100%', padding: '18px', background: '#080808', border: '1px solid #111', borderRadius: '15px', color: '#fff', outline: 'none' }} 
            required
          />

          {/* CAMPO PASSWORD CON OJO */}
          <div style={{ position: 'relative', width: '100%' }}>
            <input 
              type={showPassword ? "text" : "password"} 
              name="elite_entry_pass"
              autoComplete="new-password"
              placeholder="PASSWORD" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              style={{ width: '100%', padding: '18px 50px 18px 18px', background: '#080808', border: '1px solid #111', borderRadius: '15px', color: '#fff', outline: 'none' }} 
              required
            />
            {/* BOTÓN DEL OJO */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#444', display: 'flex', alignItems: 'center' }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          {error && (
            <div style={{ color: '#FF3D00', fontSize: '0.8rem', fontWeight: 700, background: 'rgba(255,61,0,0.05)', padding: '10px', borderRadius: '10px' }}>
              {error}
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={loading} 
            style={{ 
              width: '100%', padding: '20px', 
              background: '#00C853', color: '#000', 
              border: 'none', borderRadius: '15px', 
              fontWeight: 900, cursor: loading ? 'not-allowed' : 'pointer',
              transition: '0.3s'
            }}
          >
            {loading ? <Loader2 style={{ animation: 'spin 1s linear infinite', margin: '0 auto' }} /> : 'AUTORIZAR INGRESO'}
          </button>
        </form>
      </div>
    </div>
  );
}