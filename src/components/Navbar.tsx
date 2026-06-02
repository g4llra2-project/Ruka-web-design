/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SupportedLanguages, TRANSLATIONS } from '../translations';
import GlassToggle from './GlassToggle';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  isMobile: boolean;
  isVisible: boolean; // Delayed fade-in on mount
  lang: SupportedLanguages;
  onLanguageChange: (lang: SupportedLanguages) => void;
  isLightBg?: boolean;
}

export default function Navbar({ isMobile, isVisible, lang, onLanguageChange, isLightBg = false }: NavbarProps) {
  const t = TRANSLATIONS[lang];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    const element = document.getElementById(hash === 'logo' ? 'reverie-app-container' : hash);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    setIsMenuOpen(false);
    handleAnchorClick(e, hash);
  };

  return (
    <>
      <nav
        id="reverie-navbar"
        className="fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          padding: isMobile ? '16px 20px' : '20px 48px',
          height: isMobile ? 'auto' : '88px',
          backgroundColor: isLightBg ? 'rgba(252, 250, 246, 0.45)' : 'rgba(10, 6, 8, 0.2)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          borderBottom: isLightBg ? '1px solid rgba(11, 34, 64, 0.05)' : '1px solid rgba(255, 255, 255, 0.03)',
          color: isLightBg ? '#0B2240' : '#ffffff'
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {!isMobile ? (
            // === DESKTOP LAYOUT ===
            <div className="w-full flex items-center justify-between h-12">
              
              {/* STATE A: Show RUKA STUDIO Brand logo (Only when isLightBg is FALSE, i.e., at Top section) */}
              <AnimatePresence mode="wait">
                {!isLightBg && (
                  <motion.div
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="flex items-center justify-start flex-none"
                  >
                    <a href="#" id="nav-logo" onClick={(e) => handleAnchorClick(e, 'logo')} className="group cursor-pointer flex items-center">
                      <span className="font-sans text-[18px] font-bold tracking-[0.2em] uppercase text-white group-hover:text-[#c5a880] transition-colors duration-300">
                        RUKA STUDIO
                      </span>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* STATE A: Center/Right-Center menu links (Only when isLightBg is FALSE) with nice padding spacer to give "some jarak yang lebih lebar" */}
              <AnimatePresence mode="wait">
                {!isLightBg && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }}
                    className="flex items-center ml-auto mr-12 gap-10 font-sans font-medium uppercase text-[10.5px] tracking-[0.2em]"
                  >
                    <a
                      id="nav-link-projects"
                      href="#projects"
                      onClick={(e) => handleAnchorClick(e, 'projects')}
                      className="text-white/85 hover:text-white transition-all duration-300 transform hover:scale-[1.03] select-none cursor-pointer"
                    >
                      {t.navWork}
                    </a>
                    <span className="text-white/20 select-none">/</span>
                    <a
                      id="nav-link-philosophy"
                      href="#philosophy"
                      onClick={(e) => handleAnchorClick(e, 'philosophy')}
                      className="text-white/85 hover:text-white transition-all duration-300 transform hover:scale-[1.03] select-none cursor-pointer"
                    >
                      {t.navStudio}
                    </a>
                    <span className="text-white/20 select-none">/</span>
                    <a
                      id="nav-link-services"
                      href="#services"
                      onClick={(e) => handleAnchorClick(e, 'services')}
                      className="text-white/85 hover:text-white transition-all duration-300 transform hover:scale-[1.03] select-none cursor-pointer"
                    >
                      {t.navProcess}
                    </a>
                    <span className="text-white/20 select-none">/</span>
                    <a
                      id="nav-link-hero"
                      href="#hero-section"
                      onClick={(e) => handleAnchorClick(e, 'hero-section')}
                      className="text-white/85 hover:text-white transition-all duration-300 transform hover:scale-[1.03] select-none cursor-pointer"
                    >
                      {t.navGallery}
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* STATE A/B: CTA button + Trigger toggles based on light-bg scroll threshold */}
              <div className="flex items-center gap-4 justify-end flex-1">
                {isLightBg ? (
                  // STATE B: Only show GET IN TOUCH - MENU
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center gap-4"
                  >
                    <a
                      href="mailto:patrons@ruka.studio"
                      className="rounded-full bg-black text-white hover:bg-[#c5a880] hover:text-[#0a0608] px-[22px] py-2.5 text-[9.5px] font-sans font-bold tracking-[0.18em] transition-all duration-300 uppercase flex items-center gap-2 border border-white/20 shadow-md transform hover:scale-[1.02]"
                    >
                      <span>{t.navContact}</span>
                      <span className="text-[12px] opacity-75">∘</span>
                    </a>
                    <button
                      onClick={() => setIsMenuOpen(true)}
                      className="rounded-full bg-[#EFECE6]/95 hover:bg-[#e4dfd5] border border-[#0B2240]/10 px-[24px] py-2.5 text-[9.5px] font-sans font-bold tracking-[0.18em] text-[#0B2240] transition-all duration-300 cursor-pointer uppercase shadow-sm hover:scale-[1.02]"
                    >
                      MENU
                    </button>
                  </motion.div>
                ) : (
                  // STATE A: Only show GET IN TOUCH button (No language switcher)
                  <a
                    href="mailto:patrons@ruka.studio"
                    id="nav-get-in-touch"
                    className="rounded-full bg-black hover:bg-[#c5a880] hover:text-[#0a0608] px-[22px] py-2.5 text-[9.5px] font-sans font-bold tracking-[0.18em] transition-all duration-300 uppercase flex items-center gap-2 border border-white/20 select-none cursor-pointer shadow-md transform hover:scale-[1.02]"
                  >
                    <span>{t.navContact}</span>
                    <span className="text-[12px] opacity-75">∘</span>
                  </a>
                )}
              </div>
            </div>
          ) : (
            // === MOBILE LAYOUT ===
            <div className="w-full flex items-center justify-between">
              {/* Left Brand Logo */}
              <a href="#" id="nav-logo-mobile" onClick={(e) => handleAnchorClick(e, 'logo')} className="cursor-pointer flex items-center font-sans text-[15px] tracking-[0.16em] font-bold uppercase">
                <span className={`transition-colors duration-500 ${isLightBg ? 'text-[#0B2240]' : 'text-white'}`}>
                  RUKA STUDIO
                </span>
              </a>

              {/* Right Menu capsule based on backdrop */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className={`rounded-full px-5 py-2 text-[9px] font-sans font-bold tracking-[0.16em] transition-all duration-300 cursor-pointer uppercase border ${
                  isLightBg
                    ? 'bg-[#EFECE6]/95 text-[#0B2240] border-[#0B2240]/10 hover:bg-[#e4dfd5]'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                }`}
              >
                MENU
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* === ACCORDION / FULL-SCREEN MENU OVERLAY === */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-[#0a0608]/98 backdrop-blur-2xl flex flex-col justify-between p-8 md:p-16 text-white"
          >
            {/* Overlay Header */}
            <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
              <span className="font-sans text-[16px] md:text-[18px] font-bold tracking-[0.2em] uppercase text-white select-none">
                RUKA STUDIO
              </span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/15 px-[20px] py-2.5 text-[9.5px] font-sans font-bold tracking-[0.18em] text-white cursor-pointer uppercase flex items-center gap-2"
              >
                <span>CLOSE</span>
                <span className="text-[12px] opacity-75">✕</span>
              </button>
            </div>

            {/* Overlay Content / Interactive menu links with stunning numbers */}
            <div className="w-full max-w-7xl mx-auto my-auto flex flex-col items-start gap-8 md:gap-10">
              <div className="text-[#c5a880]/60 text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-mono border-b border-white/10 pb-2 w-full">
                SELECT DESTINATION / 导航
              </div>
              <div className="flex flex-col gap-5 md:gap-8 w-full">
                {[
                  { id: 'projects', label: t.navWork, num: '01' },
                  { id: 'philosophy', label: t.navStudio, num: '02' },
                  { id: 'services', label: t.navProcess, num: '03' },
                  { id: 'hero-section', label: t.navGallery, num: '04' },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleMenuClick(e, item.id)}
                    className="group flex items-baseline gap-4 text-left transition-all duration-300 select-none"
                  >
                    <span className="font-mono text-xs md:text-sm text-[#c5a880]/50 tracking-wider group-hover:text-[#c5a880] transition-colors duration-300">{item.num} //</span>
                    <span className="text-3xl md:text-5xl font-light tracking-[0.08em] uppercase text-white/90 group-hover:text-white group-hover:translate-x-1.5 transition-all duration-300">
                      {item.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Overlay Footer containing shifted EN|ID switcher */}
            <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-8 gap-6 md:gap-0">
              <div className="flex flex-col items-start gap-2.5 select-none">
                <span className="text-[#c5a880]/50 text-[9px] tracking-[0.18em] uppercase font-sans">
                  SYSTEM LANGUAGE
                </span>
                <GlassToggle value={lang} onChange={onLanguageChange} size="md" isLightBg={false} />
              </div>

              <div className="flex flex-col md:items-end gap-3 select-none w-full md:w-auto">
                <a
                  href="mailto:patrons@ruka.studio"
                  className="rounded-full bg-[#c5a880] hover:bg-white text-black text-center px-7 py-3 text-[10px] font-sans font-bold tracking-[0.16em] transition-all duration-300 uppercase flex items-center justify-center gap-2"
                >
                  <span>{t.navContact}</span>
                  <span className="text-[12px] opacity-75">∘</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
