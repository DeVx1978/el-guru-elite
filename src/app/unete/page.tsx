"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { 
  User, Mail, Lock, Phone, Target, Zap, Award, Star, 
  MapPin, UploadCloud, CheckCircle2, AlertTriangle, Eye, EyeOff, Briefcase,
  ChevronRight, ArrowLeft, Globe, ShieldCheck, Info
} from 'lucide-react';

// --- CONFIGURACIÓN SUPABASE ---
const clientSupabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// --- DATOS MAESTROS (PRESERVADOS) ---
const planes = [
  { id: 'micro', nombre: 'MICRO SOCIO', precio: 100, porcentaje: '0.067% de utilidades netas', icon: Target, color: '#E0E0E0' },
  { id: 'inicial', nombre: 'SOCIO INICIAL', precio: 250, porcentaje: '0.167% de utilidades netas', icon: Briefcase, color: '#81D4FA' },
  { id: 'activo', nombre: 'SOCIO ACTIVO', precio: 500, porcentaje: '0.333% de utilidades netas', icon: Zap, color: '#FFD54F' },
  { id: 'premium', nombre: 'SOCIO PREMIUM', precio: 1000, porcentaje: '0.667% de utilidades netas', icon: Award, color: '#FF8A65' },
  { id: 'elite', nombre: 'SOCIO ÉLITE', precio: 1500, porcentaje: '1.0% de utilidades netas', icon: Star, color: '#00C853' },
];

const paises = [
  { nombre: 'Colombia', codigo: '+57', flag: '🇨🇴' },
  { nombre: 'México', codigo: '+52', flag: '🇲🇽' },
  { nombre: 'Perú', codigo: '+51', flag: '🇵🇪' },
  { nombre: 'Ecuador', codigo: '+593', flag: '🇪🇨' },
  { nombre: 'España', codigo: '+34', flag: '🇪🇸' },
  { nombre: 'Estados Unidos', codigo: '+1', flag: '🇺🇸' },
  { nombre: 'Otros', codigo: '', flag: '🌐' },
];

