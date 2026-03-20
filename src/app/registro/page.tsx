"use client";
import React, { useState } from 'react';
import { ArrowLeft, UserPlus, LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

// 1. CONEXIÓN A SUPABASE
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function RegistroPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    plan: 'PLAN ÉLITE' // Plan por defecto
  });

  // 2. FUNCIÓN PARA REGISTRAR AL SOCIO
  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
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

      alert("✅ ¡REGISTRO EXITOSO! Bienvenido a El Gurú Élite.");
      window.location.href = "/"; // Redirigir al inicio tras éxito

    } catch (error: any) {
      console.error("❌ Error en registro:", error.message);
      alert("Hubo un error al registrarte: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div style={{height:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', backgroundColor:'#020406', color:'#00C853'}}>
      <LoaderCircle size={50} className="animate-spin" style={{marginBottom:'20px'}} />
      <h2 style={{fontWeight: 900}}>PROCESANDO REGISTRO ÉLITE...</h2>
    </div>
  );

  return (
    <main style={{ backgroundColor: '#020406', minHeight: '100vh', color: 'white', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <Link href="/" style={{ color: '#00C853', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px', fontWeight: 'bold' }}>
        <ArrowLeft size={20} /> VOLVER AL INICIO
      </Link>

      <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center', background: '#0a0c10', padding: '40px', borderRadius: '20px', border: '1px solid #111', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
        <UserPlus size={40} color="#00C853" style={{ marginBottom: '20px' }} />
        <h1 style={{ fontSize: '2rem', marginBottom: '10px', fontWeight: 900 }}>REGISTRO ÉLITE</h1>
        <p style={{fontSize:'12px', color:'#555', marginBottom:'30px'}}>ÚNETE AL CÍRCULO EXCLUSIVO</p>

        <form onSubmit={handleRegistro} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            required
            type="text" 
            placeholder="Tu Nombre Completo" 
            onChange={(e) => setFormData({...formData, nombre: e.target.value})}
            style={{ padding: '15px', borderRadius: '8px', border: '1px solid #222', backgroundColor: '#020406', color: 'white', outline:'none' }} 
          />
          <input 
            required
            type="email" 
            placeholder="Email Corporativo" 
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            style={{ padding: '15px', borderRadius: '8px', border: '1px solid #222', backgroundColor: '#020406', color: 'white', outline:'none' }} 
          />
          <input 
            required
            type="password" 
            placeholder="Contraseña de Acceso" 
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            style={{ padding: '15px', borderRadius: '8px', border: '1px solid #222', backgroundColor: '#020406', color: 'white', outline:'none' }} 
          />
          
          <button 
            type="submit" 
            style={{ backgroundColor: '#00C853', color: 'black', padding: '18px', borderRadius: '8px', border: 'none', fontWeight: 900, marginTop: '10px', cursor:'pointer', fontSize:'14px', textTransform:'uppercase' }}>
            REGISTRARME AHORA
          </button>
        </form>
      </div>
    </main>
  );
}