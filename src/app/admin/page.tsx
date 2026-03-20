"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function AdminPage() {
  const [socios, setSocios] = useState<any[]>([]);
  const [errorLocal, setErrorLocal] = useState("");

  useEffect(() => {
    const fetchSocios = async () => {
      // SOLO pedimos las columnas que SÍ existen en tu tabla
      const { data, error } = await supabase
        .from('socios_elite')
        .select('id_socio, nombre_completo, clave_acceso'); 
      
      if (error) {
        setErrorLocal(error.message);
      } else {
        setSocios(data || []);
      }
    };
    fetchSocios();
  }, []);

  return (
    <div style={{ padding: '40px', color: 'white', background: '#020406', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#00C853' }}>CENTRO DE MANDO (MODO COMPATIBLE)</h1>
      
      {errorLocal && <p style={{ color: 'red' }}>Error: {errorLocal}</p>}

      <div style={{ marginTop: '20px' }}>
        <p>Socios detectados: {socios.length}</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '1px solid #222' }}>
              <th style={{ padding: '10px' }}>Nombre</th>
              <th style={{ padding: '10px' }}>Email (ID)</th>
              <th style={{ padding: '10px' }}>Clave</th>
            </tr>
          </thead>
          <tbody>
            {socios.map((s, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #111' }}>
                <td style={{ padding: '10px' }}>{s.nombre_completo}</td>
                <td style={{ padding: '10px' }}>{s.id_socio}</td>
                <td style={{ padding: '10px' }}>{s.clave_acceso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}