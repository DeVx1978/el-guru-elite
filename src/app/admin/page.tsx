"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Users, Trash2, Eye, EyeOff, Lock, KeyRound, LoaderCircle, CheckCircle, PowerOff, ShieldCheck } from 'lucide-react';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function PaginaAdminFinal() { // CAMBIAMOS EL NOMBRE AQUÍ PARA FORZAR VERCEL
  const [isLocked, setIsLocked] = useState(true);
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [socios, setSocios] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const MASTER_KEY = "GURU2026";

  const cargarSocios = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('socios_elite').select('*'); 
      if (error) throw error;
      setSocios(data || []);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLocked) cargarSocios();
  }, [isLocked]);

  const toggleEstatus = async (id: any, estatus: string) => {
    const nuevo = estatus === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';
    setLoading(true);
    await supabase.from('socios_elite').update({ estatus_pago: nuevo }).eq('id', id);
    await cargarSocios();
    setLoading(false);
  };

  if (isLocked) {
    return (
      <div style={{ backgroundColor: '#020406', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontFamily: 'sans-serif' }}>
        <div style={{ textAlign: 'center', background: '#0a0c10', padding: '50px', borderRadius: '30px', border: '1px solid #00C853', width: '380px' }}>
          <ShieldCheck size={60} color="#00C853" style={{ marginBottom: '20px' }} />
          <h2 style={{ marginBottom: '25px' }}>CENTRO DE MANDO</h2>
          <div style={{ position: 'relative', marginBottom: '25px' }}>
            <input 
              type={showPass ? "text" : "password"} 
              placeholder="LLAVE MAESTRA" 
              onChange={(e) => setPass(e.target.value)}
              style={{ padding: '18px', borderRadius: '15px', border: '1px solid #222', backgroundColor: '#020406', color: '#00C853', textAlign: 'center', width: '100%' }}
            />
            <button onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#444' }}>
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button onClick={() => pass === MASTER_KEY ? setIsLocked(false) : alert("ERROR")} style={{ width: '100%', padding: '18px', background: '#00C853', color: 'black', borderRadius: '15px', fontWeight: 900 }}>DESBLOQUEAR</button>
        </div>
      </div>
    );
  }

  return (
    <main style={{ backgroundColor: '#020406', minHeight: '100vh', color: 'white', padding: '40px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#00C853' }}>DIRECTORIO GURÚ ÉLITE V3</h1>
      <div style={{ background: '#0a0c10', borderRadius: '20px', border: '1px solid #111', marginTop: '30px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#111', color: '#555', fontSize: '12px' }}>
              <th style={{ padding: '20px', textAlign: 'left' }}>SOCIO</th>
              <th style={{ padding: '20px' }}>ESTADO</th>
              <th style={{ padding: '20px' }}>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {socios.map((s) => (
              <tr key={s.id} style={{ borderBottom: '1px solid #111' }}>
                <td style={{ padding: '20px' }}>{s.nombre_completo}<br/><span style={{fontSize:'12px', color:'#00C853'}}>{s.id_socio}</span></td>
                <td style={{ padding: '20px', textAlign:'center' }}>
                  <span style={{ color: s.estatus_pago === 'ACTIVO' ? '#00C853' : '#ff9800' }}>{s.estatus_pago || 'PENDIENTE'}</span>
                </td>
                <td style={{ padding: '20px', textAlign:'center' }}>
                   <button onClick={() => toggleEstatus(s.id, s.estatus_pago)} style={{ background: '#111', border: '1px solid #222', color: s.estatus_pago === 'ACTIVO' ? '#ff9800' : '#00C853', padding: '10px', borderRadius: '10px' }}>
                      {s.estatus_pago === 'ACTIVO' ? <PowerOff size={18} /> : <CheckCircle size={18} />}
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}