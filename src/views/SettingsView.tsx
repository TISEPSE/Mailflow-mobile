import React from 'react';
import { AppSettings, NotificationSettings, Account, ThemeMode } from '../types';
import { Icon } from '../components/Icon';

interface SettingsViewProps {
  settings: AppSettings;
  notif: NotificationSettings;
  accounts: Account[];
  theme: ThemeMode;
  onBack: () => void;
  onUpdateSettings: (s: Partial<AppSettings>) => void;
  onUpdateNotif: (n: Partial<NotificationSettings>) => void;
  onToggleTheme: () => void;
  onSetAccentColor: (color: string) => void;
  onLogout: () => void;
}

const ACCENT_COLORS = ['#0B57D0', '#146C2E', '#B3261E', '#5B2FA8', '#E37400'];

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  notif,
  accounts,
  theme,
  onBack,
  onUpdateSettings,
  onUpdateNotif,
  onToggleTheme,
  onSetAccentColor,
  onLogout
}) => {
  return (
    <div className="flex-1 flex flex-col bg-[var(--side)] relative z-40 overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex-none flex items-center justify-between px-3 py-2 bg-[var(--side)] border-b border-[var(--line)]/50">
        <button
          onClick={onBack}
          className="flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-semibold text-[var(--fg)] hover:bg-[var(--sunk)] active:scale-95 transition-all"
        >
          <Icon name="arrow_back" size={20} />
          <span>Retour</span>
        </button>
        <span className="text-xs font-bold text-[var(--fg)]">Paramètres</span>
        <div className="w-12" />
      </div>

      {/* Settings list */}
      <div className="flex-1 overflow-y-auto mf-scroll p-4 flex flex-col gap-4 pb-20">
        
        {/* Section 1: Synchronisation & Tri IA */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--sub)] px-1">
            Tri Intelligent & Synchronisation
          </span>
          <div className="rounded-3xl bg-[var(--card)] border border-[var(--line)]/60 overflow-hidden shadow-xs divide-y divide-[var(--line)]/50">
            {/* Sync on launch */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-[var(--fg)]">Relever à l'ouverture</div>
                <div className="text-[11px] text-[var(--sub)]">Synchronise dès le lancement de l'application</div>
              </div>
              <button
                onClick={() => onUpdateSettings({ syncLaunch: !settings.syncLaunch })}
                className={`w-10 h-5 rounded-full transition-colors relative p-0.5 ${
                  settings.syncLaunch ? 'bg-[var(--accent)]' : 'bg-[var(--line)]'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                    settings.syncLaunch ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* AI Summaries */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-[var(--fg)]">Résumés de newsletters IA</div>
                <div className="text-[11px] text-[var(--sub)]">Synthèse quotidienne automatique</div>
              </div>
              <button
                onClick={() => onUpdateSettings({ ai: !settings.ai })}
                className={`w-10 h-5 rounded-full transition-colors relative p-0.5 ${
                  settings.ai ? 'bg-[var(--accent)]' : 'bg-[var(--line)]'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                    settings.ai ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* LLM Model selector */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-[var(--fg)]">Modèle IA</div>
                <div className="text-[11px] text-[var(--sub)]">{settings.model}</div>
              </div>
              <select
                value={settings.model}
                onChange={(e) => onUpdateSettings({ model: e.target.value })}
                aria-label="Sélectionner le modèle IA"
                className="text-xs font-semibold bg-[var(--sunk)] text-[var(--fg)] border border-[var(--line)] rounded-xl px-2.5 py-1.5 outline-none"
              >
                <option value="Gemini 1.5 Flash">Gemini 1.5 Flash</option>
                <option value="Claude 3.5 Haiku">Claude 3.5 Haiku</option>
                <option value="GPT-4o Mini">GPT-4o Mini</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Apparence & Thème */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--sub)] px-1">
            Apparence & Couleurs
          </span>
          <div className="rounded-3xl bg-[var(--card)] border border-[var(--line)]/60 p-3.5 flex flex-col gap-3 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-[var(--fg)]">Mode sombre</div>
                <div className="text-[11px] text-[var(--sub)]">Basculer le thème de l'interface</div>
              </div>
              <button
                onClick={onToggleTheme}
                className="p-2 rounded-xl bg-[var(--sunk)] border border-[var(--line)] text-[var(--fg)] active:scale-95 transition-all"
              >
                <Icon name={theme === 'dark' ? 'dark_mode' : 'light_mode'} size={18} />
              </button>
            </div>

            <div className="pt-2 border-t border-[var(--line)]/50">
              <div className="text-xs font-bold text-[var(--fg)] mb-2">Couleur d'accent</div>
              <div className="flex items-center gap-3">
                {ACCENT_COLORS.map(color => (
                  <button
                    key={color}
                    onClick={() => onSetAccentColor(color)}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-transform active:scale-90"
                    style={{ backgroundColor: color }}
                  >
                    {settings.accentColor === color && (
                      <Icon name="check" size={16} className="text-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Comptes Connectés */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--sub)] px-1">
            Comptes Google Connectés
          </span>
          <div className="rounded-3xl bg-[var(--card)] border border-[var(--line)]/60 overflow-hidden shadow-xs divide-y divide-[var(--line)]/50">
            {accounts.map(acct => (
              <div key={acct.email} className="p-3.5 flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: acct.avatarBg, color: acct.avatarFg }}
                >
                  {acct.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-[var(--fg)] truncate">{acct.name}</div>
                  <div className="text-[11px] text-[var(--sub)] truncate">{acct.email}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full p-3.5 rounded-2xl bg-[#FCE8E6] text-[#B3261E] font-semibold text-xs border border-[#F5C2C7] transition-all active:scale-98 cursor-pointer mt-2"
        >
          Déconnecter la session
        </button>

      </div>
    </div>
  );
};
