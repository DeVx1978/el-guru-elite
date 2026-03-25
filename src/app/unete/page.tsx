"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { 
  User, Mail, Lock, Phone, Target, Zap, Award, Star, 
  MapPin, UploadCloud, CheckCircle2, AlertTriangle, Eye, EyeOff, Briefcase,
  ChevronRight, ArrowLeft, Globe, ShieldCheck, Info, Landmark, TrendingUp, Sparkles
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
    plan: '', metodoPago: '', tyc: false, politicas: false
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

  const finalizarRegistro = async () => {
    setLoading(true);
    setError(null);
    try {
      const correoLimpio = formData.email.trim().toLowerCase();
      const { data: socio, error: errSocio } = await clientSupabase
        .from('socios')
        .insert([{
          nombre: formData.nombre.trim(),
          email: correoLimpio,
          password: formData.password,
          pais: formData.pais,      
          telefono: `${formData.codigoArea} ${formData.telefono}`,
          plan: formData.plan,      
          estado: 'pendiente',
          rol: 'socio'
        }])
        .select().single();
      
      if (errSocio) throw new Error(errSocio.message);

      await clientSupabase.from('socios_elite').insert([{
          id_socio: socio.id,
          nivel_socio: formData.plan.toUpperCase(),
          ciudad: formData.ciudad
      }]);

      setPaso(5);
    } catch (err: any) { 
      setError(err.message); 
      setLoading(false);
    }
  };

  // VALIDACIÓN DE LOGICA REFORZADA
  const paso1Valido = formData.nombre.trim().length > 2 && 
                      formData.email.includes('@') && 
                      formData.password.length >= 6 && 
                      formData.password === formData.confirmPassword && 
                      formData.tyc === true;

  const paso2Valido = formData.pais !== '' && 
                      formData.pais !== 'Seleccione Nación...' && 
                      formData.ciudad.trim().length > 1 && 
                      formData.telefono.trim().length > 5;

  const paso3Valido = formData.plan !== '';

  if (!isMounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className="unete-wrapper">
      <div className="bg-gradient-radial"></div>

      <nav className="unete-nav">
        <button onClick={() => paso > 1 ? setPaso(paso-1) : router.push('/')} className="nav-back-elite">
          <ArrowLeft size={18} className="text-[#00C853]"/> <span>VOLVER</span>
        </button>
        <div className="elite-stepper">
          <div className="step-tag">FASE 0{paso}</div>
          <div className="progress-track-elite">
            <div className="progress-fill-neon" style={{ width: `${(paso/4)*100}%` }}></div>
          </div>
        </div>
      </nav>

      <main className="unete-content">
        <div className="vault-container-premium">
          <div className="security-scan-fx"></div>

          {/* PASO 1: IDENTIDAD */}
          {paso === 1 && (
            <div className="fade-in">
              <span className="badge-protocol"><Sparkles size={12} className="mr-2"/> PROTOCOLO DE IDENTIDAD</span>
              <h1 className="title-premium">FORJAR <span className="neon-text">IDENTIDAD</span></h1>
              
              <div className="stack-inputs-premium">
                <div className="input-group-premium">
                  <User size={18} className="icon-input-fx"/>
                  <input name="nombre" placeholder="Nombre Completo" value={formData.nombre} onChange={handleInputChange} autoComplete="off" />
                </div>
                <div className="input-group-premium">
                  <Mail size={18} className="icon-input-fx"/>
                  <input name="email" placeholder="Email de Inversor" value={formData.email} onChange={handleInputChange} autoComplete="off" />
                </div>
                <div className="grid-dual-premium">
                  <div className="input-group-premium">
                    <Lock size={18} className="icon-input-fx"/>
                    <input type={showPass ? "text" : "password"} name="password" placeholder="Contraseña" value={formData.password} onChange={handleInputChange}/>
                    <button onClick={() => setShowPass(!showPass)} className="btn-v-eye">{showPass ? <EyeOff size={16}/> : <Eye size={16}/>}</button>
                  </div>
                  <div className="input-group-premium">
                    <Lock size={18} className="icon-input-fx"/>
                    <input type={showPass ? "text" : "password"} name="confirmPassword" placeholder="Validar" value={formData.confirmPassword} onChange={handleInputChange}/>
                  </div>
                </div>
              </div>

              <div className="legal-area-premium">
                <label className="checkbox-cyber-label">
                  <input type="checkbox" name="tyc" checked={formData.tyc} onChange={handleInputChange} />
                  <div className="custom-check-vault"></div>
                  <span>ACEPTO PROTOCOLOS DE SEGURIDAD ÉLITE</span>
                </label>
              </div>

              <button 
                disabled={!paso1Valido} 
                onClick={() => setPaso(2)} 
                className={`btn-action-main-neon ${paso1Valido ? 'active-glow' : 'locked-dim'}`}
              >
                {paso1Valido ? 'INICIAR SECUENCIA' : 'COMPLETE SUS DATOS'} <ChevronRight size={20} className="ml-2"/>
              </button>
            </div>
          )}

          {/* PASO 2: GEOGRAFÍA */}
          {paso === 2 && (
            <div className="fade-in">
              <h1 className="title-premium">ORIGEN <span className="neon-text-blue">GEOGRÁFICO</span></h1>
              <div className="stack-inputs-premium">
                <div className="input-group-premium border-blue-glow">
                  <Globe size={18} className="icon-input-fx text-[#00B0FF]"/>
                  <select name="pais" value={formData.pais} onChange={(e) => {
                    const p = paises.find(x => x.nombre === e.target.value);
                    setFormData({...formData, pais: e.target.value, codigoArea: p?.codigo || ''});
                  }}>{paises.map(p => <option key={p.nombre} value={p.nombre} className="opt-dark">{p.flag} {p.nombre}</option>)}</select>
                </div>
                <div className="input-group-premium border-blue-glow">
                  <MapPin size={18} className="icon-input-fx text-[#00B0FF]"/>
                  <input name="ciudad" placeholder="Jurisdicción de Residencia" value={formData.ciudad} onChange={handleInputChange}/>
                </div>
                <div className="grid-phone-premium">
                  <div className="area-code-vault">{formData.codigoArea || '--'}</div>
                  <div className="input-group-premium flex-1 border-blue-glow">
                    <Phone size={18} className="icon-input-fx text-[#00B0FF]"/>
                    <input name="telefono" placeholder="WhatsApp Móvil" value={formData.telefono} onChange={handleInputChange}/>
                  </div>
                </div>
              </div>
              <button 
                disabled={!paso2Valido} 
                onClick={() => setPaso(3)} 
                className={`btn-action-main-neon btn-blue ${paso2Valido ? 'active-glow' : 'locked-dim'}`}
              >
                VALIDAR UBICACIÓN
              </button>
            </div>
          )}

          {/* PASO 3: MEMBRESÍAS CON BORDE NEÓN */}
          {paso === 3 && (
            <div className="fade-in">
              <h1 className="title-premium">RANGO DE <span className="neon-text-purple">INVERSIÓN</span></h1>
              <div className="plans-stack-premium">
                {planes.map(p => (
                  <div key={p.id} 
                    className={`plan-card-premium ${formData.plan === p.id ? 'active' : ''}`} 
                    onClick={() => setFormData({...formData, plan: p.id})} 
                    style={{'--p-color': p.color} as any}
                  >
                    <div className="p-icon-premium" style={{color: p.color, background: `${p.color}15`}}><p.icon size={20}/></div>
                    <div className="p-data-premium"><h3>{p.nombre}</h3><p>{p.porcentaje}</p></div>
                    <div className="p-price-premium" style={{color: p.color}}>${p.precio}</div>
                    {/* BORDE NEÓN DINÁMICO */}
                    <div className="card-border-fx" style={{background: `linear-gradient(90deg, transparent, ${p.color}, transparent)`}}></div>
                  </div>
                ))}
              </div>
              <button 
                disabled={!paso3Valido} 
                onClick={() => setPaso(4)} 
                className={`btn-action-main-neon btn-purple ${paso3Valido ? 'active-glow' : 'locked-dim'}`}
              >
                PROSEGUIR AL PAGO
              </button>
            </div>
          )}

          {/* PASO 4: DEPÓSITO - TERMINAL BLACK */}
          {paso === 4 && (
            <div className="fade-in">
              <h1 className="title-premium">VERIFICAR <span className="neon-text-gold">DEPÓSITO</span></h1>
              <div className="terminal-vault-premium">
                <div className="term-header-fx"><span>SECURE_NODE_TRANSFER_V4</span></div>
                <div className="term-body-fx">
                  <select name="metodoPago" className="term-select-fx" value={formData.metodoPago} onChange={handleInputChange}>
                    {metodosDisponibles.map(m => <option key={m.id} value={m.id} className="opt-dark">{m.nombre}</option>)}
                  </select>
                  <p className="term-info-txt">
                    <span className="term-cursor">{'>>'} </span> 
                    {metodosDisponibles.find(m => m.id === formData.metodoPago)?.info}
                  </p>
                </div>
                <div className="term-upload-vault" onClick={() => fileInputRef.current?.click()} style={{ borderColor: comprobante ? '#00C853' : '#111' }}>
                  <input type="file" ref={fileInputRef} hidden onChange={handleFileChange} accept="image/*"/>
                  {comprobanteUrl ? (
                    <img src={comprobanteUrl} className="voucher-preview-img" alt="Voucher" />
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <UploadCloud size={35} className="text-[#222]"/>
                      <p className="text-[10px] font-bold tracking-widest text-[#1a1a1a]">SUBIR VOUCHER</p>
                    </div>
                  )}
                </div>
              </div>
              <button 
                disabled={loading || !comprobante} 
                onClick={finalizarRegistro} 
                className={`btn-action-main-neon btn-gold ${(!comprobante || loading) ? 'locked-dim' : 'active-glow'}`}
              >
                {loading ? 'SINCRONIZANDO...' : 'FINALIZAR REGISTRO'}
              </button>
            </div>
          )}

          {paso === 5 && (
            <div className="fade-in success-vault-center">
              <div className="final-glow-icon-fx"><ShieldCheck size={100} color="#00C853"/></div>
              <h1 className="title-premium">SOLICITUD <span className="neon-text">AUDITADA</span></h1>
              <div className="alert-message-fx">
                <Info size={24} color="#00C853" />
                <p>Su información ha sido recibida bajo protocolos de encriptación. El equipo financiero validará su depósito para activar su cuenta Élite.</p>
              </div>
              <button onClick={() => window.location.href = '/'} className="btn-action-main-neon active-glow">ENTRAR A LA PLATAFORMA</button>
            </div>
          )}
        </div>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;700;800&family=JetBrains+Mono&display=swap');

        .unete-wrapper { background: #000; min-height: 100vh; color: #fff; font-family: 'Plus Jakarta Sans', sans-serif; display: flex; flex-direction: column; overflow-x: hidden; position: relative; }
        .bg-gradient-radial { position: fixed; inset: 0; background: radial-gradient(circle at center, #080808 0%, #000 100%); z-index: 0; pointer-events: none; }

        /* NAVEGACIÓN - Z-INDEX CORREGIDO */
        .unete-nav { position: relative; z-index: 200; padding: 50px 8%; display: flex; justify-content: space-between; align-items: center; }
        .nav-back-elite { background: rgba(255,255,255,0.02); border: 1px solid #111; color: #444; padding: 12px 25px; border-radius: 12px; font-weight: 800; font-size: 10px; letter-spacing: 2px; cursor: pointer; display: flex; align-items: center; gap: 12px; transition: 0.3s; pointer-events: auto; }
        .nav-back-elite:hover { border-color: #00C853; color: #fff; box-shadow: 0 0 20px rgba(0,200,83,0.1); }
        
        .elite-stepper { width: 100%; max-width: 250px; text-align: right; }
        .step-tag { font-size: 10px; font-weight: 900; color: #1a1a1a; letter-spacing: 4px; margin-bottom: 8px; }
        .progress-track-elite { height: 2px; background: #080808; border-radius: 10px; overflow: hidden; }
        .progress-fill-neon { height: 100%; background: #00C853; transition: 1s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 0 15px rgba(0, 200, 83, 0.4); }

        /* VAULT CONTAINER */
        .unete-content { position: relative; z-index: 10; flex: 1; display: flex; justify-content: center; align-items: center; padding-bottom: 100px; padding-top: 20px; }
        .vault-container-premium { width: 100%; max-width: 580px; background: rgba(4,4,4,0.7); backdrop-filter: blur(40px); border: 1px solid rgba(255,255,255,0.03); padding: 60px; border-radius: 50px; box-shadow: 0 80px 150px rgba(0,0,0,0.9); position: relative; overflow: hidden; }
        
        .security-scan-fx { position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(to right, transparent, #00C853, transparent); animation: scannerFx 4s infinite linear; opacity: 0.4; }
        @keyframes scannerFx { 0% { top: 0; } 100% { top: 100%; } }

        .badge-protocol { font-size: 9px; font-weight: 800; color: #00C853; letter-spacing: 5px; margin-bottom: 25px; display: flex; align-items: center; opacity: 0.6; text-transform: uppercase; }
        .title-premium { font-size: 3.2rem; font-weight: 800; line-height: 0.85; letter-spacing: -4px; margin-bottom: 45px; }
        .neon-text { color: #00C853; text-shadow: 0 0 35px rgba(0, 200, 83, 0.4); }
        .neon-text-blue { color: #00B0FF; text-shadow: 0 0 35px rgba(0, 176, 255, 0.4); }
        .neon-text-purple { color: #AA00FF; text-shadow: 0 0 35px rgba(170, 0, 255, 0.4); }
        .neon-text-gold { color: #FFD600; text-shadow: 0 0 35px rgba(255, 214, 0, 0.4); }

        /* INPUTS - PROTOCOLO CAJAS NEGRAS */
        .stack-inputs-premium { display: flex; flex-direction: column; gap: 16px; margin-bottom: 40px; }
        .input-group-premium { background: #000 !important; border: 1px solid #111; border-radius: 18px; display: flex; align-items: center; padding: 0 25px; gap: 20px; transition: 0.4s; }
        .input-group-premium:focus-within { border-color: #00C853; box-shadow: 0 10px 30px rgba(0,200,83,0.08); }
        .input-group-premium input, .input-group-premium select { background: transparent !important; border: none !important; padding: 24px 0 !important; color: #fff !important; font-size: 15px; font-weight: 300; width: 100%; outline: none; -webkit-box-shadow: 0 0 0px 1000px #000 inset !important; -webkit-text-fill-color: #fff !important; }
        .opt-dark { background: #080808 !important; color: #fff !important; }
        .icon-input-fx { color: #151515; transition: 0.3s; }
        .input-group-premium:focus-within .icon-input-fx { color: #00C853; }
        
        .grid-dual-premium, .grid-phone-premium { display: flex; gap: 15px; }
        .area-code-vault { background: #060606; border: 1px solid #111; padding: 24px; border-radius: 18px; font-weight: 800; color: #00B0FF; min-width: 85px; text-align: center; }

        /* CHECKBOX - ESTILO RADAR */
        .legal-area-premium { margin-bottom: 45px; }
        .checkbox-cyber-label { display: flex; align-items: center; gap: 18px; cursor: pointer; }
        .checkbox-cyber-label input { display: none; }
        .custom-check-vault { width: 24px; height: 24px; border: 2px solid #111; border-radius: 8px; transition: 0.3s; position: relative; }
        .checkbox-cyber-label input:checked + .custom-check-vault { background: #00C853; border-color: #00C853; box-shadow: 0 0 15px #00C853; }
        .checkbox-cyber-label input:checked + .custom-check-vault:after { content: '✓'; color: #000; position: absolute; left: 5px; top: -1px; font-weight: 900; font-size: 16px; }
        .checkbox-cyber-label span { font-size: 11px; font-weight: 700; color: #333; letter-spacing: 2px; }

        /* BOTONES - ACTIVACIÓN INTELIGENTE */
        .btn-action-main-neon { width: 100%; padding: 30px; border-radius: 20px; border: none; font-weight: 900; font-size: 14px; letter-spacing: 5px; transition: 0.5s; cursor: pointer; text-transform: uppercase; }
        .btn-action-main-neon.locked-dim { background: #080808; color: #1a1a1a; cursor: not-allowed; }
        .btn-action-main-neon.active-glow { background: #00C853; color: #000; box-shadow: 0 20px 50px rgba(0, 200, 83, 0.4); animation: pulseNeon 3s infinite; }
        
        @keyframes pulseNeon { 
          0%, 100% { transform: scale(1); box-shadow: 0 20px 50px rgba(0, 200, 83, 0.3); } 
          50% { transform: scale(1.01); box-shadow: 0 25px 60px rgba(0, 200, 83, 0.5); } 
        }

        /* PLAN CARDS - BORDES NEÓN */
        .plans-stack-premium { display: flex; flex-direction: column; gap: 14px; margin-bottom: 45px; }
        .plan-card-premium { background: rgba(255,255,255,0.01); border: 1px solid #0a0a0a; border-radius: 26px; padding: 28px; display: flex; align-items: center; gap: 24px; cursor: pointer; transition: 0.4s; position: relative; overflow: hidden; }
        .plan-card-premium:hover { border-color: var(--p-color); transform: translateX(12px); }
        .plan-card-premium.active { border-color: var(--p-color); background: rgba(255,255,255,0.04); }
        .card-border-fx { position: absolute; bottom: 0; left: 0; width: 100%; height: 2px; opacity: 0; transition: 0.3s; }
        .plan-card-premium.active .card-border-fx { opacity: 1; }
        .p-price-premium { margin-left: auto; font-size: 2.2rem; font-weight: 800; letter-spacing: -2px; }

        /* TERMINAL VAULT - BLACK STYLE */
        .terminal-vault-premium { background: #000; border: 1px solid #111; border-radius: 35px; padding: 40px; margin-bottom: 45px; font-family: 'JetBrains Mono', monospace; }
        .term-header-fx { font-size: 9px; color: #222; margin-bottom: 25px; letter-spacing: 3px; font-weight: 800; }
        .term-select-fx { width: 100%; background: #050505; border: 1px solid #111; color: #00C853; padding: 20px; border-radius: 14px; outline: none; margin-bottom: 25px; font-weight: 700; font-size: 14px; }
        .term-info-txt { color: #555; font-size: 13px; line-height: 1.8; margin-bottom: 35px; }
        .term-cursor { color: #00C853; animation: blinkFx 1s infinite; }
        @keyframes blinkFx { 50% { opacity: 0; } }
        .term-upload-vault { border: 2px dashed #111; height: 180px; border-radius: 28px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 15px; cursor: pointer; transition: 0.3s; background: #020202; }
        .term-upload-vault:hover { border-color: #00C853; }
        .voucher-preview-img { width: 100%; height: 100%; object-fit: contain; padding: 20px; }

        .fade-in { animation: vaultAppear 1s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        @keyframes vaultAppear { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 600px) {
          .vault-container-premium { padding: 40px 25px; border-radius: 40px; }
          .title-premium { font-size: 2.4rem; }
          .p-price-premium { font-size: 1.6rem; }
          .btn-action-main-neon { padding: 24px; font-size: 11px; }
        }
      `}</style>
    </div>
  );
}