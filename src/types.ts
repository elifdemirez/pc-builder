export type Stock = { durum: 'in_stock' | 'low_stock' | 'out_of_stock', adet?: number }
export type Price = { fiyat_try: number }


export type Anakart = Price & { id:string; marka:string; model:string; ad:string; form_factor:'ATX'|'Micro-ATX'|'Mini-ITX'; yonga_seti:string; soket:string; cpu_uyumluluk:{ vendor:'AMD'|'Intel'; socket:string; nesiller:string[]}; bellek:{ tip:'DDR4'|'DDR5'; yuva_sayisi:number; max_kapasite_gb:number; hiz_mhz:number[] }; depolama:{ sata:number; m2:number; m2_pci_gen?: 3|4|5 }; genisleme:{ pcie_x16:number; pcie_x1:number; pcie_gen: 3|4|5 }; stok:Stock; etiketler?:string[] }


export type CPU = Price & { id:string; marka:string; model:string; ad:string; vendor:'AMD'|'Intel'; soket:string; nesil:string; cekirdek_sayi:number; izlek_sayi:number; temel_hiz_ghz:number; turbo_hiz_ghz:number; tdp_w:number; bellek_destek:{ tip:'DDR4'|'DDR5'; max_mhz:number }; igpu?: boolean | null; stok:Stock; etiketler?:string[] }


export type RAM = Price & { id:string; marka:string; seri?:string; model:string; ad:string; tip:'DDR4'|'DDR5'; hiz_mhz:number; hiz_profilleri_mhz?:number[]; modul_sayisi:number; kapasite_modul_gb:number; kapasite_kit_gb:number; profil?: ('XMP'|'EXPO')[]; uyumluluk?:{ bellek_tip?:'DDR4'|'DDR5'; uyumlu_soketler?:string[]; oneri?:string }; stok:Stock }


export type GPU = Price & { id:string; marka:string; seri?:string; model:string; ad:string; vram:{ boyut_gb:number; tip:string }; pcie_arayuz:{ surum: 'Gen3'|'Gen4'|'Gen5'; hat_sayisi: 'x16'|'x8'|'x4' }; guc:{ tgp_w:number; ek_guc_konnektoru?: ('8pin'|'12VHPWR')[]; onerilen_psu_w:number }; boyut:{ uzunluk_mm:number; kalinlik_slot:number }; ekran_cikislari?:{ hdmi?:number; dp?:number; dvi?:number }; uyumluluk?:{ pcie_gereksinimi?:string; slot_ihtiyaci?:string; anakart_kontrol?:string }; stok:Stock }


export type PSU = Price & { id:string; marka:string; seri?:string; model:string; ad:string; guc_w:number; efficiency?:string; form_factor:'ATX'|'SFX'|'SFX-L'; moduler?: 'full'|'semi'|'non'; baglantilar?:{ pcie_8pin_adet?:number; pcie_12vhpwr_adet?:number; eps_8pin_adet?:number; sata_adet?:number }; uyumluluk?:{ onerilen_gpu_tgp_max_w?:number; oneri?:string }; stok:Stock }


export type Kasa = Price & { id:string; marka:string; model:string; ad:string; form_factor:'ATX'|'Micro-ATX'|'Mini-ITX'; mobo_destek:('ATX'|'Micro-ATX'|'Mini-ITX')[]; gpu_uzunluk_max_mm:number; cpu_sogutucu_yukseklik_max_mm:number; psu_destek:('ATX'|'SFX'|'SFX-L')[]; psu_tumlesik?:boolean; psu_dahili?: Partial<PSU>; stok:Stock }


export type Monitor = Price & { id:string; marka:string; seri?:string; model:string; ad:string; boyut_inch:number; panel:string; yenileme_hizi_hz:number; cozunurluk:{ ad:string; gen:number; yuk:number; oran:string }; ozellikler?:{ hdr?:boolean; fre_sync?:boolean; g_sync_compatible?:boolean; curved?:boolean; ultrawide?:boolean }; stok:Stock }


export type Depolama = Price & { id:string; marka:string; model:string; ad:string; form_factor:string; m2_boy?:'2230'|'2242'|'2280'; arayuz:{ tip: 'SATA'|'M.2 SATA'|'M.2 NVMe'; protokol?:string; port?:string; pcie_gen?:3|4|5; lanes?:1|2|4 }; kapasite_gb:number; performans?:{ okuma_mb_s?:number; yazma_mb_s?:number }; dayanıklılık_tbw?:number; uyumluluk?:{ anakart_kontrol?:string; m2_not?:string; pcie_not?:string }; stok:Stock }


export type Klavye = Price & { id:string; marka:string; seri?:string; model:string; ad:string; boyut:string; dizilim:string; switch?:{ tip:string; hot_swap?:boolean }; baglanti?:any; kablosuz?:boolean; polling_hz?:number; arkadan_aydinlatma?:boolean; stok:Stock }


export type Fare = Price & { id:string; marka:string; model:string; ad:string; sensor?:string; dpi?:{ min:number; max:number }; agirlik_g?:number; polling_hz?:number; kablosuz?:boolean; stok:Stock }


export type Cooler = Price & { id:string; marka:string; model:string; ad:string; tip: 'Air'|'Liquid'; fan_sayisi?:number; fan_boyutu_mm?:number; radyator_mm?:120|240|280|360; pompa_rpm?:number; yukseklik_mm?:number; desteklenen_soketler:string[]; max_tdp_w:number; stok:Stock }


export type Catalog = {
anakart:Anakart[]; islemci:CPU[]; ram:RAM[]; ekran_karti:GPU[]; psu:PSU[]; kasa:Kasa[]; depolama:Depolama[]; monitor:Monitor[]; klavye:Klavye[]; fare:Fare[]; islemci_sogutucu:Cooler[];
}


export type Selection = {
anakart?:Anakart; islemci?:CPU; ram?:RAM; ekran_karti?:GPU; psu?:PSU; kasa?:Kasa; depolama?:Depolama; monitor?:Monitor; klavye?:Klavye; fare?:Fare; islemci_sogutucu?:Cooler;
}