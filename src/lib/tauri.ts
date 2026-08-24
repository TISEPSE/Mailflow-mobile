import { AI_SUMMARIES_MOCK } from './mockData';

// Safe check for Tauri runtime
const isTauri = typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window;

async function invokeTauri<T>(cmd: string, args?: Record<string, unknown>): Promise<T> {
  if (isTauri) {
    try {
      const { invoke } = await import('@tauri-apps/api/core');
      return await invoke<T>(cmd, args);
    } catch (err) {
      console.warn(`[Tauri] Invoke ${cmd} failed, using fallback:`, err);
    }
  }
  return fallbackInvoke<T>(cmd, args);
}

/**
 * High-fidelity fallback engine for web/preview/mobile emulator
 */
async function fallbackInvoke<T>(cmd: string, args?: Record<string, unknown>): Promise<T> {
  // Simulate natural delay
  await new Promise(r => setTimeout(r, 200));

  switch (cmd) {
    case 'relever_boite':
      return { total: 34, nonLus: 2 } as T;
    
    case 'message_corbeille':
      return undefined as T;
    
    case 'message_marquer_lu':
      return undefined as T;
      
    case 'message_envoyer':
      return undefined as T;
      
    case 'resumer_newsletter':
    case 'resumer_message': {
      const id = (args?.id as string) || 'm1';
      const summary = AI_SUMMARIES_MOCK[id] || [
        'Message traité avec succès.',
        'Informations clés identifiées et structurées.'
      ];
      return summary as T;
    }

    case 'comptes_lister':
      return [] as T;

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
};
