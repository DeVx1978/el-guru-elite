"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Globe, ArrowLeft, Zap, Trophy, Activity, Target, X, Star, ShieldCheck, Search, Flame } from 'lucide-react';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

const iconMap: { [key: string]: React.ReactNode } = {
  globe: <Globe size={24} />,
  trophy: <Trophy size={24} />,
  target: <Target size={24} />,
  zap: <Zap size={24} />,
  activity: <Activity size={24} />,
  search: <Search size={24} />,
  flame: <Flame size={24} />,
  star: <Star size={24} />
};

export default function RadarGlobal() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any>(null);
  const [eventos, setEventos] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('radar_eventos').select('*').order('orden', { ascending: true });
      if (data) setEventos(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="loader">SINCRONIZANDO SENSORES...<style jsx>{`.loader{background:#000;height:100vh;display:flex;alignItems:center;justifyContent:center;color:#00C853;font-family:'Plus Jakarta Sans',sans-serif;font-weight:900;letter-spacing:4px;font-size:12px;}`}</style></div>
  );

  return (
    <div className="radar-page">
      {/* DRAWER LATERAL - Scroll Fix */}
      <div className={`drawer ${selected ? 'open' : ''}`}>
        <button className="close" onClick={() => setSelected(null)}><X size={32}/></button>
        {selected && (
          <div className="d-content">
            <header>
              {selected.es_vip && <span className="vip-tag"><Star size={10}/> EVENTO VIP</span>}
              <h2 style={{ color: selected.color_hex }}>{selected.nombre}</h2>
              <div className="d-line" style={{ background: selected.color_hex }}></div>
            </header>
            <div className="scrollable-content">
              <p className="d-desc">{selected.estrategia_detallada || selected.descripcion}</p>
              <div className="d-stats">
                <div className="st"><span>OPTIMIZACIÓN IA</span><h4 style={{color:selected.color_hex}}>{selected.optimizacion_ia}</h4></div>
                <div className="st"><span>NIVEL RIESGO</span><h4 style={{color:selected.color_hex}}>{selected.riesgo_ia}</h4></div>
              </div>
              <footer className="security-box">
                <ShieldCheck size={18} color={selected.color_hex}/>
                <span>SISTEMA DE ENCRIPTACIÓN DEVX ACTIVO</span>
              </footer>
            </div>
          </div>
        )}
      </div>

      <nav className="r-nav">
        <button onClick={() => router.push('/panel')} className="back-btn"><ArrowLeft size={16}/> VOLVER AL PANEL</button>
        <div className="logo">RADAR<span>GLOBAL</span></div>
      </nav>

      <main className="r-container">
        {eventos.length > 0 && (
          <>
            <div className="hero" style={{ '--c': eventos[0].color_hex } as any} onClick={() => setSelected(eventos[0])}>
              <div className="hero-glow"></div>
              <Globe size={64} color={eventos[0].color_hex} className="spin-icon"/>
              <h1>{eventos[0].nombre}</h1>
              <span className="hero-tag">{eventos[0].tag}</span>
            </div>

            <div className="grid">
              {eventos.slice(1).map((e: any) => (
                <div key={e.id} className="card" style={{ '--c': e.color_hex } as any} onClick={() => setSelected(e)}>
                  <div className="card-icon">{iconMap[e.icono_lucide] || <Target size={26}/>}</div>
                  <h3>{e.nombre}</h3>
                  <p>{e.tag}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700;800&display=swap');
        
        .radar-page { 
          background: #000; 
          min-height: 100vh; 
          color: #fff; 
          font-family: 'Plus Jakarta Sans', sans-serif; 
          overflow-x: hidden;
        }
        
        .r-nav { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          padding: 30px 6%; 
          border-bottom: 1px solid #111; 
          position: sticky;
          top: 0;
          z-index: 900;
          background: #000;
        }
        
        .back-btn { 
          background: none; 
          border: 1px solid #222; 
          color: #888; 
          padding: 10px 20px; 
          border-radius: 12px; 
          cursor: pointer; 
          font-weight: 700; 
          font-size: 11px; 
          transition: 0.3s; 
        }
        
        .back-btn:hover { 
          border-color: #00C853; 
          color: #fff; 
        }
        
        .logo { 
          font-weight: 800; 
          font-size: 1.4rem; 
          letter-spacing: -1px; 
        } 
        
        .logo span { 
          color: #00C853; 
        }

        .r-container { 
          padding: 50px 6%; 
          max-width: 1300px; 
          margin: 0 auto; 
        }

        /* HERO - MUNDIAL */
        .hero { 
          background: #050505; 
          border: 1px solid var(--c); 
          border-radius: 40px; 
          padding: 100px 40px; 
          text-align: center;
          cursor: pointer; 
          position: relative; 
          overflow: hidden; 
          transition: 0.5s cubic-bezier(0.2, 0.8, 0.2, 1); 
          margin-bottom: 40px;
          box-shadow: 0 0 30px -10px var(--c);
        }
        
        .hero:hover { 
          transform: scale(1.01); 
          box-shadow: 0 0 60px -10px var(--c); 
        }
        
        .hero h1 { 
          font-size: 4.5rem; 
          font-weight: 800; 
          letter-spacing: -4px; 
          margin: 20px 0 10px; 
        }
        
        .hero-tag { 
          color: var(--c); 
          font-weight: 800; 
          font-size: 13px; 
          letter-spacing: 4px; 
          text-transform: uppercase; 
        }
        
        .hero-glow { 
          position: absolute; 
          inset: 0; 
          background: radial-gradient(circle at center, var(--c) 0%, transparent 70%); 
          opacity: 0.15; 
        }
        
        .spin-icon { 
          animation: spin 20s linear infinite; 
          filter: drop-shadow(0 0 10px var(--c)); 
        }

        /* GRID */
        .grid { 
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); 
          gap: 30px; 
        }
        
        .card { 
          background: #080808; 
          border: 1px solid var(--c); 
          border-radius: 35px; 
          padding: 60px 30px; 
          text-align: center;
          cursor: pointer; 
          transition: 0.4s cubic-bezier(0.2, 0.8, 0.2, 1); 
          box-shadow: 0 0 15px -5px var(--c);
        }
        
        .card:hover { 
          transform: translateY(-15px); 
          box-shadow: 0 25px 50px -15px var(--c); 
          background: #0b0b0b; 
        }
        
        .card-icon { 
          color: var(--c); 
          margin-bottom: 25px; 
          transition: 0.5s; 
          filter: drop-shadow(0 0 5px var(--c)); 
        }
        
        .card:hover .card-icon { 
          transform: rotateY(360deg) scale(1.2); 
          filter: drop-shadow(0 0 15px var(--c)); 
        }
        
        .card h3 { 
          font-size: 1.6rem; 
          font-weight: 800; 
          letter-spacing: -1px; 
          margin: 0; 
        }
        
        .card p { 
          color: var(--c); 
          font-weight: 800; 
          font-size: 10px; 
          letter-spacing: 2px; 
          text-transform: uppercase; 
          margin-top: 15px; 
          opacity: 0.8; 
        }

        /* DRAWER - SCROLL FIX GLOBAL */
        .drawer { 
          position: fixed; 
          top: 0; 
          right: -550px; 
          width: 550px; 
          height: 100vh; 
          background: #050505; 
          border-left: 1px solid #111; 
          z-index: 1000; 
          transition: 0.6s cubic-bezier(0.2, 0.8, 0.2, 1); 
          padding: 80px 50px; 
          box-sizing: border-box; 
          overflow: hidden;
        }
        
        .drawer.open { 
          right: 0; 
          box-shadow: -40px 0 100px rgba(0,0,0,0.9); 
        }
        
        .close { 
          position: absolute; 
          top: 40px; 
          right: 40px; 
          background: none; 
          border: none; 
          color: #444; 
          cursor: pointer; 
          transition: 0.3s; 
          z-index: 10;
        }
        
        .close:hover { 
          color: #fff; 
          transform: rotate(90deg); 
        }
        
        .d-content {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        
        .scrollable-content {
          flex: 1;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          padding-right: 10px;
          max-height: calc(100vh - 160px);
          scrollbar-width: thin;
          scrollbar-color: #00C853 #111;
        }
        
        .scrollable-content::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollable-content::-webkit-scrollbar-thumb {
          background: #00C853;
          border-radius: 10px;
        }
        
        .d-content h2 { 
          font-size: 3rem; 
          font-weight: 800; 
          letter-spacing: -3px; 
          margin: 0; 
          text-transform: uppercase; 
        }
        
        .d-line { 
          width: 50px; 
          height: 4px; 
          border-radius: 2px; 
          margin-top: 20px; 
        }
        
        .d-desc { 
          color: #888; 
          font-size: 1.15rem; 
          line-height: 1.85; 
          margin-top: 40px; 
          white-space: pre-line; 
          padding-bottom: 80px; /* Espacio final para scroll cómodo en móvil */
        }
        
        .d-stats { 
          display: grid; 
          grid-template-columns: 1fr 1fr; 
          gap: 20px; 
          margin-top: 50px; 
        }
        
        .st { 
          background: #0b0b0b; 
          padding: 30px; 
          border-radius: 24px; 
          border: 1px solid #151515; 
        }
        
        .st span { 
          font-size: 10px; 
          font-weight: 800; 
          color: #444; 
          letter-spacing: 1px; 
          display: block; 
          margin-bottom: 10px; 
        }
        
        .st h4 { 
          font-size: 2rem; 
          font-weight: 800; 
          margin: 0; 
        }
        
        .security-box { 
          margin-top: 60px; 
          display: flex; 
          align-items: center; 
          gap: 12px; 
          color: #333; 
          font-size: 10px; 
          font-weight: 800; 
          letter-spacing: 1px; 
          padding-bottom: 40px;
        }

        @keyframes spin { 
          from { transform: rotate(0deg); } 
          to { transform: rotate(360deg); } 
        }
        
        @media (max-width: 900px) { 
          .grid { 
            grid-template-columns: 1fr; 
          } 
          .drawer { 
            width: 100%; 
            right: -100%;
          }
          .drawer.open { 
            right: 0; 
          }
          .hero h1 { 
            font-size: 2.5rem; 
          }
          .scrollable-content {
            max-height: calc(100vh - 140px);
          }
        }
      `}</style>
    </div>
  );
}