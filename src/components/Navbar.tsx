/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SupportedLanguages, TRANSLATIONS } from '../translations';
import GlassToggle from './GlassToggle';

interface NavbarProps {
  isMobile: boolean;
  isVisible: boolean; // Delayed fade-in on mount
  lang: SupportedLanguages;
  onLanguageChange: (lang: SupportedLanguages) => void;
  isLightBg?: boolean;
}

export default function Navbar({ isMobile, isVisible, lang, onLanguageChange, isLightBg = false }: NavbarProps) {
  const t = TRANSLATIONS[lang];

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

  return (
    <nav
      id="reverie-navbar"
      className="fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out h-20"
      style={{
        opacity: isVisible ? 1 : 0,
        padding: isMobile ? '12px 16px' : '18px 48px',
        backgroundColor: isLightBg ? 'rgba(252, 250, 246, 0.75)' : 'rgba(10, 6, 8, 0.4)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: isLightBg ? '1px solid rgba(11, 34, 64, 0.08)' : '1px solid rgba(255, 255, 255, 0.04)',
        color: isLightBg ? '#0B2240' : '#ffffff'
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {!isMobile ? (
          // Desktop Layout (>=768px): Split Navigation
          <div className="w-full grid grid-cols-3 items-center">
            {/* Left side links with translations */}
            <div className="flex items-center gap-8 justify-start">
              {t.navLinksLeft.map((link, idx) => {
                const originalLinks = ['projects', 'philosophy', 'services'];
                return (
                  <a
                    key={link}
                    id={`nav-link-${originalLinks[idx]}`}
                    href={`#${originalLinks[idx]}`}
                    onClick={(e) => handleAnchorClick(e, originalLinks[idx])}
                    className={`uppercase text-[11px] font-sans font-medium tracking-[0.14em] transition-colors duration-300 no-underline cursor-pointer ${
                      isLightBg ? 'text-[#0B2240]/80 hover:text-[#0B2240]' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {link}
                  </a>
                );
              })}
            </div>

            {/* Center: RUKA STUDIO Branding */}
            <div className="flex justify-center items-center gap-3">
              <a href="#" id="nav-logo" onClick={(e) => handleAnchorClick(e, 'logo')} className="group cursor-pointer flex items-center">
                <span className={`font-serif text-[18px] tracking-[0.2em] font-normal uppercase transition-colors duration-500 ${
                  isLightBg ? 'text-[#0B2240] group-hover:text-[#A4855C]' : 'text-white group-hover:text-[#c5a880]'
                }`}>
                  RUKA STUDIO
                </span>
              </a>
            </div>

            {/* Right side links + language switcher */}
            <div className="flex items-center gap-8 justify-end">
              {t.navLinksRight.map((link, idx) => {
                const originalLinks = ['journal', 'contact'];
                return (
                  <a
                    key={link}
                    id={`nav-link-${originalLinks[idx]}`}
                    href={`#${originalLinks[idx]}`}
                    onClick={(e) => handleAnchorClick(e, originalLinks[idx])}
                    className={`uppercase text-[11px] font-sans font-medium tracking-[0.14em] transition-colors duration-300 no-underline cursor-pointer ${
                      isLightBg ? 'text-[#0B2240]/80 hover:text-[#0B2240]' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {link}
                  </a>
                );
              })}

              {/* Bespoke multilingual switcher */}
              <div className={`flex items-center border-l pl-6 ml-2 select-none transition-colors duration-500 ${
                isLightBg ? 'border-[#0B2240]/10' : 'border-white/20'
              }`}>
                <GlassToggle value={lang} onChange={onLanguageChange} size="md" isLightBg={isLightBg} />
              </div>
            </div>
          </div>
        ) : (
          // Mobile Layout (<768px): Centered logo with Projects/Language on left, Contact on right
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <a
                id="nav-link-projects"
                href="#projects"
                onClick={(e) => handleAnchorClick(e, 'projects')}
                className={`uppercase text-[10px] font-sans font-medium tracking-[0.14em] transition-colors duration-300 no-underline ${
                  isLightBg ? 'text-[#0B2240]/80 hover:text-[#0B2240]' : 'text-white/85 hover:text-white'
                }`}
              >
                {t.navProjects}
              </a>
              <div className={`flex items-center border-l pl-3 select-none transition-colors duration-500 ${
                isLightBg ? 'border-[#0B2240]/10' : 'border-white/20'
              }`}>
                <GlassToggle value={lang} onChange={onLanguageChange} size="sm" isLightBg={isLightBg} />
              </div>
            </div>

            <a href="#" id="nav-logo-mobile" onClick={(e) => handleAnchorClick(e, 'logo')} className="cursor-pointer flex items-center z-10 font-serif text-[13px] tracking-[0.18em] font-normal uppercase">
              <span className={`transition-colors duration-500 ${isLightBg ? 'text-[#0B2240]' : 'text-white'}`}>
                RUKA
              </span>
            </a>

            <a
              id="nav-link-contact"
              href="#contact"
              onClick={(e) => handleAnchorClick(e, 'contact')}
              className={`uppercase text-[10px] font-sans font-medium tracking-[0.14em] transition-colors duration-300 no-underline opacity-100 ${
                isLightBg ? 'text-[#0B2240]/80 hover:text-[#0B2240]' : 'text-white/85 hover:text-white'
              }`}
            >
              {t.navContact}
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
