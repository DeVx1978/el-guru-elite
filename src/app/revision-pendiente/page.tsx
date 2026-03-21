"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Clock, ShieldCheck, ArrowLeft, MessageSquare } from 'lucide-react';

export default function RevisionPendiente() {
  const router = useRouter();

  return (
    <div style={{ 
      backgroundColor: '#020406', 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      color: 'white', 
      fontFamily: 'sans-serif',
      padding: '20px' 
    }}>
      <div style={{ 
        textAlign: 'center', 
        background: '#0a0c10', 
        padding: '60px 40px', 
        borderRadius: '30px', 
        border: '1px solid #111', 
        maxWidth: '500px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
      }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          background: 'rgba(0, 200, 83, 0.1)', 
          borderRadius: '50%', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          margin: '0 auto 30px' 
        }}>
          <Clock size={40} color="#00C853" />
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '20px', letterSpacing: '-1px' }}>
          SOLICITUD EN <span style={{ color: '#00C853' }}>REVISIÓN</span>
        </h1>

        <p style={{ color: '#888', lineHeight: '1.6', marginBottom: '40px', fontSize: '1.1rem' }}>
          Hemos recibido su comprobante de pago exitosamente. Un agente del equipo 
          <b style={{color: '#fff'}}> Élite</b> verificará la transacción en las próximas 24 horas. 
          Recibirá acceso total una vez finalizada la auditoría.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <button 
            onClick={() => router.push('/')}
            style={{ 
              width: '100%', 
              padding: '18px', 
              background: '#00C853', 
              color: 'black', 
              borderRadius: '12px', 
              fontWeight: 900, 
              cursor: 'pointer',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}>
            <ArrowLeft size={18} /> VOLVER AL INICIO
          </button>

          <a 
            href="https://wa.me/tu-numero-aqui" 
            target="_blank"
            style={{ 
              color: '#555', 
              fontSize: '0.9rem', 
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '10px'
            }}>
            <MessageSquare size={16} /> ¿Necesita soporte inmediato? Contactar
          </a>
        </div>
      </div>
    </div>
  );
}