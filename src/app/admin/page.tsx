"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Users, Trash2, Eye, EyeOff, Lock, KeyRound, LoaderCircle } from 'lucide-react';

// Conexión con Bypass de Caché y Sesión
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '', {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
});

export default function AdminControlTotal() {
  const [isLocked, setIsLocked] = useState(true);
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [socios, setSocios] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const MASTER_KEY = "GURU2026";

  const cargarSocios = async () => {
    setLoading(true);
    try {
      // Forzamos la consulta a las columnas exactas de tu imagen
      const { data, error } = await supabase
        .from('socios_elite')
        .select('id, nombre_completo, id_socio, clave_acceso, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSocios(data || []);
    } catch (error: any) {
      console.error("❌ Error de conexión:", error.message);
      // Si el error persiste, el mensaje nos dirá exactamente qué columna falla
      alert("Error de sincronización: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLocked) cargarSocios();
  }, [isLocked]);

  const verExpediente = (socio: any) => {
    alert(
      `--- EXPEDIENTE DE SOCIO ---\n\n` +
      `NOMBRE: ${socio.nombre_completo || 'N/A'}\n` +
      `EMAIL: ${socio.id_socio || 'N/A'}\n` +
      `CLAVE: ${socio.clave_acceso || 'N/A'}\n` +
      `FECHA: ${new Date(socio.created_at).toLocaleString()}`
    );
  };

  const eliminarSocio = async (id: any, nombre: string) => {
    if (confirm(`⚠️ ¿ELIMINAR A ${nombre}?`)) {
      setLoading(true);
      const { error } = await supabase.from('socios_elite').delete().eq('id', id);
      if (!error) {
        await cargarSocios();
      } else {
        alert("No se pudo eliminar: " + error.message);
      }
      setLoading(false);
    }
  };

  if (isLocked) {
    return (
      <div style={{ backgroundColor: '#020406', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontFamily: 'sans-serif' }}>
        <div style={{ textAlign: 'center', background: '#0a0c10', padding: '40px', borderRadius: '25px', border: '1px solid #00C853', width: '350px', boxShadow: '0 0 40px rgba(0,200,83,0.1)' }}>
          <Lock size={50} color="#00C853" style={{ marginBottom: '20px' }} />
          <h2 style={{ fontWeight: 900, marginBottom: '20px', letterSpacing: '1px' }}>ACCESO RESTRINGIDO</h2>
          
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <input 
              type={showPass ? "text" : "password"} 
              placeholder="Llave Maestra" 
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              style={{ padding: '15px', borderRadius: '10px', border: '1px solid #222', backgroundColor: '#020406', color: '#00C853', width: '100%', textAlign: 'center', outline: 'none', fontSize: '16px', letterSpacing: showPass ? '0' : '4px' }}
            />
            <button 
              type="button"
              onClick={() => setShowPass(!showPass)}
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#444', cursor: 'pointer' }}
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button 
            onClick={() => pass === MASTER_KEY ? setIsLocked(false) : alert("LLAVE INCORRECTA")} 
            style={{ width: '100%', padding: '15px', background: '#00C853', color: 'black', border: 'none', borderRadius: '10px', fontWeight: 900, cursor: 'pointer', transition: '0.3s' }}>
            DESBLOQUEAR
          </button>
        </div>
      </div>
    );
  }

  return (
    <main style={{ backgroundColor: '#020406', minHeight: '100vh', color: 'white', padding: '30px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', alignItems: 'center' }}>
        <h1 style={{ color: '#00C853', fontWeight: 900, fontSize: '1.5rem', margin: 0 }}>CENTRO DE MANDO</h1>
        <button onClick={() => setIsLocked(true)} style={{ color: '#ff4444', border: '1px solid #ff4444', background: 'rgba(255,68,68,0.05)', padding: '8px 20px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>SALIR</button>
      </div>

      <div style={{ background: '#0a0c10', padding: '25px', borderRadius: '20px', border: '1px solid #111', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ background: 'rgba(0,200,83,0.1)', padding: '15px', borderRadius: '15px' }}>
            <Users size={30} color="#00C853" />
        </div>
        <div>
            <h2 style={{ fontSize: '32px', fontWeight: 900, margin: 0 }}>{socios.length}</h2>
            <p style={{ color: '#444', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}>Socios en el sistema</p>
        </div>
      </div>

      <div style={{ background: '#0a0c10', borderRadius: '20px', border: '1px solid #111', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#111', fontSize: '11px', color: '#555', textTransform: 'uppercase' }}>
              <th style={{ padding: '20px', textAlign: 'left' }}>Información del Socio</th>
              <th style={{ padding: '20px', textAlign: 'center' }}>Gestión</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={2} style={{ padding: '50px', textAlign: 'center' }}><LoaderCircle className="animate-spin" size={30} color="#00C853" style={{ margin: '0 auto' }} /></td></tr>
            ) : socios.length === 0 ? (
              <tr><td colSpan={2} style={{ padding: '50px', textAlign: 'center', color: '#333' }}>No hay registros encontrados.</td></tr>
            ) : socios.map((s: any) => (
              <tr key={s.id} style={{ borderBottom: '1px solid #080808' }}>
                <td style={{ padding: '20px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#eee' }}>{s.nombre_completo}</div>
                  <div style={{ fontSize: '12px', color: '#00C853', marginTop: '4px' }}>{s.id_socio}</div>
                </td>
                <td style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                    <button title="Ver Expediente" onClick={() => verExpediente(s)} style={{ background: '#020406', border: '1px solid #222', color: '#00C853', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}><Eye size={18} /></button>
                    <button title="Eliminar" onClick={() => eliminarSocio(s.id, s.nombre_completo)} style={{ background: '#020406', border: '1px solid #300', color: '#ff4444', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}