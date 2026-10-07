'use client'
import { useState } from 'react'

const WHATSAPP = '573148307855'

const productosIniciales = [
  {t:"MotoRacing La 33", b:"La 33 - Laureles", p:"Kit Arrastre NS200 Original", price:"$185.000", old:"$220.000", dist:"0.8km", r:"4.9", img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300"},
  {t:"Repuestos El Paisa", b:"La Bayadera", p:"Pastas Freno NMAX DEL/TRAS", price:"$45.000", old:"$60.000", dist:"1.2km", r:"4.8", img:"https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=300"},
  {t:"Mundo Motos Prado", b:"Prado Centro", p:"Llanta 110/80-17 Michelin", price:"$210.000", old:"$250.000", dist:"0.5km", r:"5.0", img:"https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=300"},
  {t:"La 33 Racing", b:"La 33", p:"Aceite Motul 5100 15W50", price:"$38.000", old:"$45.000", dist:"0.9km", r:"4.7", img:"https://images.unsplash.com/photo-1603386329225-868f9b53a05f?w=300"},
  {t:"Bayadera Motos", b:"La Bayadera", p:"Filtro Aire NS200/Pulsar", price:"$25.000", old:"$32.000", dist:"1.1km", r:"4.9", img:"https://images.unsplash.com/photo-1580341289256-0d8c9d6aa9b6?w=300"},
  {t:"MotoRacing La 33", b:"La 33", p:"Guaya Clutch NS200", price:"$18.000", old:"$25.000", dist:"0.8km", r:"4.9", img:"https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=300"},
]

export default function Page(){
  const [busq, setBusq] = useState('')
  const [carrito, setCarrito] = useState<any[]>([])
  
  const filtrados = productosIniciales.filter(p=> 
    p.p.toLowerCase().includes(busq.toLowerCase()) || 
    p.t.toLowerCase().includes(busq.toLowerCase()) ||
    p.b.toLowerCase().includes(busq.toLowerCase())
  )

  const total = carrito.reduce((s, x) => s + parseInt(x.price.replace(/[^0-9]/g,'')), 0)

  const pedirWA = (prod:any) => {
    const msg = `Hola! Vi en MOTO-PARLA: ${prod.p} por ${prod.price} en ${prod.t} (${prod.b}) - ${prod.dist}. Me interesa!`
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const pedirTodo = () => {
    const lista = carrito.map(c=> `${c.p} ${c.price}`).join('%0A')
    const msg = `Hola MOTO-PARLA! Quiero pedir:%0A${lista}%0ATotal: $${total.toLocaleString()}`
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank')
  }

  return (
    <div style={{background:'#0a192f', minHeight:'100vh', color:'white', fontFamily:'system-ui'}}>
      <header style={{padding:'16px', borderBottom:'1px solid #1e3a5f', position:'sticky', top:0, background:'#0a192f', zIndex:10}}>
        <div style={{maxWidth:'1200px', margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'12px'}}>
          <h1 style={{fontSize:'22px', fontWeight:900}}>🏍️ MOTO-PARLA <span style={{color:'#00a8ff', fontSize:'12px'}}>MEDELLIN</span></h1>
          <div style={{display:'flex', gap:'8px'}}>
            <button onClick={()=>document.getElementById('planes')?.scrollIntoView({behavior:'smooth'})} style={{background:'#facc15', color:'#000', padding:'8px 14px', borderRadius:'20px', fontWeight:800, border:0, fontSize:'12px'}}>Soy taller</button>
            <button onClick={()=>pedirWA({p:'Suscripcion', t:'MOTO-PARLA'})} style={{background:'#00ff88', color:'#000', padding:'8px 14px', borderRadius:'20px', fontWeight:800, border:0, fontSize:'12px'}}>💳 Wompi+Nequi</button>
          </div>
        </div>
        <div style={{maxWidth:'1200px', margin:'12px auto 0'}}>
          <input value={busq} onChange={e=>setBusq(e.target.value)} placeholder="🔍 Busca NMAX, NS200, Kit Arrastre, La 33, Bayadera..." style={{width:'100%', padding:'14px', borderRadius:'12px', border:'1px solid #1e3a5f', background:'#112240', color:'white'}} />
        </div>
      </header>

      <main style={{maxWidth:'1200px', margin:'0 auto', padding:'16px'}}>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'14px'}}>
          {filtrados.map((p,i)=>(
            <div key={i} style={{background:'#112240', border:'1px solid #1e3a5f', borderRadius:'16px', overflow:'hidden'}}>
              <img src={p.img} style={{width:'100%', height:'160px', objectFit:'cover'}} />
              <div style={{padding:'12px'}}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'11px', color:'#8892b0'}}><span>{p.t}</span><span>⭐{p.r} • {p.dist}</span></div>
                <div style={{fontSize:'11px', color:'#5ee3ff', margin:'4px 0'}}>{p.b}</div>
                <div style={{fontWeight:800, margin:'6px 0'}}>{p.p}</div>
                <div style={{display:'flex', gap:'8px', alignItems:'center'}}><b style={{color:'#00ff88'}}>{p.price}</b><small style={{textDecoration:'line-through', color:'#8892b0'}}>{p.old}</small></div>
                <button onClick={()=>{setCarrito([...carrito, p]); pedirWA(p)}} style={{width:'100%', marginTop:'10px', padding:'12px', background:'#00a8ff', border:0, borderRadius:'10px', color:'white', fontWeight:800}}>📱 Pedir por WhatsApp</button>
              </div>
            </div>
          ))}
        </div>

        {carrito.length>0 && (
          <div style={{position:'fixed', bottom:'16px', left:'16px', right:'16px', background:'#112240', border:'2px solid #00ff88', borderRadius:'16px', padding:'14px', maxWidth:'500px', margin:'0 auto'}}>
            <div style={{display:'flex', justifyContent:'space-between'}}><b>🛒 {carrito.length} productos</b><b>${total.toLocaleString()}</b></div>
            <button onClick={pedirTodo} style={{width:'100%', marginTop:'8px', padding:'12px', background:'#25D366', border:0, borderRadius:'10px', color:'white', fontWeight:900}}>Pedir TODO por WhatsApp al 314</button>
          </div>
        )}

        <section id="planes" style={{marginTop:'60px', background:'#112240', borderRadius:'20px', padding:'24px', border:'1px solid #1e3a5f'}}>
          <h2 style={{textAlign:'center', fontSize:'24px', fontWeight:900}}>¿Eres taller? Aparece aquí</h2>
          <p style={{textAlign:'center', color:'#8892b0', fontSize:'13px', margin:'8px 0 20px'}}>Paga y tu tienda aparece en MOTO-PARLA en 2 minutos</p>
          
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'16px'}}>
            <div style={{border:'1px solid #233554', borderRadius:'16px', padding:'18px', background:'#0a192f'}}>
              <h3>PLAN BARRIO</h3><div style={{fontSize:'28px', fontWeight:900, color:'#00a8ff'}}>$50.000<span style={{fontSize:'12px'}}>/mes</span></div>
              <ul style={{fontSize:'13px', margin:'12px 0', lineHeight:'1.8'}}><li>Posición 11-30</li><li>3 productos</li><li>Barrio específico</li></ul>
              <button onClick={()=>window.open(`https://wa.me/${WHATSAPP}?text=Quiero PLAN BARRIO $50k`,'_blank')} style={{width:'100%', padding:'12px', background:'#233554', border:0, borderRadius:'10px', color:'white', fontWeight:800}}>Elegir Barrio $50k →</button>
            </div>
            <div style={{border:'2px solid #00a8ff', borderRadius:'16px', padding:'18px', background:'#0a192f', transform:'scale(1.02)'}}>
              <div style={{background:'#00a8ff', color:'white', fontSize:'10px', padding:'4px 8px', borderRadius:'10px', display:'inline-block'}}>MÁS POPULAR</div>
              <h3>PLAN CIUDAD</h3><div style={{fontSize:'28px', fontWeight:900, color:'#00a8ff'}}>$99.000<span style={{fontSize:'12px'}}>/mes</span></div>
              <ul style={{fontSize:'13px', margin:'12px 0', lineHeight:'1.8'}}><li>Posición 1-10 ROTATIVO</li><li>10 productos</li><li>Toda Medellín</li><li>5.0 ⭐ prioridad</li></ul>
              <button onClick={()=>window.open(`https://wa.me/${WHATSAPP}?text=Quiero PLAN CIUDAD $99k`,'_blank')} style={{width:'100%', padding:'12px', background:'#00a8ff', border:0, borderRadius:'10px', color:'white', fontWeight:800}}>Elegir Ciudad $99k →</button>
            </div>
            <div style={{border:'2px solid #facc15', borderRadius:'16px', padding:'18px', background:'#0a192f'}}>
              <div style={{background:'#facc15', color:'black', fontSize:'10px', padding:'4px 8px', borderRadius:'10px', display:'inline-block'}}>SOLO 1 POR BARRIO</div>
              <h3>PLAN TOP 1</h3><div style={{fontSize:'28px', fontWeight:900, color:'#facc15'}}>$199.000<span style={{fontSize:'12px'}}>/mes</span></div>
              <ul style={{fontSize:'13px', margin:'12px 0', lineHeight:'1.8'}}><li>SIEMPRE primero 🏆</li><li>20 productos</li><li>Exclusivo por barrio</li><li>Bloquea competencia</li></ul>
              <button onClick={()=>window.open(`https://wa.me/${WHATSAPP}?text=Quiero PLAN TOP1 $199k en mi barrio`,'_blank')} style={{width:'100%', padding:'12px', background:'#facc15', border:0, borderRadius:'10px', color:'black', fontWeight:800}}>Ser TOP 1 $199k →</button>
            </div>
          </div>

          <div style={{marginTop:'20px', background:'#0a192f', padding:'14px', borderRadius:'12px', fontSize:'12px', color:'#8892b0'}}>
            <b>¿Cómo ordenamos? Si todos pagan $99k:</b><br/>1. Cercanía: Si estás en La 33, primero los de La 33 (0.8km)<br/>2. Rating: 5.0 ⭐ antes que 4.7 ⭐<br/>3. Rotativo cada hora, justo para todos.
          </div>
        </section>

        <div style={{textAlign:'center', margin:'40px 0', color:'#5a719a', fontSize:'11px'}}>MOTO-PARLA • Merkaplace Motos Medellín • WhatsApp 3148307855 • VictorCoy.AI • $1.987.000 MRR meta (10x$50k + 10x$99k + 3x$199k)</div>
      </main>
    </div>
  )
}
