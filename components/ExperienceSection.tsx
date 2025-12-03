import React from 'react';
import { ExperienceItem, ThemeConfig } from '../types';

interface ExperienceSectionProps {
  data: ExperienceItem[];
  theme: ThemeConfig;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ data, theme }) => {
  return (
    <div className="space-y-8">
      {data.map((job, index) => (
        <div key={index} className="relative">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-3">
            <h3 className={`text-lg font-bold ${theme.colors.primary} ${theme.font.header}`}>{job.company}</h3>
            <span className={`text-sm font-medium px-3 py-1 rounded-full whitespace-nowrap mt-1 sm:mt-0 w-fit ${theme.colors.secondary} bg-gray-100`}>
              {job.period}
            </span>
          </div>
          
          <div className={`text-base font-semibold mb-3 italic ${theme.colors.text}`}>
            {job.role}
          </div>

          <div className="space-y-4">
            {job.achievements.map((group, gIndex) => (
              <div key={gIndex}>
                {group.category && (
                  <h4 className={`text-sm font-bold mb-2 uppercase tracking-wider border-l-4 pl-2 ${theme.colors.secondary} ${theme.colors.accent}`}>
                    {group.category}
                  </h4>
                )}
                <ul className={`list-disc list-outside ml-5 space-y-1.5 leading-relaxed ${theme.colors.text}`}>
                  {group.items.map((item, iIndex) => (
                    <li key={iIndex} className="text-sm md:text-base pl-1">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
