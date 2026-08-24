import React, { useState } from 'react';
import { PromoMessage } from '../types';
import { Icon } from '../components/Icon';

interface PromoReaderViewProps {
  promo: PromoMessage | null;
  onBack: () => void;
  onTrash: (id: string) => void;
  onBlockAndTrash: (id: string) => void;
}

export const PromoReaderView: React.FC<PromoReaderViewProps> = ({
  promo,
  onBack,
  onTrash,
  onBlockAndTrash
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  if (!promo) return null;

  return (
    <div className="flex-1 flex flex-col bg-[var(--side)] relative z-40 overflow-hidden animate-fade-in">
      {/* Top Header */}
      <div className="flex-none flex items-center justify-between px-3 py-2.5 bg-[var(--side)] border-b border-[var(--line)]/40 pt-safe relative">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-2 -ml-1 rounded-full text-[var(--fg)] hover:bg-[var(--sunk)] active:scale-95 transition-all cursor-pointer"
            aria-label="Retour"
          >
            <Icon name="arrow_back" size={22} />
          </button>
          <span className="text-lg font-semibold text-[var(--fg)] tracking-tight">
            Offre
          </span>
        </div>

        <div className="relative flex items-center gap-1">
          <button
            type="button"
            onClick={() => onTrash(promo.id)}
            className="p-2 rounded-full text-[var(--fg)] hover:text-[#B3261E] hover:bg-[var(--sunk)] active:scale-95 transition-all cursor-pointer"
            title="Supprimer"
          >
            <Icon name="delete" size={22} />
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-full text-[var(--fg)] hover:bg-[var(--sunk)] active:scale-95 transition-all cursor-pointer"
          >
            <Icon name="more_vert" size={22} />
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-11 z-50 min-w-[220px] bg-white dark:bg-[#232425] rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 p-2 animate-pop origin-top-right flex flex-col gap-0.5">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onBlockAndTrash(promo.id);
                  }}
                  className="flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-semibold text-[#B3261E] hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors text-left w-full cursor-pointer"
                >
                  <Icon name="block" size={19} className="text-[#B3261E]" />
                  <span>Bloquer & supprimer</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Promo Content */}
      <div className="flex-1 overflow-y-auto mf-scroll p-4 flex flex-col gap-4">
        <h1 className="text-[21px] font-bold text-[var(--fg)] leading-snug tracking-tight">
          {promo.subject}
        </h1>

        <div className="flex items-center gap-3 pt-1">
          <div className="w-11 h-11 rounded-full flex-none bg-[#FDE3DC] text-[#B3502F] flex items-center justify-center text-sm font-bold shadow-2xs">
            {promo.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-[var(--fg)] truncate">{promo.name}</div>
            <div className="text-xs text-[var(--sub)] truncate">{promo.email}</div>
          </div>
          <div className="text-xs text-[var(--sub)] flex-none">{promo.time}</div>
        </div>

        {/* Promo Body */}
        <div className="flex flex-col gap-3 text-sm text-[var(--fg)] leading-relaxed pt-2">
          {promo.body.map((paragraph, i) => (
            <p key={i} className="whitespace-pre-line leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Bottom Block Action */}
      <div className="flex-none p-4 pt-2 bg-gradient-to-t from-[var(--side)] via-[var(--side)] to-transparent">
        <button
          type="button"
          onClick={() => onBlockAndTrash(promo.id)}
          className="w-full py-3.5 px-6 rounded-full bg-[#FCE8E6] hover:bg-[#F9DEDC] text-[#B3261E] font-medium text-xs border border-[#F5C2C7] flex items-center justify-center gap-2 shadow-xs active:scale-98 transition-all cursor-pointer"
        >
          <Icon name="block" size={18} className="text-[#B3261E]" />
          <span>Toujours supprimer les offres de cet expéditeur</span>
        </button>
      </div>
    </div>
  );
};
