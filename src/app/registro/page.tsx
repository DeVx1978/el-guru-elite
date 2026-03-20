"use client";
import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { CreditCard, UserPlus, ShieldCheck, LoaderCircle } from 'lucide-react';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function RegistroConPago() {
  const [paso, setPaso] = useState(1); 
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ nombre: "", email: "", password: "" });
  const router = useRouter();

  const completarPago = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPaso(2); 
    }, 2000);
  };

  const registrarSocio = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase
      .from('socios_elite')
      .insert([{ 
        nombre_completo: formData.nombre, 
        id_socio: formData.email, 
        clave_acceso: formData.password,
        estatus_pago: 'PENDIENTE' 
      }]);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("¡Pago validado y Registro exitoso! Espera la activación.");
      router.push('/login');
    }
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: '#020406', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#0a0c10', padding: '40px', borderRadius: '30px', border: '1px solid #00C853', width: '100%', maxWidth: '450px' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <ShieldCheck size={50} color="#00C853" style={{ margin: '0 auto 10px' }} />
          <h2 style={{ margin: 0 }}>{paso === 1 ? "ADQUIRIR MEMBRESÍA" : "CREAR CUENTA ÉLITE"}</h2>
          <p style={{ color: '#555', fontSize: '12px' }}>{paso === 1 ? "PASO 1: PAGO" : "PASO 2: DATOS"}</p>
        </div>

        {paso === 1 ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{ background: '#020406', padding: '20px', borderRadius: '15px', border: '1px solid #111', marginBottom: '20px' }}>
              <p style={{ color: '#00C853', fontSize: '24px', fontWeight: 900, margin: 0 }}>$299.00 USD</p>
              <p style={{ color: '#444', fontSize: '10px' }}>MEMBRESÍA ANUAL</p>
            </div>
            <button onClick={completarPago} disabled={loading} style={{ width: '100%', padding: '18px', background: '#00C853', color: 'black', borderRadius: '15px', fontWeight: 900, cursor: 'pointer' }}>
              {loading ? <LoaderCircle className="animate-spin" /> : "PAGAR AHORA"}
            </button>
          </div>
        ) : (
          <form onSubmit={registrarSocio}>
            <input type="text" placeholder="Nombre completo" required onChange={(e) => setFormData({...formData, nombre: e.target.value})} style={{ width: '100%', padding: '15px', borderRadius: '12px', marginBottom: '15px', background: '#020406', border: '1px solid #222', color: 'white' }} />
            <input type="email" placeholder="Email" required onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '15px', borderRadius: '12px', marginBottom: '15px', background: '#020406', border: '1px solid #222', color: 'white' }} />
            <input type="password" placeholder="Clave" required onChange={(e) => setFormData({...formData, password: e.target.value})} style={{ width: '100%', padding: '15px', borderRadius: '12px', marginBottom: '25px', background: '#020406', border: '1px solid #222', color: 'white' }} />
            <button type="submit" style={{ width: '100%', padding: '18px', background: '#00C853', color: 'black', borderRadius: '15px', fontWeight: 900 }}>
              {loading ? <LoaderCircle className="animate-spin" /> : "FINALIZAR TODO"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}