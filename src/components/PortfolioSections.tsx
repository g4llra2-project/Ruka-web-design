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
        className="w-full min-h-screen flex items-center justify-center px-6 md:px-12 py-24 select-none relative"
      >
        <div className="max-w-6xl w-full flex flex-col gap-8 md:gap-12">
          <div className="text-center md:text-left max-w-3xl space-y-3">
            <span className="text-[11px] font-mono tracking-[0.2em] text-[#c5a880] uppercase flex items-center justify-center md:justify-start gap-2">
              <Layers className="w-4 h-4" /> {t.services.title}
            </span>
            <h2 className="font-serif text-[28px] md:text-[46px] leading-[1.1] text-white uppercase tracking-normal">
              {t.services.subtitle}
            </h2>
            <p className="font-sans text-[13px] md:text-[15px] text-white/70 leading-relaxed max-w-[580px]">
              {t.services.intro}
            </p>
          </div>

          {/* Grid layout of architectural services (four items) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 w-full">
            {t.services.cards.map((card, i) => (
              <div 
                key={i}
                className="glass group p-5 md:p-6 rounded-[24px] border border-white/5 bg-black/35 hover:bg-black/55 hover:border-[#c5a880]/30 transition-all duration-500 flex flex-col justify-between min-h-[160px] md:min-h-[180px]"
              >
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[16px] text-white/20 group-hover:text-[#c5a880] transition-colors duration-400 font-semibold">
                    {card.num}
                  </span>
                  <div className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:border-[#c5a880] transition-all duration-400">
                    <ArrowRight className="w-3.5 h-3.5 text-white group-hover:text-[#c5a880] transition-colors duration-400" />
                  </div>
                </div>
                <div className="space-y-2 mt-4 text-left">
                  <h3 className="font-sans font-medium text-[13px] md:text-[14px] text-white tracking-wide group-hover:text-[#c5a880] transition-colors duration-300">
                    {card.name}
                  </h3>
                  <p className="font-sans text-[11px] md:text-[12px] text-white/50 leading-relaxed">
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
        className="w-full min-h-screen flex items-center justify-center px-6 md:px-12 py-24 select-none relative"
      >
        <div className="max-w-6xl w-full flex flex-col gap-6 md:gap-8 justify-center">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="space-y-1.5 text-left">
              <span className="text-[11px] font-mono tracking-[0.2em] text-[#c5a880] uppercase flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#c5a880]" /> {t.projects.title}
              </span>
              <h2 className="font-serif text-[28px] md:text-[46px] leading-[1.1] text-white uppercase">
                {t.projects.subtitle}
              </h2>
            </div>
            <span className="font-mono text-[9px] text-[#c5a880]/60 tracking-wider uppercase mb-1">
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
                  className={`glass cursor-pointer rounded-[24px] overflow-hidden border transition-all duration-500 flex flex-col text-left ${
                    isSelected 
                      ? 'border-[#c5a880] shadow-[0_0_20px_rgba(197,168,128,0.25)] bg-white/5' 
                      : 'border-white/5 hover:border-white/20 bg-black/40'
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
                        isSelected ? 'scale-105' : 'scale-100 group-hover:scale-108 opacity-60'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    
                    {/* Active Label */}
                    {isSelected && (
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#c5a880] text-black font-mono text-[8px] uppercase tracking-widest font-black shadow-[0_0_8px_rgba(197,168,128,0.6)]">
                        {lang === 'EN' ? 'ACTIVE OCULUS' : 'AKTIF OCULUS'}
                      </div>
                    )}
                  </div>

                  {/* Meta Specifications content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <h3 className="font-serif text-[14px] text-white line-clamp-1 mb-1.5">
                      {name}
                    </h3>
                    
                    <div className="grid grid-cols-3 gap-1 border-t border-white/5 pt-2.5 font-mono text-[9px] text-white/40">
                      <div>
                        <p>{t.projects.specs.year}</p>
                        <p className="text-white/80 font-medium mt-0.5">{year}</p>
                      </div>
                      <div>
                        <p>{t.projects.specs.area}</p>
                        <p className="text-white/80 font-medium mt-0.5">{area}</p>
                      </div>
                      <div className="text-right">
                        <p>{t.projects.specs.type}</p>
                        <p className="text-[#c5a880] font-medium mt-0.5 line-clamp-1">{structure}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. JOURNAL SECTION */}
      <section
        id="journal"
        className="w-full min-h-screen flex items-center justify-center px-6 md:px-12 py-24 select-none relative"
      >
        <div className="max-w-5xl w-full flex flex-col gap-8 text-left">
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono tracking-[0.2em] text-[#c5a880] uppercase flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#c5a880]" /> {t.journal.title}
            </span>
            <h2 className="font-serif text-[28px] md:text-[46px] leading-[1.1] text-white uppercase">
              {t.journal.subtitle}
            </h2>
          </div>

          {/* Editorial clean rows listing essays */}
          <div className="flex flex-col border-t border-white/10">
            {t.journal.articles.map((art, i) => (
              <div 
                key={i}
                className="group flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-8 items-start py-5 md:py-7 border-b border-white/10 hover:bg-white/[0.02] px-3 transition-colors duration-300 cursor-pointer"
              >
                {/* Article Date & Readtime */}
                <div className="md:col-span-3 flex items-center md:flex-col md:items-start justify-between md:justify-center gap-2 font-mono text-[10px] text-white/40">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> {art.date}
                  </span>
                  <span className="text-[#c5a880]/70 font-semibold">{t.journal.readTime}</span>
                </div>

                {/* Title and description */}
                <div className="md:col-span-8 space-y-1">
                  <h3 className="font-serif text-[15px] md:text-[18px] text-white group-hover:text-[#c5a880] transition-colors duration-300">
                    {art.title}
                  </h3>
                  <p className="font-sans text-[11px] md:text-[13px] text-white/50 leading-relaxed">
                    {art.desc}
                  </p>
                </div>

                {/* Aesthetic arrow icon */}
                <div className="md:col-span-1 hidden md:flex items-center justify-end h-full mt-2.5">
                  <div className="w-8 h-8 rounded-full border border-white/10 bg-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:border-[#c5a880] transition-all duration-400">
                    <ArrowRight className="w-4 h-4 text-[#c5a880]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CONTACT SECTION */}
      <section
        id="contact"
        className="w-full min-h-screen flex items-center justify-center px-6 md:px-12 py-24 select-none relative"
      >
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
          {/* Left info column */}
          <div className="md:col-span-5 space-y-8 text-left">
            <div className="space-y-2">
              <span className="text-[11px] font-mono tracking-[0.2em] text-[#c5a880] uppercase flex items-center gap-2">
                <Mail className="w-4 h-4 animate-pulse" /> {t.contact.title}
              </span>
              <h2 className="font-serif text-[28px] md:text-[42px] leading-[1.1] text-white uppercase">
                {t.contact.subtitle}
              </h2>
              <p className="font-sans text-[12px] md:text-[13px] text-white/50 leading-relaxed max-w-[360px]">
                {t.contact.instructions}
              </p>
            </div>

            {/* Studios list details */}
            <div className="space-y-5 border-t border-white/10 pt-6">
              <h3 className="font-serif text-[12px] text-[#c5a880] tracking-widest uppercase">
                {t.contact.addressTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {t.contact.studios.map((st, idx) => (
                  <div key={idx} className="space-y-1 font-sans text-[11px]">
                    <h4 className="font-medium text-white tracking-wide">{st.city}</h4>
                    <p className="text-white/60">{st.street}</p>
                    <p className="text-white/45">{st.region}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct channels links */}
            <div className="flex flex-wrap gap-4 pt-2 text-[11px] font-mono select-all">
              <div className="flex items-center gap-1.5 text-white/40 hover:text-white transition-colors duration-300">
                <Phone className="w-3.5 h-3.5 text-[#c5a880]/70" />
                <span>+62 (370) 589-2241</span>
              </div>
              <div className="flex items-center gap-1.5 text-white/40 hover:text-white transition-colors duration-300">
                <Mail className="w-3.5 h-3.5 text-[#c5a880]/70" />
                <span>patrons@ruka.studio</span>
              </div>
            </div>
          </div>

          {/* Right minimalist custom direct form */}
          <div className="md:col-span-7 glass p-6 md:p-8 rounded-[28px] border border-white/5 bg-black/45 backdrop-blur-md relative overflow-hidden">
            {submitted ? (
              /* Elegant submit success layer */
              <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 min-h-[300px]">
                <CheckCircle className="w-12 h-12 text-[#c5a880] animate-bounce mb-2" />
                <h3 className="font-serif text-[18px] text-white font-medium uppercase tracking-wider">
                  {lang === 'EN' ? 'MISSION BRIEF TRANSMITTED' : 'RINGKASAN MISI DIWAKILI'}
                </h3>
                <p className="font-sans text-[12px] text-white/60 leading-relaxed max-w-sm">
                  {t.contact.form.success}
                </p>
              </div>
            ) : (
              /* Strict high density interactive input forms */
              <form onSubmit={handleSubmit} className="space-y-5 text-left">
                <div className="space-y-1.5">
                  <label className="block text-[9px] font-mono uppercase tracking-widest text-[#c5a880]/70">
                    {t.contact.form.name}
                  </label>
                  <input
                    type="text"
                    className="w-full h-10 px-4 bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] border border-white/10 rounded-xl font-sans text-white text-[12px] transition-all outline-none focus:border-[#c5a880]/50 placeholder-white/20"
                    placeholder="e.g. Alexis Harrington"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-mono uppercase tracking-widest text-[#c5a880]/70">
                      {t.contact.form.email}
                    </label>
                    <input
                      type="email"
                      className="w-full h-10 px-4 bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] border border-white/10 rounded-xl font-sans text-white text-[12px] transition-all outline-none focus:border-[#c5a880]/50 placeholder-white/20"
                      placeholder="patron@gmail.com"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[9px] font-mono uppercase tracking-widest text-[#c5a880]/70">
                      {t.contact.form.topo}
                    </label>
                    <select
                      className="w-full h-10 px-4 bg-[#141115] border border-white/10 rounded-xl font-sans text-white text-[12px] transition-all outline-none focus:border-[#c5a880]/50 cursor-pointer"
                      value={formTopo}
                      onChange={(e) => setFormTopo(e.target.value)}
                    >
                      <option value="gentle">{t.contact.form.topoG}</option>
                      <option value="steep">{t.contact.form.topoS}</option>
                      <option value="extreme">{t.contact.form.topoE}</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[9px] font-mono uppercase tracking-widest text-[#c5a880]/70">
                    {t.contact.form.message}
                  </label>
                  <textarea
                    rows={4}
                    className="w-full p-4 bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.07] border border-white/10 rounded-xl font-sans text-white text-[12px] transition-all outline-none focus:border-[#c5a880]/50 resize-none placeholder-white/20"
                    placeholder="Share elements of structural layout, scale, region elevations..."
                    value={formMsg}
                    onChange={(e) => setFormMsg(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-[#c5a880] to-[#bca17a] hover:from-[#d1b48b] hover:to-[#c5a880] text-black hover:shadow-[0_0_15px_rgba(197,168,128,0.35)] rounded-xl font-sans font-medium text-[11px] uppercase tracking-[0.2em] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.contact.form.submit}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}

