"use client";
import React from 'react';

export default function HomePage() {
  const m = [{n:'Micro',v:'100'},{n:'Inicial',v:'250'},{n:'Activo',v:'500'},{n:'Premium',v:'1000'},{n:'Elite',v:'1500'}];
  return (
    <main style={{ backgroundColor:'#020406', minHeight:'100vh', color:'white', fontFamily:'Arial' }}>
      <nav style={{ padding:'40px 50px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div style={{ flex:1 }}></div>
        <div style={{ textAlign:'center', flex:1 }}><h2 style={{ color:'#00C853', margin:0, fontStyle:'italic' }}>EL GURÚ</h2><p style={{ fontSize:'9px', letterSpacing:'4px', color:'#444', margin:0 }}>ÉLITE INVESTMENTS</p></div>
        <div style={{ flex:1, textAlign:'right' }}><button onClick={()=>window.location.href='/el-guru'} style={{ background:'transparent', color:'#fff', padding:'10px 20px', borderRadius:'8px', border:'1px solid #1a1d23', fontWeight:'bold', cursor:'pointer' }}>EL GURÚ</button></div>
      </nav>

      <section style={{ height:'70vh', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign:'center', padding:'0 20px' }}>
        <h3 style={{ color:'#00C853', letterSpacing:'5px', fontSize:'11px', marginBottom:'20px' }}>INTELIGENCIA DEPORTIVA AVANZADA</h3>
        <h1 style={{ fontSize:'85px', fontWeight:'900', fontStyle:'italic', lineHeight:'0.9', marginBottom:'30px' }}>MÁXIMO<br/><span style={{ color:'#00C853' }}>RENDIMIENTO</span></h1>
        <p style={{ color:'#666', maxWidth:'500px', marginBottom:'40px' }}>Gestión de capital privado basada en modelos de probabilidad. Resultados verificados para inversores de alto nivel.</p>
        <button onClick={()=>window.location.href='/registro'} style={{ backgroundColor:'#00C853', color:'black', padding:'20px 50px', borderRadius:'12px', border:'none', fontWeight:'900', cursor:'pointer' }}>ADQUIRIR MEMBRESÍA</button>
      </section>

      <section style={{ padding:'80px 50px', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))', gap:'20px', maxWidth:'1200px', margin:'0 auto' }}>
        {[{t:'CRECIMIENTO ANUAL',v:'+142%',h:120},{t:'WIN RATE GLOBAL',v:'78.4%',h:100},{t:'PROFIT MENSUAL',v:'$12,400',h:140}].map(s=>(
          <div key={s.t} style={{ background:'#0a0c10', padding:'35px', borderRadius:'25px', border:'1px solid #1a1d23', textAlign:'center' }}>
            <span style={{ fontSize:'10px', color:'#444', fontWeight:'bold' }}>{s.t}</span>
            <div style={{ height:s.h, background:'linear-gradient(to top,#00C853,transparent)', width:'30px', margin:'20px auto', borderRadius:'4px' }}></div>
            <div style={{ fontSize:'28px', fontWeight:'900' }}>{s.v}</div>
          </div>
        ))}
      </section>

      <section style={{ padding:'100px 50px', textAlign:'center', background:'#05070a' }}>
        <h2 style={{ marginBottom:'50px', fontStyle:'italic' }}>MEMBRESÍAS DE INVERSIÓN</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))', gap:'15px' }}>
          {m.map(p=>(<div key={p.n} style={{ background:'#0a0c10', padding:'35px', borderRadius:'20px', border:'1px solid #00C853' }}><b style={{ color:'#00C853' }}>{p.n}</b><h3>${p.v}</h3><button onClick={()=>window.location.href='/registro'} style={{ width:'100%', background:'#00C853', border:'none', padding:'10px', borderRadius:'8px', cursor:'pointer' }}>SELECCIONAR</button></div>))}
        </div>
      </section>

      <footer style={{ padding:'80px 50px', borderTop:'1px solid #1a1d23', display:'flex', justifyContent:'space-between', color:'#444', fontSize:'12px' }}>
        <div style={{ maxWidth:'300px' }}><b>EL GURÚ ÉLITE</b><p>Gestión de activos bajo estándares de máxima seguridad.</p></div>
        <div style={{ display:'flex', gap:'50px' }}>
          <div><b>LEGAL</b><p>Términos</p><p>Privacidad</p></div>
          <div><b>REDES</b><p>Instagram</p><p>Telegram</p></div>
        </div>
      </footer>
    </main>
  );
}