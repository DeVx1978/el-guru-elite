"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { 
  User, Mail, Lock, Phone, Target, Zap, Award, Star, 
  MapPin, DollarSign, UploadCloud, CheckCircle, AlertTriangle, Loader2, Eye, EyeOff, Briefcase
} from 'lucide-react';

// --- DATOS DE MEMBRESÍAS (SE MANTIENEN IGUAL) ---
const planes = [
  { id: 'micro', nombre: 'MICRO SOCIO', precio: 100, porcentaje: '0.067% de utilidades netas', icon: Target, color: '#E0E0E0', detalles: ['Acceso Básico', 'Señales Diarias', 'Soporte Estándar'] },
  { id: 'inicial', nombre: 'SOCIO INICIAL', precio: 250, porcentaje: '0.167% de utilidades netas', icon: Briefcase, color: '#81D4FA', detalles: ['Acceso Intermedio', 'Señales Diarias', 'Soporte Estándar'] },
  { id: 'activo', nombre: 'SOCIO ACTIVO', precio: 500, porcentaje: '0.333% de utilidades netas', icon: Zap, color: '#FFD54F', detalles: ['Acceso Intermedio', 'Señales Prioritarias', 'Soporte 24/7', 'Análisis Semanal'] },
  { id: 'premium', nombre: 'SOCIO PREMIUM', precio: 1000, porcentaje: '0.667% de utilidades netas', icon: Award, color: '#FF8A65', detalles: ['Acceso VIP', 'Señales VIP', 'Soporte VIP 24/7', 'Análisis Diario'] },
  { id: 'elite', nombre: 'SOCIO ÉLITE', precio: 1500, porcentaje: '1.0% de utilidades netas', icon: Star, color: '#00C853', detalles: ['Acceso Total VIP', 'Señales VIP Exclusivas', 'Soporte VIP Directo', 'Análisis Diario', 'Mentoría Mensual'] },
];

const paises = [
  { nombre: 'Colombia', codigo: '+57', flag: '🇨🇴' },
  { nombre: 'México', codigo: '+52', flag: '🇲🇽' },
  { nombre: 'Perú', codigo: '+51', flag: '🇵🇪' },
  { nombre: 'Ecuador', codigo: '+593', flag: '🇪🇨' },
  { nombre: 'Argentina', codigo: '+54', flag: '🇦🇷' },
  { nombre: 'Chile', codigo: '+56', flag: '🇨🇱' },
  { nombre: 'España', codigo: '+34', flag: '🇪🇸' },
  { nombre: 'Estados Unidos', codigo: '+1', flag: '🇺🇸' },
  { nombre: 'Otros', codigo: '', flag: '🌐' },
];

// --- MÉTODOS DE PAGO OPTIMIZADOS (NUEVA LÓGICA QUIRÚRGICA) ---
const metodosPagoGlobal = [
  { id: 'nequi', nombre: 'Nequi (Colombia/Internacional)', info: 'Número de Celular: [INSERTAR CELULAR] - Nombre: [INSERTAR NOMBRE] - Disponible para transferencias y corresponsales.' },
  { id: 'bancolombia', nombre: 'Cuenta Bancolombia (Colombia)', info: 'Número de Cuenta (Ahorros): [INSERTAR NÚMERO] - Nombre Titular: [INSERTAR NOMBRE]' },
  { id: 'western', nombre: 'Western Union', info: 'Beneficiario: [INSERTAR NOMBRE] - Cédula/DNI: [INSERTAR CÓDIGO] - Ciudad/País: [INSERTAR CIUDAD]' },
  { id: 'usdt', nombre: 'USDT (Red TRC20)', info: 'Dirección de Billetera (Wallet): [INSERTAR DIRECCIÓN] - Asegúrate de usar la RED TRC20.' },
];

