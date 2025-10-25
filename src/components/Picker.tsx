import React, { useMemo } from 'react'
import ProductCard from './ProductCard'
import { useStore } from '../state/store'


export type RenderItem<T> = (it:T)=>{ title:string; subtitle?:string; price:number; tags?:string[] }


export default function Picker<T>({ title, items, render, onPick }:{ title:string; items:T[]; render:RenderItem<T>; onPick:(it:T)=>void }){
const { filters } = useStore()
const list = useMemo(()=>{
return items.filter((raw:any)=>{
const r = render(raw)
const okBrand = filters.marka ? r.title.toLowerCase().includes(filters.marka.toLowerCase()) : true
const okPrice = (filters.min ? r.price >= filters.min : true) && (filters.max ? r.price <= filters.max : true)
const okQ = filters.q ? (r.title + ' ' + (r.subtitle ?? '') + ' ' + (r.tags?.join(' ') ?? '')).toLowerCase().includes(filters.q.toLowerCase()) : true
return okBrand && okPrice && okQ
})
}, [items, filters])


return (
<div className="card">
<div className="header" style={{justifyContent:'space-between'}}>
<h3 style={{margin:0}}>{title}</h3>
<span className="badge">{list.length} sonuç</span>
</div>
<div className="list">
{list.map((it:any, idx)=>{
const r = render(it)
const disabled = (it?.stok?.durum === 'out_of_stock')
return (
<ProductCard key={idx} title={r.title} subtitle={r.subtitle} price={r.price} tags={r.tags} disabled={disabled} onPick={()=> onPick(it)} />
)
})}
</div>
</div>
)
}