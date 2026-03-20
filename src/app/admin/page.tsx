"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function AdminPage() {
  const [socios, setSocios] = useState<any[]>([]);

  useEffect(() => {
    const fetchSocios = async () => {
      const { data } = await supabase.from('socios_elite').select('*');
      if (data) setSocios(data);
    };
    fetchSocios();
  }, []);

  return (
    <div style={{ p: '40px', color: 'white', background: '#020406', minHeight: '100vh' }}>
      <h1>CONTROL DE SOCIOS (ACTUALIZADO)</h1>
      <ul>
        {socios.map(s => (
          <li key={s.id}>{s.nombre_completo} - {s.id_socio}</li>
        ))}
      </ul>
    </div>
  );
}