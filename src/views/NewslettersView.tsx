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
    <div className="flex-1 overflow-y-auto mf-scroll px-3.5 pt-1 pb-20 flex flex-col gap-4">
      {/* Daily Digest Synthesis Card */}
      <div
        onClick={onOpenDigest}
        className="p-4 rounded-3xl bg-[#D3E3FD] dark:bg-[#0B3875] shadow-xs cursor-pointer active:scale-[0.99] transition-all flex items-center justify-between gap-3 select-none"
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-[#0B57D0] text-white flex items-center justify-center flex-none shadow-xs">
            <Icon name="auto_awesome" size={20} filled />
          </div>

          <div className="min-w-0">
            <div className="text-sm font-bold text-[#041E49] dark:text-[#E8F0FE] truncate">
              Synthèse du jour
            </div>
            <div className="text-xs text-[#041E49]/80 dark:text-[#E8F0FE]/80 truncate">
              4 newsletters lues à 07:10
            </div>
          </div>
        </div>

        {/* Right overlapping badge avatars + Chevron */}
        <div className="flex items-center gap-1 flex-none">
          <div className="flex -space-x-2 overflow-hidden">
            <div className="w-6 h-6 rounded-full bg-[#1E293B] text-[#5EEAD4] text-[9px] font-bold flex items-center justify-center ring-2 ring-[#D3E3FD] dark:ring-[#0B3875]">
              TL
            </div>
            <div className="w-6 h-6 rounded-full bg-[#FDE8C8] text-[#8C5300] text-[9px] font-bold flex items-center justify-center ring-2 ring-[#D3E3FD] dark:ring-[#0B3875]">
              LE
            </div>
            <div className="w-6 h-6 rounded-full bg-[#E9DCFB] text-[#5B2FA8] text-[9px] font-bold flex items-center justify-center ring-2 ring-[#D3E3FD] dark:ring-[#0B3875]">
              DW
            </div>
            <div className="w-6 h-6 rounded-full bg-[#D7EDDC] text-[#1C5C39] text-[9px] font-bold flex items-center justify-center ring-2 ring-[#D3E3FD] dark:ring-[#0B3875]">
              FC
            </div>
          </div>
          <Icon name="chevron_right" size={20} className="text-[#041E49] dark:text-[#E8F0FE]" />
        </div>
      </div>

      {/* Uncompressed Tags Filter Carousel */}
      <div className="flex items-center gap-2.5 overflow-x-auto mf-scroll py-1 px-0.5 select-none whitespace-nowrap scroll-smooth">
        {ALL_TAGS.map((tag) => {
          const isSelected = selectedTag === tag;
          return (
            <button
              key={tag}
              type="button"
              onClick={() => onSelectTag(tag)}
              className={`px-4 py-2 rounded-full text-xs font-semibold shrink-0 flex-none transition-all active:scale-95 cursor-pointer ${
                isSelected
                  ? 'bg-[#0B57D0] text-white shadow-xs'
                  : 'bg-[#ECEEEF] dark:bg-[#2D2F31] text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Newsletters list cards */}
      <div className="flex flex-col gap-3.5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-4.5 rounded-3xl bg-[var(--card)] border border-[var(--line)]/50 shadow-xs flex flex-col gap-3.5"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-10 h-10 rounded-full flex-none flex items-center justify-center text-xs font-bold shadow-xs"
                  style={{ backgroundColor: item.logoBg, color: item.logoFg }}
                >
                  {item.initials}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-[var(--fg)] truncate">
                    {item.name}
                  </div>
                  <div className="text-xs text-[var(--sub)] truncate">
                    {item.email}
                  </div>
                </div>
              </div>
              <span className="text-xs text-[var(--sub)] flex-none">
                {item.time}
              </span>
            </div>

            {/* Newsletter Excerpt paragraph */}
            <div className="text-xs text-[var(--fg)] leading-relaxed font-normal">
              {item.summary}
            </div>

            {/* Actions Row */}
            <div className="flex items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => onArchiveNewsletter(item)}
                className="flex-1 py-3 px-5 rounded-full bg-[#0B57D0] hover:bg-[#0842A0] text-white font-medium text-xs flex items-center justify-center gap-2 shadow-xs active:scale-98 transition-all cursor-pointer"
              >
                <Icon name="archive" size={18} className="text-white" />
                <span>Archiver</span>
              </button>

              <button
                type="button"
                onClick={() => onTrashNewsletter(item)}
                className="w-12 h-12 rounded-full bg-[#ECEEEF] dark:bg-[#2D2F31] hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 flex items-center justify-center flex-none active:scale-95 transition-all cursor-pointer"
                title="Supprimer"
                aria-label="Supprimer"
              >
                <Icon name="delete" size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
