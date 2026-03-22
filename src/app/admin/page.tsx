"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

// Inicialización ultra-segura
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const clientSupabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AdminPanel() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [socios, setSocios] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalCapital: 0, sociosActivos: 0 });

  useEffect(() => {
    const rol = localStorage.getItem('socio_rol');
    if (rol !== 'admin') {
      router.push('/panel');
    } else {
      cargarDatos();
    }
  }, [router]);

  const cargarDatos = async () => {
    try {
      const { data: elite } = await clientSupabase.from('socios_elite').select('*');
      const { data: base } = await clientSupabase.from('socios').select('id, nombre');

      if (elite && base) {
        const combinados = elite.map((e: any) => ({
          ...e,
          nombre: base.find((s: any) => s.id === e.id_socio)?.nombre || 'Socio'
        }));
        const total = elite.reduce((acc: number, curr: any) => acc + Number(curr.inversion_minima || 0), 0);
        setSocios(combinados);
        setStats({ totalCapital: total, sociosActivos: elite.length });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{padding:'20px', color:'#00C853'}}>CONECTANDO...</div>;

  return (
    <div style={{background:'#000', color:'#fff', minHeight:'100vh', padding:'20px', fontFamily:'sans-serif'}}>
      <h1 style={{color:'#00C853'}}>ADMINISTRACIÓN GURÚ</h1>
      <div style={{display:'flex', gap:'20px', marginBottom:'20px'}}>
        <div style={{border:'1px solid #222', padding:'15px', borderRadius:'10px'}}>
          <p style={{margin:0, fontSize:'12px'}}>CAPITAL TOTAL</p>
          <h2 style={{margin:0, color:'#00C853'}}>${stats.totalCapital.toLocaleString()}</h2>
        </div>
        <div style={{border:'1px solid #222', padding:'15px', borderRadius:'10px'}}>
          <p style={{margin:0, fontSize:'12px'}}>SOCIOS</p>
          <h2 style={{margin:0}}>{stats.sociosActivos}</h2>
        </div>
      </div>
      <table style={{width:'100%', borderCollapse:'collapse'}}>
        <thead>
          <tr style={{textAlign:'left', borderBottom:'1px solid #222', color:'#444'}}>
            <th style={{padding:'10px'}}>SOCIO</th>
            <th>PAÍS</th>
            <th>INVERSIÓN</th>
          </tr>
        </thead>
        <tbody>
          {socios.map((s, i) => (
            <tr key={i} style={{borderBottom:'1px solid #111'}}>
              <td style={{padding:'10px'}}>{s.nombre}</td>
              <td>{s.pais}</td>
              <td style={{color:'#00C853'}}>${Number(s.inversion_minima).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}