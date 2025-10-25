import { useStore } from '../state/store'


export default function Toolbar(){
const { filters, setFilters, clear } = useStore()
return (
<div className="toolbar">
<input className="input" placeholder="Ara" value={filters.q ?? ''} onChange={e=> setFilters({ q:e.target.value })} />
<input className="input" placeholder="Marka" value={filters.marka ?? ''} onChange={e=> setFilters({ marka:e.target.value })} />
<input className="input" type="number" placeholder="Min ₺" value={filters.min ?? ''} onChange={e=> setFilters({ min: e.target.value ? Number(e.target.value): undefined })} />
<input className="input" type="number" placeholder="Max ₺" value={filters.max ?? ''} onChange={e=> setFilters({ max: e.target.value ? Number(e.target.value): undefined })} />
<button className="btn ghost" onClick={clear}>Temizle</button>
</div>
)
}