const metodosPagoGlobal = [
  { id: 'nequi', nombre: 'Nequi (Colombia/Internacional)', info: 'Transferencia Directa - App Nequi' },
  { id: 'bancolombia', nombre: 'Bancolombia (Ahorros)', info: 'Cuenta de Ahorros Institucional' },
  { id: 'usdt', nombre: 'USDT (Red TRC20)', info: 'Billetera Digital - Red TRC20 únicamente' },
];

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
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '', 
    pais: 'Colombia',
    ciudad: '',
    codigoArea: '+57', 
    telefono: '', 
    plan: 'micro', 
    metodoPago: 'nequi',
    tyc: false, 
    politicas: false, 
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setError('El archivo excede los 5MB permitidos.');
        return;
      }
      setComprobante(file);
      setComprobanteUrl(URL.createObjectURL(file));
    }
  };

  const siguientePaso = () => {
    window.scrollTo(0, 0);
    setPaso(prev => prev + 1);
  };

  const pasoAnterior = () => {
    setPaso(prev => prev - 1);
  };

  const finalizarRegistro = async () => {
    setLoading(true);
    try {
      // 1. Registro en 'socios'
      const { data: socio, error: errSocio } = await clientSupabase
        .from('socios')
        .insert([{
          nombre: formData.nombre,
          correo: formData.email,
          password: formData.password,
          estado: 'pendiente',
          rol: 'socio'
        }])
        .select().single();

      if (errSocio) throw new Error("El correo ya está registrado.");

      // 2. Registro en 'socios_elite'
      const { error: errElite } = await clientSupabase
        .from('socios_elite')
        .insert([{
          id_socio: socio.id,
          nivel_socio: formData.plan.toUpperCase(),
          inversion_minima: planes.find(p => p.id === formData.plan)?.precio || 0,
          pais: formData.pais,
          telefono: `${formData.codigoArea} ${formData.telefono}`,
          ciudad: formData.ciudad
        }]);

      if (errElite) throw errElite;

      setPaso(5); // Pantalla de Revisión
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- LÓGICA DE VALIDACIÓN (SEMÁFORO) ---
  const paso1Valido = formData.nombre && formData.email && formData.password.length >= 8 && formData.password === formData.confirmPassword && formData.tyc && formData.politicas;
  const paso2Valido = formData.pais && formData.telefono && formData.ciudad;

  return (
    <div className="unete-wrapper">
      <nav className="unete-nav">
        <button onClick={() => paso > 1 ? pasoAnterior() : router.push('/')} className="nav-back">
          <ArrowLeft size={18} /> {paso === 5 ? 'INICIO' : 'VOLVER'}
        </button>
        <div className="progress-bar">
          {[1, 2, 3, 4].map(p => (
            <div key={p} className={`dot ${paso >= p ? 'active' : ''}`}></div>
          ))}
        </div>
      </nav>

      <main className="unete-content">
        <div className="form-container">
          
          {/* PASO 1: IDENTIDAD */}
          {paso === 1 && (
            <div className="fade-in">
              <span className="step-badge">PASO 01</span>
              <h1>CREAR CUENTA <span>ÉLITE</span></h1>
              <p>Inicie su proceso de vinculación institucional.</p>
              
              <div className="input-group">
                <div className="field"><User size={18}/><input name="nombre" placeholder="Nombre Completo" value={formData.nombre} onChange={handleInputChange} /></div>
                <div className="field"><Mail size={18}/><input name="email" placeholder="Email Corporativo" value={formData.email} onChange={handleInputChange} /></div>
                <div className="field">
                  <Lock size={18}/>
                  <input type={showPass ? "text" : "password"} name="password" placeholder="Contraseña" value={formData.password} onChange={handleInputChange} />
                  <button onClick={() => setShowPass(!showPass)} className="btn-eye">{showPass ? <EyeOff size={18}/> : <Eye size={18}/>}</button>
                </div>
                <div className="field"><Lock size={18}/><input type="password" name="confirmPassword" placeholder="Confirmar Contraseña" value={formData.confirmPassword} onChange={handleInputChange} /></div>
              </div>

              <div className="checks">
                <label className="check-item">
                  <input type="checkbox" name="tyc" checked={formData.tyc} onChange={handleInputChange} />
                  <span>Acepto Términos y Condiciones</span>
                </label>
                <label className="check-item">
                  <input type="checkbox" name="politicas" checked={formData.politicas} onChange={handleInputChange} />
                  <span>Acepto Políticas de Privacidad</span>
                </label>
              </div>

              <button disabled={!paso1Valido} onClick={siguientePaso} className="btn-primary">
                CONTINUAR <ChevronRight size={18}/>
              </button>
            </div>
          )}

          {/* PASO 2: UBICACIÓN */}
          {paso === 2 && (
            <div className="fade-in">
              <span className="step-badge">PASO 02</span>
              <h1>DATOS DE <span>ORIGEN</span></h1>
              <p>Defina su jurisdicción de inversión.</p>
              
              <div className="input-group">
                <div className="field">
                  <Globe size={18}/>
                  <select name="pais" value={formData.pais} onChange={(e) => {
                    const p = paises.find(x => x.nombre === e.target.value);
                    setFormData({...formData, pais: e.target.value, codigoArea: p?.codigo || ''});
                  }}>
                    {paises.map(p => <option key={p.nombre} value={p.nombre}>{p.flag} {p.nombre}</option>)}
                  </select>
                </div>
                <div className="field"><MapPin size={18}/><input name="ciudad" placeholder="Ciudad" value={formData.ciudad} onChange={handleInputChange} /></div>
                <div className="phone-grid">
                  <div className="area-code">{formData.codigoArea}</div>
                  <div className="field no-margin"><Phone size={18}/><input name="telefono" placeholder="Número de Teléfono" value={formData.telefono} onChange={handleInputChange} /></div>
                </div>
              </div>

              <button disabled={!paso2Valido} onClick={siguientePaso} className="btn-primary">
                SELECCIONAR PLAN <ChevronRight size={18}/>
              </button>
            </div>
          )}

          {/* PASO 3: PLANES */}
          {paso === 3 && (
            <div className="fade-in">
              <span className="step-badge">PASO 03</span>
              <h1>PORTAFOLIO DE <span>INVERSIÓN</span></h1>
              <div className="planes-stack">
                {planes.map(p => (
                  <div key={p.id} className={`plan-card ${formData.plan === p.id ? 'active' : ''}`} onClick={() => setFormData({...formData, plan: p.id})} style={{'--color': p.color} as any}>
                    <div className="plan-icon"><p.icon size={24} /></div>
                    <div className="plan-info">
                      <h3>{p.nombre}</h3>
                      <p>{p.porcentaje}</p>
                    </div>
                    <div className="plan-price">${p.precio}</div>
                  </div>
                ))}
              </div>
              <button onClick={siguientePaso} className="btn-primary">
                PROCEDER AL PAGO <ChevronRight size={18}/>
              </button>
            </div>
          )}

          {/* PASO 4: PAGO */}
          {paso === 4 && (
            <div className="fade-in">
              <span className="step-badge">PASO 04</span>
              <h1>VERIFICAR <span>DEPÓSITO</span></h1>
              <div className="payment-box">
                <div className="pay-summary">
                  <span>TOTAL A PAGAR</span>
                  <h2>${planes.find(p => p.id === formData.plan)?.precio} USD</h2>
                </div>
                <div className="upload-zone" onClick={() => fileInputRef.current?.click()}>
                  <input type="file" ref={fileInputRef} hidden onChange={handleFileChange} accept="image/*" />
                  {comprobanteUrl ? <img src={comprobanteUrl} className="preview" /> : <><UploadCloud size={40} /> <p>Subir Comprobante</p></>}
                </div>
                {error && <div className="error-tag"><AlertTriangle size={14}/> {error}</div>}
              </div>
              <button disabled={loading || !comprobante} onClick={finalizarRegistro} className="btn-primary">
                {loading ? 'SINCROIZANDO...' : 'FINALIZAR REGISTRO'}
              </button>
            </div>
          )}

          {/* PASO 5: REVISIÓN */}
          {paso === 5 && (
            <div className="fade-in success-screen">
              <div className="icon-glow"><ShieldCheck size={60} color="#00C853" /></div>
              <h1>SOLICITUD EN <span>AUDITORÍA</span></h1>
              <p>Hemos recibido sus credenciales. Un administrador validará su pago en las próximas horas.</p>
              <div className="info-card">
                <Info size={20} color="#00C853" />
                <p>Una vez aprobada, recibirá un correo para acceder a su oficina virtual.</p>
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
        .nav-back:hover { color: #00C853; }
        .progress-bar { display: flex; gap: 8px; }
        .dot { width: 30px; height: 3px; background: #111; border-radius: 10px; transition: 0.5s; }
        .dot.active { background: #00C853; box-shadow: 0 0 10px #00C853; }

        .unete-content { flex: 1; display: flex; justify-content: center; align-items: center; padding: 40px 20px; }
        .form-container { width: 100%; max-width: 480px; }
        .step-badge { font-size: 10px; font-weight: 900; color: #00C853; letter-spacing: 3px; display: block; margin-bottom: 10px; }
        h1 { font-size: 2rem; font-weight: 900; margin-bottom: 10px; letter-spacing: -1.5px; }
        h1 span { color: #00C853; }
        p { color: #666; font-size: 14px; margin-bottom: 30px; line-height: 1.6; }

        .input-group { display: flex; flex-direction: column; gap: 12px; margin-bottom: 25px; }
        .field { background: #050505; border: 1px solid #111; border-radius: 12px; display: flex; align-items: center; padding: 0 15px; gap: 12px; transition: 0.3s; }
        .field:focus-within { border-color: #00C853; }
        .field input, .field select { background: transparent; border: none; padding: 15px 0; color: #fff; width: 100%; outline: none; font-size: 14px; font-weight: 600; }
        .btn-eye { background: none; border: none; color: #333; cursor: pointer; }
        
        .phone-grid { display: flex; gap: 10px; }
        .area-code { background: #111; padding: 15px; border-radius: 12px; font-weight: 900; color: #00C853; font-size: 14px; }
        .no-margin { margin-bottom: 0; flex: 1; }

        .checks { margin-bottom: 30px; display: flex; flex-direction: column; gap: 10px; }
        .check-item { display: flex; align-items: center; gap: 10px; font-size: 12px; color: #444; cursor: pointer; font-weight: 600; }
        .check-item input { width: 18px; height: 18px; accent-color: #00C853; }

        .btn-primary { width: 100%; background: #00C853; color: #000; border: none; padding: 20px; border-radius: 14px; font-weight: 900; cursor: pointer; display: flex; justify-content: center; align-items: center; gap: 10px; transition: 0.3s; }
        .btn-primary:disabled { background: #111; color: #444; cursor: not-allowed; }
        .btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0, 200, 83, 0.2); }

        .planes-stack { display: flex; flex-direction: column; gap: 10px; margin-bottom: 30px; }
        .plan-card { background: #050505; border: 1px solid #111; padding: 20px; border-radius: 16px; cursor: pointer; display: flex; align-items: center; gap: 15px; transition: 0.3s; }
        .plan-card.active { border-color: var(--color); box-shadow: 0 0 15px rgba(0, 200, 83, 0.05); }
        .plan-icon { background: #111; padding: 10px; border-radius: 10px; color: var(--color); }
        .plan-info h3 { margin: 0; font-size: 14px; font-weight: 800; }
        .plan-info p { margin: 0; font-size: 11px; color: #00C853; font-weight: 700; }
        .plan-price { margin-left: auto; font-size: 1.2rem; font-weight: 900; }

        .payment-box { background: #050505; border: 1px solid #111; padding: 30px; border-radius: 20px; margin-bottom: 30px; }
        .pay-summary { text-align: center; margin-bottom: 25px; }
        .pay-summary span { font-size: 10px; font-weight: 900; color: #444; letter-spacing: 2px; }
        .pay-summary h2 { font-size: 2.2rem; font-weight: 900; margin: 5px 0; color: #00C853; }
        .upload-zone { border: 2px dashed #111; border-radius: 15px; height: 180px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #444; font-size: 12px; font-weight: 800; cursor: pointer; }
        .preview { width: 100%; height: 100%; object-fit: contain; }
        .error-tag { background: rgba(255,0,0,0.1); color: #ff4444; padding: 10px; border-radius: 8px; font-size: 11px; font-weight: 800; margin-top: 15px; display: flex; gap: 8px; }

        .success-screen { text-align: center; }
        .icon-glow { margin-bottom: 25px; filter: drop-shadow(0 0 15px rgba(0,200,83,0.3)); }
        .info-card { background: #050505; padding: 20px; border-radius: 15px; border-left: 3px solid #00C853; display: flex; gap: 15px; text-align: left; margin: 30px 0; }
        .info-card p { margin: 0; font-size: 12px; color: #888; }

        .fade-in { animation: fadeIn 0.6s cubic-bezier(0.19, 1, 0.22, 1); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 600px) {
          h1 { font-size: 1.7rem; }
          .unete-content { align-items: flex-start; padding-top: 30px; }
        }
      `}</style>
    </div>
  );
}