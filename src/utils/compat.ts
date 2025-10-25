import type { Anakart, CPU, RAM, GPU, PSU, Kasa, Cooler, Depolama } from '../types'


export const isInStock = (s:{stok:{durum:string}}) => s.stok?.durum !== 'out_of_stock'


export function cpuOnMobo(m:Anakart, c:CPU){
return m.cpu_uyumluluk.vendor === c.vendor && m.cpu_uyumluluk.socket === c.soket && m.cpu_uyumluluk.nesiller.includes(c.nesil)
}
export function ramOnMobo(m:Anakart, r:RAM){
if (r.tip !== m.bellek.tip) return false
if (r.modul_sayisi > m.bellek.yuva_sayisi) return false
const max = Math.max(...m.bellek.hiz_mhz)
return r.hiz_mhz <= max
}
export function gpuOnMobo(m:Anakart, _g:GPU){
if ((m.genisleme?.pcie_x16 ?? 0) < 1) return false
return true
}
export function moboInCase(k:Kasa, m:Anakart){
return k.mobo_destek.includes(m.form_factor)
}
export function gpuInCase(k:Kasa, g:GPU){
return g.boyut.uzunluk_mm <= k.gpu_uzunluk_max_mm
}
export function psuEnough(p:PSU, cpu?:CPU, gpu?:GPU){
if (!cpu || !gpu) return false
const need = cpu.tdp_w + gpu.guc.tgp_w + 150
return p.guc_w >= need
}
export function psuInCase(k:Kasa, p:PSU){
if (k.psu_tumlesik) return true
return k.psu_destek.includes(p.form_factor)
}
export function coolerOK(cool:Cooler, cpu?:CPU, k?:Kasa){
if (!cpu) return false
const soketOK = cool.desteklenen_soketler.includes(cpu.soket)
const tdpOK = cpu.tdp_w <= cool.max_tdp_w
const hOK = k?.cpu_sogutucu_yukseklik_max_mm ? (cool.yukseklik_mm ?? 0) <= k.cpu_sogutucu_yukseklik_max_mm : true
return soketOK && tdpOK && hOK
}
export function storageOnMobo(m:Anakart, d:Depolama){
if (d.arayuz.tip === 'SATA') return m.depolama.sata > 0
if (d.arayuz.tip === 'M.2 SATA' || d.arayuz.tip === 'M.2 NVMe') return m.depolama.m2 > 0
return true
}


export function pcieVersionWarning(m:Anakart, g:GPU): string | undefined {
const v = m.genisleme.pcie_gen
const gv = g.pcie_arayuz.surum === 'Gen5' ? 5 : g.pcie_arayuz.surum === 'Gen4' ? 4 : 3
if (gv > v) return `GPU ${g.pcie_arayuz.surum}, anakart PCIe Gen${v}: Bant genişliği sınırlı olabilir.`
}


export function m2GenWarning(m:Anakart, d:Depolama): string | undefined {
if (d.arayuz.tip !== 'M.2 NVMe') return
const need = d.arayuz.pcie_gen ?? 3
const have = m.depolama.m2_pci_gen ?? 3
if (need > have) return `Depolama ${need}. nesil NVMe, anakart M.2 ${have}. nesil: hız düşebilir.`
}