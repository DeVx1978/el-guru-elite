"use client";
import React, { useState } from 'react';
import { ArrowLeft, UserPlus, LoaderCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function RegistroPage() {
  const [loading, setLoading] = useState(false);
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmarPassword: '',
    plan: 'PLAN ÉLITE'
  });

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones de seguridad
    if (formData.password !== formData.confirmarPassword) {
      alert("⚠️ Las contraseñas no coinciden. Por favor, verifica.");
      return;
    }

    if (!aceptaTerminos) {
      alert("⚠️ Debes aceptar los términos y condiciones.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from('socios_elite')
        .insert([
          { 
            nombre: formData.nombre, 
            email: formData.email, 
            password: formData.password,
            plan_elegido: formData.plan,
            estatus_pago: 'PENDIENTE'
          }
        ]);

      if (error) throw error;

      setRegistroExitoso(true);
      // Aquí el sistema ya guardó al socio. El correo se dispara desde Supabase Auth o un Edge Function.

    } catch (error: any) {
      console.error("❌ Error:", error.message);
      alert("Error al registrar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Pantalla de Éxito
  if (registroExitoso) {
    return (
      <div style={{height:'100vh', display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'#020406', color:'white', textAlign:'center', padding:'20px'}}>
        <div style={{background:'#0a0c10', padding:'50px', borderRadius:'30px', border:'1px solid #00C853', maxWidth:'450px'}}>
          <CheckCircle2 size={80} color="#00C853" style={{marginBottom:'20px'}} />
          <h1 style={{fontWeight:900, color:'#00C853'}}>¡BIENVENIDO ÉLITE!</h1>
          <p style={{marginTop:'20px', lineHeight:'1.6'}}>Tu registro se ha completado con éxito. Hemos enviado una **confirmación a tu correo electrónico**.</p>
          <p style={{fontSize:'12px', color:'#555', marginTop:'10px'}}>Revisa tu bandeja de entrada (y spam) para activar tu cuenta.</p>
          <Link href="/" style={{display:'inline-block', marginTop:'30px', padding:'15px 30px', background:'#00C853', color:'black', borderRadius:'10px', textDecoration:'none', fontWeight:'bold'}}>VOLVER AL INICIO</Link>
        </div>
      </div>
    );
  }

  return (
    <main style={{ backgroundColor: '#020406', minHeight: '100vh', color: 'white', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <Link href="/" style={{ color: '#00C853', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px', fontWeight: 'bold', fontSize:'13px' }}>
        <ArrowLeft size={18} /> VOLVER AL INICIO
      </Link>

      <div style={{ maxWidth: '450px', margin: '0 auto', background: '#0a0c10', padding: '40px', borderRadius: '25px', border: '1px solid #111' }}>
        <div style={{textAlign:'center', marginBottom:'30px'}}>
            <UserPlus size={40} color="#00C853" style={{ marginBottom: '15px' }} />
            <h1 style={{ fontSize: '1.8rem', fontWeight: 900, margin:0 }}>REGISTRO ÉLITE</h1>
            <p style={{fontSize:'10px', color:'#555', letterSpacing:'2px', marginTop:'5px'}}>SISTEMA DE ALTA DE SOCIOS</p>
        </div>

        <form onSubmit={handleRegistro} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input required type="text" placeholder="Nombre completo" onChange={(e) => setFormData({...formData, nombre: e.target.value})} style={inputStyle} />
          <input required type="email" placeholder="Correo electrónico" onChange={(e) => setFormData({...formData, email: e.target.value})} style={inputStyle} />
          
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>
            <input required type="password" placeholder="Contraseña" onChange={(e) => setFormData({...formData, password: e.target.value})} style={inputStyle} />
            <input required type="password" placeholder="Confirmar" onChange={(e) => setFormData({...formData, confirmarPassword: e.target.value})} style={inputStyle} />
          </div>

          <div style={{display:'flex', alignItems:'flex-start', gap:'10px', padding:'10px', background:'rgba(255,255,255,0.02)', borderRadius:'10px', marginTop:'10px'}}>
            <input type="checkbox" id="terms" checked={aceptaTerminos} onChange={(e) => setAceptaTerminos(e.target.checked)} style={{marginTop:'4px', cursor:'pointer'}} />
            <label htmlFor="terms" style={{fontSize:'11px', color:'#888', lineHeight:'1.4', cursor:'pointer'}}>
                Acepto los <b>Términos de Servicio</b> y la <b>Política de Privacidad</b> de El Gurú Élite. Entiendo que mi registro está sujeto a verificación.
            </label>
          </div>
          
          <button 
            type="submit" 
            disabled={loading || !aceptaTerminos}
            style={{ 
                backgroundColor: aceptaTerminos ? '#00C853' : '#222', 
                color: aceptaTerminos ? 'black' : '#555', 
                padding: '18px', borderRadius: '12px', border: 'none', fontWeight: 900, marginTop: '10px', cursor: aceptaTerminos ? 'pointer' : 'not-allowed', transition:'0.3s', display:'flex', justifyContent:'center', alignItems:'center', gap:'10px' 
            }}>
            {loading ? <LoaderCircle size={20} className="animate-spin" /> : <ShieldCheck size={20} />}
            {loading ? 'PROCESANDO...' : 'SOLICITAR ACCESO ÉLITE'}
          </button>
        </form>
      </div>
    </main>
  );
}

const inputStyle = {
    padding: '16px', borderRadius: '10px', border: '1px solid #222', backgroundColor: '#020406', color: 'white', outline: 'none', fontSize: '14px'
};