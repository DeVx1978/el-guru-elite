"use client";
import React, { useState } from 'react';

export default function LoginPage() {
  const [verPassword, setVerPassword] = useState(false);

  return (
    <main style={{ backgroundColor: '#05070a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', color: 'white', fontFamily: 'Arial' }}>
      <div style={{ backgroundColor: '#0a0c10', border: '1px solid #1a1d23', padding: '50px 40px', borderRadius: '20px', width: '100%', maxWidth: '400px', textAlign: 'center', position: 'relative' }}>
        
        <a href="/" style={{ position: 'absolute', top: '20px', left: '20px', color: '#444', textDecoration: 'none', fontSize: '18px', fontWeight: 'bold' }}>✕</a>

        <div style={{ marginBottom: '40px' }}>
          <div style={{ color: '#00C853', fontWeight: '900', fontSize: '28px', fontStyle: 'italic' }}>EL GURÚ</div>
          <div style={{ color: '#444', fontSize: '9px', letterSpacing: '4px', fontWeight: 'bold' }}>ACCESO EXCLUSIVO</div>
        </div>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="email" placeholder="CORREO ELECTRÓNICO" style={{ backgroundColor: '#05070a', border: '1px solid #1a1d23', color: 'white', padding: '16px', borderRadius: '10px', fontSize: '12px', outline: 'none' }} />
          
          <div style={{ position: 'relative' }}>
            <input 
              type={verPassword ? "text" : "password"} 
              placeholder="CONTRASEÑA" 
              style={{ backgroundColor: '#05070a', border: '1px solid #1a1d23', color: 'white', padding: '16px', borderRadius: '10px', fontSize: '12px', outline: 'none', width: '100%', boxSizing: 'border-box' }} 
            />
            {/* ICONO DE OJO DINÁMICO */}
            <button 
              type="button"
              onClick={() => setVerPassword(!verPassword)}
              style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: '5px' }}
            >
              {verPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00C853" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              )}
            </button>
          </div>

          <button type="button" style={{ backgroundColor: '#00C853', color: 'black', fontWeight: '900', padding: '18px', borderRadius: '10px', border: 'none', marginTop: '15px', cursor: 'pointer', fontSize: '12px' }}>ENTRAR AL PANEL</button>
        </form>
      </div>
    </main>
  );
}