const metodosPagoEcuador = [
  { id: 'pichincha', nombre: 'Banco Pichincha (Ecuador)', info: 'Tipo: Cuenta de Ahorros - Número: [PROVISIONAL] - Titular: [PROVISIONAL] - CI: [PROVISIONAL]' },
  { id: 'guayaquil', nombre: 'Banco Guayaquil (Ecuador)', info: 'Tipo: Cuenta Corriente - Número: [PROVISIONAL] - Titular: [PROVISIONAL] - CI: [PROVISIONAL]' },
  { id: 'western_ec', nombre: 'Western Union (Ecuador)', info: 'Beneficiario: [PROVISIONAL] - Ciudad: [PROVISIONAL] - País: Ecuador. Enviar comprobante con MTCN.' },
  { id: 'nequi_ec', nombre: 'Depósito Nequi (Ecuador)', info: 'Transferencia transaccional a cuenta: [PROVISIONAL] - Nombre: [PROVISIONAL]' },
  { id: 'usdt_ec', nombre: 'USDT (Red TRC20)', info: 'Dirección: [PROVISIONAL] - Red: TRC20. Pago verificado en Blockchain.' },
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
  const [globalLoading, setGlobalLoading] = useState(false); 

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '', 
    pais: 'Colombia',
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
        setError('El archivo es muy grande (máx 5MB)');
        return;
      }
      setComprobante(file);
      if (file.type.startsWith('image/')) {
        setComprobanteUrl(URL.createObjectURL(file));
      } else {
        setComprobanteUrl(null); 
      }
    }
  };

  const validarPaso1 = () => {
    setError(null);
    const { nombre, email, password, confirmPassword, telefono, tyc, politicas } = formData;
    if (!nombre || !email || !password || !confirmPassword || !telefono) {
      setError('Por favor completa todos los campos.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('El formato del correo electrónico no es válido.');
      return false;
    }
    if (password.length < 8) {
        setError('La contraseña debe tener al menos 8 caracteres.');
        return false;
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return false;
    }
    if (!tyc || !politicas) {
        setError('Debes aceptar los Términos y Condiciones y las Políticas de Privacidad.');
        return false;
    }
    return true;
  };

  const siguientePaso = () => {
    if (paso === 1 && !validarPaso1()) return;
    setError(null);
    setGlobalLoading(true);
    setTimeout(() => {
        setPaso(prev => prev + 1);
        setGlobalLoading(false);
        window.scrollTo(0, 0);
    }, 800);
  };

  const pasoAnterior = () => {
    setError(null);
    setPaso(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const finalizarRegistro = async () => {
    setError(null);
    setLoading(true);

    if (!comprobante) {
      setError('Por favor sube la imagen de tu comprobante de pago.');
      setLoading(false);
      return;
    }

    try {
      const fileExt = comprobante.name.split('.').pop();
      const cleanEmail = formData.email.replace(/[^a-zA-Z0-9]/g, '_');
      const fileName = `${Date.now()}_${cleanEmail}.${fileExt}`;
      const filePath = `comprobantes/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('pagos')
        .upload(filePath, comprobante, { cacheControl: '3600', upsert: false });

      if (uploadError) throw new Error('Error al subir el archivo al servidor.');

      const { data: urlData } = supabase.storage.from('pagos').getPublicUrl(filePath);
      
      const { error: insertError } = await supabase.from('socios').insert([{
          nombre: formData.nombre,
          email: formData.email,
          password: formData.password,
          pais: formData.pais,
          telefono: `${formData.codigoArea} ${formData.telefono}`,
          plan: formData.plan,
          metodo_pago: formData.metodoPago,
          comprobante_url: urlData.publicUrl,
          estado: 'pendiente'
        }]);

      if (insertError) throw new Error('Error al guardar datos. El correo ya existe.');

      router.push('/revision-pendiente');

    } catch (err: any) {
      setError(err.message || 'Ocurrió un error inesperado.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '15px', background: '#0a0c10', border: '1px solid #111', 
    borderRadius: '12px', color: 'white', fontSize: '1rem', outline: 'none', marginBottom: '15px'
  };

  const labelStyle = { color: '#888', fontSize: '0.9rem', marginBottom: '8px', display: 'block', fontWeight: 'bold' };

  const renderPaso = () => {
    switch (paso) {
      case 1:
        return (
          <div className="fade-in">
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '10px' }}>Crea tu Cuenta Élite</h2>
            <p style={{ color: '#888', marginBottom: '30px' }}>Paso 1: Ingresa tus datos personales básicos.</p>
            <label style={labelStyle}><User size={16} style={{marginRight: '5px'}}/> Nombre Completo</label>
            <input type="text" name="nombre" placeholder="Juan Pérez" value={formData.nombre} onChange={handleInputChange} style={inputStyle} />
            <label style={labelStyle}><Mail size={16} style={{marginRight: '5px'}}/> Correo Electrónico (Real)</label>
            <input type="email" name="email" placeholder="juan@ejemplo.com" value={formData.email} onChange={handleInputChange} style={inputStyle} />
            <label style={labelStyle}><Phone size={16} style={{marginRight: '5px'}}/> Número de Teléfono</label>
            <div style={{display: 'flex', gap: '10px', marginBottom: '15px'}}>
                <select name="codigoArea" value={formData.codigoArea} onChange={handleInputChange} style={{...inputStyle, width: '35%', marginBottom: 0}}>
                    {paises.map(p => (
                        <option key={p.nombre} value={p.codigo}>{p.flag} {p.codigo}</option>
                    ))}
                </select>
                <input type="tel" name="telefono" placeholder="3001234567" value={formData.telefono} onChange={handleInputChange} style={{...inputStyle, flex: 1, marginBottom: 0}} />
            </div>
            <label style={labelStyle}><Lock size={16} style={{marginRight: '5px'}}/> Contraseña</label>
            <div style={{position: 'relative'}}>
                <input type={showPass ? "text" : "password"} name="password" placeholder="••••••••" value={formData.password} onChange={handleInputChange} style={inputStyle} />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{position: 'absolute', right: '15px', top: '15px', background: 'none', border: 'none', color: '#555', cursor: 'pointer'}}>
                    {showPass ? <EyeOff size={20}/> : <Eye size={20}/>}
                </button>
            </div>
            <label style={labelStyle}><Lock size={16} style={{marginRight: '5px'}}/> Confirmar Contraseña</label>
            <input type={showPass ? "text" : "password"} name="confirmPassword" placeholder="••••••••" value={formData.confirmPassword} onChange={handleInputChange} style={inputStyle} />
            {error && <p style={{color: '#ff4444', fontSize: '0.85rem', marginBottom: '15px', textAlign: 'center'}}>⚠️ {error}</p>}
            <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px'}}>
                <input type="checkbox" name="tyc" checked={formData.tyc} onChange={handleInputChange} style={{width: '20px', height: '20px', accentColor: '#00C853'}} />
                <label style={{color: '#888', fontSize: '0.9rem'}}>Acepto los <a href="#" style={{color: '#00C853', textDecoration: 'none'}}>Términos y Condiciones</a>.</label>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px'}}>
                <input type="checkbox" name="politicas" checked={formData.politicas} onChange={handleInputChange} style={{width: '20px', height: '20px', accentColor: '#00C853'}} />
                <label style={{color: '#888', fontSize: '0.9rem'}}>Acepto las <a href="#" style={{color: '#00C853', textDecoration: 'none'}}>Políticas de Privacidad</a>.</label>
            </div>
            <button onClick={siguientePaso} style={{ width: '100%', padding: '18px', background: '#00C853', color: 'black', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>Continuar a Selección de Plan</button>
          </div>
        );
      case 2:
        return (
          <div className="fade-in">
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '10px' }}>Selecciona tu Plan Élite</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px', marginBottom: '30px' }}>
              {planes.map(plan => (
                  <div key={plan.id} onClick={() => setFormData(prev => ({ ...prev, plan: plan.id }))} style={{
                    background: '#0a0c10', border: formData.plan === plan.id ? `2px solid ${plan.color}` : '1px solid #111', 
                    borderRadius: '20px', padding: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '20px', transition: '0.3s'
                  }}>
                    <div style={{ background: `${plan.color}10`, padding: '15px', borderRadius: '15px', color: plan.color }}><plan.icon size={30} /></div>
                    <div style={{ flex: 1 }}>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800 }}>{plan.nombre}</h3>
                        <div style={{textAlign: 'right'}}><span style={{ fontSize: '1.5rem', fontWeight: 900, color: plan.color }}>${plan.precio}</span></div>
                      </div>
                      <p style={{ color: '#00C853', margin: '5px 0', fontWeight: 'bold' }}>Participación: {plan.porcentaje}</p>
                    </div>
                  </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <button onClick={pasoAnterior} style={{ flex: 1, padding: '18px', background: '#111', color: '#888', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>Atrás</button>
              <button onClick={siguientePaso} style={{ flex: 2, padding: '18px', background: '#00C853', color: 'black', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>Continuar a Pago</button>
            </div>
          </div>
        );
      case 3:
        // --- LÓGICA DINÁMICA DE MÉTODOS POR PAÍS ---
        const opcionesPago = formData.pais === 'Ecuador' ? metodosPagoEcuador : metodosPagoGlobal;
        const metodoSeleccionado = opcionesPago.find(m => m.id === formData.metodoPago) || opcionesPago[0];

        return (
          <div className="fade-in">
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '10px' }}>Método de Pago</h2>
            <p style={{ color: '#00C853', fontSize: '0.9rem', marginBottom: '15px', fontWeight: 'bold' }}>
              📍 Opciones disponibles para {formData.pais}
            </p>
            <select name="metodoPago" value={formData.metodoPago} onChange={handleInputChange} style={inputStyle}>
              {opcionesPago.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
            </select>
            <div style={{ background: 'rgba(0,200,83,0.05)', border: '1px solid #00C85330', padding: '20px', borderRadius: '12px', color: '#ccc', marginBottom: '30px', fontSize: '0.95rem', lineHeight: '1.5' }}>
                <b style={{color: '#00C853', display: 'block', marginBottom: '10px'}}>Datos para realizar el pago:</b>
                {metodoSeleccionado.info.split(' - ').map(line => <p key={line} style={{margin: '0 0 5px 0'}}>{line}</p>)}
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <button onClick={pasoAnterior} style={{ flex: 1, padding: '18px', background: '#111', color: '#888', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>Atrás</button>
              <button onClick={siguientePaso} style={{ flex: 2, padding: '18px', background: '#00C853', color: 'black', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>Continuar a Verificación</button>
            </div>
          </div>
        );
      case 4:
        const planF = planes.find(p => p.id === formData.plan);
        return (
          <div className="fade-in">
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '10px' }}>Verificación de Pago</h2>
            <div style={{ background: '#0a0c10', border: '1px solid #111', padding: '20px', borderRadius: '15px', marginBottom: '20px' }}>
                <p style={{margin: 0, color: '#555', fontSize: '0.8rem'}}>TOTAL A PAGAR:</p>
                <p style={{margin: 0, fontSize: '2rem', fontWeight: 900, color: planF?.color}}>${planF?.precio} USD</p>
                <p style={{margin: '5px 0 0 0', color: '#888'}}>Plan: {planF?.nombre}</p>
            </div>
            <label style={labelStyle}><UploadCloud size={16} style={{marginRight: '5px'}}/> Captura del Comprobante (Máx 5MB)</label>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
            <div onClick={() => fileInputRef.current?.click()} style={{ width: '100%', height: '220px', background: '#0a0c10', border: '2px dashed #222', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginBottom: '20px', overflow: 'hidden', color: '#555' }}>
              {comprobanteUrl ? <img src={comprobanteUrl} style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : <><UploadCloud size={40} style={{ marginBottom: '10px' }} /><span>Click para subir imagen</span></>}
            </div>
            {error && <div style={{ background: 'rgba(255,68,68,0.1)', color: '#ff4444', padding: '15px', borderRadius: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}><AlertTriangle size={20} /> {error}</div>}
            <div style={{ display: 'flex', gap: '15px' }}>
              <button onClick={pasoAnterior} style={{ flex: 1, padding: '18px', background: '#111', color: '#888', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>Atrás</button>
              <button onClick={finalizarRegistro} disabled={loading} style={{ flex: 2, padding: '18px', background: '#00C853', color: 'black', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' }}>{loading ? 'Procesando...' : 'Finalizar Registro'}</button>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div style={{ backgroundColor: '#020406', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      {globalLoading && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(2,4,6,0.9)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
          <div style={{ position: 'relative', width: '120px', height: '120px' }}>
            <div className="loader-ring"></div>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60px', height: '60px', borderRadius: '50%', overflow: 'hidden', boxShadow: '0 0 20px #00C853' }}>
              <img src="/images/guru.jpg" alt="Logo" className="ball-spin" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      )}
      <header style={{ padding: '20px', borderBottom: '1px solid #111', textAlign: 'center' }}>
        <h1 onClick={() => router.push('/')} style={{ color: '#00C853', margin: 0, fontSize: '1.5rem', fontWeight: 900, cursor: 'pointer' }}>EL GURÚ ÉLITE</h1>
      </header>
      <main style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', position: 'relative' }}>
          <div style={{position: 'absolute', top: '20px', left: '0', width: '100%', height: '2px', background: '#111', zIndex: 1}}></div>
          <div style={{position: 'absolute', top: '20px', left: '0', width: `${(paso - 1) * 33.33}%`, height: '2px', background: '#00C853', zIndex: 1, transition: '0.3s' }}></div>
          {[1, 2, 3, 4].map(p => (
            <div key={p} style={{ width: '40px', height: '40px', borderRadius: '50%', background: paso >= p ? '#00C853' : '#0a0c10', color: paso >= p ? 'black' : '#555', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', position: 'relative', zIndex: 2, border: paso >= p ? 'none' : '2px solid #111' }}>{p}</div>
          ))}
        </div>
        {renderPaso()}
      </main>
      <style jsx global>{`
        .fade-in { animation: fadeIn 0.5s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .loader-ring { width: 120px; height: 120px; border-radius: 50%; border: 3px solid transparent; border-top: 3px solid #00C853; border-bottom: 3px solid #00C853; animation: spin-ring 1s linear infinite; }
        .ball-spin { animation: spin-ball 2s linear infinite; }
        @keyframes spin-ring { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes spin-ball { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(360deg); } }
      `}</style>
    </div>
  );
}