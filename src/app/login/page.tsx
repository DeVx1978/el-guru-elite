"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Lock, Mail, Eye, EyeOff, Loader2, ShieldAlert, CheckCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  
  // --- ESTADOS ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- LÓGICA DE ACCESO MAESTRO ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 1. Buscamos al socio en la tabla exacta de tu captura de Supabase
      const { data: socio, error: authError } = await supabase
        .from('socios')
        .select('*')
        .eq('email', email.trim())
        .eq('password', password) // Validación directa de contraseña
        .single();

      if (authError || !socio) {
        throw new Error("Socio no encontrado o credenciales incorrectas.");
      }

      // 2. FILTRO CRÍTICO: ¿Está activado por el Admin?
      if (socio.estado !== 'activo') {
        throw new Error("⚠️ ACCESO RESTRINGIDO: Su cuenta está en proceso de verificación por auditoría.");
      }

      // 3. ÉXITO: Guardamos sesión y entramos
      localStorage.setItem('socio_id', socio.id);
      localStorage.setItem('socio_nombre', socio.nombre);
      router.push('/panel');

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#020406', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ background: '#0a0c10', padding: '50px 40px', borderRadius: '30px', border: '1px solid #111', width: '100%', maxWidth: '420px', textAlign: 'center' }}>
        
        <h1 style={{ color: '#00C853', fontSize: '1.8rem', fontWeight: 900, marginBottom: '10px' }}>EL GURÚ <span style={{color: '#fff'}}>ÉLITE</span></h1>
        <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '40px' }}>ACCESO EXCLUSIVO PARA SOCIOS</p>

        <form onSubmit={handleLogin}>
          <div style={{ textAlign: 'left', marginBottom: '20px' }}>
            <label style={{ color: '#888', fontSize: '0.8rem', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
              <Mail size={14} style={{ marginRight: '5px', verticalAlign: 'middle' }} /> CORREO ELECTRÓNICO
            </label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="socio@elite.com"
              style={{ width: '100%', padding: '15px', background: '#020406', border: '1px solid #222', borderRadius: '12px', color: 'white', outline: 'none' }}
            />
          </div>

          <div style={{ textAlign: 'left', marginBottom: '30px' }}>
            <label style={{ color: '#888', fontSize: '0.8rem', fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>
              <Lock size={14} style={{ marginRight: '5px', verticalAlign: 'middle' }} /> CONTRASEÑA
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPass ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: '100%', padding: '15px', background: '#020406', border: '1px solid #222', borderRadius: '12px', color: 'white', outline: 'none' }}
              />
              <button 
                type="button" 
                onClick={() => setShowPass(!showPass)}
                style={{ position: 'absolute', right: '15px', top: '15px', background: 'none', border: 'none', color: '#444', cursor: 'pointer' }}
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div style={{ background: 'rgba(255,68,68,0.1)', color: '#ff4444', padding: '15px', borderRadius: '12px', marginBottom: '25px', fontSize: '0.85rem', border: '1px solid rgba(255,68,68,0.2)' }}>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '18px', 
              background: '#00C853', 
              color: 'black', 
              borderRadius: '12px', 
              fontWeight: 900, 
              fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              border: 'none',
              transition: '0.3s'
            }}>
            {loading ? <Loader2 className="animate-spin" style={{ margin: '0 auto' }} /> : 'INGRESAR AL PANEL'}
          </button>
        </form>

        <p style={{ marginTop: '30px', color: '#444', fontSize: '0.85rem' }}>
          ¿No tienes cuenta? <span onClick={() => router.push('/unete')} style={{ color: '#00C853', cursor: 'pointer', fontWeight: 'bold' }}>Únete aquí</span>
        </p>
      </div>

      <style jsx global>{`
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}