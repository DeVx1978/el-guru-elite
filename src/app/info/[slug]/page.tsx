"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { ArrowLeft, ShieldCheck, Users, Lock, FileText } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function InfoDinamica() {
  const { slug } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarContenido = async () => {
      const { data: contenido } = await supabase
        .from('contenidos_estaticos')
        .select('*')
        .eq('slug', slug)
        .single();
      
      if (contenido) setData(contenido);
      setLoading(false);
    };
    cargarContenido();
  }, [slug]);

  if (loading) return (
    <div style={{background:'#000',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',color:'#00C853',fontSize:'10px',letterSpacing:'3px', fontFamily:'sans-serif'}}>
      SINCRONIZANDO PROTOCOLOS...
    </div>
  );

  return (
    <div className="elite-info-page">
      <nav className="e-nav">
        <button onClick={() => router.back()} className="e-back">
          <ArrowLeft size={16}/> REGRESAR
        </button>
        <div className="e-logo">GURÚ<span>ÉLITE</span></div>
      </nav>

      <main className="e-main">
        <div className="e-icon-box">
           {slug === 'quienes-somos' ? <Users size={40} color="#00C853"/> : 
            slug === 'confidencialidad' ? <Lock size={40} color="#00C853"/> : 
            <FileText size={40} color="#00C853"/>}
        </div>
        
        <h1 className="e-title">{data?.titulo || "DOCUMENTO ÉLITE"}</h1>
        <div className="e-line"></div>
        
        <div className="e-body">
          {data?.cuerpo ? data.cuerpo.split('\n').map((parrafo: string, i: number) => (
            <p key={i}>{parrafo}</p>
          )) : (
            <p style={{textAlign:'center'}}>Cargando información confidencial desde la bóveda...</p>
          )}
        </div>

        <footer className="e-footer">
          <ShieldCheck size={14}/> 
          <span>SISTEMA DE GESTIÓN DE CONTENIDOS DEVX - EL GURÚ DEL FÚTBOL</span>
        </footer>
      </main>

      <style jsx>{`
        .elite-info-page { min-height: 100vh; background: #000; color: #fff; font-family: sans-serif; }
        .e-nav { display: flex; justify-content: space-between; padding: 30px 6%; align-items: center; border-bottom: 1px solid #111; }
        .e-back { background: #0a0a0a; border: 1px solid #222; color: #00C853; padding: 12px 20px; border-radius: 12px; cursor: pointer; font-size: 10px; font-weight: 800; display: flex; align-items: center; gap: 8px; transition: 0.3s; }
        .e-back:hover { border-color: #00C853; background: rgba(0,200,83,0.05); }
        .e-logo { font-weight: 900; letter-spacing: -1px; font-size: 1.2rem; } 
        .e-logo span { color: #00C853; }
        
        .e-main { max-width: 800px; margin: 0 auto; padding: 60px 20px; }
        .e-icon-box { background: rgba(0,200,83,0.05); width: 80px; height: 80px; border-radius: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto 30px; border: 1px solid rgba(0,200,83,0.1); }
        .e-title { font-size: 2.8rem; font-weight: 900; letter-spacing: -2px; margin: 0; text-align: center; }
        .e-line { width: 40px; height: 4px; background: #00C853; margin: 30px auto; border-radius: 10px; }
        
        .e-body { text-align: left; color: #aaa; line-height: 1.8; font-size: 1.1rem; }
        .e-body p { margin-bottom: 25px; }
        
        .e-footer { margin-top: 80px; padding-top: 30px; border-top: 1px solid #111; color: #333; font-size: 9px; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 8px; letter-spacing: 1px; }
        
        @media (max-width: 768px) {
          .e-title { font-size: 2rem; }
          .e-main { padding-top: 40px; }
        }
      `}</style>
    </div>
  );
}