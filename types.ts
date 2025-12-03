export interface ContactInfo {
  phone: string;
  email: string;
  location: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location?: string;
  description?: string;
  achievements: {
    category?: string;
    items: string[];
  }[];
}

export interface EducationItem {
  degree: string;
  school: string;
  period: string;
}

export interface CertificationItem {
  name: string;
  status: string;
}

export interface CompetencyGroup {
  category: string;
  skills: string;
}

export interface ResumeData {
  name: string;
  title: string;
  summary: string;
  contact: ContactInfo;
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  competencies: CompetencyGroup[];
}

export interface ThemeConfig {
  id: string;
  name: string;
  colors: {
    primary: string;    // Headings, Names
    secondary: string;  // Subheadings, Icons
    accent: string;     // Borders, Bullets
    text: string;       // Body text
    bg: string;         // Background
  };
  font: {
    body: string;
    header: string;
  };
  layout: 'classic' | 'modern' | 'compact';
}
