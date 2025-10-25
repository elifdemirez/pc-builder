import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { Catalog, Selection, Anakart, CPU, RAM, GPU, PSU, Kasa, Depolama, Cooler } from '../types'
import { cpuOnMobo, ramOnMobo, gpuOnMobo, moboInCase, gpuInCase, psuEnough, storageOnMobo, coolerOK } from '../utils/compat'


const LS_KEY = 'pcbuilder.selection.v1'


type Ctx = {
catalog?: Catalog
selection: Selection
setSel: <K extends keyof Selection>(key:K, val: Selection[K]) => void
clear: () => void
total: number
filters: { marka?: string; min?: number; max?: number; q?: string }
setFilters: (f:Partial<Ctx['filters']>) => void
steps: { key: keyof Selection; title: string }[]
compatible: {
cpus:(m?:Anakart)=>CPU[]
rams:(m?:Anakart)=>RAM[]
gpus:(m?:Anakart)=>GPU[]
psus:(cpu?:CPU, gpu?:GPU)=>PSU[]
kasalar:(m?:Anakart, g?:GPU)=>Kasa[]
depolamalar:(m?:Anakart)=>Depolama[]
coolerlar:(cpu?:CPU, k?:Kasa)=>Cooler[]
}
}


const Store = createContext<Ctx | null>(null)
export const useStore = () => useContext(Store) as Ctx


export function StoreProvider({ children, catalog }:{ children:React.ReactNode, catalog?:Catalog }){
const [selection, setSelection] = useState<Selection>(() => {
const raw = localStorage.getItem(LS_KEY)
return raw ? JSON.parse(raw) : {}
})
const [filters, setFiltersState] = useState<Ctx['filters']>({})
const setFilters = (f:Partial<Ctx['filters']>) => setFiltersState((p)=> ({...p, ...f}))


useEffect(()=>{ localStorage.setItem(LS_KEY, JSON.stringify(selection)) }, [selection])
const setSel = <K extends keyof Selection>(key:K, val: Selection[K]) => setSelection((p)=> ({...p, [key]: val}))
const clear = () => setSelection({})


const total = useMemo(()=> Object.values(selection).reduce((s, it:any)=> s + (it?.fiyat_try ?? 0), 0), [selection])


const steps: { key: keyof Selection; title: string }[] = [
{ key:'anakart', title:'Anakart' },
{ key:'islemci', title:'İşlemci' },
{ key:'ram', title:'RAM' },
{ key:'ekran_karti', title:'Ekran Kartı' },
{ key:'psu', title:'PSU' },
{ key:'kasa', title:'Kasa' },
{ key:'depolama', title:'Depolama' },
{ key:'monitor', title:'Monitör' },
{ key:'klavye', title:'Klavye' },
{ key:'fare', title:'Fare' },
{ key:'islemci_sogutucu', title:'CPU Soğutucu' },
]


const compatible: Ctx['compatible'] = {
cpus: (m) => (catalog?.islemci ?? []).filter((c)=> !m || cpuOnMobo(m, c)),
rams: (m) => (catalog?.ram ?? []).filter((r)=> !m || ramOnMobo(m, r)),
gpus: (m) => (catalog?.ekran_karti ?? []).filter((g)=> !m || gpuOnMobo(m, g)),
psus: (cpu, gpu) => (catalog?.psu ?? []).filter((p)=> cpu && gpu ? psuEnough(p, cpu, gpu) : true),
kasalar: (m, g) => (catalog?.kasa ?? []).filter((k)=> {
const a = m ? moboInCase(k, m) : true
const b = g ? gpuInCase(k, g) : true
return a && b
}),
depolamalar: (m) => (catalog?.depolama ?? []).filter((d)=> !m || storageOnMobo(m, d)),
coolerlar: (cpu, k) => (catalog?.islemci_sogutucu ?? []).filter((co)=> cpu ? coolerOK(co as any, cpu, k) : true),
}


const value:Ctx = { catalog, selection, setSel, clear, total, filters, setFilters, steps, compatible }
return <Store.Provider value={value}>{children}</Store.Provider>
}