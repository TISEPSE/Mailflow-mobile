import React from 'react';
import { NewsletterItem } from '../types';
import { Icon } from '../components/Icon';

interface NewslettersViewProps {
  news: NewsletterItem[];
  selectedTag: string;
  onSelectTag: (tag: string) => void;
  onOpenDigest: () => void;
  onArchiveNewsletter: (item: NewsletterItem) => void;
  onTrashNewsletter: (item: NewsletterItem) => void;
}

const ALL_TAGS = ['Tous', '#IA', '#Tech', '#Économie', '#Design', '#Climat'];

export const NewslettersView: React.FC<NewslettersViewProps> = ({
  news,
  selectedTag,
  onSelectTag,
  onOpenDigest,
  onArchiveNewsletter,
  onTrashNewsletter
}) => {
  const filtered = selectedTag === 'Tous'
    ? news
    : news.filter(n => n.tags.includes(selectedTag));

  return (
    <div className="flex-1 overflow-y-auto mf-scroll px-3 pt-1 pb-20 flex flex-col gap-3">
      {/* Daily Digest Synthesis Card */}
      <div
        onClick={onOpenDigest}
        className="p-4 rounded-3xl bg-gradient-to-br from-[var(--accent-soft)]/50 to-[var(--card)] border border-[var(--accent)]/30 shadow-xs cursor-pointer active:scale-[0.99] transition-all"
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-[var(--accent)] text-white shadow-xs">
              <Icon name="auto_awesome" size={16} filled />
            </span>
            <span className="text-xs font-bold text-[var(--accent-fg)]">
              Synthèse du jour IA
            </span>
          </div>
          <span className="text-[11px] font-medium text-[var(--accent-fg)] flex items-center gap-0.5">
            Lire <Icon name="chevron_right" size={16} />
          </span>
        </div>
        <p className="text-xs text-[var(--fg)] leading-relaxed font-medium">
          4 newsletters résumées : innovations IA de la semaine, bilan macro-économique et nouveaux seuils climatiques.
        </p>
      </div>

      {/* Tags Filter Carousel */}
      <div className="flex items-center gap-1.5 overflow-x-auto mf-scroll py-1 select-none">
        {ALL_TAGS.map((tag) => {
          const isSelected = selectedTag === tag;
          return (
            <button
              key={tag}
              onClick={() => onSelectTag(tag)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all active:scale-95 cursor-pointer ${
                isSelected
                  ? 'bg-[var(--accent)] text-white shadow-xs'
                  : 'bg-[var(--card)] text-[var(--sub)] border border-[var(--line)]/60'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Newsletters list */}
      <div className="flex flex-col gap-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-3xl bg-[var(--card)] border border-[var(--line)]/60 shadow-xs flex flex-col gap-3"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-9 h-9 rounded-full flex-none flex items-center justify-center text-xs font-bold shadow-xs"
                  style={{ backgroundColor: item.logoBg, color: item.logoFg }}
                >
                  {item.initials}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[var(--fg)] truncate">{item.name}</div>
                  <div className="text-[11px] text-[var(--sub)] truncate">{item.email}</div>
                </div>
              </div>
              <span className="text-[11px] text-[var(--sub)] flex-none">{item.time}</span>
            </div>

            {/* AI Summary snippet */}
            <div className="text-xs text-[var(--fg)] leading-relaxed bg-[var(--sunk)] p-3 rounded-2xl border border-[var(--line)]/40">
              {item.summary}
            </div>

            {/* Actions & Tags */}
            <div className="flex items-center justify-between gap-2 pt-1 border-t border-[var(--line)]/30">
              <div className="flex items-center gap-1.5 flex-wrap">
                {item.tags.map(t => (
                  <span key={t} className="text-[10.5px] font-medium text-[var(--sub)] bg-[var(--faint)] px-2 py-0.5 rounded-md">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => onArchiveNewsletter(item)}
                  className="p-2 rounded-xl text-[var(--accent)] hover:bg-[var(--accent-soft)] transition-colors active:scale-95"
                  title="Archiver"
                >
                  <Icon name="inventory_2" size={18} />
                </button>
                <button
                  onClick={() => onTrashNewsletter(item)}
                  className="p-2 rounded-xl text-[var(--sub)] hover:text-red-500 hover:bg-[var(--sunk)] transition-colors active:scale-95"
                  title="Supprimer"
                >
                  <Icon name="delete" size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
