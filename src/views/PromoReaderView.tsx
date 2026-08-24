import React from 'react';
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
  if (!promo) return null;

  return (
    <div className="flex-1 flex flex-col bg-[var(--side)] relative z-40 overflow-hidden animate-fade-in">
      {/* Top Header */}
      <div className="flex-none flex items-center justify-between px-3 py-2 bg-[var(--side)] border-b border-[var(--line)]/50 pt-safe">
        <button
          onClick={onBack}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-[var(--fg)] hover:bg-[var(--sunk)] active:scale-95 transition-all cursor-pointer"
        >
          <Icon name="arrow_back" size={20} />
          <span>Publicités</span>
        </button>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onTrash(promo.id)}
            className="p-2 rounded-xl text-[var(--fg)] hover:text-red-500 hover:bg-[var(--sunk)] active:scale-95 transition-all"
            title="Supprimer"
          >
            <Icon name="delete" size={20} />
          </button>
        </div>
      </div>

      {/* Main Promo Content */}
      <div className="flex-1 overflow-y-auto mf-scroll p-4 flex flex-col gap-4 pb-16">
        <h1 className="text-base font-bold text-[var(--fg)] leading-snug tracking-tight">
          {promo.subject}
        </h1>

        <div className="flex items-center gap-3 p-3 rounded-2xl bg-[var(--card)] border border-[var(--line)]/50">
          <div className="w-10 h-10 rounded-full flex-none bg-[#FDE3DC] text-[#B3502F] flex items-center justify-center text-xs font-bold">
            {promo.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-[var(--fg)] truncate">{promo.name}</div>
            <div className="text-[11px] text-[var(--sub)] truncate">{promo.email}</div>
          </div>
          <div className="text-[11px] text-[var(--sub)] flex-none">{promo.time}</div>
        </div>

        {/* Promo Body */}
        <div className="p-4 rounded-2xl bg-[var(--card)] border border-[var(--line)]/60 flex flex-col gap-3 text-xs text-[var(--fg)] leading-relaxed shadow-xs">
          {promo.body.map((paragraph, i) => (
            <p key={i} className="whitespace-pre-line">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Permanent Block Rule Action Button */}
        <div className="pt-2">
          <button
            onClick={() => onBlockAndTrash(promo.id)}
            className="w-full flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-[#FCE8E6] text-[#B3261E] font-semibold text-xs border border-[#F5C2C7] transition-all active:scale-98 cursor-pointer"
          >
            <Icon name="block" size={18} />
            <span>Toujours supprimer les offres de cet expéditeur</span>
          </button>
        </div>
      </div>
    </div>
  );
};
