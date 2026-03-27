"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { 
  User, Mail, Lock, Phone, Target, Zap, Award, Star, 
  MapPin, UploadCloud, ShieldCheck, Landmark, Sparkles, Clock, Eye, EyeOff, ChevronRight, ArrowLeft, Globe, TrendingUp, Briefcase
} from 'lucide-react';

const clientSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const planes = [
  { id: 'micro', nombre: 'MICRO SOCIO', precio: 100, porcentaje: '0.067% Utilidad', icon: Target, color: '#00C853' },
  { id: 'inicial', nombre: 'SOCIO INICIAL', precio: 250, porcentaje: '0.167% Utilidad', icon: Briefcase, color: '#00B0FF' },
  { id: 'activo', nombre: 'SOCIO ACTIVO', precio: 500, porcentaje: '0.333% Utilidad', icon: Zap, color: '#FFD600' },
  { id: 'premium', nombre: 'SOCIO PREMIUM', precio: 1000, porcentaje: '0.667% Utilidad', icon: Award, color: '#FF3D00' },
  { id: 'elite', nombre: 'SOCIO ÉLITE', precio: 1500, porcentaje: '1.0% Utilidad', icon: Star, color: '#AA00FF' },
];

const paises = [
  { nombre: 'Seleccione Nación...', codigo: '', flag: '🌐' },
  { nombre: 'Colombia', codigo: '+57', flag: '🇨🇴' },
  { nombre: 'Ecuador', codigo: '+593', flag: '🇪🇨' },
  { nombre: 'México', codigo: '+52', flag: '🇲🇽' },
  { nombre: 'Perú', codigo: '+51', flag: '🇵🇪' },
  { nombre: 'España', codigo: '+34', flag: '🇪🇸' },
  { nombre: 'Estados Unidos', codigo: '+1', flag: '🇺🇸' },
];

const obtenerMetodosPago = (pais: string) => {
  if (pais === 'Ecuador') {
    return [
      { id: 'pichincha', nombre: 'BANCO PICHINCHA', info: 'Cta Ahorros: 2208543100 - Titular: El Gurú Élite' },
      { id: 'guayaquil', nombre: 'BANCO GUAYAQUIL', info: 'Cta Corriente: 11452290 - Titular: Gestión Élite' },
      { id: 'western_ec', nombre: 'WESTERN UNION', info: 'Beneficiario: Maria José - CI: [ID]' },
      { id: 'nequi_ec', nombre: 'DEPÓSITO NEQUI', info: 'Celular: +593 [NÚMERO]' },
      { id: 'usdt_ec', nombre: 'USDT (Red TRC20)', info: 'Wallet: TXu4...Red TRC20' },
    ];
  }
  if (pais === 'Colombia') {
    return [
      { id: 'bancolombia', nombre: 'BANCOLOMBIA', info: 'Cta Ahorros: 542-000123-01 - Titular: El Gurú' },
      { id: 'davivienda', nombre: 'DAVIVIENDA', info: 'Cta Ahorros: 0099-7001-22 - Titular: Gestión Élite' },
      { id: 'nequi_co', nombre: 'NEQUI', info: 'Celular: 310 123 4567 - Nombre: Maria José' },
      { id: 'usdt_co', nombre: 'USDT (Red TRC20)', info: 'Wallet: TXu4...Red TRC20' },
    ];
  }
  return [
    { id: 'western_global', nombre: 'WESTERN UNION', info: 'Solicitar datos de envío al soporte oficial.' },
    { id: 'usdt_global', nombre: 'USDT (Red TRC20)', info: 'Wallet Global: TXu4...Red TRC20' },
  ];
};

