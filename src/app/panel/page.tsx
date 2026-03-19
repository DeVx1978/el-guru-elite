"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const Eye = ({ s }: { s: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={s ? "#00C853" : "#444"} strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    {!s && <line x1="1" y1="1" x2="23" y2="23" stroke="#444" />}
  </svg>
);

export default function DashboardPage() {
  const [load, setLoad] = useState(true);
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [view, setView] = useState('monitor');
  const [form, setForm] = useState({ email: '', pass: '' });
  const [ops, setOps] = useState<any[]>([]);
  const [show, setShow] = useState(false);
  const [planElegido, setPlanElegido] = useState({ nombre: '', valor: '' });
  const [pais, setPais] = useState('');
  const [archivo, setArchivo] = useState<any>(null);
  const [subiendo, setSubiendo] = useState(false);

  useEffect(() => {
    const verificarSesion = async () => {
      const sesionGuardada = localStorage.getItem('user_elite');
      if (sesionGuardada) {
        const datos = JSON.parse(sesionGuardada);
        const { data } = await supabase.from('socios_elite').select('*').eq('id_socio', datos.id_socio).eq('clave_acceso', datos.clave_acceso).single();
        if (data) { setUser(data); setAuth(true); }
      }
      cargarOps();
      setLoad(false);
    };
    verificarSesion();
  }, []);

  const cargarOps = async () => {
    const { data } = await supabase.from('operaciones_monitor').select('*').order('creado_at', { ascending: false }).limit(5);
    if (data) setOps(data);
  };

  const loginManual = async (e: any) => {
    e.preventDefault();
    setLoad(true);
    const { data, error } = await supabase.from('socios_elite').select('*').eq('id_socio', form.email.toLowerCase().trim()).eq('clave_acceso', form.pass.trim()).single();
    if (error || !data) { alert('❌ Correo o contraseña incorrectos'); setLoad(false); } 
    else { 
      localStorage.setItem('user_elite', JSON.stringify({ id_socio: data.id_socio, clave_acceso: data.clave_acceso }));
      setUser(data); setAuth(true); setLoad(false); 
    }
  };

  const subirPago = async () => {
    if (!planElegido.nombre || !pais || !archivo) return alert("❌ Completa Plan, País y adjunta el Comprobante.");
    setSubiendo(true);
    const { error } = await supabase.from('socios_elite').update({ 
      estatus_pago: 'EN REVISIÓN', 
      plan_elegido: `${planElegido.nombre} (${planElegido.valor})`
    }).eq('id_socio', user.id_socio);
    if (!error) { alert("✅ ¡Recibido! Tu cuenta será activada pronto."); window.location.reload(); }
    setSubiendo(false);
  };

  if (load) return <main style={cnt}><b>SISTEMA ÉLITE...</b></main>;

  if (!auth) return (
    <main style={cnt}>
      <form onSubmit={loginManual} style={card}>
        <div style={{ textAlign: 'center', color: '#00C853', fontWeight: '900', fontSize: '24px', marginBottom: '10px' }}>EL GURÚ ÉLITE</div>
        <p style={{ textAlign: 'center', color: '#444', fontSize: '10px', marginBottom: '30px', letterSpacing: '2px' }}>ACCESO SOCIOS</p>
        <input style={iN} type="email" placeholder="CORREO ELECTRÓNICO" onChange={e => setForm({...form, email: e.target.value})} required />
        <div style={{ position: 'relative' }}>
          <input style={iN} type={show ? "text" : "password"} placeholder="CONTRASEÑA" onChange={e => setForm({...form, pass: e.target.value})} required />
          <button type="button" onClick={() => setShow(!show)} style={btnEye}><Eye s={show}/></button>
        </div>
        <button type="submit" style={bT}>INGRESAR AL PANEL</button>
        <p onClick={() => window.location.href = '/registro'} style={{ color: '#00C853', textAlign: 'center', fontSize: '11px', marginTop: '20px', cursor: 'pointer', fontWeight: 'bold' }}>¿AÚN NO ERES SOCIO? REGÍSTRATE AQUÍ</p>
      </form>
    </main>
  );

  if (user.estatus_pago !== 'ACTIVO') {
    return (
      <main style={{ backgroundColor: '#020406', minHeight: '100vh', padding: '40px', color: 'white', fontFamily: 'Arial' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ color: '#00C853', textAlign: 'center', marginBottom: '40px' }}>ACTIVACIÓN DE MEMBRESÍA</h1>
          {user.estatus_pago === 'PENDIENTE' ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
              <div>
                <h3 style={sT}>1. ELIGE TU PLAN</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '30px' }}>
                  {[{n:'Micro',v:'$100'},{n:'Inicial',v:'$250'},{n:'Activo',v:'$500'},{n:'Premium',v:'$1000'},{n:'Elite',v:'$1500'}].map(p => (
                    <div key={p.n} onClick={() => setPlanElegido({nombre:p.n, valor:p.v})} style={{ ...planCard, borderColor: planElegido.nombre===p.n?'#00C853':'#1a1d23', backgroundColor: planElegido.nombre===p.n?'#00C85311':'transparent' }}>
                      <b>{p.n}</b><br/><small>{p.v} USD</small>
                    </div>
                  ))}
                </div>
                <h3 style={sT}>2. SELECCIONA TU PAÍS</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {['COLOMBIA', 'ECUADOR', 'GLOBAL'].map(p => (
                    <button key={p} onClick={() => setPais(p)} style={{ ...btnTab, backgroundColor: pais===p?'#00C853':'#111', color: pais===p?'#000':'#fff' }}>{p}</button>
                  ))}
                </div>
              </div>
              <div style={{ backgroundColor: '#0a0c10', padding: '30px', borderRadius: '20px', border: '1px solid #1a1d23' }}>
                <h3 style={{ color: '#00C853', marginBottom: '20px', fontSize: '14px' }}>RESUMEN DE PAGO</h3>
                <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#000', borderRadius: '10px', border: '1px solid #00C85333' }}>
                  <p style={{fontSize: '13px'}}>Plan: <b>{planElegido.nombre || '---'}</b></p>
                  <p style={{fontSize: '20px', fontWeight: 'bold', color: '#00C853'}}>{planElegido.valor || '$0.00'}</p>
                </div>
                {pais && (
                  <div style={{ backgroundColor: '#111', padding: '15px', borderRadius: '10px', fontSize: '12px', marginBottom: '20px' }}>
                    {pais==='COLOMBIA' && <p>Bancolombia: 123-456789-01<br/>Nequi: 300 000 0000<br/>Daviplata: 300 111 2222</p>}
                    {pais==='ECUADOR' && <p>Pichincha: 2200112233<br/>Guayaquil: 44556677</p>}
                    {pais==='GLOBAL' && <p>USDT (TRC20): T8Xy...99zQ<br/>Binance Pay: 12345678</p>}
                  </div>
                )}
                <input type="file" accept="image/*" onChange={(e) => setArchivo(e.target.files ? e.target.files[0] : null)} style={{ width: '100%', fontSize: '11px', color: '#888', marginBottom: '20px' }} />
                <button onClick={subirPago} style={bT}>{subiendo ? 'ENVIANDO...' : 'NOTIFICAR PAGO'}</button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px', border: '2px dashed #00C853', borderRadius: '30px' }}>
              <h2>PAGO EN REVISIÓN</h2>
              <p>Estamos validando tu ingreso al plan <b>{user.plan_elegido}</b>.</p>
              <button onClick={() => window.location.reload()} style={{ ...bT, width: '200px', marginTop: '20px', backgroundColor: '#111', color: '#fff' }}>ACTUALIZAR</button>
            </div>
          )}
        </div>
      </main>
    );
  }

  return (
    <main style={{ backgroundColor: '#020406', minHeight: '100vh', display: 'flex' }}>
      <aside style={{ width: '280px', padding: '40px 30px', borderRight: '1px solid #1a1d23', color: 'white', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ color: '#00C853', fontWeight: '900', letterSpacing: '2px', marginBottom: '10px' }}>EL GURÚ</h2>
        <span style={{ fontSize: '10px', color: '#444', letterSpacing: '4px', marginBottom: '50px' }}>SISTEMA ÉLITE</span>
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <div onClick={() => setView('monitor')} style={{ cursor: 'pointer', color: view === 'monitor' ? '#00C853' : '#444', fontWeight: 'bold', fontSize: '14px' }}>● MONITOR EN VIVO</div>
          <div onClick={() => setView('reportes')} style={{ cursor: 'pointer', color: view === 'reportes' ? '#00C853' : '#444', fontWeight: 'bold', fontSize: '14px' }}>● MIS REPORTES</div>
        </nav>
        <div onClick={() => { localStorage.removeItem('user_elite'); setAuth(false); setUser(null); }} style={{ color: '#ff4444', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>CERRAR SESIÓN</div>
      </aside>

      <section style={{ flex: 1, padding: '50px', color: 'white', overflowY: 'auto' }}>
        {view === 'monitor' && (
          <div>
            <h2 style={{ marginBottom: '30px', fontSize: '24px' }}>OPERACIONES RECIENTES</h2>
            {ops.length === 0 ? <p style={{color:'#444'}}>No hay noticias por ahora.</p> : ops.map(o => (
              <div key={o.id} style={opCard}>
                <div style={{ color: '#00C853', fontSize: '11px', fontWeight: 'bold', marginBottom: '10px' }}>NOTICIA CONFIRMADA</div>
                <h4>{o.titulo}</h4>
                <p style={{ color: '#888', marginTop: '10px' }}>{o.descripcion}</p>
              </div>
            ))}
          </div>
        )}

        {view === 'reportes' && (
          <div style={{ maxWidth: '700px' }}>
            <h2 style={{ marginBottom: '40px' }}>ESTADO DE CUENTA</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
              <div style={dataCard}>
                <span style={label}>CAPITAL INVERTIDO</span>
                <div style={value}>${user.inversion_minima || '0'}.00 <small style={{fontSize:'12px', color:'#00C853'}}>USD</small></div>
              </div>
              <div style={dataCard}>
                <span style={label}>ESTADO DE UTILIDAD</span>
                <div style={{ ...value, color: '#00C853', fontSize: '18px' }}>VARIABLE</div>
                <p style={{fontSize:'9px', color:'#444', marginTop:'5px'}}>Basado en resultados netos de plataforma.</p>
              </div>
            </div>
            <div style={{ ...dataCard, textAlign: 'center', padding: '40px', border: '1px solid #00C85333' }}>
              <span style={label}>MEMBRESÍA ACTIVA</span>
              <h3 style={{ color: '#00C853', marginTop: '10px' }}>{user.nivel_socio || 'Socio Estándar'}</h3>
              <p style={{ color: '#444', fontSize: '12px', marginTop: '10px' }}>Socio: {user.nombre_completo}</p>
              <hr style={{ border: '0.5px solid #1a1d23', margin: '30px 0' }} />
              <button onClick={() => alert('Solicitud de retiro enviada.')} style={bT}>SOLICITAR RETIRO</button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

const cnt: any = { backgroundColor: '#020406', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontFamily: 'Arial' };
const card: any = { width: '380px', padding: '50px', backgroundColor: '#0a0c10', borderRadius: '30px', border: '1px solid #1a1d23' };
const iN: any = { width: '100%', backgroundColor: '#05070a', border: '1px solid #1a1d23', padding: '15px', color: 'white', marginBottom: '20px', borderRadius: '12px', outline: 'none' };
const bT: any = { width: '100%', backgroundColor: '#00C853', color: 'black', padding: '16px', borderRadius: '12px', fontWeight: '900', border: 'none', cursor: 'pointer' };
const btnEye: any = { position: 'absolute', right: '15px', top: '15px', background: 'none', border: 'none', cursor: 'pointer' };
const opCard: any = { backgroundColor: '#0a0c10', padding: '30px', borderRadius: '20px', border: '1px solid #1a1d23', marginBottom: '20px', borderLeft: '5px solid #00C853' };
const dataCard: any = { backgroundColor: '#0a0c10', padding: '25px', borderRadius: '20px', border: '1px solid #1a1d23' };
const label: any = { color: '#444', fontSize: '10px', fontWeight: 'bold', letterSpacing: '1px' };
const value: any = { fontSize: '24px', fontWeight: '900', marginTop: '10px' };
const planCard: any = { padding: '20px', border: '1px solid #1a1d23', borderRadius: '15px', cursor: 'pointer', textAlign: 'center', fontSize: '12px' };
const sT: any = { fontSize: '11px', color: '#444', marginBottom: '15px', fontWeight: 'bold' };
const btnTab: any = { padding: '12px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' };