import React from 'react';
import { Account } from '../types';
import { Icon } from './Icon';

interface AccountSwitcherSheetProps {
  isOpen: boolean;
  currentAccount: Account;
  accounts: Account[];
  onClose: () => void;
  onSelectAccount: (email: string) => void;
  onAddAccount: () => void;
  onOpenSettings: () => void;
}

export const AccountSwitcherSheet: React.FC<AccountSwitcherSheetProps> = ({
  isOpen,
  currentAccount,
  accounts,
  onClose,
  onSelectAccount,
  onAddAccount,
  onOpenSettings,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[360px] rounded-t-3xl sm:rounded-3xl p-5 bg-[var(--card)] border border-[var(--line)] shadow-2xl animate-rise relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button / Pull indicator */}
        <div className="w-10 h-1 rounded-full bg-[var(--line)] mx-auto mb-4 sm:hidden" />

        {/* Active Account Profile */}
        <div className="flex flex-col items-center gap-2 pb-5 border-b border-[var(--line)] text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-semibold shadow-md"
            style={{ backgroundColor: currentAccount.avatarBg, color: currentAccount.avatarFg }}
          >
            {currentAccount.initials}
          </div>
          <div className="text-base font-semibold text-[var(--fg)]">{currentAccount.name}</div>
          <div className="text-xs text-[var(--sub)]">{currentAccount.email}</div>
        </div>

        {/* Other Accounts */}
        <div className="py-3 flex flex-col gap-1 max-h-48 overflow-y-auto mf-scroll">
          <div className="text-[11px] font-bold tracking-wider uppercase text-[var(--sub)] px-2 py-1">
            Autres comptes
          </div>
          {accounts.map((acct) => (
            <button
              key={acct.email}
              onClick={() => {
                onSelectAccount(acct.email);
                onClose();
              }}
              className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-[var(--sunk)] active:bg-[var(--faint)] transition-colors text-left w-full"
            >
              <div
                className="w-9 h-9 rounded-full flex-none flex items-center justify-center text-xs font-semibold"
                style={{ backgroundColor: acct.avatarBg, color: acct.avatarFg }}
              >
                {acct.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-[var(--fg)] truncate">{acct.name}</div>
                <div className="text-[11px] text-[var(--sub)] truncate">{acct.email}</div>
              </div>
              {acct.email === currentAccount.email && (
                <Icon name="check_circle" size={18} filled className="text-[var(--accent)]" />
              )}
            </button>
          ))}
        </div>

        {/* Action buttons */}
        <div className="pt-3 border-t border-[var(--line)] flex flex-col gap-1">
          <button
            onClick={() => {
              onAddAccount();
              onClose();
            }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-[var(--accent)] hover:bg-[var(--sunk)] transition-colors"
          >
            <Icon name="person_add" size={18} />
            Ajouter un compte Google
          </button>
          <button
            onClick={() => {
              onOpenSettings();
              onClose();
            }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-[var(--fg)] hover:bg-[var(--sunk)] transition-colors"
          >
            <Icon name="settings" size={18} className="text-[var(--sub)]" />
            Paramètres de l'application
          </button>
        </div>
      </div>
    </div>
  );
};