export default function UnetePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [paso, setPaso] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPass, setShowPass] = useState(false);
  const [comprobante, setComprobante] = useState<File | null>(null);
  const [comprobanteUrl, setComprobanteUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    nombre: '', email: '', password: '', confirmPassword: '',
    pais: '', ciudad: '', codigoArea: '', telefono: '',
    plan: '', metodoPago: '', tyc: false
  });

  const metodosDisponibles = obtenerMetodosPago(formData.pais);

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    if (metodosDisponibles.length > 0) {
      setFormData(prev => ({ ...prev, metodoPago: prev.metodoPago || metodosDisponibles[0].id }));
    }
  }, [formData.pais, metodosDisponibles]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setComprobante(file);
      setComprobanteUrl(URL.createObjectURL(file));
    }
  };

  // ====================== FUNCIÓN CORREGIDA Y MEJORADA ======================
  const finalizarRegistro = async () => {
    if (!comprobante) {
      setError("Debes subir el comprobante de depósito");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Insertar en tabla 'socios'
      const { data: socio, error: errSocio } = await clientSupabase
        .from('socios')
        .insert([{
          nombre: formData.nombre.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          pais: formData.pais,
          telefono: `${formData.codigoArea} ${formData.telefono}`,
          plan: formData.plan,
          estado: 'pendiente',
          rol: 'socio'
        }])
        .select()
        .single();

      if (errSocio) {
        console.error("Error Supabase socios:", errSocio);
        throw new Error(`Error al crear socio: ${errSocio.message}`);
      }

      if (!socio?.id) throw new Error("No se recibió el ID del socio");

      // Insertar en tabla 'socios_elite'
      const { error: errElite } = await clientSupabase.from('socios_elite').insert([{
        id_socio: socio.id,
        nivel_socio: formData.plan.toUpperCase(),
        ciudad: formData.ciudad || ''
      }]);

      if (errElite) {
        console.error("Error Supabase socios_elite:", errElite);
        throw new Error(`Error al crear registro elite: ${errElite.message}`);
      }

      // Éxito → Ir al paso 5
      setPaso(5);

    } catch (err: any) {
      console.error("Error completo en registro:", err);
      setError(err.message || "Error desconocido al procesar el registro. Revisa la consola.");
    } finally {
      setLoading(false);
    }
  };

  const paso1Valido = formData.nombre.trim().length > 2 && formData.email.includes('@') && formData.password.length >= 6 && formData.password === formData.confirmPassword && formData.tyc;
  const paso2Valido = formData.pais !== '' && formData.ciudad.trim().length > 1 && formData.telefono.trim().length > 5;
  const paso3Valido = formData.plan !== '';
  const paso4Valido = !!comprobante;

  if (!isMounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className="unete-wrapper">
      <div className="bg-gradient-radial"></div>

      <nav className="unete-nav" style={{position:'relative', zIndex:100, width:'100%', maxWidth:'1200px', padding:'40px 5%', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <button onClick={() => paso > 1 ? setPaso(paso-1) : router.push('/')} style={{background:'transparent', border:'none', color:'#444', fontWeight:'900', cursor:'pointer', display:'flex', alignItems:'center', gap:'10px'}}>
          <ArrowLeft size={18}/> <span>VOLVER</span>
        </button>
        <div style={{textAlign:'right'}}>
          <div style={{fontSize:'10px', color:'#1a1a1a', letterSpacing:'4px'}}>FASE 0{paso}</div>
          <div style={{width:'120px', height:'3px', background:'#111', borderRadius:'10px', overflow:'hidden', marginTop:'5px'}}>
            <div style={{ 
                width: `${(paso/4)*100}%`, height: '100%', transition: '1s cubic-bezier(0.4, 0, 0.2, 1)',
                backgroundColor: paso === 1 ? '#00C853' : paso === 2 ? '#00B0FF' : paso === 3 ? '#AA00FF' : '#FFD600' 
            }}></div>
          </div>
        </div>
      </nav>

      <main className="unete-content" style={{display:'flex', justifyContent:'center', alignItems:'center', minHeight:'80vh', position:'relative', zIndex:10, padding:'20px'}}>
        <div className="vault-container" style={{width:'100%', maxWidth:'550px', background:'rgba(5,5,5,0.85)', backdropFilter:'blur(50px)', border:'1px solid rgba(255,255,255,0.05)', padding:'50px', borderRadius:'40px', boxShadow:'0 50px 100px rgba(0,0,0,1)'}}>
          
          {paso === 1 && (
            <div className="fade-in">
              <span style={{color: '#00C853', fontSize:'10px', fontWeight:'900', letterSpacing:'4px'}}><Sparkles size={12} className="mr-2"/> PROTOCOLO DE IDENTIDAD</span>
              <h1 style={{fontSize:'3.5rem', fontWeight:'900', letterSpacing:'-4px', lineHeight:'0.85', textTransform:'uppercase', margin:'40px 0', color:'#fff'}}>FORJAR <span style={{color: '#00C853', textShadow: '0 0 20px rgba(0,200,83,0.4)'}}>IDENTIDAD</span></h1>
              <div style={{display:'flex', flexDirection:'column', gap:'15px', marginBottom:'40px'}}>
                <div className="input-group-elite" style={{borderColor:'#00C85344'}}><User size={18} style={{color:'#00C853'}}/><input name="nombre" placeholder="Nombre Completo" value={formData.nombre} onChange={handleInputChange} autoComplete="off" /></div>
                <div className="input-group-elite" style={{borderColor:'#00C85344'}}><Mail size={18} style={{color:'#00C853'}}/><input name="email" placeholder="Email de Inversor" value={formData.email} onChange={handleInputChange} autoComplete="off" /></div>
                <div style={{display:'flex', gap:'15px'}}>
                   <div className="input-group-elite" style={{flex:1, borderColor:'#00C85344'}}><Lock size={18} style={{color:'#00C853'}}/><input type={showPass ? "text" : "password"} name="password" placeholder="Contraseña" value={formData.password} onChange={handleInputChange}/><button onClick={() => setShowPass(!showPass)} style={{background:'transparent', border:'none', color:'#333', cursor:'pointer'}}>{showPass ? <EyeOff size={16}/> : <Eye size={16}/>}</button></div>
                   <div className="input-group-elite" style={{flex:1, borderColor:'#00C85344'}}><Lock size={18} style={{color:'#00C853'}}/><input type={showPass ? "text" : "password"} name="confirmPassword" placeholder="Validar" value={formData.confirmPassword} onChange={handleInputChange}/></div>
                </div>
              </div>
              <label style={{display:'flex', alignItems:'center', gap:'15px', cursor:'pointer', marginBottom:'30px'}}>
                <input type="checkbox" name="tyc" checked={formData.tyc} onChange={handleInputChange} style={{display:'none'}} />
                <div style={{width:'22px', height:'22px', border:'2px solid #00C853', borderRadius:'6px', background: formData.tyc ? '#00C853' : 'transparent'}}></div>
                <span style={{fontSize:'11px', color:'#444', fontWeight:'700'}}>ACEPTO PROTOCOLOS DE SEGURIDAD ÉLITE</span>
              </label>
              <button onClick={() => paso1Valido && setPaso(2)} className="btn-final" style={{background: paso1Valido ? '#00C853' : '#080808', color: paso1Valido ? '#000' : '#222', cursor: paso1Valido ? 'pointer' : 'not-allowed'}}>INICIAR SECUENCIA</button>
            </div>
          )}

          {paso === 2 && (
            <div className="fade-in">
              <span style={{color: '#00B0FF', fontSize:'10px', fontWeight:'900', letterSpacing:'4px'}}><Globe size={12} className="mr-2"/> PROTOCOLO GEOGRÁFICO</span>
              <h1 style={{fontSize:'3.5rem', fontWeight:'900', letterSpacing:'-4px', lineHeight:'0.85', textTransform:'uppercase', margin:'40px 0', color:'#fff'}}>ORIGEN <span style={{color: '#00B0FF', textShadow: '0 0 20px rgba(0,176,255,0.4)'}}>GEOGRÁFICO</span></h1>
              <div style={{display:'flex', flexDirection:'column', gap:'15px', marginBottom:'40px'}}>
                <div className="input-group-elite" style={{borderColor:'#00B0FF44'}}><Globe size={18} style={{color:'#00B0FF'}}/><select name="pais" value={formData.pais} onChange={(e) => { const p = paises.find(x => x.nombre === e.target.value); setFormData({...formData, pais: e.target.value, codigoArea: p?.codigo || ''}); }} style={{appearance:'none'}}>{paises.map(p => <option key={p.nombre} value={p.nombre} style={{background:'#000'}}>{p.flag} {p.nombre}</option>)}</select></div>
                <div className="input-group-elite" style={{borderColor:'#00B0FF44'}}><MapPin size={18} style={{color:'#00B0FF'}}/><input name="ciudad" placeholder="Jurisdicción de Residencia" value={formData.ciudad} onChange={handleInputChange}/></div>
                <div className="input-group-elite" style={{borderColor:'#00B0FF44', gap:0}}>
                  <Phone size={18} style={{color:'#00B0FF', marginRight:'15px'}}/>
                  <span style={{color:'#00B0FF', fontWeight:'900', borderRight:'1px solid #222', paddingRight:'15px', marginRight:'15px', fontFamily:'JetBrains Mono'}}>{formData.codigoArea || '+??'}</span>
                  <input name="telefono" placeholder="WhatsApp Móvil" value={formData.telefono} onChange={handleInputChange} style={{paddingLeft:0}} />
                </div>
              </div>
              <button onClick={() => paso2Valido && setPaso(3)} className="btn-final" style={{background: paso2Valido ? '#00B0FF' : '#080808', color: paso2Valido ? '#000' : '#222', cursor: paso2Valido ? 'pointer' : 'not-allowed'}}>VALIDAR UBICACIÓN</button>
            </div>
          )}

          {paso === 3 && (
            <div className="fade-in">
              <span style={{color: '#AA00FF', fontSize:'10px', fontWeight:'900', letterSpacing:'4px'}}><TrendingUp size={12} className="mr-2"/> PROTOCOLO DE CAPITAL</span>
              <h1 style={{fontSize:'3.5rem', fontWeight:'900', letterSpacing:'-4px', lineHeight:'0.85', textTransform:'uppercase', margin:'40px 0', color:'#fff'}}>RANGO DE <span style={{color: '#AA00FF', textShadow: '0 0 20px rgba(170,0,255,0.4)'}}>INVERSIÓN</span></h1>
              <div style={{display:'flex', flexDirection:'column', gap:'10px', marginBottom:'30px'}}>
                {planes.map(p => (
                  <div key={p.id} onClick={() => setFormData({...formData, plan: p.id})} style={{background: '#040404', border: formData.plan === p.id ? `1px solid ${p.color}` : '1px solid #111', padding:'20px', borderRadius:'15px', display:'flex', alignItems:'center', gap:'20px', cursor:'pointer'}}>
                    <div style={{color:p.color, background:`${p.color}15`, padding:'10px', borderRadius:'10px'}}><p.icon size={20}/></div>
                    <div style={{flex:1}}><h3 style={{fontSize:'14px', fontWeight:'900'}}>{p.nombre}</h3><p style={{fontSize:'11px', color:'#444'}}>{p.porcentaje}</p></div>
                    <div style={{color:p.color, fontWeight:'900', fontSize:'1.2rem'}}>${p.precio}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => paso3Valido && setPaso(4)} className="btn-final" style={{background: paso3Valido ? '#AA00FF' : '#080808', color: paso3Valido ? '#fff' : '#222', cursor: paso3Valido ? 'pointer' : 'not-allowed'}}>PROSEGUIR AL PAGO</button>
            </div>
          )}

          {paso === 4 && (
            <div className="fade-in">
              <span style={{color: '#FFD600', fontSize:'10px', fontWeight:'900', letterSpacing:'4px'}}><Landmark size={12} className="mr-2"/> PROTOCOLO DE TRANSFERENCIA</span>
              <h1 style={{fontSize:'3.5rem', fontWeight:'900', letterSpacing:'-4px', lineHeight:'0.85', textTransform:'uppercase', margin:'40px 0', color:'#fff'}}>VERIFICAR <span style={{color: '#FFD600', textShadow: '0 0 20px rgba(255,214,0,0.4)'}}>DEPÓSITO</span></h1>
              
              <div style={{background:'#000', border:'1px solid #111', borderRadius:'25px', padding:'30px', marginBottom:'30px', fontFamily:'JetBrains Mono'}}>
                <div style={{background:'#050505', border:'1px solid #FFD60044', borderRadius:'12px', height:'55px', display:'flex', alignItems:'center', padding:'0 15px', gap:'10px', marginBottom:'20px'}}>
                  <Landmark size={18} style={{color:'#FFD600'}}/>
                  <select 
                    name="metodoPago" 
                    value={formData.metodoPago} 
                    onChange={handleInputChange} 
                    style={{background:'transparent', color:'#fff', border:'none', width:'100%', outline:'none', appearance:'none'}}
                  >
                    {metodosDisponibles.map(m => (
                      <option key={m.id} value={m.id} style={{background:'#000'}}>{m.nombre}</option>
                    ))}
                  </select>
                </div>
                
                <div style={{color:'#555', fontSize:'13px', lineHeight:'1.6', marginBottom:'25px', borderLeft:'2px solid #222', paddingLeft:'15px'}}>
                  <span style={{color:'#FFD600'}}>{">> "}</span>
                  {metodosDisponibles.find(m => m.id === formData.metodoPago)?.info}
                </div>

                <div 
                  onClick={() => fileInputRef.current?.click()} 
                  style={{ 
                    border: '2px dashed #111', 
                    borderRadius: '20px', 
                    height: '180px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    cursor: 'pointer', 
                    overflow: 'hidden', 
                    borderColor: comprobante ? '#FFD600' : '#111' 
                  }}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    hidden 
                    onChange={handleFileChange} 
                    accept="image/*" 
                  />
                  {comprobanteUrl ? (
                    <img src={comprobanteUrl} style={{width:'100%', height:'100%', objectFit:'contain'}} alt="Voucher" />
                  ) : (
                    <UploadCloud size={35} style={{color: '#FFD600', opacity: '0.2'}}/>
                  )}
                </div>
              </div>

              {comprobante && (
                <div style={{color: '#FFD600', fontSize: '13px', textAlign: 'center', margin: '15px 0', fontWeight:'700'}}>
                  ✓ Comprobante cargado correctamente
                </div>
              )}

              {error && (
                <div style={{ 
                  background: '#FF3D0011', 
                  border: '1px solid #FF3D00', 
                  color: '#FF3D00', 
                  padding: '15px', 
                  borderRadius: '12px', 
                  marginBottom: '20px',
                  fontSize: '13px'
                }}>
                  ⚠️ {error}
                </div>
              )}

              <button 
                disabled={loading || !comprobante} 
                onClick={finalizarRegistro} 
                className="btn-final" 
                style={{
                  background: (!comprobante || loading) ? '#080808' : '#FFD600', 
                  color: (!comprobante || loading) ? '#222' : '#000', 
                  cursor: (!comprobante || loading) ? 'not-allowed' : 'pointer',
                  opacity: (!comprobante || loading) ? 0.6 : 1
                }}
              >
                {loading ? 'SINCRONIZANDO...' : 'FINALIZAR REGISTRO'}
              </button>
            </div>
          )}

          {paso === 5 && (
            <div className="fade-in" style={{textAlign:'center'}}>
              <div style={{marginBottom:'30px', display:'inline-block', padding:'30px', background:'#FFD60011', borderRadius:'100%', border:'1px solid #FFD60022'}}><Clock size={60} style={{color: '#FFD600'}} className="animate-pulse"/></div>
              <h1 style={{fontSize:'3.5rem', fontWeight:'900', letterSpacing:'-4px', lineHeight:'0.85', textTransform:'uppercase', margin:'40px 0', color:'#fff'}}>SOLICITUD EN <span style={{color: '#FFD600', textShadow: '0 0 20px rgba(255,214,0,0.4)'}}>REVISIÓN</span></h1>
              <div style={{background:'#080808', border:'1px solid #111', padding:'25px', borderRadius:'20px', marginBottom:'35px', color:'#666', fontSize:'14px', lineHeight:'1.6'}}>
                <p>Su información ha sido recibida y se encuentra en fase de auditoría.</p>
                <p style={{color:'#FFD600', fontWeight:'700', marginTop:'10px'}}>El pago y los datos serán verificados. En las próximas horas su cuenta será activada oficialmente tras la validación financiera.</p>
              </div>
              <button onClick={() => window.location.href = '/'} className="btn-final" style={{background:'#FFD600', color:'#000'}}>ENTENDIDO</button>
            </div>
          )}
        </div>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700;900&family=JetBrains+Mono:wght@700&display=swap');
        .unete-wrapper { background: #000; min-height: 100vh; color: #fff; font-family: 'Plus Jakarta Sans', sans-serif; display: flex; flex-direction: column; align-items: center; width: 100%; position: relative; overflow-x: hidden; }
        .bg-gradient-radial { position: fixed; inset: 0; background: radial-gradient(circle at center, #0a0a0a 0%, #000 100%); z-index: 0; pointer-events: none; }
        .input-group-elite { background: #000 !important; border: 1px solid #111 !important; border-radius: 14px; height: 65px; display: flex; align-items: center; padding: 0 20px; gap: 15px; margin-bottom: 15px; transition: 0.3s; }
        .input-group-elite input, .input-group-elite select { background: transparent !important; color: #fff !important; border: none !important; width: 100% !important; font-size: 16px; outline: none !important; -webkit-box-shadow: 0 0 0px 1000px #000 inset !important; -webkit-text-fill-color: #fff !important; }
        .input-group-elite input:focus, .input-group-elite input:active { background: transparent !important; -webkit-box-shadow: 0 0 0px 1000px #000 inset !important; }
        .btn-final { width: 100%; padding: 25px; border-radius: 18px; border: none; font-weight: 900; letter-spacing: 4px; text-transform: uppercase; transition: 0.4s; display: flex; align-items: center; justify-content: center; font-size: 14px; }
        .fade-in { animation: appear 0.6s ease-out forwards; }
        @keyframes appear { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}