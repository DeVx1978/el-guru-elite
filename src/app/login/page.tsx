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

  // --- BLINDAJE 1: LIMPIEZA TOTAL AL CARGAR ---
  useEffect(() => {
    // Borramos rastro de sesiones pasadas para que no haya auto-ingreso
    localStorage.clear(); 
    sessionStorage.clear();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setError(null);
    setLoading(true);

    try {
      // Consulta a la base de datos
      const { data, error: err } = await supabase
        .from('socios')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

      if (err || !data) {
        throw new Error('Credenciales incorrectas. Verifica tu acceso.');
      }

      if (data.estado === 'pendiente') {
        router.push('/revision-pendiente');
        return;
      }

      // --- BLINDAJE 2: CREACIÓN DE LLAVE POR CLIC ---
      // Guardamos la sesión persistente
      localStorage.setItem('socio_id', data.id);
      localStorage.setItem('socio_nombre', data.nombre);
      localStorage.setItem('socio_rol', data.rol || 'socio');
      
      // CREAMOS EL TICKET DE ENTRADA (Solo vive en esta pestaña y muere al cerrarla)
      sessionStorage.setItem('sesion_activa', 'true');

      // Redirección al panel Élite
      router.push('/panel');

    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '16px', background: '#0a0c10', border: '1px solid #111',
    borderRadius: '14px', color: 'white', fontSize: '1rem', outline: 'none', marginBottom: '20px'
  };

  const listoParaIngresar = email.length > 5 && password.length >= 6;

  return (
    <div style={{ backgroundColor: '#020406', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '400px', background: '#050505', border: '1px solid #111', padding: '40px', borderRadius: '30px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', padding: '15px', background: 'rgba(0,200,83,0.05)', borderRadius: '20px', marginBottom: '20px', border: '1px solid rgba(0,200,83,0.1)' }}>
            <ShieldCheck size={40} color="#00C853" />
          </div>
          <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 900 }}>ACCESO <span style={{ color: '#00C853' }}>ÉLITE</span></h1>
          <p style={{ color: '#555', fontSize: '0.9rem', marginTop: '10px' }}>Ingresa tus credenciales de socio verificado.</p>
        </div>

        <form onSubmit={handleLogin} autoComplete="off">
          <label style={{ color: '#888', fontSize: '0.8rem', fontWeight: 900, display: 'block', marginBottom: '8px', letterSpacing: '1px' }}>
            CORREO ELECTRÓNICO
          </label>
          <div style={{ position: 'relative' }}>
            <Mail size={18} color="#333" style={{ position: 'absolute', left: '15px', top: '16px' }} />
            <input 
              type="email" 
              name="email_login"
              autoComplete="off"
              placeholder="socio@elguruelite.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              style={{ ...inputStyle, paddingLeft: '45px' }} 
            />
          </div>

          <label style={{ color: '#888', fontSize: '0.8rem', fontWeight: 900, display: 'block', marginBottom: '8px', letterSpacing: '1px' }}>
            CONTRASEÑA
          </label>
          <div style={{ position: 'relative' }}>
            <Lock size={18} color="#333" style={{ position: 'absolute', left: '15px', top: '16px' }} />
            <input 
              type={showPass ? "text" : "password"} 
              name="password_login"
              autoComplete="new-password"
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              style={{ ...inputStyle, paddingLeft: '45px' }} 
            />
            <button 
              type="button" 
              onClick={() => setShowPass(!showPass)} 
              style={{ position: 'absolute', right: '15px', top: '16px', background: 'none', border: 'none', color: '#333', cursor: 'pointer' }}
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <div style={{ background: 'rgba(255,68,68,0.1)', color: '#ff4444', padding: '12px', borderRadius: '12px', fontSize: '0.85rem', marginBottom: '20px', textAlign: 'center', border: '1px solid rgba(255,68,68,0.1)' }}>
              ⚠️ {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={!listoParaIngresar || loading}
            style={{ 
              width: '100%', 
              padding: '18px', 
              background: listoParaIngresar ? '#00C853' : '#111', 
              color: listoParaIngresar ? 'black' : '#444', 
              border: 'none', 
              borderRadius: '15px', 
              fontSize: '1rem', 
              fontWeight: 900, 
              cursor: listoParaIngresar ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s ease',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            {loading ? <Loader2 size={20} className="spin" /> : 'INGRESAR AL PANEL'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '30px', color: '#444', fontSize: '0.85rem' }}>
          ¿Problemas con tu acceso? <br />
          <span style={{ color: '#00C853', fontWeight: 'bold', cursor: 'pointer' }}>Contacta a Soporte VIP</span>
        </p>
      </div>

      <style jsx>{`
        .spin { animation: rotate 1s linear infinite; }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}