import React from 'react';
import { Account } from '../types';
import { Icon } from './Icon';

interface TopHeaderProps {
  currentAccount: Account;
  searchHint: string;
  onOpenSearch: () => void;
  onOpenAccounts: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentAccount,
  searchHint,
  onOpenSearch,
  onOpenAccounts
}) => {
  return (
    <div className="flex-none flex items-center gap-2.5 px-3.5 pt-1.5 pb-2.5 z-30">
      {/* Modern Search Capsule */}
      <div
        onClick={onOpenSearch}
        className="flex-1 flex items-center gap-3 px-3.5 py-2.5 rounded-full bg-[var(--card)] border border-[var(--line)]/50 shadow-[var(--shadow)] cursor-pointer hover:border-[var(--line)] transition-all"
      >
        <Icon name="search" size={20} className="text-[var(--sub)] flex-none" />
        <span className="flex-1 text-xs text-[var(--sub)] truncate select-none">
          {searchHint}
        </span>
        {/* Avatar Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenAccounts();
          }}
          className="w-7 h-7 rounded-full flex-none flex items-center justify-center text-[11px] font-bold shadow-xs active:scale-95 transition-transform"
          style={{
            backgroundColor: currentAccount.avatarBg,
            color: currentAccount.avatarFg
          }}
        >
          {currentAccount.initials}
        </button>
      </div>
    </div>
  );
};
