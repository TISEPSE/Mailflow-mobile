export type ThemeMode = 'light' | 'dark';

export interface Account {
  email: string;
  name: string;
  initials: string;
  avatarBg: string;
  avatarFg: string;
  photo?: string;
  isPrimary?: boolean;
}

export interface MailMessage {
  id: string;
  from: string;
  email: string;
  initials: string;
  time: string;
  full: string;
  unread: boolean;
  subject: string;
  snippet: string;
  body: string[];
  accountEmail?: string;
}

export interface PromoMessage {
  id: string;
  name: string;
  email: string;
  time: string;
  subject: string;
  snippet: string;
  body: string[];
}

export interface NewsletterItem {
  id: string;
  name: string;
  email: string;
  initials: string;
  time: string;
  tags: string[];
  logoBg: string;
  logoFg: string;
  summary: string;
}

export interface TrainingItem {
  id: string;
  org: string;
  logo: string;
  logoBg: string;
  logoFg: string;
  rail: string;
  kind: string;
  dayName: string;
  dayNum: string;
  monthName: string;
  soon: boolean;
  title: string;
  when: string;
  automated: boolean;
}

export type RuleCategory = 'publicite' | 'newsletter' | 'formation';
export type RuleAction = 'supprimer_toujours' | 'generer_resume_et_archiver' | 'archiver_automatique';

export interface AutoRule {
  id: string;
  email: string;
  nom: string;
  cat: RuleCategory;
  action: RuleAction;
  day?: string;
  hour?: string;
  active: boolean;
  date: string;
}

export interface TrashItem {
  tid: string;
  kind: string;
  item: any;
  label: string;
  sub?: string;
}

export type ActiveScreen = 
  | null 
  | 'mail' 
  | 'promo' 
  | 'digest' 
  | 'settings' 
  | 'newRule' 
  | 'compose' 
  | 'search' 
  | 'onboarding';

export type ActiveSheet = 
  | null 
  | 'folder' 
  | 'trainingSchedule';

export interface NotificationSettings {
  direct: boolean;
  digest: boolean;
  ruleFired: boolean;
  quiet: string;
}

export interface AppSettings {
  syncLaunch: boolean;
  ai: boolean;
  freq: string;
  model: string;
  defaultDay: string;
  defaultHour: string;
  theme: ThemeMode;
  accentColor: string;
}
