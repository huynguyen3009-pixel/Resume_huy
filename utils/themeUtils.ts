import { ThemeConfig } from '../types';

const THEMES: ThemeConfig[] = [
  {
    id: 'minimal-slate',
    name: 'Minimal Slate',
    colors: {
      primary: 'text-slate-900',
      secondary: 'text-slate-600',
      accent: 'border-slate-800',
      text: 'text-slate-700',
      bg: 'bg-white'
    },
    font: {
      body: 'font-sans',
      header: 'font-sans'
    },
    layout: 'classic'
  },
  {
    id: 'executive-blue',
    name: 'Executive Blue',
    colors: {
      primary: 'text-blue-900',
      secondary: 'text-blue-700',
      accent: 'border-blue-900',
      text: 'text-gray-700',
      bg: 'bg-slate-50'
    },
    font: {
      body: 'font-sans',
      header: 'font-serif'
    },
    layout: 'modern'
  },
  {
    id: 'emerald-clean',
    name: 'Emerald Clean',
    colors: {
      primary: 'text-emerald-900',
      secondary: 'text-emerald-700',
      accent: 'border-emerald-600',
      text: 'text-gray-800',
      bg: 'bg-stone-50'
    },
    font: {
      body: 'font-sans',
      header: 'font-sans'
    },
    layout: 'modern'
  },
  {
    id: 'monochrome-bold',
    name: 'Monochrome Bold',
    colors: {
      primary: 'text-black',
      secondary: 'text-gray-600',
      accent: 'border-black',
      text: 'text-black',
      bg: 'bg-white'
    },
    font: {
      body: 'font-mono',
      header: 'font-sans'
    },
    layout: 'compact'
  }
];

export const getRandomTheme = (): ThemeConfig => {
  const randomIndex = Math.floor(Math.random() * THEMES.length);
  return THEMES[randomIndex];
};

export const getThemeById = (id: string): ThemeConfig => {
  return THEMES.find(t => t.id === id) || THEMES[0];
}
