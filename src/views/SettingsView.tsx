import React from 'react';
import { AppSettings, NotificationSettings, Account, ThemeMode } from '../types';
import { Icon } from '../components/Icon';
import { LogoGoogle } from '../components/LogoGoogle';

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
      <div className="flex-none flex items-center justify-between px-3 py-2.5 bg-[var(--side)] border-b border-[var(--line)]/40 pt-safe">
        <button
          type="button"
          onClick={onBack}
          className="p-2 -ml-1 rounded-full text-[var(--fg)] hover:bg-[var(--sunk)] active:scale-95 transition-all cursor-pointer flex items-center gap-1 text-xs font-semibold"
        >
          <Icon name="arrow_back" size={22} />
          <span>Retour</span>
        </button>
        <span className="text-base font-bold text-[var(--fg)]">Paramètres</span>
        <div className="w-16" />
      </div>

      {/* Settings list with large cards matching RulesView */}
      <div className="flex-1 overflow-y-auto mf-scroll p-4 flex flex-col gap-4 pb-20">
        
        {/* Section 1: Synchronisation & Tri IA */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold text-[var(--fg)] px-1">
            Tri Intelligent & Synchronisation
          </span>

          <div className="flex flex-col gap-2.5">
            {/* Sync on launch tile */}
            <div className="p-4.5 rounded-3xl bg-[var(--card)] border border-[var(--line)]/50 shadow-xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-full bg-blue-100 dark:bg-blue-950/60 text-[#0B57D0] dark:text-blue-400 flex items-center justify-center flex-none">
                  <Icon name="sync" size={22} />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-[var(--fg)] truncate">Relever à l'ouverture</div>
                  <div className="text-xs text-[var(--sub)] truncate mt-0.5">Synchronise automatiquement votre boîte au démarrage</div>
                </div>
              </div>

              <div
                onClick={() => onUpdateSettings({ syncLaunch: !settings.syncLaunch })}
                className="flex-none cursor-pointer p-1"
              >
                <div
                  className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out flex items-center ${
                    settings.syncLaunch ? 'bg-[#0B57D0]' : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform duration-200 ease-in-out ${
                      settings.syncLaunch ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* AI Summaries tile */}
            <div className="p-4.5 rounded-3xl bg-[var(--card)] border border-[var(--line)]/50 shadow-xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-full bg-purple-100 dark:bg-purple-950/60 text-[#5B2FA8] dark:text-purple-300 flex items-center justify-center flex-none">
                  <Icon name="auto_awesome" size={22} filled />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-[var(--fg)] truncate">Résumés de newsletters IA</div>
                  <div className="text-xs text-[var(--sub)] truncate mt-0.5">Synthèse quotidienne automatique des actualités</div>
                </div>
              </div>

              <div
                onClick={() => onUpdateSettings({ ai: !settings.ai })}
                className="flex-none cursor-pointer p-1"
              >
                <div
                  className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out flex items-center ${
                    settings.ai ? 'bg-[#0B57D0]' : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform duration-200 ease-in-out ${
                      settings.ai ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* LLM Model selector tile */}
            <div className="p-4.5 rounded-3xl bg-[var(--card)] border border-[var(--line)]/50 shadow-xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#0F5223] dark:text-emerald-300 flex items-center justify-center flex-none">
                  <Icon name="psychology" size={22} />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-[var(--fg)] truncate">Moteur de modèle IA</div>
                  <div className="text-xs text-[var(--sub)] truncate mt-0.5">{settings.model}</div>
                </div>
              </div>

              <select
                value={settings.model}
                onChange={(e) => onUpdateSettings({ model: e.target.value })}
                aria-label="Sélectionner le modèle IA"
                className="text-xs font-semibold bg-[var(--sunk)] text-[var(--fg)] border border-[var(--line)]/60 rounded-2xl px-3 py-2 outline-none cursor-pointer shadow-2xs"
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
          <span className="text-xs font-bold text-[var(--fg)] px-1">
            Apparence & Couleurs
          </span>
          
          <div className="p-4.5 rounded-3xl bg-[var(--card)] border border-[var(--line)]/50 shadow-xs flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-full bg-amber-100 dark:bg-amber-950/60 text-[#8C5300] dark:text-amber-300 flex items-center justify-center flex-none">
                  <Icon name={theme === 'dark' ? 'dark_mode' : 'light_mode'} size={22} />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-[var(--fg)] truncate">Mode sombre</div>
                  <div className="text-xs text-[var(--sub)] truncate mt-0.5">Basculer le thème visuel de l'interface</div>
                </div>
              </div>

              <button
                type="button"
                onClick={onToggleTheme}
                className="p-2.5 rounded-2xl bg-[var(--sunk)] border border-[var(--line)]/60 text-[var(--fg)] active:scale-95 transition-all cursor-pointer"
              >
                <Icon name={theme === 'dark' ? 'dark_mode' : 'light_mode'} size={20} />
              </button>
            </div>

            <div className="pt-3 border-t border-[var(--line)]/40">
              <div className="text-xs font-bold text-[var(--fg)] mb-2.5">Couleur d'accentuation</div>
              <div className="flex items-center gap-3.5">
                {ACCENT_COLORS.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => onSetAccentColor(color)}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-transform active:scale-90 shadow-2xs cursor-pointer"
                    style={{ backgroundColor: color }}
                  >
                    {settings.accentColor === color && (
                      <Icon name="check" size={18} className="text-white" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Comptes Google OAuth Connectés */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold text-[var(--fg)] px-1">
            Comptes Google OAuth Connectés
          </span>
          <div className="rounded-3xl bg-[var(--card)] border border-[var(--line)]/50 overflow-hidden shadow-xs divide-y divide-[var(--line)]/50">
            {accounts.map(acct => (
              <div key={acct.email} className="p-4 flex items-center gap-3.5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shadow-xs"
                  style={{ backgroundColor: acct.avatarBg, color: acct.avatarFg }}
                >
                  {acct.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-[var(--fg)] truncate flex items-center gap-1.5">
                    <span>{acct.name}</span>
                    <LogoGoogle taille="14px" />
                  </div>
                  <div className="text-[11px] text-[var(--sub)] truncate">{acct.email}</div>
                </div>
                <span className="text-[10.5px] font-semibold text-[#0F5223] bg-[#C4EED0] dark:bg-emerald-950 dark:text-emerald-300 px-2.5 py-1 rounded-full">
                  Connecté
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Logout button */}
        <button
          type="button"
          onClick={onLogout}
          className="w-full p-4 rounded-3xl bg-[#FCE8E6] text-[#B3261E] font-semibold text-xs border border-[#F5C2C7] transition-all active:scale-98 cursor-pointer mt-2"
        >
          Déconnecter la session
        </button>

      </div>
    </div>
  );
};
