import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { ContactInfo, ThemeConfig } from '../types';

interface ResumeHeaderProps {
  name: string;
  title: string;
  contact: ContactInfo;
  theme: ThemeConfig;
  profileImage?: string;
}

export const ResumeHeader: React.FC<ResumeHeaderProps> = ({ name, title, contact, theme, profileImage }) => {
  const avatarUrl = profileImage || "https://picsum.photos/400/500?grayscale";

  return (
    <header className={`flex flex-col-reverse md:flex-row justify-between items-start gap-8 mb-10 pb-8 border-b ${theme.colors.accent.replace('border-', 'border-opacity-30 border-')}`}>
      <div className="flex-1 space-y-4">
        <div>
          <h1 className={`text-4xl md:text-5xl font-extrabold tracking-tight uppercase leading-none ${theme.colors.primary} ${theme.font.header}`}>
            {name}
          </h1>
          <p className={`text-lg md:text-xl font-medium mt-2 ${theme.colors.secondary} ${theme.font.body}`}>
            {title}
          </p>
        </div>

        <div className={`flex flex-col gap-2 mt-4 text-sm md:text-base ${theme.colors.text}`}>
          {contact.location && (
            <div className="flex items-center gap-3">
              <MapPin size={18} className="shrink-0" />
              <span>{contact.location}</span>
            </div>
          )}
          {contact.phone && (
            <div className="flex items-center gap-3">
              <Phone size={18} className="shrink-0" />
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="hover:opacity-80 transition-opacity">
                {contact.phone}
              </a>
            </div>
          )}
          {contact.email && (
             <div className="flex items-center gap-3">
              <Mail size={18} className="shrink-0" />
              <a href={`mailto:${contact.email}`} className="hover:opacity-80 transition-opacity">
                {contact.email}
              </a>
            </div>
          )}
        </div>
      </div>

      <div className={`w-32 h-40 md:w-40 md:h-52 shrink-0 bg-gray-200 overflow-hidden shadow-sm border ${theme.colors.accent} self-center md:self-start`}>
        <img 
          src={avatarUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
    </header>
  );
};
