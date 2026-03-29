"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ShieldCheck, Zap, Loader2, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function AdminAuthPage() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        // --- LÓGICA DE SEGURIDAD (Simulación de validación) ---
        setTimeout(() => {
            if (password === 'GURU2026' || password === 'bunker2026') {
                localStorage.setItem('bunker_autorizado', 'true');
                router.push('/admin');
            } else {
                setError('CÓDIGO DE AUTORIZACIÓN INVÁLIDO');
                setLoading(false);
            }
        }, 1000);
    };

    // EL GATILLO: El botón cobra vida si hay texto
    const listoParaDesbloquear = password.length >= 4;

    return (
        <div className="bunker-auth-container">
            <div className="noise-bg"></div>
            
            <form onSubmit={handleAuth} className="security-card fade-in">
                <div className="card-header">
                    <div className="icon-shield-wrapper">
                        <ShieldCheck size={42} color="#00C853" />
                        <div className="shield-glow"></div>
                    </div>
                    <h1>BÚNKER DE <span className="neon-green-text">SEGURIDAD</span></h1>
                    <p>ACCESO RESTRINGIDO • NIVEL ADMINISTRADOR</p>
                </div>

                <div className="input-field-group">
                    <div className={`input-neon-wrapper ${password.length > 0 ? 'active-typing' : ''}`}>
                        <Lock size={20} className="lock-icon" />
                        <input
                            type={showPass ? "text" : "password"}
                            placeholder="INGRESE CLAVE MAESTRA"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bunker-input-elite"
                            autoComplete="off"
                        />
                        <button 
                            type="button" 
                            className="eye-toggle"
                            onClick={() => setShowPass(!showPass)}
                        >
                            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="error-alert">
                        <Zap size={14} /> {error}
                    </div>
                )}

                <button 
                    type="submit" 
                    disabled={!listoParaDesbloquear || loading}
                    className={`bunker-btn-submit ${listoParaDesbloquear ? 'ignited' : ''}`}
                >
                    {loading ? (
                        <Loader2 size={24} className="spin" />
                    ) : (
                        <>
                            <span>DESBLOQUEAR BÓVEDA</span>
                            <ArrowRight size={20} className="arrow-slide" />
                        </>
                    )}
                </button>

                <div className="security-footer">
                    <div className="dot"></div>
                    <span>PROTOCOLO AES-256 BIT ACTIVO</span>
                </div>
            </form>

            <style jsx global>{`
                :root {
                    --neon-green: #00C853;
                    --neon-glow: rgba(0, 200, 83, 0.4);
                    --dark-bg: #000000;
                    --card-bg: #050505;
                }

                body { margin: 0; background: var(--dark-bg); font-family: sans-serif; overflow: hidden; }

                .bunker-auth-container {
                    height: 100vh; display: flex; align-items: center; justify-content: center;
                    position: relative; background: radial-gradient(circle at center, #0a0a0a 0%, #000 100%);
                }

                .security-card {
                    width: 100%; max-width: 420px; background: var(--card-bg);
                    padding: 60px 45px; border-radius: 35px; border: 1px solid #111;
                    box-shadow: 0 30px 60px rgba(0,0,0,0.8); position: relative; z-index: 10;
                    text-align: center;
                }

                .icon-shield-wrapper {
                    display: inline-flex; position: relative; margin-bottom: 25px;
                    padding: 20px; background: rgba(0,200,83,0.03); border-radius: 25px;
                }
                .shield-glow {
                    position: absolute; inset: 0; background: var(--neon-green);
                    filter: blur(30px); opacity: 0.15; border-radius: 25px;
                }

                h1 { color: #fff; font-size: 1.6rem; font-weight: 900; letter-spacing: -0.5px; margin: 0; }
                .neon-green-text { color: var(--neon-green); text-shadow: 0 0 15px var(--neon-green); }
                p { color: #444; font-size: 10px; font-weight: 800; letter-spacing: 2px; margin-top: 10px; }

                .input-field-group { margin-top: 40px; }
                
                /* EL BORDE MEJORADO */
                .input-neon-wrapper {
                    display: flex; align-items: center; background: #080808;
                    border: 2px solid #111; border-radius: 18px; padding: 5px 20px;
                    transition: all 0.3s ease; position: relative;
                }

                .input-neon-wrapper.active-typing {
                    border-color: var(--neon-green);
                    box-shadow: 0 0 20px var(--neon-glow);
                }

                .bunker-input-elite {
                    flex: 1; background: transparent; border: none; outline: none;
                    color: #fff; font-size: 1.2rem; padding: 15px 10px;
                    letter-spacing: 3px; font-weight: 700;
                }

                .lock-icon { color: #222; transition: 0.3s; }
                .active-typing .lock-icon { color: var(--neon-green); }

                .eye-toggle { background: none; border: none; color: #222; cursor: pointer; }

                /* EL BOTÓN QUE SE ENCIENDE */
                .bunker-btn-submit {
                    width: 100%; margin-top: 35px; padding: 22px;
                    border-radius: 20px; border: none; font-weight: 900;
                    font-size: 14px; letter-spacing: 1px; cursor: not-allowed;
                    background: #111; color: #333; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    display: flex; align-items: center; justify-content: center; gap: 12px;
                }

                .bunker-btn-submit.ignited {
                    background: var(--neon-green); color: #000;
                    cursor: pointer; box-shadow: 0 10px 30px var(--neon-glow);
                }

                .bunker-btn-submit.ignited:hover {
                    transform: translateY(-3px); box-shadow: 0 15px 40px var(--neon-glow);
                }

                .arrow-slide { opacity: 0; transform: translateX(-10px); transition: 0.3s; }
                .ignited:hover .arrow-slide { opacity: 1; transform: translateX(0); }

                .error-alert {
                    margin-top: 20px; color: #FF3D00; font-size: 11px; font-weight: 800;
                    background: rgba(255,61,0,0.05); padding: 12px; border-radius: 10px;
                }

                .security-footer {
                    margin-top: 40px; display: flex; align-items: center; justify-content: center;
                    gap: 10px; color: #222; font-size: 9px; font-weight: 800;
                }
                .dot { width: 6px; height: 6px; background: var(--neon-green); border-radius: 50%; box-shadow: 0 0 10px var(--neon-green); }

                .fade-in { animation: fadeIn 0.8s ease-out forwards; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                .spin { animation: rotate 1s linear infinite; }
                @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
}