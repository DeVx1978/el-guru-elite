"use client";
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");
  const [mostrarClave, setMostrarClave] = useState(false);
  const [cargando, setCargando] = useState(false);
  const router = useRouter();

  const manejarLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    try {
      const { data, error } = await supabase
        .from('socios_elite')
        .select('*')
        .eq('id_socio', email.trim())
        .single();

      if (error || !data) {
        alert("Socio no encontrado");
      } else if (data.clave_acceso !== clave) {
        alert("Clave incorrecta");
      } else if (data.estatus_pago !== 'ACTIVO') {
        alert("Cuenta pendiente de activación");
      } else {
        localStorage.setItem('socio_nombre', data.nombre_completo);
        router.push('/panel'); 
      }
    } catch (err) {
      alert("Error de conexión");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#020406', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <form onSubmit={manejarLogin} style={{ background: '#0a0c10', padding: '40px', borderRadius: '30px', border: '1px solid #111', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ color: '#00C853', textAlign: 'center', fontWeight: 900 }}>EL GURÚ</h2>
        <p style={{ color: '#555', textAlign: 'center', fontSize: '12px', marginBottom: '30px' }}>ACCESO EXCLUSIVO</p>

        <input 
          type="email" 
          placeholder="Tu correo" 
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '18px', borderRadius: '15px', marginBottom: '15px', border: '1px solid #222', background: '#020406', color: 'white' }}
        />

        <div style={{ position: 'relative', marginBottom: '30px' }}>
          <input 
            type={mostrarClave ? "text" : "password"} 
            placeholder="Tu clave" 
            onChange={(e) => setClave(e.target.value)}
            required
            style={{ width: '100%', padding: '18px', borderRadius: '15px', border: '1px solid #222', background: '#020406', color: 'white' }}
          />
          <button type="button" onClick={() => setMostrarClave(!mostrarClave)} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#444', cursor: 'pointer' }}>
            {mostrarClave ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button type="submit" disabled={cargando} style={{ width: '100%', padding: '18px', background: '#00C853', color: 'black', borderRadius: '15px', fontWeight: 900, border: 'none', cursor: 'pointer' }}>
          {cargando ? <LoaderCircle className="animate-spin" /> : "ENTRAR AL PANEL"}
        </button>
      </form>
    </div>
  );
}