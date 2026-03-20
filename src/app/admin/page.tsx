"use client";
import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Users, Trash2, Eye, Lock, Power, PowerOff, KeyRound, LoaderCircle } from 'lucide-react';

// 1. CONEXIÓN A TU SUPABASE (Usando las llaves de tu .env.local)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ ERROR: Faltan las llaves de Supabase en .env.local");
}

const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

export default function AdminControlTotal() {
  const [isLocked, setIsLocked] = useState(true);
  const [pass, setPass] = useState("");
  const [socios, setSocios] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 2. CONFIGURACIÓN DE SEGURIDAD
  const MASTER_KEY = "GURU2026";

  // 3. FUNCIÓN PARA CARGAR DATOS REALES
  const cargarSocios = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('socios_elite')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }
      setSocios(data || []);
    } catch (error) {
      console.error("❌ Error cargando socios:", error.message);
      alert("Error al conectar con la base de datos.");
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos cuando se desbloquea el panel
  useEffect(() => {
    if (!isLocked) {
      cargarSocios();
    }
  }, [isLocked]);

  // 4. FUNCIONES DE CONTROL TOTAL
  const verExpediente = (socio: any) => {
    alert(
      `--- EXPEDIENTE DE SOCIO ---\n\n` +
      `ID: ${socio.id}\n` +
      `NOMBRE: ${socio.nombre}\n` +
      `EMAIL: ${socio.email}\n` +
      `CONTRASEÑA: ${socio.password}\n` + // <--- Control Total: Ver Clave
      `PLAN: ${socio.plan_elegido}\n` +
      `ESTADO: ${socio.estatus_pago}\n` +
      `REGISTRO: ${new Date(socio.created_at).toLocaleString()}`
    );
  };

  const cambiarEstado = async (id: any, estadoActual: string) => {
    const nuevoEstado = estadoActual === 'ACTIVO' ? 'SUSPENDIDO' : 'ACTIVO';
    const accion = nuevoEstado === 'ACTIVO' ? 'ACTIVAR' : 'SUSPENDER';

    if (confirm(`¿Seguro que quieres ${accion} a este socio?`)) {
      setLoading(true);
      const { error } = await supabase
        .from('socios_elite')
        .update({ estatus_pago: nuevoEstado })
        .eq('id', id);

      if (error) {
        alert("Error al actualizar el estado.");
        console.error(error);
      } else {
        await cargarSocios(); // Recargar la tabla
      }
      setLoading(false);
    }
  };

  const eliminarSocio = async (id: any, nombre: string) => {
    if (confirm(`⚠️ ¡ATENCIÓN! ¿Seguro que quieres ELIMINAR PERMANENTEMENTE a ${nombre}? Esta acción NO se puede deshacer.`)) {
      setLoading(true);
      const { error } = await supabase
        .from('socios_elite')
        .delete()
        .eq('id', id);

      if (error) {
        alert("Error al eliminar el socio.");
        console.error(error);
      } else {
        await cargarSocios(); // Recargar la tabla
      }
      setLoading(false);
    }
  };

  // 5. PANTALLA DE ACCESO RESTRINGIDO
  if (isLocked) {
    return (
      <div style={{ backgroundColor: '#020406', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontFamily: 'sans-serif' }}>
        <div style={{ textAlign: 'center', background: '#0a0c10', padding: '50px', borderRadius: '30px', border: '1px solid #00C853', width: '380px', boxShadow: '0 0 30px rgba(0, 200, 83, 0.1)' }}>
          <Lock size={60} color="#00C853" style={{ marginBottom: '20px' }} />
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '1px', textTransform: 'uppercase' }}>Panel de Control Élite</h2>
          <p style={{ fontSize: '11px', color: '#555', marginBottom: '30px' }}>INGRESA LA LLAVE MAESTRA PARA ACCEDER</p>
          
          <input 
            type="password" 
            placeholder="••••••••" 
            onChange={(e) => setPass(e.target.value)}
            style={{ padding: '18px', borderRadius: '12px', border: '1px solid #222', backgroundColor: '#020406', color: '#00C853', textAlign: 'center', width: '100%', fontSize: '18px', letterSpacing: '4px', outline: 'none', marginBottom: '20px' }}
          />
          
          <button 
            onClick={() => pass === MASTER_KEY ? setIsLocked(false) : alert("LLAVE INCORRECTA - ACCESO DENEGADO")} 
            style={{ width: '100%', padding: '18px', background: '#00C853', color: 'black', border: 'none', borderRadius: '12px', fontWeight: 900, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', textTransform: 'uppercase' }}>
            <KeyRound size={18} /> DESBLOQUEAR SISTEMA
          </button>
        </div>
      </div>
    );
  }

  // 6. PANEL DE CONTROL PRINCIPAL (DESBLOQUEADO)
  return (
    <main style={{ backgroundColor: '#020406', minHeight: '100vh', color: 'white', padding: '40px 5%', fontFamily: 'sans-serif' }}>
      
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #111', paddingBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#00C853', margin: 0 }}>CENTRO DE MANDO DIRECTIVO</h1>
          <p style={{ fontSize: '10px', color: '#555', letterSpacing: '1px', marginTop: '5px' }}>SISTEMA DE GESTIÓN DE CAPITAL GURÚ ÉLITE | ESTADO: ONLINE</p>
        </div>
        <button onClick={() => setIsLocked(true)} style={{ background: 'rgba(255, 68, 68, 0.1)', color: '#ff4444', border: '1px solid #ff4444', padding: '12px 24px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>CERRAR SESIÓN SEGURA</button>
      </div>

      {/* MÉTRICAS RÁPIDAS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '25px', marginBottom: '40px' }}>
        <div style={{ background: '#0a0c10', padding: '30px', borderRadius: '25px', border: '1px solid #111' }}>
          <Users size={28} color="#00C853" />
          <h2 style={{ fontSize: '38px', margin: '15px 0', fontWeight: 900 }}>{socios.length}</h2>
          <p style={{ fontSize: '11px', color: '#444', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase' }}>Socios Registrados en Base de Datos</p>
        </div>
        {/* Puedes agregar más métricas aquí, como total recaudado */}
      </div>

      {/* TABLA MAESTRA DE SOCIOS */}
      <section style={{ background: '#0a0c10', borderRadius: '30px', border: '1px solid #111', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#111', color: '#666', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              <th style={{ padding: '25px' }}>Socio / Identificación</th>
              <th style={{ padding: '25px' }}>Plan Elegido</th>
              <th style={{ padding: '25px' }}>Estado de Pago</th>
              <th style={{ padding: '25px' }}>Acciones de Control Total</th>
            </tr>
          </thead>
          <tbody>
            {loading && socios.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: '60px', textAlign: 'center', color: '#555' }}>
                  <LoaderCircle size={40} className="animate-spin" style={{ margin: '0 auto 20px auto', color: '#00C853' }} />
                  Conectando con la base de datos de Supabase...
                </td>
              </tr>
            ) : socios.length === 0 ? (
              <tr>
                <td colSpan={4} style={{ padding: '60px', textAlign: 'center', color: '#333', fontStyle: 'italic' }}>
                  No hay socios registrados en la tabla 'socios_elite' aún.
                </td>
              </tr>
            ) : (
              socios.map((socio) => (
                <tr key={socio.id} style={{ borderBottom: '1px solid #111', transition: '0.3s' }}>
                  <td style={{ padding: '25px' }}>
                    <b style={{ fontSize: '15px', color: 'white' }}>{socio.nombre}</b><br />
                    <span style={{ fontSize: '12px', color: '#555' }}>{socio.email}</span>
                  </td>
                  <td style={{ padding: '25px' }}>
                    <span style={{ color: '#00C853', fontWeight: 900, fontSize: '13px' }}>{socio.plan_elegido || 'N/A'}</span>
                  </td>
                  <td style={{ padding: '25px' }}>
                    <span style={{ 
                      padding: '6px 14px', borderRadius: '20px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase',
                      background: socio.estatus_pago === 'ACTIVO' ? 'rgba(0, 200, 83, 0.1)' : 'rgba(255, 152, 0, 0.1)',
                      color: socio.estatus_pago === 'ACTIVO' ? '#00C853' : '#ff9800'
                    }}>
                      {socio.estatus_pago || 'PENDIENTE'}
                    </span>
                  </td>
                  <td style={{ padding: '25px' }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button onClick={() => verExpediente(socio)} title="Ver Expediente Completo (Incluye Clave)" style={{ background: '#111', border: '1px solid #222', color: '#00C853', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}><Eye size={18} /></button>
                      <button onClick={() => cambiarEstado(socio.id, socio.estatus_pago)} title={socio.estatus_pago === 'ACTIVO' ? 'Suspender Acceso' : 'Activar Acceso'} style={{ background: '#111', border: '1px solid #222', color: socio.estatus_pago === 'ACTIVO' ? '#ff9800' : '#00C853', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}>
                        {socio.estatus_pago === 'ACTIVO' ? <PowerOff size={18} /> : <Power size={18} />}
                      </button>
                      <button onClick={() => eliminarSocio(socio.id, socio.nombre)} title="Eliminar Socio Permanentemente" style={{ background: '#111', border: '1px solid rgba(255, 68, 68, 0.3)', color: '#ff4444', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}