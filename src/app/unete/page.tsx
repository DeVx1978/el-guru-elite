"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { 
  User, Mail, Lock, Phone, Target, Zap, Award, Star, 
  MapPin, UploadCloud, CheckCircle2, AlertTriangle, Eye, EyeOff, Briefcase,
  ChevronRight, ArrowLeft, Globe, ShieldCheck, Info, Landmark
} from 'lucide-react';

const clientSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const planes = [
  { id: 'micro', nombre: 'MICRO SOCIO', precio: 100, porcentaje: '0.067% de utilidades', icon: Target, color: '#E0E0E0' },
  { id: 'inicial', nombre: 'SOCIO INICIAL', precio: 250, porcentaje: '0.167% de utilidades', icon: Briefcase, color: '#81D4FA' },
  { id: 'activo', nombre: 'SOCIO ACTIVO', precio: 500, porcentaje: '0.333% de utilidades', icon: Zap, color: '#FFD54F' },
  { id: 'premium', nombre: 'SOCIO PREMIUM', precio: 1000, porcentaje: '0.667% de utilidades', icon: Award, color: '#FF8A65' },
  { id: 'elite', nombre: 'SOCIO ÉLITE', precio: 1500, porcentaje: '1.0% de utilidades', icon: Star, color: '#00C853' },
];

const paises = [
  { nombre: 'Colombia', codigo: '+57', flag: '🇨🇴' },
  { nombre: 'Ecuador', codigo: '+593', flag: '🇪🇨' },
  { nombre: 'México', codigo: '+52', flag: '🇲🇽' },
  { nombre: 'Perú', codigo: '+51', flag: '🇵🇪' },
  { nombre: 'España', codigo: '+34', flag: '🇪🇸' },
  { nombre: 'Estados Unidos', codigo: '+1', flag: '🇺🇸' },
  { nombre: 'Otros', codigo: '', flag: '🌐' },
];

const obtenerMetodosPago = (pais: string) => {
  if (pais === 'Ecuador') {
    return [
      { id: 'pichincha', nombre: 'Banco Pichincha', info: 'Cta Ahorros: 2208543100 - Titular: El Gurú Élite' },
      { id: 'guayaquil', nombre: 'Banco Guayaquil', info: 'Cta Corriente: 11452290 - Titular: Gestión Élite' },
      { id: 'western_ec', nombre: 'Western Union', info: 'Beneficiario: Maria José - CI: [PROVISIONAL]' },
      { id: 'nequi_ec', nombre: 'Depósito Nequi', info: 'Celular: +593 [NÚMERO]' },
      { id: 'usdt_ec', nombre: 'USDT (Red TRC20)', info: 'Wallet: TXu4...Red TRC20' },
    ];
  }
  if (pais === 'Colombia') {
    return [
      { id: 'bancolombia', nombre: 'Bancolombia', info: 'Cta Ahorros: 542-000123-01 - Titular: El Gurú' },
      { id: 'davivienda', nombre: 'Davivienda', info: 'Cta Ahorros: 0099-7001-22 - Titular: Gestión Élite' },
      { id: 'nequi_co', nombre: 'Nequi', info: 'Celular: 310 123 4567 - Nombre: Maria José' },
      { id: 'usdt_co', nombre: 'USDT (Red TRC20)', info: 'Wallet: TXu4...Red TRC20' },
    ];
  }
  return [
    { id: 'western_global', nombre: 'Western Union', info: 'Solicitar datos de envío al soporte oficial.' },
    { id: 'usdt_global', nombre: 'USDT (Red TRC20)', info: 'Wallet Global: TXu4...Red TRC20' },
  ];
};

