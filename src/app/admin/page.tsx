"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Users, Trash2, Eye, Lock, KeyRound, LoaderCircle, ShieldCheck } from 'lucide-react';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function AdminControlTotal() {
  const [isLocked, setIsLocked] = useState(true);
  const [pass, setPass] = useState("");
  const [socios, setSocios] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const MASTER_KEY = "GURU2026";

  const cargarSocios = async () => {
    setLoading(true);
    try {
      // Sincronizado con tus columnas reales
      const { data, error } = await supabase
        .from('socios_elite')
        .select('id, id_socio, nombre_completo, clave_acceso'); 

      if (error) throw error;
      setSocios(data || []);
    } catch (error: any) {
      console.error("❌ Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLocked) cargarSocios();
  }, [isLocked]);

  const eliminarSocio = async (id: any, nombre: string) => {
    if (confirm(`⚠️ ¿ELIMINAR PERMANENTEMENTE A ${nombre}?`)) {
      const { error } = await supabase.from('socios_elite').delete().eq('id', id);
      if (!error) cargarSocios();
    }
  };

  if (isLocked) {
    return (
      <div style={{ backgroundColor: '#020406', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontFamily: 'sans-serif' }}>
        <div style={{ textAlign: 'center', background: '#0a0c10', padding: '50px', borderRadius: '30px', border: '1px solid #00C853', width: '380px', boxShadow: '0 0 30px rgba(0, 200, 83, 0.1)' }}>
          <Lock size={60} color="#00C853" style={{ marginBottom: '20px' }} />
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, textTransform: 'uppercase' }}>Centro de Mando</h2>
          <input 
            type="password" 
            placeholder="LLAVE MAESTRA" 
            onChange={(e) => setPass(e.target.value)}
            style={{ padding: '18px', borderRadius: '12px', border: '1px solid #222', backgroundColor: '#020406', color: '#00C853', textAlign: 'center', width: '100%', fontSize: '18px', margin: '20px 0', outline: 'none' }}
          />
          <button 
            onClick={() => pass === MASTER_KEY ? setIsLocked(false) : alert("ACCESO DENEGADO")} 
            style={{ width: '100%', padding: '18px', background: '#00C853', color: 'black', border: 'none', borderRadius: '12px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <KeyRound size={18} /> DESBLOQUEAR
          </button>
        </div>
      </div>
    );
  }

  return (
    <main style={{ backgroundColor: '#020406', minHeight: '100vh', color: 'white', padding: '40px 5%', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #111', paddingBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#00C853', margin: 0 }}>DIRECTORIO ÉLITE</h1>
          <p style={{ fontSize: '10px', color: '#555', letterSpacing: '1px' }}>GESTIÓN DE SOCIOS ACTIVOS | STATUS: ONLINE</p>
        </div>
        <button onClick={() => setIsLocked(true)} style={{ background: 'none', color: '#ff4444', border: '1px solid #ff4444', padding: '10px 20px', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>CERRAR SESIÓN</button>
      </div>

      <div style={{ background: '#0a0c10', padding: '30px', borderRadius: '25px', border: '1px solid #111', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ background: 'rgba(0, 200, 83, 0.1)', padding: '20px', borderRadius: '20px' }}>
          <Users size={35} color="#00C853" />
        </div>
        <div>
          <h2 style={{ fontSize: '40px', margin: 0, fontWeight: 900 }}>{socios.length}</h2>
          <p style={{ fontSize: '11px', color: '#444', fontWeight: 'bold' }}>SOCIOS REGISTRADOS</p>
        </div>
      </div>

      <div style={{ background: '#0a0c10', borderRadius: '30px', border: '1px solid #111', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#111', color: '#666', fontSize: '12px', textTransform: 'uppercase' }}>
              <th style={{ padding: '25px' }}>Socio / Identificación</th>
              <th style={{ padding: '25px' }}>Clave de Acceso</th>
              <th style={{ padding: '25px', textAlign: 'center' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={3} style={{ padding: '50px', textAlign: 'center' }}><LoaderCircle className="animate-spin" size={40} color="#00C853" /></td></tr>
            ) : socios.map((s) => (
              <tr key={s.id} style={{ borderBottom: '1px solid #111' }}>
                <td style={{ padding: '25px' }}>
                  <b style={{ fontSize: '16px', color: 'white' }}>{s.nombre_completo}</b><br />
                  <span style={{ fontSize: '13px', color: '#00C853' }}>{s.id_socio}</span>
                </td>
                <td style={{ padding: '25px', fontFamily: 'monospace', color: '#888' }}>{s.clave_acceso}</td>
                <td style={{ padding: '25px' }}>
                  <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                    <button onClick={() => alert(`Socio: ${s.nombre_completo}\nID: ${s.id_socio}\nClave: ${s.clave_acceso}`)} style={{ background: '#111', border: '1px solid #222', color: '#00C853', padding: '12px', borderRadius: '12px', cursor: 'pointer' }}><Eye size={18} /></button>
                    <button onClick={() => eliminarSocio(s.id, s.nombre_completo)} style={{ background: '#111', border: '1px solid #300', color: '#ff4444', padding: '12px', borderRadius: '12px', cursor: 'pointer' }}><Trash2 size={18} /></button>
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