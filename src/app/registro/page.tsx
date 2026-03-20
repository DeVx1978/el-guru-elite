"use client";
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Camera, LoaderCircle } from 'lucide-react';

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function RegElite() {
  const [paso, setPaso] = useState(1);
  const [load, setLoad] = useState(false);
  const [d, setD] = useState({ n: "", e: "", p: "", pl: "", pa: "", m: "" });
  const [f, setF] = useState<File | null>(null);
  const nav = useRouter();

  const planes = ["BRONCE ($100)", "PLATA ($500)", "ORO ($1,000)", "PLATINO ($5,000)", "DIAMANTE ($10,000)"];
  const bancos: any = {
    "Ecuador": ["Pichincha", "Guayaquil", "Nequi", "Western", "USDT"],
    "Colombia": ["Bancolombia", "Davivienda", "Nequi", "Western", "USDT"]
  };

  const irP = () => { if (!d.n || !d.e || !d.p) return alert("Datos incompletos"); alert("⚠️ PAGO REQUERIDO: Selecciona tu plan."); setPaso(2); };

  const fin = async () => {
    if (!f) return alert("Sube el pago"); setLoad(true);
    try {
      const fn = `${Date.now()}-${f.name}`;
      await sb.storage.from('comprobantes').upload(fn, f);
      await sb.from('socios_elite').insert([{ nombre_completo: d.n, id_socio: d.e, clave_acceso: d.p, plan_elegido: d.pl, pais_pago: d.pa, metodo_usado: d.m, url_comprobante: fn, estatus_pago: 'PENDIENTE' }]);
      alert("🚀 SOLICITUD ENVIADA: Verificaremos tu pago."); nav.push('/login');
    } catch (e: any) { alert(e.message); } finally { setLoad(false); }
  };

  const sI = { width: '100%', padding: '15px', borderRadius: '10px', background: '#020406', border: '1px solid #222', color: 'white', marginBottom: '10px' };
  const sB = { width: '100%', padding: '18px', background: '#00C853', color: 'black', borderRadius: '10px', fontWeight: 900, cursor: 'pointer', border: 'none' };

  return (
    <div style={{ backgroundColor: '#020406', minHeight: '100vh', display: 'flex', justifyContent: 'center', padding: '40px 20px', color: 'white' }}>
      <div style={{ background: '#0a0c10', padding: '40px', borderRadius: '30px', border: '1px solid #00C853', width: '100%', maxWidth: '450px' }}>
        <h2 style={{ textAlign: 'center' }}>PASO {paso}</h2>
        {paso === 1 && (<div><input placeholder="Nombre" onChange={e=>setD({...d,n:e.target.value})} style={sI}/><input placeholder="Email" onChange={e=>setD({...d,e:e.target.value})} style={sI}/><input type="password" placeholder="Clave" onChange={e=>setD({...d,p:e.target.value})} style={sI}/><button onClick={irP} style={sB}>REGISTRARSE</button></div>)}
        {paso === 2 && (<div>{planes.map(p=><button key={p} onClick={()=>{setD({...d,pl:p});setPaso(3)}} style={{...sI,textAlign:'left'}}>{p}</button>)}</div>)}
        {paso === 3 && (<div><select onChange={e=>setD({...d,pa:e.target.value})} style={sI}><option value="">-- País --</option><option value="Ecuador">Ecuador</option><option value="Colombia">Colombia</option></select>
          {d.pa && bancos[d.pa].map((m:any)=><button key={m} onClick={()=>{setD({...d,m:m});setPaso(4)}} style={sI}>{m}</button>)}</div>)}
        {paso === 4 && (<div style={{textAlign:'center'}}><Camera size={30}/><input type="file" onChange={e=>setF(e.target.files?.[0]||null)} style={{margin:'20px 0'}}/>
          <button onClick={fin} disabled={load} style={sB}>{load?"ENVIANDO...":"CONFIRMAR PAGO"}</button></div>)}
      </div>
    </div>
  );
}