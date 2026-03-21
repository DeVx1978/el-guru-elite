"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Trash2, Eye, EyeOff, CheckCircle, ShieldCheck, Image as ImageIcon, Mail, Phone, Lock, Globe, RefreshCw } from 'lucide-react';

const clientSupabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function AdminControlMasterV4() {
  const [bloqueado, setBloqueado] = useState(true);
  const [claveMaestra, setClaveMaestra] = useState("");
  const [verClave, setVerClave] = useState(false);
  const [listaSocios, setListaSocios] = useState<any[]>([]);
  const [cargando, setCargando] = useState(false);

  const KEY_ACCESO = "GURU2026";

  const obtenerDatos = async () => {
    setCargando(true);
    const { data, error } = await clientSupabase
      .from('socios')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) alert("Error al cargar: " + error.message);
    setListaSocios(data || []);
    setCargando(false);
  };

  useEffect(() => { if (!bloqueado) obtenerDatos(); }, [bloqueado]);

  const activarSocio = async (id: any) => {
    const { error } = await clientSupabase
      .from('socios')
      .update({ estado: 'activo' })
      .eq('id', id);
    
    if (error) {
      alert("Error al activar: " + error.message);
    } else {
      obtenerDatos(); // Recarga la lista para mostrar el cambio
    }
  };

  const eliminarRegistro = async (id: any, nombre: string) => {
    if (confirm(`⚠️ ¿ELIMINAR DEFINITIVAMENTE A ${nombre}?`)) {
      await clientSupabase.from('socios').delete().eq('id', id);
      obtenerDatos();
    }
  };

  if (bloqueado) {
    return (
      <div style={{ backgroundColor: '#020406', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontFamily: 'sans-serif' }}>
        <div style={{ textAlign: 'center', background: '#0a0c10', padding: '50px', borderRadius: '30px', border: '2px solid #00C853', width: '380px', boxShadow: '0 0 50px rgba(0,200,83,0.1)' }}>
          <ShieldCheck size={60} color="#00C853" style={{ marginBottom: '20px' }} />
          <h2 style={{ marginBottom: '25px', fontWeight: 900, letterSpacing: '2px' }}>CENTRO DE MANDO V4</h2>
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <input 
              type={verClave ? "text" : "password"} 
              placeholder="LLAVE MAESTRA" 
              onChange={(e) => setClaveMaestra(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (claveMaestra === KEY_ACCESO ? setBloqueado(false) : alert("LLAVE ERRÓNEA"))}
              style={{ padding: '18px', borderRadius: '15px', border: '1px solid #222', backgroundColor: '#020406', color: '#00C853', textAlign: 'center', width: '100%', outline: 'none', fontSize: '1rem' }}
            />
          </div>
          <button onClick={() => claveMaestra === KEY_ACCESO ? setBloqueado(false) : alert("LLAVE ERRÓNEA")} style={{ width: '100%', padding: '18px', background: '#00C853', color: 'black', borderRadius: '15px', fontWeight: 900, cursor: 'pointer', border: 'none' }}>ACCEDER AL SISTEMA</button>
        </div>
      </div>
    );
  }

  return (
    <main style={{ backgroundColor: '#020406', minHeight: '100vh', color: 'white', padding: '40px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ color: '#00C853', fontWeight: 900, fontSize: '2rem', margin: 0 }}>DIRECTORIO GURÚ ÉLITE V4</h1>
          <p style={{ color: '#555', margin: '5px 0 0 0' }}>Gestión de membresías y verificación de pagos</p>
        </div>
        <button onClick={obtenerDatos} style={{ background: '#0a0c10', color: '#00C853', border: '1px solid #00C853', padding: '12px 25px', borderRadius: '12px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <RefreshCw size={18} className={cargando ? 'animate-spin' : ''} /> REFRESCAR LISTA
        </button>
      </div>

      <div style={{ background: '#0a0c10', borderRadius: '25px', border: '1px solid #111', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#111', color: '#555', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              <th style={{ padding: '25px', textAlign: 'left' }}>Socio e Información de Acceso</th>
              <th style={{ padding: '25px', textAlign: 'center' }}>Detalles de Compra</th>
              <th style={{ padding: '25px', textAlign: 'center' }}>Estado Actual</th>
              <th style={{ padding: '25px', textAlign: 'center' }}>Acciones Ejecutivas</th>
            </tr>
          </thead>
          <tbody>
            {listaSocios.map((s) => (
              <tr key={s.id} style={{ borderBottom: '1px solid #111', transition: '0.3s' }}>
                <td style={{ padding: '25px' }}>
                  <b style={{fontSize: '18px', color: 'white', display: 'block', marginBottom: '8px'}}>{s.nombre}</b>
                  <div style={{ fontSize: '13px', color: '#888', display: 'grid', gap: '6px' }}>
                    <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}><Mail size={14} color="#00C853"/> {s.email}</span>
                    <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}><Lock size={14} color="#ff4444"/> <b style={{color: '#ff4444'}}>Pass:</b> <span style={{color: '#fff', background: '#222', padding: '2px 6px', borderRadius: '4px'}}>{s.password}</span></span>
                    <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}><Phone size={14} color="#00C853"/> {s.telefono}</span>
                    <span style={{display: 'flex', alignItems: 'center', gap: '8px'}}><Globe size={14} color="#00C853"/> {s.pais || 'No especificado'}</span>
                  </div>
                </td>
                <td style={{ padding: '25px', textAlign: 'center' }}>
                  <div style={{ background: '#020406', padding: '15px', borderRadius: '15px', border: '1px solid #111' }}>
                    <b style={{ color: '#00C853', fontSize: '14px', display: 'block', marginBottom: '8px' }}>{s.plan?.toUpperCase()}</b>
                    <a href={s.comprobante_url} target="_blank" rel="noreferrer" style={{ color: 'white', textDecoration: 'none', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', background: '#111', padding: '6px', borderRadius: '6px' }}>
                      <ImageIcon size={14}/> VER COMPROBANTE
                    </a>
                  </div>
                </td>
                <td style={{ padding: '25px', textAlign: 'center' }}>
                  <span style={{ 
                    background: s.estado === 'activo' ? 'rgba(0, 200, 83, 0.1)' : 'rgba(255, 152, 0, 0.1)', 
                    color: s.estado === 'activo' ? '#00C853' : '#ff9800', 
                    padding: '10px 20px', borderRadius: '12px', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', border: s.estado === 'activo' ? '1px solid #00C85330' : '1px solid #ff980030' 
                  }}>
                    {s.estado || 'PENDIENTE'}
                  </span>
                </td>
                <td style={{ padding: '25px' }}>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    {s.estado !== 'activo' ? (
                      <button onClick={() => activarSocio(s.id)} style={{ background: '#00C853', color: 'black', border: 'none', padding: '12px 20px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                        <CheckCircle size={18} /> ACTIVAR SOCIO
                      </button>
                    ) : (
                      <div style={{ color: '#555', fontSize: '12px', fontWeight: 'bold' }}>YA ACTIVADO</div>
                    )}
                    <button onClick={() => eliminarRegistro(s.id, s.nombre)} style={{ background: '#1a0505', border: '1px solid #300', color: '#ff4444', padding: '12px', borderRadius: '12px', cursor: 'pointer' }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx global>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </main>
  );
}