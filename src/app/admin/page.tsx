"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Trash2, Eye, EyeOff, Lock, KeyRound, LoaderCircle, CheckCircle, PowerOff, ShieldCheck } from 'lucide-react';

const clientSupabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function AdminControlMasterV4() { // Versión 4
  const [bloqueado, setBloqueado] = useState(true);
  const [claveMaestra, setClaveMaestra] = useState("");
  const [verClave, setVerClave] = useState(false);
  const [listaSocios, setListaSocios] = useState<any[]>([]);
  const [cargando, setCargando] = useState(false);

  const KEY_ACCESO = "GURU2026";

  const obtenerDatos = async () => {
    setCargando(true);
    const { data } = await clientSupabase.from('socios_elite').select('*');
    setListaSocios(data || []);
    setCargando(false);
  };

  useEffect(() => { if (!bloqueado) obtenerDatos(); }, [bloqueado]);

  const alternarEstado = async (id: any, actual: string) => {
    const nuevo = actual === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
    await clientSupabase.from('socios_elite').update({ estatus_pago: nuevo }).eq('id', id);
    obtenerDatos();
  };

  const eliminarRegistro = async (id: any, nombre: string) => {
    if (confirm(`⚠️ ¿ELIMINAR A ${nombre}?`)) {
      await clientSupabase.from('socios_elite').delete().eq('id', id);
      obtenerDatos();
    }
  };

  if (bloqueado) {
    return (
      <div style={{ backgroundColor: '#020406', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontFamily: 'sans-serif' }}>
        <div style={{ textAlign: 'center', background: '#0a0c10', padding: '50px', borderRadius: '30px', border: '2px solid #00C853', width: '380px' }}>
          <ShieldCheck size={60} color="#00C853" style={{ marginBottom: '20px' }} />
          <h2 style={{ marginBottom: '25px', fontWeight: 900 }}>CENTRO DE MANDO V4</h2>
          <div style={{ position: 'relative', marginBottom: '25px' }}>
            <input 
              type={verClave ? "text" : "password"} 
              placeholder="LLAVE MAESTRA" 
              onChange={(e) => setClaveMaestra(e.target.value)}
              style={{ padding: '18px', borderRadius: '15px', border: '1px solid #222', backgroundColor: '#020406', color: '#00C853', textAlign: 'center', width: '100%', outline: 'none' }}
            />
            <button type="button" onClick={() => setVerClave(!verClave)} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#444' }}>
              {verClave ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button onClick={() => claveMaestra === KEY_ACCESO ? setBloqueado(false) : alert("LLAVE ERRÓNEA")} style={{ width: '100%', padding: '18px', background: '#00C853', color: 'black', borderRadius: '15px', fontWeight: 900 }}>DESBLOQUEAR</button>
        </div>
      </div>
    );
  }

  return (
    <main style={{ backgroundColor: '#020406', minHeight: '100vh', color: 'white', padding: '40px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#00C853', fontWeight: 900 }}>DIRECTORIO GURÚ ÉLITE V4</h1>
      <div style={{ background: '#0a0c10', borderRadius: '25px', border: '1px solid #111', marginTop: '30px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#111', color: '#555', fontSize: '11px', textTransform: 'uppercase' }}>
              <th style={{ padding: '25px', textAlign: 'left' }}>Socio</th>
              <th style={{ padding: '25px', textAlign: 'center' }}>Estado</th>
              <th style={{ padding: '25px', textAlign: 'center' }}>Acciones Ejecutivas</th>
            </tr>
          </thead>
          <tbody>
            {listaSocios.map((s) => (
              <tr key={s.id} style={{ borderBottom: '1px solid #111' }}>
                <td style={{ padding: '25px' }}>
                  <b style={{fontSize: '15px'}}>{s.nombre_completo}</b><br/><span style={{color:'#00C853', fontSize:'12px'}}>{s.id_socio}</span>
                </td>
                <td style={{ padding: '25px', textAlign: 'center' }}>
                  <span style={{ color: s.estatus_pago === 'ACTIVO' ? '#00C853' : '#ff9800', fontWeight: 900, fontSize: '12px' }}>
                    {s.estatus_pago || 'PENDIENTE'}
                  </span>
                </td>
                <td style={{ padding: '25px' }}>
                  <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                    <button onClick={() => alternarEstado(s.id, s.estatus_pago)} title="Cambiar Estado" style={{ background: '#020406', border: '1px solid #222', color: s.estatus_pago === 'ACTIVO' ? '#ff9800' : '#00C853', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}>
                      {s.estatus_pago === 'ACTIVO' ? <PowerOff size={18} /> : <CheckCircle size={18} />}
                    </button>
                    <button onClick={() => eliminarRegistro(s.id, s.nombre_completo)} title="Eliminar Socio" style={{ background: '#020406', border: '1px solid #300', color: '#ff4444', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}>
                      <Trash2 size={18} />
                    </button>
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