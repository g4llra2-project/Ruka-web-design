/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TranslationSchema {
  navLinksLeft: string[];
  navLinksRight: string[];
  navProjects: string;
  navContact: string;
  pullToOpen: string;
  heroTitle: string;
  heroSubMobile: string;
  heroSubTablet: string;
  heroSubDesktop: string;
  viewReel: string;
  worldPatrons: string;
  descend: string;
  ctaTitle: string;
  ctaParagraph: string;
}

export type SupportedLanguages = 'EN' | 'ID';

export const TRANSLATIONS: Record<SupportedLanguages, TranslationSchema> = {
  EN: {
    navLinksLeft: ['Projects', 'Philosophy', 'Services'],
    navLinksRight: ['Journal', 'Contact'],
    navProjects: 'Projects',
    navContact: 'Contact',
    pullToOpen: 'PULL TO OPEN',
    heroTitle: 'SHAPE › THE UNBUILT',
    heroSubMobile: 'Bespoke high-end architectural systems designed by RUKA STUDIO. We transform challenging, steep elevations into custom residential sanctuaries.',
    heroSubTablet: 'Custom residential sanctuaries created by RUKA STUDIO. We construct high-end architectural masterworks in perfect dialogue with steep elevations, cliffside terrains, and custom landscapes.',
    heroSubDesktop: 'Bespoke high-end architectural systems designed by RUKA STUDIO. We transform challenging, steep elevations into custom residential sanctuaries in perfect dialogue with natural rock.',
    viewReel: 'View Reel',
    worldPatrons: 'World\nPatrons',
    descend: 'Descend',
    ctaTitle: 'DESIGN BEYOND HORIZONS',
    ctaParagraph: 'Bespoke high-end architectural systems, engineered for challenging topographies and curated for individuals demanding modern clarity.',
  },
  ID: {
    navLinksLeft: ['Proyek', 'Filosofi', 'Layanan'],
    navLinksRight: ['Jurnal', 'Kontak'],
    navProjects: 'Proyek',
    navContact: 'Kontak',
    pullToOpen: 'TARIK UNTUK MEMBUKA',
    heroTitle: 'WUJUDKAN › YANG BELUM TERBANGUN',
    heroSubMobile: 'Sistem arsitektur mewah yang dirancang khusus oleh RUKA STUDIO. Kami mengubah tebing curam yang menantang menjadi tempat tinggal perlindungan yang menawan.',
    heroSubTablet: 'Tempat tinggal perlindungan mewah yang diciptakan oleh RUKA STUDIO. Kami membangun mahakarya arsitektur kelas atas yang berdialog harmonis dengan kemiringan curam, lanskap bebatuan, dan alam sekitar.',
    heroSubDesktop: 'Sistem arsitektur mewah yang dirancang khusus oleh RUKA STUDIO. Kami mentransformasikan tebing curam dan ketinggian yang menantang menjadi hunian peristirahatan yang selaras dengan formasi batu alam.',
    viewReel: 'Lihat Reel',
    worldPatrons: 'Patron\nDunia',
    descend: 'Turun',
    ctaTitle: 'DESAIN MELAMPAUI CAKRAWALA',
    ctaParagraph: 'Sistem arsitektur mahakarya yang dirancang untuk topografi ekstrem dan dikurasi bagi pribadi yang mendambakan kejernihan modern.',
  }
};
