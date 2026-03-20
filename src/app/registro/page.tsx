"use client";
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Camera, LoaderCircle, ArrowRight } from 'lucide-react';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function RegistroElite() {
  const [paso, setPaso] = useState(1);
  const [loading, setLoading] = useState(false);
  const [datos, setDatos] = useState({ n: "", e: "", p: "", pl: "", pa: "", m: "" });
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const planes = ["BRONCE ($100)", "PLATA ($500)", "ORO ($1,000)", "PLATINO ($5,000)", "DIAMANTE ($10,000)"];
  const bancos: any = {
    "Ecuador": ["Banco Pichincha", "Banco Guayaquil", "Nequi", "Western Union", "USDT"],
    "Colombia": ["Bancolombia", "Davivienda", "Nequi", "Western Union", "USDT"]
  };

  const irAPagar = () => {
    if (!datos.n || !datos.e || !datos.p) return alert("Llena tus datos.");
    alert("⚠️ REGISTRO INICIADO: Procede a pagar tu membresía para ser activado.");
    setPaso(2);
  };

  const enviar = async () => {
    if (!file) return alert("Sube el pago.");
    setLoading(true);
    try {
      const fileName = `${Date.now()}-${file.name}`;
      await supabase.storage.from('comprobantes').upload(fileName, file);
      const { error } = await supabase.from('socios_elite').insert([{
        nombre_completo: datos.n,
        id_socio: datos.e.toLowerCase().trim(),
        clave_acceso: datos.p,
        plan_elegido: datos.pl,
        pais_pago: datos.pa,
        metodo_usado: datos.m,
        url_comprobante: fileName,
        estatus_pago: 'PENDIENTE_VERIFICACION'
      }]);
      if (error) throw error;
      alert("🚀 SOLICITUD ENVIADA: Tu operación será verificada minuciosamente.");
      router.push('/login');
    } catch (e: any) { alert(e.message); } finally { setLoading(false); }
  };

  const iS = { width: '100%', padding: '15px', borderRadius: '10px', background: '#020406', border: '1px solid #222', color: 'white', marginBottom: '15px' };
  const bS = { width: '100%', padding: '18px', background: '#00C853', color: 'black', borderRadius: '10px', fontWeight: 900, cursor: 'pointer', border: 'none' };

  return (
    <div style={{ backgroundColor: '#020406', minHeight: '100vh', display: 'flex', justifyContent: 'center', padding: '40px 20px', color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#0a0c10', padding: '40px', borderRadius: '30px', border: '1px solid #00C853', width: '100%', maxWidth: '480px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}><ShieldCheck size={40} color="#00C853" /><h2 style={{ fontSize: '1.2rem' }}>PASO {paso}</h2></div>
        {paso === 1 && (
          <div>
            <input type="text" placeholder="Nombre" onChange={e => setDatos({...datos, n: e.target.value})} style={iS} />
            <input type="email" placeholder="Email" onChange={e => setDatos({...datos, e: e.target.value})} style={iS} />
            <input type="password" placeholder="Clave" onChange={e => setDatos({...datos, p: e.target.value})} style={iS} />
            <button onClick={irAPagar} style={bS}>REGISTRARSE</button>
          </div>
        )}
        {paso === 2 && (
          <div style={{ display: 'grid', gap: '10px' }}>
            {planes.map(p => <button key={p} onClick={() => { setDatos({...datos, pl: p}); setPaso(3); }} style={{...iS, textAlign: 'left'}}>{p}</button>)}
          </div>
        )}
        {paso === 3 && (
          <div>
            <select onChange={e => setDatos({...datos, pa: e.target.value})} style={iS}><option value="">-- País --</option><option value="Ecuador">Ecuador</option><option value="Colombia">Colombia</option></select>
            {datos.pa && bancos[datos.pa].map((m: any) => <button key={m} onClick={() => { setDatos({...datos, m: m}); setPaso(4); }} style={iS}>{m}</button>)}
          </div>
        )}
        {paso === 4 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ background: '#020406', padding: '25px', borderRadius: '20px', border: '1px dashed #333', marginBottom: '20px' }}>
              <Camera size={30} color="#00C853" /><input type="file" onChange={e => setFile(e.target.files?.[0] || null)} style={{ marginTop: '15px' }} />
            </div>
            <button onClick={enviar} disabled={loading} style={bS}>{loading ? "ENVIANDO..." : "CONFIRMAR REGISTRO Y PAGO"}</button>
          </div>
        )}
      </div>
    </div>
  );
}