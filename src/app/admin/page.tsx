"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Users, Trash2, Eye, EyeOff, Lock, KeyRound, LoaderCircle } from 'lucide-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

export default function AdminControlTotal() {
  const [isLocked, setIsLocked] = useState(true);
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false); // Para ver/ocultar la llave maestra
  const [socios, setSocios] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const MASTER_KEY = "GURU2026";

  const cargarSocios = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('socios_elite')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSocios(data || []);
    } catch (error: any) {
      console.error("❌ Error de conexión:", error.message);
      alert("Error al conectar con la base de datos: Verifica las columnas en Supabase.");
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
      if (!error) await cargarSocios();
      setLoading(false);
    }
  };

  if (isLocked) {
    return (
      <div style={{ backgroundColor: '#020406', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontFamily: 'sans-serif' }}>
        <div style={{ textAlign: 'center', background: '#0a0c10', padding: '40px', borderRadius: '25px', border: '1px solid #00C853', width: '350px' }}>
          <Lock size={50} color="#00C853" style={{ marginBottom: '20px' }} />
          <h2 style={{ fontWeight: 900, marginBottom: '20px' }}>ACCESO RESTRINGIDO</h2>
          
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <input 
              type={showPass ? "text" : "password"} 
              placeholder="Llave Maestra" 
              onChange={(e) => setPass(e.target.value)}
              style={{ padding: '15px', borderRadius: '10px', border: '1px solid #222', backgroundColor: '#020406', color: '#00C853', width: '100%', textAlign: 'center', outline: 'none', fontSize: '16px' }}
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
            style={{ width: '100%', padding: '15px', background: '#00C853', color: 'black', border: 'none', borderRadius: '10px', fontWeight: 900, cursor: 'pointer' }}>
            DESBLOQUEAR
          </button>
        </div>
      </div>
    );
  }

  return (
    <main style={{ backgroundColor: '#020406', minHeight: '100vh', color: 'white', padding: '30px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <h1 style={{ color: '#00C853', fontWeight: 900, fontSize: '1.5rem' }}>CENTRO DE MANDO</h1>
        <button onClick={() => setIsLocked(true)} style={{ color: '#ff4444', border: '1px solid #ff4444', background: 'none', padding: '8px 15px', borderRadius: '8px', cursor: 'pointer' }}>SALIR</button>
      </div>

      <div style={{ background: '#0a0c10', padding: '20px', borderRadius: '20px', border: '1px solid #111', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '30px', fontWeight: 900, margin: 0 }}>{socios.length}</h2>
        <p style={{ color: '#444', fontSize: '12px' }}>SOCIOS EN EL SISTEMA</p>
      </div>

      <div style={{ background: '#0a0c10', borderRadius: '20px', border: '1px solid #111', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#111', fontSize: '12px', color: '#666' }}>
              <th style={{ padding: '15px', textAlign: 'left' }}>SOCIO</th>
              <th style={{ padding: '15px', textAlign: 'center' }}>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={2} style={{ padding: '30px', textAlign: 'center' }}><LoaderCircle className="animate-spin" /></td></tr>
            ) : socios.map((s: any) => (
              <tr key={s.id} style={{ borderBottom: '1px solid #111' }}>
                <td style={{ padding: '15px' }}>
                  <div style={{ fontWeight: 'bold' }}>{s.nombre_completo}</div>
                  <div style={{ fontSize: '11px', color: '#555' }}>{s.id_socio}</div>
                </td>
                <td style={{ padding: '15px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <button onClick={() => verExpediente(s)} style={{ background: '#111', border: '1px solid #222', color: '#00C853', padding: '5px', borderRadius: '5px' }}><Eye size={16} /></button>
                    <button onClick={() => eliminarSocio(s.id, s.nombre_completo)} style={{ background: '#111', border: '1px solid #300', color: '#ff4444', padding: '5px', borderRadius: '5px' }}><Trash2 size={16} /></button>
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