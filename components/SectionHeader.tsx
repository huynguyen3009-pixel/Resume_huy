import React from 'react';
import { ThemeConfig } from '../types';

interface SectionHeaderProps {
  title: string;
  icon?: React.ReactNode;
  theme: ThemeConfig;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, icon, theme }) => {
  return (
    <div className={`flex items-center gap-3 border-b-2 ${theme.colors.accent} pb-2 mb-6 mt-8`}>
      {icon && <span className={theme.colors.secondary}>{icon}</span>}
      <h2 className={`text-xl font-bold uppercase tracking-wide ${theme.colors.primary} ${theme.font.header}`}>
        {title}
      </h2>
    </div>
  );
};
