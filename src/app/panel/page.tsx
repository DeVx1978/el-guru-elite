"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import {
    User, Wallet, TrendingUp, ShieldCheck, LogOut,
    Zap, Activity, ShieldAlert, BarChart3, LayoutDashboard,
    Building2, Globe, X, Terminal, ArrowUpRight, Lock, ArrowLeft,
    Mail, Bell, ChevronDown, HelpCircle, Users, CreditCard, PieChart,
    ArrowDownLeft, ArrowUpRight as ArrowUpRightIcon, Star, Cpu, MapPin, Phone
} from 'lucide-react';

const clientSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SocioPanel() {
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [nombre, setNombre] = useState("Socio");
    const [esAdmin, setEsAdmin] = useState(false);
    const [pendientes, setPendientes] = useState(0);
    const [activeTab, setActiveTab] = useState('inicio');

    const [balance, setBalance] = useState(0);
    const [balanceVisual, setBalanceVisual] = useState(0);
    const [nivelSocio, setNivelSocio] = useState("Socio Élite");
    const [utilidad, setUtilidad] = useState(0);
    const [editEmail, setEditEmail] = useState("");

    const [metodoRetiro, setMetodoRetiro] = useState('banco');
    const [montoRetiro, setMontoRetiro] = useState('');
    const [detallesDestino, setDetallesDestino] = useState('');
    const [enviandoRetiro, setEnviandoRetiro] = useState(false);
    const [show2FA, setShow2FA] = useState(false);
    const [codigoIngresado, setCodigoIngresado] = useState('');
    const [codigoGenerado, setCodigoGenerado] = useState('');

    const [editNombre, setEditNombre] = useState("");
    const [editPais, setEditPais] = useState("");
    const [editTelefono, setEditTelefono] = useState("");
    const [editCiudad, setEditCiudad] = useState("");
    const [guardandoPerfil, setGuardandoPerfil] = useState(false);

    // Contadores animados por pestaña
    const [cajeroBalanceVisual, setCajeroBalanceVisual] = useState(0);
    const [perfilInversionVisual, setPerfilInversionVisual] = useState(0);

    useEffect(() => {
        const socioId = localStorage.getItem('socio_id');
        const socioNombre = localStorage.getItem('socio_nombre');

        if (!socioId) {
            router.push('/login');
            return;
        }

        setNombre(socioNombre || "Socio");
        setEditNombre(socioNombre || "");

        conectarBovedaElite(socioId);
    }, [router]);

    const conectarBovedaElite = async (idSocio: string) => {
        try {
            const { data: socioBase, error: errorBase } = await clientSupabase
                .from('socios')
                .select('*')
                .eq('id', idSocio)
                .single();

            const { data: socioElite, error: errorElite } = await clientSupabase
                .from('socios_elite')
                .select('*')
                .eq('id_socio', idSocio)
                .single();

            if (errorBase || errorElite) {
                console.error("Error al cargar socio:", errorBase || errorElite);
                alert("Error al cargar tus datos. Intenta iniciar sesión nuevamente.");
                router.push('/login');
                return;
            }

            if (socioBase && socioElite) {
                const capital = Number(socioElite.inversion_minima) || 0;
                const ganancia = Number(socioBase.utilidad_total) || 0;

                setBalance(capital + ganancia);
                setUtilidad(ganancia);
                setNivelSocio(socioElite.nivel_socio || "Socio Élite");
                setEditPais(socioElite.pais || "Colombia");
                setEditTelefono(socioElite.telefono || "");
                setEditCiudad(socioElite.ciudad || "");
                setEditEmail(socioBase.email || "");
                setEsAdmin(socioBase.rol === 'admin' || socioBase.email === 'mariajose@gmail.com');
            }
        } catch (err) {
            console.error("Error inesperado:", err);
            alert("Ocurrió un error al conectar con la bóveda. Por favor inicia sesión nuevamente.");
            router.push('/login');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (esAdmin && !loading) obtenerPendientesAdmin();
    }, [esAdmin, loading]);

    // Contador principal (Inicio) - Animación desde $0 con efecto IA suave
    useEffect(() => {
        if (!loading && balance > 0) {
            let start = 0;
            const duration = 1800;
            const increment = balance / (duration / 16);
            const timer = setInterval(() => {
                start += increment;
                if (start >= balance) {
                    setBalanceVisual(balance);
                    clearInterval(timer);
                } else {
                    setBalanceVisual(Math.floor(start));
                }
            }, 16);
            return () => clearInterval(timer);
        }
    }, [loading, balance]);

    // Contador para pestaña CAJERO
    useEffect(() => {
        if (activeTab === 'retiros' && balance > 0) {
            let start = 0;
            const duration = 1200;
            const increment = balance / (duration / 16);
            const timer = setInterval(() => {
                start += increment;
                if (start >= balance) {
                    setCajeroBalanceVisual(balance);
                    clearInterval(timer);
                } else {
                    setCajeroBalanceVisual(Math.floor(start));
                }
            }, 16);
            return () => clearInterval(timer);
        }
    }, [activeTab, balance]);

    // Contador para pestaña CUENTA (Inversión inicial)
    useEffect(() => {
        if (activeTab === 'perfil' && balance > 0) {
            let start = 0;
            const duration = 1400;
            const target = balance - utilidad;
            const increment = target / (duration / 16);
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    setPerfilInversionVisual(target);
                    clearInterval(timer);
                } else {
                    setPerfilInversionVisual(Math.floor(start));
                }
            }, 16);
            return () => clearInterval(timer);
        }
    }, [activeTab, balance, utilidad]);

    const obtenerPendientesAdmin = async () => {
        const { count } = await clientSupabase.from('socios').select('*', { count: 'exact', head: true }).eq('estado', 'pendiente');
        setPendientes(count || 0);
    };

    const handleLogout = () => {
        localStorage.clear();
        router.push('/login');
    };

    const iniciarProtocoloRetiro = () => {
        if (!montoRetiro || !detallesDestino) return alert("Complete los datos requeridos");
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setCodigoGenerado(code);
        setShow2FA(true);
    };

    const confirmarRetiroFinal = async () => {
        if (codigoIngresado !== codigoGenerado) return alert("Código inválido");
        setEnviandoRetiro(true);
        const socioId = localStorage.getItem('socio_id');
        try {
            await clientSupabase.from('retiros').insert([{
                id_socio: socioId,
                monto: parseFloat(montoRetiro),
                billetera: detallesDestino,
                estado: 'pendiente'
            }]);
            setShow2FA(false);
            setMontoRetiro('');
            setDetallesDestino('');
            alert("Solicitud en auditoría enviada correctamente.");
        } catch (err) {
            alert("Error en el envío.");
        } finally {
            setEnviandoRetiro(false);
        }
    };

    const actualizarPerfil = async () => {
        setGuardandoPerfil(true);
        const socioId = localStorage.getItem('socio_id');
        try {
            await clientSupabase.from('socios').update({ nombre: editNombre }).eq('id', socioId);
            await clientSupabase.from('socios_elite').update({
                pais: editPais,
                telefono: editTelefono,
                ciudad: editCiudad
            }).eq('id_socio', socioId);
            setNombre(editNombre);
            localStorage.setItem('socio_nombre', editNombre);
            alert("Perfil actualizado correctamente.");
        } catch (err) {
            alert("Error al actualizar perfil.");
        } finally {
            setGuardandoPerfil(false);
        }
    };

    const getNivelStyles = () => {
        const nivel = nivelSocio.toLowerCase();
        if (nivel.includes('titanium')) return { color: '#FFD600', shadow: '0 0 20px rgba(255, 214, 0, 0.4)' };
        if (nivel.includes('vip')) return { color: '#AA00FF', shadow: '0 0 20px rgba(170, 0, 255, 0.4)' };
        if (nivel.includes('élite')) return { color: '#00B0FF', shadow: '0 0 20px rgba(0, 176, 255, 0.4)' };
        return { color: '#00C853', shadow: '0 0 20px rgba(0, 200, 83, 0.4)' };
    };

    const RenderInicio = () => (
        <div className="fade-in premium-dashboard">
            <header className="premium-header">
                <div className="header-greeting">
                    <span className="rank-badge" style={{ 
                        borderColor: getNivelStyles().color, 
                        color: getNivelStyles().color,
                        boxShadow: getNivelStyles().shadow 
                    }}>
                        <Star size={10} fill={getNivelStyles().color} style={{marginRight: '6px'}}/>
                        {nivelSocio.toUpperCase()}
                    </span>
                    <h1>Hola, <span>{nombre.split(' ')[0]}</span></h1>
                    <p>Terminal de Gestión de Activos Bancarios • DeVx Global</p>
                </div>
                <div className="header-actions-top desktop-only">
                    <button className="icon-circle-btn"><Bell size={18} /></button>
                    <div className="user-pill">
                        <div className="avatar-mini">{nombre.charAt(0)}</div>
                        <span>ID: {localStorage.getItem('socio_id')?.slice(0, 5)}</span>
                    </div>
                </div>
            </header>

            <section className="main-vault-card">
                <div className="vault-glass-overlay"></div>
                <div className="vault-info">
                    <div className="vault-label">
                        <ShieldCheck size={14} color="#00C853" />
                        <span>TOTAL ASSETS UNDER MANAGEMENT</span>
                    </div>
                    <h2 className="main-balance-text">
                        <small>$</small>{balanceVisual.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </h2>
                    <div className="vault-stats-row">
                        <div className="v-stat">
                            <span className="v-label">SAVINGS</span>
                            <span className="v-value">${(balance - utilidad).toLocaleString()}</span>
                        </div>
                        <div className="v-stat divider"></div>
                        <div className="v-stat">
                            <span className="v-label">EARNED THIS MONTH</span>
                            <span className="v-value positive">+${utilidad.toLocaleString()} <ArrowUpRightIcon size={12}/></span>
                        </div>
                    </div>
                </div>
                <div className="vault-visual">
                    <div className="pulse-aura"></div>
                    <Zap size={40} color="#00C853" />
                </div>
            </section>

            <div className="secondary-grid">
                <div className="premium-card">
                    <div className="card-head">
                        <TrendingUp size={18} color="#AA00FF" />
                        <span>HOLDINGS GROWTH</span>
                    </div>
                    <div className="chart-simulation">
                        {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                            <div key={i} className="bar-wrapper">
                                <div className="bar-inner" style={{ height: `${h}%`, backgroundColor: '#AA00FF' }}></div>
                            </div>
                        ))}
                    </div>
                    <div className="card-footer-info">
                        <span className="percentage-up">+12.4% this week</span>
                    </div>
                </div>

                <div className="premium-card">
                    <div className="card-head">
                        <Activity size={18} color="#00B0FF" />
                        <span>REAL-TIME AUDIT</span>
                    </div>
                    <div className="audit-status">
                        <div className="status-indicator">
                            <div className="dot"></div>
                            <span>SYSTEM ONLINE</span>
                        </div>
                        <h3>VERIFICADA</h3>
                        <p>DeVx Engine v4.2 running active</p>
                    </div>
                </div>
            </div>

            <h3 className="section-subtitle">OPERATIONS CENTER</h3>
            <div className="actions-strip">
                <button onClick={() => setActiveTab('reportes')} className="strip-btn blue">
                    <div className="icon-box"><BarChart3 size={20} /></div>
                    <span>MERCADOS</span>
                </button>
                <button onClick={() => setActiveTab('retiros')} className="strip-btn purple">
                    <div className="icon-box"><Wallet size={20} /></div>
                    <span>RETIROS</span>
                </button>
                <button onClick={() => setActiveTab('perfil')} className="strip-btn green">
                    <div className="icon-box"><User size={20} /></div>
                    <span>PERFIL</span>
                </button>
                <button onClick={() => window.open('https://wa.me/soporte', '_blank')} className="strip-btn gold">
                    <div className="icon-box"><HelpCircle size={20} /></div>
                    <span>SOPORTE</span>
                </button>
            </div>

            <div className="radar-access-banner" onClick={() => router.push('/radar')}>
                <div className="banner-content">
                    <div className="banner-icon"><Globe size={24} className="spin-slow" /></div>
                    <div>
                        <h4>ACCESO RADAR GLOBAL</h4>
                        <p>Análisis satelital de mercados de élite en tiempo real.</p>
                    </div>
                </div>
                <ArrowUpRight size={20} />
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="elite-loader">
                <div className="scanner-ring"></div>
                <div className="loading-text">
                    <span>DE<span style={{color: '#00C853'}}>VX</span></span>
                    <p>ESTABILIZANDO CONEXIÓN BANCARIA...</p>
                </div>
                <style jsx>{`
                    .elite-loader { 
                        background: #000000; 
                        height: 100vh; 
                        display: flex; 
                        flex-direction: column; 
                        justify-content: center; 
                        align-items: center; 
                        position: fixed; 
                        inset: 0; 
                        z-index: 9999;
                    }
                    .scanner-ring { 
                        width: 92px; 
                        height: 92px; 
                        border: 3px solid #111111; 
                        border-top: 3px solid #00C853; 
                        border-radius: 50%; 
                        animation: spin 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                        box-shadow: 0 0 40px #00C853;
                    }
                    .loading-text { 
                        margin-top: 40px; 
                        text-align: center; 
                    }
                    .loading-text span { 
                        font-weight: 900; 
                        letter-spacing: 6px; 
                        font-size: 1.8rem; 
                        color: #ffffff; 
                        text-shadow: 0 0 20px #00C853;
                    }
                    .loading-text p { 
                        color: #666666; 
                        font-size: 11px; 
                        letter-spacing: 3px; 
                        margin-top: 14px; 
                        font-weight: 800; 
                    }
                    @keyframes spin { to { transform: rotate(360deg); } }
                `}</style>
            </div>
        );
    }

    return (
        <div className="premium-mansion-layout">
            {show2FA && (
                <div className="security-overlay fade-in">
                    <div className="security-card scale-in">
                        <button className="close-x" onClick={() => setShow2FA(false)}><X size={20} /></button>
                        <div className="security-icon-header">
                            <ShieldAlert size={48} color="#00C853" />
                            <div className="glow-shield"></div>
                        </div>
                        <h2>VERIFICACIÓN DE SEGURIDAD</h2>
                        <p>Autorización de retiro para: <br/><strong>{editEmail}</strong></p>
                        <div className="otp-container">
                            <input
                                className="premium-otp-input"
                                type="text"
                                maxLength={6}
                                placeholder="000 000"
                                value={codigoIngresado}
                                onChange={(e) => setCodigoIngresado(e.target.value)}
                            />
                        </div>
                        <button className="premium-submit-btn" onClick={confirmarRetiroFinal} disabled={enviandoRetiro}>
                            {enviandoRetiro ? 'PROCESANDO TRANSACCIÓN...' : 'CONFIRMAR IDENTIDAD'}
                        </button>
                    </div>
                </div>
            )}

            {/* SIDEBAR DESKTOP */}
            <aside className="premium-sidebar desktop-only">
                <div className="sidebar-brand">
                    <div className="logo-icon">G</div>
                    <span>GURÚ<strong>ÉLITE</strong></span>
                </div>
                
                <nav className="sidebar-nav">
                    <div className="nav-group">
                        <p className="nav-label">MAIN TERMINAL</p>
                        <button className={activeTab === 'inicio' ? 'active' : ''} onClick={() => setActiveTab('inicio')}>
                            <LayoutDashboard size={18} /> Mi Bóveda
                        </button>
                        <button className={activeTab === 'reportes' ? 'active' : ''} onClick={() => setActiveTab('reportes')}>
                            <BarChart3 size={18} /> Mercados
                        </button>
                        <button className={activeTab === 'retiros' ? 'active' : ''} onClick={() => setActiveTab('retiros')}>
                            <Wallet size={18} /> Cajero
                        </button>
                        <button className={activeTab === 'perfil' ? 'active' : ''} onClick={() => setActiveTab('perfil')}>
                            <User size={18} /> Cuenta
                        </button>
                    </div>

                    <div className="nav-group">
                        <p className="nav-label">ESTRUCTURA</p>
                        <button onClick={() => router.push('/info/quienes-somos')}>
                            <Users size={18} /> Quiénes Somos
                        </button>
                        <button onClick={() => router.push('/info/confidencialidad')}>
                            <Lock size={18} /> Confidencialidad
                        </button>
                    </div>
                </nav>

                <div className="sidebar-footer">
                    {esAdmin && (
                        <button className="admin-toggle-btn" onClick={() => router.push('/admin/auth')}>
                            <Terminal size={14} /> 
                            <span>MODO ADMIN</span>
                            {pendientes > 0 && <span className="admin-badge">{pendientes}</span>}
                        </button>
                    )}
                    <button className="logout-btn" onClick={handleLogout}>
                        <LogOut size={16} /> <span>CERRAR SESIÓN</span>
                    </button>
                </div>
            </aside>

            <div className="premium-viewport">
                {/* HEADER MOBILE - Eliminado "DVX" duplicado */}
                <header className="mobile-premium-header mobile-only">
                    <div className="m-title">MI BÓVEDA</div>
                    <button className="m-notif"><Bell size={20} /></button>
                </header>

                <main className="premium-content-area">
                    {activeTab !== 'inicio' && (
                        <button onClick={() => setActiveTab('inicio')} className="premium-back-btn">
                            <ArrowLeft size={16} /> REGRESAR A BÓVEDA
                        </button>
                    )}

                    {activeTab === 'inicio' && <RenderInicio />}

                    {activeTab === 'retiros' && (
                        <div className="fade-in premium-section tab-transition">
                            <h2 className="premium-title">Terminal de <span className="neon-purple">Retiros</span></h2>
                            
                            {/* Micro-gráfico de límite diario */}
                            <div className="daily-limit-chart">
                                <div className="chart-header-small">
                                    <span>LÍMITE DE RETIRO DIARIO</span>
                                    <span className="limit-value">$2,500 / $5,000</span>
                                </div>
                                <div className="bars-container">
                                    {[85, 62, 91, 45, 78, 33, 67].map((height, i) => (
                                        <div key={i} className="bar-col">
                                            <div className="bar-fill" style={{ height: `${height}%` }}></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="premium-glass-card withdraw-card purple-theme">
                                <div className="withdraw-display">
                                    <span className="balance-label">SALDO LÍQUIDO DISPONIBLE</span>
                                    <h3 className="balance-counter neon-purple-glow">
                                        <small>$</small>{cajeroBalanceVisual.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                    </h3>
                                </div>
                                
                                <div className="method-grid">
                                    <button 
                                        className={`method-btn ${metodoRetiro === 'banco' ? 'active' : ''}`} 
                                        onClick={() => setMetodoRetiro('banco')}
                                    >
                                        <Building2 size={22} />
                                        <span>TRANSFERENCIA BANCARIA</span>
                                    </button>
                                    <button 
                                        className={`method-btn ${metodoRetiro === 'cripto' ? 'active' : ''}`} 
                                        onClick={() => setMetodoRetiro('cripto')}
                                    >
                                        <Zap size={22} />
                                        <span>USDT (TRC20)</span>
                                    </button>
                                </div>

                                <div className="premium-form">
                                    <div className="p-input-group">
                                        <label>MONTO A RETIRAR (USD)</label>
                                        <div className="input-with-symbol elite-input">
                                            <span className="symbol">$</span>
                                            <input 
                                                type="number" 
                                                placeholder="0.00" 
                                                value={montoRetiro} 
                                                onChange={e => setMontoRetiro(e.target.value)} 
                                            />
                                        </div>
                                    </div>
                                    <div className="p-input-group">
                                        <label>DESTINO DE FONDOS</label>
                                        <textarea 
                                            className="elite-textarea"
                                            placeholder="Ingrese datos de cuenta bancaria o dirección de billetera USDT..." 
                                            value={detallesDestino} 
                                            onChange={e => setDetallesDestino(e.target.value)} 
                                        />
                                    </div>
                                    <button className="premium-action-btn purple-action" onClick={iniciarProtocoloRetiro}>
                                        <Lock size={20} /> ACTIVAR PROTOCOLO SEGURO
                                    </button>
                                    <p className="form-hint">Todas las transacciones pasan por un proceso de auditoría de 24h a 48h.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'perfil' && (
                        <div className="fade-in premium-section tab-transition">
                            <h2 className="premium-title">Ajustes de <span className="neon-purple">Cuenta</span></h2>
                            
                            <div className="membership-badge-container">
                                <div className="membership-badge" style={getNivelStyles()}>
                                    <Star size={32} fill={getNivelStyles().color} />
                                    <span>{nivelSocio.toUpperCase()}</span>
                                </div>
                            </div>

                            <div className="profile-main-card premium-glass-card">
                                <div className="profile-header">
                                    <User size={28} color="#00B0FF" />
                                    <h3>INFORMACIÓN PERSONAL</h3>
                                </div>
                                
                                <div className="profile-form-grid">
                                    <div className="input-wrapper">
                                        <label>NOMBRE COMPLETO</label>
                                        <div className="icon-input">
                                            <User size={18} color="#00B0FF" />
                                            <input 
                                                value={editNombre} 
                                                onChange={e => setEditNombre(e.target.value)} 
                                                placeholder="Nombre completo"
                                            />
                                        </div>
                                    </div>
                                    <div className="input-wrapper">
                                        <label>PAÍS</label>
                                        <div className="icon-input">
                                            <Globe size={18} color="#00B0FF" />
                                            <input 
                                                value={editPais} 
                                                onChange={e => setEditPais(e.target.value)} 
                                                placeholder="País"
                                            />
                                        </div>
                                    </div>
                                    <div className="input-wrapper">
                                        <label>CIUDAD</label>
                                        <div className="icon-input">
                                            <MapPin size={18} color="#00B0FF" />
                                            <input 
                                                value={editCiudad} 
                                                onChange={e => setEditCiudad(e.target.value)} 
                                                placeholder="Ciudad"
                                            />
                                        </div>
                                    </div>
                                    <div className="input-wrapper">
                                        <label>TELÉFONO MÓVIL</label>
                                        <div className="icon-input">
                                            <Phone size={18} color="#00B0FF" />
                                            <input 
                                                value={editTelefono} 
                                                onChange={e => setEditTelefono(e.target.value)} 
                                                placeholder="Teléfono"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    className="premium-save-btn" 
                                    onClick={actualizarPerfil} 
                                    disabled={guardandoPerfil}
                                >
                                    {guardandoPerfil ? 'SINCRONIZANDO...' : 'GUARDAR CAMBIOS'}
                                </button>
                            </div>

                            <div className="side-info-grid">
                                <div className="mini-info-card premium-glass-card">
                                    <Mail size={24} color="#00B0FF" />
                                    <div className="info-content">
                                        <label>EMAIL ASOCIADO</label>
                                        <p className="email-value">{editEmail}</p>
                                    </div>
                                </div>
                                <div className="mini-info-card premium-glass-card">
                                    <ShieldCheck size={24} color="#00C853" />
                                    <div className="info-content">
                                        <label>AUDITORÍA DE CUENTA</label>
                                        <p className="status-active">ACTIVA</p>
                                    </div>
                                </div>
                                <div className="mini-info-card premium-glass-card investment-card">
                                    <PieChart size={24} color="#00B0FF" />
                                    <div className="info-content">
                                        <label>INVERSIÓN INICIAL</label>
                                        <h3 className="investment-counter">
                                            ${perfilInversionVisual.toLocaleString()}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'reportes' && (
                        <div className="fade-in premium-section">
                            <h2 className="premium-title">Análisis de <span>Mercados</span></h2>
                            <div className="markets-summary-grid">
                                <div className="premium-glass-card market-stat">
                                    <div className="m-head"><Wallet size={16} /> CAPITAL SEMILLA</div>
                                    <h3>${(balance - utilidad).toLocaleString()}</h3>
                                </div>
                                <div className="premium-glass-card market-stat glow-purple">
                                    <div className="m-head"><Activity size={16} /> PROFIT TOTAL</div>
                                    <h3 className="neon-text-purple">+${utilidad.toLocaleString()}</h3>
                                </div>
                            </div>

                            <div className="premium-glass-card big-chart-card">
                                <div className="chart-header">
                                    <h4>ESTADÍSTICAS SEMANALES</h4>
                                    <div className="chart-legend">
                                        <div className="leg-item"><span className="dot purple"></span> Rendimiento</div>
                                    </div>
                                </div>
                                <div className="premium-chart-container">
                                    <div className="chart-bars-wrap">
                                        {[35, 65, 45, 85, 55, 95, 100, 70, 85].map((h, i) => (
                                            <div key={i} className="chart-bar-col">
                                                <div className="bar-glow" style={{ height: `${h}%` }}></div>
                                                <div className="bar-main" style={{ height: `${h}%` }}></div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="chart-labels">
                                        <span>L</span><span>M</span><span>X</span><span>J</span><span>V</span><span>S</span><span>D</span><span>L</span><span>M</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>

                {/* BOTTOM NAV MOBILE */}
                <nav className="mobile-bottom-navbar mobile-only">
                    <button className={activeTab === 'inicio' ? 'active' : ''} onClick={() => setActiveTab('inicio')}>
                        <LayoutDashboard size={20} />
                        <span>Inicio</span>
                    </button>
                    <button className={activeTab === 'reportes' ? 'active' : ''} onClick={() => setActiveTab('reportes')}>
                        <BarChart3 size={20} />
                        <span>Mercados</span>
                    </button>
                    <button className={activeTab === 'retiros' ? 'active' : ''} onClick={() => setActiveTab('retiros')}>
                        <Wallet size={20} />
                        <span>Cajero</span>
                    </button>
                    <button className={activeTab === 'perfil' ? 'active' : ''} onClick={() => setActiveTab('perfil')}>
                        <User size={20} />
                        <span>Cuenta</span>
                    </button>
                </nav>
            </div>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');
                
                :root {
                    --neon-green: #00C853;
                    --electric-blue: #00B0FF;
                    --vibrant-purple: #AA00FF;
                    --titanium-gold: #FFD600;
                    --alert-red: #FF3D00;
                    --pure-black: #000000;
                    --card-bg: #050505;
                    --soft-border: #111111;
                    --text-muted: #888888;
                }

                * { box-sizing: border-box; }
                body { margin: 0; background: var(--pure-black); color: #ffffff; font-family: 'Plus Jakarta Sans', sans-serif; -webkit-font-smoothing: antialiased; }

                .premium-mansion-layout { display: flex; min-height: 100vh; background: var(--pure-black); }
                .fade-in { animation: fadeIn 0.6s ease-out forwards; }
                .tab-transition { transition: opacity 0.45s cubic-bezier(0.23, 1, 0.32, 1), transform 0.45s cubic-bezier(0.23, 1, 0.32, 1); }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }

                /* SIDEBAR */
                .premium-sidebar { 
                    width: 280px; 
                    background: #020202; 
                    border-right: 1px solid var(--soft-border); 
                    height: 100vh; 
                    position: sticky; 
                    top: 0; 
                    display: flex; 
                    flex-direction: column; 
                    padding: 40px 25px; 
                    z-index: 100;
                }
                .sidebar-brand { display: flex; align-items: center; gap: 12px; margin-bottom: 50px; }
                .logo-icon { width: 32px; height: 32px; background: var(--neon-green); border-radius: 8px; color: #000; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1.2rem; }
                .sidebar-brand span { font-weight: 400; font-size: 1.1rem; letter-spacing: -0.5px; }
                .sidebar-brand strong { color: var(--neon-green); font-weight: 800; }

                .nav-label { font-size: 10px; color: #444; font-weight: 800; letter-spacing: 2px; margin: 25px 0 15px 15px; }
                .sidebar-nav { flex: 1; }
                .sidebar-nav button { 
                    width: 100%; 
                    background: transparent; 
                    border: none; 
                    color: #666; 
                    padding: 14px 18px; 
                    display: flex; 
                    align-items: center; 
                    gap: 15px; 
                    font-weight: 600; 
                    font-size: 14px; 
                    cursor: pointer; 
                    transition: all 0.3s; 
                    border-radius: 14px; 
                    margin-bottom: 5px;
                }
                .sidebar-nav button:hover { color: #fff; background: rgba(255,255,255,0.03); }
                .sidebar-nav button.active { color: var(--neon-green); background: rgba(0, 200, 83, 0.05); }

                .sidebar-footer { padding-top: 20px; border-top: 1px solid var(--soft-border); }
                .admin-toggle-btn { 
                    width: 100%; background: rgba(0, 200, 83, 0.05); border: 1px solid rgba(0, 200, 83, 0.2); 
                    color: var(--neon-green); padding: 14px; border-radius: 12px; font-weight: 800; 
                    font-size: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 12px;
                }
                .admin-badge { background: var(--alert-red); color: #fff; padding: 2px 6px; border-radius: 20px; font-size: 9px; margin-left: auto; }
                .logout-btn { 
                    width: 100%; background: transparent; border: 1px solid #200505; color: var(--alert-red); 
                    padding: 14px; border-radius: 12px; font-weight: 700; font-size: 13px; cursor: pointer; 
                    display: flex; align-items: center; justify-content: center; gap: 10px; opacity: 0.8; transition: 0.3s;
                }
                .logout-btn:hover { opacity: 1; background: #200505; }

                /* VIEWPORT */
                .premium-viewport { flex: 1; display: flex; flex-direction: column; min-width: 0; }
                .premium-content-area { 
                    padding: 40px 6% 160px; 
                    max-width: 1200px; 
                    margin: 0 auto; 
                    width: 100%; 
                }

                /* HEADER MOBILE - DVX eliminado */
                .mobile-premium-header { 
                    height: 75px; 
                    border-bottom: 1px solid #111; 
                    display: flex; 
                    align-items: center; 
                    justify-content: space-between; 
                    padding: 0 20px; 
                    background: #000; 
                    position: sticky; 
                    top: 0; 
                    z-index: 500; 
                }
                .m-title { font-weight: 800; font-size: 13px; letter-spacing: 1px; color: #fff; }
                .m-notif { background: none; border: none; color: #444; }

                /* HEADER DESKTOP (sin cambios) */
                .premium-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; }
                .rank-badge { 
                    display: inline-flex; align-items: center; padding: 4px 12px; border-radius: 20px; 
                    border: 1px solid; font-size: 9px; font-weight: 800; letter-spacing: 2px; margin-bottom: 15px; 
                }
                .header-greeting h1 { font-size: 2.2rem; font-weight: 800; margin: 0; letter-spacing: -1.5px; }
                .header-greeting h1 span { color: var(--neon-green); }
                .header-greeting p { color: #555; font-size: 12px; margin-top: 5px; font-weight: 500; }
                .header-actions-top { display: flex; align-items: center; gap: 15px; }
                .icon-circle-btn { width: 42px; height: 42px; border-radius: 50%; background: var(--card-bg); border: 1px solid var(--soft-border); color: #666; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.3s; }
                .icon-circle-btn:hover { color: #fff; border-color: #333; }
                .user-pill { background: var(--card-bg); border: 1px solid var(--soft-border); padding: 5px 15px 5px 5px; border-radius: 30px; display: flex; align-items: center; gap: 10px; color: #aaa; font-size: 12px; font-weight: 600; }
                .avatar-mini { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, #00C853, #00B0FF); color: #000; font-weight: 900; display: flex; align-items: center; justify-content: center; font-size: 14px; }

                /* VAULT CARD */
                .main-vault-card { 
                    background: #080808; border: 1px solid var(--soft-border); border-radius: 32px; 
                    padding: 50px; position: relative; overflow: hidden; display: flex; justify-content: space-between; 
                    align-items: center; margin-bottom: 30px;
                }
                .vault-glass-overlay { position: absolute; top: 0; right: 0; width: 40%; height: 100%; background: linear-gradient(90deg, transparent, rgba(0, 200, 83, 0.03)); pointer-events: none; }
                .vault-label { display: flex; align-items: center; gap: 10px; color: #555; font-size: 11px; font-weight: 800; letter-spacing: 2px; margin-bottom: 15px; }
                .main-balance-text { font-size: 4.5rem; font-weight: 800; margin: 0; letter-spacing: -3px; }
                .main-balance-text small { font-size: 2rem; color: var(--neon-green); margin-right: 10px; vertical-align: middle; font-weight: 400; }
                .vault-stats-row { display: flex; align-items: center; gap: 40px; margin-top: 30px; }
                .v-stat { display: flex; flex-direction: column; gap: 5px; }
                .v-stat.divider { width: 1px; height: 30px; background: #222; }
                .v-label { font-size: 10px; color: #444; font-weight: 800; letter-spacing: 1px; }
                .v-value { font-size: 1.1rem; font-weight: 700; }
                .v-value.positive { color: var(--neon-green); display: flex; align-items: center; gap: 5px; }
                
                .vault-visual { position: relative; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center; }
                .pulse-aura { position: absolute; width: 100%; height: 100%; border: 2px solid var(--neon-green); border-radius: 50%; opacity: 0.2; animation: vaultPulse 2s infinite; }
                @keyframes vaultPulse { 0% { transform: scale(0.8); opacity: 0.3; } 100% { transform: scale(1.5); opacity: 0; } }

                /* CARDS GRID */
                .secondary-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 40px; }
                .premium-card { background: var(--card-bg); border: 1px solid var(--soft-border); border-radius: 24px; padding: 30px; position: relative; overflow: hidden; }
                .card-head { display: flex; align-items: center; gap: 12px; color: #555; font-size: 10px; font-weight: 800; letter-spacing: 1.5px; margin-bottom: 25px; }
                .chart-simulation { display: flex; align-items: flex-end; justify-content: space-between; height: 60px; gap: 5px; }
                .bar-wrapper { flex: 1; background: #111; height: 100%; border-radius: 4px; display: flex; align-items: flex-end; }
                .bar-inner { width: 100%; border-radius: 3px; transition: height 1s ease-out; }
                .card-footer-info { margin-top: 15px; }
                .percentage-up { font-size: 11px; color: var(--neon-green); font-weight: 700; }

                .audit-status h3 { font-size: 1.8rem; font-weight: 800; margin: 10px 0 5px; color: var(--electric-blue); }
                .audit-status p { font-size: 10px; color: #444; font-weight: 600; margin: 0; }
                .status-indicator { display: flex; align-items: center; gap: 8px; font-size: 9px; font-weight: 800; color: #555; }
                .status-indicator .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--electric-blue); box-shadow: 0 0 10px var(--electric-blue); animation: blink 1.5s infinite; }
                @keyframes blink { 50% { opacity: 0.3; } }

                /* ACTIONS */
                .section-subtitle { font-size: 10px; color: #444; font-weight: 800; letter-spacing: 3px; margin-bottom: 20px; }
                .actions-strip { 
                    display: grid; 
                    grid-template-columns: repeat(4, 1fr); 
                    gap: 15px; 
                    margin-bottom: 40px; 
                }
                .strip-btn { 
                    background: var(--card-bg); 
                    border: 2px solid var(--soft-border); 
                    border-radius: 20px; 
                    padding: 22px 16px; 
                    display: flex; 
                    flex-direction: column; 
                    align-items: center; 
                    gap: 14px; 
                    cursor: pointer; 
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .strip-btn .icon-box { 
                    width: 52px; 
                    height: 52px; 
                    border-radius: 16px; 
                    background: #0a0a0a; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    transition: 0.3s;
                }
                .strip-btn span { 
                    font-size: 11px; 
                    font-weight: 800; 
                    letter-spacing: 1px; 
                }
                .strip-btn:hover { 
                    border-color: #555; 
                    transform: translateY(-6px); 
                    box-shadow: 0 12px 30px rgba(255,255,255,0.04);
                }

                .strip-btn.blue { border-color: #00B0FF; }
                .strip-btn.blue .icon-box { color: #00B0FF; filter: drop-shadow(0 0 20px #00B0FF); }
                .strip-btn.blue span { color: #00B0FF; }

                .strip-btn.purple { border-color: #AA00FF; }
                .strip-btn.purple .icon-box { color: #AA00FF; filter: drop-shadow(0 0 20px #AA00FF); }
                .strip-btn.purple span { color: #AA00FF; }

                .strip-btn.green { border-color: #00C853; }
                .strip-btn.green .icon-box { color: #00C853; filter: drop-shadow(0 0 20px #00C853); }
                .strip-btn.green span { color: #00C853; }

                .strip-btn.gold { border-color: #FFD600; }
                .strip-btn.gold .icon-box { color: #FFD600; filter: drop-shadow(0 0 20px #FFD600); }
                .strip-btn.gold span { color: #FFD600; }

                /* RADAR GLOBAL */
                .radar-access-banner { 
                    background: linear-gradient(90deg, #050505, #0a0a0a); 
                    border: 1px solid var(--soft-border); 
                    border-radius: 24px; 
                    padding: 28px 40px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: space-between; 
                    cursor: pointer; 
                    transition: 0.3s; 
                    margin-top: 30px;
                    margin-bottom: 40px;
                }
                .radar-access-banner:hover { 
                    border-color: var(--neon-green); 
                    box-shadow: 0 10px 30px rgba(0, 200, 83, 0.05); 
                }
                .banner-content { display: flex; align-items: center; gap: 20px; }
                .banner-icon { 
                    width: 56px; 
                    height: 56px; 
                    border-radius: 16px; 
                    background: rgba(0, 200, 83, 0.12); 
                    color: var(--neon-green); 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                }
                .banner-content h4 { margin: 0; font-weight: 800; font-size: 1.15rem; }
                .banner-content p { margin: 6px 0 0; font-size: 12.5px; color: #666; }
                .spin-slow { animation: spin 12s linear infinite; }

                /* SECTIONS */
                .premium-title { font-size: 2.4rem; font-weight: 800; letter-spacing: -1.5px; margin-bottom: 40px; }
                .premium-title span { color: var(--neon-green); }
                .neon-purple { color: var(--vibrant-purple); text-shadow: 0 0 20px rgba(170,0,255,0.6); }

                .premium-glass-card { 
                    background: rgba(5,5,5,0.95); 
                    border: 1px solid rgba(255,255,255,0.08); 
                    border-radius: 28px; 
                    padding: 42px; 
                    backdrop-filter: blur(20px);
                    box-shadow: 0 10px 40px rgba(0,0,0,0.6);
                }

                .premium-back-btn { 
                    background: #0a0a0a; 
                    border: 1px solid #222; 
                    color: var(--neon-green); 
                    padding: 10px 20px; 
                    border-radius: 12px; 
                    font-weight: 800; 
                    font-size: 11px; 
                    cursor: pointer; 
                    display: flex; 
                    align-items: center; 
                    gap: 10px; 
                    margin-bottom: 30px; 
                    transition: all 0.3s;
                }
                .premium-back-btn:hover { background: #111; border-color: var(--neon-green); }

                /* CAJERO */
                .withdraw-card {
                    border: 2px solid var(--vibrant-purple);
                    box-shadow: 0 0 50px rgba(170, 0, 255, 0.25);
                }
                .withdraw-display {
                    text-align: center;
                    padding-bottom: 32px;
                    border-bottom: 1px solid #222;
                    margin-bottom: 32px;
                }
                .balance-label {
                    font-size: 11px;
                    letter-spacing: 3px;
                    color: #666;
                    font-weight: 800;
                }
                .balance-counter {
                    font-size: 4.8rem;
                    font-weight: 900;
                    letter-spacing: -4px;
                    line-height: 1;
                }
                .neon-purple-glow {
                    color: var(--vibrant-purple);
                    text-shadow: 0 0 40px #AA00FF, 0 0 80px rgba(170,0,255,0.6);
                }

                .method-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                    margin-bottom: 40px;
                }
                .method-btn {
                    background: #0a0a0a;
                    border: 2px solid #222;
                    border-radius: 16px;
                    padding: 24px 20px;
                    color: #777;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 12px;
                    font-weight: 600;
                    font-size: 13px;
                    transition: all 0.3s ease;
                }
                .method-btn:hover { border-color: #444; }
                .method-btn.active {
                    border-color: var(--vibrant-purple);
                    color: white;
                    background: rgba(170,0,255,0.08);
                    box-shadow: 0 0 25px rgba(170,0,255,0.3);
                }

                .elite-input { position: relative; }
                .elite-input .symbol {
                    position: absolute;
                    left: 22px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--vibrant-purple);
                    font-size: 1.4rem;
                    font-weight: 700;
                }
                .elite-input input, .elite-textarea {
                    width: 100%;
                    background: #000000 !important;
                    border: 2px solid var(--vibrant-purple) !important;
                    color: #ffffff !important;
                    padding: 18px 20px 18px 52px;
                    border-radius: 14px;
                    font-size: 16px;
                    outline: none;
                    transition: all 0.3s;
                }
                .elite-input input:focus, .elite-textarea:focus {
                    border-color: #fff !important;
                    box-shadow: 0 0 0 4px rgba(170,0,255,0.25);
                }
                .elite-textarea { min-height: 110px; resize: vertical; padding: 18px 20px; }

                .purple-action {
                    width: 100%;
                    background: linear-gradient(90deg, #AA00FF, #D16EFF);
                    color: #000;
                    border: none;
                    padding: 22px;
                    border-radius: 16px;
                    font-size: 15px;
                    font-weight: 900;
                    letter-spacing: 1px;
                    cursor: pointer;
                    transition: all 0.3s;
                    margin-top: 12px;
                }
                .purple-action:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 15px 40px rgba(170,0,255,0.5);
                }

                .form-hint {
                    text-align: center;
                    font-size: 11px;
                    color: #555;
                    margin-top: 24px;
                    font-weight: 500;
                }

                /* CUENTA */
                .membership-badge-container {
                    display: flex;
                    justify-content: center;
                    margin: 20px 0 50px;
                }
                .membership-badge {
                    display: flex;
                    align-items: center;
                    gap: 18px;
                    padding: 16px 48px;
                    border-radius: 9999px;
                    font-size: 1.95rem;
                    font-weight: 900;
                    letter-spacing: -1.2px;
                    text-transform: uppercase;
                    box-shadow: 0 0 70px currentColor;
                    border: 4px solid currentColor;
                    background: rgba(0,0,0,0.6);
                    transition: all 0.4s ease;
                }

                .profile-main-card { margin-bottom: 40px; }
                .profile-header {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin-bottom: 32px;
                    padding-bottom: 20px;
                    border-bottom: 1px solid #222;
                }
                .profile-header h3 {
                    margin: 0;
                    font-size: 1.35rem;
                    font-weight: 800;
                    letter-spacing: 0.5px;
                }

                .profile-form-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 24px;
                }
                .input-wrapper label {
                    display: block;
                    font-size: 10px;
                    font-weight: 800;
                    letter-spacing: 2px;
                    color: #666;
                    margin-bottom: 8px;
                }
                .icon-input {
                    display: flex;
                    align-items: center;
                    background: #000;
                    border: 2px solid #00B0FF;
                    border-radius: 14px;
                    overflow: hidden;
                    transition: all 0.3s;
                }
                .icon-input:focus-within {
                    border-color: #fff;
                    box-shadow: 0 0 0 4px rgba(0,176,255,0.25);
                }
                .icon-input svg {
                    margin-left: 18px;
                    flex-shrink: 0;
                }
                .icon-input input {
                    flex: 1;
                    background: transparent;
                    border: none;
                    padding: 18px 20px;
                    color: #fff;
                    font-size: 15px;
                    outline: none;
                }

                .premium-save-btn {
                    width: 100%;
                    background: var(--neon-green);
                    color: #000;
                    border: none;
                    padding: 20px;
                    border-radius: 14px;
                    font-weight: 900;
                    font-size: 15px;
                    margin-top: 32px;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                .premium-save-btn:hover {
                    transform: scale(1.02);
                    box-shadow: 0 10px 30px rgba(0,200,83,0.4);
                }

                .side-info-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 20px;
                }
                .mini-info-card {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    padding: 28px;
                }
                .mini-info-card svg { flex-shrink: 0; }
                .info-content label {
                    font-size: 10px;
                    color: #666;
                    font-weight: 800;
                    letter-spacing: 1.5px;
                }
                .email-value {
                    font-size: 15px;
                    font-weight: 700;
                    margin-top: 4px;
                }
                .status-active {
                    color: var(--neon-green);
                    font-weight: 800;
                    font-size: 15px;
                    margin-top: 4px;
                }
                .investment-card h3 {
                    font-size: 2.4rem;
                    font-weight: 900;
                    margin-top: 6px;
                    color: #fff;
                }

                /* MARKETS */
                .markets-summary-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
                .market-stat .m-head { font-size: 10px; color: #555; font-weight: 800; letter-spacing: 1.5px; margin-bottom: 15px; display: flex; align-items: center; gap: 10px; }
                .market-stat h3 { font-size: 2.2rem; font-weight: 800; margin: 0; }
                .neon-text-purple { color: var(--vibrant-purple); text-shadow: 0 0 15px rgba(170, 0, 255, 0.3); }
                .glow-purple { border-color: rgba(170, 0, 255, 0.2) !important; }

                .big-chart-card { padding: 40px !important; }
                .chart-header { display: flex; justify-content: space-between; margin-bottom: 40px; }
                .chart-header h4 { margin: 0; font-weight: 800; font-size: 14px; letter-spacing: 1px; color: #aaa; }
                .dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; margin-right: 8px; }
                .dot.purple { background: var(--vibrant-purple); box-shadow: 0 0 10px var(--vibrant-purple); }
                .chart-legend { font-size: 10px; font-weight: 700; color: #444; }
                
                .premium-chart-container { height: 250px; display: flex; flex-direction: column; }
                .chart-bars-wrap { flex: 1; display: flex; align-items: flex-end; justify-content: space-between; gap: 15px; padding-bottom: 20px; border-bottom: 1px solid #111; }
                .chart-bar-col { flex: 1; position: relative; height: 100%; display: flex; align-items: flex-end; justify-content: center; }
                .bar-main { width: 100%; max-width: 40px; background: var(--vibrant-purple); border-radius: 8px 8px 0 0; position: relative; z-index: 2; transition: height 1.5s ease-in-out; }
                .bar-glow { position: absolute; width: 100%; max-width: 60px; background: linear-gradient(to top, transparent, rgba(170, 0, 255, 0.15)); border-radius: 12px; filter: blur(10px); }
                .chart-labels { display: flex; justify-content: space-between; padding-top: 15px; color: #333; font-size: 10px; font-weight: 800; }

                /* SECURITY */
                .security-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.95); backdrop-filter: blur(15px); display: flex; align-items: center; justify-content: center; z-index: 2000; padding: 20px; }
                .security-card { background: #050505; border: 1px solid #222; border-radius: 40px; padding: 60px 40px; max-width: 450px; width: 100%; text-align: center; position: relative; }
                .security-icon-header { position: relative; margin-bottom: 30px; display: flex; justify-content: center; }
                .glow-shield { position: absolute; width: 60px; height: 60px; background: var(--neon-green); filter: blur(30px); opacity: 0.3; }
                .security-card h2 { font-weight: 800; font-size: 1.4rem; letter-spacing: -0.5px; margin-bottom: 15px; }
                .security-card p { color: #666; font-size: 14px; margin-bottom: 30px; line-height: 1.5; }
                .premium-otp-input { background: #000 !important; border: 1px solid #333 !important; border-radius: 15px; padding: 20px; width: 100%; font-size: 2rem; font-weight: 800; text-align: center; letter-spacing: 15px; color: var(--neon-green) !important; outline: none; margin-bottom: 30px; }
                .premium-otp-input::placeholder { letter-spacing: 5px; opacity: 0.2; }
                .premium-submit-btn { width: 100%; background: var(--neon-green); color: #000; padding: 20px; border-radius: 20px; font-weight: 900; border: none; cursor: pointer; font-size: 14px; }

                /* MOBILE NAV */
                .mobile-bottom-navbar { 
                    position: fixed; 
                    bottom: 0; 
                    left: 0; 
                    right: 0; 
                    height: 85px; 
                    background: rgba(5,5,5,0.94); 
                    backdrop-filter: blur(25px); 
                    border-top: 1px solid var(--soft-border); 
                    display: flex; 
                    justify-content: space-around; 
                    align-items: center; 
                    padding-bottom: 15px; 
                    z-index: 1000; 
                }
                .mobile-bottom-navbar button { 
                    background: none; 
                    border: none; 
                    color: #444; 
                    display: flex; 
                    flex-direction: column; 
                    align-items: center; 
                    gap: 6px; 
                }
                .mobile-bottom-navbar button span { 
                    font-size: 9px; 
                    font-weight: 700; 
                    letter-spacing: 0.5px; 
                }
                .mobile-bottom-navbar button.active { color: var(--neon-green); }

                /* --- BLOQUE DE RESPONSIVIDAD ÉLITE (REEMPLAZAR AQUÍ) --- */
                @media (max-width: 1024px) {
                    .desktop-only { display: none !important; }
                    .mobile-only { display: flex !important; }
                    .premium-sidebar { display: none !important; }
                    
                    .premium-viewport { width: 100vw !important; overflow-x: hidden !important; }
                    .premium-content-area { 
                        padding: 20px 15px 120px !important; 
                        width: 100% !important; 
                        margin: 0 !important;
                    }

                    /* Ajuste del Balance Gigante */
                    .main-vault-card { 
                        padding: 30px 20px !important; 
                        flex-direction: column !important; 
                        text-align: center !important;
                        border-radius: 24px !important;
                    }
                    .main-balance-text { 
                        font-size: clamp(2.2rem, 8vw, 2.8rem) !important; 
                        letter-spacing: -1px !important; 
                        word-break: break-all !important;
                    }
                    .main-balance-text small { font-size: 1.2rem !important; }
                    .vault-stats-row { justify-content: center !important; gap: 15px !important; }

                    /* Ajuste de Grids */
                    .secondary-grid, .markets-summary-grid, .profile-form-grid, .side-info-grid { 
                        grid-template-columns: 1fr !important; 
                        gap: 15px !important;
                    }
                    .actions-strip { 
                        grid-template-columns: 1fr 1fr !important; 
                        gap: 10px !important; 
                    }

                    /* Inputs y Botones */
                    .elite-input-field, .elite-mobile-input, .premium-otp-input { 
                        width: 100% !important; 
                        font-size: 16px !important; /* Evita zoom automático en iPhone */
                    }

                    /* Navegación Móvil */
                    .mobile-premium-header { 
                        height: 65px !important; 
                        background: #000 !important; 
                        border-bottom: 1px solid #111 !important; 
                        position: sticky !important; 
                        top: 0; 
                        z-index: 1000 !important;
                    }
                    .mobile-bottom-navbar { 
                        position: fixed !important; 
                        bottom: 0 !important; 
                        left: 0 !important; 
                        right: 0 !important; 
                        height: 85px !important; 
                        background: rgba(5,5,5,0.98) !important; 
                        backdrop-filter: blur(20px) !important; 
                        border-top: 1px solid #111 !important; 
                        display: flex !important; 
                        justify-content: space-around !important; 
                        align-items: center !important; 
                        padding-bottom: env(safe-area-inset-bottom, 15px) !important; 
                        z-index: 9999 !important;
                    }
                    .mobile-bottom-navbar button { 
                        color: #444 !important; 
                        font-size: 10px !important; 
                        font-weight: 800 !important;
                    }
                    .mobile-bottom-navbar button.active { color: var(--neon-green) !important; }
                }
                /* --- FIN DEL BLOQUE --- */
            `}</style>
        </div>
    );
}