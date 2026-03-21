"use client";
import React, { useState } from 'react';
import { 
  Users, ShieldCheck, CheckCircle, XCircle, Search, 
  Lock, ArrowLeft, Settings, Database, Activity
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BunkerView() {
  const router = useRouter();
  const [inversores, setInversores] = useState([
    { id: 1, user: "Inv_Elite_01", mail: "admin@ejemplo.com", status: "pending", kyc: "Verificado" },
    { id: 2, user: "Socio_Founder", mail: "socio@network.com", status: "active", kyc: "Pendiente" }
  ]);

  return (
    <div className="admin-master-container">
      {/* BARRA SUPERIOR DE MANDO */}
      <nav className="top-command-bar">
        <div className="brand-admin">
          <Lock size={18} color="#00C853" />
          <span>GURÚ ÉLITE <span className="tag-admin">CORE ADMIN</span></span>
        </div>
        <button onClick={() => router.push('/')} className="back-to-web">
          <ArrowLeft size={14} /> SALIR AL SITIO PÚBLICO
        </button>
      </nav>

      <main className="dashboard-layout">
        <aside className="sidebar-controls">
          <div className="menu-item active"><Users size={20} /> Usuarios</div>
          <div className="menu-item"><Database size={20} /> Auditoría</div>
          <div className="menu-item"><Settings size={20} /> Configuración</div>
        </aside>

        <section className="content-vault">
          <header className="content-header">
            <div>
              <h1>Panel de Control de Usuarios</h1>
              <p>Manejo de registros, validaciones y permisos de acceso.</p>
            </div>
            <div className="search-wrapper">
              <Search size={16} />
              <input type="text" placeholder="Filtrar por ID o correo..." />
            </div>
          </header>

          <div className="metrics-row">
            <div className="metric-box"><span>PENDIENTES</span><strong className="yellow">01</strong></div>
            <div className="metric-box"><span>VERIFICADOS</span><strong className="green">01</strong></div>
            <div className="metric-box"><span>TOTAL SOCIOS</span><strong>02</strong></div>
          </div>

          <div className="table-wrapper">
            <table className="management-table">
              <thead>
                <tr>
                  <th>IDENTIFICADOR</th>
                  <th>CORREO</th>
                  <th>KYC</th>
                  <th>ESTADO</th>
                  <th>ACCIÓN MAESTRA</th>
                </tr>
              </thead>
              <tbody>
                {inversores.map((inv) => (
                  <tr key={inv.id}>
                    <td className="bold-white">{inv.user}</td>
                    <td>{inv.mail}</td>
                    <td>{inv.kyc}</td>
                    <td>
                      <span className={`status-pill ${inv.status}`}>
                        {inv.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="btns-cell">
                      <button className="approve-btn"><CheckCircle size={16} /> APROBAR</button>
                      <button className="reject-btn"><XCircle size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <style jsx global>{`
        .admin-master-container { background: #000; min-height: 100vh; color: #fff; font-family: 'Inter', sans-serif; }
        .top-command-bar { display: flex; justify-content: space-between; padding: 20px 40px; border-bottom: 1px solid #111; background: #050505; }
        .brand-admin { display: flex; align-items: center; gap: 12px; font-weight: 900; letter-spacing: 1px; }
        .tag-admin { background: #00C853; color: #000; font-size: 10px; padding: 2px 6px; border-radius: 3px; margin-left: 5px; }
        .back-to-web { background: transparent; border: 1px solid #222; color: #666; padding: 8px 15px; border-radius: 5px; cursor: pointer; font-size: 11px; display: flex; align-items: center; gap: 8px; }
        
        .dashboard-layout { display: flex; height: calc(100vh - 73px); }
        .sidebar-controls { width: 260px; border-right: 1px solid #111; padding: 40px 20px; display: flex; flex-direction: column; gap: 10px; }
        .menu-item { display: flex; align-items: center; gap: 15px; padding: 15px; color: #444; font-weight: 800; font-size: 13px; border-radius: 8px; cursor: pointer; }
        .menu-item.active { background: #0a0a0a; color: #00C853; border-left: 3px solid #00C853; }

        .content-vault { flex: 1; padding: 50px 60px; overflow-y: auto; }
        .content-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px; }
        .content-header h1 { font-size: 24px; font-weight: 900; margin-bottom: 8px; }
        .content-header p { color: #555; font-size: 14px; }
        
        .search-wrapper { background: #0a0a0a; border: 1px solid #111; padding: 10px 20px; border-radius: 6px; display: flex; align-items: center; gap: 15px; width: 300px; }
        .search-wrapper input { background: transparent; border: none; outline: none; color: #fff; font-size: 13px; width: 100%; }

        .metrics-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 40px; }
        .metric-box { background: #080808; border: 1px solid #111; padding: 25px; border-radius: 12px; }
        .metric-box span { color: #444; font-size: 10px; font-weight: 900; letter-spacing: 2px; display: block; margin-bottom: 10px; }
        .metric-box strong { font-size: 28px; font-weight: 900; }
        .green { color: #00C853; text-shadow: 0 0 10px rgba(0, 200, 83, 0.2); }
        .yellow { color: #FFD600; text-shadow: 0 0 10px rgba(255, 214, 0, 0.2); }

        .table-wrapper { background: #080808; border: 1px solid #111; border-radius: 15px; overflow: hidden; }
        .management-table { width: 100%; border-collapse: collapse; }
        .management-table th { background: #0c0c0c; padding: 20px; text-align: left; font-size: 10px; color: #444; text-transform: uppercase; letter-spacing: 1px; }
        .management-table td { padding: 20px; border-bottom: 1px solid #111; font-size: 13px; color: #888; }
        .bold-white { color: #fff; font-weight: 700; }

        .status-pill { padding: 4px 10px; border-radius: 4px; font-size: 9px; font-weight: 900; }
        .status-pill.pending { background: rgba(255, 214, 0, 0.1); color: #FFD600; }
        .status-pill.active { background: rgba(0, 200, 83, 0.1); color: #00C853; }

        .btns-cell { display: flex; gap: 10px; }
        .approve-btn { background: #00C853; color: #000; border: none; padding: 8px 15px; border-radius: 4px; font-weight: 900; font-size: 10px; cursor: pointer; display: flex; align-items: center; gap: 6px; }
        .reject-btn { background: #1a1a1a; border: none; color: #666; padding: 8px 12px; border-radius: 4px; cursor: pointer; }
      `}</style>
    </div>
  );
}