import { useState, useEffect } from 'react';
import { 
  Account, MailMessage, PromoMessage, NewsletterItem, 
  TrainingItem, AutoRule, TrashItem, ActiveScreen, 
  ActiveSheet, ThemeMode, AppSettings, NotificationSettings 
} from '../types';
import { 
  INITIAL_ACCOUNTS, INITIAL_MAILS, INITIAL_PROMOS, 
  INITIAL_NEWS, INITIAL_TRAININGS, INITIAL_RULES, AI_SUMMARIES_MOCK 
} from './mockData';
import { tauriBridge } from './tauri';

export interface AppState {
  tab: number;
  screen: ActiveScreen;
  sheet: ActiveSheet;
  theme: ThemeMode;
  accentColor: string;
  isFrameEnabled: boolean;
  
  // Accounts
  account: string;
  accounts: Account[];
  acctOpen: boolean;
  
  // Onboarding & Sync
  onboarded: boolean;
  obStep: number;
  obPick: string;
  syncPct: number;
  syncFail: boolean;
  syncAttempt: number;
  syncStep: string;
  
  // Items
  mails: MailMessage[];
  promos: PromoMessage[];
  news: NewsletterItem[];
  trainings: TrainingItem[];
  rules: AutoRule[];
  trash: TrashItem[];
  archived: Record<string, number>;
  
  // Folders
  folders: [string, string][];
  dest: Record<number, string>;
  folderDraft: string;
  destFor: number | null;
  
  // Training schedules
  trainDays: Record<string, string>;
  trainHours: Record<string, string>;
  
  // Current selection
  selectedMailId: string | null;
  selectedPromoId: string | null;
  tag: string;
  query: string;
  
  // Compose
  composeMode: 'new' | 'reply';
  cpTo: string;
  cpSubject: string;
  cpBody: string;
  cpError: string;
  
  // Rule editor
  editingRuleId: string | null;
  nr: {
    email: string;
    nom: string;
    cat: 'publicite' | 'newsletter' | 'formation';
    action: 'supprimer_toujours' | 'generer_resume_et_archiver' | 'archiver_automatique';
    day: string;
    hour: string;
  };
  
  // AI
  aiSum: Record<string, 'idle' | 'busy' | 'done'>;
  
  // Settings
  settings: AppSettings;
  notif: NotificationSettings;
  
  // Toast
  toast: string | null;
  undoAction: (() => void) | null;
}

const STORAGE_KEY = 'mailflow_mobile_state_v1';

function getInitialState(): AppState {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        toast: null,
        undoAction: null,
        screen: null,
        sheet: null,
        acctOpen: false,
      };
    }
  } catch (e) {
    console.error('Failed to load state from localStorage', e);
  }

  return {
    tab: 1,
    screen: null,
    sheet: null,
    theme: 'light',
    accentColor: '#0B57D0',
    isFrameEnabled: true,
    
    account: INITIAL_ACCOUNTS[0].email,
    accounts: INITIAL_ACCOUNTS,
    acctOpen: false,
    
    onboarded: true,
    obStep: 0,
    obPick: INITIAL_ACCOUNTS[0].email,
    syncPct: 0,
    syncFail: false,
    syncAttempt: 0,
    syncStep: 'Connexion à Gmail…',
    
    mails: INITIAL_MAILS,
    promos: INITIAL_PROMOS,
    news: INITIAL_NEWS,
    trainings: INITIAL_TRAININGS,
    rules: INITIAL_RULES,
    trash: [],
    archived: {},
    
    folders: [
      ['Archives', 'inventory_2'],
      ['Envoyés', 'send'],
      ['Publicités', 'sell'],
      ['Newsletters', 'newspaper'],
      ['Formations', 'school'],
      ['À lire plus tard', 'bookmark']
    ],
    dest: { 1: 'Archives', 3: 'Newsletters', 4: 'Formations' },
    folderDraft: '',
    destFor: null,
    
    trainDays: {},
    trainHours: {},
    
    selectedMailId: null,
    selectedPromoId: null,
    tag: 'Tous',
    query: '',
    
    composeMode: 'new',
    cpTo: '',
    cpSubject: '',
    cpBody: '',
    cpError: '',
    
    editingRuleId: null,
    nr: {
      email: '',
      nom: '',
      cat: 'publicite',
      action: 'supprimer_toujours',
      day: 'vendredi',
      hour: '18:00'
    },
    
    aiSum: {},
    
    settings: {
      syncLaunch: true,
      ai: true,
      freq: '5 min',
      model: 'Gemini 1.5 Flash',
      defaultDay: 'vendredi',
      defaultHour: '18:00',
      theme: 'light',
      accentColor: '#0B57D0'
    },
    
    notif: {
      direct: true,
      digest: true,
      ruleFired: false,
      quiet: '22 h → 7 h'
    },
    
    toast: null,
    undoAction: null
  };
}

