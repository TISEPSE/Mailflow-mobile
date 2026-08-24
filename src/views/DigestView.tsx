import React from 'react';
import { Icon } from '../components/Icon';

interface DigestViewProps {
  onBack: () => void;
}

const DIGEST_POINTS = [
  {
    theme: 'Intelligence Artificielle & Modèles',
    summary: 'Meta déploie Llama 3.3 avec des capacités de raisonnement améliorées. Google affine ses intégrations multimodales sur Workspace. L’UE précise les exigences de conformité pour les grands modèles.',
    sources: ['TLDR AI', 'TechCrunch']
  },
  {
    theme: 'Économie & Marchés Européens',
    summary: 'La zone euro enregistre une croissance supérieure aux prévisions (+0.3%) au deuxième trimestre. Maintien des taux directeurs par la BCE pour contenir l’inflation.',
    sources: ['Les Échos', 'Bloomberg']
  },
  {
    theme: 'Design & Interfaces 2026',
    summary: 'Évolution majeure des design systems vers les micro-animations fluides et les interfaces prédictives assistées par IA locale.',
    sources: ['Sidebar IO']
  }
];

export const DigestView: React.FC<DigestViewProps> = ({ onBack }) => {
  return (
    <div className="flex-1 flex flex-col bg-[var(--side)] relative z-40 overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex-none flex items-center justify-between px-3 py-2 bg-[var(--side)] border-b border-[var(--line)]/50 pt-safe">
        <button
          onClick={onBack}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-[var(--fg)] hover:bg-[var(--sunk)] active:scale-95 transition-all cursor-pointer"
        >
          <Icon name="arrow_back" size={20} />
          <span>Newsletters</span>
        </button>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-soft)] text-[var(--accent-fg)] text-[11px] font-bold">
          <Icon name="auto_awesome" size={15} filled />
          <span>Synthèse IA</span>
        </div>
      </div>

      {/* Main Digest Content */}
      <div className="flex-1 overflow-y-auto mf-scroll p-4 flex flex-col gap-4 pb-16">
        <div className="p-4 rounded-3xl bg-gradient-to-br from-[var(--accent-soft)]/60 to-[var(--card)] border border-[var(--accent)]/30">
          <h1 className="text-base font-bold text-[var(--accent-fg)]">
            Synthèse matinale des newsletters
          </h1>
          <p className="text-xs text-[var(--fg)]/80 mt-1">
            Généré automatiquement ce matin à partir de vos 4 publications reçues.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {DIGEST_POINTS.map((pt, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-[var(--card)] border border-[var(--line)]/60 shadow-xs flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--fg)]">{pt.theme}</span>
                <span className="text-[10.5px] text-[var(--sub)] font-medium">
                  {pt.sources.join(' · ')}
                </span>
              </div>
              <p className="text-xs text-[var(--fg)]/90 leading-relaxed">
                {pt.summary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
