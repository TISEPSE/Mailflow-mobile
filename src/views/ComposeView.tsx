import React, { useState } from 'react';
import { Icon } from '../components/Icon';

interface ComposeViewProps {
  initialTo?: string;
  initialSubject?: string;
  initialBody?: string;
  onClose: () => void;
  onSend: (to: string, subject: string, body: string) => void;
}

export const ComposeView: React.FC<ComposeViewProps> = ({
  initialTo = '',
  initialSubject = '',
  initialBody = '',
  onClose,
  onSend
}) => {
  const [to, setTo] = useState(initialTo);
  const [subject, setSubject] = useState(initialSubject);
  const [body, setBody] = useState(initialBody);
  const [error, setError] = useState('');

  const handleSend = () => {
    if (!to.trim() || !to.includes('@')) {
      setError('Veuillez renseigner une adresse e-mail valide.');
      return;
    }
    setError('');
    onSend(to, subject, body);
  };

  return (
    <div className="flex-1 flex flex-col bg-[var(--side)] relative z-40 overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex-none flex items-center justify-between px-3 py-2 bg-[var(--side)] border-b border-[var(--line)]/50 pt-safe">
        <button
          onClick={onClose}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-[var(--fg)] hover:bg-[var(--sunk)] active:scale-95 transition-all cursor-pointer"
        >
          <Icon name="close" size={20} />
          <span>Fermer</span>
        </button>

        <button
          onClick={handleSend}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[var(--accent)] text-white text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
        >
          <span>Envoyer</span>
          <Icon name="send" size={16} />
        </button>
      </div>

      {/* Editor inputs */}
      <div className="flex-1 overflow-y-auto mf-scroll p-4 flex flex-col gap-3">
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#FCE8E6] text-[#B3261E] text-xs font-medium">
            <Icon name="error" size={16} />
            <span>{error}</span>
          </div>
        )}

        <div className="rounded-2xl bg-[var(--card)] border border-[var(--line)]/60 overflow-hidden shadow-xs divide-y divide-[var(--line)]/50">
          <div className="flex items-center gap-3 px-3.5 py-2.5">
            <span className="text-xs font-semibold text-[var(--sub)] w-12 flex-none">À</span>
            <input
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="destinataire@exemple.com"
              className="flex-1 text-xs text-[var(--fg)] bg-transparent outline-none"
            />
          </div>

          <div className="flex items-center gap-3 px-3.5 py-2.5">
            <span className="text-xs font-semibold text-[var(--sub)] w-12 flex-none">Objet</span>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Objet du message"
              className="flex-1 text-xs text-[var(--fg)] bg-transparent outline-none font-medium"
            />
          </div>
        </div>

        {/* Body Textarea */}
        <div className="flex-1 min-h-[220px] rounded-2xl bg-[var(--card)] border border-[var(--line)]/60 p-3.5 shadow-xs">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Rédigez votre message…"
            className="w-full h-full min-h-[200px] text-xs text-[var(--fg)] bg-transparent outline-none resize-none leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
};