let globalState = getInitialState();
const listeners = new Set<() => void>();

function notify() {
  try {
    const toSave = {
      ...globalState,
      toast: null,
      undoAction: null,
      screen: null,
      sheet: null
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (e) {
    console.error('Storage save error', e);
  }
  listeners.forEach(l => l());
}

let toastTimer: any = null;

export const store = {
  getState: () => globalState,
  
  setState: (updater: Partial<AppState> | ((prev: AppState) => Partial<AppState>)) => {
    const next = typeof updater === 'function' ? updater(globalState) : updater;
    globalState = { ...globalState, ...next };
    notify();
  },
  
  flash: (msg: string, undo?: () => void) => {
    if (toastTimer) clearTimeout(toastTimer);
    globalState = {
      ...globalState,
      toast: msg,
      undoAction: undo || null
    };
    notify();
    toastTimer = setTimeout(() => {
      globalState = {
        ...globalState,
        toast: null,
        undoAction: null
      };
      notify();
    }, undo ? 4500 : 2500);
  },
  
  triggerUndo: () => {
    if (globalState.undoAction) {
      globalState.undoAction();
      globalState = { ...globalState, toast: null, undoAction: null };
      notify();
    }
  },
  
  // Mail actions
  openMail: (id: string) => {
    globalState = {
      ...globalState,
      selectedMailId: id,
      screen: 'mail',
      mails: globalState.mails.map(m => m.id === id ? { ...m, unread: false } : m)
    };
    tauriBridge.markAsRead(id);
    notify();
  },
  
  trashMail: (id: string) => {
    const mail = globalState.mails.find(m => m.id === id);
    if (!mail) return;
    
    const prevMails = globalState.mails;
    const newMails = globalState.mails.filter(m => m.id !== id);
    const newTrash = [
      { tid: `mail-${id}-${Date.now()}`, kind: 'mail', item: mail, label: mail.subject, sub: mail.from },
      ...globalState.trash
    ];
    
    globalState = {
      ...globalState,
      mails: newMails,
      trash: newTrash,
      screen: globalState.screen === 'mail' && globalState.selectedMailId === id ? null : globalState.screen
    };
    notify();
    
    tauriBridge.moveToTrash(id);
    
    store.flash('Message déplacé dans la corbeille', () => {
      globalState = {
        ...globalState,
        mails: prevMails,
        trash: globalState.trash.filter(t => t.item.id !== id)
      };
      notify();
    });
  },

  archiveMail: (id: string, folder = 'Archives') => {
    const mail = globalState.mails.find(m => m.id === id);
    if (!mail) return;
    
    const prevMails = globalState.mails;
    const newMails = globalState.mails.filter(m => m.id !== id);
    const archivedCount = (globalState.archived[folder] || 0) + 1;
    
    globalState = {
      ...globalState,
      mails: newMails,
      archived: { ...globalState.archived, [folder]: archivedCount },
      screen: globalState.screen === 'mail' && globalState.selectedMailId === id ? null : globalState.screen
    };
    notify();
    
    store.flash(`Archivé dans « ${folder} »`, () => {
      globalState = {
        ...globalState,
        mails: prevMails,
        archived: { ...globalState.archived, [folder]: Math.max(0, archivedCount - 1) }
      };
      notify();
    });
  },

  // AI Summary
  requestAiSummary: async (mailId: string) => {
    globalState = {
      ...globalState,
      aiSum: { ...globalState.aiSum, [mailId]: 'busy' }
    };
    notify();

    await tauriBridge.generateSummary(mailId);
    
    globalState = {
      ...globalState,
      aiSum: { ...globalState.aiSum, [mailId]: 'done' }
    };
    notify();
  },

  // Promo actions
  openPromo: (id: string) => {
    globalState = { ...globalState, selectedPromoId: id, screen: 'promo' };
    notify();
  },

  trashPromo: (id: string) => {
    const p = globalState.promos.find(x => x.id === id);
    if (!p) return;
    const prevPromos = globalState.promos;
    globalState = {
      ...globalState,
      promos: globalState.promos.filter(x => x.id !== id),
      trash: [{ tid: `promo-${id}-${Date.now()}`, kind: 'promo', item: p, label: p.subject, sub: p.name }, ...globalState.trash],
      screen: globalState.screen === 'promo' && globalState.selectedPromoId === id ? null : globalState.screen
    };
    notify();

    store.flash('Publicité supprimée', () => {
      globalState = {
        ...globalState,
        promos: prevPromos,
        trash: globalState.trash.filter(t => t.item.id !== id)
      };
      notify();
    });
  },

  blockAndTrashPromo: (id: string) => {
    const p = globalState.promos.find(x => x.id === id);
    if (!p) return;
    store.trashPromo(id);
    
    const newRule: AutoRule = {
      id: `rule_${p.id}`,
      email: p.email,
      nom: p.name,
      cat: 'publicite',
      action: 'supprimer_toujours',
      active: true,
      date: new Date().toLocaleDateString('fr-FR')
    };

    globalState = {
      ...globalState,
      rules: [newRule, ...globalState.rules.filter(r => r.email !== p.email)]
    };
    notify();
    store.flash(`Règle créée : ${p.email} ira toujours à la corbeille`);
  },

  // Rule actions
  toggleRule: (id: string) => {
    globalState = {
      ...globalState,
      rules: globalState.rules.map(r => r.id === id ? { ...r, active: !r.active } : r)
    };
    notify();
  },

  deleteRule: (id: string) => {
    globalState = {
      ...globalState,
      rules: globalState.rules.filter(r => r.id !== id),
      screen: null,
      editingRuleId: null
    };
    notify();
    store.flash('Règle supprimée');
  },

  saveRule: (rule: AutoRule) => {
    const exists = globalState.rules.some(r => r.id === rule.id);
    const rules = exists
      ? globalState.rules.map(r => r.id === rule.id ? rule : r)
      : [rule, ...globalState.rules];

    globalState = {
      ...globalState,
      rules,
      screen: null,
      editingRuleId: null
    };
    notify();
    store.flash(exists ? 'Règle modifiée' : 'Nouvelle règle enregistrée');
  },

  // Training actions
  toggleTrainingAutomation: (id: string) => {
    const tr = globalState.trainings.find(t => t.id === id);
    if (!tr) return;

    if (tr.automated) {
      globalState = {
        ...globalState,
        trainings: globalState.trainings.map(t => t.id === id ? { ...t, automated: false } : t),
        rules: globalState.rules.filter(r => r.id !== `rule_${id}`)
      };
      notify();
      store.flash(`Archivage automatique désactivé pour ${tr.org}`);
    } else {
      const day = globalState.trainDays[id] || globalState.settings.defaultDay;
      const hour = globalState.trainHours[id] || globalState.settings.defaultHour;
      
      const newRule: AutoRule = {
        id: `rule_${id}`,
        email: `notification@${tr.org.toLowerCase()}.com`,
        nom: tr.org,
        cat: 'formation',
        action: 'archiver_automatique',
        day,
        hour,
        active: true,
        date: new Date().toLocaleDateString('fr-FR')
      };

      globalState = {
        ...globalState,
        trainings: globalState.trainings.map(t => t.id === id ? { ...t, automated: true } : t),
        rules: [newRule, ...globalState.rules]
      };
      notify();
      store.flash(`Chaque ${day} à ${hour.replace(':', ' h ')} → Archives`);
    }
  },

  // Rule Engine Execution (Desktop Parity)
  applyRulesEngine: () => {
    const activeRules = globalState.rules.filter(r => r.active);
    if (activeRules.length === 0) return;

    let modified = false;
    let newMails = [...globalState.mails];
    let newPromos = [...globalState.promos];
    let newTrash = [...globalState.trash];
    let newArchived = { ...globalState.archived };
    let firedCount = 0;

    activeRules.forEach(rule => {
      if (rule.action === 'supprimer_toujours') {
        // Filter out promos matching rule email
        const matchingPromos = newPromos.filter(p => p.email === rule.email);
        if (matchingPromos.length > 0) {
          modified = true;
          firedCount += matchingPromos.length;
          newPromos = newPromos.filter(p => p.email !== rule.email);
          matchingPromos.forEach(p => {
            newTrash.unshift({
              tid: `rule-promo-${p.id}-${Date.now()}`,
              kind: 'promo',
              item: p,
              label: p.subject,
              sub: p.name
            });
          });
        }

        // Filter out mails matching rule email
        const matchingMails = newMails.filter(m => m.email === rule.email);
        if (matchingMails.length > 0) {
          modified = true;
          firedCount += matchingMails.length;
          newMails = newMails.filter(m => m.email !== rule.email);
          matchingMails.forEach(m => {
            newTrash.unshift({
              tid: `rule-mail-${m.id}-${Date.now()}`,
              kind: 'mail',
              item: m,
              label: m.subject,
              sub: m.from
            });
          });
        }
      } else if (rule.action === 'generer_resume_et_archiver') {
        const matchingMails = newMails.filter(m => m.email === rule.email);
        if (matchingMails.length > 0) {
          modified = true;
          firedCount += matchingMails.length;
          newMails = newMails.filter(m => m.email !== rule.email);
          newArchived['Newsletters'] = (newArchived['Newsletters'] || 0) + matchingMails.length;
        }
      }
    });

    if (modified) {
      globalState = {
        ...globalState,
        mails: newMails,
        promos: newPromos,
        trash: newTrash,
        archived: newArchived
      };
      notify();
      if (firedCount > 0) {
        store.flash(`Moteur MailFlow : ${firedCount} message(s) traité(s) par vos règles`);
      }
    }
  },

  // Compose & Send
  sendMail: async () => {
    const { cpTo, cpSubject, cpBody } = globalState;
    if (!cpTo.trim() || !cpTo.includes('@')) {
      globalState = { ...globalState, cpError: 'Adresse e-mail du destinataire invalide.' };
      notify();
      return;
    }

    try {
      await tauriBridge.sendMessage([cpTo], [], cpSubject, cpBody);
      
      // Record sent message in local state
      const sentCount = (globalState.archived['Envoyés'] || 0) + 1;
      const sentMail: MailMessage = {
        id: `sent_${Date.now()}`,
        from: globalState.account,
        email: cpTo,
        initials: cpTo.slice(0, 2).toUpperCase(),
        time: 'à l’instant',
        full: "Aujourd'hui à l'instant",
        unread: false,
        subject: cpSubject || '(sans objet)',
        snippet: cpBody.slice(0, 80),
        body: [cpBody]
      };

      globalState = {
        ...globalState,
        archived: { ...globalState.archived, Envoyés: sentCount },
        screen: null,
        cpTo: '',
        cpSubject: '',
        cpBody: '',
        cpError: ''
      };
      notify();
      store.flash('Message envoyé avec succès');
    } catch (e) {
      globalState = { ...globalState, cpError: 'Erreur lors de l’envoi du message.' };
      notify();
    }
  },

  // Real Google OAuth Connection & Account Switch
  connectGoogleAccount: async (email?: string, name?: string) => {
    try {
      const gEmail = email || 'lucie.marchand@gmail.com';
      const gName = name || 'Lucie Marchand';
      const gInitials = gName.slice(0, 2).toUpperCase();

      const newAccount: Account = {
        email: gEmail,
        name: gName,
        initials: gInitials,
        avatarBg: '#0B57D0',
        avatarFg: '#FFFFFF',
        isPrimary: true
      };

      const existingAccounts = globalState.accounts.filter(a => a.email !== gEmail);

      globalState = {
        ...globalState,
        account: gEmail,
        accounts: [newAccount, ...existingAccounts],
        acctOpen: false
      };
      notify();
      store.flash(`Compte Google OAuth connecté : ${gEmail}`);
    } catch (e) {
      console.error('Google OAuth error', e);
    }
  },

  clearExampleMails: () => {
    globalState = {
      ...globalState,
      mails: [],
      promos: [],
      news: [],
      trash: [],
      archived: {}
    };
    notify();
    store.flash('Boîte réinitialisée avec les messages réels');
  },

  // Onboarding Sync Simulation
  startSyncSimulation: () => {
    globalState = {
      ...globalState,
      syncPct: 0,
      syncFail: false,
      syncStep: 'Connexion à Gmail…'
    };
    notify();

    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      if (p >= 100) {
        clearInterval(interval);
        globalState = {
          ...globalState,
          syncPct: 100,
          syncStep: '34 messages triés et classés !',
          onboarded: true,
          screen: null
        };
        notify();
      } else {
        const step = p < 35 ? 'Lecture des derniers messages…' : (p < 75 ? 'Application des 5 règles de tri…' : 'Résumé des newsletters avec IA…');
        globalState = {
          ...globalState,
          syncPct: p,
          syncStep: step
        };
        notify();
      }
    }, 220);
  }
};

export function useAppStore() {
  const [state, setState] = useState<AppState>(globalState);

  useEffect(() => {
    const listener = () => setState(globalState);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return { state, store };
}
