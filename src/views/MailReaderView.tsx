import React from 'react';
import { MailMessage } from '../types';
import { Icon } from '../components/Icon';
import { AI_SUMMARIES_MOCK } from '../lib/mockData';

interface MailReaderViewProps {
  mail: MailMessage | null;
  aiStatus: 'idle' | 'busy' | 'done';
  onBack: () => void;
  onArchive: (id: string) => void;
  onTrash: (id: string) => void;
  onRequestAiSummary: (id: string) => void;
  onReply: (mail: MailMessage) => void;
  onOpenFolderSheet: (id: string) => void;
}

export const MailReaderView: React.FC<MailReaderViewProps> = ({
  mail,
  aiStatus,
  onBack,
  onArchive,
  onTrash,
  onRequestAiSummary,
  onReply,
  onOpenFolderSheet
}) => {
  if (!mail) return null;

  const aiPoints = AI_SUMMARIES_MOCK[mail.id] || [
    'Message lu et analysé par MailFlow.',
    'Action recommandée : répondre ou classer dans vos dossiers.'
  ];

  return (
    <div className="flex-1 flex flex-col bg-[var(--side)] relative z-40 overflow-hidden animate-fade-in">
      {/* Top Header Bar */}
      <div className="flex-none flex items-center justify-between px-3 py-2 bg-[var(--side)] border-b border-[var(--line)]/50">
        <button
          onClick={onBack}
          className="flex items-center gap-1 px-2 py-1.5 rounded-xl text-xs font-semibold text-[var(--fg)] hover:bg-[var(--sunk)] active:scale-95 transition-all"
        >
          <Icon name="arrow_back" size={20} />
          <span>Boîte</span>
        </button>

        {/* Action icons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onArchive(mail.id)}
            className="p-2 rounded-xl text-[var(--fg)] hover:bg-[var(--sunk)] active:scale-95 transition-all"
            title="Archiver"
          >
            <Icon name="inventory_2" size={20} />
          </button>
          <button
            onClick={() => onOpenFolderSheet(mail.id)}
            className="p-2 rounded-xl text-[var(--fg)] hover:bg-[var(--sunk)] active:scale-95 transition-all"
            title="Déplacer vers"
          >
            <Icon name="drive_file_move" size={20} />
          </button>
          <button
            onClick={() => onTrash(mail.id)}
            className="p-2 rounded-xl text-[var(--fg)] hover:text-red-500 hover:bg-[var(--sunk)] active:scale-95 transition-all"
            title="Supprimer"
          >
            <Icon name="delete" size={20} />
          </button>
        </div>
      </div>

      {/* Main Mail Content */}
      <div className="flex-1 overflow-y-auto mf-scroll p-4 flex flex-col gap-4 pb-16">
        {/* Subject */}
        <h1 className="text-base font-bold text-[var(--fg)] leading-snug tracking-tight">
          {mail.subject}
        </h1>

        {/* Sender details card */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-[var(--card)] border border-[var(--line)]/50">
          <div className="w-10 h-10 rounded-full flex-none bg-[var(--accent-soft)] text-[var(--accent-fg)] flex items-center justify-center text-xs font-bold">
            {mail.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-[var(--fg)] truncate">{mail.from}</div>
            <div className="text-[11px] text-[var(--sub)] truncate">{mail.email}</div>
          </div>
          <div className="text-[11px] text-[var(--sub)] flex-none">{mail.time}</div>
        </div>

        {/* AI Summary Block */}
        <div className={`p-4 rounded-2xl bg-[var(--card)] border transition-all ${
          aiStatus === 'busy' ? 'carte-en-resume border-[var(--accent)]' : 'border-[var(--line)]/60'
        }`}>
          {aiStatus === 'idle' && (
            <button
              onClick={() => onRequestAiSummary(mail.id)}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[var(--accent-soft)]/50 hover:bg-[var(--accent-soft)] text-[var(--accent-fg)] text-xs font-bold transition-all active:scale-98 cursor-pointer"
            >
              <Icon name="auto_awesome" size={18} className="text-[var(--accent)]" />
              <span>Résumer ce message avec l'IA</span>
            </button>
          )}

          {aiStatus === 'busy' && (
            <div className="flex items-center gap-3 py-2 text-xs font-semibold text-[var(--accent-fg)]">
              <Icon name="auto_awesome" size={20} className="etincelle-ia text-[var(--accent)]" />
              <span>Génération du résumé en cours…</span>
            </div>
          )}

          {aiStatus === 'done' && (
            <div className="flex flex-col gap-2 animate-fade-in">
              <div className="flex items-center gap-2 pb-2 border-b border-[var(--line)]/40 text-xs font-bold text-[var(--accent-fg)]">
                <Icon name="auto_awesome" size={16} filled className="text-[var(--accent)]" />
                <span>Points clés synthétisés par l'IA</span>
              </div>
              <ul className="flex flex-col gap-1.5 pl-2 pt-1 text-xs text-[var(--fg)] leading-relaxed">
                {aiPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-1.5 flex-none" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Message Body Paragraphs */}
        <div className="p-4 rounded-2xl bg-[var(--card)] border border-[var(--line)]/60 flex flex-col gap-3 text-xs text-[var(--fg)] leading-relaxed shadow-xs">
          {mail.body.map((paragraph, i) => (
            <p key={i} className="whitespace-pre-line">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Quick Reply Button */}
        <button
          onClick={() => onReply(mail)}
          className="w-full flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-[var(--card)] border border-[var(--line)] hover:bg-[var(--sunk)] text-[var(--fg)] font-semibold text-xs transition-all active:scale-98 cursor-pointer mt-2"
        >
          <Icon name="reply" size={18} />
          <span>Répondre à {mail.from}</span>
        </button>
      </div>
    </div>
  );
};
