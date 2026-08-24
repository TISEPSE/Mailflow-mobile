import React from 'react';
import { Account } from '../types';
import { Icon } from './Icon';

interface TopHeaderProps {
  currentAccount: Account;
  searchHint: string;
  isNative?: boolean;
  onOpenSearch: () => void;
  onOpenAccounts: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentAccount,
  searchHint,
  isNative = false,
  onOpenSearch,
  onOpenAccounts
}) => {
  return (
    <header
      className={`flex-none w-full flex items-center gap-2.5 px-3.5 pb-2 z-30 bg-[var(--side)] ${
        isNative ? 'pt-safe' : 'pt-2'
      }`}
    >
      {/* M3 Search Bar */}
      <div
        onClick={onOpenSearch}
        className="flex-1 flex items-center gap-3 px-4 py-2.5 rounded-full bg-[var(--card)] border border-[var(--line)]/60 shadow-[var(--shadow)] cursor-pointer hover:border-[var(--line)] transition-all"
      >
        <Icon name="search" size={22} className="text-[var(--sub)] flex-none" />
        
        <span className="flex-1 text-[13.5px] text-[var(--sub)] truncate select-none font-normal">
          {searchHint}
        </span>

        {/* User Account Circular Avatar */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenAccounts();
          }}
          className="w-8 h-8 rounded-full flex-none flex items-center justify-center text-xs font-bold shadow-xs active:scale-95 transition-transform cursor-pointer"
          style={{
            backgroundColor: currentAccount.avatarBg || '#0B57D0',
            color: currentAccount.avatarFg || '#FFFFFF'
          }}
          title="Comptes"
        >
          {currentAccount.initials}
        </button>
      </div>
    </header>
  );
};
