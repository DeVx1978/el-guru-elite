"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const clientSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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
      cargarDatosMaster();
    }
  }, [router]);

  const cargarDatosMaster = async () => {
    try {
      const { data: eliteData } = await clientSupabase.from('socios_elite').select('*');
      const { data: baseSocios } = await clientSupabase.from('socios').select('id, nombre');

      if (eliteData && baseSocios) {
        const sociosCombinados = eliteData.map(elite => ({
          ...elite,
          nombre_socio: baseSocios.find(s => s.id === elite.id_socio)?.nombre || 'Socio Sin Nombre'
        }));
        const capital = eliteData.reduce((acc, curr) => acc + Number(curr.inversion_minima || 0), 0);
        setSocios(sociosCombinados);
        setStats({ totalCapital: capital, sociosActivos: eliteData.length });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{background:'#000',color:'#00C853',height:'100vh',display:'flex',justifyContent:'center',align:'center'}}>CARGANDO...</div>;

  return (
    <div style={{background:'#000', color:'#fff', minHeight:'100vh', padding:'40px', fontFamily:'sans-serif'}}>
      <h1 style={{color:'#00C853'}}>Torre de Control Admin</h1>
      <div style={{display:'flex', gap:'20px', marginBottom:'40px'}}>
        <div style={{border:'1px solid #111', padding:'20px', borderRadius:'10px'}}>
          <p style={{fontSize:'12px', color:'#444'}}>CAPITAL TOTAL</p>
          <h2 style={{color:'#00C853'}}>${stats.totalCapital.toLocaleString()}</h2>
        </div>
        <div style={{border:'1px solid #111', padding:'20px', borderRadius:'10px'}}>
          <p style={{fontSize:'12px', color:'#444'}}>SOCIOS ACTIVOS</p>
          <h2>{stats.sociosActivos}</h2>
        </div>
      </div>

      <table style={{width:'100%', borderCollapse:'collapse'}}>
        <thead>
          <tr style={{color:'#444', textAlign:'left', fontSize:'12px'}}>
            <th style={{padding:'10px'}}>NOMBRE</th>
            <th>PAÍS</th>
            <th>CAPITAL</th>
          </tr>
        </thead>
        <tbody>
          {socios.map(s => (
            <tr key={s.id} style={{borderBottom:'1px solid #111'}}>
              <td style={{padding:'15px 10px'}}>{s.nombre_socio}</td>
              <td>{s.pais}</td>
              <td style={{color:'#00C853'}}>${Number(s.inversion_minima).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => router.push('/panel')} style={{marginTop:'40px', background:'#111', color:'#fff', border:'none', padding:'10px 20px', cursor:'pointer'}}>VOLVER AL PANEL</button>
    </div>
  );
}