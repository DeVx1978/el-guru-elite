"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const Eye = ({ s }: { s: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={s ? "#00C853" : "#444"} strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    {!s && <line x1="1" y1="1" x2="23" y2="23" stroke="#444" />}
  </svg>
);

export default function AdminPage() {
  const [pendientes, setPendientes] = useState<any[]>([]);
  const [msg, setMsg] = useState('');
  const [op, setOp] = useState({ titulo: '', desc: '' });
  const [passAdmin, setPassAdmin] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const planesCapital: any = { 'Micro': 100, 'Inicial': 250, 'Activo': 500, 'Premium': 1000, 'Elite': 1500 };

  useEffect(() => { if (isAdmin) cargarDatos(); }, [isAdmin]);

  const cargarDatos = async () => {
    const { data } = await supabase.from('socios_elite').select('*').eq('estatus_pago', 'EN REVISIÓN');
    if (data) setPendientes(data);
  };

  const entrarAdmin = (e: any) => {
    e.preventDefault();
    if (passAdmin === 'ELGURU2026') setIsAdmin(true);
    else alert('❌ CLAVE INCORRECTA');
  };

  const activarSocio = async (socio: any) => {
    const nombrePlan = socio.plan_elegido.split(' ')[0];
    const { error } = await supabase.from('socios_elite').update({
      estatus_pago: 'ACTIVO', nivel_socio: `Socio ${nombrePlan}`,
      inversion_minima: planesCapital[nombrePlan] || 0, porcentaje_utilidad: 0 
    }).eq('id_socio', socio.id_socio);
    if (!error) { setMsg('✅ Socio Activado'); cargarDatos(); setTimeout(() => setMsg(''), 3000); }
  };

  const publicarOp = async (e: any) => {
    e.preventDefault();
    await supabase.from('operaciones_monitor').insert([{ titulo: op.titulo.toUpperCase(), descripcion: op.desc }]);
    setOp({ titulo: '', desc: '' }); setMsg('📢 Publicado'); setTimeout(() => setMsg(''), 3000);
  };

  if (!isAdmin) return (
    <main style={cnt}>
      <form onSubmit={entrarAdmin} style={cardAdmin}>
        <h2 style={{ color: '#00C853', textAlign: 'center', marginBottom: '20px' }}>CENTRO DE MANDO</h2>
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <input type={showPass ? "text" : "password"} style={iN} placeholder="CLAVE MAESTRA" onChange={e => setPassAdmin(e.target.value)} autoFocus />
          <button type="button" onClick={() => setShowPass(!showPass)} style={btnEye}><Eye s={showPass}/></button>
        </div>
        <button type="submit" style={bT}>DESBLOQUEAR</button>
      </form>
    </main>
  );

  return (
    <main style={{ backgroundColor: '#020406', minHeight: '100vh', padding: '40px', color: 'white', fontFamily: 'Arial' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1a1d23', paddingBottom: '20px', marginBottom: '40px', alignItems: 'center' }}>
        <div><h1 style={{ color: '#00C853', fontSize: '20px' }}>EL GURÚ ÉLITE</h1><p style={{ fontSize: '10px', color: '#444' }}>GESTIÓN V1.0</p></div>
        <button onClick={() => window.location.href = '/panel'} style={btnV}>SALIR AL PANEL</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={fS}>
          <h3 style={sT}>PAGOS PENDIENTES ({pendientes.length})</h3>
          {pendientes.map(p => (
            <div key={p.id_socio} style={pCard}>
              <div style={{flex:1}}><b>{p.nombre_completo}</b><p style={{fontSize:'11px'}}>{p.plan_elegido}</p></div>
              <button onClick={() => activarSocio(p)} style={btnCheck}>ACTIVAR</button>
            </div>
          ))}
        </div>
        <form onSubmit={publicarOp} style={fS}>
          <h3 style={sT}>PUBLICAR OPERACIÓN</h3>
          <input style={iN} placeholder="TÍTULO" value={op.titulo} onChange={e => setOp({...op, titulo: e.target.value})} required />
          <textarea style={{...iN, height:'100px', resize: 'none'}} placeholder="MENSAJE..." value={op.desc} onChange={e => setOp({...op, desc: e.target.value})} required />
          <button type="submit" style={{...bT, backgroundColor:'#fff', color:'#000'}}>PUBLICAR</button>
        </form>
      </div>
      {msg && <div style={toast}>{msg}</div>}
    </main>
  );
}

const cnt:any={backgroundColor:'#020406',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center',fontFamily:'Arial'};
const cardAdmin:any={width:'380px',padding:'40px',backgroundColor:'#0a0c10',borderRadius:'24px',border:'1px solid #1a1d23'};
const iN:any={width:'100%',backgroundColor:'#05070a',border:'1px solid #1a1d23',padding:'15px',color:'white',borderRadius:'10px',outline:'none'};
const bT:any={width:'100%',backgroundColor:'#00C853',color:'black',padding:'15px',borderRadius:'10px',fontWeight:'bold',border:'none',cursor:'pointer'};
const btnEye:any={position:'absolute',right:'15px',top:'15px',background:'none',border:'none',cursor:'pointer'};
const fS:any={padding:'30px',backgroundColor:'#0a0c10',borderRadius:'20px',border:'1px solid #1a1d23'};
const pCard:any={display:'flex',padding:'15px',backgroundColor:'#000',borderRadius:'12px',marginBottom:'10px',border:'1px solid #1a1d23',alignItems:'center'};
const btnCheck:any={backgroundColor:'#00C853',color:'black',padding:'8px 15px',borderRadius:'8px',fontWeight:'bold',cursor:'pointer',border:'none',fontSize:'11px'};
const btnV:any={backgroundColor:'transparent',color:'#444',border:'1px solid #1a1d23',padding:'10px 20px',borderRadius:'8px',cursor:'pointer',fontSize:'11px'};
const sT:any={fontSize:'11px',color:'#444',marginBottom:'20px',fontWeight:'bold'};
const toast:any={position:'fixed',bottom:'20px',right:'20px',backgroundColor:'#00C853',color:'black',padding:'15px',borderRadius:'10px',fontWeight:'bold'};