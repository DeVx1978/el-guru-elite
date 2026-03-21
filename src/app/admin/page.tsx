"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Trash2, Eye, EyeOff, CheckCircle, PowerOff, ShieldCheck, Image as ImageIcon, Mail, Phone, Loader2 } from 'lucide-react';

const clientSupabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function AdminControlMasterV4() {
  const [bloqueado, setBloqueado] = useState(true);
  const [claveMaestra, setClaveMaestra] = useState("");
  const [verClave, setVerClave] = useState(false);
  const [listaSocios, setListaSocios] = useState<any[]>([]);
  const [cargando, setCargando] = useState(false);

  const KEY_ACCESO = "GURU2026";

  // --- OBTENER DATOS ---
  const obtenerDatos = async () => {
    setCargando(true);
    const { data, error } = await clientSupabase
      .from('socios')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error("Error al obtener socios:", error.message);
    setListaSocios(data || []);
    setCargando(false);
  };

  useEffect(() => { if (!bloqueado) obtenerDatos(); }, [bloqueado]);

  // --- ACTIVAR / DESACTIVAR SOCIO ---
  const alternarEstado = async (id: any, actual: string) => {
    const nuevoEstado = actual === 'activo' ? 'pendiente' : 'activo';
    const { error } = await clientSupabase
      .from('socios')
      .update({ estado: nuevoEstado })
      .eq('id', id);
    
    if (!error) obtenerDatos();
  };

  // --- ELIMINAR REGISTRO (CIRUGÍA QUIRÚRGICA) ---
  const eliminarRegistro = async (id: any, nombre: string) => {
    const confirmacion = window.confirm(`⚠️ ¿ELIMINAR DEFINITIVAMENTE A ${nombre.toUpperCase()}?\nEsta acción borrará al socio de la base de datos para siempre.`);
    
    if (confirmacion) {
      setCargando(true);
      try {
        const { error } = await clientSupabase
          .from('socios')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        
        // Refresco inmediato de la lista
        await obtenerDatos();
        alert("Socio eliminado con éxito.");
      } catch (error: any) {
        alert("ERROR: No se pudo eliminar. Probablemente Supabase tiene el RLS (seguridad) activado para borrados.");
        console.error("Error detallado:", error.message);
      } finally {
        setCargando(false);
      }
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
              onKeyDown={(e) => e.key === 'Enter' && (claveMaestra === KEY_ACCESO ? setBloqueado(false) : alert("LLAVE ERRÓNEA"))}
              onChange={(e) => setClaveMaestra(e.target.value)}
              style={{ padding: '18px', borderRadius: '15px', border: '1px solid #222', backgroundColor: '#020406', color: '#00C853', textAlign: 'center', width: '100%', outline: 'none' }}
            />
            <button type="button" onClick={() => setVerClave(!verClave)} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#444', cursor: 'pointer' }}>
              {verClave ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <button onClick={() => claveMaestra === KEY_ACCESO ? setBloqueado(false) : alert("LLAVE ERRÓNEA")} style={{ width: '100%', padding: '18px', background: '#00C853', color: 'black', borderRadius: '15px', fontWeight: 900, cursor: 'pointer' }}>DESBLOQUEAR</button>
        </div>
      </div>
    );
  }

  return (
    <main style={{ backgroundColor: '#020406', minHeight: '100vh', color: 'white', padding: '40px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#00C853', fontWeight: 900, margin: 0 }}>DIRECTORIO GURÚ ÉLITE V4</h1>
        <button onClick={obtenerDatos} style={{ background: '#111', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {cargando && <Loader2 size={16} className="animate-spin" />}
          {cargando ? 'PROCESANDO...' : 'REFRESCAR LISTA'}
        </button>
      </div>

      <div style={{ background: '#0a0c10', borderRadius: '25px', border: '1px solid #111', marginTop: '30px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#111', color: '#555', fontSize: '11px', textTransform: 'uppercase' }}>
              <th style={{ padding: '25px', textAlign: 'left' }}>Socio / Contacto</th>
              <th style={{ padding: '25px', textAlign: 'center' }}>Plan / Pago</th>
              <th style={{ padding: '25px', textAlign: 'center' }}>Estado</th>
              <th style={{ padding: '25px', textAlign: 'center' }}>Acciones Ejecutivas</th>
            </tr>
          </thead>
          <tbody>
            {listaSocios.length === 0 ? (
              <tr><td colSpan={4} style={{padding: '50px', textAlign: 'center', color: '#444'}}>No hay registros en la tabla 'socios'</td></tr>
            ) : (
              listaSocios.map((s) => (
                <tr key={s.id} style={{ borderBottom: '1px solid #111' }}>
                  <td style={{ padding: '25px' }}>
                    <b style={{fontSize: '16px', color: 'white'}}>{s.nombre}</b>
                    <div style={{display: 'flex', gap: '10px', marginTop: '5px', color: '#666', fontSize: '12px'}}>
                      <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}><Mail size={12}/> {s.email}</span>
                      <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}><Phone size={12}/> {s.telefono}</span>
                    </div>
                  </td>
                  <td style={{ padding: '25px', textAlign: 'center' }}>
                    <span style={{ color: '#888', display: 'block', fontSize: '13px', fontWeight: 'bold' }}>{s.plan?.toUpperCase()}</span>
                    <a href={s.comprobante_url} target="_blank" rel="noreferrer" style={{ color: '#00C853', fontSize: '11px', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', marginTop: '5px' }}>
                      <ImageIcon size={14}/> VER PAGO
                    </a>
                  </td>
                  <td style={{ padding: '25px', textAlign: 'center' }}>
                    <span style={{ 
                      backgroundColor: s.estado === 'activo' ? 'rgba(0, 200, 83, 0.1)' : 'rgba(255, 152, 0, 0.1)', 
                      color: s.estado === 'activo' ? '#00C853' : '#ff9800', 
                      padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase' 
                    }}>
                      {s.estado || 'PENDIENTE'}
                    </span>
                  </td>
                  <td style={{ padding: '25px' }}>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                      <button 
                        onClick={() => alternarEstado(s.id, s.estado)} 
                        style={{ background: s.estado === 'activo' ? '#1a1005' : '#051a0b', border: '1px solid #222', color: s.estado === 'activo' ? '#ff9800' : '#00C853', padding: '12px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 'bold' }}
                      >
                        {s.estado === 'activo' ? <PowerOff size={16} /> : <CheckCircle size={16} />}
                        {s.estado === 'activo' ? 'DESACTIVAR' : 'ACTIVAR'}
                      </button>
                      <button 
                        onClick={() => eliminarRegistro(s.id, s.nombre)} 
                        style={{ background: '#1a0505', border: '1px solid #300', color: '#ff4444', padding: '12px', borderRadius: '12px', cursor: 'pointer' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <style jsx global>{`
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </main>
  );
}