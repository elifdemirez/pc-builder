import { tryFmt } from '../utils/format'


export default function ProductCard({ title, subtitle, price, tags, disabled, onPick }:{ title:string; subtitle?:string; price:number; tags?:string[]; disabled?:boolean; onPick:()=>void }){
return (
<div className={`item ${disabled ? 'disabled':''}`}>
<header>
<h4>{title}</h4>
<div className="price">{tryFmt(price)}</div>
</header>
{subtitle && <div className="muted">{subtitle}</div>}
{tags && <div className="kv">{tags.map((t,i)=> <span className="tag" key={i}>{t}</span>)}</div>}
<div className="selectRow">
<button className="btn" onClick={onPick} disabled={disabled}>Seç</button>
</div>
</div>
)
}