export default function UnetePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [paso, setPaso] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPass, setShowPass] = useState(false);
  const [comprobante, setComprobante] = useState<File | null>(null);
  const [comprobanteUrl, setComprobanteUrl] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    nombre: '', email: '', password: '', confirmPassword: '',
    pais: 'Colombia', ciudad: '', codigoArea: '+57', telefono: '',
    plan: 'micro', metodoPago: '', tyc: false, politicas: false
  });

  const metodosDisponibles = obtenerMetodosPago(formData.pais);

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

      // REGISTRO EN SOCIOS (Columna email corregida)
      const { data: socio, error: errSocio } = await clientSupabase
        .from('socios')
        .insert([{
          nombre: formData.nombre.trim(),
          email: correoLimpio,
          password: formData.password,
          estado: 'pendiente',
          rol: 'socio'
        }])
        .select().single();
      
      if (errSocio) {
          if (errSocio.code === '23505') throw new Error("Este correo ya está registrado.");
          throw new Error(`Error en servidor: ${errSocio.message}`);
      }

      // REGISTRO EN SOCIOS_ELITE (Omitiendo metodo_pago para evitar error de columna)
      const { error: errElite } = await clientSupabase
        .from('socios_elite')
        .insert([{
          id_socio: socio.id,
          nivel_socio: formData.plan.toUpperCase(),
          inversion_minima: planes.find(p => p.id === formData.plan)?.precio,
          pais: formData.pais,
          telefono: `${formData.codigoArea} ${formData.telefono}`,
          ciudad: formData.ciudad
        }]);

      if (errElite) throw new Error(`Error en datos financieros: ${errElite.message}`);

      setPaso(5);
    } catch (err: any) { 
      setError(err.message); 
      setLoading(false);
    }
  };

  const paso1Valido = formData.nombre && formData.email && formData.password.length >= 6 && formData.password === formData.confirmPassword && formData.tyc && formData.politicas;
  const paso2Valido = formData.pais && formData.ciudad && formData.telefono;

  return (
    <div className="unete-wrapper">
      <nav className="unete-nav">
        <button onClick={() => paso > 1 ? setPaso(paso-1) : router.push('/')} className="nav-back">
          <ArrowLeft size={18}/> {paso === 5 ? 'INICIO' : 'VOLVER'}
        </button>
        <div className="progress-bar">
          {[1, 2, 3, 4].map(p => (<div key={p} className={`dot ${paso >= p ? 'active' : ''}`}></div>))}
        </div>
      </nav>

      <main className="unete-content">
        <div className="form-container">
          {paso === 1 && (
            <div className="fade-in">
              <span className="step-badge">PASO 01</span>
              <h1>CREAR CUENTA <span>ÉLITE</span></h1>
              <div className="input-group">
                <div className="field"><User size={18}/><input name="nombre" placeholder="Nombre Completo" value={formData.nombre} onChange={handleInputChange}/></div>
                <div className="field"><Mail size={18}/><input name="email" placeholder="Email Corporativo" value={formData.email} onChange={handleInputChange}/></div>
                <div className="field">
                  <Lock size={18}/><input type={showPass ? "text" : "password"} name="password" placeholder="Contraseña (Mín. 6)" value={formData.password} onChange={handleInputChange}/>
                  <button onClick={() => setShowPass(!showPass)} className="btn-eye">{showPass ? <EyeOff size={18}/> : <Eye size={18}/>}</button>
                </div>
                <div className="field">
                  <Lock size={18}/><input type={showPass ? "text" : "password"} name="confirmPassword" placeholder="Confirmar Contraseña" value={formData.confirmPassword} onChange={handleInputChange}/>
                  <button onClick={() => setShowPass(!showPass)} className="btn-eye">{showPass ? <EyeOff size={18}/> : <Eye size={18}/>}</button>
                </div>
              </div>
              <div className="checks">
                <label className="check-item"><input type="checkbox" name="tyc" checked={formData.tyc} onChange={handleInputChange} /><span>Acepto Términos</span></label>
                <label className="check-item"><input type="checkbox" name="politicas" checked={formData.politicas} onChange={handleInputChange} /><span>Acepto Privacidad</span></label>
              </div>
              <button disabled={!paso1Valido} onClick={() => setPaso(2)} className="btn-primary">CONTINUAR <ChevronRight size={18}/></button>
            </div>
          )}

          {paso === 2 && (
            <div className="fade-in">
              <span className="step-badge">PASO 02</span>
              <h1>DATOS DE <span>ORIGEN</span></h1>
              <div className="input-group">
                <div className="field">
                  <Globe size={18}/>
                  <select name="pais" value={formData.pais} onChange={(e) => {
                    const p = paises.find(x => x.nombre === e.target.value);
                    setFormData({...formData, pais: e.target.value, codigoArea: p?.codigo || ''});
                  }}>{paises.map(p => <option key={p.nombre} value={p.nombre}>{p.flag} {p.nombre}</option>)}</select>
                </div>
                <div className="field"><MapPin size={18}/><input name="ciudad" placeholder="Ciudad" value={formData.ciudad} onChange={handleInputChange}/></div>
                <div className="phone-grid">
                  <div className="area-code">{formData.codigoArea}</div>
                  <div className="field no-margin"><Phone size={18}/><input name="telefono" placeholder="Número" value={formData.telefono} onChange={handleInputChange}/></div>
                </div>
              </div>
              <button disabled={!paso2Valido} onClick={() => setPaso(3)} className="btn-primary">SELECCIONAR PLAN <ChevronRight size={18}/></button>
            </div>
          )}

          {paso === 3 && (
            <div className="fade-in">
              <span className="step-badge">PASO 03</span>
              <h1>PORTAFOLIO DE <span>INVERSIÓN</span></h1>
              <div className="planes-stack">
                {planes.map(p => (
                  <div key={p.id} className={`plan-card ${formData.plan === p.id ? 'active' : ''}`} onClick={() => setFormData({...formData, plan: p.id})} style={{'--color': p.color} as any}>
                    <div className="plan-icon"><p.icon size={24}/></div>
                    <div className="plan-info"><h3>{p.nombre}</h3><p>{p.porcentaje}</p></div>
                    <div className="plan-price">${p.precio}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => setPaso(4)} className="btn-primary">PROCEDER AL PAGO <ChevronRight size={18}/></button>
            </div>
          )}

          {paso === 4 && (
            <div className="fade-in">
              <span className="step-badge">PASO 04</span>
              <h1>VERIFICAR <span>DEPÓSITO</span></h1>
              <div className="payment-box">
                <div className="pay-summary">
                  <span>MÉTODO DE PAGO</span>
                  <div className="field select-pay">
                    <Landmark size={18} color="#00C853" />
                    <select name="metodoPago" value={formData.metodoPago} onChange={handleInputChange}>
                      {metodosDisponibles.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
                    </select>
                  </div>
                </div>
                <div className="pay-details"><Info size={16}/><p>{metodosDisponibles.find(m => m.id === formData.metodoPago)?.info}</p></div>
                <div className="upload-zone" onClick={() => fileInputRef.current?.click()}>
                  <input type="file" ref={fileInputRef} hidden onChange={handleFileChange} accept="image/*"/>
                  {comprobanteUrl ? <img src={comprobanteUrl} className="preview"/> : <><UploadCloud size={32}/><p>Adjuntar Comprobante</p></>}
                </div>
                {error && <div className="error-tag"><AlertTriangle size={14}/> {error}</div>}
              </div>
              <button disabled={loading || !comprobante} onClick={finalizarRegistro} className="btn-primary">
                {loading ? 'SINCRONIZANDO...' : 'FINALIZAR REGISTRO'}
              </button>
            </div>
          )}

          {paso === 5 && (
            <div className="fade-in success-screen">
              <div className="icon-glow"><ShieldCheck size={60} color="#00C853"/></div>
              <h1>SOLICITUD EN <span>AUDITORÍA</span></h1>
              <div className="alert-message">
                <Info size={20} color="#00C853" />
                <p>Su información de pago entrará en proceso de verificación y en las próximas horas su cuenta será activada o rechazada.</p>
              </div>
              <button onClick={() => router.push('/')} className="btn-primary">ENTENDIDO</button>
            </div>
          )}
        </div>
      </main>

      <style jsx global>{`
        .unete-wrapper { background: #000; min-height: 100vh; color: #fff; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; }
        .unete-nav { display: flex; justify-content: space-between; align-items: center; padding: 25px 20px; border-bottom: 1px solid #111; max-width: 1200px; margin: 0 auto; width: 100%; }
        .nav-back { background: none; border: none; color: #444; font-weight: 800; font-size: 11px; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: 0.3s; }
        .progress-bar { display: flex; gap: 8px; }
        .dot { width: 30px; height: 3px; background: #111; border-radius: 10px; }
        .dot.active { background: #00C853; box-shadow: 0 0 10px #00C853; }
        .unete-content { flex: 1; display: flex; justify-content: center; align-items: center; padding: 40px 20px; }
        .form-container { width: 100%; max-width: 480px; }
        .step-badge { font-size: 10px; font-weight: 900; color: #00C853; letter-spacing: 3px; display: block; margin-bottom: 10px; }
        h1 { font-size: 2rem; font-weight: 900; margin-bottom: 10px; letter-spacing: -1.5px; }
        h1 span { color: #00C853; }
        .input-group { display: flex; flex-direction: column; gap: 12px; margin-bottom: 25px; }
        .field { background: #050505; border: 1px solid #111; border-radius: 12px; display: flex; align-items: center; padding: 0 15px; gap: 12px; transition: 0.3s; }
        .field:focus-within { border-color: #00C853; }
        .field input, .field select { background: transparent; border: none; padding: 15px 0; color: #fff; width: 100%; outline: none; font-size: 14px; font-weight: 600; }
        .btn-eye { background: none; border: none; color: #333; cursor: pointer; }
        .phone-grid { display: flex; gap: 10px; }
        .area-code { background: #111; padding: 15px; border-radius: 12px; font-weight: 900; color: #00C853; min-width: 60px; text-align: center; }
        .btn-primary { width: 100%; background: #00C853; color: #000; border: none; padding: 20px; border-radius: 14px; font-weight: 900; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 10px; }
        .btn-primary:disabled { background: #111; color: #444; cursor: not-allowed; opacity: 0.5; }
        .planes-stack { display: flex; flex-direction: column; gap: 10px; margin-bottom: 30px; }
        .plan-card { background: #050505; border: 1px solid #111; padding: 20px; border-radius: 16px; cursor: pointer; display: flex; align-items: center; gap: 15px; }
        .plan-card.active { border-color: var(--color); }
        .payment-box { background: #050505; border: 1px solid #111; padding: 25px; border-radius: 20px; margin-bottom: 30px; }
        .pay-details { background: rgba(0,200,83,0.05); border: 1px solid rgba(0,200,83,0.1); padding: 15px; border-radius: 12px; display: flex; gap: 12px; margin-bottom: 20px; font-size: 12px; color: #ccc; }
        .upload-zone { border: 2px dashed #111; border-radius: 15px; height: 150px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #444; cursor: pointer; overflow: hidden; }
        .preview { width: 100%; height: 100%; object-fit: contain; }
        .error-tag { background: rgba(255,0,0,0.1); color: #ff4444; padding: 12px; border-radius: 8px; font-size: 11px; font-weight: 800; margin-top: 15px; display: flex; gap: 8px; }
        .success-screen { text-align: center; padding-top: 20px; }
        .alert-message { background: #050505; border: 1px solid #111; padding: 25px; border-radius: 20px; text-align: left; margin: 30px 0; border-left: 4px solid #00C853; display: flex; gap: 15px; }
        .alert-message p { margin: 0; color: #888; font-size: 13px; line-height: 1.6; }
        .icon-glow { filter: drop-shadow(0 0 15px rgba(0,200,83,0.3)); margin-bottom: 25px; }
        .fade-in { animation: fadeIn 0.6s cubic-bezier(0.19, 1, 0.22, 1); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}