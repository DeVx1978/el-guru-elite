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

  // VALIDACIÓN QUIRÚRGICA PASO 1
  const irAPlanes = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.n || !form.e || !form.p) {
      return alert("Error: Todos los campos son obligatorios.");
    }
    alert("⚠️ REGISTRO INICIADO: Los datos se han guardado temporalmente. Selecciona tu plan y adjunta el pago para finalizar.");
    setPaso(2);
  };

  // FUNCIÓN FINAL: ÚNICA QUE TOCA LA BASE DE DATOS
  const finalizar = async () => {
    if (!foto) return alert("Error: Debe subir la foto del comprobante de pago.");
    setLoad(true);
    try {
      const nom = `${Date.now()}-${foto.name.replace(/\s+/g, '_')}`;
      
      // 1. Subir imagen
      const { error: upErr } = await sb.storage.from('comprobantes').upload(nom, foto);
      if (upErr) throw new Error("Error al subir imagen: " + upErr.message);

      // 2. Insertar en DB (Solo ocurre aquí)
      const { error: dbErr } = await sb.from('socios_elite').insert([{
        nombre_completo: form.n, 
        id_socio: form.e.toLowerCase().trim(),
        clave_acceso: form.p, 
        plan_elegido: form.pl,
        pais_pago: form.pa, 
        metodo_usado: form.m,
        url_comprobante: nom, 
        estatus_pago: 'PENDIENTE'
      }]);
      
      if (dbErr) throw dbErr;

      alert("🚀 SOLICITUD ENVIADA: Revisaremos tu pago y activaremos tu cuenta pronto.");
      nav.push('/login');
    } catch (e: any) { 
      alert("Error en el proceso: " + e.message); 
    } finally { 
      setLoad(false); 
    }
  };

  const stI = { width: '100%', padding: '15px', borderRadius: '12px', background: '#020406', border: '1px solid #222', color: 'white', marginBottom: '12px', outline: 'none' };
  const stB = { width: '100%', padding: '18px', background: '#00C853', color: 'black', borderRadius: '12px', fontWeight: 900, cursor: 'pointer', border: 'none' };

  return (
    <div style={{ backgroundColor: '#020406', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', color: 'white' }}>
      <div style={{ background: '#0a0c10', padding: '40px', borderRadius: '30px', border: '1px solid #00C853', width: '100%', maxWidth: '450px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <ShieldCheck size={45} color="#00C853" style={{ margin: '0 auto 10px' }} />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>PASO {paso} DE 4</h2>
          <div style={{ width: '100%', height: '4px', background: '#111', borderRadius: '10px', marginTop: '10px' }}>
            <div style={{ width: `${(paso/4)*100}%`, height: '100%', background: '#00C853', borderRadius: '10px', transition: '0.3s' }}></div>
          </div>
        </div>

        {paso === 1 && (
          <form onSubmit={irAPlanes}>
            <input placeholder="Nombre completo" required onChange={e=>setForm({...form,n:e.target.value})} style={stI}/>
            <input type="email" placeholder="Email" required onChange={e=>setForm({...form,e:e.target.value})} style={stI}/>
            <input type="password" placeholder="Clave de acceso" required onChange={e=>setForm({...form,p:e.target.value})} style={stI}/>
            <button type="submit" style={stB}>CONTINUAR</button>
          </form>
        )}

        {paso === 2 && (
          <div style={{ display: 'grid', gap: '10px' }}>
            <p style={{ textAlign: 'center', fontSize: '13px', marginBottom: '10px' }}>Selecciona tu plan de inversión:</p>
            {planes.map(p=><button key={p} onClick={()=>{setForm({...form,pl:p});setPaso(3)}} style={{...stI, textAlign:'left', border:'1px solid #333'}}>{p}</button>)}
          </div>
        )}

        {paso === 3 && (
          <div>
            <select onChange={e=>setForm({...form,pa:e.target.value})} style={stI}>
              <option value="">-- Selecciona tu País --</option>
              <option value="Ecuador">Ecuador 🇪🇨</option>
              <option value="Colombia">Colombia 🇨🇴</option>
            </select>
            {form.pa && (
              <div style={{ marginTop: '10px' }}>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>Método de pago en {form.pa}:</p>
                {bancos[form.pa].map((m:any)=><button key={m} onClick={()=>{setForm({...form,m:m});setPaso(4)}} style={stI}>{m}</button>)}
              </div>
            )}
          </div>
        )}

        {paso === 4 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ background: '#020406', padding: '20px', borderRadius: '15px', border: '1px dashed #00C853', marginBottom: '20px' }}>
              <Camera size={40} color="#00C853" style={{ marginBottom: '10px' }} />
              <p style={{ fontSize: '12px' }}>Adjunta captura de pago por:<br/><b>{form.m}</b></p>
              <input type="file" accept="image/*" onChange={e=>setFoto(e.target.files?.[0]||null)} style={{ marginTop: '20px', fontSize: '12px' }}/>
            </div>
            <button onClick={finalizar} disabled={load} style={stB}>
              {load ? <LoaderCircle className="animate-spin" style={{ margin: '0 auto' }} /> : "FINALIZAR REGISTRO"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}