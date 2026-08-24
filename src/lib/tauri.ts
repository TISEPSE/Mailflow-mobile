import { AI_SUMMARIES_MOCK } from './mockData';
import { AutoRule, Account } from '../types';

// Check if running inside a Tauri native window
const isTauri = typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;

async function invokeTauri<T>(cmd: string, args?: Record<string, unknown>): Promise<T> {
  if (isTauri) {
    try {
      const { invoke } = await import('@tauri-apps/api/core');
      return await invoke<T>(cmd, args);
    } catch (err) {
      console.warn(`[Tauri] Invoke ${cmd} failed, using local engine fallback:`, err);
    }
  }
  return fallbackInvoke<T>(cmd, args);
}

/**
 * Fallback engine for preview / web / mobile browser
 */
async function fallbackInvoke<T>(cmd: string, args?: Record<string, unknown>): Promise<T> {
  await new Promise(r => setTimeout(r, 180));

  switch (cmd) {
    case 'relever_boite':
      return { total: 34, nonLus: 2, messages: [] } as T;
    
    case 'message_corbeille':
    case 'message_marquer_lu':
    case 'message_envoyer':
    case 'compte_basculer':
    case 'compte_ajouter':
    case 'compte_oublier':
    case 'llm_cle_enregistrer':
    case 'llm_cle_effacer':
      return undefined as T;
      
    case 'compte_adresse':
      return 'lucie.marchand@gmail.com' as T;

    case 'compte_profil':
      return {
        adresse: 'lucie.marchand@gmail.com',
        nom: 'Lucie Marchand',
        photo: null
      } as T;

    case 'comptes_lister':
      return [
        { adresse: 'lucie.marchand@gmail.com', nom: 'Lucie Marchand', actif: true, photo: null },
        { adresse: 'l.marchand@atelier-nord.fr', nom: 'Atelier Nord — pro', actif: false, photo: null }
      ] as T;

    case 'llm_etat':
      return { configure: true, modele: 'Gemini 1.5 Flash' } as T;

    case 'resumer_newsletter':
    case 'resumer_message': {
      const id = (args?.id as string) || 'm1';
      const summary = AI_SUMMARIES_MOCK[id] || [
        'Message trié et analysé par le moteur MailFlow.',
        'Les actions suggérées sont disponibles directement.'
      ];
      return summary as T;
    }

    default:
      return {} as T;
  }
}

export const tauriBridge = {
  isTauri,
  fetchInbox: () => invokeTauri('relever_boite'),
  moveToTrash: (id: string) => invokeTauri('message_corbeille', { id }),
  markAsRead: (id: string) => invokeTauri('message_marquer_lu', { id }),
  sendMessage: (destinataires: string[], copies: string[], sujet: string, corps: string) =>
    invokeTauri('message_envoyer', { destinataires, copies, sujet, corps }),
  generateSummary: (id: string) => invokeTauri<string[]>('resumer_message', { id }),
  getAccounts: () => invokeTauri<Account[]>('comptes_lister'),
  switchAccount: (adresse: string) => invokeTauri<void>('compte_basculer', { adresse }),
  addAccount: () => invokeTauri<void>('compte_ajouter'),
  forgetAccount: (adresse: string) => invokeTauri<void>('compte_oublier', { adresse }),
  saveLlmKey: (cle: string) => invokeTauri<void>('llm_cle_enregistrer', { cle }),
  clearLlmKey: () => invokeTauri<void>('llm_cle_effacer'),
  getLlmStatus: () => invokeTauri<{ configure: boolean; modele: string }>('llm_etat'),
};
