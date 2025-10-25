import type { Catalog } from '../types'


const files = [
'anakart', 'islemci', 'ram', 'ekran_karti', 'psu', 'kasa', 'depolama', 'monitor', 'klavye', 'fare', 'islemci_sogutucu'
] as const


export async function loadCatalog(): Promise<Catalog> {
const base = '/data'
const entries = await Promise.all(files.map(async (name) => {
const res = await fetch(`${base}/${name}.json`)
if (!res.ok) throw new Error(`${name}.json yüklenemedi`)
const data = await res.json()
return [name, data]
}))
return Object.fromEntries(entries) as Catalog
}