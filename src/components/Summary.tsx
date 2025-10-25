import { useStore } from '../state/store'
import { tryFmt } from '../utils/format'


export default function Summary(){
const { selection, total } = useStore()

return (
<div className="card summary">
<h3 style={{marginTop:0}}>Özet</h3>
{Object.entries(selection).map(([k,v])=> v ? (
<div className="row" key={k}><span>{label(k)}</span><strong>{(v as any).ad}</strong><span>{tryFmt((v as any).fiyat_try)}</span></div>
) : null)}
<hr style={{borderColor:'#dee2e6', margin:'10px 0'}}/>
<div className="row total"><span>Toplam</span><span>{tryFmt(total)}</span></div>
</div>
)
}


function label(k:string){
switch(k){
case 'anakart': return 'Anakart'
case 'islemci': return 'CPU'
case 'ram': return 'RAM'
case 'ekran_karti': return 'GPU'
case 'psu': return 'PSU'
case 'kasa': return 'Kasa'
case 'depolama': return 'Depolama'
case 'monitor': return 'Monitör'
case 'klavye': return 'Klavye'
case 'fare': return 'Fare'
case 'islemci_sogutucu': return 'CPU Soğutucu'
default: return k
}
}