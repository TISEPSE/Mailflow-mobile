import React, { useState } from 'react';
import { Account } from '../types';
import { Icon } from '../components/Icon';
import { LogoGoogle } from '../components/LogoGoogle';

interface OnboardingViewProps {
  accounts: Account[];
  syncPct: number;
  syncStep: string;
  onFinish: () => void;
  onGoogleOAuth?: () => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({
  accounts,
  syncPct,
  syncStep,
  onFinish,
  onGoogleOAuth
}) => {
  const [step, setStep] = useState(0);
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]?.email || '');

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-[var(--side)] relative z-40 overflow-hidden select-none animate-fade-in pt-safe pb-safe">
      
      {/* Top step indicator */}
      <div className="flex items-center justify-center gap-1.5 pt-2">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step === i ? 'w-8 bg-[var(--accent)]' : 'w-2 bg-[var(--line)]'
            }`}
          />
        ))}
      </div>

      {/* Step 0: Welcome */}
      {step === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-8 animate-fade-in">
          <div className="w-20 h-20 rounded-3xl bg-[var(--accent)] text-white flex items-center justify-center shadow-xl">
            <Icon name="mark_email_read" size={44} filled />
          </div>
          <h1 className="text-xl font-bold text-[var(--fg)] leading-tight max-w-xs">
            Votre boîte, triée avant même de l'ouvrir.
          </h1>
          <p className="text-xs text-[var(--sub)] leading-relaxed max-w-xs">
            MailFlow sépare les messages de vraies personnes, résume vos newsletters et classe automatiquement vos rappels de formation.
          </p>
        </div>
      )}

      {/* Step 1: Google OAuth Account Sign-In */}
      {step === 1 && (
        <div className="flex-1 flex flex-col justify-center gap-5 py-4 animate-fade-in">
          <div className="text-center">
            <h2 className="text-lg font-bold text-[var(--fg)]">Connexion Google OAuth</h2>
            <p className="text-xs text-[var(--sub)] mt-1">Connectez votre vrai compte Gmail sécurisé</p>
          </div>

          {/* Official Google OAuth Sign-in Button */}
          <button
            type="button"
            onClick={() => {
              if (onGoogleOAuth) onGoogleOAuth();
              setStep(2);
              onFinish();
            }}
            className="w-full py-4 px-6 rounded-3xl bg-white dark:bg-[#232425] hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md flex items-center justify-center gap-3.5 text-sm font-semibold text-gray-800 dark:text-gray-100 active:scale-98 transition-all cursor-pointer"
          >
            <LogoGoogle taille="1.5rem" />
            <span>Se connecter avec Google</span>
          </button>

          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-[var(--line)]/50" />
            <span className="text-[11px] text-[var(--sub)] font-medium">ou choisir un compte enregistré</span>
            <div className="flex-1 h-px bg-[var(--line)]/50" />
          </div>

          <div className="rounded-3xl bg-[var(--card)] border border-[var(--line)]/60 overflow-hidden shadow-xs divide-y divide-[var(--line)]/50">
            {accounts.map(a => (
              <div
                key={a.email}
                onClick={() => setSelectedAccount(a.email)}
                className={`p-3.5 flex items-center gap-3.5 cursor-pointer transition-colors ${
                  selectedAccount === a.email ? 'bg-[var(--accent-soft)]/40' : 'hover:bg-[var(--sunk)]'
                }`}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shadow-xs"
                  style={{ backgroundColor: a.avatarBg, color: a.avatarFg }}
                >
                  {a.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-[var(--fg)] truncate">{a.name}</div>
                  <div className="text-[11px] text-[var(--sub)] truncate">{a.email}</div>
                </div>
                {selectedAccount === a.email && (
                  <Icon name="check_circle" size={20} filled className="text-[var(--accent)]" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Sync Simulation */}
      {step === 2 && (
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-5 py-8 animate-fade-in">
          <div className="w-20 h-20 rounded-full border-4 border-[var(--accent-soft)] border-t-[var(--accent)] animate-spin flex items-center justify-center">
            <Icon name="sync" size={30} className="text-[var(--accent)]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[var(--fg)]">Synchronisation Google OAuth</h2>
            <p className="text-xs text-[var(--sub)] mt-1">{syncStep}</p>
          </div>

          {/* Progress bar */}
          <div className="w-48 h-2 rounded-full bg-[var(--line)] overflow-hidden">
            <div
              className="h-full bg-[var(--accent)] transition-all duration-300"
              style={{ width: `${syncPct}%` }}
            />
          </div>
        </div>
      )}

      {/* Bottom Button Actions */}
      <div className="flex items-center justify-between gap-3 pt-4 border-t border-[var(--line)]/40">
        {step > 0 && step < 2 ? (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="px-4 py-2.5 rounded-2xl text-xs font-semibold text-[var(--sub)]"
          >
            Précédent
          </button>
        ) : <div />}

        {step < 2 ? (
          <button
            type="button"
            onClick={() => {
              if (step === 1) {
                setStep(2);
                onFinish();
              } else {
                setStep(step + 1);
              }
            }}
            className="flex items-center gap-1.5 px-6 py-3 rounded-full bg-[var(--accent)] text-white text-xs font-bold shadow-md active:scale-95 transition-all cursor-pointer"
          >
            <span>{step === 0 ? 'Commencer' : 'Continuer'}</span>
            <Icon name="arrow_forward" size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={onFinish}
            disabled={syncPct < 100}
            className={`flex items-center gap-1.5 px-6 py-3 rounded-full text-xs font-bold shadow-md transition-all ${
              syncPct >= 100
                ? 'bg-[var(--accent)] text-white cursor-pointer active:scale-95'
                : 'bg-[var(--line)] text-[var(--sub)] cursor-not-allowed opacity-60'
            }`}
          >
            <span>Ouvrir MailFlow</span>
            <Icon name="check" size={16} />
          </button>
        )}
      </div>

    </div>
  );
};
