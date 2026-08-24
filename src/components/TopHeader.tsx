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
      className={`flex-none w-full flex items-center gap-2.5 px-4 pb-2.5 z-30 bg-[var(--side)] ${
        isNative ? 'pt-safe' : 'pt-2'
      }`}
    >
      {/* Brand logo avatar pill + search bar */}
      <div
        onClick={onOpenSearch}
        className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-[var(--card)] border border-[var(--line)]/60 shadow-[var(--shadow)] cursor-pointer hover:border-[var(--line)] transition-all"
      >
        <img
          src="/mailflow-logo-1024.png"
          alt="MailFlow"
          className="w-5 h-5 rounded-md object-contain flex-none shadow-2xs"
          onError={(e) => {
            // Fallback to icon if image fails
            e.currentTarget.style.display = 'none';
          }}
        />
        <Icon name="search" size={19} className="text-[var(--sub)] flex-none" />
        <span className="flex-1 text-xs text-[var(--sub)] truncate select-none font-normal">
          {searchHint}
        </span>

        {/* User Account Avatar */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenAccounts();
          }}
          className="w-7 h-7 rounded-full flex-none flex items-center justify-center text-[11px] font-bold shadow-xs active:scale-95 transition-transform cursor-pointer"
          style={{
            backgroundColor: currentAccount.avatarBg,
            color: currentAccount.avatarFg
          }}
        >
          {currentAccount.initials}
        </button>
      </div>
    </header>
  );
};
