"use client";
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Camera, LoaderCircle, ArrowRight } from 'lucide-react';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function RegistroElitePerfecto() {
  const [paso, setPaso] = useState(1);
  const [enviando, setEnviando] = useState(false);
  const [datos, setDatos] = useState({ nombre: "", email: "", pass: "", plan: "", pais: "", metodo: "" });
  const [archivo, setArchivo] = useState<File | null>(null);
  const router = useRouter();

  const planes = ["BRONCE ($100)", "PLATA ($500)", "ORO ($1,000)", "PLATINO ($5,000)", "DIAMANTE ($10,000)"];
  const bancos: any = {
    "Ecuador": ["Banco Pichincha", "Banco Guayaquil", "Nequi", "Western Union", "USDT"],
    "Colombia": ["Bancolombia", "Davivienda", "Nequi", "Western Union", "USDT"]
  };

  const irAPlanes = () => {
    if (!datos.nombre || !datos.email || !datos.pass) return alert("Completa tus datos de acceso.");
    alert("⚠️ REGISTRO INICIADO: Para pertenecer a la Élite, ahora debes realizar el pago de tu membresía.");
    setPaso(2);
  };

  const finalizarRegistro = async () => {
    if (!archivo) return alert("Error: Debes subir la imagen de tu pago.");
    setEnviando(true);
    try {
      const nombreFoto = `${Date.now()}-${archivo.name}`;
      await supabase.storage.from('comprobantes').upload(nombreFoto, archivo);
      const { error } = await supabase.from('socios_elite').insert([{
        nombre_completo: datos.nombre,
        id_socio: datos.email.toLowerCase().trim(),
        clave_acceso: datos.pass,
        plan_elegido: datos.plan,
        pais_pago: datos.pais,
        metodo_usado: datos.metodo,
        url_comprobante: nombreFoto,
        estatus_pago: 'PENDIENTE_VERIFICACION'
      }]);
      if (error) throw error;
      alert("🚀 SOLICITUD ENVIADA: Tu operación será verificada. Serás activado en cuanto confirmemos el pago.");
      router.push('/login');
    } catch (e: any) {
      alert("Error: " + e.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#020406', minHeight: '100vh', display: 'flex', justifyContent: 'center', padding: '40px 20px', color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#0a0c10', padding: '40px', borderRadius: '30px', border: '1px solid #00C853', width: '100%', maxWidth: '480px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <ShieldCheck size={40} color="#00C853" style={{ margin: '0 auto 10px' }} />
          <h2 style={{ fontSize: '1.1rem', fontWeight: 900 }}>PASO {paso} DE 4</h2>
        </div>

        {paso === 1 && (
          <div>
            <input type="text" placeholder="Nombre completo" onChange={e => setDatos({...datos, nombre: e.target.value})} style={estStyle} />
            <input type="email" placeholder="Email" onChange={e => setDatos({...datos, email: e.target.value})} style={estStyle} />
            <input type="password" placeholder="Clave" onChange={e => setDatos({...datos, pass: e.target.value})} style={estStyle} />
            <button onClick={irAPlanes} style={btnStyle}>REGISTRARSE <ArrowRight size={18} /></button>
          </div>
        )}

        {paso === 2 && (
          <div style={{ display: 'grid', gap: '10px' }}>
            {planes.map(p => <button key={p} onClick={() => { setDatos({...datos, plan: p}); setPaso(3); }} style={pStl}>{p}</button>)}
          </div>
        )}

        {paso === 3 && (
          <div>
            <select onChange={e => setDatos({...datos, pais: e.target.value})} style={estStyle}>
              <option value="">-- Selecciona País --</option>
              <option value="Ecuador">Ecuador 🇪🇨</option>
              <option value="Colombia">Colombia 🇨🇴</option>
            </select>
            {datos.pais && (
              <div style={{ marginTop: '20px' }}>
                {bancos[datos.pais].map((m: any) => (
                  <button key={m} onClick={() => { setDatos({...datos, metodo: m}); setPaso(4); }} style={estStyle}>{m}</button>
                ))}
              </div>
            )}
          </div>
        )}

        {paso === 4 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ background: '#020406', padding: '30px', borderRadius: '25px', border: '1px dashed #222', marginBottom: '20px' }}>
              <Camera size={30} color="#00C853" style={{ marginBottom: '10px' }} />
              <p style={{ fontSize: '11px' }}>Sube el pago de <b>{datos.metodo}</b></p>
              <input type="file" onChange={e => setArchivo(e.target.files?.[0] || null)} style={{ marginTop: '15px' }} />
            </div>
            <button onClick={finalizarRegistro} disabled={enviando} style={btnStyle}>
              {enviando ? <LoaderCircle className="animate-spin" /> : "CONFIRMAR REGISTRO Y PAGO"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const estStyle = { width: '100%', padding: '16px', borderRadius: '12px', background: '#020406', border: '1px solid #222', color: 'white', marginBottom: '15px', outline: 'none' };
const btnStyle = { width: '100%', padding: '18px', background: '#00C853', color: 'black', borderRadius: '12px', fontWeight: 900, cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' };
const pStl = { padding: '18px', background: '#020406', border: '1px solid #222', borderRadius: '15px', color: 'white', cursor: 'pointer', textAlign: 'left' };