"use client";
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Camera, LoaderCircle } from 'lucide-react';

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function RegistroElite() {
  const [paso, setPaso] = useState(1);
  const [load, setLoad] = useState(false);
  const [form, setForm] = useState({ n: "", e: "", p: "", pl: "", pa: "", m: "" });
  const [foto, setFoto] = useState<File | null>(null);
  const nav = useRouter();

  const planes = ["BRONCE ($100)", "PLATA ($500)", "ORO ($1,000)", "PLATINO ($5,000)", "DIAMANTE ($10,000)"];
  const bancos: any = {
    "Ecuador": ["Pichincha", "Guayaquil", "Nequi", "Western Union", "USDT"],
    "Colombia": ["Bancolombia", "Davivienda", "Nequi", "Western Union", "USDT"]
  };

  const irAPlanes = () => {
    if (!form.n || !form.e || !form.p) return alert("Faltan datos");
    alert("⚠️ REGISTRO INICIADO: Selecciona tu plan y paga para activar tu cuenta.");
    setPaso(2);
  };

  const finalizar = async () => {
    if (!foto) return alert("Sube el comprobante");
    setLoad(true);
    try {
      const nom = `${Date.now()}-${foto.name}`;
      await sb.storage.from('comprobantes').upload(nom, foto);
      const { error } = await sb.from('socios_elite').insert([{
        nombre_completo: form.n, id_socio: form.e.toLowerCase().trim(),
        clave_acceso: form.p, plan_elegido: form.pl,
        pais_pago: form.pa, metodo_usado: form.m,
        url_comprobante: nom, estatus_pago: 'PENDIENTE'
      }]);
      if (error) throw error;
      alert("🚀 ENVIADO: Tu pago será verificado pronto.");
      nav.push('/login');
    } catch (e: any) { alert(e.message); } finally { setLoad(false); }
  };

  const stI = { width: '100%', padding: '15px', borderRadius: '10px', background: '#020406', border: '1px solid #222', color: 'white', marginBottom: '10px' };
  const stB = { width: '100%', padding: '18px', background: '#00C853', color: 'black', borderRadius: '10px', fontWeight: 900, cursor: 'pointer', border: 'none' };

  return (
    <div style={{ backgroundColor: '#020406', minHeight: '100vh', display: 'flex', justifyContent: 'center', padding: '20px', color: 'white' }}>
      <div style={{ background: '#0a0c10', padding: '40px', borderRadius: '30px', border: '1px solid #00C853', width: '100%', maxWidth: '450px' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}><ShieldCheck size={40} color="#00C853" /><h2>PASO {paso}</h2></div>
        {paso === 1 && (<div><input placeholder="Nombre" onChange={e=>setForm({...form,n:e.target.value})} style={stI}/><input placeholder="Email" onChange={e=>setForm({...form,e:e.target.value})} style={stI}/><input type="password" placeholder="Clave" onChange={e=>setForm({...form,p:e.target.value})} style={stI}/><button onClick={irAPlanes} style={stB}>CONTINUAR</button></div>)}
        {paso === 2 && (<div>{planes.map(p=><button key={p} onClick={()=>{setForm({...form,pl:p});setPaso(3)}} style={{...stI,textAlign:'left'}}>{p}</button>)}</div>)}
        {paso === 3 && (<div><select onChange={e=>setForm({...form,pa:e.target.value})} style={stI}><option value="">-- País --</option><option value="Ecuador">Ecuador</option><option value="Colombia">Colombia</option></select>
          {form.pa && bancos[form.pa].map((m:any)=><button key={m} onClick={()=>{setForm({...form,m:m});setPaso(4)}} style={stI}>{m}</button>)}</div>)}
        {paso === 4 && (<div style={{textAlign:'center'}}><Camera size={30}/><input type="file" onChange={e=>setFoto(e.target.files?.[0]||null)} style={{margin:'20px 0'}}/><button onClick={finalizar} disabled={load} style={stB}>{load?"ENVIANDO...":"CONFIRMAR PAGO"}</button></div>)}
      </div>
    </div>
  );
}