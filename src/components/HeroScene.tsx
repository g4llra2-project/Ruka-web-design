/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { BACKGROUNDS } from '../types';
import { clamp } from '../utils';
import { SupportedLanguages, TRANSLATIONS } from '../translations';

interface HeroSceneProps {
  scrollProgress: number;
  heroScrollProgress: number;
  lang: SupportedLanguages;
  activeBgIndex: number;
  onBgChange: (index: number) => void;
}

export default function HeroScene({ scrollProgress, heroScrollProgress, lang, activeBgIndex, onBgChange }: HeroSceneProps) {
  const t = TRANSLATIONS[lang];
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [mounted, setMounted] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    
    // Mount delay
    const timer = setTimeout(() => {
      setMounted(true);
    }, 600); // UI fades in after 600ms as per specs

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1100;
  const isDesktop = windowWidth >= 1100;

  // Hero section opacity smooth fade-out on scroll
  // Keeps the text fully visible until the portal is fully zoomed in (heroScrollProgress hits 0.75),
  // then fades out smoothly to allow uncluttered visual space before transition.
  const opacity = clamp(1 - (heroScrollProgress - 0.75) / 0.23, 0, 1);

  // Layout-specific styling values
  let containerClasses = '';

  if (isMobile) {
    containerClasses = 'flex flex-col items-center text-center px-4 pt-16 pb-8 justify-center min-h-[90vh]';
  } else if (isTablet) {
    containerClasses = 'flex flex-col items-center text-center px-8 pt-24 pb-8 justify-center min-h-[85vh]';
  } else {
    containerClasses = 'relative w-full h-full max-w-7xl mx-auto px-12';
  }

  // Cards layout logic
  // Render Card
  const renderCard = (index: number, orderLabel: string) => {
    const bg = BACKGROUNDS[index];
    const isSelected = activeBgIndex === index;
    const isHovered = hoveredCard === index;
    const name = lang === 'EN' ? bg.nameEN : bg.nameID;

    // Width adjustments for high density responsive rows
    const cardWidth = isMobile ? '128px' : '150px';
    const cardHeight = isMobile ? '128px' : '150px';

    return (
      <div
        key={index}
        id={`hero-card-${index}`}
        onClick={() => onBgChange(index)}
        className={`glass relative flex-shrink-0 group overflow-hidden transition-all duration-500 cursor-pointer ${
          isSelected 
            ? 'border border-[#c5a880] shadow-[0_0_18px_rgba(197,168,128,0.45)]' 
            : 'border border-white/10 hover:border-white/25 shadow-lg'
        }`}
        style={{
          width: cardWidth,
          height: cardHeight,
          borderRadius: '0px',
          transform: isHovered 
            ? 'translateY(-6px) scale(1.03)' 
            : 'translateY(0)',
        }}
        onMouseEnter={() => setHoveredCard(index)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        {/* Card Image */}
        <img
          src={bg.url}
          alt={name}
          referrerPolicy="no-referrer"
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 ${
            isSelected ? 'opacity-90 saturate-100' : 'opacity-55 group-hover:opacity-75 saturate-50'
          }`}
        />

        {/* Selected Accent Glow Square Indicator */}
        {isSelected && (
          <div className="absolute top-3 right-3 w-2 h-2 bg-[#c5a880] animate-pulse shadow-[0_0_8px_rgba(197,168,128,0.9)] z-20" />
        )}

        {/* Index Number Badge */}
        <div className="absolute top-3 left-4 font-mono text-[9px] tracking-wider opacity-60 text-white z-20">
          {orderLabel}
        </div>

        {/* Bottom linear gradient & overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-t from-black/95 via-black/45 to-transparent">
          <div className="flex flex-col gap-0.5 z-10 text-left">
            {/* Tiny aesthetic square button resembling attachment images */}
            <div className="flex items-center gap-1.5 mb-0.5">
              <div className={`w-3.5 h-3.5 rounded-none flex items-center justify-center border transition-all duration-300 ${
                isSelected 
                  ? 'bg-[#c5a880]/20 border-[#c5a880]' 
                  : 'bg-white/10 border-white/20 group-hover:border-white/45'
              }`}>
                <div className={`w-1 h-1 rounded-none ${isSelected ? 'bg-[#c5a880]' : 'bg-white/50 group-hover:bg-white'}`} />
              </div>
              <span className={`text-[7px] font-mono tracking-widest uppercase transition-colors duration-350 ${
                isSelected ? 'text-[#c5a880]' : 'text-white/40 group-hover:text-white/70'
              }`}>
                {isSelected ? (lang === 'EN' ? 'ACTIVE' : 'AKTIF') : (lang === 'EN' ? 'EXPLORE' : 'JELAJAH')}
              </span>
            </div>
            
            <span className="font-serif text-[10px] sm:text-[11px] leading-tight text-white tracking-wide line-clamp-2 select-none">
              {name}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      id="hero-scene"
      className="absolute inset-0 w-full h-full flex items-center justify-center transition-all bg-transparent"
      style={{
        zIndex: 30,
        opacity: mounted ? opacity : 0,
        pointerEvents: opacity > 0.05 ? 'auto' : 'none',
        // Slide upward by 20px on mount with opacity transition 0.9s ease delayed by 300ms
        transform: mounted ? 'translateY(0px)' : 'translateY(20px)',
        transition: 'transform 0.9s ease, opacity 0.4s ease',
      }}
    >
      <div className={`${containerClasses} w-full`}>
        {/* MOBILE LAYOUT (<768px) */}
        {isMobile && (
          <div className="flex flex-col items-center justify-center gap-5 mt-4 w-full">
            <div className="space-y-2 px-2">
              <h1
                id="hero-title-mobile"
                className="font-serif text-[32px] font-normal tracking-[0.1em] leading-tight text-white uppercase"
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
              >
                {t.heroTitle}
              </h1>
              <p
                id="hero-subheading-mobile"
                className="font-sans text-[12px] leading-relaxed mx-auto select-none opacity-85"
                style={{ color: 'rgba(255, 255, 255, 0.85)', maxWidth: '300px', textShadow: '0 1px 6px rgba(0,0,0,0.4)', minHeight: '60px' }}
              >
                {t.heroSubMobile}
              </p>
            </div>

            {/* Horizontal Swipeable list of cards on mobile */}
            <div className="mt-2 flex items-center justify-start gap-3.5 w-full overflow-x-auto pb-4 px-4 scrollbar-none snap-x snap-mandatory">
              <div className="flex-shrink-0 w-2" /> {/* alignment spacing */}
              {[0, 1, 2, 3].map((idx) => (
                <div key={idx} className="snap-center">
                  {renderCard(idx, `0${idx + 1}`)}
                </div>
              ))}
              <div className="flex-shrink-0 w-2" />
            </div>
          </div>
        )}

        {/* TABLET LAYOUT (768px - 1100px) */}
        {isTablet && (
          <div className="flex flex-col items-center justify-center gap-8 mt-12 w-full">
            <div className="space-y-4">
              <h1
                id="hero-title-tablet"
                className="font-serif text-[48px] font-normal tracking-[0.08em] leading-tight text-white uppercase"
                style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
              >
                {t.heroTitle}
              </h1>
              <p
                id="hero-subheading-tablet"
                className="font-sans text-[14px] leading-relaxed mx-auto opacity-85"
                style={{ color: 'rgba(255, 255, 255, 0.85)', maxWidth: '520px', textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}
              >
                {t.heroSubTablet}
              </p>
            </div>

            {/* Row of 4 cards on tablet */}
            <div className="flex items-center justify-center gap-4 mt-2 w-full px-4 overflow-x-auto pb-4">
              {[0, 1, 2, 3].map((idx) => renderCard(idx, `0${idx + 1}`))}
            </div>
          </div>
        )}

        {/* DESKTOP LAYOUT (>=1100px) */}
        {isDesktop && (
          <div className="w-full h-full relative">
            {/* Left Container */}
            <div
              id="hero-left-container"
              className="absolute left-[80px] flex flex-col gap-6"
              style={{
                top: '46%',
                transform: 'translateY(-50%)',
                maxWidth: '440px',
              }}
            >
              <h1
                id="hero-title-desktop"
                className="font-serif text-[76px] lg:text-[84px] leading-[0.9] tracking-tight mb-6 text-white uppercase"
              >
                {t.heroTitle}
              </h1>
              <p
                id="hero-subheading-desktop"
                className="font-sans text-[14px] leading-relaxed opacity-80 tracking-wide max-w-[340px] text-white"
                style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)', minHeight: '80px' }}
              >
                {t.heroSubDesktop}
              </p>
            </div>

            {/* Right Container of 4 selectable Cards */}
            <div
              id="hero-right-container"
              className="absolute right-[40px] xl:right-[60px] flex items-center gap-4 xl:gap-5"
              style={{
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              {[0, 1, 2, 3].map((idx) => renderCard(idx, `0${idx + 1}`))}
            </div>
          </div>
        )}

        {/* Slider Dots (Bottom Left/Center) */}
        <div
          id="hero-slider-indicators"
          className={`absolute flex items-center gap-3 z-40 ${
            isMobile || isTablet 
              ? 'bottom-2 left-1/2 -translate-x-1/2 mt-2' 
              : 'bottom-10 left-12'
          }`}
        >
          {[0, 1, 2, 3].map((idx) => {
            const isActive = activeBgIndex === idx;
            return (
              <button
                key={idx}
                id={`slide-dot-${idx}`}
                onClick={() => onBgChange(idx)}
                className="h-[4px] bg-white rounded-none transition-all duration-500 ease-out hover:opacity-100 cursor-pointer outline-none focus:ring-1 focus:ring-[#c5a880]/40"
                style={{
                  width: isActive ? '28px' : '12px',
                  opacity: isActive ? 1 : 0.3,
                }}
                aria-label={`Switch to background ${idx + 1}`}
              />
            );
          })}
        </div>

        {/* Scroll Cue (Descend) - Hidden on Mobile */}
        {!isMobile && (
          <div
            id="hero-scroll-cue"
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-50"
            style={{ bottom: '40px' }}
          >
            <span className="uppercase text-[9px] font-sans tracking-[0.3em] opacity-40 text-white select-none">
              {t.descend}
            </span>
            {/* Chevron surrounded by a sharp square border with bobUp animation */}
            <div
              id="scroll-cue-circle"
              className="w-8 h-8 rounded-none border border-white/20 flex items-center justify-center animate-bobUp backdrop-blur-[2px] transition-colors duration-300 hover:border-white/50 cursor-pointer"
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight * 1.5,
                  behavior: 'smooth'
                });
              }}
            >
              <svg
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                className="opacity-60"
              >
                <path d="M1 1L6 6L11 1" stroke="white" strokeWidth="1.5" />
              </svg>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
