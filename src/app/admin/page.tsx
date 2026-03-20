"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Conexión directa
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminPage() {
  const [socios, setSocios] = useState<any[]>([]);
  const [errorLocal, setErrorLocal] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSocios = async () => {
      try {
        // Pedimos solo lo que existe en tu captura de pantalla
        const { data, error } = await supabase
          .from('socios_elite')
          .select('id_socio, nombre_completo, clave_acceso'); 
        
        if (error) throw error;
        setSocios(data || []);
      } catch (err: any) {
        setErrorLocal(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSocios();
  }, []);

  return (
    <div style={{ padding: '40px', color: 'white', background: '#020406', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#00C853', borderBottom: '2px solid #00C853', paddingBottom: '10px' }}>
        CENTRO DE MANDO ÉLITE
      </h1>
      
      {loading && <p>Cargando registros de Supabase...</p>}
      {errorLocal && <p style={{ color: '#ff4444', background: 'rgba(255,0,0,0.1)', padding: '10px' }}>⚠️ Error: {errorLocal}</p>}

      <div style={{ marginTop: '30px' }}>
        <h2 style={{ fontSize: '1.2rem' }}>Socios en Base de Datos: {socios.length}</h2>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', background: '#0a0c10', borderRadius: '10px', overflow: 'hidden' }}>
          <thead>
            <tr style={{ textAlign: 'left', background: '#111', color: '#00C853' }}>
              <th style={{ padding: '15px' }}>NOMBRE COMPLETO</th>
              <th style={{ padding: '15px' }}>ID / EMAIL</th>
              <th style={{ padding: '15px' }}>CLAVE ACCESO</th>
            </tr>
          </thead>
          <tbody>
            {socios.map((s, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #111' }}>
                <td style={{ padding: '15px' }}>{s.nombre_completo}</td>
                <td style={{ padding: '15px', color: '#888' }}>{s.id_socio}</td>
                <td style={{ padding: '15px', fontFamily: 'monospace' }}>{s.clave_acceso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}