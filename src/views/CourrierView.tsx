import React from 'react';
import { MailMessage } from '../types';
import { Icon } from '../components/Icon';
import { SwipeableItem } from '../components/SwipeableItem';
import { getAvatarColor } from '../lib/utils';

interface CourrierViewProps {
  mails: MailMessage[];
  onOpenMail: (id: string) => void;
  onTrashMail: (id: string) => void;
  onArchiveMail: (id: string) => void;
}

export const CourrierView: React.FC<CourrierViewProps> = ({
  mails,
  onOpenMail,
  onTrashMail,
  onArchiveMail,
}) => {
  if (mails.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-3">
        <div className="w-16 h-16 rounded-full bg-[var(--faint)] flex items-center justify-center text-[var(--sub)]">
          <Icon name="inbox" size={32} />
        </div>
        <div className="text-base font-semibold text-[var(--fg)]">Boîte de réception vide</div>
        <p className="text-xs text-[var(--sub)] max-w-xs">
          Tous les messages directs ont été traités ou archivés.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto mf-scroll px-3 pt-1 pb-20">
      <div className="rounded-3xl bg-[var(--card)] border border-[var(--line)]/60 overflow-hidden shadow-xs divide-y divide-[var(--line)]/50">
        {mails.map((mail, index) => {
          const [avatarBg, avatarFg] = getAvatarColor(index);

          return (
            <SwipeableItem
              key={mail.id}
              onSwipeLeft={() => onTrashMail(mail.id)}
              onSwipeRight={() => onArchiveMail(mail.id)}
              leftIcon="archive"
              leftLabel="Archiver"
              rightIcon="delete"
              rightLabel="Supprimer"
            >
              <div
                onClick={() => onOpenMail(mail.id)}
                className={`flex items-start gap-3.5 p-3.5 cursor-pointer hover:bg-[var(--sunk)] active:bg-[var(--faint)] transition-colors ${
                  mail.unread ? 'bg-[var(--card)]' : 'bg-[var(--card)]/80 opacity-80'
                }`}
              >
                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-full flex-none flex items-center justify-center text-xs font-bold shadow-xs mt-0.5"
                  style={{ backgroundColor: avatarBg, color: avatarFg }}
                >
                  {mail.initials}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-xs truncate ${
                        mail.unread ? 'font-bold text-[var(--fg)]' : 'font-medium text-[var(--sub)]'
                      }`}
                    >
                      {mail.from}
                    </span>
                    <span className="text-[11px] text-[var(--sub)] flex-none">
                      {mail.time}
                    </span>
                  </div>

                  <div
                    className={`text-xs truncate mt-0.5 ${
                      mail.unread ? 'font-semibold text-[var(--fg)]' : 'font-normal text-[var(--fg)]/80'
                    }`}
                  >
                    {mail.subject}
                  </div>

                  <div className="text-[11.5px] text-[var(--sub)] line-clamp-1 mt-0.5 leading-snug">
                    {mail.snippet}
                  </div>
                </div>

                {/* Unread blue dot indicator */}
                {mail.unread && (
                  <div className="w-2 h-2 rounded-full bg-[var(--accent)] flex-none self-center shadow-xs" />
                )}
              </div>
            </SwipeableItem>
          );
        })}
      </div>
    </div>
  );
};
