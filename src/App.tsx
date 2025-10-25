import { useEffect, useMemo, useState } from 'react'
import { StoreProvider, useStore } from './state/store'
import { loadCatalog } from './data/loader'
import Toolbar from './components/Toolbar'
import Picker from './components/Picker'
import Summary from './components/Summary'
import type { Catalog } from './types'


export default function App(){
const [catalog, setCatalog] = useState<Catalog>()
const [err, setErr] = useState<string>()


useEffect(()=>{ (async()=>{ try{ setCatalog(await loadCatalog()) } catch(e:any){ setErr(e.message) } })() }, [])


if (err) return <div className="container"><div className="card">Veri yüklenemedi: {err}</div></div>
if (!catalog) return <div className="container"><div className="card">Veriler yükleniyor…</div></div>


return (
<StoreProvider catalog={catalog}>
<Shell />
</StoreProvider>
)
}


function Shell(){
const { steps, selection, setSel, catalog, compatible } = useStore()
const [active, setActive] = useState(0)
const activeKey = steps[active].key


const { items, title, render } = useMemo(()=>{
switch(activeKey){
case 'anakart': return { title:'Anakart Seç', items: catalog!.anakart, render: (it:any)=> ({ title: `${it.marka} ${it.model}`, subtitle:`${it.form_factor} • ${it.cpu_uyumluluk.vendor}/${it.soket ?? it.cpu_uyumluluk.socket} • ${it.bellek.tip}`, price: it.fiyat_try, tags:[`PCIe Gen${it.genisleme.pcie_gen}`, `${it.depolama.m2}×M.2`, `${it.bellek.yuva_sayisi} DIMM`] }) }
case 'islemci': return { title:'CPU Seç', items: compatible.cpus(selection.anakart), render: (it:any)=> ({ title:`${it.marka} ${it.model}`, subtitle:`${it.vendor} • ${it.soket} • ${it.cekirdek_sayi}/${it.izlek_sayi} • ${it.temel_hiz_ghz}-${it.turbo_hiz_ghz}GHz`, price:it.fiyat_try, tags:[`${it.tdp_w}W`, it.bellek_destek?.tip] }) }
case 'ram': return { title:'RAM Seç', items: compatible.rams(selection.anakart), render: (it:any)=> ({ title:`${it.marka} ${it.model}`, subtitle:`${it.tip} • ${it.kapasite_kit_gb}GB • ${it.hiz_mhz}MHz`, price:it.fiyat_try, tags:it.profil }) }
case 'ekran_karti': return { title:'GPU Seç', items: compatible.gpus(selection.anakart), render: (it:any)=> ({ title:`${it.marka} ${it.model}`, subtitle:`${it.pcie_arayuz?.surum ?? ''} • ${it.vram?.boyut_gb}GB`, price:it.fiyat_try, tags:[`${it.guc?.tgp_w}W TGP`, `${it.boyut?.uzunluk_mm}mm`] }) }
case 'psu': return { title:'PSU Seç', items: compatible.psus(selection.islemci, selection.ekran_karti), render: (it:any)=> ({ title:`${it.marka} ${it.model}`, subtitle:`${it.guc_w}W • ${it.efficiency ?? ''} • ${it.form_factor}`, price:it.fiyat_try, tags:[it.moduler ?? ''] }) }
case 'kasa': return { title:'Kasa Seç', items: compatible.kasalar(selection.anakart, selection.ekran_karti), render: (it:any)=> ({ title:`${it.marka} ${it.model}`, subtitle:`Destek: ${it.mobo_destek.join(', ')} • GPU ≤ ${it.gpu_uzunluk_max_mm}mm`, price:it.fiyat_try }) }
case 'depolama': return { title:'Depolama Seç', items: compatible.depolamalar(selection.anakart), render: (it:any)=> ({ title:`${it.marka} ${it.model}`, subtitle:`${it.form_factor} • ${it.arayuz.tip} • ${it.kapasite_gb}GB`, price:it.fiyat_try }) }
case 'monitor': return { title:'Monitör Seç', items: catalog!.monitor, render: (it:any)=> ({ title:`${it.marka} ${it.model}`, subtitle:`${it.cozunurluk?.ad} • ${it.yenileme_hizi_hz}Hz • ${it.panel}`, price:it.fiyat_try }) }
case 'klavye': return { title:'Klavye Seç', items: catalog!.klavye, render: (it:any)=> ({ title:`${it.marka} ${it.model}`, subtitle:`${it.boyut} • ${it.dizilim}`, price:it.fiyat_try }) }
case 'fare': return { title:'Fare Seç', items: catalog!.fare, render: (it:any)=> ({ title:`${it.marka} ${it.model}`, subtitle:`${it.sensor ?? ''} • ${it.agirlik_g ?? ''}g`, price:it.fiyat_try }) }
case 'islemci_sogutucu': return { title:'CPU Soğutucu Seç', items: catalog!.islemci_sogutucu, render: (it:any)=> ({ title:`${it.marka} ${it.model}`, subtitle:`${it.tip} • ${it.max_tdp_w}W • ${it.yukseklik_mm ?? ''}mm`, price:it.fiyat_try }) }
default: return { title:'Seç', items: [], render: ()=> ({ title:'', price:0 }) }
}
}, [activeKey, catalog, selection])


return (
<div className="container">
<div className="header">
<h1 style={{margin:0}}>PC Builder</h1>
<div style={{marginLeft:'auto', display:'flex', gap:8}}>
</div>
</div>


<div className="grid">
<div className="left">
<div className="card" style={{marginBottom:12}}>
<Toolbar />
<div className="stepper">
{steps.map((s, i)=> (
<div className={`step ${i===active ? 'active':''}`} key={s.key} onClick={()=> setActive(i)} style={{cursor:'pointer'}}>
<strong style={{width:24, textAlign:'center'}}>{i+1}</strong>
<span>{s.title}</span>
<div style={{marginLeft:'auto', opacity:0.8}}>{(selection as any)[s.key]?.ad ? (selection as any)[s.key].ad : '—'}</div>
</div>
))}
</div>
</div>


<Picker title={title} items={items as any[]} render={render as any} onPick={(it:any)=> setSel(activeKey as any, it)} />
</div>
<Summary />
</div>
</div>
)
}