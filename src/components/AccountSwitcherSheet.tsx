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

  const otherAccounts = accounts.filter(a => a.email !== currentAccount.email);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[340px] rounded-[32px] p-6 bg-white dark:bg-[#232425] border border-gray-100 dark:border-gray-800 shadow-2xl animate-pop relative flex flex-col items-center select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main Active Account Avatar (Image 4) */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-sm mb-2"
          style={{ 
            backgroundColor: currentAccount.avatarBg || '#0B57D0', 
            color: currentAccount.avatarFg || '#FFFFFF' 
          }}
        >
          {currentAccount.initials}
        </div>

        {/* User Name & Email */}
        <div className="text-base font-bold text-gray-900 dark:text-gray-100 text-center">
          {currentAccount.name}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-0.5 mb-3.5">
          {currentAccount.email}
        </div>

        {/* Manage Account Pill Button (Image 4) */}
        <button
          type="button"
          onClick={() => {
            onOpenSettings();
            onClose();
          }}
          className="px-5 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#2D2F31] hover:bg-gray-50 dark:hover:bg-gray-700 text-xs font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2 shadow-2xs active:scale-95 transition-all mb-4 cursor-pointer"
        >
          <Icon name="settings" size={16} className="text-gray-600 dark:text-gray-300" />
          <span>Gérer votre compte</span>
        </button>

        {/* Nested Accounts List Card (Image 4) */}
        <div className="w-full rounded-2xl bg-white dark:bg-[#1E1F20] border border-gray-100 dark:border-gray-800 overflow-hidden divide-y divide-gray-100 dark:divide-gray-800/80 shadow-2xs">
          {otherAccounts.map((acct) => (
            <button
              key={acct.email}
              type="button"
              onClick={() => {
                onSelectAccount(acct.email);
                onClose();
              }}
              className="flex items-center gap-3.5 p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-left w-full cursor-pointer"
            >
              <div
                className="w-8 h-8 rounded-full flex-none flex items-center justify-center text-xs font-bold shadow-2xs"
                style={{ backgroundColor: acct.avatarBg, color: acct.avatarFg }}
              >
                {acct.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate">
                  {acct.name}
                </div>
                <div className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                  {acct.email}
                </div>
              </div>
            </button>
          ))}

          {/* Add another account row */}
          <button
            type="button"
            onClick={() => {
              onAddAccount();
              onClose();
            }}
            className="flex items-center gap-3.5 p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-left w-full cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full flex-none bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300">
              <Icon name="person_add" size={17} />
            </div>
            <div className="text-xs font-bold text-gray-800 dark:text-gray-200">
              Ajouter un autre compte
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
