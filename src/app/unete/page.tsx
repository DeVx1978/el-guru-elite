"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { 
  User, Mail, Lock, Phone, Target, Zap, Award, Star, 
  MapPin, UploadCloud, ShieldCheck, Landmark, Sparkles, Clock, Eye, EyeOff, ArrowLeft, Globe, TrendingUp, Briefcase
} from 'lucide-react';

const clientSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const planes = [
  { id: 'micro', nombre: 'MICRO SOCIO', precio: 100, porcentaje: '0.067% Utilidad', icon: Target, color: '#E0E0E0' },
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
      { id: 'nequi_ec', nombre: 'NEQUI / DEUNA', info: 'Celular: +593 [NÚMERO] - Titular: Maria José' },
      { id: 'western_ec', nombre: 'WESTERN UNION', info: 'Beneficiario: Maria José - Solicitar C.I. al soporte' },
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

  const paso1Valido = formData.nombre.trim().length > 2 && 
                      formData.email.includes('@') && 
                      formData.password.length >= 6 && 
                      formData.password === formData.confirmPassword && 
                      formData.tyc;

  const paso2Valido = formData.pais !== '' && 
                      formData.ciudad.trim().length > 1 && 
                      formData.telefono.trim().length >= 7;

  const paso3Valido = formData.plan !== '';
  const paso4Valido = !!comprobante;

  useEffect(() => { 
    setIsMounted(true); 
  }, []);

  useEffect(() => {
    if (metodosDisponibles.length > 0 && !formData.metodoPago) {
      setFormData(prev => ({ ...prev, metodoPago: metodosDisponibles[0].id }));
    }
  }, [formData.pais, metodosDisponibles]);

  useEffect(() => {
    return () => {
      if (comprobanteUrl) URL.revokeObjectURL(comprobanteUrl);
    };
  }, [comprobanteUrl]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
    if (error) setError(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      if (comprobanteUrl) URL.revokeObjectURL(comprobanteUrl);
      setComprobante(file);
      setComprobanteUrl(URL.createObjectURL(file));
      setError(null);
    }
  };

  const finalizarRegistro = async () => {
    if (!comprobante) {
      setError("Debes subir el comprobante de depósito");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // FIX: Cálculo del plan justo antes de insertar para evitar NULLs
      const planSeleccionado = planes.find(p => p.id === formData.plan);
      const valorPlan = planSeleccionado ? planSeleccionado.precio : 0;
      const nombrePlan = planSeleccionado ? planSeleccionado.nombre : 'N/A';

      const fileExt = comprobante.name.split('.').pop()?.toLowerCase() || 'png';
      const fileName = `comprobantes/${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;

      const { error: uploadError } = await clientSupabase.storage
        .from('pagos')
        .upload(fileName, comprobante);

      if (uploadError) throw new Error(`Error al subir el comprobante: ${uploadError.message}`);

      const { data: urlData } = clientSupabase.storage
        .from('pagos')
        .getPublicUrl(fileName);

      const publicUrl = urlData.publicUrl;

      // INSERT ATÓMICO EN SOCIOS CON VALORES FORZADOS
      const { data: socio, error: errSocio } = await clientSupabase
        .from('socios')
        .insert([{
          nombre: formData.nombre.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          rol: 'socio',
          estado: 'pendiente',
          utilidad_total: 0,
          comprobante_url: publicUrl,
          // Forzamos los campos que salían NULL
          plan: nombrePlan,
          inversion: valorPlan,
          pais: formData.pais,
          ciudad: formData.ciudad || '',
          telefono: `${formData.codigoArea} ${formData.telefono}`
        }])
        .select()
        .single();

      if (errSocio || !socio?.id) throw errSocio || new Error("No se pudo crear el socio");

      // RESPALDO EN SOCIOS_ELITE (Mantenemos por arquitectura)
      await clientSupabase.from('socios_elite').insert([{
        id_socio: socio.id,
        nivel_socio: nombrePlan,
        inversion_minima: valorPlan,
        pais: formData.pais,
        ciudad: formData.ciudad || '',
        telefono: `${formData.codigoArea} ${formData.telefono}`
      }]);

      setPaso(5);
    } catch (err: any) {
      console.error("Error en registro:", err);
      setError(err.message || "Error en el protocolo de registro. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) return <div className="min-h-screen bg-black" />;

  return (
    <div className="unete-wrapper">
      <div className="bg-gradient-radial"></div>
      
      <nav className="unete-nav">
        <button onClick={() => paso > 1 ? setPaso(paso-1) : router.push('/')} className="back-link">
          <ArrowLeft size={18}/> <span>VOLVER</span>
        </button>
        <div className="step-indicator">
          <div className="step-text">FASE 0{paso}</div>
          <div className="step-bar">
            <div className="fill" style={{
              width: `${(paso / 4) * 100}%`, 
              backgroundColor: paso === 1 ? '#00C853' : paso === 2 ? '#00B0FF' : paso === 3 ? '#AA00FF' : '#FFD600'
            }}></div>
          </div>
        </div>
      </nav>

      <main className="unete-content">
        <div className="vault-container">
          {paso === 1 && (
            <div className="fade-in">
              <span className="badge"><Sparkles size={12}/> PROTOCOLO IDENTIDAD</span>
              <h1>FORJAR <span className="green">IDENTIDAD</span></h1>
              <div className="form-stack">
                <div className="input-elite"><User size={18} color="#00C853"/><input name="nombre" placeholder="Nombre Completo" value={formData.nombre} onChange={handleInputChange} autoComplete="off"/></div>
                <div className="input-elite"><Mail size={18} color="#00C853"/><input name="email" placeholder="Email de Inversor" value={formData.email} onChange={handleInputChange} autoComplete="off"/></div>
                <div className="input-elite">
                    <Lock size={18} color="#00C853"/>
                    <input type={showPass ? "text" : "password"} name="password" placeholder="Contraseña" value={formData.password} onChange={handleInputChange}/>
                    <button type="button" onClick={() => setShowPass(!showPass)} className="pass-toggle">
                        {showPass ? <EyeOff size={18} color="#00C853" /> : <Eye size={18} color="#00C853" />}
                    </button>
                </div>
                <div className="input-elite"><Lock size={18} color="#00C853"/><input type={showPass ? "text" : "password"} name="confirmPassword" placeholder="Confirmar Contraseña" value={formData.confirmPassword} onChange={handleInputChange}/></div>
              </div>
              <label className="checkbox-elite">
                <input type="checkbox" name="tyc" checked={formData.tyc} onChange={handleInputChange} />
                <div className="custom-cb"></div>
                <span>ACEPTO PROTOCOLOS DE SEGURIDAD ÉLITE</span>
              </label>
              <button disabled={!paso1Valido} onClick={() => setPaso(2)} className="btn-next">SIGUIENTE FASE</button>
            </div>
          )}

          {paso === 2 && (
            <div className="fade-in">
              <span className="badge blue-badge"><Globe size={12}/> LOCALIZACIÓN</span>
              <h1>ORIGEN <span className="blue">GEOGRÁFICO</span></h1>
              <div className="form-stack">
                <div className="input-elite">
                    <Globe size={18} color="#00B0FF"/>
                    <select name="pais" value={formData.pais} onChange={(e) => { 
                      const p = paises.find(x => x.nombre === e.target.value); 
                      setFormData({...formData, pais: e.target.value, codigoArea: p?.codigo || ''}); 
                    }}>
                        {paises.map(p => <option key={p.nombre} value={p.nombre} style={{background: '#000', color: '#fff'}}>{p.flag} {p.nombre}</option>)}
                    </select>
                </div>
                <div className="input-elite"><MapPin size={18} color="#00B0FF"/><input name="ciudad" placeholder="Ciudad de Residencia" value={formData.ciudad} onChange={handleInputChange}/></div>
                <div className="input-elite">
                    <Phone size={18} color="#00B0FF"/>
                    <span className="area-code">{formData.codigoArea || '+??'}</span>
                    <input name="telefono" placeholder="WhatsApp Móvil" value={formData.telefono} onChange={handleInputChange}/>
                </div>
              </div>
              <button disabled={!paso2Valido} onClick={() => setPaso(3)} className="btn-next blue-btn">VALIDAR ORIGEN</button>
            </div>
          )}

          {paso === 3 && (
            <div className="fade-in">
              <span className="badge purple-badge"><TrendingUp size={12}/> CAPITAL</span>
              <h1>PLAN DE <span className="purple">INVERSIÓN</span></h1>
              <div className="planes-grid">
                {planes.map(p => (
                  <div key={p.id} onClick={() => setFormData({...formData, plan: p.id})} className={`plan-card ${formData.plan === p.id ? 'active' : ''}`} style={{'--pcolor': p.color} as any}>
                    <p.icon size={20} color={p.color}/>
                    <div className="p-info"><h3>{p.nombre}</h3><p>{p.porcentaje}</p></div>
                    <div className="p-price">${p.precio}</div>
                  </div>
                ))}
              </div>
              <button disabled={!paso3Valido} onClick={() => setPaso(4)} className="btn-next purple-btn">IR AL PAGO</button>
            </div>
          )}

          {paso === 4 && (
            <div className="fade-in">
              <span className="badge gold-badge"><Landmark size={12}/> AUDITORÍA</span>
              <h1>SUBIR <span className="gold">PAGO</span></h1>
              
              <div className="payment-stack">
                <div className="input-elite">
                    <Landmark size={18} color="#FFD600"/>
                    <select name="metodoPago" value={formData.metodoPago} onChange={handleInputChange}>
                        {metodosDisponibles.map(m => <option key={m.id} value={m.id} style={{background: '#000', color: '#fff'}}>{m.nombre}</option>)}
                    </select>
                </div>
                <div className="payment-info">
                    {metodosDisponibles.find(m => m.id === formData.metodoPago)?.info || "Cargando protocolos..."}
                </div>
              </div>

              <div className="upload-zone" onClick={() => fileInputRef.current?.click()} style={{borderColor: comprobante ? '#FFD600' : '#111'}}>
                <input type="file" ref={fileInputRef} hidden onChange={handleFileChange} accept="image/*"/>
                {comprobanteUrl ? <img src={comprobanteUrl} alt="Voucher"/> : <UploadCloud size={40} color="#FFD600" opacity={0.2}/>}
              </div>
              {error && <div className="error-tag">{error}</div>}
              <button disabled={loading || !paso4Valido} onClick={finalizarRegistro} className="btn-next gold-btn">
                {loading ? 'SINCRONIZANDO...' : 'FINALIZAR REGISTRO'}
              </button>
            </div>
          )}

          {paso === 5 && (
            <div className="fade-in success-screen">
              <Clock size={60} color="#FFD600" className="animate-pulse"/>
              <h1>EN <span className="gold">REVISIÓN</span></h1>
              <p>María José verificará su depósito en el panel administrativo.</p>
              <button onClick={() => router.push('/')} className="btn-next">ENTENDIDO</button>
            </div>
          )}
        </div>
      </main>

      <style jsx global>{`
        .unete-wrapper { background: #000 !important; min-height: 100vh; color: #fff !important; font-family: 'Plus Jakarta Sans', sans-serif; position: relative; width: 100%; display: flex; flex-direction: column; align-items: center; }
        .bg-gradient-radial { position: fixed; inset: 0; background: radial-gradient(circle at center, #0a0a0a 0%, #000 100%) !important; z-index: 0; }
        .unete-nav { position: relative; z-index: 10; width: 100%; max-width: 1200px; padding: 40px 20px; display: flex; justify-content: space-between; align-items: center; }
        .back-link { background: none; border: none; color: #444; font-weight: 900; cursor: pointer; display: flex; align-items: center; gap: 10px; font-size: 11px; text-transform: uppercase; }
        .step-bar { width: 100px; height: 3px; background: #111; margin-top: 5px; border-radius: 5px; overflow: hidden; }
        .step-bar .fill { height: 100%; transition: 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
        .vault-container { width: 100%; max-width: 500px; background: rgba(5,5,5,0.95) !important; border: 1px solid #111; padding: 50px; border-radius: 35px; backdrop-filter: blur(20px); box-shadow: 0 40px 100px rgba(0,0,0,0.8); position: relative; z-index: 10; }
        h1 { font-size: 3rem; font-weight: 900; letter-spacing: -3px; margin: 25px 0 35px; line-height: 0.9; text-transform: uppercase; color: #fff !important; }
        .green { color: #00C853 !important; } .blue { color: #00B0FF !important; } .purple { color: #AA00FF !important; } .gold { color: #FFD600 !important; }
        .input-elite { background: #000 !important; border: 1px solid #111 !important; padding: 0 20px; border-radius: 15px; display: flex; align-items: center; gap: 15px; margin-bottom: 12px; height: 65px; }
        .input-elite input, .input-elite select { background: transparent !important; border: none !important; color: #fff !important; width: 100% !important; outline: none !important; font-size: 16px; height: 100%; }
        .input-elite select option { background: #000 !important; color: #fff !important; padding: 10px; }
        .area-code { color: #00B0FF; font-weight: 900; border-right: 1px solid #222; padding-right: 15px; font-family: monospace; }
        .pass-toggle { background: none; border: none; cursor: pointer; padding: 0; display: flex; align-items: center; }
        .checkbox-elite { display: flex; align-items: center; gap: 15px; cursor: pointer; margin: 30px 0; }
        .checkbox-elite input { display: none; }
        .checkbox-elite .custom-cb { width: 22px; height: 22px; border: 2px solid #00C853; border-radius: 6px; }
        .checkbox-elite input:checked + .custom-cb { background: #00C853; }
        .checkbox-elite span { font-size: 11px; color: #444; font-weight: 800; }
        .plan-card { background: #080808 !important; border: 1px solid #111 !important; padding: 20px; border-radius: 15px; display: flex; align-items: center; gap: 15px; margin-bottom: 10px; cursor: pointer; transition: 0.3s; }
        .plan-card.active { border-color: var(--pcolor) !important; background: rgba(255,255,255,0.02) !important; }
        .p-info h3 { font-size: 13px; margin: 0; font-weight: 900; color: #fff !important; } .p-info p { font-size: 10px; color: #444; margin: 0; }
        .p-price { margin-left: auto; font-weight: 900; color: var(--pcolor); font-size: 1.2rem; }
        .payment-info { background: #050505; border: 1px solid #111; padding: 15px; border-radius: 12px; margin-bottom: 20px; color: #ccc; font-size: 13px; border-left: 3px solid #FFD600; font-family: monospace; line-height: 1.6; }
        .upload-zone { height: 180px; border: 2px dashed #111; border-radius: 20px; display: flex; align-items: center; justify-content: center; cursor: pointer; overflow: hidden; margin-bottom: 20px; }
        .upload-zone img { width: 100%; height: 100%; object-fit: contain; }
        .btn-next { width: 100%; padding: 22px; border-radius: 18px; border: none; font-weight: 900; letter-spacing: 2px; background: #00C853; color: #000; cursor: pointer; transition: 0.4s; text-transform: uppercase; }
        .btn-next:disabled { background: #111 !important; color: #333 !important; cursor: not-allowed; }
        .blue-btn { background: #00B0FF !important; } .purple-btn { background: #AA00FF !important; color: #fff !important; } .gold-btn { background: #FFD600 !important; }
        .error-tag { color: #FF3D00; font-weight: 900; font-size: 12px; text-align: center; margin-bottom: 20px; }
        .success-screen { text-align: center; display: flex; flex-direction: column; align-items: center; }
        .success-screen p { color: #444; margin-bottom: 30px; font-size: 14px; line-height: 1.6; }
        .fade-in { animation: appear 0.6s ease-out forwards; }
        @keyframes appear { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 768px) {
          h1 { font-size: 2.2rem !important; letter-spacing: -2px !important; }
          .vault-container { padding: 30px 20px !important; border-radius: 25px !important; margin: 15px; }
          .unete-nav { padding: 25px 15px; }
        }
      `}</style>
    </div>
  );
}