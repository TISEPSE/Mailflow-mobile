import React, { useState } from 'react';
import { AutoRule, RuleCategory, RuleAction } from '../types';
import { Icon } from '../components/Icon';

interface RuleEditorViewProps {
  initialRule?: AutoRule | null;
  onClose: () => void;
  onSave: (rule: AutoRule) => void;
  onDelete?: (id: string) => void;
}

const DAYS = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];
const HOURS = ['08:00', '12:00', '18:00', '20:00'];

export const RuleEditorView: React.FC<RuleEditorViewProps> = ({
  initialRule,
  onClose,
  onSave,
  onDelete
}) => {
  const [email, setEmail] = useState(initialRule?.email || '');
  const [nom, setNom] = useState(initialRule?.nom || '');
  const [cat, setCat] = useState<RuleCategory>(initialRule?.cat || 'publicite');
  const [action, setAction] = useState<RuleAction>(initialRule?.action || 'supprimer_toujours');
  const [day, setDay] = useState(initialRule?.day || 'vendredi');
  const [hour, setHour] = useState(initialRule?.hour || '18:00');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!email.trim() || !email.includes('@')) {
      setError('Veuillez renseigner une adresse e-mail valide.');
      return;
    }
    setError('');
    
    const rule: AutoRule = {
      id: initialRule?.id || `rule_${Date.now()}`,
      email: email.trim(),
      nom: nom.trim() || email.split('@')[0],
      cat,
      action,
      day: cat === 'formation' ? day : undefined,
      hour: cat === 'formation' ? hour : undefined,
      active: true,
      date: initialRule?.date || new Date().toLocaleDateString('fr-FR')
    };

    onSave(rule);
  };

  const getPreviewSentence = () => {
    const sender = nom || email || "l'expéditeur";
    if (action === 'supprimer_toujours') return `Supprimer systématiquement tous les messages reçus de ${sender}.`;
    if (action === 'generer_resume_et_archiver') return `Résumer automatiquement avec l'IA puis archiver la newsletter ${sender}.`;
    return `Archiver automatiquement les rappels de ${sender} chaque ${day} à ${hour.replace(':', ' h ')}.`;
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
          <span>Annuler</span>
        </button>

        <span className="text-xs font-bold text-[var(--fg)]">
          {initialRule ? 'Modifier la règle' : 'Nouvelle règle'}
        </span>

        <button
          onClick={handleSave}
          className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[var(--accent)] text-white text-xs font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
        >
          <span>Enregistrer</span>
        </button>
      </div>

      {/* Form content */}
      <div className="flex-1 overflow-y-auto mf-scroll p-4 flex flex-col gap-4 pb-20">
        {error && (
          <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#FCE8E6] text-[#B3261E] text-xs font-medium">
            <Icon name="error" size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Sender details */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--sub)] px-1">
            1 · Expéditeur visé
          </span>
          <div className="rounded-2xl bg-[var(--card)] border border-[var(--line)]/60 overflow-hidden shadow-xs divide-y divide-[var(--line)]/50">
            <div className="p-3 flex items-center gap-2">
              <span className="text-xs font-medium text-[var(--sub)] w-16 flex-none">E-mail</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ex: promos@boutique.fr"
                className="flex-1 text-xs text-[var(--fg)] bg-transparent outline-none font-medium"
              />
            </div>
            <div className="p-3 flex items-center gap-2">
              <span className="text-xs font-medium text-[var(--sub)] w-16 flex-none">Nom</span>
              <input
                type="text"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                placeholder="ex: Boutique Flash"
                className="flex-1 text-xs text-[var(--fg)] bg-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Category selection */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--sub)] px-1">
            2 · Catégorie
          </span>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'publicite', label: 'Publicité', icon: 'sell' },
              { id: 'newsletter', label: 'Newsletter', icon: 'newspaper' },
              { id: 'formation', label: 'Formation', icon: 'school' }
            ].map(c => {
              const isSelected = cat === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setCat(c.id as RuleCategory);
                    if (c.id === 'publicite') setAction('supprimer_toujours');
                    else if (c.id === 'newsletter') setAction('generer_resume_et_archiver');
                    else setAction('archiver_automatique');
                  }}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border text-xs font-semibold transition-all active:scale-95 ${
                    isSelected
                      ? 'bg-[var(--accent-soft)] border-[var(--accent)] text-[var(--accent-fg)]'
                      : 'bg-[var(--card)] border-[var(--line)] text-[var(--sub)]'
                  }`}
                >
                  <Icon name={c.icon} size={20} />
                  <span>{c.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Schedule if formation */}
        {cat === 'formation' && (
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--sub)] px-1">
              3 · Programmation du tri
            </span>
            <div className="p-3.5 rounded-2xl bg-[var(--card)] border border-[var(--line)]/60 flex flex-col gap-3">
              <div className="flex flex-wrap gap-1.5">
                {DAYS.map(d => (
                  <button
                    key={d}
                    onClick={() => setDay(d)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold capitalize transition-all ${
                      day === d
                        ? 'bg-[var(--accent)] text-white'
                        : 'bg-[var(--sunk)] text-[var(--sub)]'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 pt-1 border-t border-[var(--line)]/40">
                <span className="text-xs text-[var(--sub)] font-medium">Heure :</span>
                {HOURS.map(h => (
                  <button
                    key={h}
                    onClick={() => setHour(h)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      hour === h
                        ? 'bg-[var(--accent)] text-white'
                        : 'bg-[var(--sunk)] text-[var(--sub)]'
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Live Rule Summary Preview */}
        <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[var(--accent-soft)]/50 border border-[var(--accent)]/30">
          <Icon name="auto_awesome" size={20} className="text-[var(--accent)] flex-none mt-0.5" />
          <div className="text-xs text-[var(--fg)] leading-relaxed font-medium">
            {getPreviewSentence()}
          </div>
        </div>

        {/* Delete button if editing */}
        {initialRule && onDelete && (
          <button
            onClick={() => onDelete(initialRule.id)}
            className="w-full p-3.5 rounded-2xl bg-[#FCE8E6] text-[#B3261E] font-semibold text-xs border border-[#F5C2C7] transition-all active:scale-98 cursor-pointer mt-2"
          >
            Supprimer cette règle
          </button>
        )}
      </div>
    </div>
  );
};
