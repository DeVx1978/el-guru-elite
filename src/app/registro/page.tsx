"use client";
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Camera, LoaderCircle, ArrowRight } from 'lucide-react';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function RegistroPro() {
  const [paso, setPaso] = useState(1);
  const [enviando, setEnviando] = useState(false);
  const [form, setForm] = useState({ nombre: "", email: "", pass: "", plan: "", pais: "", metodo: "" });
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const planes = ["BRONCE ($100)", "PLATA ($500)", "ORO ($1,000)", "PLATINO ($5,000)", "DIAMANTE ($10,000)"];
  const opciones = {
    "Ecuador": ["Banco Pichincha", "Banco Guayaquil", "Nequi", "Western Union", "USDT"],
    "Colombia": ["Bancolombia", "Davivienda", "Nequi", "Western Union", "USDT"]
  };

  const irAPagar = () => {
    if (!form.nombre || !form.email || !form.pass) return alert("Faltan datos");
    alert("⚠️ REGISTRO INICIADO: Realiza el pago para continuar.");
    setPaso(2);
  };

  const confirmarTodo = async () => {
    if (!file) return alert("Sube el comprobante");
    setEnviando(true);
    try {
      const fileName = `${Date.now()}-${file.name}`;
      await supabase.storage.from('comprobantes').upload(fileName, file);
      const { error } = await supabase.from('socios_elite').insert([{
        nombre_completo: form.nombre,
        id_socio: form.email.toLowerCase().trim(),
        clave_acceso: form.pass,
        plan_elegido: form.plan,
        pais_pago: form.pais,
        metodo_usado: form.metodo,
        url_comprobante: fileName,
        estatus_pago: 'PENDIENTE_VERIFICACION'
      }]);
      if (error) throw error;
      alert("🚀 SOLICITUD ENVIADA: Verificaremos tu pago para activarte.");
      router.push('/login');
    } catch (e: any) {
      alert("Error: " + e.message);
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#020406', minHeight: '100vh', display: 'flex', justifyContent: 'center', padding: '40px 20px', color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#0a0c10', padding: '40px', borderRadius: '35px', border: '1px solid #00C853', width: '100%', maxWidth: '500px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <ShieldCheck size={40} color="#00C853" style={{ margin: '0 auto 10px' }} />
          <h2 style={{ fontSize: '1.2rem', fontWeight: 900 }}>PASO {paso} DE 4</h2>
        </div>

        {paso === 1 && (
          <div>
            <input type="text" placeholder="Nombre" onChange={e => setForm({...form, nombre: e.target.value})} style={iSt} />
            <input type="email" placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} style={iSt} />
            <input type="password" placeholder="Clave" onChange={e => setForm({...form, pass: e.target.value})} style={iSt} />
            <button onClick={irAPagar} style={bSt}>REGISTRARSE <ArrowRight size={18} /></button>
          </div>
        )}

        {paso === 2 && (
          <div style={{ display: 'grid', gap: '10px' }}>
            {planes.map(p => <button key={p} onClick={() => { setForm({...form, plan: p}); setPaso(3); }} style={pSt}>{p}</button>)}
          </div>
        )}

        {paso === 3 && (
          <div>
            <select onChange={e => setForm({...form, pais: e.target.value})} style={iSt}>
              <option value="">-- País --</option>
              <option value="Ecuador">Ecuador 🇪🇨</option>
              <option value="Colombia">Colombia 🇨🇴</option>
            </select>
            {form.pais && (
              <div style={{ marginTop: '20px' }}>
                {(opciones[form.pais as keyof typeof opciones] || []).map(m => (
                  <button key={m} onClick={() => { setForm({...form, metodo: m}); setPaso(4); }} style={iSt}>{m}</button>
                ))}
              </div>
            )}
          </div>
        )}

        {paso === 4 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ background: '#020406', padding: '30px', borderRadius: '25px', border: '1px dashed #333', marginBottom: '20px' }}>
              <Camera size={30} color="#00C853" style={{ marginBottom: '10px' }} />
              <p style={{ fontSize: '11px' }}>Sube el pago de <b>{form.metodo}</b></p>
              <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} style={{ marginTop: '15px' }} />
            </div>
            <button onClick={confirmarTodo} disabled={enviando} style={bSt}>
              {enviando ? <LoaderCircle className="animate-spin" /> : "CONFIRMAR REGISTRO Y PAGO"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const iSt = { width: '100%', padding: '16px', borderRadius: '12px', background: '#020406', border: '1px solid #222', color: 'white', marginBottom: '15px', outline: 'none' };
const bSt = { width: '100%', padding: '18px', background: '#00C853', color: 'black', borderRadius: '12px', fontWeight: 900, cursor: 'pointer', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' };
const pSt = { padding: '18px', background: '#020406', border: '1px solid #222', borderRadius: '15px', color: 'white', cursor: 'pointer' };