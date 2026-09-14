import configData from "./portfolioConfig.json";

export interface DeveloperConfig {
  name: string;
  firstName: string;
  lastName: string;
  initials: string;
  role: string;
  title: string;
  experienceYears: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  github: string;
  linkedin: string;
  instagram: string;
  facebook: string;
}

export interface NavigationItem {
  name: string;
  href: string;
}

export interface HeroConfig {
  availabilityBadge: string;
  tagline: string;
  stats: Array<{ value: string; label: string }>;
  floatingBadges: Array<{
    label: string;
    color: string;
    border: string;
    text: string;
    top: string;
    left: string;
    delay: number;
  }>;
  techStreams: Array<{
    name: string;
    tag: string;
    speed: string;
    color: string;
  }>;
}

export interface AboutConfig {
  bioParagraphs: string[];
  traits: string[];
  focusAreas: Array<{ label: string; icon?: string; color: string }>;
}

export interface SkillItemConfig {
  name: string;
  icon: string;
  color?: string;
}

export interface SkillCategoryConfig {
  title: string;
  icon: string;
  iconColor: string;
  accent: string;
  border: string;
  skills: SkillItemConfig[];
}

export interface SkillsConfig {
  marquee: SkillItemConfig[];
  categories: SkillCategoryConfig[];
}

export interface RoleConfig {
  period: string;
  role: string;
  company: string;
  location: string;
  badge: string;
  type?: string;
  hasCertificate?: boolean;
  responsibilities: string[];
  tech: string[];
}

export interface ProjectConfig {
  number: string;
  title: string;
  description: string;
  tech: string[];
  github: string | null;
  live: string | null;
  isPrivate: boolean;
  featured: boolean;
  gradient: string;
  accentBorder: string;
  tagColor: string;
}

export interface EducationConfig {
  title: string;
  field: string;
  school: string;
  gradient: string;
  iconBg: string;
  iconColor: string;
  border: string;
}

export interface PortfolioConfig {
  developer: DeveloperConfig;
  navigation: NavigationItem[];
  hero: HeroConfig;
  about: AboutConfig;
  skills: SkillsConfig;
  experience: {
    roles: RoleConfig[];
    certificate?: any;
  };
  projects: ProjectConfig[];
  education: EducationConfig[];
  contactOptions: {
    subjectOptions: string[];
    budgetRanges: Array<{ value: string; label: string }>;
  };
  aiChat: {
    maxDailyChats: number;
    maxDailyRefinements: number;
    suggestedPrompts: string[];
  };
}

export const portfolioConfig: PortfolioConfig = configData as PortfolioConfig;
export default portfolioConfig;
