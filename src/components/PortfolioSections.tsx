/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Compass, 
  Layers, 
  Activity, 
  Mail, 
  Phone, 
  Send,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Calendar
} from 'lucide-react';
import { BACKGROUNDS } from '../types';
import { SupportedLanguages } from '../translations';

interface PortfolioSectionsProps {
  scrollProgress: number;
  lang: SupportedLanguages;
  activeBgIndex: number;
  onBgChange: (index: number) => void;
}

export default function PortfolioSections({ scrollProgress, lang, activeBgIndex, onBgChange }: PortfolioSectionsProps) {
  // Localization dictionaries specifically for the 5 sub-sections
  const content = {
    EN: {
      philosophy: {
        title: "PHILOSOPHY",
        subtitle: "MATERIAL AND SILENCE",
        para1: "At RUKA STUDIO, we design architecture that doesn't scream for attention. We construct spaces based on visual reduction, weight, and light, crafting environments that allow the mind to decelerate.",
        para2: "Our projects respond straight to geography. Instead of bulldozing extreme, steep elevations, we stitch board-formed concrete monoliths directly into cliff faces, celebrating nature's stubborn vertical rises.",
        matTitle: "ELEMENTAL DIALOGUE",
        materials: [
          { name: "Board-Formed Concrete", desc: "Left raw and textured to record the fluid motion of timber grains." },
          { name: "Hand-Cracked Basalt", desc: "Locally sourced volcanic stones carrying historic geologic weights." },
          { name: "Atmospheric Silence", desc: "Intentional void structures designed to echo acoustic winds and soft lights." }
        ]
      },
      services: {
        title: "SERVICES",
        subtitle: "SPATIAL RECONSTRUCT",
        intro: "Crafting bespoke residential systems in complex topographies necessitates rigorous engineering alongside design sensuality. We specialize in transforming hostile terrains into exquisite residential refuges.",
        cards: [
          {
            num: "01",
            name: "Architectural Massing",
            desc: "Custom structural schematics and wind-dynamic models designed strictly for high-angle exposures."
          },
          {
            num: "02",
            name: "Elevation Engineering",
            desc: "Advanced subterranean piling, cantilever calculations, and rock anchoring methodologies."
          },
          {
            num: "03",
            name: "Landscape Synectics",
            desc: "Flawless integration of mountain natural rock faces, waterfall corridors, and local flora paths."
          },
          {
            num: "04",
            name: "Precision Sourcing",
            desc: "Securing architectural metals, bespoke glass joineries, and ancient volcanic basalt stone lineages."
          }
        ]
      },
      projects: {
        title: "PORTFOLIO",
        subtitle: "SELECT MONOLITHS",
        clickTip: "Click to focus world oculus backdrop",
        details: "Explore",
        specs: {
          year: "Year",
          area: "Area",
          type: "Type"
        }
      },
      journal: {
        title: "JOURNAL",
        subtitle: "SIGHT & CRITIQUE",
        readTime: "6 Min Read",
        articles: [
          {
            date: "May 2026",
            title: "Designing the Slope: Living at 45 Degrees",
            desc: "How we balance structural shear and visual levity when floating heavy basalt slabs on Indonesian cliff angles."
          },
          {
            date: "March 2026",
            title: "Honesty in Board-Formed Concrete",
            desc: "A reflection on leaving formwork raw—embracing air sockets, curing stains, and timber knots as structural tapestries."
          },
          {
            date: "Jan 2026",
            title: "The Architecture of Whispering Water",
            desc: "Configuring natural water runoff channels as acoustic cooling agents instead of hiding them behind synthetic drains."
          }
        ]
      },
      contact: {
        title: "PATRON INQUIRY",
        subtitle: "FORM THE INCEPTION",
        instructions: "Our studio accepts a highly limited number of custom commissions each year. Connect with our principal architect to discuss your elevation.",
        form: {
          name: "Your Name / Institution",
          email: "Secured Email Address",
          topo: "Elevation Complexity",
          topoG: "Gentle (0° - 15°)",
          topoS: "Steep (15° - 35°)",
          topoE: "Extreme Cliffside (35°+)",
          message: "Describe your prospective space...",
          submit: "Transmit Briefcase",
          success: "Inquiry Transmitted Successfully. We will contact you via secure channel within three cycles."
        },
        addressTitle: "STUDIO CHAMBERS",
        studios: [
          { city: "LOMBOK CHAMBER", street: "Jl. Bukit Senggigi No. 84", region: "Lombok, NTB" },
          { city: "BANDUNG ARCHIVE", street: "Jl. Bukit Pakar Timur No. 12", region: "Dago, Bandung" }
        ]
      }
    },
    ID: {
      philosophy: {
        title: "FILOSOFI",
        subtitle: "MATERIAL & KEHENINGAN",
        para1: "Di RUKA STUDIO, kami merancang arsitektur yang tidak berteriak mencari perhatian. Kami membangun ruang berdasarkan reduksi visual, bobot, dan cahaya, menciptakan atmosfer yang meredakan kebisingan pikiran.",
        para2: "Setiap karya kami merespons topografi secara jujur. Daripada meratakan tanah tebing yang ekstrem, kami menanam monolit beton langsung ke lereng terjal, menghormati kenaikan vertikal alam yang kukuh.",
        matTitle: "DIALOG ELEMENTAL",
        materials: [
          { name: "Beton Cetak Kayu (Board-Formed)", desc: "Dibiarkan mentah dan bertekstur demi mengabadikan serat kayu cetakan." },
          { name: "Batu Basalt Belahan Tangan", desc: "Batu vulkanis lokal yang membawa karakteristik geologis bumi yang masif." },
          { name: "Keheningan Spasial", desc: "Rancangan rongga yang sengaja diciptakan untuk memantulkan hembusan angin dan gradasi cahaya." }
        ]
      },
      services: {
        title: "LAYANAN",
        subtitle: "REKONSTRUKSI RUANG",
        intro: "Menciptakan hunian peristirahatan mewah pada topografi yang kompleks menuntut presisi rekayasa teknik di samping sensitivitas estetika. Kami ahli mengubah lanskap menantang menjadi tempat berteduh ideal.",
        cards: [
          {
            num: "01",
            name: "Massa Arsitektur",
            desc: "Pemodelan skematik struktural dan simulasi angin dinamis khusus untuk paparan sudut curam."
          },
          {
            num: "02",
            name: "Rekayasa Ketinggian",
            desc: "Metode pemancangan bawah tanah canggih, kalkulasi kantilever masif, dan penjangkaran bebatuan."
          },
          {
            num: "03",
            name: "Sinetika Lanskap",
            desc: "Penyatuan sempurna dinding batu lereng alami, celah air mandiri, dan integrasi tanaman musiman."
          },
          {
            num: "04",
            name: "Rantai Pasok Presisi",
            desc: "Pengadaan logam arsitektural khusus, kusen kaca premium, hingga seleksi ketat tambang basalt kuno."
          }
        ]
      },
      projects: {
        title: "PORTOFOLIO",
        subtitle: "MONOLIT PILIHAN",
        clickTip: "Klik kartu untuk menaruh oculus dunia pada latar",
        details: "Eksplorasi",
        specs: {
          year: "Tahun",
          area: "Luas",
          type: "Tipe"
        }
      },
      journal: {
        title: "JURNAL",
        subtitle: "PANDANGAN & KRITIK",
        readTime: "Baca 6 Menit",
        articles: [
          {
            date: "Mei 2026",
            title: "Merancang pada Kemiringan: Hidup di 45 Derajat",
            desc: "Bagaimana kami menyeimbangkan geser struktural dan estetika melayang kala menyusun pelat basalt di tebing Indonesia."
          },
          {
            date: "Maret 2026",
            title: "Kejujuran Konstruksi Beton Ekspos",
            desc: "Perenungan mendalam tentang membiarkan permukaan beton murni dengan jejak kayu cetak, semen mengembun, dan gradasi alami."
          },
          {
            date: "Jan 2026",
            title: "Arsitektur Desis Air yang Menenangkan",
            desc: "Mengonfigurasi saluran air hujan tebing sebagai pemecah suara bising sekitar sekaligus penyejuk alami ruang dalam."
          }
        ]
      },
      contact: {
        title: "PERTANYAAN PATRON",
        subtitle: "AWALI INSEPSI",
        instructions: "Studio kami hanya menerima komisi terbatas setiap tahun demi dedikasi penuh. Hubungi arsitek prinsipal kami untuk mendiskusikan lahan Anda.",
        form: {
          name: "Nama Lengkap / Instansi",
          email: "Alamat Surel Terenkripsi",
          topo: "Tingkat Kompleksitas Lahan",
          topoG: "Landai (0° - 15°)",
          topoS: "Curam (15° - 35°)",
          topoE: "Tebing Ekstrem (35°+)",
          message: "Gambarkan visi ruang Anda...",
          submit: "Kirim Ringkasan",
          success: "Pesan Berhasil Terkirim. Kami akan menghubungi Anda melalui saluran pribadi dalam tiga siklus kerja."
        },
        addressTitle: "KANTOR STUDIO",
        studios: [
          { city: "STUDIO LOMBOK", street: "Jl. Bukit Senggigi No. 84", region: "Lombok, NTB" },
          { city: "ARSIP BANDUNG", street: "Jl. Bukit Pakar Timur No. 12", region: "Dago, Bandung" }
        ]
      }
    }
  };

  const t = content[lang];

  // Form Submission handles
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formTopo, setFormTopo] = useState('steep');
  const [formMsg, setFormMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail) return;
    setSubmitted(true);
    setTimeout(() => {
      setFormName('');
      setFormEmail('');
      setFormMsg('');
    }, 4000);
  };

  return (
    <div id="portfolio-scrollable-sections" className="w-full flex flex-col relative z-30">
      
      {/* 1. PHILOSOPHY SECTION */}
      <section
        id="philosophy"
        className="w-full min-h-screen flex items-center justify-center px-6 md:px-12 py-24 select-none relative bg-[#FCFAF6] text-[#0B2240]"
      >
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
          {/* Left Description column */}
          <div className="md:col-span-6 space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-[11px] font-mono tracking-[0.2em] text-[#0B2240]/80 uppercase flex items-center gap-2">
                <Compass className="w-4 h-4 animate-spin-slow text-[#0B2240]" /> {t.philosophy.title}
              </span>
              <h2 className="font-serif text-[28px] md:text-[46px] leading-[1.1] text-[#0B2240] uppercase tracking-normal">
                {t.philosophy.subtitle}
              </h2>
            </div>
            <p className="font-sans text-[13px] md:text-[15px] text-[#0B2240]/85 leading-relaxed">
              {t.philosophy.para1}
            </p>
            <p className="font-sans text-[13px] md:text-[15px] text-[#0B2240]/65 leading-relaxed">
              {t.philosophy.para2}
            </p>
          </div>

          {/* Right materials layout card */}
          <div className="md:col-span-6 bg-white/95 border border-[#0B2240]/10 shadow-[0_12px_40px_rgba(11,34,64,0.06)] p-6 md:p-8 rounded-[28px] space-y-6">
            <h3 className="font-serif text-[13px] text-[#0B2240] tracking-widest uppercase border-b border-[#0B2240]/10 pb-3 flex items-center justify-between text-left">
              <span>{t.philosophy.matTitle}</span>
              <span className="font-mono text-[9px] text-[#0B2240]/40">01 / L</span>
            </h3>
            <div className="space-y-5 text-left">
              {t.philosophy.materials.map((mat, i) => (
                <div key={i} className="group flex gap-4">
                  <span className="font-mono text-[11px] text-[#A4855C] font-bold mt-0.5">
                    // 0{i + 1}
                  </span>
                  <div className="space-y-1">
                    <h4 className="font-sans font-medium text-[13px] md:text-[14px] text-[#0B2240] transition-colors duration-300 group-hover:text-[#A4855C]">
                      {mat.name}
                    </h4>
                    <p className="font-sans text-[11px] md:text-[12px] text-[#0B2240]/65 leading-relaxed">
                      {mat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES SECTION */}
      <section
        id="services"
        className="w-full min-h-screen flex items-center justify-center px-6 md:px-12 py-24 select-none relative bg-[#FCFAF6] text-[#0B2240]"
      >
        <div className="max-w-6xl w-full flex flex-col gap-8 md:gap-12">
          <div className="text-center md:text-left max-w-3xl space-y-3">
            <span className="text-[11px] font-mono tracking-[0.2em] text-[#A4855C] uppercase flex items-center justify-center md:justify-start gap-2">
              <Layers className="w-4 h-4" /> {t.services.title}
            </span>
            <h2 className="font-serif text-[28px] md:text-[46px] leading-[1.1] text-[#0B2240] uppercase tracking-normal">
              {t.services.subtitle}
            </h2>
            <p className="font-sans text-[13px] md:text-[15px] text-[#0B2240]/85 leading-relaxed max-w-[580px]">
              {t.services.intro}
            </p>
          </div>

          {/* Grid layout of architectural services (four items) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 w-full">
            {t.services.cards.map((card, i) => (
              <div 
                key={i}
                className="bg-white group p-5 md:p-6 rounded-[24px] border border-[#0B2240]/10 hover:border-[#A4855C]/45 hover:shadow-[0_12px_28px_rgba(11,34,64,0.06)] transition-all duration-500 flex flex-col justify-between min-h-[160px] md:min-h-[180px]"
              >
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[16px] text-[#0B2240]/20 group-hover:text-[#A4855C] transition-colors duration-400 font-semibold">
                    {card.num}
                  </span>
                  <div className="w-6 h-6 rounded-full border border-[#0B2240]/10 flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:border-[#A4855C] transition-all duration-400">
                    <ArrowRight className="w-3.5 h-3.5 text-[#0B2240]/60 group-hover:text-[#A4855C] transition-colors duration-400" />
                  </div>
                </div>
                <div className="space-y-2 mt-4 text-left">
                  <h3 className="font-sans font-medium text-[13px] md:text-[14px] text-[#0B2240] tracking-wide group-hover:text-[#A4855C] transition-colors duration-300">
                    {card.name}
                  </h3>
                  <p className="font-sans text-[11px] md:text-[12px] text-[#0B2240]/65 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROJECTS SECTION */}
      <section
        id="projects"
        className="w-full min-h-screen flex items-center justify-center px-6 md:px-12 py-24 select-none relative bg-[#FCFAF6] text-[#0B2240]"
      >
        <div className="max-w-6xl w-full flex flex-col gap-6 md:gap-8 justify-center">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="space-y-1.5 text-left">
              <span className="text-[11px] font-mono tracking-[0.2em] text-[#A4855C] uppercase flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#A4855C]" /> {t.projects.title}
              </span>
              <h2 className="font-serif text-[28px] md:text-[46px] leading-[1.1] text-[#0B2240] uppercase">
                {t.projects.subtitle}
              </h2>
            </div>
            <span className="font-mono text-[9px] text-[#A4855C]/80 tracking-wider uppercase mb-1">
              ‹ {t.projects.clickTip} ›
            </span>
          </div>

          {/* List layout of the 4 backgrounds showcasing actual architectural blueprints */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
            {BACKGROUNDS.map((bg, idx) => {
              const isSelected = activeBgIndex === idx;
              const name = lang === 'EN' ? bg.nameEN : bg.nameID;
              
              // Static high-end metadata values
              const year = ["2024", "2025", "2024", "2026"][idx];
              const area = ["720 ㎡", "1,140 ㎡", "560 ㎡", "890 ㎡"][idx];
              const structure = ["Concrete Cascade", "Slate Sanctuary", "Oculus Pavilion", "Refuge Frame"][idx];

              return (
                <div
                  key={bg.id}
                  className={`cursor-pointer rounded-[24px] overflow-hidden border transition-all duration-500 flex flex-col text-left ${
                    isSelected 
                      ? 'border-[#A4855C] shadow-[0_12px_32px_rgba(164,133,92,0.14)] bg-white' 
                      : 'border-[#0B2240]/10 hover:border-[#A4855C]/35 bg-white/70 hover:bg-white'
                  }`}
                  onClick={() => onBgChange(idx)}
                  style={{ minHeight: '230px' }}
                >
                  {/* Visual Card Image */}
                  <div className="relative w-full h-[120px] overflow-hidden bg-black">
                    <img
                      src={bg.url}
                      alt={name}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover transition-transform duration-700 ${
                        isSelected ? 'scale-105' : 'scale-100 group-hover:scale-108 opacity-65'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Active Label */}
                    {isSelected && (
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-none bg-[#A4855C] text-white font-mono text-[8px] uppercase tracking-widest font-bold shadow-[0_4px_10px_rgba(164,133,92,0.3)]">
                        {lang === 'EN' ? 'ACTIVE OCULUS' : 'AKTIF OCULUS'}
                      </div>
                    )}
                  </div>

                  {/* Meta Specifications content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <h3 className="font-serif text-[14px] text-[#0B2240] line-clamp-1 mb-1.5 font-medium">
                      {name}
                    </h3>
                    
                    <div className="grid grid-cols-3 gap-1 border-t border-[#0B2240]/10 pt-2.5 font-mono text-[9px] text-[#0B2240]/45">
                      <div>
                        <p>{t.projects.specs.year}</p>
                        <p className="text-[#0B2240]/80 font-medium mt-0.5">{year}</p>
                      </div>
                      <div>
                        <p>{t.projects.specs.area}</p>
                        <p className="text-[#0B2240]/80 font-medium mt-0.5">{area}</p>
                      </div>
                      <div className="text-right">
                        <p>{t.projects.specs.type}</p>
                        <p className="text-[#A4855C] font-semibold mt-0.5 line-clamp-1">{structure}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. HIGHLY CUSTOM ARCHITECTURAL-THEMED FOOTER */}
      <footer
        id="reverie-footer"
        className="w-full relative bg-[#FCFAF6] text-[#0B2240] py-24 px-6 md:px-12 lg:px-20 overflow-hidden border-t border-[#0B2240]/10 flex flex-col justify-between"
        style={{ minHeight: '90vh' }}
      >
        {/* Rich, high-precision technical vector architectural blueprint backdrop */}
        <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden opacity-[0.32] md:opacity-[0.38]" aria-hidden="true">
          <svg
            className="absolute bottom-0 right-[-5%] md:right-0 w-[120%] md:w-[75%] h-[80%] md:h-[95%]"
            viewBox="0 0 1000 700"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Fine drafting math grid background */}
            <defs>
              <pattern id="arch-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#0B2240" strokeWidth="0.5" strokeOpacity="0.05" />
                <path d="M 150 0 L 0 0 0 150" fill="none" stroke="#0B2240" strokeWidth="0.75" strokeOpacity="0.12" />
              </pattern>
              
              {/* Hatch patterns for material representation in drafting */}
              <pattern id="earth-hatch" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="10" stroke="#0B2240" strokeWidth="1" strokeOpacity="0.12" />
              </pattern>
              <pattern id="concrete-stipple" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="0.5" fill="#0B2240" fillOpacity="0.2" />
                <circle cx="12" cy="8" r="0.5" fill="#0B2240" fillOpacity="0.15" />
                <circle cx="8" cy="14" r="0.7" fill="#A4855C" fillOpacity="0.3" />
                <circle cx="17" cy="17" r="0.4" fill="#0B2240" fillOpacity="0.2" />
              </pattern>
            </defs>
            <rect width="1000" height="700" fill="url(#arch-grid)" />

            {/* Faint overlay compass radial guides / protractor dial */}
            <circle cx="780" cy="460" r="220" stroke="#0B2240" strokeWidth="0.5" strokeOpacity="0.12" />
            <circle cx="780" cy="460" r="180" stroke="#A4855C" strokeWidth="0.75" strokeDasharray="2 4" strokeOpacity="0.3" />
            <circle cx="780" cy="460" r="120" stroke="#0B2240" strokeWidth="0.5" strokeDasharray="5 5" strokeOpacity="0.15" />
            <circle cx="780" cy="460" r="15" stroke="#A4855C" strokeWidth="1" strokeOpacity="0.5" />
            
            {/* Axis Datum Lines */}
            <line x1="100" y1="460" x2="980" y2="460" stroke="#0B2240" strokeWidth="0.75" strokeOpacity="0.15" strokeDasharray="8 4" />
            <line x1="780" y1="100" x2="780" y2="680" stroke="#0B2240" strokeWidth="0.75" strokeOpacity="0.15" strokeDasharray="8 4" />
            
            {/* Technical Angle Guides & Coordinates */}
            <line x1="780" y1="460" x2="590" y2="350" stroke="#A4855C" strokeWidth="0.75" strokeOpacity="0.25" strokeDasharray="1 3" />
            <line x1="780" y1="460" x2="960" y2="320" stroke="#A4855C" strokeWidth="0.75" strokeOpacity="0.25" strokeDasharray="1 3" />
            <text x="595" y="342" fill="#A4855C" fontSize="8" fontFamily="monospace" letterSpacing="0.05em" opacity="0.6">PLANE REF AXIS α - 35°</text>
            <text x="890" y="315" fill="#0B2240" fontSize="8" fontFamily="monospace" opacity="0.5">ROTN SEC-B: +15.5°</text>

            {/* Geo-Topography terrain slope profile (The 35-degree cliffline) */}
            {/* Filled mountain rock section beneath house */}
            <path
              d="M -50,650 Q 150,630 350,600 T 700,430 T 1100,200 L 1100,750 L -50,750 Z"
              fill="url(#concrete-stipple)"
            />
            <path
              d="M -50,650 Q 150,630 350,600 T 700,430 T 1100,200"
              stroke="#0B2240"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeOpacity="0.45"
            />
            {/* Soft secondary geological layer */}
            <path
              d="M -50,680 Q 120,660 320,635 T 670,470 T 1100,240"
              stroke="#A4855C"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeDasharray="4 6"
              strokeOpacity="0.35"
            />
            {/* Earth hatching fill overlay for deep slice look */}
            <path
              d="M -50,680 Q 120,660 320,635 T 670,470 T 1100,240 L 1100,750 L -50,750 Z"
              fill="url(#earth-hatch)"
            />

            {/* Faint landscape indicator dots representing natural strata */}
            <text x="350" y="650" fill="#0B2240" fontSize="8" fontFamily="monospace" opacity="0.2">STRATA VII // BEDROCK BASALT</text>
            <text x="750" y="580" fill="#0B2240" fontSize="8" fontFamily="monospace" opacity="0.2">STRATA III // SILTSTONE MIX</text>

            {/* DETAILED ARCHITECTURAL SECTION CAD DRAWING (Floating Cantilever Villa) */}
            <g transform="translate(480, 210) scale(1.05)">
              {/* Foundation structural piers anchored into bedrock */}
              <line x1="80" y1="200" x2="80" y2="380" stroke="#0B2240" strokeWidth="2" strokeOpacity="0.6" />
              <line x1="180" y1="150" x2="180" y2="320" stroke="#0B2240" strokeWidth="2" strokeOpacity="0.6" />
              <line x1="280" y1="90" x2="280" y2="240" stroke="#A4855C" strokeWidth="2" strokeOpacity="0.5" />
              <line x1="380" y1="40" x2="380" y2="180" stroke="#A4855C" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="3 3" />

              {/* Pile anchor rods details */}
              <circle cx="80" cy="380" r="3" fill="#0B2240" fillOpacity="0.7" />
              <circle cx="180" cy="320" r="3" fill="#0B2240" fillOpacity="0.7" />
              <circle cx="280" cy="240" r="3" fill="#A4855C" fillOpacity="0.6" />

              {/* Left Ground Level Slab */}
              <polygon points="20,199 260,199 250,212 30,212" fill="#0B2240" fillOpacity="0.08" stroke="#0B2240" strokeWidth="2.5" strokeOpacity="0.7" />
              
              {/* Lower Level retaining wall section */}
              <rect x="70" y="99" width="10" height="100" fill="url(#earth-hatch)" stroke="#0B2240" strokeWidth="1.5" strokeOpacity="0.5" />
              
              {/* Suspended Cantilever Upper Deck */}
              {/* The dramatic 3-meter hovering slab */}
              <polygon points="-40,99 320,99 300,112 -20,112" fill="none" stroke="#0B2240" strokeWidth="2.5" strokeOpacity="0.8" />
              {/* Diagonal steel reinforcement brace underneath the deck */}
              <line x1="80" y1="199" x2="220" y2="112" stroke="#A4855C" strokeWidth="2" strokeOpacity="0.7" />
              <line x1="80" y1="199" x2="-20" y2="112" stroke="#0B2240" strokeWidth="1.5" strokeOpacity="0.5" />

              {/* Main living spaces framing (columns, beams, glass panels) */}
              {/* Floor to Ceiling high-iron structural glass facade */}
              <rect x="25" y="0" width="85" height="99" fill="none" stroke="#0B2240" strokeWidth="0.75" strokeOpacity="0.3" />
              <rect x="110" y="0" width="85" height="99" fill="none" stroke="#0B2240" strokeWidth="0.75" strokeOpacity="0.3" />
              <rect x="195" y="0" width="85" height="99" fill="none" stroke="#0B2240" strokeWidth="0.75" strokeOpacity="0.3" />
              
              {/* Door/mullion framing overlays */}
              <line x1="68" y1="0" x2="68" y2="99" stroke="#0B2240" strokeWidth="1" strokeOpacity="0.5" />
              <line x1="152" y1="0" x2="152" y2="99" stroke="#0B2240" strokeWidth="1" strokeOpacity="0.5" />
              <line x1="238" y1="0" x2="238" y2="99" stroke="#0B2240" strokeWidth="1" strokeOpacity="0.5" />
              
              {/* Internal staircase cross-section line */}
              <path d="M 40,99 L 60,80 L 80,80 L 100,60 L 120,60 L 140,40 L 160,40 L 180,20 L 200,20 L 220,0" fill="none" stroke="#A4855C" strokeWidth="1.25" strokeOpacity="0.6" />

              {/* Roof slab & overhang trellis */}
              <polygon points="-60,-12 300,-12 300,0 -40,0" fill="#FCFAF6" fillOpacity="0.9" stroke="#0B2240" strokeWidth="2.5" strokeOpacity="0.8" />
              <line x1="300" y1="-6" x2="380" y2="-6" stroke="#0B2240" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="4 2" />
              
              {/* Trellis louvers block */}
              <g opacity="0.5">
                <line x1="-30" y1="-12" x2="-30" y2="-28" stroke="#0B2240" strokeWidth="1" />
                <line x1="-15" y1="-12" x2="-15" y2="-28" stroke="#0B2240" strokeWidth="1" />
                <line x1="0" y1="-12" x2="0" y2="-28" stroke="#0B2240" strokeWidth="1" />
                <line x1="15" y1="-12" x2="15" y2="-28" stroke="#0B2240" strokeWidth="1" />
                <line x1="30" y1="-12" x2="30" y2="-28" stroke="#0B2240" strokeWidth="1" />
                <line x1="45" y1="-12" x2="45" y2="-28" stroke="#0B2240" strokeWidth="1" />
                <line x1="60" y1="-12" x2="60" y2="-28" stroke="#0B2240" strokeWidth="1" />
              </g>

              {/* Detailed dimension leader lines with builder slashes / tick marks */}
              {/* Vertical dimension line */}
              <g transform="translate(-80, -12)">
                <line x1="0" y1="0" x2="0" y2="211" stroke="#A4855C" strokeWidth="0.75" strokeOpacity="0.8" />
                <line x1="-4" y1="4" x2="4" y2="-4" stroke="#A4855C" strokeWidth="1.25" strokeOpacity="0.8" />
                <line x1="-4" y1="215" x2="4" y2="207" stroke="#A4855C" strokeWidth="1.25" strokeOpacity="0.8" />
                <line x1="-4" y1="111" x2="4" y2="103" stroke="#A4855C" strokeWidth="1" strokeOpacity="0.5" />
                
                {/* Text dimensions */}
                <text x="-12" y="55" fill="#A4855C" fontSize="8" fontFamily="monospace" textAnchor="end" opacity="0.85">3,200 MM</text>
                <text x="-12" y="155" fill="#A4855C" fontSize="8" fontFamily="monospace" textAnchor="end" opacity="0.85">4,800 MM</text>
                <text x="-40" y="110" fill="#0B2240" fontSize="8" fontFamily="monospace" transform="rotate(-90 -40 110)" textAnchor="middle" letterSpacing="0.05em" opacity="0.4">SECTION H-H COMPLIANCE</text>
              </g>

              {/* Horizontal bottom dimension line */}
              <g transform="translate(20, 245)">
                <line x1="0" y1="0" x2="300" y2="0" stroke="#A4855C" strokeWidth="0.75" strokeOpacity="0.8" />
                <line x1="-4" y1="4" x2="4" y2="-4" stroke="#A4855C" strokeWidth="1.25" strokeOpacity="0.8" />
                <line x1="296" y1="4" x2="304" y2="-4" stroke="#A4855C" strokeWidth="1.25" strokeOpacity="0.8" />
                <text x="150" y="14" fill="#A4855C" fontSize="8" fontFamily="monospace" textAnchor="middle" letterSpacing="0.1em" opacity="0.85">CANTILEVER PROJ: 11,500 MM</text>
              </g>

              {/* Blueprint annotation markers / technical stamps */}
              <text x="180" y="-30" fill="#0B2240" fontSize="10" fontFamily="sans-serif" fontWeight="bold" letterSpacing="0.1em" opacity="0.8">WEST CLIFFSIDE SECTION V4</text>
              <text x="180" y="-18" fill="#A4855C" fontSize="8" fontFamily="monospace" letterSpacing="0.18em" opacity="0.7">SCALE: 1:75 // DETAIL DWG #S-08</text>
              <text x="180" y="-6" fill="#0B2240" fontSize="7" fontFamily="monospace" opacity="0.4">RUKA STUDIO // ARCHITECTURAL INTELLECT</text>
            </g>

            {/* Premium, ultra-fine CAD architectural pine trees representing vegetation layers */}
            {/* Tree A */}
            <g transform="translate(130, 480) scale(1.1)">
              <line x1="50" y1="160" x2="50" y2="-20" stroke="#0B2240" strokeWidth="1.5" strokeOpacity="0.35" />
              {/* Concentric rings showing tree canopy limits in planning */}
              <circle cx="50" cy="40" r="45" fill="none" stroke="#0B2240" strokeWidth="0.75" strokeOpacity="0.25" />
              <circle cx="50" cy="40" r="32" fill="none" stroke="#A4855C" strokeWidth="0.75" strokeOpacity="0.2" strokeDasharray="3 3" />
              <circle cx="50" cy="40" r="18" fill="none" stroke="#0B2240" strokeWidth="0.5" strokeOpacity="0.15" />
              <line x1="5" y1="40" x2="95" y2="40" stroke="#0B2240" strokeWidth="0.5" strokeOpacity="0.2" />
              <line x1="50" y1="-5" x2="50" y2="85" stroke="#0B2240" strokeWidth="0.5" strokeOpacity="0.2" />
              <text x="56" y="25" fill="#A4855C" fontSize="7" fontFamily="monospace" opacity="0.5">PINE-X12</text>
            </g>

            {/* Tree B (Geometric low-poly tree layout) */}
            <g transform="translate(320, 500) scale(0.9)">
              <line x1="50" y1="150" x2="50" y2="-10" stroke="#0B2240" strokeWidth="1.25" strokeOpacity="0.35" />
              <polygon points="50,-30 20,60 80,60" fill="none" stroke="#0B2240" strokeWidth="0.75" strokeOpacity="0.3" />
              <polygon points="50,15 10,105 90,105" fill="none" stroke="#0B2240" strokeWidth="0.75" strokeOpacity="0.25" />
              <circle cx="50" cy="65" r="12" stroke="#A4855C" strokeWidth="0.5" strokeOpacity="0.25" strokeDasharray="1 2" />
              <text x="56" y="10" fill="#0B2240" fontSize="7" fontFamily="monospace" opacity="0.4">CONIFER TR-02</text>
            </g>

            {/* Tree C (Distant drafting vector circle) */}
            <g transform="translate(930, 160) scale(0.7)">
              <line x1="50" y1="150" x2="50" y2="-40" stroke="#0B2240" strokeWidth="1" strokeOpacity="0.25" />
              <circle cx="50" cy="20" r="40" fill="none" stroke="#0B2240" strokeWidth="0.5" strokeOpacity="0.15" />
              <circle cx="50" cy="20" r="28" fill="none" stroke="#A4855C" strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="5 3" />
              <line x1="10" y1="20" x2="90" y2="20" stroke="#0B2240" strokeWidth="0.4" strokeOpacity="0.1" />
              <line x1="50" y1="-20" x2="50" y2="60" stroke="#0B2240" strokeWidth="0.4" strokeOpacity="0.1" />
            </g>
          </svg>
        </div>

        {/* Outer Layout wrapper to align structure perfectly and matching other sections */}
        <div className="max-w-6xl mx-auto w-full z-10 relative flex-1 flex flex-col justify-between h-full gap-16 md:gap-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT AREA: High-end sentence case heading following screenshot exactly */}
            <div className="lg:col-span-7 flex flex-col items-start text-left gap-8 md:gap-10">
              <h2 className="font-serif text-[40px] md:text-[56px] leading-[1.08] text-[#0B2240] tracking-tight selection:bg-[#A4855C]/20 text-left">
                {lang === 'EN' ? 'Want to build something' : 'Ingin membangun sesuatu'}
                <br />
                {lang === 'EN' ? 'that feels' : 'yang terasa'}{' '}
                <span className="italic font-normal text-[#0B2240]">
                  {lang === 'EN' ? 'different' : 'berbeda'}
                </span>
                <span className="text-[#FF633E] font-serif font-medium ml-1">?</span>
              </h2>

              {/* Highly finished button: follows RUKA's standard dark pill style with accent colors */}
              <a
                href="mailto:patrons@ruka.studio"
                className="group inline-flex items-center gap-4 bg-black hover:bg-[#A4855C] text-white px-7 py-3 rounded-full transition-all duration-300 transform hover:scale-[1.02] shadow-[0_8px_20px_rgba(11,34,64,0.12)] border border-[#0B2240]/10"
              >
                <span className="font-sans text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold">
                  {lang === 'EN' ? 'Friendly. Together.' : 'Kerja Sama. Bersama.'}
                </span>
                <span className="text-xs font-sans font-normal border-l border-white/20 pl-3.5 group-hover:translate-x-1.5 transition-transform duration-300">
                  →
                </span>
              </a>
            </div>

            {/* RIGHT AREA: Vertical clean menu navigation hierarchy beautifully aligned with Ruka styles */}
            <div className="lg:col-span-5 flex flex-col lg:items-end w-full lg:text-right gap-4">
              <div className="text-[#A4855C] font-mono text-[9px] tracking-[0.25em] uppercase border-b border-[#0B2240]/10 pb-2.5 w-full lg:max-w-[180px] mb-2 font-semibold">
                INDEX / 索引
              </div>
              <ul className="flex flex-col gap-3.5 uppercase font-mono text-[10.5px] font-bold tracking-[0.22em] text-[#0B2240]/75">
                <li>
                  <a
                    href="#top"
                    onClick={(e) => {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#A4855C] transition-colors duration-300 select-none pb-0.5 border-b border-transparent hover:border-[#A4855C]/30"
                  >
                    {lang === 'EN' ? '// Home' : '// Beranda'}
                  </a>
                </li>
                <li>
                  <a
                    href="#philosophy"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('philosophy')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-[#A4855C] transition-colors duration-300 select-none pb-0.5 border-b border-transparent hover:border-[#A4855C]/30"
                  >
                    {lang === 'EN' ? '// Who We Are' : '// Tentang Kami'}
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-[#A4855C] transition-colors duration-300 select-none pb-0.5 border-b border-transparent hover:border-[#A4855C]/30"
                  >
                    {lang === 'EN' ? '// Anatomy of Design' : '// Sinetika Desain'}
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-[#A4855C] transition-colors duration-300 select-none pb-0.5 border-b border-transparent hover:border-[#A4855C]/30"
                  >
                    {lang === 'EN' ? '// Our Work' : '// Karya Kami'}
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:patrons@ruka.studio"
                    className="hover:text-[#A4855C] transition-colors duration-300 select-none pb-0.5 border-b border-transparent hover:border-[#A4855C]/30"
                  >
                    {lang === 'EN' ? '// Email Us' : '// Surat Patron'}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* LOWER ALIGNED STRIP: Aligned perfectly with other pages */}
          <div className="border-t border-[#0B2240]/10 pt-10 mt-6 w-full flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social linkages in high-end design */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-7 font-mono text-[9px] text-[#0B2240]/55 tracking-[0.2em] uppercase">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#A4855C] transition-colors duration-300">
                INSTAGRAM
              </a>
              <span className="text-[#0B2240]/15 select-none">/</span>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#A4855C] transition-colors duration-300">
                LINKEDIN
              </a>
              <span className="text-[#0B2240]/15 select-none">/</span>
              <a href="https://archdaily.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#A4855C] transition-colors duration-300">
                ARCHDAILY
              </a>
              <span className="text-[#0B2240]/15 select-none">/</span>
              <a href="mailto:patrons@ruka.studio" className="hover:text-[#A4855C] transition-colors duration-300">
                PATRONS OFFICE
              </a>
            </div>

            {/* Copyright stamp */}
            <div className="font-mono text-[9px] text-[#0B2240]/40 tracking-wider text-center md:text-right select-none md:max-w-xs leading-relaxed">
              © {new Date().getFullYear()} RUKA STUDIO. ALL RIGHTS RESERVED.
              <br />
              <span className="text-[#A4855C]/75 font-semibold">DIGITAL ARCHITECTURAL CAD PLAN S-04 // ID72a9</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


