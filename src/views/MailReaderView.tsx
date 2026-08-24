import React, { useState } from 'react';
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [aiExpanded, setAiExpanded] = useState(false);

  if (!mail) return null;

  const aiPoints = AI_SUMMARIES_MOCK[mail.id] || [
    'Message lu et synthétisé par MailFlow.',
    'Action recommandée : valider les modifications ou répondre.'
  ];

  const handleAiClick = () => {
    if (aiStatus === 'idle') {
      onRequestAiSummary(mail.id);
      setAiExpanded(true);
    } else {
      setAiExpanded(!aiExpanded);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[var(--side)] relative z-40 overflow-hidden animate-fade-in">
      {/* Top Header Bar */}
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
            Message
          </span>
        </div>

        {/* Right 3-dots Kebab Menu Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-full text-[var(--fg)] hover:bg-[var(--sunk)] active:scale-95 transition-all cursor-pointer"
            aria-label="Options du message"
          >
            <Icon name="more_vert" size={22} />
          </button>

          {/* Context Menu Popup Modal (Matching Photo) */}
          {menuOpen && (
            <>
              <div 
                className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[1px]" 
                onClick={() => setMenuOpen(false)} 
              />
              <div className="absolute right-0 top-11 z-50 min-w-[240px] bg-white dark:bg-[#232425] rounded-[28px] shadow-2xl border border-gray-100 dark:border-gray-800 p-3 animate-pop origin-top-right flex flex-col gap-1 select-none">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onReply(mail);
                  }}
                  className="flex items-center gap-4 px-4 py-3 rounded-2xl text-xs font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left w-full cursor-pointer"
                >
                  <Icon name="reply" size={20} className="text-gray-700 dark:text-gray-300" />
                  <span>Répondre</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    handleAiClick();
                  }}
                  className="flex items-center gap-4 px-4 py-3 rounded-2xl text-xs font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left w-full cursor-pointer"
                >
                  <Icon name="auto_awesome" size={20} className="text-[#0B57D0] dark:text-blue-400" />
                  <span>Résumé IA</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onArchive(mail.id);
                    onBack();
                  }}
                  className="flex items-center gap-4 px-4 py-3 rounded-2xl text-xs font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left w-full cursor-pointer"
                >
                  <Icon name="archive" size={20} className="text-gray-700 dark:text-gray-300" />
                  <span>Archiver</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenFolderSheet(mail.id);
                  }}
                  className="flex items-center gap-4 px-4 py-3 rounded-2xl text-xs font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left w-full cursor-pointer"
                >
                  <Icon name="folder_open" size={20} className="text-gray-700 dark:text-gray-300" />
                  <span>Archiver dans...</span>
                </button>

                <div className="h-px bg-gray-100 dark:bg-gray-800 my-1" />

                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onTrash(mail.id);
                    onBack();
                  }}
                  className="flex items-center gap-4 px-4 py-3 rounded-2xl text-xs font-semibold text-[#C5221F] hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors text-left w-full cursor-pointer"
                >
                  <Icon name="delete" size={20} className="text-[#C5221F]" />
                  <span>Supprimer</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main Mail Content */}
      <div className="flex-1 overflow-y-auto mf-scroll p-4 flex flex-col gap-4">
        {/* Subject Header */}
        <h1 className="text-[21px] font-bold text-[var(--fg)] leading-snug tracking-tight">
          {mail.subject}
        </h1>

        {/* Sender details */}
        <div className="flex items-center gap-3 pt-1">
          <div className="w-11 h-11 rounded-full flex-none bg-[#FFDBCF] text-[#6E3024] dark:bg-[#733324] dark:text-[#FFDBCF] flex items-center justify-center text-sm font-bold shadow-2xs">
            {mail.initials}
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-[var(--fg)] truncate">
              {mail.from}
            </div>
            <div className="text-xs text-[var(--sub)] truncate">
              {mail.email}
            </div>
          </div>

          <div className="text-xs text-[var(--sub)] flex-none">
            {mail.full || mail.time}
          </div>
        </div>

        {/* AI Summary Chip / Card */}
        <div className="self-start flex flex-col gap-2 pt-1">
          <button
            type="button"
            onClick={handleAiClick}
            className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-[#D3E3FD]/50 hover:bg-[#D3E3FD] border border-[#0B57D0]/20 text-[#0B57D0] dark:bg-[#0842A0]/40 dark:text-[#A8C7FA] text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-2xs"
          >
            <Icon name="auto_awesome" size={17} className="text-[#0B57D0] dark:text-[#A8C7FA]" filled />
            <span>Résumé IA</span>
          </button>

          {/* AI Progress / Card */}
          {aiStatus === 'busy' && (
            <div className="p-3 rounded-2xl bg-[#D3E3FD]/30 border border-[#0B57D0]/40 text-xs font-semibold text-[#0B57D0] flex items-center gap-2.5 animate-pulse">
              <Icon name="auto_awesome" size={18} className="etincelle-ia text-[#0B57D0]" />
              <span>Génération du résumé IA en cours…</span>
            </div>
          )}

          {(aiStatus === 'done' || aiExpanded) && aiStatus !== 'busy' && (
            <div className="p-4 rounded-3xl bg-white dark:bg-[#232425] border border-blue-100 dark:border-blue-900/40 shadow-sm animate-fade-in flex flex-col gap-2 mt-1">
              <div className="flex items-center gap-2 pb-1.5 border-b border-gray-100 dark:border-gray-800 text-xs font-bold text-[#0B57D0] dark:text-[#A8C7FA]">
                <Icon name="auto_awesome" size={16} filled />
                <span>Points clés synthétisés par l'IA</span>
              </div>
              <ul className="flex flex-col gap-1.5 pl-1 pt-1 text-xs text-[var(--fg)] leading-relaxed">
                {aiPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0B57D0] mt-1.5 flex-none" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Message Body Paragraphs */}
        <div className="flex flex-col gap-3 text-sm text-[var(--fg)] leading-relaxed pt-2">
          {mail.body.map((paragraph, i) => (
            <p key={i} className="whitespace-pre-line leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Bottom Sticky Primary Blue Reply Button */}
      <div className="flex-none p-4 pt-2 bg-gradient-to-t from-[var(--side)] via-[var(--side)] to-transparent">
        <button
          type="button"
          onClick={() => onReply(mail)}
          className="w-full py-3.5 px-6 rounded-full bg-[#0B57D0] hover:bg-[#0842A0] text-white font-medium text-sm flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all cursor-pointer"
        >
          <Icon name="reply" size={19} className="text-white" />
          <span>Répondre</span>
        </button>
      </div>
    </div>
  );
};
