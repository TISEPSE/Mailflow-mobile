import React, { useState } from 'react';
import { MailMessage, PromoMessage, NewsletterItem } from '../types';
import { Icon } from '../components/Icon';

interface SearchViewProps {
  mails: MailMessage[];
  promos: PromoMessage[];
  news: NewsletterItem[];
  onClose: () => void;
  onOpenMail: (id: string) => void;
  onOpenPromo: (id: string) => void;
}

const SUGGESTIONS = ['Factures', 'Devis', 'OpenClassrooms', 'Karim', 'Promos'];

export const SearchView: React.FC<SearchViewProps> = ({
  mails,
  promos,
  news,
  onClose,
  onOpenMail,
  onOpenPromo
}) => {
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();

  const matchingMails = q ? mails.filter(m =>
    m.subject.toLowerCase().includes(q) ||
    m.from.toLowerCase().includes(q) ||
    m.snippet.toLowerCase().includes(q)
  ) : [];

  const matchingPromos = q ? promos.filter(p =>
    p.subject.toLowerCase().includes(q) ||
    p.name.toLowerCase().includes(q) ||
    p.snippet.toLowerCase().includes(q)
  ) : [];

  const matchingNews = q ? news.filter(n =>
    n.name.toLowerCase().includes(q) ||
    n.summary.toLowerCase().includes(q)
  ) : [];

  const totalResults = matchingMails.length + matchingPromos.length + matchingNews.length;

  return (
    <div className="flex-1 flex flex-col bg-[var(--side)] relative z-40 overflow-hidden animate-fade-in">
      {/* Search Header */}
      <div className="flex-none p-3.5 bg-[var(--side)] border-b border-[var(--line)]/50">
        <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[var(--card)] border border-[var(--line)] shadow-xs">
          <Icon name="search" size={20} className="text-[var(--sub)]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher dans tous vos messages…"
            className="flex-1 text-xs text-[var(--fg)] bg-transparent outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-[var(--sub)] p-0.5">
              <Icon name="close" size={18} />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold text-[var(--accent)] pl-1"
          >
            Annuler
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto mf-scroll p-4 flex flex-col gap-4">
        {!q ? (
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--sub)]">
              Suggestions rapides
            </span>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="px-3.5 py-2 rounded-2xl bg-[var(--card)] border border-[var(--line)]/60 text-xs font-medium text-[var(--fg)] hover:bg-[var(--sunk)] active:scale-95 transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <span className="text-xs text-[var(--sub)] font-medium">
              {totalResults} résultat(s) trouvé(s)
            </span>

            {/* Mails results */}
            {matchingMails.length > 0 && (
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--sub)]">
                  Mails directs ({matchingMails.length})
                </span>
                <div className="rounded-2xl bg-[var(--card)] border border-[var(--line)]/60 divide-y divide-[var(--line)]/50 overflow-hidden">
                  {matchingMails.map(m => (
                    <div
                      key={m.id}
                      onClick={() => onOpenMail(m.id)}
                      className="p-3 hover:bg-[var(--sunk)] cursor-pointer"
                    >
                      <div className="text-xs font-bold text-[var(--fg)]">{m.from}</div>
                      <div className="text-xs font-medium text-[var(--fg)] truncate">{m.subject}</div>
                      <div className="text-[11px] text-[var(--sub)] truncate">{m.snippet}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Promos results */}
            {matchingPromos.length > 0 && (
              <div className="flex flex-col gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--sub)]">
                  Publicités ({matchingPromos.length})
                </span>
                <div className="rounded-2xl bg-[var(--card)] border border-[var(--line)]/60 divide-y divide-[var(--line)]/50 overflow-hidden">
                  {matchingPromos.map(p => (
                    <div
                      key={p.id}
                      onClick={() => onOpenPromo(p.id)}
                      className="p-3 hover:bg-[var(--sunk)] cursor-pointer"
                    >
                      <div className="text-xs font-bold text-[var(--fg)]">{p.name}</div>
                      <div className="text-xs font-medium text-[var(--fg)] truncate">{p.subject}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
