import React from 'react';
import { AutoRule, RuleCategory } from '../types';
import { Icon } from '../components/Icon';

interface RulesViewProps {
  rules: AutoRule[];
  onToggleRule: (id: string) => void;
  onEditRule: (rule: AutoRule) => void;
  onCreateRule: () => void;
}

const CATEGORY_CONFIG: Record<RuleCategory, { label: string; icon: string; bg: string; fg: string }> = {
  publicite: { 
    label: 'Publicités', 
    icon: 'delete', 
    bg: '#F9DEDC', 
    fg: '#8C1D18' 
  },
  newsletter: { 
    label: 'Newsletters', 
    icon: 'auto_awesome', 
    bg: '#E8DEF8', 
    fg: '#6750A4' 
  },
  formation: { 
    label: 'Formations', 
    icon: 'schedule', 
    bg: '#C4EED0', 
    fg: '#0F5223' 
  }
};

export const RulesView: React.FC<RulesViewProps> = ({
  rules,
  onToggleRule,
  onEditRule,
  onCreateRule
}) => {
  const getRuleActionText = (r: AutoRule) => {
    if (r.action === 'supprimer_toujours') return `Supprimer automatiquement tout de ${r.email}`;
    if (r.action === 'generer_resume_et_archiver') return `Résumer par IA puis archiver · ${r.email}`;
    return `Archive chaque ${r.day || 'vendredi'} à ${(r.hour || '18:00').replace(':', ' h ')}`;
  };

  const categories: RuleCategory[] = ['publicite', 'newsletter', 'formation'];

  return (
    <div className="flex-1 overflow-y-auto mf-scroll px-3.5 pt-1 pb-24 flex flex-col gap-4 relative">
      {/* Grouped Rules by Category (Image 4) */}
      {categories.map((cat) => {
        const catRules = rules.filter(r => r.cat === cat);
        if (catRules.length === 0) return null;

        const config = CATEGORY_CONFIG[cat];
        const countText = catRules.length > 1 ? `${catRules.length} règles` : `${catRules.length} règle`;

        return (
          <div key={cat} className="flex flex-col gap-1.5">
            {/* Category Header */}
            <div className="flex items-center gap-2 px-1 text-xs font-bold text-[var(--fg)]">
              <span>{config.label}</span>
              <span className="text-[11px] font-normal text-[var(--sub)]">
                {countText}
              </span>
            </div>

            {/* Rule Cards */}
            <div className="flex flex-col gap-2">
              {catRules.map((rule) => (
                <div
                  key={rule.id}
                  onClick={() => onEditRule(rule)}
                  className="p-4 rounded-3xl bg-[var(--card)] border border-[var(--line)]/50 shadow-xs flex items-center justify-between gap-3.5 cursor-pointer hover:bg-[var(--sunk)] active:scale-[0.99] transition-all"
                >
                  {/* Category Circle Icon */}
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center flex-none"
                    style={{ backgroundColor: config.bg, color: config.fg }}
                  >
                    <Icon name={config.icon} size={20} filled />
                  </div>

                  {/* Title & Description */}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-[var(--fg)] truncate">
                      {rule.nom}
                    </div>
                    <div className="text-xs text-[var(--sub)] truncate mt-0.5">
                      {getRuleActionText(rule)}
                    </div>
                  </div>

                  {/* M3 Toggle Switch (Image 4) */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleRule(rule.id);
                    }}
                    className="flex-none cursor-pointer p-1 -mr-1"
                    title={rule.active ? 'Mettre en pause' : 'Activer'}
                  >
                    <div
                      className={`w-12 h-7 rounded-full p-1 transition-colors duration-200 ease-in-out flex items-center ${
                        rule.active ? 'bg-[#0B57D0]' : 'bg-gray-300 dark:bg-gray-700'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform duration-200 ease-in-out ${
                          rule.active ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Helper text footer (Image 4) */}
      <p className="text-xs text-[var(--sub)] px-1 leading-relaxed mt-1">
        Touchez une règle pour la modifier ou la supprimer, l'interrupteur la met en pause.
      </p>

      {/* Floating Blue Pill Button: Nouvelle Règle (Image 4) */}
      <div className="fixed bottom-20 right-4 z-30">
        <button
          type="button"
          onClick={onCreateRule}
          className="flex items-center gap-2 py-3.5 px-5 rounded-2xl bg-[#0B57D0] hover:bg-[#0842A0] text-white font-semibold text-xs shadow-lg active:scale-95 transition-all cursor-pointer"
        >
          <Icon name="tune" size={18} className="text-white" />
          <span>Nouvelle règle</span>
        </button>
      </div>
    </div>
  );
};
